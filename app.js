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
app.use('/test', setJSON, require('./routes/test'));


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
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

