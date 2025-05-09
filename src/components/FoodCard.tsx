
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface FoodCardProps {
  title: string;
  description: string;
  price: string;
  imageSrc: string;
}

const FoodCard = ({ title, description, price, imageSrc }: FoodCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardFooter className="pt-2 flex justify-between">
        <span className="font-semibold text-food-primary">{price}</span>
        <Button size="sm" variant="outline" className="gap-1">
          <ShoppingCart className="h-4 w-4" />
          <span>Adicionar</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FoodCard;
