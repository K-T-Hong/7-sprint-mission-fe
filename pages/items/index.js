import DropDownButton from "@/components/DropDownButton";
import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import axios from "@/lib/axios";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "@/styles/items.module.css";
import ItemList from "@/components/ItemList";

export async function getStaticProps() {
  const res = await axios.get("products");
  const items = res.data.list;
  return { props: { items } };
}

export default function Items({ items }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sort, setSort] = useState("recent");
  const [keyword, setKeyword] = useState("");

  const filteredItems = useMemo(() => {
    const filtered = items.filter(item =>
      item.name.toLowerCase().includes(keyword.toLowerCase())
    );
    if (sort === "like") {
      return [...filtered].sort((a, b) => b.like - a.like);
    } else {
      return [...filtered].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
  }, [items, sort, keyword]);

  const totalPages = Math.ceil(filteredItems.length / pageSize);
  const paginatedItems = filteredItems.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  useEffect(() => {
    function updatePageSize() {
      const width = window.innerWidth;
      if (width > 1200) {
        setPageSize(10);
      } else if (width > 743) {
        setPageSize(6);
      } else {
        setPageSize(4);
      }
    }
    updatePageSize();
    window.addEventListener("resize", updatePageSize);
    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  return (
    <div className={styles.area}>
      <div className={styles.titleBar}>
        <h1 className={styles.title}>판매 중인 상품</h1>
        <SearchInput
          className={styles.input}
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          placeholder="검색할 상품을 입력해주세요"
        />
        <Link className={styles.postBtn} href="items/write">
          상품 등록하기
        </Link>
        <div className={styles.btnArea}>
          <DropDownButton sort={sort} setSort={setSort} />
        </div>
      </div>
      <div>
        <ItemList items={paginatedItems} />
      </div>
      <div>
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
