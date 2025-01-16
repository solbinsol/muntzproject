const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const connection = mysql.createConnection({
  // host: '115.23.171.88',
  host: 'localhost',  // 또는 '127.0.0.1'

  user: 'root',
  password: '5475',
  database: 'Muntz',
  port: '3306'
});

connection.connect((err) => {
    if (err) {
      console.error('MySQL 연결 실패:', err);
    } else {
      console.log('MySQL 연결 성공 basicreview');
    }
  });
  
// 리뷰 등록 API
router.post('/add', async (req, res) => {
    const { productId, username, content } = req.body;

    if (!productId || !username || !content) {
        return res.status(400).json({
            success: false,
            message: '필수 값이 누락되었습니다.',
        });
    }
    console.log(req.body); // 디버깅용으로 요청 본문 출력
    // SQL 쿼리 작성
    const query = `
        INSERT INTO basic_review (product_id, basic_review_username, basic_review_date, basic_review_content)
        VALUES (?, ?, ?, ?)
    `;

    const values = [productId, username, new Date(), content];

    // 쿼리 실행
    connection.execute(query, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: 'Failed to add review',
            });
        }

        // 성공적으로 리뷰가 추가되었을 경우
        res.status(201).json({
            success: true,
            message: 'Review added successfully',
            review: results,  // 새로 추가된 리뷰 정보 (디버깅용)
        });
    });
});

module.exports = router;
