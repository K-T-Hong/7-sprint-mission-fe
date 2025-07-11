import ArticleList from "@/components/ArticleList";
import axios from "@/lib/axios";
import Link from "next/link";
import styles from "@/styles/board.module.css";
import Pagination from "@/components/Pagination";
import { useMemo, useState } from "react";
import DropDownButton from "@/components/DropDownButton";

export async function getStaticProps() {
  const res = await axios.get("/article");

  const articles = res.data.list;

  return { props: { articles } };
}

export default function Board({ articles }) {
  const [page, setPage] = useState(1);
  const perPage = 5;
  const [sort, setSort] = useState("recent");

  const sortedArticles = useMemo(() => {
    if (sort === "like") {
      return [...articles].sort((a, b) => b.like - a.like);
    } else {
      return [...articles].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
  });
  const totalPages = Math.ceil(sortedArticles.length / perPage);
  const paginatedArticles = sortedArticles.slice(
    (page - 1) * perPage,
    page * perPage
  );

  return (
    <div className={styles.area}>
      <div className={styles.bestBox}>
        <h1 className={styles.bestTitle}>베스트 게시글</h1>
        <div className={styles.bestArticle}>
          <h1>일단 최신순 3개 개시글 시간되면 좋아요 순으로 변경</h1>
        </div>
      </div>
      <div className={styles.articleList}>
        <div className={styles.listTitleBox}>
          <h1 className={styles.listTitle}>게시글</h1>
          <Link className={styles.postBtn} href="/postArticle">
            글쓰기
          </Link>
        </div>
        <div className={styles.listOption}>
          <input
            className={styles.input}
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
