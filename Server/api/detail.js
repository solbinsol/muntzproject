// detail.js

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

router.get('/:product_id', (req, res) => {
  const productId = req.params.product_id;

  connection.query('SELECT * FROM ProductDetails WHERE product_id = ?', [productId], (error, results) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      if (results.length > 0) {
        const productDetails = results[0];
        res.json(productDetails);
      } else {
        res.status(404).json({ error: 'ProductDetails not found' });
      }
    }
  });
});

module.exports = router;
