import { useState, useEffect } from 'react';
import style from '../../styles/OD/KakaoPay.module.css';

const KakaoPayButton = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const user_id = JSON.parse(localStorage.getItem('user')).user_id;
  // 페이지 URL에서 쿼리 파라미터를 추출
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product_id');
    const colorParam = urlParams.get('color');
    const sizeParam = urlParams.get('size');

    setColor(colorParam);
    setSize(sizeParam);

    // 상품 데이터 fetch
    const fetchProduct = async () => {
      if (!productId) return;
      try {
        const response = await fetch(`http://localhost:5000/api/product/${productId}`);
        const data = await response.json();
    
        // 데이터를 확인하는 로그
        console.log('Fetched Product Data:', data);
    
        setProduct(data);
      } catch (error) {
        console.error('상품 데이터를 가져오는데 실패했습니다:', error.message);
      }
    };

    fetchProduct();
  }, []);



  


  const handlePayment = async () => {
    if (!product) {
      alert('상품 정보를 불러올 수 없습니다.');
      return;
    }
  
    setLoading(true);
    try {
      const response = await fetch('/api/kakaoPay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: product.product_id,
          amount: product.price,
          name: product.product_name,
          color: color,
          size: size,
          user_id,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Payment request failed');
      }
  
      const data = await response.json();
  
      if (data.next_redirect_pc_url) {
        // 새 창에서 결제 페이지 열기 (CORS 문제 방지)
        const paymentWindow = window.open(data.next_redirect_pc_url, '_blank');
        if (!paymentWindow) {
          alert('결제 창을 열 수 없습니다.');
        }
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Payment error:', error.message);
      alert('결제 요청 중 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };
  
  
  
  return (
    <div>
      <button onClick={handlePayment} disabled={loading} className={style.Buy}>
        {loading ? '결제 준비 중...' : '카카오페이로 결제'}
      </button>
    </div>
  );
};

export default KakaoPayButton;
