import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendIcon } from "lucide-react";
import ChatMessage from "./ChatMessage";
import { Card } from "@/components/ui/card";
import FoodCard from "./FoodCard";

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showRecommendations, setShowRecommendations] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
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

    // Simulate AI response
    setTimeout(() => {
      let response;
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes("cardápio") || lowerInput.includes("menu") || lowerInput.includes("pratos")) {
        response = "Nosso cardápio inclui diversas opções de massas, carnes e pratos vegetarianos. Alguns de nossos pratos mais populares são Pasta Carbonara, Risoto de Funghi e Picanha na Brasa. O que você gostaria de experimentar?";
      } else if (lowerInput.includes("delivery") || lowerInput.includes("entrega") || lowerInput.includes("pedido")) {
        response = "Para fazer um pedido para delivery, você pode usar nosso aplicativo ou ligar para (11) 5555-1234. O tempo médio de entrega é de 45 minutos. Aceitamos pagamentos por cartão ou PIX.";
      } else if (lowerInput.includes("recomendação") || lowerInput.includes("sugestão") || lowerInput.includes("sugerir")) {
        response = "Com base em nossos pratos mais pedidos, posso recomendar a Pasta Carbonara, que é feita com espaguete fresco, o Risoto de Funghi com cogumelos selecionados ou nossa famosa Picanha na Brasa. Você gostaria de saber mais sobre algum desses pratos?";
      } else {
        response = "Obrigado pela sua mensagem. Posso ajudar com informações sobre nosso cardápio, fazer recomendações ou auxiliar com pedidos de delivery. Como posso te ajudar melhor?";
      }

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
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
          <Button onClick={handleSendMessage} disabled={!input.trim()}>
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
