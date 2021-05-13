const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  visited:[
    {
      qid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
      }
    }
  ],
  answeredCorrectly: [
    {
      qid: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"post"
      }
    }
  ],
  answeredWrong : [
    {
      qid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
      }
    }
  ]
});

module.exports = User = mongoose.model("user", UserSchema); //"User"  - Mongoose Model , "user" -> Collection Name in singular , "UserSchema" - Schema Name
//*Exporting Mongoose Model named "User"
