let passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
var path = require("path");
var mongodb = require('mongodb')
var mongoose = require('mongoose');
let objectID = require("mongodb").ObjectID;
var MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var url = 'mongodb://localhost:27017/connectU';
const express = require('express');

let app = express();

app.use(express.static(path.join(__dirname, 'public/js')));

var Users = require('./users.js');



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
 module.exports = function(passport){ 
  passport.use(
    new LocalStrategy({usernameField: 'email'}, function(email, password, done){
      // findUser
      Users.findOne({email: req.body.email})
        .then(user => {
          if(user){
            alert("yup")
          }
          if(!user){
            return done(null, false, {message: "Cannot find user with this email."});
          } 
          bcrypt.compare(password, user.password, (err, isMatch) =>{
            if(err){ throw err;
              console.log("found one")
            }  
            if(isMatch){
              return done(null, user);
              console.log("got a user", user)
            } else {
              console.log('stuck in the else')
              return done(null, false, {message: "Password is not correct for email entered. Please try again."});
            }
          })

        })
        .catch(err => console.log(err));
  })

  )};

  passport.serializeUser(function(user, done){
    done(null, user.id);
    console.log("user", user)
  });


  passport.deserializeUser(function(id,done){
    User.findById(id, function(err, user){
      console.log('ser', user)
      done(err, user);
    });
  });

// passport.use(new LocalStrategy(

//   ))



// module.exports = initialize;