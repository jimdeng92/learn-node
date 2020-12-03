const {exec, escape} = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const login = (postData) => {
  // 防止 sql 注入
  const username = escape(postData.username)
  let password = escape(postData.password)
  // 加密密码
  password = genPassword(postData.password)
  // 注意：添加 escape 函数后不再需要使用单引号
  // 但加密后的密码还是需要单引号，escape 函数会将 genPassword 函数加密的密码解析成原始密码，因此不能调换顺序
  const sql = `select username, realname from users where username=${username} and password='${password}';`

  return exec(sql)
}

module.exports = {
  login
}
