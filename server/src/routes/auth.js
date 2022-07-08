import _ from 'lodash';
import { Router } from 'express';
import auth from '../middleware/adminAuth.js';
const router = Router();

router.get('/',auth,  (req, res) => {
    res.send("access allowed");
});

export default router;