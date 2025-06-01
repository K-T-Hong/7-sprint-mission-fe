import "./BestProductList.css";
import React, { useState, useEffect } from "react";
import { getProduct } from "../api";
import ProductCard from "./ProductCard";
import { usePageSize } from "./hooks/usePageSize";

function BestProductList() {
  const pageSize = usePageSize(4, 2, 1);
  const [bestList, setBestList] = useState([]);

  useEffect(() => {
    const bestData = async () => {
      const res = await getProduct();
      const bestItems = (res.list || [])
        .slice()
        .sort((a, b) => b.favoriteCount - a.favoriteCount)
        .slice(0, pageSize);
      setBestList(bestItems);
    };
    bestData();
  }, [pageSize]);

  return (
    <div className="bestListArea">
      <h1 className="bestTitle">베스트 상품</h1>
      <div className="bestItemList">
        {bestList.map((item) => (
          <ProductCard key={item.id} item={item} size="large" />
        ))}
      </div>
    </div>
  );
}
export default BestProductList;
