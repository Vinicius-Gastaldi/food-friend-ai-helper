
import { Chef } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted py-8 mt-12">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Chef className="h-8 w-8 text-food-primary" />
            <h2 className="text-xl font-bold">ChefAI</h2>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div>
              <h3 className="font-semibold mb-2">Horário</h3>
              <p className="text-sm">Terça-Domingo: 11:30 - 23:00</p>
              <p className="text-sm">Segunda: Fechado</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Contato</h3>
              <p className="text-sm">(11) 5555-1234</p>
              <p className="text-sm">contato@chefairestaurante.com</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Endereço</h3>
              <p className="text-sm">Rua das Delícias, 123</p>
              <p className="text-sm">São Paulo, SP</p>
            </div>
          </div>
        </div>
        
        <div className="text-center text-sm text-muted-foreground border-t pt-6">
          <p>© {new Date().getFullYear()} ChefAI Restaurante. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
