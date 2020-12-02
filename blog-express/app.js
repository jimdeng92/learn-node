var createError = require('http-errors');
var express = require('express');
var path = require('path');
// 解析 cookie ，在路由中使用 req.cookies 访问
var cookieParser = require('cookie-parser');
// 记录日志
var logger = require('morgan');

// 路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog')
const userRouter = require('./routes/user')

// 初始化
var app = express();

// 视图引擎设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json()); // 处理 post (application/json)
app.use(express.urlencoded({ extended: false })); // 处理 post (x-www-form-urlencoded)
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // 静态文件

// 注册路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/blog', blogRouter)
app.use('/api/user', userRouter)

// 捕获404并转发到错误处理程序
app.use(function(req, res, next) {
  next(createError(404));
});

// 错误处理程序
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
