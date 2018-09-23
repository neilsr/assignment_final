var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');

var mcache = require('memory-cache');

require('./api/models/db');
require('./api/config/passport');

var routesApi = require('./api/routes/index');

var app = express();

app.use(function (req, res, next) {
    //set headers to allow cross origin request.
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var multer = require('multer')
var upload = multer({ dest: './uploads' })
//app.post('/api/register', upload.single('file1'), function (req, res, next) {
app.post('/api/register', upload.fields([{ name: 'file1' }, { name: 'file2' }]), function (req, res, next) {
    next();
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(passport.initialize());

app.use('/uploads/', express.static(path.join(__dirname, '/uploads/')));
app.use('/api', routesApi);

//caching logic
var cache = (duration) => {
    return (req, res, next) => {
        let key = '__express__' + req.originalUrl || req.url
        let cachedBody = mcache.get(key)
     
        if (cachedBody) { // if item is in cache
            res.send(cachedBody)
            return
        } else { // cache for predefined duration
            res.sendResponse = res.send
            res.send = (body) => {
                let totalKeys = mcache.size()
                
                if(totalKeys < 3){ // cache has space - dont make new entries
                    mcache.put(key, body, duration * 1000);
                }
                
                res.sendResponse(body)
            }
            next()
        }
    }
}

//caching test route
app.get('/cache-test/:pageNum', cache(10), (req, res) => {
    setTimeout(() => {
      res.send('Hello from the server')
    }, 6000) //simulate slow request - first time it might take time
  })


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({ "message": err.name + ": " + err.message });
    }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
