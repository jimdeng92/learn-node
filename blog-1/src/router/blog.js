const {SuccessModel, ErrorModel} =  require('../model/resModel')
const {getList, getDetail, newBlog, updateBlog, deleteBlog} = require('../controller/blog')

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
    // req.body 包含 title, content

    req.body.author = 'jimdeng'
    
    return newBlog(req.body).then(data => {
      return new SuccessModel({id: data.insertId}, '新建博客成功！')
    })
  }
  
  // 更新一篇博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    // req.body 包含 id, title, content

    req.body.author = 'jimdeng'

    return updateBlog(req.body).then(data => {
      return data.affectedRows > 0 ? new SuccessModel('更新成功！') : new ErrorModel('更新失败！')
    })
  }
  
  // 删除一篇博客
  if (method === 'POST' && req.path === '/api/blog/del') {
    // req.body 包含 id

    req.body.author = 'jimdeng'

    return deleteBlog(req.body).then(data => {
      return data.affectedRows > 0 ? new SuccessModel('删除成功！') : new ErrorModel('删除失败！')
    })
  }
}
