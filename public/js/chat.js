const socket = io();


document.querySelector("#sendMessage").addEventListener("click", function(e){

    e.preventDefault();
    const message = document.querySelector("input").value;
     console.log("Clicked")
    socket.emit("sendMessage", message)
})

socket.on("message", (message)=>{
    console.log(message)

})