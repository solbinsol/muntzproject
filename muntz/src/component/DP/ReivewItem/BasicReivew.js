import React, { useState, useEffect } from "react";
import axios from 'axios';
import style from "@/styles/DP/BasicReview.module.css";

export default function BasicReview({ productId }) {
    const [reviews, setReviews] = useState([]);
    const [product, setProduct] = useState(null);  // 제품 정보 상태 추가

    // 컴포넌트가 마운트될 때 리뷰 및 제품 데이터를 가져오는 함수
    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const productIdString = String(productId); // productId를 문자열로 변환
                
                // 리뷰 데이터 가져오기
                const reviewResponse = await axios.get(`http://localhost:5000/api/view_basic_review/${productIdString}`);
                console.log('Review Response:', reviewResponse);  // 리뷰 응답 로그 출력
                if (reviewResponse.data && reviewResponse.data.success) {
                    setReviews(reviewResponse.data.reviews); // 리뷰 데이터를 상태로 저장
                } else {
                    console.log('리뷰 데이터를 가져오지 못했습니다.');
                }

                // 제품 데이터 가져오기 (썸네일 이미지)
                const productResponse = await axios.get(`http://localhost:5000/api/product/${productIdString}`);
                console.log('Product Response:', productResponse);  // 제품 응답 로그 출력
                
                // productResponse.data를 사용하여 직접 제품 정보 저장
                if (productResponse.data) {
                    setProduct(productResponse.data); // 제품 정보를 상태로 저장
                } else {
                    console.log('제품 데이터를 가져오지 못했습니다.');
                }
            } catch (error) {
                console.error('데이터 가져오기 오류:', error);
            }
        };

        if (productId) {
            fetchData();
        }
    }, [productId]);  // productId가 바뀔 때마다 데이터를 새로 가져옴

    return (
        <div className={style.BR}>
            <div className={style.BasicReview}>
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div className={style.ReviewBox} key={review.Basic_Review_Id}>
                            <p className={style.NickName}>{review.Basic_Review_Username}</p>
                            <span className={style.Date}>{new Date(review.Basic_Review_Date).toLocaleDateString()}</span>
                            
                            {/* 제품 데이터가 로드되었으면 썸네일 이미지 표시 */}
                            {product ? (
                                <img src={product.thumbnail_image} alt="review image" />
                            ) : (
                                <p>이미지 없음</p>
                            )}
                            
                            <p className={style.Coment}>{review.Basic_Review_Content}</p>
                        </div>
                    ))
                ) : (
                    <div className={style.NoReivewBox}>
                        <p className={style.NoReview}>리뷰가 없습니다.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
