import { Router } from "express";
import { Software, validate as SwValidate } from "../models/softwares.js";
import { Hardware, validate as HwValidate } from "../models/hardware.js";
import { User } from "../models/user.js";
import auth from "../middleware/generalAuth.js";
const router = Router();

router.get("/", /*auth, */async (_req, res) => {
    const software = await Software.find({}, { __v: 0}).count();
    const freeSoftwares = await Software.find({"currentUser.fullName": "storage"}).count();
    const hardware = await Hardware.find({}, { __v: 0}).count();
    const freeHardwares = await Hardware.find({"currentUser.fullName": "storage"}).count();
    const user = await User.find({}).count();
    const admins = await User.find({isAdmin: true}).count();
    res.send({ 
        allAssets: software + hardware,
        sw: software,
        freeSoftwares: freeSoftwares, 
        hw: hardware,
        freeHardwares: freeHardwares, 
        users: user,
        admins: admins, 
    });
  }
);

export default router;