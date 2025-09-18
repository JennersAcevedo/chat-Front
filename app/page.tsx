import { ChatBox } from '../components';
import styles from '../styles/home.module.css';

// ----> Página Principal
export default function Home() {
  return (
    <div className={styles.page}>
      <ChatBox />
    </div>
  );
}
