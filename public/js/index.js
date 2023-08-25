const socket = io()

const msgForm = document.getElementById("input-container")

const ul = document.getElementById("msg-list")

const msgInput = document.getElementById("msg")

const msgContainer = document.getElementById("msg-container")

const username = prompt("enter your username")


socket.on("chat-message", data => {
    //console.log(message)
    var li = document.createElement("li")
    li.innerText = data.username + "-" + data.message
    ul.appendChild(li)
})


msgForm.addEventListener("submit", e => {
    e.preventDefault()
    const message = msgInput.value
    socket.emit("chat-message-sent", {username, message})
    msgInput.value = ""
})