// routes/api/stock.js
const express = require('express');
const mysql = require('mysql2');

const router = express.Router();

const connection = mysql.createConnection({
  host: '115.23.171.88',
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

// GET 요청에 대한 라우터
router.get('/:product_id/:color', (req, res) => {
  const { product_id, color } = req.params;

  // MySQL 쿼리를 사용하여 product_id와 color_id에 기반한 재고 조회
  const query = 'SELECT * FROM stockcheck WHERE product_id = ? AND color = ?';

  connection.query(query, [product_id, color], (err, results) => {
    if (err) {
      console.error('재고 조회 오류:', err);
      res.status(500).json({ error: '서버 오류' });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
