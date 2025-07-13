import styles from "./Modal.module.css";

export default function Modal({ open, message, onClose }) {
  if (!open) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.msg}>{message}</div>
        <button className={styles.btn} onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
}
