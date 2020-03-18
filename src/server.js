'use strict'

const Game = require('./Game')
const fs = require('fs')
const path = require('path')
const http = require('http')


// === STATIC FILES ===
const index = fs.readFileSync('./index.html', 'utf8')
const script = fs.readFileSync('./index.js', 'utf8')
const icon = fs.readFileSync('./favicon.ico')


// === SERVE STATIC ===
const server = http.createServer((req, res) => {

  let filePath = path.join(__dirname, 'src', req.url === '/' ? 'index.html' : req.url)
  const ext = path.extname(filePath)
  let contentType = 'text/html'
  let content

  switch (ext) {
    case '.ico':
      contentType = 'image/ico'
      content = icon
      break
    case '.css':
      contentType = 'text/css'
      break
    case '.js':
      contentType = 'text/javascript'
      content = script
      break
    default:
      contentType = 'text/html'
      content = index
  }
  console.log(req.url)
  res.writeHead(200)
  res.end(content)
})

server.listen(8000, () => {
  console.log('Listen port 8000')
})
