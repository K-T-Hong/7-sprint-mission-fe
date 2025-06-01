import "./ProductList.css";
import React from "react";
import ProductCard from "./ProductCard.jsx";
import { useProductList } from "./hooks/useProductList.js";
import { usePagination } from "./hooks/usePagination.js";
import { usePageSize } from "./hooks/usePageSize.js";

function ProductList() {
  const pageSize = usePageSize(10, 6, 4);

  const {
    items,
    totalCount,
    search,
    setSearch,
    sort,
    setSort,
    page,
    setPage,
    handleSearch,
    handleSortChange,
  } = useProductList(pageSize);

  const { pageNumbers, hasPrev, hasNext, handlePageChange } = usePagination({
    page,
    setPage,
    totalCount,
    pageSize,
    siblingCount: 2,
  });

  return (
    <div>
      <div className="listArea">
        <div className="titleBar">
          <h1 className="barTitle">판매 중인 상품</h1>
          <div className="optionBar">
            <input
              className="searchInput"
              type="text"
              placeholder="검색할 상품을 입력해주세요"
              value={search}
              onChange={handleSearch}
            />
            <button className="registrationButton">상품 등록하기</button>
            <select
              className="selectButton"
              value={sort}
              onChange={handleSortChange}
            >
              <option value="recent">최신순</option>
              <option value="favoriteCount">좋아요순</option>
            </select>
          </div>
        </div>
        <div className="productCardArea">
          {items.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="pageButtonArea">
        <button
          className="pageButton"
          onClick={() => handlePageChange(page - 1)}
          disabled={!hasPrev}
        >
          &lt;
        </button>
        {pageNumbers.map((num) => (
          <button
            className={`pageButton${num === page ? " active" : ""}`}
            key={num}
            onClick={() => handlePageChange(num)}
            disabled={num === page}
          >
            {num}
          </button>
        ))}
        <button
          className="pageButton"
          onClick={() => handlePageChange(page + 1)}
          disabled={!hasNext}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default ProductList;
