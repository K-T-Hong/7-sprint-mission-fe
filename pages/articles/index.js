import ArticleList from "@/components/ArticleList";
import BestArticles from "@/components/BestArticles";
import DropDownButton from "@/components/DropDownButton";
import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import axios from "@/lib/axios";
import styles from "@/styles/articles.module.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";

async function fetchArticles({ page, pageSize, sort, keyword }) {
  const params = {
    page,
    pageSize,
    orderBy: sort === "like" ? "like" : "recent",
    ...(keyword && { keyword }),
  };
  const res = await axios.get("/articles", { params });
  return res.data;
}

async function fetchArticle(id) {
  const res = await axios.get(`/articles/${id}`);
  return res.data;
}

async function fetchBestArticles() {
  const res = await axios.get("/articles", {
    params: { page: 1, size: 3, orderBy: "like" },
  });
  return res.data.list;
}

export default function Articles() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("recent");
  const [keyword, setKeyword] = useState("");
  const pageSize = 5;

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["articles", page, sort, keyword],
    queryFn: () => fetchArticles({ page, pageSize, sort, keyword }),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["articles", page + 1, sort, keyword],
      queryFn: () => fetchArticles({ page: page + 1, pageSize, sort, keyword }),
    });
  }, [page, sort, keyword, pageSize, queryClient]);

  function handleArticleHover(articleId) {
    queryClient.prefetchQuery({
      queryKey: ["article", articleId],
      queryFn: () => fetchArticle(articleId),
    });
  }

  const { data: bestArticles } = useQuery({
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
            onChange={e => {
              setPage(1);
              setKeyword(e.target.value);
            }}
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
            <ArticleList
              articles={data.list ?? []}
              onArticleHover={handleArticleHover}
            />
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
