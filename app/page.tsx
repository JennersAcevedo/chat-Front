import { ChatBox } from '../components';
import styles from '../styles/home.module.css';

// ----> Main Page
export default function Home() {
  return (
    <div className={styles.page}>
      <ChatBox />
    </div>
  );
}
