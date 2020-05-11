var express = require('express');
var ejs = require('ejs');

var app = express();

app.engine('ejs', ejs.renderFile);
app.use(express.static('public'));

// 昔のnode.jsバージョンだと下記コメントの手法をつかわなければならない。
// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }));
// node.jsのバージョン(4以降？)によっては下記の使い方ができる。
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  var msg =
    'This is Express Page!<br>' + 'これは、スタイルシートを利用した例です';
  var url = '/other?name=taro&pass=yamada';
  res.render('index.ejs', {
    title: 'Index',
    content: msg,
    link: { href: url, text: '※別のページに移動' },
  });
});

app.post('/', (req, res) => {
  var msg =
    'This is Posted Page!<br>' +
    'あなたは「<b>' +
    req.body.message +
    '</b>」と送信しました。';
  res.render('index.ejs', {
    title: 'Posted',
    content: msg,
  });
});

app.get('/other', (req, res) => {
  var name = req.query.name;
  var pass = req.query.pass;
  var msg =
    'あなたの名前は「' + name + '」<br>パスワードは「' + pass + '」です';
  res.render('index.ejs', {
    title: 'other',
    content: msg,
    link: { href: '/', text: '※トップに戻る' },
  });
});

var server = app.listen(3000, () => {
  console.log('Server is running');
});
