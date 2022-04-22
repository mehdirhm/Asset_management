// import { get } from 'config';
// import { sign } from 'jsonwebtoken';
import joi from 'joi';
import mongoose from 'mongoose';

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

// userSchema.methods.generateAuthToken = function() { 
//   const token = sign({ _id: this._id, isAdmin: this.isAdmin }, get('jwtPrivateKey'));
//   return token;
// }

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = joi.object({
    fullname: joi.string().min(5).max(50).required(),
    username: joi.string().min(5).max(255).required(),
    password: joi.string().min(5).max(255).required()
  });
  return schema.validate(user);
}

const _User = User;
export { _User as User };
export {validateUser as validate} 