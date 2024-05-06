/**
 * Application initialization module
 * Configures middleware, connects to the database, and initializes routes
 */
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import initializeRoutes from "./routes/index.js";
import models from "./models/index.js";

/**
 * Initializes the Express application
 * @param {express.Application} app - Express application instance
 */
const initialize = (app) => {
  // Enable CORS (Cross-Origin Resource Sharing)
  app.use(cors());

  // Parse JSON request bodies
  app.use(express.json());

  // Parse URL-encoded request bodies
  app.use(express.urlencoded({ extended: true }));

  // Connect to the MongoDB database
  mongoose.connect(process.env.MONGO_CONNECTION);

  // Initialize routes
  initializeRoutes(app);
};

export default initialize;