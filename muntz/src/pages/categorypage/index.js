import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';  // useRouter 추가
import style from "../../styles/Category.module.css";
import Footer from "@/component/Footer";
import Header from "@/component/Header";
import ClosetBox from "@/component/ClosetBox";
import axios from "axios";

export default function CategoryPage() {
  const [products, setProducts] = useState([]);
  const [cName, setCName] = useState("");
  const [sortBy, setSortBy] = useState("latest"); // 최신순을 기본값으로 설정
  const router = useRouter();  // useRouter를 이용하여 router 객체 생성

  useEffect(() => {
    const { categoryNo } = router.query;
    if(categoryNo === "1"){
        setCName("OUTER")
    }else if(categoryNo === "2"){
        setCName("TOP")
    }else if(categoryNo === "3"){
        setCName("BOTTOM")
    }else if(categoryNo === "4"){
        setCName("ACC")
    }
    const fetchData = async () => {
      try {
        console.log('Category number:', categoryNo);  // 추가
        if (!categoryNo) {
          console.error('Category number is not provided.');
          return;
        }
  
        // API 호출 시에 정렬 방식도 함께 전달
        const response = await axios.get(`http://localhost:5000/api/category?categoryNo=${categoryNo}&sortBy=${sortBy}`);
        console.log('API Response:', response.data);  // 추가
        setProducts(response.data);
      } catch (error) {
        console.error('API 호출 오류:', error);
      }
    };

    fetchData();
  }, [router.query.categoryNo, sortBy]); // sortBy가 변경될 때마다 다시 호출되도록 변경

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div>
        <Header />

        <div className={style.CategoryPage}>
        <div className={style.CategoryContent}>
            <div className={style.Cheader}>
                <h1 className={style.Category}>{cName}</h1>
                <select value={sortBy} onChange={handleSortChange}>
                    <option value="latest">최신순</option>
                    <option value="popularity">인기순</option>
                    <option value="views">조회순</option>
                </select>
            </div>

            <ClosetBox products={products} />
        </div>
        </div>
      <Footer />
    </div>
  );
}
