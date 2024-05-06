// Importing necessary modules
import User from "../models/user-models.js";
import bcrypt from "bcrypt";
import validator from 'validator';



// Function to sign up a new user
export const signup = async (firstname, lastname, email, password, role, orgDetails = {}) => {
    console.log('Entered in signup');
    console.log(`firstname: ${firstname}, lastname: ${lastname}, email: ${email}, password: ${password}, user-role: ${role}`);

    // Validation
    if (!firstname || !lastname || !email || !password || !role) {
        throw new Error('All fields must be filled');
    }
    if (!validator.isEmail(email)) {
        throw new Error('Email is not valid');
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error('Password is not strong enough');
    }

    // Checking if the email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new Error('Email already in use');
    }

    // Creating a new user in the database
    let newUser;
    if (role === 'organization') {
        // For organization role, merge orgDetails with the user details
        newUser = await User.create({ 
            firstname, 
            lastname, 
            email, 
            password: password, 
            role, 
            ...orgDetails // Spreading the orgDetails into the user document
        });
    } else {
        // For all other roles, create a user without orgDetails
        newUser = await User.create({ 
            firstname, 
            lastname, 
            email, 
            password: password, 
            role 
        });
    }
    return newUser;
};




// Function to log in a user
export const login = async (email, password) => {
    console.log('Entered in login');
    console.log(`email: ${email}, password: ${password}`);
    if (!email || !password) {
        throw new Error('All fields must be filled');
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found, please check your email and password');
    }

    // Compare plain text password with hashed password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error('Invalid login credentials');
    }
    return user;
};

// Function to delete a user by their ID
export const deleteUserById = async (id) => {
    console.log("Deleting user with ID:", id);
    return await User.findByIdAndDelete(id);
};


// Function to list registered users
export const getRegisteredUsers = async () => {
    return await User.find({});
};


// Function to find a user by their ID
export const findUserById = async (id) => {
    return await User.findById(id);
};



// Function to find a user by their Email
export const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};


// Function to update a user by their ID
export const updateUserDetails = async (id, userUpdates) => {
    console.log(`Updating user with ID: ${id}`);
    console.log(`Updates: ${JSON.stringify(userUpdates)}`);
    return await User.findByIdAndUpdate(id, userUpdates, { new: true });
};

// Function to update User Verification Status
export const updateVerificationStatus = async (email, isVerified) => {
    console.log(`Updating verification status for email: ${email} to ${isVerified}`);
    return await User.findOneAndUpdate({ email }, { isVerified }, { new: true });
};
