const express = require('express')

const app = express()

const server = require("http").createServer(app)

const { Server } = require("socket.io")

const io = new Server(server)

const db = require("./config/key.js")

const chatRoom = require("./models/ChatRoom")


app.use(express.static('public'))
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})


io.on("connection", (socket) => {
    console.log("a user connected",socket.id)
    
    socket.on("chat-message-sent", async(data) => {
        var username = data.username
        var message = data.message
        var chatRoomName = data.chatRoom

        //check whether the chatRoom is present
        const isChatRoomPresent = await chatRoom.findOne({chatRoomName:chatRoomName})
        if (!isChatRoomPresent) {
            io.sockets.emit("chat-message", "Invalid")
        }
        else {
            const isUsernamePresent = await chatRoom.findOne({users:data.username})
            if (!isUsernamePresent) {
                chatRoom.update({chatRoomName : chatRoomName},{$push:{users:username}})
            }
            io.sockets.emit("chat-message", {username, message})
        }

        //check whether the username is present in mentioned ChatRoom
        
        
    })
    
})

server.listen("3000", () => {
    console.log("server running at 3000")
})