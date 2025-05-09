
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendIcon } from "lucide-react";
import ChatMessage from "./ChatMessage";
import { Card } from "@/components/ui/card";
import FoodCard from "./FoodCard";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

const initialMessages = [
  {
    id: "1",
    text: "Olá! Sou o ChefAI, o assistente virtual do nosso restaurante. Como posso ajudar você hoje? Posso recomendar pratos, auxiliar com pedidos de delivery ou responder a perguntas sobre o cardápio.",
    isUser: false,
  }
];

const popularDishes = [
  {
    id: "1",
    title: "Pasta Carbonara",
    description: "Espaguete com molho cremoso de ovos, queijo parmesão, pimenta preta e pancetta.",
    price: "R$45,90",
    imageSrc: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=300&h=200&auto=format&fit=crop"
  },
  {
    id: "2",
    title: "Risoto de Funghi",
    description: "Arroz arbóreo cozido lentamente com mix de cogumelos e finalizado com manteiga e parmesão.",
    price: "R$52,90",
    imageSrc: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=300&h=200&auto=format&fit=crop"
  },
  {
    id: "3",
    title: "Picanha na Brasa",
    description: "Corte premium de picanha grelhada, acompanhada de arroz, farofa e vinagrete.",
    price: "R$72,90",
    imageSrc: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?q=80&w=300&h=200&auto=format&fit=crop"
  }
];

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(true);
  const [apiKey, setApiKey] = useState<string>("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Check localStorage for API key
    const savedApiKey = localStorage.getItem("openai_api_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    } else {
      setShowApiKeyInput(true);
    }
  }, []);

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem("openai_api_key", apiKey);
      setShowApiKeyInput(false);
      toast({
        title: "API Key Salva",
        description: "Sua chave API foi salva no navegador.",
      });
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setShowRecommendations(false);

    if (!apiKey) {
      setShowApiKeyInput(true);
      setIsLoading(false);
      toast({
        title: "Chave API Necessária",
        description: "Por favor, insira sua chave API OpenAI para continuar.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Prepare context about the restaurant and popular dishes
      const restaurantContext = `
        Você é o ChefAI, o assistente virtual de um restaurante italiano-brasileiro.
        Você deve responder em português.
        O restaurante oferece pratos italianos e brasileiros.
        Pratos populares incluem:
        - Pasta Carbonara (R$45,90): Espaguete com molho cremoso de ovos, queijo parmesão, pimenta preta e pancetta.
        - Risoto de Funghi (R$52,90): Arroz arbóreo cozido lentamente com mix de cogumelos e finalizado com manteiga e parmesão.
        - Picanha na Brasa (R$72,90): Corte premium de picanha grelhada, acompanhada de arroz, farofa e vinagrete.
        O horário de funcionamento é de terça a domingo, das 18h às 23h.
        Delivery é feito através do aplicativo do restaurante ou pelo telefone (11) 5555-1234.
        O tempo médio de entrega é de 45 minutos.
        Formas de pagamento aceitas: cartão de crédito, débito e PIX.
        Endereço: Rua dos Sabores, 123, São Paulo.
      `;
      
      // Prepare conversation history
      const conversationHistory = messages.map(msg => ({
        role: msg.isUser ? "user" : "assistant",
        content: msg.text
      }));

      // Call OpenAI API
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: restaurantContext },
            ...conversationHistory,
            { role: "user", content: input }
          ],
          temperature: 0.7,
          max_tokens: 300
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Erro ao comunicar com API OpenAI");
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || "Desculpe, não consegui processar sua solicitação.";

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      
      toast({
        title: "Erro",
        description: `Falha ao obter resposta: ${errorMessage}`,
        variant: "destructive",
      });

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente mais tarde.",
        isUser: false,
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {showApiKeyInput && (
        <div className="p-4 bg-amber-50 border-b border-amber-200">
          <div className="mb-2 text-sm text-amber-800">
            <p>Para usar o ChefAI, você precisa fornecer uma chave API da OpenAI.</p>
            <p className="text-xs mt-1">Sua chave será salva apenas no seu navegador.</p>
          </div>
          <div className="flex gap-2">
            <Input
              type="password"
              placeholder="Insira sua chave API OpenAI"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1"
            />
            <Button onClick={saveApiKey} disabled={!apiKey.trim()}>
              Salvar
            </Button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isUser={message.isUser}
            />
          ))}
          
          {isLoading && (
            <ChatMessage message="" isUser={false} isLoading={true} />
          )}

          {showRecommendations && messages.length === 1 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Pratos Recomendados</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {popularDishes.map((dish) => (
                  <FoodCard
                    key={dish.id}
                    title={dish.title}
                    description={dish.description}
                    price={dish.price}
                    imageSrc={dish.imageSrc}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Como posso te ajudar hoje?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!input.trim() || isLoading}>
            <SendIcon className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          ChefAI pode ajudar com recomendações de pratos, informações sobre delivery e muito mais.
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
