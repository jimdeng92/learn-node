const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// 设置cookie 过期时间
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  return d.toGMTString()
}

// session 数据
const SESSION_DATA = {}

// 处理 postData
const getPostData = (req) => {
  return new Promise((resolve) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
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

  // 解析 cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach(item => {
    if (!item) return
    const arr = item.split('=')
    const k = arr[0].trim() // 清除空格
    const v = arr[1].trim()
    req.cookie[k] = v
  })

  // 解析 session
  let needSetCookie = false
  let userId = req.cookie.userid // 1606731937927_0.09917670995930838
  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {}
    }
  } else {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    SESSION_DATA[userId] = {}
  }
  req.session = SESSION_DATA[userId]

  // 兼容 post 方法
  getPostData(req).then(postData => {
    req.body = postData

    // 处理 blog 接口
    const blogResult = handleBlogRouter(req, res)
    if (blogResult) {
      blogResult.then(data => {

        if (needSetCookie) {
          // 限制客户端 js 操作 cookie，设置过期时间
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`) 
        }

        res.end(
          JSON.stringify(data)
        )
      })
      return // !!
    }

    // 处理 user 接口
    const userResult = handleUserRouter(req, res)
    if (userResult) {
      userResult.then(data => {

        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`) 
        }

        res.end(
          JSON.stringify(data)
        )
      })
      return // !!
    }

    // 404 没有找到匹配的路由
    res.writeHead(404, {'Content-type': 'text/plain'})
    res.write('404 Not Found\n')
    res.end()
  })
}

module.exports = serverHandle
