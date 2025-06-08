import { useEffect, useState } from "react";
import { getProduct } from "../../api";

export function useProductList(pageSize = 10) {
  const [allItems, setAllItems] = useState([]);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recent");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const productData = async () => {
      const res = await getProduct();
      console.log("전체상품", res.list.length);
      setAllItems(res.list || []);
    };
    productData();
  }, []);

  useEffect(() => {
    let list = allItems;
    // 검색 필터
    if (search.trim()) {
      list = list.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    // 정렬
    list = list.slice().sort((a, b) => {
      if (sort === "createdAt") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sort === "favoriteCount") {
        return b.favoriteCount - a.favoriteCount;
      }
      return 0;
    });

    const totalPages = Math.ceil(list.length / pageSize);
    if (page > totalPages && totalPages > 0) {
      setPage(1);
      return;
    }

    setTotalCount(list.length);
    setItems(list.slice((page - 1) * pageSize, page * pageSize));
  }, [allItems, page, pageSize, sort, search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  return {
    items,
    totalCount,
    search,
    setSearch,
    sort,
    setSort,
    page,
    setPage,
    pageSize,
    handleSearch,
    handleSortChange,
  };
}
