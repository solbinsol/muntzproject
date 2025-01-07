import React from "react";
import style from "@/styles/OD/KakaoPay.module.css"
import KakaoPayButton from "./KakaoPayButton";

export default function CardPayment(){

    return(
        <div className={style.CardPayment}>
            <p>* 카카오톡 앱을 설치한 후, 최초 1회 카드정보를 등록하셔야 사용 가능합니다.</p>
            <p>* 인터넷 익스플로러는 8 이상에서만 결제 가능합니다.</p>
            <p>* 현금영수증 발급은 ㈜카카오페이에서 발급가능합니다. </p>       

            <KakaoPayButton/>
        </div>
    )
}