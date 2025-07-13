import { useEffect } from "react";
import styles from "./Toast.module.css";

export default function Toast({ message, onClose, duration = 2000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [message, onClose, duration]);

  if (!message) return null;

  return <div className={styles.toast}>{message}</div>;
}
