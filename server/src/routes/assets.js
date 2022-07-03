import { Router } from "express";
import { Software, validate as SwValidate } from "../models/softwares.js";
import { Hardware, validate as HwValidate } from "../models/hardware.js";
import auth from "../middleware/generalAuth.js";
const router = Router();

/*(async function(){
    let sw = new Software({
      name: "PowerPoint 2020",
      serialNumber: 87654321,
      location: "keshavarzi",
      manufacturer: "Microsoft",
      installationDate: "2016-11-28",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      lastUpdate: "2021-06-07",
      type: "presentation program",
      isLicense: true,
      currentUser: {
        fullName: "Mr.mohammadi",
        position: "IT manager",
      },
    }); 
    await sw.save();

    let hw = new Hardware({
      name: "Router d-link 1254",
      serialNumber: 12345678,
      propertyNumber: 1582,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      type: "network",
      installationDate:"2020-08-15",
      location: "Mohandesi",
      manufacturer: "D-LINK",
      currentUser: {
        fullName: "doctor ahmadi",
        position: "ostad yar",
      },
      ip: 16502978426164785,
    });
    await hw.save();
})();*/

router.get("/", /*auth, */async (_req, res) => {
    const software = await Software.find({}, { __v: 0, "currentUser._id": 0 });
    const hardware = await Hardware.find({}, { __v: 0, "currentUser._id": 0 });
    res.send({ sw: software, hw: hardware });
  }
);

router.post("/", /*auth, */async (req, res) => {
    if (req.body.type == "hw") {
      const { error } = HwValidate(req.body);
      if (error) return res.status(400).send(error.details[0].message);
      let hardware = new Hardware({
        name: req.body.name,
        serialNumber: req.body.serialNumber,
        propertyNumber: req.body.propertyNumber,
        description: req.body.description,
        type: req.body.assetType,
        installationDate: req.body.installationDate,
        location: req.body.location,
        manufacturer: req.body.manufacturer,
        currentUser: {
          fullName: req.body.fullName,
          position: req.body.position,
        },
        ip: req.body.ip,
      });
      hardware = await hardware.save();
      res.send(hardware);
    }
    if (req.body.type == "sw") {
      const { error } = SwValidate(req.body);
      if (error) return res.status(400).send(error.details[0].message);
      let software = new Software({
        name: req.body.name,
        serialNumber: req.body.serialNumber,
        location: req.body.location,
        manufacturer: req.body.manufacturer,
        installationDate: req.body.installationDate,
        description: req.body.description,
        lastUpdate: req.body.lastUpdate,
        type: req.body.assetType,
        isLicense: req.body.isLicense,
        currentUser: {
          fullName: req.body.fullName,
          position: req.body.position,
        },
      });
      software = await software.save();
      res.send(software);
    }
  }
);

router.put("/", /*auth, */async (req, res) => {
    if (req.body.type == "sw") {
      const { error } = SwValidate(req.body);
      if (error) return res.status(400).send(error.details[0].message);
      const sw = await Software.findByIdAndUpdate(req.body.id, 
        {
          name: req.body.name,
          serialNumber: req.body.serialNumber,
          location: req.body.location,
          manufacturer: req.body.manufacturer,
          installationDate: req.body.installationDate,
          description: req.body.description,
          lastUpdate: req.body.lastUpdate,
          isLicense: req.body.isLicense,
          type: req.body.assetType,
          currentUser: {
            fullName: req.body.fullName,
            position: req.body.position,
          },
        },
        { new: true }
      );

      if (!sw) return res.status(404).send("The software with the given ID was not found.");
      res.send(sw);
    }
    if (req.body.type == "hw") {
      const { error } = HwValidate(req.body);
      if (error) return res.status(400).send(error.details[0].message);
      const hw = await Hardware.findByIdAndUpdate(req.body.id,
        {
          name: req.body.name,
          serialNumber: req.body.serialNumber,
          location: req.body.location,
          manufacturer: req.body.manufacturer,
          propertyNumber: req.body.propertyNumber,
          description: req.body.description,
          type: req.body.assetType,
          installationDate: req.body.installationDate,
          currentUser: {
            fullName: req.body.fullName,
            position: req.body.position,
          },
          ip: req.body.ip,
        },
        { new: true }
      );

      if (!hw) return res.status(404).send("The software with the given ID was not found.");
      res.send(hw);
    }
    res.send("please send the asset type!!!");
  }
);

router.delete("/", /*auth, */async (req, res) => {
    if(req.body.type=='hw'){
        const hw = await Hardware.findByIdAndRemove(req.body.id);
        if (!hw) return res.status(404).send('The hardware with the given ID was not found.');
        res.send(hw);
    }
    if(req.body.type=='sw'){
        const sw = await Hardware.findByIdAndRemove(req.body.id);
        if (!sw) return res.status(404).send('The software with the given ID was not found.');
        res.send(sw);
    }
  }
);

export default router;
