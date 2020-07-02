const {Router} = require('express') 
const router = Router()
const Room = require('../Room')

let SearchingConnections = {}

const checkSearchingConnections = () => {
  let ids = Object.keys( SearchingConnections )
  if (ids.length === 2) return true
  return false
}

const manageSearchingConnection = connection => {
  connection.connectionId = (~~(Math.random()*1e8)).toString(16)                // CREATE ID 
  SearchingConnections[connection.connectionId] = connection                        // PUSH TO CONNECTIONS
  console.log('=== CONNECTED SEARCHER № ' + connection.connectionId + ' ===')
  if (checkSearchingConnections()) {
    console.log('in if')
    let ids = Object.keys( SearchingConnections )
    const room = new Room(SearchingConnections[ids[0]], SearchingConnections[ids[1]])
    SearchingConnections = {}
  }                                                          // CREATE ROOM IF IT'S POSIBLE
  
  connection.on('close', () => {                                                // DISCONNECT HANDLING FOR FREE CLIENTS
    if (connection.connectionId in SearchingConnections){
      console.log('FREE SEARCHING CLIENT ' + connection.connectionId + ' DISCONNECTED')  
      delete SearchingConnections[connection.connectionId]
    }
  })
}

router.ws('/', (connection, res) => {
  manageSearchingConnection(connection)
})

module.exports = router