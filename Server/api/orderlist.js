const express = require('express');
const mysql = require('mysql2/promise');
const router = express.Router();

// MySQL 연결 설정
const pool = mysql.createPool({
  host: 'localhost', // 또는 '127.0.0.1'
  user: 'root',
  password: '5475',
  database: 'Muntz',
  port: '3306',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// 주문 정보 조회 API
router.post('/', async (req, res) => {
    const { user_id } = req.body;

    if (!user_id) {
        return res.status(400).json({ error: "user_id is required" });
    }

    try {
        const [rows] = await pool.query(
            `SELECT 
                order_id, order_number, order_time, product_id, payment_amount, color, size 
             FROM 
                orderdetail 
             WHERE 
                user_id = ?`, 
            [user_id]
        );

        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching order details:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
