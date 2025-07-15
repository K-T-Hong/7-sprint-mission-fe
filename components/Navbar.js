import styles from "@/components/Navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  const path = router.pathname;

  const isArticlesActive = path.startsWith("/articles");
  const isItmesActive = path.startsWith("/items");

  return (
    <nav className={styles.navArea}>
      <div className={styles.navbar}>
        <div className={styles.box}>
          <Link href="/" className={styles.logo} />
          <Link
            href="/articles"
            className={`${styles.navbarPage} ${
              isArticlesActive ? styles.active : ""
            }`}
          >
            자유게시판
          </Link>
          <Link
            href="/items"
            className={`${styles.navbarPage} ${
              isItmesActive ? styles.active : ""
            }`}
          >
            중고마켓
          </Link>
        </div>
        <Link href="/login" className={styles.login}>
          로그인
        </Link>
      </div>
    </nav>
  );
}
