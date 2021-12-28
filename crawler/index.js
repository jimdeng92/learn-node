const express = require('express')
const indexRouter = require('./routes/index')

const app = express()
const port = 3000

// https://expressjs.com/en/starter/static-files.html
app.use('/static', express.static('public'))
app.use(express.static('views'))

app.use('/', indexRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
