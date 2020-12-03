var express = require('express');
var router = express.Router();
const {SuccessModel, ErrorModel} =  require('../model/resModel')
const {getList, getDetail, newBlog, updateBlog, deleteBlog} = require('../controller/blog')

router.get('/list', function(req, res, next) {
  const author = req.query.author || ''
  const keyword = req.query.keyword || ''

  // 从 controller 获取数据
  // 返回的是 promise
  return getList(author, keyword).then(list => {
    // 通过模板类返回数据和提示语
    res.json(
      new SuccessModel(list, '数据请求成功！')
    ) 
  })
});

router.get('/detail', function(req, res, next) {
  res.json({
    errno: 0,
    data: 'OK!'
  })
});

module.exports = router;
