import joi from 'joi';
import { compare } from 'bcrypt';
import { User } from '../models/user.js';
import { Router } from 'express';
const router = Router();

//the post method of logging in
router.post('/', async (req, res) => {

  //validate user inputs
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  //find and return the user in DB by username
  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send('Invalid username or password.');

  //check if inputted password matches
  const validPassword = await compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid username or password.');

  //creat token and return it to user
  // var myHeaders = new Headers();
  const token = user.generateAuthToken();
  // myHeaders.append('x-auth-token',token);
  // console.log(typeof(token));
  // res.writeHead(200 , {
  //   'x-auth-token':"token",
  // }).send();
  res.header("Access-Control-Expose-Headers", "*");   // for acces to content of header that set in other side of application
  res.header("x-auth-token", token).send();
  
  // res.send();
  // res.writeHead(200, {'x-auth-token': token}).send();
});

//creat login inputs validator
function validate(req) {
  const schema = joi.object({
    username: joi.string().min(5).max(255).required(),
    password: joi.string().min(5).max(255).required()
  });
  return schema.validate(req);
}

export default router; 
