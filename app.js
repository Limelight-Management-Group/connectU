const express = require('express');
let app = express();
const path = require('path');
const ejs = require('ejs');
var bodyParser = require('body-parser');
var methodOverride = require("method-override");
var router = express.Router();






app.use(express.static(path.join(__dirname, 'public')));
app.set('/views', __dirname + '/views');


// set up template
app.set( 'view engine', 'ejs' );

// parse requestbody from form & parse JSON
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {
  extended: false
} ) );



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
