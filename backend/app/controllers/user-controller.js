import * as userService from "../services/user-service.js";
import validator from "validator";
import { setResponse, setError, setSignupError } from "./response-handler.js";
import { createToken } from "../utilities/token.js";
import * as otpHandler from "../utilities/otpHandler.js";
import bcrypt from "bcrypt";

/**
 * Controller function to handle user login.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 */
export const loginUser = async (request, response) => {
    try {
        const { email, password } = request.body;
        const user = await userService.login(email, password);
        const token = createToken(user._id);
        setResponse({ user, token }, response);
    } catch (err) {
        console.error("Login Error:", err);
        setError(err, response);
    }
};

/**
 * Controller function to handle user signup.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 */
export const signupUser = async (request, response) => {
    const { firstname, lastname, email, password, role, orgDetails } = request.body;
    try {
        // Pass orgDetails to the signup function. It will be used if the role is 'organization'
        const user = await userService.signup(firstname, lastname, email, password, role, orgDetails);
        const otpSecret = otpHandler.createNewOTP(email);
        const token = createToken(user._id);
        
        // Ensure user data is properly extracted before sending it in the response
        const userData = user.toObject ? user.toObject() : user;
        setResponse({ ...userData, token, otpSecret }, response);
    } catch (err) {
        console.error("Signup Error:", err);
        setError(err, response);
    }
};

/**
 * Controller function to delete a user by ID.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 */
export const deleteUser = async (request, response) => {
    try {
        const id = request.params.id;
        await userService.deleteUserById(id);
        setResponse({ message: "User successfully deleted" }, response);
    } catch (err) {
        console.error("Delete User Error:", err.message, err);
        setError(err, response);
    }
};

/**
 * Controller function to get all registered users.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 */
export const getAllRegisteredUsers = async (request, response) => {
    try {
        const registeredUsers = await userService.getRegisteredUsers();
        setResponse(registeredUsers, response);
    } catch (err) {
        setError(err, response);
    }
};

/**
 * Controller function to get a user by ID.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 */
export const getUserById = async (request, response) => {
    try {
        const user = await userService.findUserById(request.params.id);
        setResponse(user, response);
    } catch (err) {
        setError(err, response);
    }
};

/**
 * Controller function to get a user by email.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 */
export const getUserByEmail = async (request, response) => {
    try {
        const user = await userService.findUserByEmail(request.params.email);
        setResponse(user, response);
    } catch (err) {
        setError(err, response);
    }
};

/**
 * Controller function to resend OTP.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 */
export const reSendOTP = async (request, response) => {
    try {
        if (!request.body.email) {
            throw new Error('Email field is required');
        }
        const otpSecret = otpHandler.createNewOTP(request.body.email);
        setResponse({ otpSecret }, response);
    } catch (err) {
        setError(err, response);
    }
};

/**
 * Controller function to validate user by email.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 */
export const validateUserByEmail = async (request, response) => {
    try {
        if (!request.body.email) {
            throw new Error('Email field is required');
        }
        const isValidOtp = otpHandler.verifyOTP(request.body.email, request.body.otpSecret, request.body.otp);
        if (isValidOtp) {
            await userService.updateVerificationStatus(request.body.email, isValidOtp);
            setResponse({ message: "Email successfully verified" }, response);
        } else {
            response.status(401).send({ message: 'Invalid OTP' });
        }
    } catch (err) {
        setError(err, response);
    }
};

/**
 * Controller function to update user details.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 */
export const updateUserDetails = async (request, response) => {
    try {
        const updateFields = request.body;
        const updatedUser = await userService.updateUserDetails(request.params.id, updateFields);
        setResponse(updatedUser, response);
    } catch (err) {
        setError(err, response);
    }
};

/**
 * Controller function to get the current user.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 */
export const getCurrentUser = async (request, response) => {
    try {
      const user = request.user;
      setResponse(user, response);
    } catch (err) {
      setError(err, response);
    }
};