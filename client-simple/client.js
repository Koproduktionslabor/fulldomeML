 
 const WebSocket = require('ws');

 //const serverAddress = "ws://127.0.0.1:5000";
 const serverAddress = 'wss://necessary-southern-astronomy.glitch.me'
 //const serverAddress ='wss://websocket-test-museumsnacht.glitch.me'

 const ws = new WebSocket(serverAddress);

 ws.on('open', function(){
    ws.send('hello server!');
 });

 ws.on('message', function(msg){
   // console.log('received message from the server: ' + msg)
   console.log('received message:' + msg)
 })

 

 