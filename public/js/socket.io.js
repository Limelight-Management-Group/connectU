const socket = io.connect('');
console.log('client server checking in')

var output = document.getElementById('output');
var text = document.getElementById('message');
var submitBtn = document.getElementById('button');
console.log('<---output2', message);
console.log('submit -->', submitBtn);
console.log("the output--->", output.innerHTML);
var userId= document.getElementById('userID');
console.log(userId.innerHTML, "userId"); 

let storage = {};
// alert(storage)
//click events 
submitBtn.addEventListener('click', function(e){
    // e.preventDefault();
   // e.preventDefault();
   socket.emit('chat', {
    message: text.value,
    user: userId.innerHTML
  })
   storage = text.value
// alert(storage)
    // return false;
// This will console
});

// listen for chat events
  socket.on("chat", (data)=>{
    console.log(data, "<-- storage");
    output.innerHTML += '<p><strong>' + data.message + '</strong></p>'
    // data.preventDefault();
    // message = '';
  });
