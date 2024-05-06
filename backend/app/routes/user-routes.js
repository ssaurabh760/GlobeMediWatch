import express from 'express';
import * as UserController from '../controllers/user-controller.js';


import verifyToken from '../middleware/auth.js'; // Middleware for token verification

const router = express.Router();


// Route for getting all registered users
router.get('/', UserController.getAllRegisteredUsers);                             

// Route for updating user details and deleting a user by ID
router.route('/:id')
    .patch(UserController.updateUserDetails)                                         
    .delete(UserController.deleteUser);                                             

// Routes for user login and signup
router.post('/login', UserController.loginUser);                                  
router.post('/signup', UserController.signupUser);                                 

// Route for user profile access
router.route('/profile/:id')
    .get(UserController.getUserById)                                            
   

// Route for fetching user details by email
router.get('/profile/email/:email', UserController.getUserByEmail);               

// Routes for email verification and OTP resend
router.put('/email', UserController.validateUserByEmail);

router.post('/email/resend', UserController.reSendOTP); 

// Route for getting the currently logged-in user
router.get('/me', verifyToken, UserController.getCurrentUser);


export default router;
