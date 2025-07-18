import DropDownButton from "@/components/DropDownButton";
import ItemList from "@/components/ItemList";
import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import axios from "@/lib/axios";
import styles from "@/styles/items.module.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";

async function fetchItems({ page, pageSize, sort, keyword }) {
  const params = {
    page,
    pageSize,
    orderBy: sort === "like" ? "favorite" : "recent",
    ...(keyword && { keyword }),
  };
  const res = await axios.get("/products", { params });
  return res.data;
}

async function fetchItem(id) {
  const res = await axios.get(`/products/${id}`);
  return res.data;
}

const getPageSizeByWidth = () => {
  if (typeof window === "undefined") return 10;
  const width = window.innerWidth;
  if (width > 1200) return 10;
  if (width > 743) return 6;
  return 4;
};

export default function Items() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(getPageSizeByWidth);
  const [sort, setSort] = useState("recent");
  const [keyword, setKeyword] = useState("");

  const queryClient = useQueryClient();

  useEffect(() => {
    function updatePageSize() {
      const newSize = getPageSizeByWidth();
      setPageSize(prev => {
        if (prev !== newSize) setPage(1);
        return newSize;
      });
    }
    window.addEventListener("resize", updatePageSize);
    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["items", page, pageSize, sort, keyword],
    queryFn: () => fetchItems({ page, pageSize, sort, keyword }),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["items", page + 1, pageSize, sort, keyword],
      queryFn: () => fetchItems({ page, pageSize, sort, keyword }),
    });
  }, [page, pageSize, sort, keyword, queryClient]);

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["items", page + 1, pageSize, sort, keyword],
      queryFn: () => fetchItems({ page: page + 1, pageSize, sort, keyword }),
    });
  }, [page, pageSize, sort, keyword, queryClient]);

  function handleItemHover(itemId) {
    queryClient.prefetchQuery({
      queryKey: ["item", itemId],
      queryFn: () => fetchItem(itemId),
    });
  }

  return (
    <div className={styles.area}>
      <div className={styles.titleBar}>
        <h1 className={styles.title}>판매 중인 상품</h1>
        <SearchInput
          className={styles.input}
          value={keyword}
          onChange={e => {
            setPage(1);
            setKeyword(e.target.value);
          }}
          placeholder="검색할 상품을 입력해주세요"
        />
        <Link className={styles.postBtn} href="/items/write">
          상품 등록하기
        </Link>
        <div className={styles.btnArea}>
          <DropDownButton sort={sort} setSort={setSort} />
        </div>
      </div>
      <div>
        {isError ? (
          <div>에러 발생!</div>
        ) : isLoading ? (
          <div>로딩 중...</div>
        ) : (
          <ItemList items={data?.list ?? []} onItemHover={handleItemHover} />
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
  );
}
