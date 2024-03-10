// ProductAdd.jsx
import React, { useState } from "react";
import axios from "axios";
import style from "@/styles/AD/ProductAdd.module.css";

export default function ProductAdd() {
  const [productName, setProductName] = useState("");
  const [categoryId, setCategoryId] = useState(1); // Default category: 아우터
  const [price, setPrice] = useState(0);
  const [color, setColor] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [detailPageImage, setDetailPageImage] = useState("");
  const [description, setDescription] = useState("");
  const [sizes, setSizes] = useState([
    { size: "S", length: 0, chest: 0, shoulder: 0, waist: 0, thigh: 0 },
    { size: "M", length: 0, chest: 0, shoulder: 0, waist: 0, thigh: 0 },
    { size: "L", length: 0, chest: 0, shoulder: 0, waist: 0, thigh: 0 },
  ]);

  const handleCategoryChange = (e) => {
    setCategoryId(parseInt(e.target.value, 10));
  };

  const renderSizeInputs = () => {
    // 선택한 카테고리에 따라 동적으로 입력 필드를 생성합니다.
    switch (categoryId) {
      case 1: // 아우터, 상의
      case 2:
        return (
          <>
            <th>size</th>
            <th>length</th>
            <th>chest</th>
            <th>shoulder</th>
          </>
        );
      case 3: // 하의
        return (
          <>
            <th>size</th>
            <th>length</th>
            <th>waist</th>
            <th>thigh</th>
          </>
        );
      default:
        return null;
    }
  };

  const handleSizeChange = (size, field, value) => {
    setSizes((prevSizes) =>
      prevSizes.map((s) => (s.size === size ? { ...s, [field]: value } : s))
    );
  };

  const handleProductAdd = () => {
    axios
      .post("http://115.23.171.88:5000/api/AddProduct/AddProduct", {
        productName,
        categoryId,
        price,
        color,
        thumbnailImage,
        detailPageImage,
        description,
        sizes,
      })
      .then((response) => {
        console.log(response.data.message);
        window.alert("성공");
        // 성공 시 추가적인 작업 수행
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        // 에러 처리
      });
  };

  return (
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
            <select onChange={handleCategoryChange}>
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
              블랙, 화이트 이렇게 ,로 구분
              예를 들어 블랙,화이트 이렇게하면 디비에 같은 프로덕트넘버 블랙 ,화이트 따로 저장
          */}
          <div className={style.AddInfo}>
            <p>컬러</p>
            <input type="text" onChange={(e) => setColor(e.target.value)} />
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
            <table>
              <thead>
                <tr>{renderSizeInputs()}</tr>
              </thead>
              <tbody>
                {sizes.map((size) => (
                  <tr key={size.size}>
                    <td>{size.size}</td>
                    <td>
                      <input
                        type="number"
                        value={size.length}
                        onChange={(e) => handleSizeChange(size.size, "length", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={size.chest}
                        onChange={(e) => handleSizeChange(size.size, "chest", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={size.shoulder}
                        onChange={(e) => handleSizeChange(size.size, "shoulder", e.target.value)}
                      />
                    </td>
                    {categoryId === 3 && (
                      <>
                        <td>
                          <input
                            type="number"
                            value={size.waist}
                            onChange={(e) => handleSizeChange(size.size, "waist", e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={size.thigh}
                            onChange={(e) => handleSizeChange(size.size, "thigh", e.target.value)}
                          />
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button type="button" className={style.Abtn} onClick={handleProductAdd}>
            제품 등록
          </button>
        </form>
      </div>
    </div>
  );
}
