import joi from 'joi';
import mongoose from 'mongoose';

//define DB collection schema
const hardwareSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  serialNumber: {
    type: Number,
    required: true,
  },
  propertyNumber: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  installationDate: {
    type: Date,
  },
  manufacturer: { 
    type: String,
  },
  ip: {
    type: Number
  },
  currentUser: {
    type: new mongoose.Schema({
        fullName: String,
        position: String
    }),
  },
});

const Hardware = mongoose.model('hardware', hardwareSchema);

//creat HW inputs validator
function validateHardware(hardware) {
  const schema = joi.object({
    name: joi.string().min(2).max(50).required(),
    serialNumber: joi.number().required(),
    propertyNumber: joi.number().required(),
    description: joi.string().min(5),
    type: joi.string().required(),
    ip: joi.number(),
    installationDate: joi.date(),
    location: joi.string().required(),
    manufacturer: joi.string(),
  });
  return schema.validate(hardware);
}

export {validateHardware as validate};
export  {Hardware};