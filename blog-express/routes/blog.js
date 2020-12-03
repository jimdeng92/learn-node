var express = require('express');
var router = express.Router();
const {SuccessModel, ErrorModel} =  require('../model/resModel')
const {getList, getDetail, newBlog, updateBlog, deleteBlog} = require('../controller/blog')
const loginCheck = require('../middleware/loginCheck')

router.get('/list', function(req, res, next) {
  let author = req.query.author || ''
  const keyword = req.query.keyword || ''

  // 管理中心页，只显示作者的文章
  if (req.query.isadmin) {
    if (req.session.username == null) {
      res.json(
        new ErrorModel('未登录')
      )
      retuurn
    }
    // 强制查询自己的博客
    author = req.session.username
  }

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
  return getDetail(req.query.id).then(data => {
    res.json(
      new SuccessModel(data[0], '数据请求成功！')
    )
  })
});

router.post('/new', loginCheck, function(req, res, next) {
  req.body.author = req.session.username
    
  return newBlog(req.body).then(data => {
    res.json(
      new SuccessModel({id: data.insertId}, '新建博客成功！')
    )
  })
});

router.post('/update', loginCheck, function(req, res, next) {
  req.body.author = req.session.username
  
  return updateBlog(req.query.id, req.body).then(data => {
    
    if (data.affectedRows > 0) {
      res.json(
        new SuccessModel('更新成功！')
      )
    } else {
      res.json(
        new ErrorModel('更新失败！')
      )
    }
  })
});

router.post('/del', loginCheck, function(req, res, next) {
  const author = req.session.username

  return deleteBlog(req.query.id, author).then(data => {
    if (data.affectedRows > 0) {
      res.json(
        new SuccessModel('删除成功！')
      )
    } else {
      res.json(
        new ErrorModel('删除失败！')
      )
    }
  })
})

module.exports = router;
