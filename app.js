if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}
const express = require('express');
let app = express();
var cookieParser = require('cookie-parser')

const path = require('path');
const ejs = require('ejs');
var bodyParser = require('body-parser');
var methodOverride = require("method-override");
var router = express.Router();
var bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

var MongoUrl = require('./keys.js')


// initializePassport(
//   // passport, 
//   // email => users.find(user => user.email === email),
//   // id => users.find(user => user.id ===id)
// );





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
// Session Middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUnitialized: true, 
}));

//parse cookie 
// app.use(express.cookieParser());

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



let port = process.env.PORT || 3000;

app.listen(port, () =>{
  console.log('JS server is live on port:', port)
})
