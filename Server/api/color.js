// routes/api/color.js
const express = require('express');
const mysql = require('mysql2');

const router = express.Router();

const connection = mysql.createConnection({
  host: 'localhost',
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

router.get('/:product_id', (req, res) => {
  const productId = req.params.product_id;

  connection.query('SELECT * FROM Color WHERE product_id = ?', [productId], (error, results) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      if (results.length > 0) {
        const colorInfo = results.map(color => ({
          color_id: color.color_id,
          color: color.color
        }));
        res.json(colorInfo);
      } else {
        res.status(404).json({ error: 'Color information not found' });
      }
    }
  });
});

module.exports = router;
