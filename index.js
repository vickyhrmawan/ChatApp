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
    socket.on('disconnect', () => {
        console.log(`${data.userName} disconnected`);
    });
});

server.listen(port, () => console.log("server running on port " + port));


// const express = require('express')
// const socket = require('socket.io')
// const app = express()
// const port = process.env.PORT || 3000

// // SEND FILE TO CLOUDINARY
// // const cloudinary = require('cloudinary').v2
// // cloudinary.config({
// //     cloud_name: 'dru0m5u8o',
// //     api_key: '157194192517129',
// //     api_secret: 'UpM39Y6VdoxZOf4iPEYFTmEI9dc'
// // })

// const server = app.listen(port, function () {
//     console.log(`Listen at http://localhost: ${port}`)
// })

// app.use(express.static('public'))

// const sock = socket(server)

// sock.on('connection', function (socket) {
//     console.log(`a user made connection with socket `)

//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });

//     socket.on('chat', function (data) {
//         console.log(`${data.userName} send message`)
//         sock.sockets.emit('chat', data)
//     })

//     socket.on('typing', function (data) {
//         socket.broadcast.emit('typing', data)
//     })

//     socket.on('attachment', function (data) {
//         const fileBase64 = `data:${data.fileType};base64,` + data.file.toString('base64')
//         const uniqueFilename = new Date().toISOString()
//         let type = ''
//         let options = {}
//         if (data.fileType.indexOf('image/') !== -1) {
//             type = 'image'
//         }
//         else if (data.fileType.indexOf('video/') !== -1) {
//             type = 'video'
//             options = { resource_type: type }
//         }
//         else if (data.fileType.indexOf('audio/') !== -1) {
//             type = 'audio'
//             options = { resource_type: 'video' }
//         }
//         else {
//             type = 'raw'
//             options = { resource_type: type }
//         }
//         options = {
//             ...options,
//             public_id: `simple-chat/${type}/${uniqueFilename}`,
//             tags: `${type}-simple-chat`
//         }
//         // cloudinary.uploader.upload(
//         //     fileBase64,
//         //     options, // directory and tags are optional
//         //     function (err, result) {
//         //         if (err) return console.log(err)
//         //         console.log(`${data.userName} send ${type} data with url ${result.url}`)
//         //         data.file = result.url
//         //         sock.sockets.emit(type, data)
//         //     }
//         // )
//     })
// }) 
