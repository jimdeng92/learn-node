const router = require('koa-router')()

router.prefix('/api/blog')

router.get('/list', async (ctx, next) => {
  const query = ctx.query
  ctx.body = {
    errno: 0,
    msg: '获取博客成功！'
  }
})

module.exports = router
