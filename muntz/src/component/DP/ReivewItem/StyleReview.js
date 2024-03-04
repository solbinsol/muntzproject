import React from "react"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "@/styles/DP/StyleReview.module.css"

export default function Review(){
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,

      };
    
    return(
        <div className={style.Review}>
            <div className={style.ReviewBox}>
            <Slider {...settings}>

                <div className={style.ReivewItem}>
                    <h3>u.name닉넴1</h3><span>date 00/00/00</span>
                    <img src="https://ifh.cc/g/wvsotz.jpg"/>
                    <p className={style.ReivewText}>이 옷은 솰라솰라</p>
                </div>
                <div className={style.ReivewItem}>
                    <h3>u.name닉넴2</h3><span>date 00/00/00</span>
                    <img src="https://ifh.cc/g/wvsotz.jpg"/>
                    <p className={style.ReivewText}>이 옷은 솰라솰라</p>
                </div>
                <div className={style.ReivewItem}>
                    <h3>u.name닉넴3</h3><span>date 00/00/00</span>
                    <img src="https://ifh.cc/g/wvsotz.jpg"/>
                    <p className={style.ReivewText}>이 옷은 솰라솰라</p>
                </div>
                <div className={style.ReivewItem}>
                    <h3>u.name닉넴4</h3><span>date 00/00/00</span>
                    <img src="https://ifh.cc/g/wvsotz.jpg"/>
                    <p className={style.ReivewText}>이 옷은 솰라솰라</p>
                </div>
                <div className={style.ReivewItem}>
                    <h3>u.name닉넴5</h3><span>date 00/00/00</span>
                    <img src="https://ifh.cc/g/wvsotz.jpg"/>
                    <p className={style.ReivewText}>이 옷은 솰라솰라</p>
                </div>
            </Slider>

            </div>

        </div>
    )
}