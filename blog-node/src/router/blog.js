const {SuccessModel, ErrorModel} =  require('../model/resModel')
const {getList, getDetail, newBlog, updateBlog, deleteBlog} = require('../controller/blog')

// 登录验证函数
const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(
      new ErrorModel('尚未登录')
    )
  }
}

module.exports = (req, res) => {
  const method = req.method
  
  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''

    // 从 controller 获取数据
    // const list = getList(author, keyword)
    // 返回的是 promise
    return getList(author, keyword).then(list => {
      // 通过模板类返回数据和提示语
      return new SuccessModel(list, '数据请求成功！')
    })
  }

  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const id = req.query.id
    return getDetail(id).then(data => {
      return new SuccessModel(data[0], '数据请求成功！')
    })
    
  }
  
  // 新建一篇博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    const loginCheckResult = loginCheck(req)
    // 未登录
    if (loginCheckResult) {
      return loginCheck
    }
    // req.body 包含 title, content

    req.body.author = req.session.username
    
    return newBlog(req.body).then(data => {
      return new SuccessModel({id: data.insertId}, '新建博客成功！')
    })
  }
  
  // 更新一篇博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    const loginCheckResult = loginCheck(req)
    // 未登录
    if (loginCheckResult) {
      return loginCheck
    }
    // req.body 包含 id, title, content

    req.body.author = req.session.username

    return updateBlog(req.body).then(data => {
      return data.affectedRows > 0 ? new SuccessModel('更新成功！') : new ErrorModel('更新失败！')
    })
  }
  
  // 删除一篇博客
  if (method === 'POST' && req.path === '/api/blog/del') {
    const loginCheckResult = loginCheck(req)
    // 未登录
    if (loginCheckResult) {
      return loginCheck
    }
    // req.body 包含 id

    req.body.author = req.session.username

    return deleteBlog(req.body).then(data => {
      return data.affectedRows > 0 ? new SuccessModel('删除成功！') : new ErrorModel('删除失败！')
    })
  }
}
