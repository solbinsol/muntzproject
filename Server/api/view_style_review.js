const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

// MySQL 연결
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '5475',
  database: 'Muntz',
  port: '3306',
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패:', err);
    return;
  }
  console.log('MySQL 연결 성공');
});

// 스타일 리뷰 조회 API
router.get('/:productId', (req, res) => {
  const productId = req.params.productId;

  // productId를 통해 스타일 리뷰 조회
  const query = `
    SELECT style_review_username AS username, 
           style_review_date AS date, 
           style_review_content AS content, 
           style_review_img AS img_path
    FROM style_review
    WHERE product_id = ?
  `;

  connection.query(query, [productId], (err, result) => {
    if (err) {
      console.error('데이터 조회 오류:', err);
      return res.status(500).send('리뷰 조회 실패');
    }
    res.json(result); // 결과를 클라이언트에 반환
  });
});

module.exports = router;
