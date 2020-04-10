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
// alert(storage)
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
  // return false;

  // console.log("!!!!!!!!", storage.email)  
  socket.emit('username',{
    username: userEmail.innerHTML
  })

  // emailStorage.email = userEmail.innerHTML



  // listen for chat events
  socket.on("chat", (data)=>{
    console.log(data, "<-- storage");
  });  
  // broadcast when a user connects to chat
  socket.on("username", (data)=>{
    console.log(data,"<-- username");
  });
  // // runs when a user disconnects from chat
  // socket.on('disconnect', ()=>{
  //  io.emit('message', userEmail)
  // })
});
