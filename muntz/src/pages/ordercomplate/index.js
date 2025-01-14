import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import style from '../../styles/OD/orderdetail.module.css'
const OrderComplete = () => {
  const router = useRouter();
  const { product_id, color, size, total_amount } = router.query; // 쿼리에서 데이터 가져오기
  const [orderInfo, setOrderInfo] = useState(null); // 주문 정보를 저장할 상태 변수
  const [hasProcessed, setHasProcessed] = useState(false); // 새로 고침 방지용 상태 변수
  const [countdown, setCountdown] = useState(3); // 카운트다운 상태

  useEffect(() => {
    if (hasProcessed || !product_id || !color || !size || !total_amount) return;

    const updateStock = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/updateStockOnPurchase', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ product_id, color, size }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('재고 업데이트 오류:', errorData.error || '알 수 없는 오류');
        } else {
          console.log('재고 업데이트 성공');
        }
      } catch (error) {
        console.error('재고 업데이트 요청 실패:', error.message);
      }
    };

    const placeOrder = async () => {
      const user = JSON.parse(localStorage.getItem('user'));

      if (!user) {
        console.error('사용자 정보가 없습니다.');
        return;
      }

      try {
        const orderResponse = await fetch('http://localhost:5000/api/orderdetail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            product_id,
            color,
            size,
            amount: total_amount,
            user_id: user.user_id,
            user_name: user.name,
          }),
        });

        if (!orderResponse.ok) {
          const errorData = await orderResponse.json();
          console.error('주문 처리 오류:', errorData.error || '알 수 없는 오류');
        } else {
          const orderData = await orderResponse.json();
          console.log('주문 성공:', orderData);
          setOrderInfo(orderData); // 주문 정보를 상태에 저장
        }
      } catch (error) {
        console.error('주문 요청 실패:', error.message);
      }
    };

    placeOrder();
    updateStock();
    setHasProcessed(true); // 처리 완료 플래그 설정
  }, [product_id, color, size, total_amount, hasProcessed]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      clearInterval(timer);
      router.push('/'); // 메인 페이지로 이동
    }

    return () => clearInterval(timer);
  }, [countdown, router]);

  return (
    <div className={style.OrderDetailPage}>
      <h1>결제가 완료되었습니다. 감사합니다!</h1>
      <p><span>{countdown}</span>초 후 메인 페이지로 이동합니다.</p>
    </div>
  );
};

export default OrderComplete;
