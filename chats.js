
const mongoose = require('mongoose');
let ObjectID = require("mongodb").ObjectID;
const Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);


// Create Schema and Model

const ChatsSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  chatBody:  {
    type: String,
  }, 
    date:{
    type: Date,
    default: Date.now
  }
})

const Chats = mongoose.model('chats', ChatsSchema);

module.exports = Chats;