var express = require('express');
var router = express.Router();
var app = express();
var path = require("path");
var mongodb = require('mongodb')
var mongoose = require('mongoose');
let objectID = require("mongodb").ObjectID;
var MongoClient = require('mongodb').MongoClient;
var Users = require('../public/js/models/users')
const assert = require('assert');
var bcrypt= require('bcrypt');


var url = 'mongodb://localhost:27017/connectU';

router.get('/', (req, res) =>{
  res.status(200).render('home');
  console.log({'message':'hit the home route.'});
})

router.get('/users', (req, res)=>{

})

router.get('/signup', (req, res) =>{
  res.status(200).render('signUp');
  console.log({'message':'hit the home route.'});
})

router.post('/signup', async (req, res) =>{
  try{
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
  
  const userObj = {
    name: req.body.name,
    password: hashedPassword,
    email: req.body.email,
    location: req.body.location,
    bio:  req.body.bio}
    // seUnifiedTopology: tru 

    console.log('this is the userObj', userObj);
    
    var MongoClient = mongodb.MongoClient;

    MongoClient.connect(url, function(err, db){
      if(err){
        console.log('Unable to connect.---->')
      }
      else{
        console.log('connection established successfully--->');
        assert.equal(null, err);
        console.log('user added!');
        db.close();
        res.status(200).send(); 
      }
    })
  }catch {
    res.status(500).send()
  }
})

router.get('/chat', (req, res) =>{
  res.status(200).render('chat/chat')
  console.log('hit the chat route.');
})

module.exports = router;