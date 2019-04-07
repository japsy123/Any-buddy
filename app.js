const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const scoketio = require("socket.io");
const http = require("http");
const {generateMessage} = require("./utils/messages");

const server = http.createServer(app);
const publicDir = path.join(__dirname,"/public");
const io = scoketio(server);

app.use(express.static(publicDir))

io.on('connection', (socket) => {
    console.log("New web socket connection")

    socket.emit("message",generateMessage("Welcome"))
    socket.on("sendMessage", (message, callback) => {
        console.log(message)
        io.emit("message",generateMessage(message));
        callback();
    })
    
    socket.on("sendLocations", (cords)=>{
        console.log(cords.lat)
        io.emit("locationMessage", `
            http://google.com/maps?q=${cords.lat},${cords.long}`)
           
    })

    socket.on("disconnect", ()=>{
        io.emit("message", generateMessage("User has left"))
    })
})


server.listen(port, (req,res) => {
    console.log("Server is listening!!")
})