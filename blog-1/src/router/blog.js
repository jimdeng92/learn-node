const {SuccessModel, ErrorModel} =  require('../model/resModel')
const {getList, getDetail} = require('../controller/blog')

module.exports = (req, res) => {
  const method = req.method
  
  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    // 从 controller 获取数据
    const list = getList(author, keyword)

    // 通过模板类返回数据和提示语
    return new SuccessModel(list, '数据请求成功！')
  }

  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const id = req.query.id
    const detail = getDetail(id)

    return new SuccessModel(detail, '数据请求成功！')
    
  }
  
  // 新建一篇博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    return {
      msg: 'new'
    }
  }
  
  // 更新一篇博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    return {
      msg: 'update'
    }
  }
  
  // 删除一篇博客
  if (method === 'POST' && req.path === '/api/blog/del') {
    return {
      msg: 'del'
    }
  }
}
