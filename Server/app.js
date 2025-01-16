// app.js
const express = require('express');
const productsRouter = require('./api/products');
const detailRouter = require('./api/detail'); 
const sizeRouter = require('./api/size');
const view_detailRouter = require('./api/view_detail');
const stockRouter = require('./api/stock');
const authRouter = require('./api/auth'); 
const likesRouter = require('./api/user_likes'); 
const AddProductRouter = require('./api/AddProduct'); 
const colorRouter = require('./api/color');
const stockcheckRouter = require('./api/stockcheck');
const deleteRouter = require('./api/product_delete');
const updateStockOnPurchaseRouter = require('./api/updateStockOnPurchase');
const bodyParser = require('body-parser');
const orderlistRouter = require('./api/orderlist'); 
const style_reviewRouter = require('./api/style_review'); 
const view_style_reviewRouter = require('./api/view_style_review'); 
const view_basic_reviewRouter = require('./api/view_basic_review'); 
const basic_reviewRouter = require('./api/basic_review'); 
const orderdetailRouter = require('./api/orderdetail'); // orderdetail 라우터
const cors = require('cors');
const app = express();



//115.23.171.88
app.use(bodyParser.json());



// 로깅 모듈 추가
const morgan = require('morgan');
app.use(morgan('dev')); // 개발환경에서 간단한 로그 출력

// 115.23.171.88
app.use(cors());
app.use('/api', productsRouter);
app.use('/api/detail', detailRouter); // 추가
app.use('/api/product_delete', deleteRouter); // 삭제
app.use('/api/size', sizeRouter);
app.use('/api/stock', stockRouter);
app.use('/api/auth', authRouter);
app.use('/api/user_likes', likesRouter);
app.use('/api/AddProduct', AddProductRouter);
app.use('/api/style_review', style_reviewRouter);
app.use('/api/view_detail', view_detailRouter);
app.use('/api/color', colorRouter);
app.use('/api/view_style_review', view_style_reviewRouter);
app.use('/api/view_basic_review', view_basic_reviewRouter);
app.use('/api/stockcheck', stockcheckRouter);
app.use('/api/orderlist', orderlistRouter);
app.use('/api/basic_review', basic_reviewRouter);
app.use('/api/updateStockOnPurchase', updateStockOnPurchaseRouter);
app.use('/api/orderdetail', orderdetailRouter); // /api/orderdetail 경로로 요청이 오면 orderdetail 라우터를 처리
app.get('/', (req, res) => {
  res.send('Hello, Worldtestdd!'); // 또는 클라이언트에게 전송할 다른 콘텐츠
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`서버가 http://0.0.0.0:${PORT} 에서 실행 중입니다.`);
});
