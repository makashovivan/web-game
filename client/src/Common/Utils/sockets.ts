
export const openSocket = (path: string): Promise<WebSocket> => {                  // ДОРАБОТАТЬ ПОВЕДЕНИЕ ПРИ ОШИБКЕ
  return new Promise<WebSocket>((resolve, reject) => {
    const socket = new WebSocket(`ws://localhost:8000${path}`)
    setTimeout(() => {
      reject('bad internet connection')}, 5000)
    socket.onopen = () => {
      resolve(socket)}
    socket.onerror = () => {
      reject("какая то ошибка")}
  })
}

export const handleClose = (socket: WebSocket) => {
  return new Promise((resolve, reject) => {
    socket.onclose = (event) => {
      resolve(event)
    }
    socket.onerror = () => {
      reject("From handleClose")
    }
  })
}

