import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ChatInput({ 
  input, 
  isLoading, 
  onInputChange, 
  onSubmit 
}: ChatInputProps) {
  return (
    <form onSubmit={onSubmit} className="flex gap-3 max-w-3xl mx-auto">
      <Input
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="Enter company name or ask about a specific business aspect..."
        disabled={isLoading}
        className="flex-1"
      />
      <Button 
        type="submit" 
        disabled={isLoading}
        size="icon"
      >
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
}