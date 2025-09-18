import styles from '../styles/ChatHeader.module.css';

interface ChatHeaderProps {
  title?: string;
  subtitle?: string;
}

// ----> Componente ChatHeader
export default function ChatHeader({ 
  title = 'Tiny Chat', 

}: ChatHeaderProps) {
  return (
    <div className={styles.header}>
      <span className={styles.headerTitle}>{title}</span>
    </div>
  );
}
