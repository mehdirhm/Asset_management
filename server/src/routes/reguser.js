import bcrypt from 'bcrypt';
import _ from 'lodash';
import { User, validate } from '../models/user.js';
import { Router } from 'express';
import auth from '../middleware/adminAuth.js';
const router = Router();

//the post method of registering a new user
router.post('/',auth ,async (req, res) => {
  const date = new Date();

  //validating the user inputs
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  //avoid duplicated usernames
  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send('User already registered.');

  //creating a user object from the request data
  user = new User({
    fullname: req.body.fullname,
    username: req.body.username,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
    regdate: date.getFullYear() +'-'+ ("0" + (date.getMonth() + 1)).slice(-2)+'-'+ ("0" + date.getDate()).slice(-2)
  });

  //hashing the user password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  //saving the new user in DB
  await user.save();

  //creat a token and sending it back to the client
  res.send('user created successfully');
});

router.delete('/:id', /*auth,*/ async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user) return res.status(404).send('The user with the given ID was not found.');
  res.send(user);
});
export default router; 
