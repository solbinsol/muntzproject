const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise'); // mysql2/promise를 가져와서 사용

// MySQL 연결 설정
const createConnection = async () => {
  return await mysql.createConnection({
    host: '115.23.171.88',
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
    // Perform cascading deletes based on foreign key constraints
    const connection = await createConnection();

    await connection.query('DELETE FROM stockcheck WHERE product_id = ?', [productId]);
    await connection.query('DELETE FROM color WHERE product_id = ?', [productId]);
    await connection.query('DELETE FROM productdetails WHERE product_id = ?', [productId]);
    await connection.query('DELETE FROM bottomsize WHERE product_id = ?', [productId]);
    await connection.query('DELETE FROM topsize WHERE product_id = ?', [productId]);
    
    // Finally, delete the product itself
    await connection.query('DELETE FROM products WHERE product_id = ?', [productId]);

    res.status(200).json({ success: true, message: 'Product and related entries deleted successfully.' });
  } catch (error) {
    console.error('API 호출 오류:', error);
    res.status(500).json({ success: false, message: 'Error deleting product and related entries.' });
  }
});

module.exports = router;
