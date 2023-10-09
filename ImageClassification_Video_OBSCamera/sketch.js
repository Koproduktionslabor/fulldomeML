

let classifier;
let video, constraints;
let resultsP;
let results;
const devices = [];
let myEmojis = ['👀','😘','🤖','😍','😒','😎','🤩','👻','👾','💩','🙈','🙉','🙊','🐯','🦄','🐸','🐊','👁️','🧙','🧙‍','🧚‍','🧜‍♀️','🧜‍♂️','🧜','💃','🕺','✨','🎉','📎','📎','📎'];


  function gotDevices(deviceInfos) {
    for (let i = 0; i !== deviceInfos.length; ++i) {
        const deviceInfo = deviceInfos[i];
        if (deviceInfo.kind == "videoinput") {
            console.log(deviceInfo);
        }
    }
}

function streamCameras(){
    for (var i = 0; i < 2; i++) {
        console.log(videolist[i]);
    }
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  //noCanvas();
  // Create a camera input and chose specific device
  video = createCapture({
video: {
deviceId: "61edbbbe0f47b6e5423775945defe9b08a02f8d615fb6a04464452660f3d672b",
groupId: "e9404e862c00b67e7f52980a160daf5e677cf8de28b672008d12bfe45a2e66c0",
kind: "videoinput",
label: "OBS Virtual Camera" 
        }});
    navigator.mediaDevices.enumerateDevices().then(gotDevices);
  // Initialize the Image Classifier method with Mobilend the video as the second argument
  classifier = ml5.imageClassifier('MobileNet', video, modelReady);
  resultsP = createP('Loading model and video...');
  video.hide();
}

function draw(){
image(video,0,0)
fill(255);
textSize(40);  
//gotResult();
}

function modelReady() {
  console.log('Model Ready');
  classifyVideo();
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.classify(gotResult);

}



// WEBSOCKET STUFF
const serverAddress = 'wss://necessary-southern-astronomy.glitch.me';
//const serverAddress ='wss://websocket-test-museumsnacht.glitch.me'
const serverConnection = new WebSocket(serverAddress);

serverConnection.onopen = function() {
  console.log("I just connected to the server on " + serverAddress);
   serverConnection.send('hello server');
}



// When we get a result
function gotResult(err, results) {
 // text('TEXT',width/2,height/2);
  // The results are in an array ordered by confidence.
  resultsP.html(random(myEmojis) + results[0].label + ' ' + nf(results[0].confidence, 0, 2));
  resultsP.style('font-size', '80px');
  resultsP.style('font-family', 'Helvetica');
  resultsP.position(30, height/2);
  resultsP.style('background-color', 'black');
  resultsP.style('z-index','999');
  classifyVideo();

  
  serverConnection.onmessage = function(event) {
 // console.log("Received: " + event.data);
   serverConnection.send(random(myEmojis)+ results[0].label + ' ' + nf(results[0].confidence, 0, 2))

}
}


