import React from "react";
import ProductList from "./ProductList";
import BestProductList from "./BestProductList";

function Mainpage() {
  return (
    <>
      <div>
        <BestProductList />
      </div>
      <div>
        <ProductList />
      </div>
    </>
  );
}

export default Mainpage;
