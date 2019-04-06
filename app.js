const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const scoketio = require("socket.io");
const http = require("http");

const server = http.createServer(app);
const publicDir = path.join(__dirname,"/public");
const io = scoketio(server);

app.use(express.static(publicDir))

io.on('connection', () => {
    console.log("New web socket connection")
})
server.listen(port, (req,res) => {
    console.log("Server is listening!!")
})