import { Bot, User } from 'lucide-react';
import { Card } from "@/components/ui/card";
import ReactMarkdown from 'react-markdown';
import { MessageType } from '@/types';

interface ChatMessageProps extends MessageType {}

export function ChatMessage({ role, content, sources }: ChatMessageProps) {
  return (
    <div className="space-y-4">
      <Card 
        className={`p-4 flex gap-3 ${
          role === 'assistant' 
            ? 'bg-muted' 
            : 'bg-primary text-primary-foreground'
        }`}
      >
        {role === 'assistant' ? (
          <Bot className="w-6 h-6 flex-shrink-0" />
        ) : (
          <User className="w-6 h-6 flex-shrink-0" />
        )}
        <div className="flex-1 space-y-4">
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
          
          {sources && sources.length > 0 && (
            <div className="border-t pt-4 mt-4">
              <h4 className="text-sm font-semibold mb-2">Sources:</h4>
              <ul className="space-y-2">
                {sources.map((source, index) => (
                  <li key={index} className="text-sm">
                    <a 
                      href={source.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      {source.title}
                    </a>
                    <p className="text-muted-foreground text-xs mt-1">
                      {source.snippet}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}