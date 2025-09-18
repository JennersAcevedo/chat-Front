'use client';
import { useEffect, useRef, useState } from 'react';
import { chatApiService } from '../services';
import { ApiError } from '../services/chatService';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ErrorMessage from './ErrorMessage';
import styles from '../styles/ChatBox.module.css';

type Role = 'user' | 'bot';
interface MessageItem {
  id: string;
  role: Role;
  text: string;
}

// ----> ChatBox Component
export default function ChatBox() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto-scroll to last message
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Focus input on mount and after sending
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const send = async () => {
    const value = input.trim();
    if (!value || loading) return;

    setError(null);
    setLoading(true);
    
    // Clear input immediately when send is clicked
    setInput('');

    const userMsg: MessageItem = { id: crypto.randomUUID(), role: 'user', text: value };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const data = await chatApiService.sendMessage(value);
      const botMsg: MessageItem = { id: crypto.randomUUID(), role: 'bot', text: data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      if (error instanceof ApiError) {

        // NOT SHOWING THE ERROR MESSAGE IN THE CONSOLE FOR SECURITY
        // IF YOU WANT TO SEE THE ERROR MESSAGE IN THE CONSOLE, UNCOMMENT THE FOLLOWING CODE: 

      /*   console.log('API Error:', {
          message: error.message,
          status: error.status,
          name: error.name
        }); */
        setError(error.message);
      } else {
        console.error('Unexpected error:', error);
        setError('Unexpected error. Please try again.');
      }
    } finally {
      setLoading(false);
      // Re-focus the input
      inputRef.current?.focus();
    }
  };

  return (
    <div className={styles.wrapper}>
      <ChatHeader />
      
      <MessageList 
        ref={listRef}
        messages={messages} 
        isLoading={loading} 
      />

      {error && <ErrorMessage message={error} onClose={() => setError(null)} />}

      <MessageInput
        ref={inputRef}
        value={input}
        onChange={setInput}
        onSend={send}
        disabled={loading || !input.trim()}
      />
    </div>
  );
}
