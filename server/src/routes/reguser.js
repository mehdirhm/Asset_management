// import auth from '../middleware/auth';
// import jwt from 'jsonwebtoken';
// import config from 'config';
// import bcrypt from 'bcrypt';
import _ from 'lodash';
import { User, validate } from '../models/user.js';
import { Router } from 'express';
const router = Router();

// router.get('/me', auth, async (req, res) => {
//   const user = await User.findById(req.user._id).select('-password');
//   res.send(user);
// });

router.post('/', async (req, res) => {
  const date = new Date();
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send('User already registered.');

  user = new User({
    fullname: req.body.fullname,
    username: req.body.username,
    password: req.body.password,
    regdate: date.getFullYear() +'-'+ ("0" + (date.getMonth() + 1)).slice(-2)+'-'+ ("0" + date.getDate()).slice(-2)
  })
//   const salt = await bcrypt.genSalt(10);
//   user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(user);
//   const token = user.generateAuthToken();
//   res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

export default router; 
