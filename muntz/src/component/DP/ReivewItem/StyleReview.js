import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import style from "@/styles/DP/StyleReview.module.css";

export default function Review({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log('Received productId:', productId); // productId 값 확인

  // 슬라이더 설정
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false, // 중앙 정렬을 해제합니다.
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          centerMode: false, // 반응형에서도 중앙 정렬을 해제합니다.
        },
      },
    ],
  };

  // 스타일 리뷰를 API에서 가져오는 함수
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const productIdString = String(productId); // productId를 문자열로 변환
        console.log("Fetching reviews for productId:", productIdString); // 변환된 productId 확인
        const response = await axios.get(
          `http://localhost:5000/api/view_style_review/${productIdString}`
        );
        console.log(response.data); // 데이터 확인
        setReviews(response.data);
      } catch (err) {
        setError("리뷰를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={style.Review}>
      <div className={style.ReviewBox}>
        <Slider {...settings}>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className={style.ReivewItem}>
                <h3>{review.username}</h3>
                {/* Date format 변환 */}
                <span>{new Date(review.date).toLocaleDateString()}</span>
                <img src={review.img_path} alt="Review" />
                <p className={style.ReivewText}>{review.content}</p>
              </div>
            ))
          ) : (
            <div className={style.NoReivewBox}>
                <p className={style.NoReview}>리뷰가 없습니다.</p>
            </div>
          )}
        </Slider>
      </div>
    </div>
  );
}
