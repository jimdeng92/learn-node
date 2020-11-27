const mysql = require('mysql')
const {MYSQL_CONF} = require('../conf/db')

// 建立连接
const con = mysql.createConnection(MYSQL_CONF)

// 开始连接
con.connect()

// 执行 sql 函数
const exec = (sql) => {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err)
        return
      }
      resolve(result)
    })
  })
}

module.exports = {
  exec
}
