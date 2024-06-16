import React, { useState } from "react";
import axios from "axios";
import style from "@/styles/AD/Stock.module.css";
import ProductList from "./ProductList";

export default function ProductAdd() {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProductName, setSelectedProductName] = useState(null);
  const [onDelete, setOnDelete] = useState(false);

  const handleProductClick = (productId, productName) => {
    setSelectedProductId(productId);
    setSelectedProductName(productName);
  };

  const handleProductDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/product_delete/${selectedProductId}`);
      setSelectedProductId(null);
      setSelectedProductName(null);
      
      // onDelete 상태 변경으로 ProductList에 삭제를 알림
      setOnDelete(!onDelete);

      console.log("Product deleted successfully");
    } catch (error) {
      console.error("API 호출 오류:", error);
    }
  };

  return (
    <div className={style.ProductAdd}>
      <div className={style.PrductCheck}>
        <h3>Select Product</h3>
        <div>
          <ProductList onProductClick={handleProductClick} onDelete={onDelete} />
        </div>
      </div>
      <div className={style.Addbox}>
        <form>
          <p className={style.SelectID}>선택 된 제품 ID: {selectedProductId}</p>
          <p className={style.SelectName}>선택 된 제품 Name: {selectedProductName}</p>
          <button type="button" className={style.Abtn} onClick={handleProductDelete}>
            제품 삭제
          </button>
        </form>
      </div>
    </div>
  );
}
