const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// 处理 postData
const getPostData = (req) => {
  return new Promise((resolve) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['Content-Type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(
        JSON.parse(postData)
      )
    })
  })
}

const serverHandle = (req, res) => {
  // 设置返回格式 JSON
  res.setHeader('Content-type', 'application/json')

  // 获取path，解析query
  const [path, query] = req.url.split('?')
  req.path = path
  req.query = querystring.parse(query)

  // 兼容 post 方法
  getPostData(req).then(postData => {
    req.body = postData

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
  })
}

module.exports = serverHandle
