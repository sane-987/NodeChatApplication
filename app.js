const express = require('express')

const app = express()

const server = require("http").createServer(app)

const { Server } = require("socket.io")

const io = new Server(server)


app.use(express.static('public'))
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})


io.on("connection", (socket) => {
    console.log("a user connected",socket.id)
    
    socket.on("chat-message-sent", data => {
        var username = data.username
        var message = data.message
        io.sockets.emit("chat-message", {username, message})
    })
    
})

server.listen("3000", () => {
    console.log("server running at 3000")
})