const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mysql = require('mysql2');

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '5475',
  database: 'Muntz'
});

// express.json() middleware 추가
router.use(express.json());

// 회원가입 API
const addProductQuery = `
  INSERT INTO products (product_name, price, category_id, thumbnail_image)
  VALUES (?, ?, ?, ?);
`;

// AddProduct 엔드포인트 정의
router.post('/AddProduct', (req, res) => {
    const { productName, price, categoryId, thumbnailImage, detailPageImage, description, sizes, stocks } = req.body;
  
    // 첫 번째 쿼리 실행 (제품 정보 삽입)
    connection.query(addProductQuery, [productName, price, categoryId, thumbnailImage], (error, results, fields) => {
      if (error) {
        console.error("Error adding product to database:", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("Product added to database successfully");
  
        // 삽입된 제품의 product_id 얻기
        const productId = results.insertId;
  
        // 두 번째 쿼리 실행 (상세 정보 삽입)
        const addProductDetailsQuery = `
          INSERT INTO productdetails (product_id, detail_page_image, description)
          VALUES (?, ?, ?);
        `;
  
        connection.query(addProductDetailsQuery, [productId, detailPageImage, description], (errorDetails, resultsDetails, fieldsDetails) => {
          if (errorDetails) {
            console.error("Error adding product details to database:", errorDetails);
            res.status(500).json({ error: "Internal Server Error" });
          } else {
            console.log("Product details added to database successfully");
  
            // 세 번째 쿼리 실행 (사이즈 정보 삽입)
            const addProductSizeQuery = `
              INSERT INTO productsize (product_id, size_category_id, size_type, size_value_s, size_value_m, size_value_l)
              VALUES (?, ?, ?, ?, ?, ?);
            `;
  
            sizes.forEach((size) => {
              connection.query(addProductSizeQuery, [productId, size.size_category_id, size.size_type, size.size_value_s, size.size_value_m, size.size_value_l], (errorSize, resultsSize, fieldsSize) => {
                if (errorSize) {
                  console.error("Error adding product size to database:", errorSize);
                  // 에러 처리 로직 추가
                } else {
                  console.log("Product size added to database successfully");
                  // 성공 처리 로직 추가
                }
              });
            });
  
            // 네 번째 쿼리 실행 (재고 정보 삽입)
            const addStockQuery = `
              INSERT INTO stock (product_id, stock_quantity_s, stock_quantity_m, stock_quantity_l)
              VALUES (?, ?, ?, ?);
            `;
  
            connection.query(addStockQuery, [productId, stocks.stock_quantity_s, stocks.stock_quantity_m, stocks.stock_quantity_l], (errorStock, resultsStock, fieldsStock) => {
              if (errorStock) {
                console.error("Error adding stock information to database:", errorStock);
                // 에러 처리 로직 추가
              } else {
                console.log("Stock information added to database successfully");
                // 성공 처리 로직 추가
              }
            });
  
            res.status(200).json({ success: true, message: "Product added successfully" });
          }
        });
      }
    });
  });
  
  
  
  

module.exports = router;
