var express = require('express');
var router = express.Router();
var app = express();
var path = require("path");
var mongodb = require('mongodb')
var mongoose = require('mongoose');
let objectID = require("mongodb").ObjectID;
var MongoClient = require('mongodb').MongoClient;
var Users = require('../users')
const assert = require('assert');
var bcrypt= require('bcrypt');
let passport = require('passport');
const { ensureAuthenticated} = require('../auth');

// DB Config
var MongoUrl = require('../keys.js').mongoURL
// console.log('mongoURL', MongoUrl);

// Connect to Mongo
// let db = mongoose.connect(MongoUrl, { useNewUrlParser: true})
// .then(() => console.log("mongodb is connected!"))
// .catch(err => console.log(err,"this is failing."))

// const initializePassport = require('../passport-config.js');
// initializePassport(
//   passport, 
//   email => users.find(user => user.email === email),
//   id => users.find(user => user.id ===id)
// );
// console.log("this is here")



router.get('/', (req, res) =>{
  const userId  = req.session.id;

  res.status(200).render('home');
  console.log({'message':'hit the home route.'});
})

router.get('/users', (req, res)=>{

});

router.get('/signup', (req, res) =>{
  res.status(200).render('signUp');
  console.log({'message':'hit the home route.'});
});

router.post('/signup', async (req, res) =>{
  try{
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt); 
  const userObj = {
    name: req.body.name,
    password: hashedPassword,
    email: req.body.email,
    location: req.body.location,
    bio: req.body.bio  
  }
  // let connectString = process.env.Database_URL;
  mongoose.connect(MongoUrl, {
    useNewUrlParser: true,
  });
  let db = mongoose.connection;
  var userStorage = {};
  db.on('error', error =>console.error(error));
  db.once('open', function(){
    console.log("connection successful!")
    Users.create(userObj).then( async function(user, err){
         console.log('this is the user', user)
         return await user
         userStorage = user;
    });
    req.flash('success_msg', "You are now registered!");
    return res.redirect('/login');


  })
}
catch{
  console.log("failed!")
}
});  


router.get('/login', (req,res)=>{
  console.log('userId', req.session.id)
  res.status(200).render('users/login')
});

router.post('/login', (req, res, next)=>{
  passport.authenticate('local', {
    successRedirect: '/chat',
    failurRedirect: 'login'
  })(req,res, next);
  let user = req.body
  console.log('user-->',user)
  req.session.id = req.body._id;
  console.log("req.session", req.session)
  return user
  res.render('home');
});

// Logout Route
router.get('/logout', function (req,res){
  req.logout();
  res.redirect('/login');
})

router.get('/chat', ensureAuthenticated, (req, res) =>{
  res.status(200).render('chat/chat',{
    user: req.user,
    id: req.session.id
  })
  console.log('hit the chat route.');
})

module.exports = router;