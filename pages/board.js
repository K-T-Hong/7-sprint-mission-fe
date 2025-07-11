import ArticleList from "@/components/ArticleList";
import axios from "@/lib/axios";
import Link from "next/link";
import styles from "@/styles/board.module.css";
import Pagination from "@/components/Pagination";
import { useMemo, useState } from "react";
import DropDownButton from "@/components/DropDownButton";
import SearchInput from "@/components/SearchInput";
import BestArticles from "@/components/BestArticles";

export async function getStaticProps() {
  const res = await axios.get("/article");
  const articles = res.data.list;
  return { props: { articles } };
}

export default function Board({ articles }) {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [sort, setSort] = useState("recent");
  const [keyword, setKeyword] = useState("");

  const filteredArticles = useMemo(() => {
    const filtered = articles.filter(article =>
      article.title.toLowerCase().includes(keyword.toLowerCase())
    );
    if (sort === "like") {
      return [...filtered].sort((a, b) => b.like - a.like);
    } else {
      return [...filtered].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
  }, [articles, sort, keyword]);

  const newestArticle = useMemo(() => {
    return [...articles]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);
  }, [articles]);

  const totalPages = Math.ceil(filteredArticles.length / pageSize);
  const paginatedArticles = filteredArticles.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className={styles.area}>
      <div className={styles.bestBox}>
        <h1 className={styles.bestTitle}>베스트 게시글</h1>
        <BestArticles articles={newestArticle} />
      </div>
      <div className={styles.articleList}>
        <div className={styles.listTitleBox}>
          <h1 className={styles.listTitle}>게시글</h1>
          <Link className={styles.postBtn} href="/postArticle">
            글쓰기
          </Link>
        </div>
        <div className={styles.listOption}>
          <SearchInput
            className={styles.input}
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            placeholder="검색할 상품을 입력해주세요"
          />
          <DropDownButton sort={sort} setSort={setSort} />
        </div>
        <div className={styles.listBox}>
          <ArticleList articles={paginatedArticles} />
        </div>
        <div>
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}
