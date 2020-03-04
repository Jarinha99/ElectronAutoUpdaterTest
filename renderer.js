const select = selector => document.querySelector(selector)

let container = select('#messages')
let progressBar = select('#progressBar')
let version = select('#version')

window.ipcRenderer.on('message', (event, text) => {

  let message = document.createElement('div')
  message.innerHTML = text
  container.appendChild(message)

})

window.ipcRenderer.on('version', (event, text) => {
  version.innerText = text
})

window.ipcRenderer.on('download-progress', (event, text) => {
  progressBar.style.width = `${text}%`
})