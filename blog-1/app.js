const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const serverHandle = (req, res) => {
  // 设置返回格式 JSON
  res.setHeader('Content-type', 'application/json')

  const url = req.url
  req.path = url.split('?')[0]

  // 处理 blog 接口
  const blogData = handleBlogRouter(req, res)
  if (blogData) {
    res.end(
      JSON.stringify(blogData)
    )
    return // !!
  }

  // 处理 user 接口
  const userData = handleUserRouter(req, res)
  if (userData) {
    res.end(
      JSON.stringify(userData)
    )
    return // !!
  }

  // 404 没有找到匹配的路由
  res.writeHead(404, {'Content-type': 'text/plain'})
  res.write('404 Not Found\n')
  res.end()
}

module.exports = serverHandle
