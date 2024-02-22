import React, { useState } from "react";
import axios from "axios";
import style from "@/styles/AD/Stock.module.css";

export default function ProductAdd() {
  // 상태 값들 설정




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


      const response = await axios.post("http://localhost:5000/api/AddProduct/AddProduct", {
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




    return(
        <div className={style.ProductAdd}>
          <div className={style.PrductCheck}>
            <h3>Select Product</h3>
            <div>
              <table>
                <tr>
                  <th className={style.PNO}>P.No</th>
                  <th className={style.PNAME}>P.Name</th>
                </tr>
                <tr>
                  <td>p.no</td>
                  <td>p.name</td>
                </tr>
              </table>
            </div>
          </div>
            <div className={style.Addbox}>
                <form>

                        <div className={style.AddInfo}>
                               <h3>STOCK</h3>
                               <select>
                          <option>컬러1</option>
                          <option>컬러1</option>
                          <option>컬러1</option>
                        </select>
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
                        </div> 

                      <button type="button" className={style.Abtn} onClick={handleAddProduct}>
                        재고 등록
                    </button>
                </form>
            </div>
        </div>
    )
}