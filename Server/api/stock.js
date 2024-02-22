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

// 제품의 재고 정보를 조회하는 API
router.get('/:product_id', (req, res) => {
  const productId = req.params.product_id;

  connection.query(
    'SELECT Stock.stock_quantity_s, Stock.stock_quantity_m, Stock.stock_quantity_l FROM Stock JOIN ProductSize ON Stock.product_id = ProductSize.product_id WHERE Stock.product_id = ?',
    [productId],
    (error, results) => {
      if (error) {
        res.status(500).json({ error });
      } else {
        if (results.length > 0) {
          const stockInfo = results[0];
          res.json(stockInfo);
        } else {
          res.status(404).json({ error: 'Stock information not found' });
        }
      }
    }
  );
});

module.exports = router;
