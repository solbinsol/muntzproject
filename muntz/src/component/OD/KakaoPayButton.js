import { useState } from 'react';

const KakaoPayButton = () => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/kakaoPay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 10000,
          name: '상품명',
        }),
      });

      if (!response.ok) {
        throw new Error('Payment request failed');
      }

      const data = await response.json();

      if (data.next_redirect_pc_url) {
        window.location.href = data.next_redirect_pc_url; // PC 웹 결제 페이지로 리다이렉트
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
      <button onClick={handlePayment} disabled={loading}>
        {loading ? '결제 준비 중...' : '카카오페이로 결제'}
      </button>
    </div>
  );
};

export default KakaoPayButton;
