import Link from "next/link";
import styles from "./BestArticles.module.css";
import formatDate from "@/lib/formatDate";
import Image from "next/image";

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
                <Image
                  src={article.image || "/img_default.svg"}
                  alt={article.title}
                  width={48}
                  height={45}
                />
              </div>
            </div>
            <div className={styles.textBox}>
              <div className={styles.userBox}>
                <span className={styles.name}>{article.writer?.nickname}</span>
                <div className={styles.likeBox}>
                  <div className={styles.likeImg} />
                  <span className={styles.likeNum}>{article.likeCount}</span>
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
