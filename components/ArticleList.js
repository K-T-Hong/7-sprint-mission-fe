import Link from "next/link";
import formatDate from "@/lib/formatDate";

export default function ArticleList({ articles }) {
  return (
    <ul>
      {articles?.map(article => (
        <li key={article.id}>
          <Link href={`/article/${article.id}`}>
            <div>
              <span>{article.title}</span>
            </div>
            <div>
              <span>{formatDate(article.updatedAt)}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
