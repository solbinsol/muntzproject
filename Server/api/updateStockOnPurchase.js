// routes/api/updateStockOnPurchase.js
const express = require('express');
const mysql = require('mysql2');

const router = express.Router();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '5475',
  database: 'Muntz'
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패:', err);
  } else {
    console.log('MySQL 연결 성공');
  }
});

// POST 요청으로 구매 시 재고 업데이트
router.post('/', (req, res) => {
  const { product_id, color, size } = req.body;

  if (!product_id || !color || !size) {
    return res.status(400).json({ error: '필요한 파라미터가 부족합니다.' });
  }

  // 사이즈 컬럼 확인
  let sizeColumn;
  if (size === 'S') sizeColumn = 'S';
  else if (size === 'M') sizeColumn = 'M';
  else if (size === 'L') sizeColumn = 'L';
  else {
    return res.status(400).json({ error: '유효하지 않은 사이즈입니다.' });
  }

  // 재고 조회 쿼리
  const query = 'SELECT * FROM stockcheck WHERE product_id = ? AND color = ?';

  connection.query(query, [product_id, color], (err, results) => {
    if (err) {
      console.error('재고 조회 오류:', err);
      return res.status(500).json({ error: '서버 오류' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: '해당 상품 또는 색상을 찾을 수 없습니다.' });
    }

    const stock = results[0];

    if (stock[sizeColumn] <= 0) {
      return res.status(400).json({ error: '재고가 부족합니다.' });
    }

    // 재고 감소 쿼리
    const updateQuery = `UPDATE stockcheck SET ${sizeColumn} = ${sizeColumn} - 1 WHERE product_id = ? AND color = ?`;

    connection.query(updateQuery, [product_id, color], (updateErr, updateResults) => {
      if (updateErr) {
        console.error('재고 업데이트 오류:', updateErr);
        return res.status(500).json({ error: '서버 오류' });
      }

      // 업데이트된 재고 정보 반환
      connection.query(query, [product_id, color], (finalErr, finalResults) => {
        if (finalErr) {
          console.error('최종 재고 조회 오류:', finalErr);
          return res.status(500).json({ error: '서버 오류' });
        }

        res.json(finalResults[0]); // 업데이트된 재고 상태 반환
      });
    });
  });
});

module.exports = router;
