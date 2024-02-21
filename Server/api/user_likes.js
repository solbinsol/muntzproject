const express = require('express');
const mysql = require('mysql2');


/*


const mysql = require('mysql2');

const app = express();

app.use(cors()); // 모든 도메인에서의 요청을 허용 (개발용)

*/ 
const router = express.Router();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '5475',
  database: 'Muntz'
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패:', err);
  } else {
    console.log('MySQL 연결 성공');
  }
});

// user_likes API

// ...
router.post('/toggle-like', async (req, res) => {
  try {
    const { user_id, product_id } = req.body;

    // 좋아요 여부 조회
    const [existingLike] = await connection
      .promise()
      .query('SELECT * FROM user_likes WHERE user_id = ? AND product_id = ?', [user_id, product_id]);

    let newLikedValue; // 수정: newLikedValue를 선언

    if (existingLike.length === 0) {
      // 좋아요가 없는 경우, 새로 추가
      await connection.promise().query('INSERT INTO user_likes (user_id, product_id, liked) VALUES (?, ?, 1)', [user_id, product_id]);

      // 좋아요가 추가된 경우, ProductDetails 테이블의 좋아요 수를 증가시킴
      await connection.promise().query('UPDATE ProductDetails SET likes = likes + 1 WHERE product_id = ?', [product_id]);

      newLikedValue = 1; // 수정: 좋아요가 추가된 경우 값 설정
    } else {
      // 좋아요가 있는 경우, 토글
      newLikedValue = existingLike[0].liked === 1 ? 0 : 1;
      await connection.promise().query('UPDATE user_likes SET liked = ? WHERE user_id = ? AND product_id = ?', [newLikedValue, user_id, product_id]);

      // 좋아요가 토글된 경우, ProductDetails 테이블의 좋아요 수를 업데이트
      if (newLikedValue === 0) {
        await connection.promise().query('UPDATE ProductDetails SET likes = likes - 1 WHERE product_id = ?', [product_id]);
      } else {
        await connection.promise().query('UPDATE ProductDetails SET likes = likes + 1 WHERE product_id = ?', [product_id]);
      }
    }

    // 업데이트된 좋아요 수를 가져옴
    const [updatedLikesResult] = await connection
      .promise()
      .query('SELECT likes FROM ProductDetails WHERE product_id = ?', [product_id]);
    const updatedLikes = updatedLikesResult[0].likes;

    // 업데이트된 정보를 클라이언트에 응답
    res.status(200).json({ message: '좋아요 토글 성공', likes: updatedLikes, liked: newLikedValue });
  } catch (error) {
    console.error('좋아요 토글 오류:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});





// 바구니 토글 엔드포인트
// ...

router.post('/toggle-basket', async (req, res) => {
  try {
    const { user_id, product_id } = req.body;

    // 바구니 여부 조회
    const [existingBasket] = await connection
      .promise()
      .query('SELECT * FROM user_likes WHERE user_id = ? AND product_id = ?', [user_id, product_id]);

    let newBasketValue; // 수정: newBasketValue를 선언

    if (existingBasket.length === 0) {
      // 바구니에 없는 경우, 새로 추가
      await connection.promise().query('INSERT INTO user_likes (user_id, product_id, basket) VALUES (?, ?, 1)', [user_id, product_id]);
      newBasketValue = 1; // 수정: 바구니가 추가된 경우 값 설정
    } else {
      // 바구니에 있는 경우, 토글
      newBasketValue = existingBasket[0].basket === 1 ? 0 : 1;
      await connection.promise().query('UPDATE user_likes SET basket = ? WHERE user_id = ? AND product_id = ?', [newBasketValue, user_id, product_id]);
    }

    // 업데이트된 정보를 클라이언트에 응답
    res.status(200).json({ message: '바구니 토글 성공', basket: newBasketValue });
  } catch (error) {
    console.error('바구니 토글 오류:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});

router.post('/get-like', async (req, res) => {
  try {
    const { user_id, product_id } = req.body;

    // 로그인 여부 체크
    if (!user_id) {
      return res.status(400).json({ error: '사용자 정보가 없습니다.' });
    }

    // 좋아요 및 바구니 정보 조회
    const [likeInfo] = await connection
      .promise()
      .query('SELECT liked, basket FROM user_likes WHERE user_id = ? AND product_id = ?', [user_id, product_id]);

    // 만약 좋아요 및 바구니 정보가 없다면 새로운 레코드 추가
    if (likeInfo.length === 0) {
      // 레코드가 없으면 새로운 레코드 추가
      await connection
        .promise()
        .query('INSERT INTO user_likes (user_id, product_id, liked, basket) VALUES (?, ?, ?, ?)', [
          user_id,
          product_id,
          0, // 초기값
          0, // 초기값
        ]);
      console.log('새로운 레코드 추가:', user_id, product_id);
    }

    // 클라이언트에 응답
    res.status(200).json({ liked: likeInfo[0].liked, basket: likeInfo[0].basket });
  } catch (error) {
    console.error('좋아요 및 바구니 정보 조회 오류:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});


// get-basket API
router.post('/get-basket', async (req, res) => {
  try {
    const { user_id, product_id } = req.body;

    // 로그인 여부 체크
    if (!user_id) {
      return res.status(400).json({ error: '사용자 정보가 없습니다.' });
    }

    // 바구니 정보 조회
    const [basketInfo] = await connection
      .promise()
      .query('SELECT basket FROM user_likes WHERE user_id = ? AND product_id = ?', [user_id, product_id]);

    // 클라이언트에 응답
    res.status(200).json({ basket: basketInfo[0].basket });
  } catch (error) {
    console.error('바구니 정보 조회 오류:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});

router.post('/insert-like', (req, res) => {
  const { user_id, product_id, liked, basket } = req.body;

  // 데이터베이스에 레코드 삽입
  connection.query(
    'INSERT INTO user_likes (user_id, product_id, liked, basket) VALUES (?, ?, ?, ?)',
    [user_id, product_id, liked, basket],
    (error, results) => {
      if (error) {
        console.error('Insert Like Error:', error);
        res.status(500).json({ success: false, message: 'Failed to insert like record.' });
      } else {
        res.json({ success: true, message: 'Like record inserted successfully.' });
      }
    }
  );
});

// ...

// ...

// ...


module.exports = router;
