const socket = io()

const msgForm = document.getElementById("input-container")

const msgInput = document.getElementById("msgInput")

const msgContainer = document.getElementById("msg-container")

const username = prompt("enter your username")
const chatRoom = prompt("enter the room")

socket.on("chat-message", data => {
    if(data == "Invalid") {
        alert()
    }
    
    var divMsg = document.createElement("div")
    divMsg.setAttribute("id", "msg")
    divMsg.innerText = data.message
    msgContainer.appendChild(divMsg)
})


msgForm.addEventListener("submit", e => {
    e.preventDefault()
    const message = msgInput.value
    socket.emit("chat-message-sent", {username, message, chatRoom})
    msgInput.value = ""
})