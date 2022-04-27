import config from 'config';
import jwt from 'jsonwebtoken';
import joi from 'joi';
import mongoose from 'mongoose';

//define DB collection schema
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 70
  },
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  regdate:{ 
    type: Date,
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin, name: this.fullname }, config.get('jwtPrivateKey'));
  return token;
}

const User = mongoose.model('User', userSchema);

//creat registration inputs validator
function validateUser(user) {
  const schema = joi.object({
    fullname: joi.string().min(5).max(50).required(),
    username: joi.string().min(5).max(255).required(),
    password: joi.string().min(5).max(255).required(),
    isAdmin:joi.bool()
  });
  return schema.validate(user);
}

export  {User} ;
export {validateUser as validate} 