import * as fs from 'fs'
import * as path from 'path' 
import express from 'express'
import expressWs from 'express-ws';
const { app, getWss, applyTo } = expressWs(express());

// === WS ENDPOINT ===

// app.use('/ws/SearchRoom', require('./routes/SearchRoom'))
app.use('/api/Game', require('./routes/Game').router)
app.use('/api/SearchRoom', require('./routes/SearchRoom').router)
app.use('/ws/CreateRoom', require('./routes/CreateRoom').router)
app.use('/ws/JoinRoom', require('./routes/JoinRoom').router)

// === =========== ===
app.listen(8000, () => {
  console.log('Listen port 8000')
})


// app.use('/', express.static(path.join(__dirname, '../../client/build')))  // SERVE STATIC 

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'))
// })

