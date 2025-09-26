import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Paperclip, Mic } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim() || disabled) return;
    onSendMessage(message);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t border-border flex-shrink-0">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" disabled={disabled}>
          <Paperclip className="w-4 h-4" />
        </Button>
        <div className="flex-1 relative">
          <Input 
            value={message} 
            onChange={e => setMessage(e.target.value)} 
            onKeyPress={handleKeyPress} 
            placeholder="Ask Aku anything about your studies..." 
            className="pr-20 text-base"
            disabled={disabled}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <Button variant="ghost" size="icon" className="w-8 h-8" disabled={disabled}>
              <Mic className="w-4 h-4" />
            </Button>
            <Button 
              onClick={handleSend} 
              className="w-8 h-8 button-primary" 
              size="icon"
              disabled={disabled || !message.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};