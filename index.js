const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = process.env.PORT || 3000;

io.on("connection", (socket) => {
    console.log("a user connected :)");
    socket.on("chat", data => {
        console.log(`${data.userName} send message`);
        io.emit("chat", data);
    });
    socket.on("typing", data => {
        socket.broadcast.emit('typing', data)
    })
    socket.on('disconnect', () => {
        console.log(`user disconnected`);
    });
});

server.listen(port, () => console.log("server running on port " + port));

