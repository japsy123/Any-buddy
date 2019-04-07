const socket = io();
const messageForm = document.querySelector("#message-form") 
const messageInput = document.querySelector("input")
const messageLocation =document.querySelector("#myLocation");
const messageFromButoon = messageForm.querySelector("button");
const messages = document.querySelector('#messages')
const messageTemplate = document.querySelector('#message-template').innerHTML
const geolocation = document.querySelector("#geo-template").innerHTML;

socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate, {
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    messages.insertAdjacentHTML('beforeend', html)
})

socket.on("locationMessage", (message) => {
    const html = Mustache.render(geolocation, {
      url:message.url, 
        createdAt: moment(message.createdAt).format('h:mm a'),

    })
    messages.insertAdjacentHTML('beforeend', html)

})
messageForm.addEventListener("submit", function(e){

    e.preventDefault();
    const message = messageInput.value;
    // messageFromButoon.setAttribute("disabled","disabled")
     console.log("Clicked")
    socket.emit("sendMessage", message, (error)=> {

        messageInput.value = "";
        messageInput.focus();
        if(error) {
            return console.log(error)
        }
        console.log("Delivered")

    })
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
