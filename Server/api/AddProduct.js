// AddProductRouter.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// MySQL 연결 설정
const connection = mysql.createConnection({
  // host: '115.23.171.88',
  host: 'localhost',  // 또는 '127.0.0.1'
  user: 'root',
  password: '5475',
  database: 'Muntz',
  port: '3306',
});

// express.json() middleware 추가
router.use(express.json());

router.post('/AddProduct', async (req, res) => {
  try {
    const {
      productName,
      categoryId,
      price,
      color,
      thumbnailImage,
      detailPageImage,
      description,
      sizes,
    } = req.body;

    // Insert into products table
    const productResult = await queryPromise(
      connection,
      'INSERT INTO products (product_name, category_id, price, thumbnail_image) VALUES (?, ?, ?, ?)',
      [productName, categoryId, price, thumbnailImage]
    );

    const productId = productResult.insertId;

    // Insert into productdetails table
    await queryPromise(
      connection,
      'INSERT INTO productdetails (product_id, detail_page_image, description) VALUES (?, ?, ?)',
      [productId, detailPageImage, description]
    );

    // Insert into colors table
    const colorResults = await Promise.all(
      color.split(',').map((c) =>
        queryPromise(connection, 'INSERT INTO color (product_id, color) VALUES (?, ?)', [
          productId,
          c.trim(),
        ])
      )
    );

    if (colorResults.some((result) => !result || result.affectedRows === 0)) {
      throw new Error('Color insertion failed');
    }

    let sizesTable;
    let sizeColumns;
    if (categoryId === 1 || categoryId === 2) {
      sizesTable = 'topsize';
      sizeColumns = ['product_id', 'size', 'length', 'chest', 'shoulder'];
    } else if (categoryId === 3) {
      sizesTable = 'bottomsize';
      sizeColumns = ['product_id', 'size', 'length', 'waist', 'thigh'];
    } else {
      res.status(400).json({ error: 'Invalid Category ID' });
      return;
    }
    
    // Use Promise.all to wait for all size insert queries to complete
    const sizeResults = await Promise.all(
      sizes.map((size) =>
        queryPromise(
          connection,
          `INSERT INTO ${sizesTable} (${sizeColumns.join(', ')}) VALUES (?, ?, ?, ?, ?)`,
          [productId, size.size, size.length, size.chest || size.waist, size.shoulder || size.thigh]
        )
      )
    );

    if (sizeResults.some((result) => !result || result.affectedRows === 0)) {
      throw new Error('Size insertion failed');
    }

    res.status(200).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

function queryPromise(connection, sql, values) {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = router;
