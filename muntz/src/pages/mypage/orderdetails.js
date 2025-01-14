    import React, { useEffect, useState } from "react";
    import axios from "axios";
    import style from "@/styles/MY/OrderDetails.module.css";
    import Header from "@/component/Header";
    import Footer from "@/component/Footer";

    export default function OrderDetails() {
        const [orderDetails, setOrderDetails] = useState([]); // 주문 데이터 상태
        const [loading, setLoading] = useState(true); // 로딩 상태
        const [error, setError] = useState(null); // 에러 상태

        useEffect(() => {
            const fetchOrderDetails = async () => {
                try {
                    // 로컬 스토리지에서 user 정보 가져오기
                    const storedUser = JSON.parse(localStorage.getItem("user"));
                    if (!storedUser || !storedUser.user_id) {
                        setError("로그인이 필요합니다.");
                        setLoading(false);
                        return;
                    }
    
                    // 주문 데이터 호출
                    const response = await axios.post("http://localhost:5000/api/orderlist", {
                        user_id: storedUser.user_id,
                    });
    
                    const orderData = response.data;
    
                    // 각 제품의 상세 정보 호출
                    const productDetailsPromises = orderData.map(async (order) => {
                        const productResponse = await axios.get(
                            `http://localhost:5000/api/product/${order.product_id}`
                        );
                        return {
                            ...order,
                            product_name: productResponse.data.product_name,
                            thumbnail_image: productResponse.data.thumbnail_image,
                        };
                    });
    
                    // 모든 상세 정보 병합 후 상태 업데이트
                    const enrichedOrderDetails = await Promise.all(productDetailsPromises);
                    setOrderDetails(enrichedOrderDetails);
                } catch (err) {
                    console.error("Error fetching order details:", err);
                    setError("주문 데이터를 불러오는 중 오류가 발생했습니다.");
                } finally {
                    setLoading(false); // 로딩 종료
                }
            };
    
            fetchOrderDetails();
        }, []);
    
        // 로딩 중일 때
        if (loading) {
            return <p>Loading...</p>;
        }
    
        // 에러 발생 시
        if (error) {
            return <p>{error}</p>;
        }

        return (
            <div>
                <Header />
            <div className={style.OrderDetails}>
                
                <div className={style.ODContent}>
                    <h2>Order Details</h2>
                    {orderDetails.length > 0 ? (
                        <ul className={style.ODList}>
                            {orderDetails.map((order) => (
                                <li key={order.order_id} className={style.OrderItem}>
                                    <div className={style.ProdcutIMG}>
                                        <img
                                            src={order.thumbnail_image}
                                            alt={`Product ${order.product_id}`}
                                        />
                                    </div>
                                    <div className={style.ProductName}>
                                        <p>{order.order_number}</p>
                                    </div>
                                    <div className={style.BuyDate}>
                                        <p>{new Date(order.order_time).toLocaleString()}</p>
                                    </div>

                                    <div className={style.ProductSize}>
                                        <p>
                                            {order.product_name}    
                                        </p>
                                        <p>
                                            Color: {order.color} / Size: {order.size}
                                        </p>

                                        <div className={style.ProductPrice}>
                                            <p>{order.payment_amount.toLocaleString()}원</p>
                                        </div>
                                    </div>
    
                                    <div className={style.Shipping}>
                                        <button className={style.JoinBtn}>배송조회</button>
                                        <button>주문취소</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>주문 내역이 없습니다.</p>
                    )}
                </div>
                <Footer />
            </div>
            </div>
        );
    }
