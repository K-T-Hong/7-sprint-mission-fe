import "./BestProductList.css";
import React, { useState, useEffect } from "react";
import { getProduct } from "../api";
import ProductCard from "./ProductCard";
import { useScreenSize } from "./hooks/useScreenSize";
import { SCREEN_SIZE } from "./hooks/SCREEN_SIZE";

function BestProductList() {
  const screenSize = useScreenSize();
  let pageSize;
  if (screenSize === SCREEN_SIZE.DESKTOP) pageSize = 4;
  else if (screenSize === SCREEN_SIZE.TABLET) pageSize = 2;
  else pageSize = 1;

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
  }, [screenSize, pageSize]);

  return (
    <div className="bestListArea">
      <h1 className="bestTitle">베스트 상품</h1>
      <div className="bestItemList">
        {bestList.map(item => (
          <ProductCard key={item.id} item={item} size="large" />
        ))}
      </div>
    </div>
  );
}
export default BestProductList;
