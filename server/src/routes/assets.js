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
            currentUser: {
                fullname: req.body.currentUser.fullname,
                position: req.body.currentUser.position
            },
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
            currentUser: {
                fullname: req.body.currentUser.fullname,
                position: req.body.currentUser.position
            }
            });
        software = await software.save();
        res.send(software);
    }
});

router.put('/:id', /*auth,*/ async (req, res) => {
    if (req.body.type=='sw') {
        const { error } = SwValidate(req.body); 
        if (error) return res.status(400).send(error.details[0].message);
        const sw = await Software.findByIdAndUpdate(req.params.id,
            { 
                name: req.body.name,
                serialNumber: req.body.serialNumber,
                location: req.body.location,
                manufacturer: req.body.manufacturer,
                currentUser: {
                    fullname: req.body.currentUser.fullname,
                    position: req.body.currentUser.position
                }
            }, { new: true });
            
        if (!sw) return res.status(404).send('The software with the given ID was not found.');  
        res.send(sw);
    }
    if (req.body.type=='hw') {
        const { error } = HwValidate(req.body); 
        if (error) return res.status(400).send(error.details[0].message);
        const hw = await Hardware.findByIdAndUpdate(req.params.id,
            { 
                name: req.body.name,
                serialNumber: req.body.serialNumber,
                location: req.body.location,
                manufacturer: req.body.manufacturer,
                currentUser: {
                    fullname: req.body.currentUser.fullname,
                    position: req.body.currentUser.position
                },
                ip: req.body.ip
            }, { new: true });
            
        if (!hw) return res.status(404).send('The software with the given ID was not found.');  
        res.send(hw);
    }
    res.send("please send the asset type!!!") 
});

router.delete('/:type/:id', /*auth,*/ async (req, res) => {
    if(req.params.type=='hw'){
        const hw = await Hardware.findByIdAndRemove(req.params.id);
        if (!hw) return res.status(404).send('The hardware with the given ID was not found.');
        res.send(hw);
    }
    if(req.params.type=='sw'){
        const sw = await Hardware.findByIdAndRemove(req.params.id);
        if (!sw) return res.status(404).send('The software with the given ID was not found.');
        res.send(sw);
    }
  });

export default router;