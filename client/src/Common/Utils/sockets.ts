
const BAD_CONNECTION_DELAY = 5000


const openSocket = (path: string): Promise<WebSocket> => {  // ДОРАБОТАТЬ ПОВЕДЕНИЕ ПРИ ОШИБКЕ
  return new Promise<WebSocket>((resolve, reject) => {
    const socket = new WebSocket(`ws://localhost:8000${path}`)
    setTimeout(() => {
      reject('bad internet connection')}, BAD_CONNECTION_DELAY)
    socket.onopen = () => {
      resolve(socket)}
    socket.onerror = (error) => {
      reject(error)}
  })
}

const handleClose = (socket: WebSocket) => {
  return new Promise((resolve, reject) => {
    socket.onclose = (event) => {
      resolve(event)
    }
    socket.onerror = (error) => {
      reject(error)
    }
  })
}

const getFirstMessage = <T>(socket: WebSocket): Promise<T> => {
  return new Promise((resolve, reject) => {
    socket.onmessage = (message: MessageEvent<T>) => {
      resolve(message.data)
    }
    socket.onerror = (error) => {
      reject(error)
    }
  })
}

export {openSocket, handleClose, getFirstMessage}

