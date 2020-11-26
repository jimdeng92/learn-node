const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

module.exports = (req, res) => {
  const method = req.method

  // 登录
  if (method === 'POST' && req.path === '/api/user/login') {
    // req.body 包含 username, password
    const data = login(req.body)
    return data ? new SuccessModel('登录成功！') : new ErrorModel('登录失败！')
  }
}
