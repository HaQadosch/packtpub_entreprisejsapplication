const http = require('http')

const requestHandler = (req, res) => {
  if (req.method === 'POST' && req.url === '/user') {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      message: 'Payload should not be empty'
    }))
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Hello World!')
  }
}

const server = http.createServer(requestHandler)
server.listen(8080)
