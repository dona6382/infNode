const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session'); // 요청마다 개인의 저장공간 생성

const app = express();

app.set('port', process.env.PORT || 3000);


app.use(morgan('dev'));

app.use(cookieParser('hwipassword'));
app.use(session({
  resave : false,
  saveUninitialized : false,
  secret : 'hwipassword',
  cookie : {
    httpOnly : true,
  },
}));
app.use('/', (req, res, next) => {
  if(req.session.id){
    express.static(__dirname, 'public')(req, res, next) //뒤에 req, res, net 붙이면 확장성 추가
  }else {
    next();
  }
});
app.use(express.json());
//
// app.use((req, res, next) => {
//   console.log('1 요청을 실행')
//   next();
// },(req, res, next) => {
//   try{
//   }catch (error){
//     next(error);
//   }
// });


app.use((req, res,next) => {
  req.data = '비밀번호';
})

app.get('/', (req, res) => {
  //req.session.id = 'hello';
  req.data
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.post('/', (req, res) => {
  res.send('hello express');
});

app.get('/category/Javascript',(req, res) =>{
  res.send('hello Javascript');
});

app.get('/category/:name',(req, res) =>{
  res.send('hello wildcard');
});


app.get('/about', (req, res) => {
  res.send('hello express');
});

app.listen(app.get('port'), () =>{
  console.log(app.get('port'));
  console.log('익스프레스 서버 실행');
});

app.use((req, res, next)=> {
  res.status(200).send('404에러');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.send('에러가 발생했다!!!!')
});


module.exports = app;
