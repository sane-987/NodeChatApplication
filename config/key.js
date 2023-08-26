const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ChatRoomDB' ,{useNewUrlParser:true} ,{useUnifiedTopology:true})
.then(() => {
    console.log("MongoDB succeded")
})
.catch((err) => console.log(err.message))

mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to db")
})

mongoose.connection.on("error", (err) => {
    console.log(err.message)
})

mongoose.connection.on("disconnected", () => {
    console.log("mongoose connection is disconnected")
})


process.on("SIGINT", async() => {
    await mongoose.connection.close();
    process.exit(0)
})