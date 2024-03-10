import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "@/styles/AD/Stock.module.css";
import ProductList from "./ProductList";

export default function ProductAdd() {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [colorOptions, setColorOptions] = useState([]);
  const [stockQuantities, setStockQuantities] = useState({
    S: null,
    M: null,
    L: null,
    FREE: null,
  });

  useEffect(() => {
    // selectedProductId가 변경될 때마다 실행되는 useEffect
    if (selectedProductId) {
      // 선택된 상품의 color 정보를 가져오기
      axios.get(`http://115.23.171.88:5000/api/color/${selectedProductId}`)
        .then(response => {
          // 가져온 color 정보를 이용해 옵션 생성
          const colors = response.data.map(color => color.color);
          // 옵션을 state에 업데이트
          setColorOptions(colors);

          // 첫 번째 컬러를 선택하도록 업데이트
          setSelectedColor(colors[0]);
        })
        .catch(error => {
          console.error('색상 데이터 조회 오류:', error);
        });
    }
  }, [selectedProductId]);

  const renderColorOption = (color, index) => (
    <option key={index} value={color}>
      {color}
    </option>
  );

  const handleProductClick = (productId) => {
    // 선택된 상품의 product_id와 첫 번째 컬러를 저장
    setSelectedProductId(productId);
  };

  const handleStockChange = (size, value) => {
    setStockQuantities(prevStockQuantities => ({
      ...prevStockQuantities,
      [size]: value === "" ? null : parseInt(value, 10),
    }));
  };

  const handleStockRegistration = () => {
    // 클라이언트에서 서버로 재고 정보를 전송
    axios.post('http://115.23.171.88:5000/api/stockcheck/update-stock', {
      product_id: selectedProductId,
      color: selectedColor, // 선택한 컬러 값 추가
      ...stockQuantities,
    })
      .then(response => {
        // 서버로부터의 응답 처리
        console.log(response.data);
      })
      .catch(error => {
        console.error('API 호출 오류:', error);
      });
  };


  return (
    <div className={style.ProductAdd}>
      <div className={style.PrductCheck}>
        <h3>Select Product</h3>
        {/* ProductList 컴포넌트에 함수를 전달 */}
        <ProductList onProductClick={handleProductClick} />
      </div>
      <div className={style.Addbox}>
        <form>
          <div className={style.AddInfo}>
            <h3>STOCK</h3>
            <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
              {colorOptions.map((color, index) => (
                renderColorOption(color, index)
              ))}
            </select>


            <p>S 재고</p>
            <input
              type="number"
              value={stockQuantities.S === null ? "" : stockQuantities.S}
              onChange={(e) => handleStockChange('S', e.target.value)}
            />
          </div>
          <div className={style.AddInfo}>
            <p>M 재고</p>
            <input
              type="number"
              value={stockQuantities.M === null ? "" : stockQuantities.M}
              onChange={(e) => handleStockChange('M', e.target.value)}
            />
          </div>
          <div className={style.AddInfo}>
            <p>L 재고</p>
            <input
              type="number"
              value={stockQuantities.L === null ? "" : stockQuantities.L}
              onChange={(e) => handleStockChange('L', e.target.value)}
            />
          </div>
          <div className={style.AddInfo}>
            <p>FREE 재고</p>
            <input
              type="number"
              value={stockQuantities.FREE === null ? "" : stockQuantities.FREE}
              onChange={(e) => handleStockChange('FREE', e.target.value)}
            />
          </div>
          <button type="button" className={style.Abtn} onClick={handleStockRegistration}>
            재고 등록
          </button>
        </form>
      </div>
    </div>
  );
}
