import React, { useState } from "react";
import axios from "axios";
import style from "@/styles/AD/ProductAdd.module.css";

export default function ProductAdd() {
  // 상태 값들 설정
  const [selectedProductType, setSelectedProductType] = useState("상의");

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState(1); // 기본값으로 상의 설정
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [detailPageImage, setDetailPageImage] = useState("");
  const [description, setDescription] = useState("");


  const [sizes, setSizes] = useState([
    { size_category_id: 1, size_type: "총장", size_value_s: 0, size_value_m: 0, size_value_l: 0 },
    { size_category_id: 1, size_type: "가슴", size_value_s: 0, size_value_m: 0, size_value_l: 0 },
    { size_category_id: 1, size_type: "어깨", size_value_s: 0, size_value_m: 0, size_value_l: 0 },
    { size_category_id: 2, size_type: "총장", size_value_s: 0, size_value_m: 0, size_value_l: 0 },
    { size_category_id: 2, size_type: "밑위", size_value_s: 0, size_value_m: 0, size_value_l: 0 },
    { size_category_id: 2, size_type: "허벅지", size_value_s: 0, size_value_m: 0, size_value_l: 0 },
  ]);

  const [stocks, setStocks] = useState({ stock_quantity_s: 0, stock_quantity_m: 0, stock_quantity_l: 0 });

  // 제품 등록 처리 함수
  const handleAddProduct = async () => {
    try {
      // API 호출

      const formattedSizes = sizes.map((size) => ({
        size_category_id: size.size_category_id,
        size_type: size.size_type,
        size_value_s: size.size_value_s,
        size_value_m: size.size_value_m,
        size_value_l: size.size_value_l,
      }));


      const response = await axios.post("http://172.30.1.71:5000/api/AddProduct/AddProduct", {
        productName,
        price,
        categoryId,
        thumbnailImage,
        detailPageImage,
        description,
        sizes: formattedSizes,
        stocks,
      });

      console.log(response.data); // 성공 시 응답 데이터 출력
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const renderSizeTable = () => {
    const sizeColumns = selectedProductType === "상의" ? ["S", "M", "L"] : ["S", "M", "L"];

    return (
      <table>
        <thead>
          <tr>
            <th>사이즈</th>
            {sizeColumns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sizes
            .filter((size) => size.size_category_id === (selectedProductType === "상의" ? 1 : 2))
            .map((size, index) => (
              <tr key={index}>
                <td>{size.size_type}</td>
                <td>
                  <input
                    type="number"
                    onChange={(e) => handleSizeChange(index, "size_value_s", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    onChange={(e) => handleSizeChange(index, "size_value_m", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    onChange={(e) => handleSizeChange(index, "size_value_l", e.target.value)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  };

  // 각 사이즈의 값 변경 처리 함수
  const handleSizeChange = (index, key, value) => {
    setSizes((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index][key] = value;
      return newSizes;
    });
  };

    return(
        <div className={style.ProductAdd}>
            <div className={style.Addbox}>
                <form>
                    <div className={style.AddInfo}>
                        <h3>PRODUCT</h3>
                        <p>제품 이름</p>
                        <input type="text" onChange={(e) => setProductName(e.target.value)} />
                    </div>
                    <div className={style.AddInfo}>
                        <p>카테고리</p>
                        <select onChange={(e) => setCategoryId(e.target.value)}>
                        <option value={1}>아우터</option>
                        <option value={2}>상의</option>
                        <option value={3}>하의</option>
                        <option value={4}>기타</option>
                        </select>
                    </div>
                    <div className={style.AddInfo}>
                        <p>가격</p>
                        <input type="number" onChange={(e) => setPrice(e.target.value)} />
                    </div>

                    {/* 추가 
                      블랙, 화이트 이렇게 ,로 구분 가능하면 좋을듯
                    */}
                    <div className={style.AddInfo}>
                        <p>컬러</p>
                        <input type="text"  />
                    </div>

                    <div className={style.AddInfo}>
                        <p>썸네일 이미지</p>
                        <input type="text" onChange={(e) => setThumbnailImage(e.target.value)} />
                    </div>
                    <div className={style.AddInfo}>
                        <p>상세페이지 이미지</p>
                        <input type="text" onChange={(e) => setDetailPageImage(e.target.value)} />
                    </div>
                    <div className={style.AddInfo}>
                        <p>제품 설명</p>
                        <textarea onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className={style.AddInfo}>
                        <h3>Size</h3>
                        {/* <p>제품 타입</p> */}
                        {/* <select onChange={(e) => setSelectedProductType(e.target.value)}>
                        <option>상의</option>
                        <option>하의</option>
                        </select> */}
                        {renderSizeTable()}

                        {/* <div className={style.AddInfo}>
                               <h3>STOCK</h3>
                            <p className={style.TT2}>FREE SIZE : S 만 등록</p>
                            <p>S 재고</p>
                            <input type="number" onChange={(e) => setStocks({ ...stocks, stock_quantity_s: e.target.value })} />
                        </div>
                        <div className={style.AddInfo}>
                            <p>M 재고</p>
                            <input type="number" onChange={(e) => setStocks({ ...stocks, stock_quantity_m: e.target.value })} />
                        </div>
                        <div className={style.AddInfo}>
                            <p>L 재고</p>
                            <input type="number" onChange={(e) => setStocks({ ...stocks, stock_quantity_l: e.target.value })} />
                        </div> */}

                    </div>
                      <button type="button" className={style.Abtn} onClick={handleAddProduct}>
                        제품 등록
                    </button>
                </form>
            </div>
        </div>
    )
}