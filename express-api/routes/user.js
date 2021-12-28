var express = require('express');
var router = express.Router();
const {login} = require('../controller/user')
const {SuccessModel, ErrorModel} =  require('../model/resModel')

router.post('/login', function(req, res, next) {
  const { username, password } = req.body
  return login(req.body).then(data => {
    if (data[0].username) {
      // 设置 session
      req.session.username = data[0].username
      req.session.realname = data[0].realname
      
      res.json(new SuccessModel())
      return
    }
    res.json(new ErrorModel('登录失败')) 
  })
});

module.exports = router;
