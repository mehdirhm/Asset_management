import jwt from 'jsonwebtoken';
import config from 'config';
import { User } from '../models/user.js';


export default async function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    let user = await User.findOne({ _id: decoded._id });
    if (!user) return res.status(400).send('your token is not validate anymore please login again!');
    if (!user.isAdmin) return res.status(401).send('Access denied. only admins can add new users.');
    next();
  }
  catch (ex) {
    res.status(400).send('Invalid or Expired token, please login again.');
  }
}