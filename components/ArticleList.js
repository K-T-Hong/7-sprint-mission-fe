import Link from "next/link";
import formatDate from "@/lib/formatDate";
import styles from "./ArticleList.module.css";
import Image from "next/image";

export default function ArticleList({ articles, onArticleHover }) {
  return (
    <ul>
      {articles?.map(article => (
        <li
          key={article.id}
          onMouseEnter={() => onArticleHover && onArticleHover(article.id)}
        >
          <Link className={styles.area} href={`/articles/${article.id}`}>
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
                <div className={styles.userIc} />
                <span className={styles.name}>{article.writer?.nickname}</span>
                <span className={styles.date}>
                  {formatDate(article.createdAt)}
                </span>
              </div>
              <div className={styles.likeBox}>
                <div className={styles.likeImg} />
                <span className={styles.likeNum}>{article.likeCount}</span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
