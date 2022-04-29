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
  currentUser: {
    type: new mongoose.Schema({
        fullName: String,
        position: String
    }),
  }
});

const Software = mongoose.model('software', softwareSchema);

//creat SW inputs validator
function validateSoftware(software) {
  const schema = joi.object({
    name: joi.string().min(2).max(50).required(),
    serialNumber: joi.number().required(),
    location: joi.string().required(),
    manufacturer: joi.string(),
  });
  return schema.validate(software);
}

export {validateSoftware as validate};
export  {Software};