const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// MySQL 연결 설정
const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    password: '5475',
    database: 'Muntz',
    port: '3306'
});

// MySQL 연결 테스트
connection.connect((err) => {
    if (err) {
        console.error('MySQL 연결 실패:', err);
    } else {
        console.log('MySQL 연결 성공 view_detail');
    }
});

// 특정 productId에 대한 상세 이미지 조회 API
router.get('/:productId', (req, res) => {
    const { productId } = req.params; // URL에서 productId 가져오기

    const query = `
        SELECT detail_page_image FROM productdetails WHERE product_id = ?;
    `;

    connection.execute(query, [productId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch detail page image',
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No detail page image found for this product',
            });
        }

        res.status(200).json({
            success: true,
            detail_page_image: results[0].detail_page_image,
        });
    });
});

module.exports = router;
