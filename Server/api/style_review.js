const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

// MySQL 연결
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
    return;
  }
  console.log('MySQL 연결 성공 Style_Review');
});

// POST 요청: 리뷰 추가
router.post('/', (req, res) => {
  const { product_id, username, content, img_path } = req.body;

  if (!product_id || !username || !content || !img_path) {
    return res.status(400).json({
      success: false,
      message: '모든 필드를 입력해야 합니다.',
    });
  }

  const query = `
    INSERT INTO style_review (product_id, style_review_username, style_review_content, style_review_img, style_review_date)
    VALUES (?, ?, ?, ?, NOW())
  `;

  connection.execute(query, [product_id, username, content, img_path], (err, result) => {
    if (err) {
      console.error('리뷰 추가 오류:', err);
      return res.status(500).json({
        success: false,
        message: '리뷰 등록에 실패했습니다.',
      });
    }

    res.status(200).json({
      success: true,
      message: '리뷰가 성공적으로 등록되었습니다.',
    });
  });
});

// GET 요청: 특정 상품 리뷰 조회
router.get('/:productId', (req, res) => {
  const productId = req.params.productId;
  console.log("서버에서 받은 productId:", productId); // 서버에서 받은 productId 확인
  
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
    res.json(result); // 결과 반환
  });
});

module.exports = router;  // 라우터 모듈을 내보냅니다.
