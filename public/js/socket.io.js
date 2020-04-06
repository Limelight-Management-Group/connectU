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
// alert(storage)
//click events 
submitBtn.addEventListener('click', function(e){
    // e.preventDefault();
   // e.preventDefault();
// e.preventDefault();
   socket.emit('chat', {
    message: text.value,
    email: userEmail.innerHTML
  })
   storage.message = text.value
   storage.email = userEmail.innerHTML
alert(storage.user)
alert(storage.email)
    return false;
// This will console
});

// listen for chat events
  socket.on("chat", (data)=>{
    console.log(data, "<-- storage");
    // output.innerHTML += '<p><strong>' + data.message + '</strong></p>'
    // data.preventDefault();
    // message = '';
  });
