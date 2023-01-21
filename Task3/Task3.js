function loadChat() {
  const webSocketUri = "wss://echo-ws-service.herokuapp.com"
  const socketInfo = document.querySelector(".socket_info")
  const chatOutput = document.querySelector(".chat_output")
  const sendBtn = document.querySelector(".send_btn")
  const input = document.querySelector(".input")
  const geoBtn = document.querySelector(".geo_btn")

  sendBtn.addEventListener("click", sendMessage)
  geoBtn.addEventListener("click", sendGeolocation)

  let webSocket = new WebSocket(webSocketUri)

  webSocket.onopen = () => {
    socketInfo.innerText = "Соединение установлено"
  }

  webSocket.onerror = () => {
    socketInfo.textContent = "Во время соединения произошла ошибка"
  }

  webSocket.onmessage = (event) => {
    console.log(event)
    writeToChat(event.data, true)
  }

  function writeToChat(message, isRecived) {
    let messageHTML = `<div class="chat_message ${
      isRecived ? "recived" : "send"
    }">${message}</div>`
    chatOutput.innerHTML += messageHTML
  }

  function sendMessage() {
    webSocket.send(input.value)
    writeToChat(input.value, false)
    input.value = ""
  }

  function sendGeolocation() {
    setGeolocation()
  }
  function setGeolocation() {
    if (!navigator.geolocation) {
      writeToChat("Geolocation не поддерживается вашим браузером")
    } else {
      writeToChat("Определение местоположения…")
      navigator.geolocation.getCurrentPosition(success, error)
    }
  }
  
  const success = (position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    const linkToCords = `<a href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}" target="_blank">Ссылка на координаты</a>`
    writeToChat(linkToCords)
  }
  const error = () => {
    writeToChat("Невозможно получить ваше местоположение")
  }
}

document.addEventListener("DOMContentLoaded", loadChat)
