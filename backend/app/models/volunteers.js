import mongoose from "mongoose";
import UserModel from './user-models.js';
// Schema for Volunteers
const volunteerSchema = new mongoose.Schema({
    expertise: {
        type: String,
        required: true
    },
    // Reference to the camps a volunteer has signed up for
    campsVolunteered: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Camps'
    }],

});



const volunteerModel =  UserModel.discriminator('volunteers', volunteerSchema);


export default volunteerModel;