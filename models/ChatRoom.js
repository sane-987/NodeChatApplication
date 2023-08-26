const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        username : {
            type : String,
        },
        password : {
            type : String,
        },
        date : {
            type : Date,
            default : Date.now
        }
    }
)

const chatRoomSchema = new mongoose.Schema(
    {
        chatRoomName : {
            type : String
        },
        users:[userSchema]
    }
)

module.exports = mongoose.model('chatRoom', chatRoomSchema)