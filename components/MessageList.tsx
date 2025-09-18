import { forwardRef } from 'react';
import MessageBubble from './MessageBubble';
import styles from '../styles/MessageList.module.css';

interface MessageItem {
  id: string;
  role: 'user' | 'bot';
  text: string;
}

interface MessageListProps {
  messages: MessageItem[];
  isLoading: boolean;
}
// ----> Componente MessageList
const MessageList = forwardRef<HTMLDivElement, MessageListProps>(
  ({ messages, isLoading }, ref) => {
    return (
      <div ref={ref} className={styles.messages} aria-live="polite">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.row} ${
              message.role === 'user' ? styles.userRow : styles.botRow
            }`}
          >
            <MessageBubble
              message={message.text}
              role={message.role}
            />
          </div>
        ))}
        {isLoading && (
          <div className={`${styles.row} ${styles.botRow}`}>
            <MessageBubble message="" role="bot" isTyping />
          </div>
        )}
      </div>
    );
  }
);

MessageList.displayName = 'MessageList';

export default MessageList;
