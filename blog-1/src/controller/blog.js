const getList = (author, keyword) => {
  return [
    {
      id: 0,
      title: '标题1',
      content: '内容1',
      createTime: 1606299896956,
      author: 'jimdeng'
    },
    {
      id: 1,
      title: '标题2',
      content: '内容2',
      createTime: 1606396899756,
      author: 'jimdeng'
    }
  ]
}

const getDetail = (id) => {
  return {
    id: 0,
    title: '标题1',
    content: '内容1',
    createTime: 1606299896956,
    author: 'jimdeng'
  }
}

const newBlog = (blogData = {}) => {
  return {
    id: 3
  }
}

const updateBlog = (blogData = {}) => {
  return true
}

const deleteBlog = (id) => {
  return false
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}
