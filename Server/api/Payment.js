const express = require('express');
const mysql = require('mysql2');

const router = express.Router();

const connection = mysql.createConnection({
  host: 'localhost', // 또는 '127.0.0.1'
  user: 'root',
  password: '5475',
  database: 'Muntz',
  port: '3306',
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패:', err);
  } else {
    console.log('MySQL 연결 성공');
  }
});

// 특정 product_id로 product_name과 price를 조회하는 API
router.get('/:product_id', (req, res) => {
  const { product_id } = req.params;

  const query = `
    SELECT product_name, price 
    FROM product 
    WHERE product_id = ?
  `;

  connection.query(query, [product_id], (err, results) => {
    if (err) {
      console.error('MySQL 조회 오류:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.status(200).json(results[0]);
    }
  });
});

module.exports = router;
