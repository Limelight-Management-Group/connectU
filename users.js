
const mongoose = require('mongoose');
let ObjectID = require("mongodb").ObjectID;
const Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);


// Create Schema and Model

const UsersSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  bio:  {
    type: String,
  }, 
  password: {
    type: String,
    required: true,
    bcrypt: true
  },
  email: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  date:{
    type: Date,
    default: Date.now
  }

})

const Users = mongoose.model('user', UsersSchema);

module.exports = Users;