var express = require('express');
var router = express.Router();
var app = express();
var path = require("path");
var mongodb = require('mongodb')
var mongoose = require('mongoose');
let objectID = require("mongodb").ObjectID;
var MongoClient = require('mongodb').MongoClient;
var Users = require('../users');
var Chats = require('../chats');
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
  let user = req.session.email

  res.status(200).render('home');
  console.log({'message':'hit the home route.'});
})


router.get('/users', (req, res)=>{

});



router.get('/signup', (req, res) =>{
  res.status(200).render('signUp');
  console.log({'message':'hit the home route.'});
});



router.post('/user/:id', (req, res) => {
try{
  console.log('-----req.body---->', req.session.email)
  const chatObj = {
    // userName: req.session.id,
    chatBody: req.body.chatBody,
    email: req.session.email
  };
console.log('the chatObj', chatObj)

  mongoose.connect(MongoUrl, {
    useNewUrlParser: true,
  });
  let db = mongoose.connection;
  var chatStorage = {};
  db.on('error', error =>console.error(error));
  db.once('open', function(){
      console.log("user POST DB connection successful!")
      Chats.create(chatObj).then( async function(chat, err){
           return await chat
           chatStorage = chat;
      });
      Users.findOne({email: req.session.email}, function(err, user){
      // console.log("user for post", user);
      var key = user._id
       
      // console.log('user...', user) 
      return res.redirect('/user/' + key);
    })
  })    
}
catch{

}
})


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
  mongoose.connect(MongoUrl, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  let db = mongoose.connection;
  var userStorage = {};
  db.on('error', error =>console.error(error));
  db.once('open', function(){
    console.log("connection successful!")
    Users.create(userObj).then( async function(user, err){
         console.log('this is the user', user._id)
         req.session.id = user._id
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

  // console.log('userId', req.session.id)
  req.session.email = req.body.email
  req.session.id = req.body.id
  console.log()
  res.status(200).render('users/login')
});
// href="activity/<%=activity._id%>"
router.post('/login', (req, res, next)=>{
  // console.log('session-------|-----|->', req.session.id)
    // I need to find the user object that i just authenticated.
  let key;
  mongoose.connect(MongoUrl, {
    useNewUrlParser: true,
  });
  let db = mongoose.connection;
  var userStorage = {};
  db.on('error', error =>console.error(error));
  db.once('open', function(){
    console.log("Login DB connection successful!")
    console.log(req.body.email, "req.body?")
    Users.findOne({email: req.body.email}, function(err, user){
      console.log("user?????", user)
      key = user._id;
      // console.log('the key',key);
  passport.authenticate('local', {
    successRedirect: '/user/' + key,
    failurRedirect: 'login'
  })(req,res, next);
    })
  })
  let user = req.body
  // console.log('user-->',user)
  req.session.id = req.body._id;
  req.session.email = req.body.email


  // user.id = req.session.id;
  // user = req.session.email
  // console.log("user-->", user.id)
  // console.log(req.session,'<-------userEmail')
  return user
  res.render('home');
});

// Logout Route
router.get('/logout', function (req,res){
  req.logout();
  res.redirect('/login');
})

// router.get('/chat', ensureAuthenticated, (req, res) =>{
//   console.log("session info", req.session.email);
//   res.status(200).render('chat/chat',{
//     user: req.session.email,
//     id: req.session.id
//   })
//   console.log('hit the chat route.');
// });

router.get('/user/:id', ensureAuthenticated, (req, res) =>{
    var chatStorage = [];
    mongoose.connect(MongoUrl, {
      useNewUrlParser: true,
    });
    let db = mongoose.connection;
    db.on('error', error =>console.error(error));
    db.once('open', function(){
      console.log(" 1 first - user DB connection successful!");
      // console.log(req.session.email,"req.session.email")
      // console.log(req.session.passport.user)
    Users.findOne({email: req.session.email}).then(function(){
          console.log('3 - third')
          Chats.find({email: req.session.email}).then(function(chat){
          req.session.cookie.email = req.session.email;
          req.session.cookie.user_id = req.session.passport.user
          console.log('5 fifth - chats_-->-->--->', chat)
          chat.forEach(function(message){
            console.log(' 6 sixth - this is the chat i pushed', message)
            chatStorage.push(message)
            console.log('A chat---->', message)  
            console.log("pushed:", chatStorage.length)
          })
          req.session.cookie.user_chats = chatStorage      
          console.log('7 seventh - session values->______>----<><', req.session.cookie.user_chats)
          console.log(' 8 eighth -chatStorage', chatStorage)
          let chatObj = req.session.cookie.user_chats;
      // db.close()
        console.log('4 - fourth')
          res.status(200).render('chat/chat',{
          user: req.session.email,
          sess_id: req.session.passport.user,
          chatStorage: chatStorage

        })
        })
    })
    
  
  console.log(' 2 Second - hit the chat route.');
  // console.log("req.session", req.session)
  })
  // console.log('user?', user)
});


module.exports = router;


