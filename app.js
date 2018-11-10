var express = require('express');
var app = express();
var path = require('path')
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

global.WEBROOT = __dirname;

// app.set
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');

// app 공용 미들웨어 셋팅
app.use(logger('dev')); // morgan
app.use(bodyParser.json());// bodyParser.json
app.use(bodyParser.urlencoded({ extended: false })); //bodyParser.urlencoded
app.use(cookieParser()); // cookieParser


// for CORS
app.use(function(req, res, next) {
    var origin = req.headers.origin;
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true)
    next();
});

// json 리턴 해더
function setJSON(req, res, next) {
    res.setHeader('content-type', 'application/json; charset=utf-8');
    next();
}

//roture
app.get('/', function(req,res,next){
    res.send('welcome beers API!')
});

// static path 설정
app.use('/static', express.static(__dirname + '/static'));
app.use('/assets', express.static(__dirname + '/assets'));

app.use('/dbInsertHelper', setJSON, require('./routes/dbInsertHelper'));
app.use('/beers', setJSON, require('./routes/beers'));
app.use('/tags', setJSON, require('./routes/tags'));
app.use('/purchase', setJSON, require('./routes/purchase'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = err;
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// PORT 는 임시로 고정 3000
app.listen(3000, function () {
    console.log('app listening on port 3000!');
});

