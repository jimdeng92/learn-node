const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')


module.exports = (req, res) => {
  const method = req.method

  // 登录
  if (method === 'GET' && req.path === '/api/user/login') {
    // req.body 包含 username, password

    return login(req.query).then(data => {
      if (data[0].username) {
        // 设置 session
        req.session.username = data.username
        req.session.realname = data.realname
        
        return new SuccessModel()
      }
      return new ErrorModel('登录失败')
    })
  }

  // 登录验证
  if (method === 'GET' && req.path === '/api/user/login-test') {
    console.log(req.session)
    if (req.session.userId) {
      return Promise.resolve(new SuccessModel())
    }
    return Promise.resolve(new ErrorModel('验证登录失败！'))
  }
}
