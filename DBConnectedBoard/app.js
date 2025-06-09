const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app).listen(80);
const mysql = require('mysql');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
	host: 'localhost'
	, port: 3306
	, user: 'root'
	, password: '0000'
	, database: 'webui'
});

app.get('/postListPage', function (req, res) {
  res.sendfile(`postListPage.html`);
});

app.get('/postWritePage', function (req, res) {
  res.sendfile(`postWritePage.html`);
});

app.get('/postUpdatePage', function (req, res) {
  res.sendfile(`postUpdatePage.html`);
});

app.post('/writePost', function (req, res) {
  let insertQuery = `
                      INSERT INTO post
                      (title, content)
                      VALUES
                      ('${req.body.title}', '${req.body.content}');`;
  connection.query(insertQuery,
  	function (err, rows, fields) {
  		if (err) throw err;
  		res.send(rows);
  	}
  );
});



app.delete('/deletePost', function (req, res) {
  let no = req.body.no;
  let deleteQuery = `DELETE from post WHERE NO = ${no};`;
  connection.query(deleteQuery,
  	function (err, rows, fields) {
  		if (err) throw err;
  		res.send(rows);
  	}
  );
});

app.delete('/deleteAllPost', function (req, res) {
  let deleteQuery = `DELETE from post;`;
  connection.query(deleteQuery,
  	function (err, rows, fields) {
  		if (err) throw err;
  		res.send(rows);
  	}
  );
});

app.get('/getPostList', function (req, res) {
  let selectQuery = `select no, title, content from post`;
  connection.query(selectQuery,
  	function (err, rows, fields) {
  		if (err) throw err;
  		res.send(rows);
  	}
  );
});

app.get('/getSinglePost', function (req, res) {
  let selectQuery = `select * from post where no=${req.query.no}`;
  connection.query(selectQuery,
  	function (err, rows, fields) {
  		if (err) throw err;
  		res.send(rows);
  	}
  );
});

app.put('/updatePost', function (req, res) {
  let updateQuery = `
										UPDATE post SET
										title = '${req.body.title}',
										content = '${req.body.content}'
										WHERE NO = ${req.body.no};`;
  connection.query(updateQuery,
  	function (err, rows, fields) {
  		if (err) throw err;
  		res.send(rows);
  	}
  );
});
