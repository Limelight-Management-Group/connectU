var express = require('express');
var router = express.Router();
var app = express();
var path = require("path");
var mongodb = require('mongodb')
var mongoose = require('mongoose');
let objectID = require("mongodb").ObjectID;
var MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

var url = 'mongodb://localhost:27017/connectU';

router.get('/', (req, res) =>{
  res.status(200).render('home');
  console.log({'message':'hit the home route.'});
})

router.get('/users', (req, res) =>{
  console.log('hit the users route.');
})

module.exports = router;