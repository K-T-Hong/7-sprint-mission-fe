import "./ProductCard.css";
import React from "react";

function ProductCard({ item, size = "normal" }) {
  return (
    <div className={`card-area${size === "large" ? " card-large" : ""}`}>
      <img
        className="img-guide"
        src="https://picsum.photos/250/250"
        alt="상품이미지"
      />
      <div className="text-area">
        <h3 className="title-font">{item.name}</h3>
        <p className="price-font">{item.price}</p>
        <p className="like-font">❤ {item.favoriteCount}</p>
      </div>
    </div>
  );
}

export default ProductCard;
