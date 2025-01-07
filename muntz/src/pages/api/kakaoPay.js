// /pages/api/kakaoPay.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {

        {/*}
        const { product_id, quantity } = req.body; // product_id와 quantity를 요청에서 받아옴

        // `/api/payment/:product_id`를 호출하여 product_name과 price 조회
        const paymentResponse = await fetch(`http://localhost:5000/api/payment/${product_id}`);
        if (!paymentResponse.ok) {
          const errorData = await paymentResponse.json();
          return res.status(paymentResponse.status).json({ error: errorData.error || 'Product data fetch failed' });
        }
        const { product_name, price } = await paymentResponse.json();
  
        // 총액 계산
        const total_amount = price * quantity;



        const { amount, name } = req.body;
        
    */}
        // 카카오페이 REST API 호출
        const response = await fetch('https://kapi.kakao.com/v1/payment/ready', {
          method: 'POST',
          headers: {
            Authorization: `KakaoAK 693c3278978cb9d040251a332b23557d`, // "KakaoAK "를 반드시 포함해야 함

            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            cid: 'TC0ONETIME', // 테스트용 CID
            partner_order_id: `order_${new Date().getTime()}`, // 주문 번호
            partner_user_id: 'user_1234', // 로그인한 회원의 이름
            item_name: 'test', // product 테이블의 product_id를 이용한 product_name 조회
            quantity: 1, // 수량 // order페이지에서 선택한 수량
            total_amount: 10000, // product 테이블의 product_id를 이용한 price 조회
            tax_free_amount: 0, // 비과세 금액
            approval_url: 'https://yourwebsite.com/success', // 결제 성공 시 리다이렉트 URL
            cancel_url: 'https://yourwebsite.com/cancel', // 결제 취소 시 리다이렉트 URL
            fail_url: 'https://yourwebsite.com/fail', // 결제 실패 시 리다이렉트 URL
          }).toString(),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          res.status(200).json(data); // 클라이언트로 결제 URL 반환
        } else {
          res.status(response.status).json({ error: data.msg });
        }
      } catch (error) {
        console.error('Kakao Pay API Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  