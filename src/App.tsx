import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { ChatHeader } from "@/components/ChatHeader";
import { Toaster } from "@/components/ui/toaster";
import { MessageType } from "@/types";
import { processUserMessage } from "@/lib/chat";

function App() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: MessageType = {
      role: "user",
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await processUserMessage(input, messages);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: response.content,
        sources: response.sources,
        timestamp: Date.now()
      }]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
      
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I apologize, but I encountered an error processing your request. Please try again.",
        error: errorMessage,
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex-1 container mx-auto max-w-4xl px-4">
        <ChatHeader />
        
        <ScrollArea className="flex-1 h-[calc(100vh-12rem)] mt-4">
          <div className="space-y-4 pb-4">
            {messages.map((message, i) => (
              <ChatMessage key={`${message.timestamp}-${i}`} {...message} />
            ))}
            {isLoading && (
              <ChatMessage 
                role="assistant" 
                content="Processing your request..." 
                timestamp={Date.now()} 
              />
            )}
          </div>
        </ScrollArea>

        <div className="sticky bottom-0 bg-background py-4">
          <ChatInput
            input={input}
            isLoading={isLoading}
            onInputChange={setInput}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;