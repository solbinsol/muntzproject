import React from "react";
import style from "@/styles/OD/Nobank.module.css"

export default function CardPayment(){

    return(
        <div className={style.Nobank}>
            <p className={style.LeftP}>입금계좌 </p>
            <p className={style.RightP}>국민은행 123-4556-88431 김주찬</p>
            <p className={style.LeftP}>입금자명: </p>
            <input id={style.RI }type="text"></input>
        </div>
    )
}