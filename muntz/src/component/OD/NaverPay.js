import React from "react";
import style from "@/styles/OD/NaverPay.module.css"

export default function CardPayment(){

    return(
        <div className={style.CardPayment}>
            <p>* 혜택 및 할부 적용 여부는 해당 카드사 정책에 따라 변경될 수 있습니다.</p>
            <p>* 네이버페이 카드 간편결제는 네이버페이에서 혜택을 받을 수 있습니다.</p>
        </div>
    )
}