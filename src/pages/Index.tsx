
import Header from "@/components/Header";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ChatInterface from "@/components/ChatInterface";
import Footer from "@/components/Footer";
import { Chef, MapPin, Clock, Fork } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-food-accent to-background pt-12 pb-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Seu assistente pessoal de gastronomia</h1>
                <p className="text-lg mb-6">
                  Obtenha recomendações de pratos, peça delivery e tire suas dúvidas sobre o cardápio com o nosso assistente de IA.
                </p>
                <div className="flex gap-4">
                  <Button size="lg" className="bg-food-primary hover:bg-food-dark">Ver Cardápio</Button>
                  <Button size="lg" variant="outline">Fazer Reserva</Button>
                </div>
              </div>
              <div className="flex-1 relative">
                <div className="aspect-square max-w-md mx-auto relative">
                  <div className="absolute inset-0 bg-food-primary rounded-full opacity-10 animate-pulse-slow"></div>
                  <img 
                    src="https://source.unsplash.com/random/600x600/?restaurant,chef" 
                    alt="Chef AI" 
                    className="rounded-full object-cover aspect-square p-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Restaurant Info */}
        <section className="py-12 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Fork className="h-5 w-5 text-food-primary" />
                  <span>Culinária de Qualidade</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Pratos preparados com ingredientes frescos e selecionados por nossos chefs experientes.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-food-primary" />
                  <span>Localização Privilegiada</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Localizado no coração da cidade, com fácil acesso e ambiente aconchegante.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-food-primary" />
                  <span>Delivery Rápido</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Entrega em até 45 minutos para que você possa desfrutar de nossas delícias em casa.</p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Chat Interface */}
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Converse com o ChefAI</h2>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                Nosso assistente virtual está pronto para ajudar com recomendações de pratos, 
                informações sobre delivery e muito mais.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <Card className="shadow-lg border-food-secondary/20">
                <CardHeader className="bg-food-accent text-food-dark">
                  <CardTitle className="flex items-center gap-2">
                    <Chef className="h-5 w-5 text-food-primary" />
                    <span>Assistente ChefAI</span>
                  </CardTitle>
                  <CardDescription>
                    Pergunte sobre pratos, delivery ou ajuda para escolher o que pedir
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[500px]">
                    <ChatInterface />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
