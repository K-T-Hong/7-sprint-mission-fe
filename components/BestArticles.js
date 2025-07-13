import Link from "next/link";
import styles from "./BestArticles.module.css";
import formatDate from "@/lib/formatDate";

export default function BestArticles({ articles }) {
  return (
    <ul className={styles.range}>
      {articles?.map((article, idx) => (
        <li
          key={article.id}
          className={`${styles["best-item"]} ${styles[`best-item-${idx + 1}`]}`}
        >
          <Link className={styles.area} href={`/articles/${article.id}`}>
            <div className={styles.badge} />
            <div className={styles.titleBox}>
              <span className={styles.title}>{article.title}</span>
              <div className={styles.imgBox}>
                <div className={styles.img} />
              </div>
            </div>
            <div className={styles.textBox}>
              <div className={styles.userBox}>
                <span className={styles.name}>작성자닉네임</span>
                <div className={styles.likeBox}>
                  <div className={styles.likeImg} />
                  <span className={styles.likeNum}>9999+</span>
                </div>
              </div>
              <span className={styles.date}>
                {formatDate(article.createdAt)}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
