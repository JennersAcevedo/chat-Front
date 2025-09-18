import styles from '../styles/MessageBubble.module.css';

interface MessageBubbleProps {
  message: string;
  role: 'user' | 'bot';
  isTyping?: boolean;
}

// ----> MessageBubble Component
export default function MessageBubble({ message, role, isTyping = false }: MessageBubbleProps) {
  const isUser = role === 'user';
  
  return (
    <div
      className={`${styles.bubble} ${isUser ? styles.userBubble : styles.botBubble}`}
    >
      {isTyping ? (
        <div className={styles.typingContainer}>
          <span className={styles.typingText}>Typing</span>
          <span className={styles.typingDot}></span>
          <span className={styles.typingDot}></span>
          <span className={styles.typingDot}></span>
        </div>
      ) : (
        message
      )}
    </div>
  );
}
