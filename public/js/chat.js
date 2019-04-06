const socket = io();
const messageForm = document.querySelector("#message-form") 
const messageInput = document.querySelector("input")
const messageLocation =document.querySelector("#myLocation");

messageForm.addEventListener("submit", function(e){

    e.preventDefault();
    const message = messageInput.value;
     console.log("Clicked")
    socket.emit("sendMessage", message)
})

messageLocation.addEventListener("click", function(e){

    e.preventDefault();
    if(!navigator.geolocation){
        return alert("Geolocation isnt supported for your browser");
    }

    navigator.geolocation.getCurrentPosition((position) => {

        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        socket.emit("sendLocations", {
            lat,
            long
        })
    })
})



socket.on("message", (message)=>{
    console.log(message)

})
