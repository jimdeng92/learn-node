const http = require('http')
const serverHandle = require('../app')

const PORT = 4396
const server = http.createServer(serverHandle)

server.listen(PORT)
