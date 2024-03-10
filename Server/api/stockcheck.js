// routes/api/stockcheck.js
const express = require('express');
const mysql = require('mysql2');

const router = express.Router();

const connection = mysql.createConnection({
  host: '115.23.171.88',
  user: 'root',
  password: '5475',
  database: 'Muntz',
  port: '3306'
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패:', err);
  } else {
    console.log('MySQL 연결 성공');
  }
});

// 재고 조회 또는 추가
router.post('/update-stock', async (req, res) => {
  const { product_id, color, size, S, M, L, FREE } = req.body;

  try {
    // 해당하는 product_id와 color가 이미 존재하는지 확인
    const checkExistingQuery = 'SELECT * FROM stockcheck WHERE product_id = ? AND color = ?';
    const [existingStock] = await connection.promise().query(checkExistingQuery, [product_id, color]);

    if (existingStock.length > 0) {
      // 이미 존재하는 경우, 재고 업데이트
      const updateStockQuery = `UPDATE stockcheck SET S = ?, M = ?, L = ?, FREE = ? WHERE product_id = ? AND color = ?`;
      await connection.promise().query(updateStockQuery, [S, M, L, FREE, product_id, color]);
    } else {
      // 존재하지 않는 경우, 새로운 재고 추가
      const insertStockQuery = `INSERT INTO stockcheck (product_id, color, S, M, L, FREE) VALUES (?, ?, ?, ?, ?, ?)`;
      await connection.promise().query(insertStockQuery, [product_id, color, S, M, L, FREE]);
    }

    res.json({ success: true, message: 'Stock updated successfully.' });
  } catch (error) {
    console.error('API 호출 오류:', error);
    res.status(500).json({ success: false, message: 'Error updating stock.' });
  }
});

module.exports = router;
