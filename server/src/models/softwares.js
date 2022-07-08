import joi from 'joi';
import mongoose from 'mongoose';

//define DB collection schema
const softwareSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  serialNumber: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true
  },
  manufacturer: { 
    type: String,
  },
  installationDate: {
    type: Date,
  },
  lastUpdate: {
    type: Date,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    required: true
  },
  currentUser: {
    type: new mongoose.Schema({
        fullName: String,
        position: String
    }),
  },
  isLicense: Boolean,
});

const Software = mongoose.model('software', softwareSchema);

//create SW inputs validator
function validateSoftware(software) {
  const schema = joi.object({
    name: joi.string().min(2).max(50).required(),
    serialNumber: joi.number().required(),
    location: joi.string().required(),
    manufacturer: joi.string(),
    description: joi.string().min(5),
    type: joi.string().required(),
    installationDate: joi.date(),
    lastUpdate: joi.date(),
    assetType: joi.string().required(),
    fullName: joi.string(),
    position: joi.string(),
    isLicense: joi.boolean(),
    id: joi.string()
  });
  return schema.validate(software);
}

export {validateSoftware as validate};
export  {Software};