import styles from '../styles/Footer.module.css';

interface FooterProps {
  className?: string;
}

// ----> Footer Component
export default function Footer({ className }: FooterProps) {
  return (
    <footer className={`${styles.footer} ${className || ''}`}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Tiny Chat</h3>
          <p className={styles.footerDescription}>
            A minimalist chat application built with Next.js and React.
          </p>
        </div>
        
        <div className={styles.footerSection}>
          <h4 className={styles.footerSubtitle}>Technologies</h4>
          <ul className={styles.footerList}>
            <li>Next.js 15</li>
            <li>React 19</li>
            <li>TypeScript</li>
            <li>CSS Modules</li>
          </ul>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <p className={styles.footerCopyright}>
          © 2024 Tiny Chat. Powered by Jenners Acevedo Berg.
        </p>
      </div>
    </footer>
  );
}

