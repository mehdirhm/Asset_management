import { Router } from "express";
import { Software, validate as SwValidate } from "../models/softwares.js";
import { Hardware, validate as HwValidate } from "../models/hardware.js";
import auth from "../middleware/generalAuth.js"
const router = Router();

/*(async function(){
    let sw = new Software({
        name: "office",
        serialNumber: 12345678,
        location: "mohandesi",
        manufacturer: "microsoft",
        currentUser: {
            fullName: "alireza",
            position: "student"
        }
    }); 
    await sw.save();
    let hw = new Hardware({
        name: "router",
        serialNumber: 12345678,
        location: "mohandesi",
        manufacturer: "IBM",
        ip: 1235485215
    }); 
    await hw.save();
})();*/

router.get('/', /*auth,*/ async (_req, res) => {
    const software = await Software.find({}, {"_id": 0, "__v": 0, "currentUser._id": 0});
    const hardware = await Hardware.find({}, {"_id": 0, "__v": 0, "currentUser._id": 0});
    res.send({sw: software, hw: hardware});
});

router.post('/', /*auth,*/ async (req, res) => {
    if (req.body.type=='hw') {
        const { error } = HwValidate(req.body); 
        if (error) return res.status(400).send(error.details[0].message);
        const hardware = new Hardware({
            name: req.body.name,
            serialNumber: req.body.serialNumber,
            location: req.body.location,
            manufacturer: req.body.manufacturer,
            ip: req.body.ip
            });
        hardware = await hardware.save();
        res.send(hardware);
    }
    if (req.body.type=='sw') {
        const { error } = SwValidate(req.body); 
        if (error) return res.status(400).send(error.details[0].message);
        const software = new Software({
            name: req.body.name,
            serialNumber: req.body.serialNumber,
            location: req.body.location,
            manufacturer: req.body.manufacturer,
            ip: req.body.ip
            });
        software = await software.save();
        res.send(software);
    }
  });

export default router;