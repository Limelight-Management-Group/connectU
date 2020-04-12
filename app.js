require('dotenv').config();

const express = require('express');
let app = express();
var cookieParser = require('cookie-parser')
// const socket = io();
const path = require('path');
const ejs = require('ejs');
var bodyParser = require('body-parser');
var methodOverride = require("method-override");
var router = express.Router();
var bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const TWO_HOURS = 1000 * 60 * 60 * 2;
const SESS_LIFETIME = TWO_HOURS
var MongoUrl = require('./keys.js')
// const NODE_ENV = 'development'
const IN_PROD = process.env.NODE_ENV === 'production';
const Video = require('twilio-video');
const MongoStore = require('connect-mongo')(session);

// var socket = require('socket.io');

console.log("this is 2 hours:",TWO_HOURS);
// initializePassport(
//   // passport, 
//   // email => users.find(user => user.email === email),
//   // id => users.find(user => user.id ===id)
// );

let name = process.env.SESS_NAME
console.log("name", name)




app.use(express.static(path.join(__dirname, 'public')));
app.set('/views', __dirname + '/views');

const initializePassport = require('./passport-config.js')(passport);

// set up template
app.set( 'view engine', 'ejs' );

// parse requestbody from form & parse JSON in req post
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {
  extended: false
} ) );

//parse cookie 
// app.use(express.cookieParser('cat'));
app.enable('trust proxy'); // add this line

// Session Middleware
app.use(session({
    name: 'process.env.SESS_NAME',
    resave: false,
    saveUninitialized: false,
    secret: 'cat',
    cookie: {
      maxAge: SESS_LIFETIME,
      sameSite: true,
      secure: IN_PROD
    },
    store: new MongoStore({ttl: SESS_LIFETIME}) 
}));

  
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

// global variables
app.use((req, res, next) =>{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

// methodeoverride for put and delete methods
app.use(methodOverride('_method'));


var routes = require('./routes/index')

app.use(routes);
// app.use(app.router);
// routes.initialize(app)

// const http = require('http').Server(app);
// app.io = io;
var server = require('http').createServer(app);
let port = process.env.PORT || 3000;
server.listen(port)


// var server = http.listen(port, () =>{
  console.log('JS server is live on port:', port)
// })
var io = require('socket.io').listen(server)

// const io = socket(server);
var connections = []
io.on('connection', function(socket){ 
// console.log(socket)

    // Socket connection
    connections.push(socket);
    console.log('connected: %s sockets connected', connections.length)

    socket.on('chat', (data) =>{
      io.sockets.emit('chat', data)
      console.log('the data ------>',data)
    })
    socket.on('username',(name)=>{
      socket.broadcast.emit('username', name)
      console.log("name--->", name)
    })
   
    socket.on('connection', (something)=>{
      socket.broadcast.emit('message', something + 'joined the chat')
      console.log("something",something)
    })  
    // runs when a user disconnects from chat
    socket.on('disconnect', function(data){
      connections.splice(connections.indexOf(socket), 1);
      console.log('disconnected: %s sockets disconnected', connections.length);
    });

});
    // console.log('this is the session', session.user)
    // console.log('user?', user)

// console.log("wtf")



