import styles from "./DeleteModal.module.css";

export default function DeleteModal({ open, message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.msg}>{message}</div>
        <div className={styles.btnArea}>
          <button className={styles.cancel} onClick={onCancel}>
            취소
          </button>
          <button className={styles.delete} onClick={onConfirm}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
