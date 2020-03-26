let passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
var path = require("path");
var mongodb = require('mongodb')
var mongoose = require('mongoose');
let objectID = require("mongodb").ObjectID;
var MongoClient = require('mongodb').MongoClient;
// var Users = require('../public/js/models/users')
const assert = require('assert');
var url = 'mongodb://localhost:27017/connectU';





function initialize(passport, getUserByEmail, getUserById, req, res) {
}
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
  // passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser));
  // passport.serializeUser((user,done) => done(null, user.id))
  // passport.deserializeUser((id,done) => {
  //   return done(null, getUserById(id)) 
  // })

// }

// passport.use(new LocalStrategy(

//   ))



module.exports = initialize;