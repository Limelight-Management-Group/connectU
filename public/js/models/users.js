
const mongoose = require('mongoose');
let ObjectID = require("mongodb").ObjectID;
const Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);


// Create Schema and Model

const UsersSchema = new Schema({
  name: {
    type: String,
    // required: [true: 'Title field required']
  },
  bio:  {
    type: String,
  }, 
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  location: {
    type: String,
  }

})

const Users = mongoose.model('user', UsersSchema);

module.exports = Users;