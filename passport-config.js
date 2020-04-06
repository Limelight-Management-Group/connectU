const express = require('express');
let app = express();
var path = require("path");
const LocalStrategy = require('passport-local').Strategy;
var mongodb = require('mongodb')
var mongoose = require('mongoose');
let objectID = require("mongodb").ObjectID;
var MongoClient = require('mongodb').MongoClient;
var Users = require('./users');
const assert = require('assert');
var bcrypt = require('bcrypt');
let passport = require('passport');
var url = 'mongodb://localhost:27017/connectU';
console.log('the uRL', url)
var MongoUrl = require('./keys.js').mongoURL


// app.use(express.static(path.join(__dirname, 'public/js')));


// console.log("this is the Users", Users)


// function initialize(passport, getUserByEmail, getUserById, req, res) {

  // var MongoClient = mongodb.MongoClient;
  // var url = "mongodb://localhost:27017/connectU";
  // let userLogin = {};

  // MongoClient.connect(url, function(err, email, client){
  //   const userEmail = getUserByEmail(email);

  //   console.log("this is the client")
  //   let db = client.db('connectU');
  //   db.collection('users').findOne()
  //   // console.log("hit it-->", getUserByEmail)
  // })
  // const authenticateUser = async (email, password, done) =>{
  //   const user = getUserByEmail(email);
  //   console.log("this is the user", user)  
  //   if (user == null){
  //     return done(null, false, {message: "No user found!"})
  //   }
  //   try{
  //     console.log("in the try block.")
  //     if(await bcrypt.compare(password, user.password)){
  //       console.log('this is the password', password)
  //       console.log('user.password', user.password)
  //     } else{
  //       return done(null, false, { message: "incorrect password!"});
  //     }
  //   } catch (e) {
  //     return done(e);
  //   }
  // }
  // console.log('the db', db)
  // let ac = mongoose..........
    // console.log(MongoUrl,"MongoUrl")
 module.exports = function(passport){ 
    passport.use(
      new LocalStrategy({usernameField: 'email'}, async function(email, password, done){
        // let db = mongoose.connection;
        // console.log('MongoUrl-->',MongoUrl)
            // DB Config
        // var MongoUrl = require('./keys.js').mongoURL

        let connectString = process.env.Database_URL;
        // mongoose.connect(MongoUrl);
        mongoose.connect(url, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });

        let db = mongoose.connection;
        let userStorage = {};
        db.on('error', error=>console.error(error));
        db.once('open', function(){
          console.log('connection opened to mongodb')
          // findUser
          Users.findOne({email: email})
            .then(user => {
              // console.log('email', email)
              // console.log('user?', user)
              if(!user){
                return done(null, false, {message: 'No user with that email. Try again.'});
              }
              // Match Password
              bcrypt.compare(password, user.password, (err, isMatch)=>{
                // console.log("password-------------------------------->")
                if(err) throw err;
                
                if(isMatch){
                  // console.log("this is the isMatch", user);
                  return done(null, user);
                } else{
                  return done(null, false, {message: "Incorrect password for email provided. Try again."});
                }          
              });
          })
        })    
        .catch(err => console.log(err));
      })
    )  
  };

  passport.serializeUser(function(user, done){
    done(null, user.id);
    // console.log(user, '<------user');
  });


  passport.deserializeUser(function(id,done){
    Users.findById(id, function(err, user, id){
      // console.log('ser--------->', user)
      id = user._id
      console.log('the req id', user.id)
      // let user.id = userId
      done(err, user);
    });
  });

// passport.use(new LocalStrategy(

//   ))



// module.exports = initialize;