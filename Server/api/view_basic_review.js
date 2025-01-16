const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

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
        console.log('MySQL 연결 성공 basicreview');
    }
});

// 특정 productId에 대한 리뷰 조회 API
router.get('/:productId', (req, res) => {
    const { productId } = req.params;  // URL에서 productId 가져오기

    const query = `
        SELECT * FROM basic_review WHERE product_id = ?;
    `;

    connection.execute(query, [productId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch reviews',
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No reviews found for this product',
            });
        }

        res.status(200).json({
            success: true,
            reviews: results,
        });
    });
});

module.exports = router;
