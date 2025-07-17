import styles from "@/components/Navbar.module.css";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthStatus from "./AuthStatus";

export default function Navbar() {
  const { user, logout } = useAuth();
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
        {user ? (
          <AuthStatus user={user} onLogout={logout} />
        ) : (
          <Link href="/login" className={styles.login}>
            로그인
          </Link>
        )}
      </div>
    </nav>
  );
}
