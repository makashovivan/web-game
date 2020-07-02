'use strict'
const fs = require('fs')
const path = require('path')
const express = require('express')
const ws = require('express-ws')

const app = express()
ws(app)

// === WS ENDPOINT ===

app.use('/ws/SearchRoom', require('./routes/SearchRoom'))
app.use('/ws/CreateRoom', require('./routes/CreateRoom').router)
app.use('/ws/JoinRoom', require('./routes/JoinRoom'))

// === =========== ===
app.listen(8000, () => {
  console.log('Listen port 8000')
})


// app.use('/', express.static(path.join(__dirname, '../../client/build')))  // SERVE STATIC 

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'))
// })

// const timeout = (ms) => {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }
