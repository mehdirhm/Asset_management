import { Router } from "express";
import { Software } from "../models/softwares.js";
import { Hardware } from "../models/hardware.js";
import auth from "../middleware/generalAuth.js"
const router = Router();

(async function(){
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
})();


router.get('/', /*auth,*/ async (req, res) => {
    const software = await Software.find();
    const hardware = await Hardware.find();
    res.send({sw: software, hw: hardware});
});

export default router;