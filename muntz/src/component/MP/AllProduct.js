import React, { useState, useEffect } from "react";
import style from "../../styles/Mp/AllProduct.module.css";
import ClosetBox from "../ClosetBox";
import axios from 'axios';

export default function NewProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // 서버로부터 데이터를 가져오는 함수
    const fetchData = async () => {
      try {
        const response = await axios.get('http://172.30.1.71:5000/api/products');
        const slicedProducts = response.data.slice(0, 300); // 최대 4개까지만 렌더링

        setProducts(slicedProducts);
      } catch (error) {
        console.error('API 호출 오류:', error);
      }
    };

    fetchData(); // fetchData 함수 호출
  }, []); // 두 번째 인자로 빈 배열을 전달하면 컴포넌트가 마운트될 때 한 번만 호출됨

  return (
    <div className={style.NewProduct}>
      <h2 className={style.MCTitle}>PRODUCT</h2>
      <ClosetBox products={products}></ClosetBox>
    </div>
  );
}
