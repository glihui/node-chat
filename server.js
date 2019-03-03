var app = require('express')();
var http = require('http').Server(app);

var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

var usocket = [];

io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on("join", function (name) {
        usocket[name] = socket;
        io.emit("join", name);
    });

    socket.on("message", function (msg) {
       io.emit("message", msg);
    });
});

http.listen(80, function () {
    console.log('listening on *:3000');
});