var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
var path = require('path');

var run = require('./models/run');
var publicar = require('./models/publicar');
var save = require('./models/save');
var api = require('./models/api');

var mongodb = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/kintur');

app.use(function(req, res, next){
	console.log('conectado bd');
	req.db = db;
	next();
});	

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', publicar);
app.use('/save', save);
app.use('/api', api);


app.listen(run(), function(){
	console.log('corriendo server');
});

