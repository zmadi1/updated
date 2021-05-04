let io = require("socket.io-client")

let socket = io.connect("http://localhost:3000");

socket.on("connect",(data)=>{
    console.log("Received: ",data)
})