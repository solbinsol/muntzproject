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
    { size: "S", length: null, chest: null, shoulder: null, waist: null, thigh: null },
    { size: "M", length: null, chest: null, shoulder: null, waist: null, thigh: null },
    { size: "L", length: null, chest: null, shoulder: null, waist: null, thigh: null },
    { size: "FREE", length: null, chest: null, shoulder: null, waist: null, thigh: null },
  ]);

  const handleCategoryChange = (e) => {
    setCategoryId(parseInt(e.target.value, 10));
  };

  const renderSizeInputs = () => {
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
    if (size === "FREE") {
      setSizes((prevSizes) =>
        prevSizes.map((s) =>
          s.size === "FREE"
            ? { ...s, [field]: value }
            : { ...s, size: null, length: null, chest: null, shoulder: null, waist: null, thigh: null }
        )
      );
    } else {
      setSizes((prevSizes) =>
        prevSizes.map((s) =>
          s.size === size
            ? { ...s, [field]: value }
            : s.size === "FREE"
            ? { ...s, size: null, length: null, chest: null, shoulder: null, waist: null, thigh: null }
            : s
        )
      );
    }
  };

  const handleProductAdd = () => {
    const filteredSizes = sizes.filter((size) => size.size !== null);
    axios
      .post("http://localhost:5000/api/AddProduct/AddProduct", {
        productName,
        categoryId,
        price,
        color,
        thumbnailImage,
        detailPageImage,
        description,
        sizes: filteredSizes,
      })
      .then((response) => {
        console.log(response.data.message);
        window.alert("성공");
      })
      .catch((error) => {
        console.error("Error adding product:", error);
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
                  <tr key={size.size || "FREE"}>
                    <td>{size.size}</td>
                    <td>
                      <input
                        type="number"
                        value={size.length || ""}
                        onChange={(e) => handleSizeChange(size.size, "length", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={size.chest || ""}
                        onChange={(e) => handleSizeChange(size.size, "chest", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={size.shoulder || ""}
                        onChange={(e) => handleSizeChange(size.size, "shoulder", e.target.value)}
                      />
                    </td>
                    {categoryId === 3 && (
                      <>
                        <td>
                          <input
                            type="number"
                            value={size.waist || ""}
                            onChange={(e) => handleSizeChange(size.size, "waist", e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={size.thigh || ""}
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
