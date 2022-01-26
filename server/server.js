const http = require('http');

const app = require('./app');
const socketio = require('socket.io');


const port = process.env.PORT || 5000;

const server = http.createServer(app);


const io = socketio(server);

let users = [];
let adminRoom = "admin";
io.on('connect', (socket) => {
    socket.on('JoinUser', (user, callback) => {
        if (user) {
            user.socketId = socket.id;
            users.push(user)
            if (user.userRole[0].userRoleType == 1) {
                socket.join(adminRoom)
            }
        }
    });

    socket.on('Todo', (user, callback) => {
        let messageObject = {};
        if (user.action === "ADD") {
            messageObject.message = `New Todo was created with ${user.todoPriority == 1 ? "High" : user.todoPriority == 2 ? "Medium" : "Low"} priority by ${user.firstName + " " + user.lastName}`
        }
        else if (user.action === "UPDATE") {
            messageObject.message = `Todo was updated by ${user.firstName + " " + user.lastName}`
        }
        else if (user.action === "DELETE") {
            messageObject.message = `Todo was deleted by ${user.firstName + " " + user.lastName}`
        }
        socket.broadcast.to(adminRoom).emit('Todo', messageObject);
    });

    socket.on('disconnect', () => {
        console.log("socketIO disconnected.", socket.id)
    })
});

server.listen(port, () => {
    console.log("server running on port", port)
});


//Mongo shell command
// mongo "mongodb+srv://portfolio-qhmju.mongodb.net/<dbname>" --username nani
