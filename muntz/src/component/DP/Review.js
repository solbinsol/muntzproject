import React from "react"
import style from "@/styles/DP/Review.module.css"
import StyleReview from "./ReivewItem/StyleReview"

export default function Review(){

    
    return(
        <div className={style.Review}>
            <div className={style.ReviewNav}>
                <ul>
                    <li>Style Review</li>
                    <li>Basic Review</li>
                </ul>
            </div>
            <div className={style.ReviewBox}>
                <StyleReview></StyleReview>
            </div>
        </div>
    )
}