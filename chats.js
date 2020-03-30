
const mongoose = require('mongoose');
let ObjectID = require("mongodb").ObjectID;
const Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);


// Create Schema and Model

const ChatsSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  chatBody:  {
    type: String,
  }, 

})

const Chats = mongoose.model('chats', ChatsSchema);

module.exports = Chats;