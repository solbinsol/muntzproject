const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '5475',
  database: 'Muntz',
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패:', err);
  } else {
    console.log('MySQL 연결 성공');
  }
});

// 마지막 주문 번호 조회 함수
const getLastOrderNumber = () => {
  return new Promise((resolve, reject) => {
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // 오늘 날짜 (예: 20250113)
    const query = `SELECT order_number FROM orderdetail WHERE order_number LIKE ? ORDER BY order_number DESC LIMIT 1`;
    connection.query(query, [`${today}%`], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// 주문 번호 생성 함수
const generateOrderNumber = async () => {
  try {
    const lastOrder = await getLastOrderNumber(); // 마지막 주문 번호 조회
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // 오늘 날짜 (예: 20250113)
    const time = new Date().toISOString().slice(11, 19).replace(/:/g, ''); // 현재 시간 (예: 180200)

    if (!lastOrder || lastOrder.length === 0) {
      // 첫 번째 주문일 경우 (순번 00001)
      return `${today}${time}00001`;
    }

    const lastOrderNumber = lastOrder[0].order_number; // 마지막 주문 번호
    const lastOrderSeq = parseInt(lastOrderNumber.slice(14), 10); // 마지막 순번 추출 (00001 -> 1)

    // 순번 증가 (다음 순번을 5자리로 패딩하여 반환)
    return `${today}${time}${(lastOrderSeq + 1).toString().padStart(5, '0')}`;
  } catch (err) {
    console.error('주문 번호 생성 오류:', err);
    throw err;
  }
};

// POST 요청으로 주문 정보 저장
router.post('/', async (req, res) => {
  const { product_id, color, size, amount, user_id, user_name } = req.body;

  // 필수 값이 전달되지 않으면 에러 처리
  if (!product_id || !color || !size || !amount || !user_id || !user_name) {
    return res.status(400).json({ error: '필요한 파라미터가 부족합니다.' });
  }

  try {
    const order_number = await generateOrderNumber(); // 자동 증가하는 주문 번호 생성
    const order_time = new Date().toISOString().slice(0, 19).replace('T', ' '); // '2025-01-13 18:02:00' 형식

    // 주문 정보 삽입 쿼리
    const query = `INSERT INTO orderdetail (order_number, order_time, product_id, payment_amount, user_id, user_name, color, size)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [order_number, order_time, product_id, amount, user_id, user_name, color, size];

    connection.query(query, values, (err, results) => {
      if (err) {
        console.error('주문 저장 오류:', err);
        return res.status(500).json({ error: '서버 오류' });
      }

      // 저장된 주문 ID 반환
      res.status(201).json({ order_id: results.insertId, order_number });
    });
  } catch (error) {
    console.error('주문 번호 생성 실패:', error);
    res.status(500).json({ error: '주문 번호 생성 실패' });
  }
});

module.exports = router;
