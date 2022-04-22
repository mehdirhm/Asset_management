import joi from 'joi';
import { compare } from 'bcrypt';
import { User } from '../models/user.js';
import { Router } from 'express';
const router = Router();

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send('Invalid username or password.');

  const validPassword = await compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid username or password.');

//   const token = user.generateAuthToken();
//   res.send(token);
    res.send(true);
});

function validate(req) {
  const schema = joi.object({
    username: joi.string().min(5).max(255).required(),
    password: joi.string().min(5).max(255).required()
  });
  return schema.validate(req);
}

export default router; 
