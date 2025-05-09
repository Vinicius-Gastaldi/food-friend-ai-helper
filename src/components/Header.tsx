
import { UtensilsCrossed, MenuIcon, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="h-8 w-8 text-food-primary" />
          <h1 className="text-xl font-bold">ChefAI</h1>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <nav>
            <ul className="flex items-center gap-6">
              <li>
                <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">Cardápio</a>
              </li>
              <li>
                <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">Delivery</a>
              </li>
              <li>
                <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">Sobre</a>
              </li>
            </ul>
          </nav>
          
          <Button size="sm" variant="outline" className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            <span>Pedidos</span>
          </Button>
        </div>
        
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <MenuIcon className="h-6 w-6" />
        </Button>
      </div>
      
      {isMenuOpen && (
        <div className="block md:hidden absolute top-full left-0 w-full bg-background border-b shadow-lg">
          <nav className="container mx-auto py-4">
            <ul className="flex flex-col gap-4">
              <li>
                <a href="#" className="block px-2 py-1 text-foreground/80 hover:text-foreground transition-colors">Cardápio</a>
              </li>
              <li>
                <a href="#" className="block px-2 py-1 text-foreground/80 hover:text-foreground transition-colors">Delivery</a>
              </li>
              <li>
                <a href="#" className="block px-2 py-1 text-foreground/80 hover:text-foreground transition-colors">Sobre</a>
              </li>
              <li>
                <Button size="sm" variant="outline" className="w-full gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  <span>Pedidos</span>
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
