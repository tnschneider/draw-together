var path = require('path');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var serveStatic = require('serve-static');
var proxy = require('express-http-proxy');

if (process.env.NODE_ENV == 'production') {
    app.use(serveStatic(path.join(__dirname, '..', 'dist')));
} else {
    app.use('/', proxy('http://localhost:8888'));
}

var roomLines = {};
var roomConnections = {};

io.on('connection', (socket) => {
    let socketRoom = null;
    
    socket.on('disconnect', () => {
        if (socketRoom && roomConnections[socketRoom]) {
            roomConnections[socketRoom].splice(roomConnections[socketRoom].indexOf(socket.id))
            if (roomConnections[socketRoom].length === 0) {
                delete roomLines[socketRoom];
            }
        }
    });

    socket.on('setRoom', (msg) => {
        if (msg) {
            socket.join(msg);
            socketRoom = msg;
            if (!roomConnections[socketRoom]) {
                roomConnections[socketRoom] = [];
            }
            roomConnections[socketRoom].push(socket.id);
            socket.emit('draw', roomLines[socketRoom] || []);
        }
    });

    socket.on('draw', (msg) => {
        if (msg) {
            if (!roomLines[socketRoom]) {
                roomLines[socketRoom] = [];
            }
            roomLines[socketRoom].push(...msg);
            socket.broadcast.to(socketRoom).emit('draw', msg);
        }
    });
});

http.listen(8080, function () {
    console.log('listening on http://localhost:8080');
});
