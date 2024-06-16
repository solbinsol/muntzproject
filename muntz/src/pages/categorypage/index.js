import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import style from "../../styles/Category.module.css";
import Footer from "@/component/Footer";
import Header from "@/component/Header";
import ClosetBox from "@/component/ClosetBox";
import axios from "axios";

export default function CategoryPage() {
  const [products, setProducts] = useState([]);
  const [cName, setCName] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { categoryNo } = router.query;

        if (!categoryNo) {
          console.error('Category number is not provided.');
          return;
        }

        let categoryName = "";
        if (categoryNo === "1") {
          categoryName = "OUTER";
        } else if (categoryNo === "2") {
          categoryName = "TOP";
        } else if (categoryNo === "3") {
          categoryName = "BOTTOM";
        } else if (categoryNo === "4") {
          categoryName = "ACC";
        }
        setCName(categoryName);

        console.log('Fetching data for category:', categoryNo, 'with sort:', sortBy);
        const response = await axios.get(`http://localhost:5000/api/category`, {
          params: { categoryNo, sortBy }
        });

        console.log('API Response:', response.data);
        setProducts(response.data);
      } catch (error) {
        console.error('API 호출 오류:', error);
      }
    };

    fetchData();
  }, [router.query.categoryNo, sortBy]);

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
