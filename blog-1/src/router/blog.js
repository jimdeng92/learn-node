module.exports = (req, res) => {
  const method = req.method
  
  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    return {
      msg: 'list'
    }
  }

  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    return {
      msg: 'detail'
    }
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
