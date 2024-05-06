// Importing necessary modules
import express from 'express';
import * as HealthOrgControllers from '../controllers/health-org-controllers.js';
import verifyToken from '../middleware/auth.js';

// Creating an instance of express router
const router = express.Router();

// Routes for health organizations
router.post('/', HealthOrgControllers.createHealthOrganizationProfile); // Create a new health organization profile
router.get('/', HealthOrgControllers.listAllHealthOrganizations);  // List all health organizations
router.get('/:id', HealthOrgControllers.getHealthOrganizationById); // Get a health organization by ID
router.put('/:id', verifyToken, HealthOrgControllers.updateHealthOrganizationProfile); // Update a health organization profile
router.delete('/:id', verifyToken, HealthOrgControllers.deleteHealthOrganizationProfile); // Delete a health organization profile

export default router;
