const express = require('express');
const mysql = require('mysql2');


/*


const mysql = require('mysql2');

const app = express();

app.use(cors()); // 모든 도메인에서의 요청을 허용 (개발용)

*/ 
const router = express.Router();

const connection = mysql.createConnection({
  host: '172.30.1.71',
  user: 'root',
  password: '5475',
  database: 'Muntz'
  ,port:'3306'

});

connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패:', err);
  } else {
    console.log('MySQL 연결 성공');
  }
});

// 모든 상품 조회 API
router.get('/products', (req, res) => {
  connection.query('SELECT * FROM Products', (error, results) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.json(results);
    }
  });
});

// 모든 상품 조회 API (likes가 높은 순으로 정렬)
router.get('/bestitem', (req, res) => {
  connection.query(`
    SELECT pd.product_id,  pd.likes, pd.view_count, pd.detail_page_image, pd.description, p.price, p.product_name ,p.thumbnail_image
    FROM productdetails pd
    JOIN products p ON pd.product_id = p.product_id
    ORDER BY pd.likes DESC
  `, (error, results) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.json(results);
    }
  });
});



router.get('/category', (req, res) => {
  const categoryNo = req.query.categoryNo;
  const sortBy = req.query.sortBy || 'latest';  // sortBy 파라미터가 없으면 기본값 'latest' 사용

  console.log('Request received at /category:', req.path, req.query);

  if (!categoryNo) {
    return res.status(400).json({ error: 'Category number is required.' });
  }

  let query = '';
  if (sortBy === 'latest') {
    query = `
      SELECT pd.product_id, pd.likes, pd.view_count, pd.detail_page_image, pd.description, p.price, p.product_name, p.thumbnail_image
      FROM productdetails pd
      JOIN products p ON pd.product_id = p.product_id
      WHERE p.category_id = ?
      ORDER BY pd.product_id DESC`;
  } else if (sortBy === 'popularity') {
    query = `
      SELECT pd.product_id, pd.size, pd.likes, pd.view_count, pd.detail_page_image, pd.description, p.price, p.product_name, p.thumbnail_image
      FROM productdetails pd
      JOIN products p ON pd.product_id = p.product_id
      WHERE p.category_id = ?
      ORDER BY pd.likes DESC`;
  } else if (sortBy === 'views') {
    query = `
      SELECT pd.product_id, pd.size, pd.likes, pd.view_count, pd.detail_page_image, pd.description, p.price, p.product_name, p.thumbnail_image
      FROM productdetails pd
      JOIN products p ON pd.product_id = p.product_id
      WHERE p.category_id = ?
      ORDER BY pd.view_count DESC`;
  }

  connection.query(query, [categoryNo], (error, results) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.json(results);
    }
  });
});

router.post('/increase-view-count', async (req, res) => {
  const { product_id } = req.body;

  if (!product_id) {
    return res.status(400).json({ error: 'Product ID is required.' });
  }

  try {
    // 해당 제품의 view_count를 증가시킴
    const result = await connection.query('UPDATE productdetails SET view_count = view_count + 1 WHERE product_id = ?', [product_id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Increase View Count Error:', error);
    res.status(500).json({ error });
  }
});



// 선택한 옷정보
// products API에서 특정 상품 조회
router.get('/product/:product_id', (req, res) => {
  const productId = req.params.product_id;

  if (!productId) {
    return res.status(400).json({ error: 'Product ID is required.' });
  }

  connection.query('SELECT * FROM Products WHERE product_id = ?', [productId], (error, results) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: 'Product not found.' });
      } else {
        res.json(results[0]);
      }
    }
  });
});

module.exports = router;
