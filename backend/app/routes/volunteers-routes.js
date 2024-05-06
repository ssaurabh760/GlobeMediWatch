import express from 'express';
import * as volunteerController from '../controllers/volunteers-controllers.js';

const router = express.Router();
// Routes for getting all volunteers and creating a new volunteer
router.route('/')
  .get(volunteerController.getAllVolunteers)
  .post(volunteerController.createVolunteer);
// Routes for getting, updating, and deleting a specific volunteer
router.route('/:id')
  .get(volunteerController.getVolunteerById)
  .put(volunteerController.updateVolunteer)
  .delete(volunteerController.deleteVolunteer);
// Route for getting all camps a volunteer is signed up for
router.route('/:volunteerId/camps/:campId')
  .post(volunteerController.registerVolunteerForCamp)
  .delete(volunteerController.removeVolunteerFromCamp);

export default router;