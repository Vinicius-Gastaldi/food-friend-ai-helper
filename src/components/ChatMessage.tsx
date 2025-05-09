
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Chef } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isUser?: boolean;
  isLoading?: boolean;
}

const ChatMessage = ({ message, isUser = false, isLoading = false }: ChatMessageProps) => {
  return (
    <div className={cn("flex gap-3", isUser ? "flex-row-reverse" : "")}>
      <Avatar className="h-10 w-10">
        {isUser ? (
          <>
            <AvatarFallback>U</AvatarFallback>
            <AvatarImage src="https://i.pravatar.cc/300" alt="User" />
          </>
        ) : (
          <>
            <AvatarFallback className="bg-food-primary text-white">
              <Chef className="h-5 w-5" />
            </AvatarFallback>
            <AvatarImage src="/chef-ai.png" alt="ChefAI" />
          </>
        )}
      </Avatar>
      
      <Card className={cn(
        "px-4 py-3 max-w-[85%] md:max-w-[70%]",
        isUser ? "bg-primary text-primary-foreground" : "bg-muted",
        isLoading && "animate-pulse"
      )}>
        {isLoading ? (
          <div className="flex space-x-1">
            <div className="h-2 w-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "0s" }}></div>
            <div className="h-2 w-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            <div className="h-2 w-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "0.4s" }}></div>
          </div>
        ) : (
          <p>{message}</p>
        )}
      </Card>
    </div>
  );
};

export default ChatMessage;
