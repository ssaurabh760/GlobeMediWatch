import express from 'express';

import * as campController from '../controllers/camps-controller.js';

const router = express.Router();

// Routes for getting all camps and creating a new camp
router.route('/')
    .get(campController.getAllCamps)
    .post(campController.createCamp);

// Routes for getting, updating, and deleting a specific camp
router.route('/:id')
    .get(campController.getCampById)
    .put(campController.updateCamp)
    .delete(campController.deleteCamp);

// Route for getting a camp by date
router.route('/date/:date')
    .get(campController.getCampByDate);

// Route for getting all camps offered by a specific health organization    
router.route('/organization/:healthOrgId')
    .get(campController.getCampsByOfferedBy);


// Route for adding a volunteer to a camp    
router.route('/:campId/volunteers')
    .get(campController.getVolunteersForCamps);


// Route for getting all camps a volunteer is signed up for    
router.route('volunteers/:volunteerId')
    .get(campController.getCampsByVolunteer);

// Route for searching camps by name, type, or description
router.route('/search')
    .get(campController.search)
;
export default router;