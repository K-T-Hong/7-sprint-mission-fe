import styles from "./Pagination.module.css";

export default function Pagination({ page, totalPages, onPageChange }) {
  const maxPage = 5;

  const half = Math.floor(maxPage / 2);
  let start = Math.max(1, page - half);
  let end = start + maxPage - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - maxPage + 1);
  }

  const pageNumbers = [];
  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className={styles.area}>
      <button
        className={styles.btn}
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        &lt;
      </button>

      {pageNumbers.map(num => (
        <button
          className={
            page === num ? `${styles.btn} ${styles.active}` : styles.btn
          }
          key={num}
          onClick={() => onPageChange(num)}
        >
          {num}
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
