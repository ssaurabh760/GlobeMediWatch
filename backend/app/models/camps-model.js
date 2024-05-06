import mongoose from 'mongoose';

// Schema for Camps
const Schema = new mongoose.Schema({
    campName:{
        type: String,
        required: true
    },
    campType:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    // Reference to the Health Organization that is offering the camp
    offeredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HealthOrganization'
    },
    // Reference to the volunteers that are signed up for the camp
    volunteers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'volunteers'
    }],
    // Reference to the services offered at the camp
    servicesOffered: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    }]
});

const Camps = mongoose.model('Camps', Schema);

export default Camps;