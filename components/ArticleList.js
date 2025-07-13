import Link from "next/link";
import formatDate from "@/lib/formatDate";
import styles from "./ArticleList.module.css";

export default function ArticleList({ articles }) {
  return (
    <ul>
      {articles?.map(article => (
        <li key={article.id}>
          <Link className={styles.area} href={`/articles/${article.id}`}>
            <div className={styles.titleBox}>
              <span className={styles.title}>{article.title}</span>
              <div className={styles.imgBox}>
                <div className={styles.img} />
              </div>
            </div>
            <div className={styles.textBox}>
              <div className={styles.userBox}>
                <div className={styles.userIc} />
                <span className={styles.name}>작성자닉네임</span>
                <span className={styles.date}>
                  {formatDate(article.createdAt)}
                </span>
              </div>
              <div className={styles.likeBox}>
                <div className={styles.likeImg} />
                <span className={styles.likeNum}>9999+</span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
