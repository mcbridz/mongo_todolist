const port = process.env.PORT || 8000
const DATA_PATH = './data'

const server = require('./server')({ dataPath: DATA_PATH, port: port })

server.listen(port)

console.log('server listening on port: ' + port)