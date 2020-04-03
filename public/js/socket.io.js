const socket = io.connect('http://localhost:3000');
console.log('client server checking in')

var output = document.getElementById('output');
var message = document.getElementById('message');
var submitBtn = document.getElementById('button');
console.log('<---output2', message);
console.log('submit -->', submitBtn);
console.log("the output--->", output.innerHTML);

//click events 
submitBtn.addEventListener('click', function(){
   socket.emit('chat', {
    message: message.value
  })
// alert(message)
console.log(message.value)
// This will console
});

// listen for chat events
  socket.on('chat', data=>{

    output.innerHTML += '<p><strong>' + data.message + '</strong></p>'
  });
