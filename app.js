const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");

const publicDir = path.join(__dirname,"/public")


app.use(express.static(publicDir))

app.listen(port, (req,res) => {
    console.log("Server is listening!!")
})