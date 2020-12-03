const {exec} = require('../db/mysql')
const xss = require('xss')

const getList = (author, keyword) => {
  let sql = `select id, title, content, author, createTime from blogs where 1=1 `

  if (author) {
    sql += `and author='${author}'`
  }
  if (keyword) {
    sql += `and keyword='${keyword}'`
  }
  sql += `order by createtime desc;`

  return exec(sql) // promise
}

const getDetail = (id) => {
  const sql = `select * from blogs where id='${id}'`
  return exec(sql)
}

const newBlog = (blogData = {}) => {
  // 防止 xss 攻击
  const title = xss(blogData.title)
  const content = xss(blogData.content)
  const author = xss(blogData.author)
  const createtime = Date.now()
  // 必须使用小括号
  const sql = `insert into blogs (title, content, createtime, author) values ('${title}', '${content}', '${createtime}', '${author}')`

  return exec(sql)
}

const updateBlog = (blogData = {}) => {
  const {
    title, content, id, author
  } = blogData

  const sql = `update blogs set title='${title}', content='${content}' where id='${id}' and author='${author}'`

  return exec(sql)
}

const deleteBlog = (data) => {
  const {
    id, author
  } = data

  const sql = `delete from blogs where id='${id}' and author='${author}'`

  return exec(sql)
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}
