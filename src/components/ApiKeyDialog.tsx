import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { validateApiKey } from '@/lib/api';

interface ApiKeyDialogProps {
  open: boolean;
  onValidKey: () => void;
}

export function ApiKeyDialog({ open, onValidKey }: ApiKeyDialogProps) {
  const [apiKey, setApiKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsValidating(true);
    setError('');

    try {
      const isValid = await validateApiKey();
      if (isValid) {
        onValidKey();
      } else {
        setError('Invalid API key');
      }
    } catch {
      setError('Failed to validate API key');
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <Dialog open={open} modal>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter your API key</DialogTitle>
          <DialogDescription>
            Please enter your API key to use the chat. You can find your API key in your account settings.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              disabled={isValidating}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={!apiKey || isValidating}
          >
            {isValidating ? 'Validating...' : 'Submit'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}