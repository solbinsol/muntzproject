const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

// MySQL 연결 설정
const createConnection = async () => {
  return await mysql.createConnection({
    host: 'localhost',  // 또는 '127.0.0.1'
    user: 'root',
    password: '5475',
    database: 'Muntz',
    port: '3306',
  });
};

// express.json() middleware 추가
router.use(express.json());

router.delete('/:productId', async (req, res) => {
  const productId = req.params.productId;

  try {
    // Create a connection
    const connection = await createConnection();

    // Disable foreign key checks
    await connection.query('SET FOREIGN_KEY_CHECKS=0');

    // Delete entries in related tables first
    await connection.query('DELETE FROM stockcheck WHERE product_id = ?', [productId]);
    await connection.query('DELETE FROM stock WHERE product_id = ?', [productId]);
    await connection.query('DELETE FROM bottomsize WHERE product_id = ?', [productId]);
    await connection.query('DELETE FROM topsize WHERE product_id = ?', [productId]);
    await connection.query('DELETE FROM productdetails WHERE product_id = ?', [productId]);
    await connection.query('DELETE FROM color WHERE product_id = ?', [productId]);
    
    // Finally, delete the product itself
    await connection.query('DELETE FROM products WHERE product_id = ?', [productId]);

    // Enable foreign key checks
    await connection.query('SET FOREIGN_KEY_CHECKS=1');

    res.status(200).json({ success: true, message: 'Product and related entries deleted successfully.' });
  } catch (error) {
    console.error('API 호출 오류:', error);
    res.status(500).json({ success: false, message: 'Error deleting product and related entries.' });
  }
});

module.exports = router;
