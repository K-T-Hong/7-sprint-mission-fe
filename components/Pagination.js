import styles from "./Pagination.module.css";

export default function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className={styles.area}>
      <button
        className={styles.btn}
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        &lt;
      </button>
      {Array.from({ length: totalPages }).map((_, idx) => (
        <button
          className={
            page === idx + 1 ? `${styles.btn} ${styles.active}` : styles.btn
          }
          key={idx + 1}
          onClick={() => onPageChange(idx + 1)}
        >
          {idx + 1}
        </button>
      ))}
      <button
        className={styles.btn}
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        &gt;
      </button>
    </div>
  );
}
