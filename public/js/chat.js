const socket = io();


document.querySelector("#message-form").addEventListener("submit", function(e){

    e.preventDefault();
    const message = document.querySelector("input").value;
     console.log("Clicked")
    socket.emit("sendMessage", message)
})

document.querySelector("#myLocation").addEventListener("click", function(e){

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
