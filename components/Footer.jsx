import styles from "@/components/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footerArea}>
      <div className={styles.footerContent}>
        <div className="codeit">
          <p>©codeit - 2024</p>
        </div>
        <div className={styles.linkPage}>
          <p>Privacy Policy</p>
          <p>FAQ</p>
        </div>
        <div className={styles.linkSns}>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/ic_instagram.svg" alt="인스타 링크" width={20} />
          </a>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/ic_youtube.svg" alt="유튜브 링크" width={20} />
          </a>
          <a
            href="https://www.twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/ic_twitter.svg" alt="트위터 링크" width={20} />
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/ic_facebook.svg" alt="페이스북 링크" width={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
