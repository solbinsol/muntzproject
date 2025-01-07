export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { amount, name } = req.body;

      const response = await fetch('https://kapi.kakao.com/v1/payment/ready', {
        method: 'POST',
        headers: {
          Authorization: `KakaoAK YOUR_KAKAO_ADMIN_KEY`, // 카카오 Admin Key
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          cid: 'TC0ONETIME', // 테스트용 CID
          partner_order_id: `order_${new Date().getTime()}`,
          partner_user_id: 'user1234',
          item_name: name,
          quantity: '1',
          total_amount: amount,
          tax_free_amount: '0',
          approval_url: 'https://yourwebsite.com/success', // 성공 시 리다이렉트될 URL
          cancel_url: 'https://yourwebsite.com/cancel', // 취소 시 리다이렉트될 URL
          fail_url: 'https://yourwebsite.com/fail', // 실패 시 리다이렉트될 URL
        }).toString(),
      });

      const data = await response.json();

      if (response.ok) {
        res.status(200).json(data);
      } else {
        res.status(response.status).json({ error: data.msg });
      }
    } catch (error) {
      console.error('Kakao Pay API error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
