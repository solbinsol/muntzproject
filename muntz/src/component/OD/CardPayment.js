import React from "react";
import style from "@/styles/OD/CardPayment.module.css"

export default function CardPayment(){

    return(
        <div className={style.CardPayment}>
            <p>* 소액 결제의 경우 PG사 정책에 따라 결제 금액 제한이 있을 수 있습니다.</p>
        </div>
    )
}