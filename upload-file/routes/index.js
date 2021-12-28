const express = require('express')
const path = require('path')
const fs = require('fs')
const router = express.Router()
const xlsx = require('node-xlsx')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

router.get('/', (req, res) => {
  res.redirect(301, './index.html')
})

// 上传文件
router.post('/uploadFile', upload.single('fileName'), (req, res) => {
  const file = req.file
  const {ext} = path.parse(file.originalname)
  const newPath = file.destination + Date.now() + ext
  fs.renameSync(file.path, newPath)

  const workSheetsFromFile = xlsx.parse(newPath)

  res.status(200).send({
    code: 200,
    message: '操作成功',
    data: workSheetsFromFile
  })
})

module.exports = router
