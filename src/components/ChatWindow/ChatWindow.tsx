import React, { useRef, useEffect } from 'react';
import { Send, Paperclip, MoreHorizontal } from 'lucide-react';
import MessageBubble from './MessageBubble';
import type { Message } from '../../types';
import './ChatWindow.css';

interface ChatWindowProps {
  messages: Message[];
  contactName: string;
  onSendMessage: (content: string) => void;
  isSending?: boolean;
  loading?: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  contactName,
  onSendMessage,
  isSending = false,
  loading = false,
}) => {
  const [inputValue, setInputValue] = React.useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isSending) {
      onSendMessage(inputValue);
      setInputValue('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustTextareaHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  if (loading) {
    return (
      <div className="chat-window chat-window--loading">
        <div className="chat-loading">Loading conversation...</div>
      </div>
    );
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="chat-header-info">
          <h3>{contactName}</h3>
          <span className="chat-status">Active now</span>
        </div>
        <button className="chat-header-btn">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="chat-empty">
            <p>No messages yet. Start a conversation!</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isFirstInGroup={idx === 0 || messages[idx - 1].isAgent !== msg.isAgent}
              isLastInGroup={idx === messages.length - 1 || messages[idx + 1].isAgent !== msg.isAgent}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-form" onSubmit={handleSubmit}>
        <button type="button" className="chat-attach-btn">
          <Paperclip size={20} />
        </button>
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={adjustTextareaHeight}
          onKeyDown={handleKeyDown}
          placeholder="Type something...."
          rows={1}
          className="chat-input"
          disabled={isSending}
        />
        <button type="submit" className="chat-send-btn" disabled={!inputValue.trim() || isSending}>
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;