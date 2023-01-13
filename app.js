const express = require('express');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3000);


app.use('/about',(req, res, next) => {
  console.log('1 요청을 실행')
  next();
},(req, res, next) => {
  throw new Error('에러가 났어요');
});

app.get('/', (req, res) => {
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


module.exports = app;
