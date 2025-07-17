import { useEffect, useRef, useState } from "react";
import styles from "./AuthStatus.module.css";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthStatus({ user, onLogout }) {
  const [showInfo, setShowInfo] = useState(false);
  const { logout } = useAuth();
  const infoBoxRef = useRef();

  const handleUserClick = () => setShowInfo(v => !v);

  useEffect(() => {
    if (!showInfo) return;
    function handleClickOutside(e) {
      if (infoBoxRef.current && !infoBoxRef.current.contains(e.target)) {
        setShowInfo(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showInfo]);

  const handleLogout = () => {
    logout();
    setShowInfo(false);
  };

  if (!user) return null;

  return (
    <div className={styles.userArea}>
      <div className={styles.userBox} onClick={handleUserClick}>
        <div className={styles.userIc} />
        <span className={styles.name}>{user.nickname}</span>
      </div>
      {showInfo && (
        <div className={styles.infoBox} ref={infoBoxRef}>
          <div className={styles.infoUser}>
            <div className={styles.infoIc} />
            <span className={styles.infoName}>{user.nickname}</span>
          </div>
          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <span className={styles.infoTitle}>나의 판매상품</span>
              <span className={styles.count}>{user.products ?? 0}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoTitle}>나의 게시글</span>
              <span className={styles.count}>{user.articles ?? 0}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoTitle}>나의 좋아요 목록</span>
              <span className={styles.count}>{user.favorites ?? 0}</span>
            </div>
          </div>
          <button className={styles.btn} onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}
