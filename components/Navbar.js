import styles from "@/components/Navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className={styles.navArea}>
      <div className={styles.navbar}>
        <div className={styles.box}>
          <Link href="/" className={styles.logo} />
          <Link
            href="/board"
            className={`${styles.navbarPage} ${
              router.pathname === "/board" ? styles.active : ""
            }`}
          >
            자유게시판
          </Link>
          <Link
            href="/items"
            className={`${styles.navbarPage} ${
              router.pathname === "/items" ? styles.active : ""
            }`}
          >
            중고마켓
          </Link>
        </div>
        <button className={styles.loginButton}>로그인</button>
      </div>
    </nav>
  );
}
