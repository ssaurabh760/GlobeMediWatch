import mongoose from 'mongoose';
import UserModel from "./user-models.js";

// Defining a new mongoose schema for Health Organization
const Schema = new mongoose.Schema({
    organizationName: {
        type: String,
        required: true
    },
    services: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service', // Referencing from Service model
        
    }],
    description: {
        type: String,
        
    },
    camps: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Camps', // Referencing from Camps Model
      
    }],
    location: {
        type: String,
        
    },
    date: {
        type: Date,
        
    }
  });

// Creating a discriminator for Health Organization based on the User model
const HealthOrganization = UserModel.discriminator('HealthOrganization', Schema);

// Exporting the Health Organization model
export default HealthOrganization;
