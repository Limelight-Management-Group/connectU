const socket = io.connect('http://localhost:3000');
console.log('client server checking in')

var output = document.getElementById('output');
var text = document.getElementById('message');
var submitBtn = document.getElementById('button');
console.log('<---output2', message);
console.log('submit -->', submitBtn);
// console.log("the output--->", output.innerHTML);
var userEmail= document.getElementById('userEmail');
console.log(userEmail.innerHTML, "userEmail"); 

let storage = {};
let emailStorage = {};
//click events 
submitBtn.addEventListener('click', function(e){

  socket.emit('chat', {
    message: text.value,
    email: userEmail.innerHTML
  })

  storage.message = text.value
  storage.email = userEmail.innerHTML
  alert(storage.message)
  alert(storage.email)

  socket.emit('username',{
    username: userEmail.innerHTML 

  })

  socket.emit('connection',{
    username: userEmail.innerHTML
  })
  // listen for chat events
  socket.on("chat", (data)=>{
    console.log(data, "<-- storage");
  });
  socket.on('connection', (something)=>{
    console.log('something', something)
  })  
  // broadcast when a user connects to chat
  socket.on("username", (data)=>{
    console.log(data,"<-- username");
  });

});

/* VIDEO CHAT */

// get local video and display it with permission
function getlVideo(callbacks){
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;  
    var constraints = {
      audio: true,
      video: true
    }
    navigator.getUserMedia(constraints, callbacks.success, callbacks.error)
}
function recStream(stream, elemID){
  var video = document.getElementById(elemID);

  video.srcObject = stream;

  window.peer_stream = stream;
}
getlVideo({
  success: function(stream){
    window.localstream = stream;
    recStream(stream, 'lvideo')
  },
  error: function(err){
    alert("cannot access your camera");
    console.log(err);
  }
})

var conn;
var peer_id;

// create a peer connection with peer object 
var peer = new Peer({key: 'lwjd5qra8257b9'});

console.log('displayId section', document.getElementById('displayId'))

// display the peer id on the DOM
peer.on('open', function(){
  document.getElementById("displayId").innerHTML = peer.id
})

peer.on('connection', function(connection){
  conn = connection;
  peer_id = connection.peer;

  document.getElementById('connId').value = peer_id;
});

peer.on('error', function(err){
  alert('an error occured:' + err)
  console.log('err', err);
})
// onClick with the connection butt = expose the ice info.
document.getElementById('connectButton').addEventListener('click', function(){
  peer_id = document.getElementById('connId').value;

  if(peer_id){
    conn = peer.connect(peer_id)
  }
  else{
    alert("enter an id.");
    return false;
  }
})
// call on click (offer and answer is exchanged)
  peer.on('call', function(call){
    var acceptCall = confirm('Do you want to connect this call?');
    if(acceptCall){
      call.answer(window.localstream);
      call.on('stream', function(stream){
        window.peer_stream = stream;

        recStream(stream, 'rvideo')
      });
      call.on('close', function(){
        alert("the call has ended.")
      })
    }
    else{
      console.log('call not accepted. Please try again later.')
    }
  
  })
// ask to call
document.getElementById('callButton').addEventListener('click', function(){
 console.log("now calling:" + peer_id);
 console.log("the peer", peer);


 var call = peer.call(peer_id, window.localstream);
 call.on('stream', function(stream){
  window.peer_stream = stream;

  recStream(stream, 'rvideo');
 }) 
})

// accept the call

// display the remote video and local video on the clients.