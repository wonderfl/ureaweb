const express = require('express')
const hbs = require('express-handlebars');

const app = express()
const host = '0.0.0.0'
const port = 3020

app.set('view engine','hbs') //
app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    defaultLayout: "layout", // 기본레이아웃 설정
    // 레이아웃 디렉토리 설정.. 리액트에서 레이아웃 따로 정하면 필요없단다?...
    layoutsDir: __dirname + "/views/layouts",
    // 반복적인 html코드가 있다면 아래 지정경로에서 가져다 쓸수 있다.
    partialsDir: __dirname + "/views/partials"
  })
);

function log(req, res, next)
{
  console.log(`${req.method} ${req.url}`)
  next()
}

app.use(log)
app.use(express.static('public'))

app.get('/', (req, res) => {
  //res.send('Hello World!')  
  //res.sendFile(__dirname + '/public/main.html')  
  res.status(200).render('home.view.hbs',{
    layout: 'home',
    name : 'hi'
  })
})


app.get('/market', (req, res) => {  
  //res.sendFile(__dirname + '/public/overviews.html')
  res.status(200).render('market.view.hbs',{
    layout: 'overview',
    image : '/images/overview.png',
    name : 'Markets'
  })
})

app.get('/market/hydrogen', (req, res) => {
  res.status(200).render('market.view.hbs',{
    layout: 'market',
    image : '/images/hydrogen.png',
    name : 'Hydrogen'
  })
})

app.get('/market/ammonia', (req, res) => {  
  res.status(200).render('market.view.hbs',{
    layout: 'market',
    image : '/images/ammonia.png',
    name : 'Ammonia'
  })
})

app.get('/market/urea', (req, res) => {  
  res.status(200).render('market.view.hbs',{
    layout: 'market',
    image : '/images/urea.png',
    name : 'Urea'
  })
})


app.listen(port, host, () => {
  console.log(`Example app listening on ${host}:${port}, ${__dirname}`)
})
