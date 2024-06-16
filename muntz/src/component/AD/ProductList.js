import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "@/styles/AD/ProductList.module.css";

const ProductList = ({ onProductClick, onDelete }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, [onDelete]); // onDelete 상태가 변경될 때마다 데이터를 다시 불러옴

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("API 호출 오류:", error);
    }
  };

  const handleProductClick = (productId, productName) => {
    onProductClick(productId, productName);
  };

  return (
    <div className={style.ProductList}>
      <table>
        <thead>
          <tr>
            <th className={style.PNO}>P.No</th>
            <th className={style.PNAME}>P.Name</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.product_id} onClick={() => handleProductClick(product.product_id, product.product_name)}>
              <td>{product.product_id}</td>
              <td>{product.product_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
