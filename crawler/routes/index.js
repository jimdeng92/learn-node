const express = require('express')
const router = express.Router()
const https = require('https')
const cheerio = require('cheerio')
var iconv = require('iconv-lite')

router.get('/', (req, res) => {
  res.redirect(301, './index.html')
})

// 获取基金排行
router.get('/getFundRanking', (req, res) => {
  https.get('https://fund.eastmoney.com/fundhot8.html', (response) => {
    // let html = ''
    let arrBuf = []
    let bufLen = 0
    response.on('data', (chunk) => {
      // html += chunk
      arrBuf.push(chunk)
      bufLen += chunk.length
    })
    response.on('end', () => {
      // arrBuf是个存byte数据块的数组，byte数据块可以转为字符串，数组可不行
      // bufferhelper也就是替你计算了bufLength而已
      var chunkAll = Buffer.concat(arrBuf, bufLen);
      var strJson = iconv.decode(chunkAll, 'gb2312'); // 汉字不乱码

      const $ = cheerio.load(strJson)
      const rankingHtml = $('.page-box + .wapper').html()
      res.send({
        code: 200,
        message: '操作成功',
        data: rankingHtml
      })
    })
  })
})

module.exports = router
