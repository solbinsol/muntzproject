// app.js
const express = require('express');
const productsRouter = require('./api/products');
const detailRouter = require('./api/detail'); 
const sizeRouter = require('./api/size');
const stockRouter = require('./api/stock');
const authRouter = require('./api/auth'); 
const likesRouter = require('./api/user_likes'); 
const AddProductRouter = require('./api/AddProduct'); 

const bodyParser = require('body-parser');

const cors = require('cors');
const app = express();

app.use(bodyParser.json());


app.use(cors());
app.use('/api', productsRouter);
app.use('/api/detail', detailRouter); // 추가
app.use('/api/size', sizeRouter);
app.use('/api/stock', stockRouter);
app.use('/api/auth', authRouter);
app.use('/api/user_likes', likesRouter);
app.use('/api/AddProduct', AddProductRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`서버가 http://0.0.0.0:${PORT} 에서 실행 중입니다.`);
});
