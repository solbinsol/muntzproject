const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mysql = require('mysql2');

// MySQL 연결 설정
const connection = mysql.createConnection({
  // host: '115.23.171.88',
  host: 'localhost',  // 또는 '127.0.0.1'

  user: 'root',
  password: '5475',
  database: 'Muntz'
  ,port:'3306'

});

// express.json() middleware 추가
router.use(express.json());

// 회원가입 API
router.post('/signup', async (req, res) => {
  try {
    const { username, password, email, mobile ,name } = req.body;

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 정보 데이터베이스에 저장
    const [result] = await connection.promise().query('INSERT INTO users (username, password_hash, email, name,mobile) VALUES (?, ?, ?, ? ,?)', [username, hashedPassword, email, name , mobile]);

    res.status(201).json({ message: '회원가입 성공' });
  } catch (error) {
    console.error('회원가입 오류:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});



// 로그인 API
// 로그인 API
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 사용자 정보 조회
    const [rows] = await connection
      .promise()
      .query('SELECT user_id, username, email, name, mobile, password_hash FROM users WHERE username = ?', [username]);

    if (rows.length === 0) {
      return res.status(401).json({ error: '사용자가 존재하지 않습니다.' });
    }

    // 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(password, rows[0].password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: '비밀번호가 일치하지 않습니다.' });
    }

    // 로그인 성공 및 사용자 정보 반환
    const userInfo = {
      user_id: rows[0].user_id,
      username: rows[0].username,
      email: rows[0].email,
      name: rows[0].name,
      mobile: rows[0].mobile
    };

    res.status(200).json({ message: '로그인 성공', user: userInfo });
  } catch (error) {
    console.error('로그인 오류:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});


module.exports = router;
