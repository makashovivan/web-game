


export const openSocket = (path) => {                  // ДОРАБОТАТЬ ПОВЕДЕНИЕ ПРИ ОШИБКЕ
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(path)
    setTimeout(() => {reject('bad internet connection')}, 5000)
    socket.onopen = () => {resolve(socket)}
    socket.onerror = (e) => {reject(e)}
  }).then(socket => socket)
    .catch((e) => console.log(e) )
}

