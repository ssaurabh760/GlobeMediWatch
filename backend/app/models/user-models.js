import mongoose from "mongoose";
import bcrypt from 'bcrypt';

// Creating a mongoose schema
const Schema = mongoose.Schema;

/**
 * Enum defining user roles.
 */
const ROLES = {
  GENERAL: "general", // General users who can volunteer, donate, etc.
  ORGANIZATION: "organization", // Health organizations that can start fundraising
  VOLUNTEER: "volunteer" // Volunteers who want help out
}
/**
 * User Model Schema
 */

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: [true, 'Firstname is required'],
  },
  lastname: {
    type: String,
    required: [true, 'Lastname is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  role: {
    type: String,
    enum: Object.values(ROLES),
    required: [true, 'Role is required']
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  imageUrl: {
    type: String,
    default: ''
  },
},
{ versionKey: false, timestamps: true });

//  middleware to hash the password
UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

// Creating a mongoose model for User
const UserModel = mongoose.model("User", UserSchema);

export default UserModel;