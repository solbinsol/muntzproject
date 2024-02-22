import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import style from "../../styles/detail.module.css";
import Footer from "@/component/Footer";
import Header from "@/component/Header";
import axios from "axios";
import ProductInfo from "@/component/DP/ProductInfo";
export default function DetailPage() {
    const [selectedTab, setSelectedTab] = useState('description');

  const router = useRouter();
  const [product, setProduct] = useState(null);
// DetailPage.js

// ... (이전 코드)
useEffect(() => {
    const fetchProduct = async () => {
        const { product_id } = router.query;

        try {
            if (!product_id) {
                console.error('Product ID is not provided.');
                return;
            }

            // 기존의 상품 정보를 가져오는 API
            const productResponse = await axios.get(`http://115.23.171.88:5000/api/product/${product_id}`);
            console.log('Product API Response:', productResponse.data);

            // 새로 추가한 ProductDetails 정보를 가져오는 API
            const productDetailsResponse = await axios.get(`http://115.23.171.88:5000/api/detail/${product_id}`);
            console.log('ProductDetails API Response:', productDetailsResponse.data);

            // 제품의 사이즈 정보를 가져오는 API
            const sizeResponse = await axios.get(`http://115.23.171.88:5000/api/size/${product_id}`);
            console.log('Size API Response:', sizeResponse.data);

            // 제품의 재고 정보를 가져오는 API
            const stockResponse = await axios.get(`http://115.23.171.88:5000/api/stock/${product_id}`);
            console.log('Stock API Response:', stockResponse.data);

            // 받아온 상품 정보, ProductDetails 정보, 사이즈 정보, 재고 정보를 합쳐서 상태에 저장
            const productWithDetailsAndSize = { 
                ...productResponse.data, 
                ...productDetailsResponse.data, 
                sizes: sizeResponse.data, 
                stock: stockResponse.data 
            };
            setProduct(productWithDetailsAndSize);
        } catch (error) {
            console.error('API 호출 오류:', error);
        }
    };

    fetchProduct();
}, [router.query.product_id]);

  return (
    <div>
      <Header />
      <div className={style.DetailPage}>
        <ProductInfo></ProductInfo>
      </div>
      <Footer />
    </div>
  );
}
