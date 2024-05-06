/**
 * Main entry point of the application
 * Configures the environment, creates an Express app, and starts the server
 */
import express from 'express';
import dotenv from 'dotenv';
import initialize from './app/app.js';

// Load environment variables from .env file
dotenv.config();

// Create an instance of the Express application
const app = express();

// Get the port number from the environment variables
const port = process.env.PORT;

// Initialize the application
initialize(app);

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});