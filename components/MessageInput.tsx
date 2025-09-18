import { forwardRef } from 'react';
import styles from '../styles/MessageInput.module.css';

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled: boolean;
  placeholder?: string;
}

// ----> MessageInput Component
const MessageInput = forwardRef<HTMLInputElement, MessageInputProps>(
  ({ value, onChange, onSend, disabled, placeholder = 'Type your message' }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        onSend();
      }
    };

    return (
      <div className={styles.inputRow}>
        <div className={styles.inputShell}>
          <input
            ref={ref}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            aria-label="Message"
            className={styles.input}
          />
          <button
            onClick={onSend}
            disabled={disabled}
            className={styles.iconButton}
            aria-label="Send message"
            title="Send"
          >
            {/* Send icon */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.icon}
            >
              <path
                d="M3.4 20.6L21 12 3.4 3.4l2.8 7.2 8 1.4-8 1.4-2.8 7.2z"
                stroke="currentColor"
                strokeWidth="1.6"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  }
);

MessageInput.displayName = 'MessageInput';

export default MessageInput;
