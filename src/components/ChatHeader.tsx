import { Building2 } from 'lucide-react';
import { ModeToggle } from './mode-toggle';

export function ChatHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center gap-2 mr-6">
          <Building2 className="h-6 w-6" />
          <div className="font-semibold">UK Business Assistant</div>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2">
          <nav className="flex items-center space-x-6">
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Documentation
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              GitHub
            </a>
          </nav>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}