const {exec} = require('../db/mysql')

const login = (postData) => {
  const {
    username, password
  } = postData
  const sql = `select username, realname from users where username='${username}' and password=${password};`

  return exec(sql)
}

module.exports = {
  login
}
