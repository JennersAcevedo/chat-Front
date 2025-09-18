import styles from '../styles/ErrorMessage.module.css';

interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
}

// ----> Componente ErrorMessage
export default function ErrorMessage({ message, onClose }: ErrorMessageProps) {
  return (
    <div role="alert" className={styles.error}>
      <span className={styles.errorMessage}>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Cerrar mensaje de error"
          title="Cerrar"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.closeIcon}
          >
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
