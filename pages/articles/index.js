import ArticleList from "@/components/ArticleList";
import BestArticles from "@/components/BestArticles";
import DropDownButton from "@/components/DropDownButton";
import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import axios from "@/lib/axios";
import styles from "@/styles/articles.module.css";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

async function fetchArticles({ page, size, sort, keyword }) {
  const params = {
    page,
    size,
    sort: sort === "like" ? "likeCount,desc" : "createdAt,desc",
    ...(keyword && { keyword }),
  };
  const res = await axios.get("/articles", { params });
  return res.data;
}

async function fetchBestArticles() {
  const res = await axios.get("/articles", {
    params: { page: 1, size: 3, sort: "likeCount,desc" },
  });
  return res.data.list;
}

export default function Articles() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("recent");
  const [keyword, setKeyword] = useState("");
  const pageSize = 5;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["articles", page, sort, keyword],
    queryFn: () => fetchArticles({ page, size: pageSize, sort, keyword }),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const { data: bestArticles, isLoading: bestLoading } = useQuery({
    queryKey: ["best-articles"],
    queryFn: fetchBestArticles,
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 60,
  });

  return (
    <div className={styles.area}>
      <div className={styles.bestBox}>
        <h1 className={styles.bestTitle}>베스트 게시글</h1>
        <BestArticles articles={(bestArticles ?? []).slice(0, 3)} />
      </div>
      <div className={styles.articleList}>
        <div className={styles.listTitleBox}>
          <h1 className={styles.listTitle}>게시글</h1>
          <Link className={styles.postBtn} href="/articles/write">
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
          {isError ? (
            <div>에러 발생!</div>
          ) : isLoading ? (
            <div>로딩 중...</div>
          ) : (
            <ArticleList articles={(data.list ?? []).slice(0, 5)} />
          )}
        </div>
        {isLoading || !data ? null : (
          <Pagination
            page={page}
            totalPages={Math.ceil((data.totalCount ?? 1) / pageSize)}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
}
