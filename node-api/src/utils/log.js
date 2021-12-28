const fs = require('fs')
const path = require('path')

// 写日志
function writeLog(writeStream, log) {
  writeStream.write(log + '\n') // 关键代码
}

// 生成 write Steam
function createWriteStream(fileName) {
  const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName)
  const writeStream = fs.createWriteStream(fullFileName, {
    flags: 'a'
  })
  return writeStream
}

// 写访问日志
function access(log) {
  writeLog(
    createWriteStream('access.log'),
    log
  )
}


module.exports = {
  access
}
