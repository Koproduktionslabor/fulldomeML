
//console.log('Hello WS server!')

const WebSocket = require('ws');

const PORT = 5000;

const wsServer = new WebSocket.Server({ 
    port: PORT
});

wsServer.on('connection', function(socket){
//some feedback on the console
    console.log('new client connected');

    socket.on('message',function(msg){
        console.log('received message from client'+ msg)
       //information to same client
        socket.send("receiving" + msg);

        //Broadcast that message to all connected clients
        wsServer.clients.forEach(function(client){
            client.send(msg);
        })
    })

})



console.log((new Date())+ "server is listening on port " + PORT); 