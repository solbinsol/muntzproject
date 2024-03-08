import React from "react";
import style from "@/styles/DP/BasicReview.module.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function BasicReview(){
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesPerRow:1,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 601,
              settings: {
                slidesToShow: 3,
                row:1,
                centerMode: false,
              },
            },
          ],

      };
      

    return(
        
            <div className={style.BR}>

                <div className={style.BasicReview}>
                <Slider {...settings} className={style.Slider}>

                    <div className={style.ReviewBox}>
                        <p className={style.NickName}>닉네임1</p><span className={style.Date}>00/00/00</span>
                        <img src="https://ifh.cc/g/wvsotz.jpg"/>
                        <p className={style.ProductName}>product name</p><span className={style.size}>Size</span>
                        <p className={style.Coment}>이 옷에 대한 댓글</p>
                    </div>
                    <div className={style.ReviewBox}>
                        <p className={style.NickName}>닉네임2</p><span className={style.Date}>00/00/00</span>
                        <img src="https://ifh.cc/g/wvsotz.jpg"/>
                        <p className={style.ProductName}>product name</p><span className={style.size}>Size</span>
                        <p className={style.Coment}>이 옷에 대한 댓글</p>
                    </div>
                    <div className={style.ReviewBox}>
                        <p className={style.NickName}>닉네임3</p><span className={style.Date}>00/00/00</span>
                        <img src="https://ifh.cc/g/wvsotz.jpg"/>
                        <p className={style.ProductName}>product name</p><span className={style.size}>Size</span>
                        <p className={style.Coment}>이 옷에 대한 댓글</p>
                    </div>            <div className={style.ReviewBox}>
                        <p className={style.NickName}>닉네임4</p><span className={style.Date}>00/00/00</span>
                        <img src="https://ifh.cc/g/wvsotz.jpg"/>
                        <p className={style.ProductName}>product name</p><span className={style.size}>Size</span>
                        <p className={style.Coment}>이 옷에 대한 댓글</p>

                    </div>            
                    <div className={style.ReviewBox}>
                        <p className={style.NickName}>닉네임5</p><span className={style.Date}>00/00/00</span>
                        
                        <img src="https://ifh.cc/g/wvsotz.jpg"/>
                        <p className={style.ProductName}>product name</p><span className={style.size}>Size</span>
                        <p className={style.Coment}>이 옷에 대한 댓글</p>
                    </div>            
                    <div className={style.ReviewBox}>
                        <p className={style.NickName}>닉네임6</p><span className={style.Date}>00/00/00</span>
                        <img src="https://ifh.cc/g/wvsotz.jpg"/>
                        <p className={style.ProductName}>product name</p><span className={style.size}>Size</span>
                        <p className={style.Coment}>이 옷에 대한 댓글</p>

                    </div>
                    <div className={style.ReviewBox}>
                        <p className={style.NickName}>닉네임7</p><span className={style.Date}>00/00/00</span>
                        <img src="https://ifh.cc/g/wvsotz.jpg"/>
                        <p className={style.ProductName}>product name</p><span className={style.size}>Size</span>
                        <p className={style.Coment}>이 옷에 대한 댓글</p>

                    </div>

                    </Slider>


                </div>

                </div>
    )
}