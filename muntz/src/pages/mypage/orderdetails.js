import React from "react";
import style from "@/styles/MY/OrderDetails.module.css"
import Hedaer from "@/component/Header"
import Footer from "@/component/Footer"

export default function OrderDetails(){

    return(
        <div className={style.OrderDetails}>
            <Hedaer/>
                <div className={style.ODContent}>
                    <h2>OrderDetails</h2>
                    <ul className={style.ODList}>
                        <li className={style.ProdcutIMG}>
                            <img src="1.jpg"></img>
                        </li>
                        <li className={style.ProductName}>
                            내가 산 것 옷 이름 
                        </li>
                        <li className={style.BuyDate}>
                            <p>2024/01/01</p>
                        </li>
                        <li className={style.ProductSize}>
                            <p>FREE</p>
                        </li>
                        <li className={style.ProductPrice}>
                            <p>10,000원</p>
                        </li>
                        {/* 배송중일시 */}
                        <li className={style.Shipping}>
                            <button>배송조회</button>
                            <button>주문취소</button>
                        </li>
                    </ul>
                    

                    
                </div>
            <Footer/>
        </div>
    )
}