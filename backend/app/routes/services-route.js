import express from 'express';
import * as serviceController from '../controllers/services-controller.js';
//Express router for service routes
const router = express.Router();

router.route('/')
    .get(serviceController.getAllServices)
    .post(serviceController.createService);

router.route('/:id')
    .get(serviceController.getServiceById)
    .put(serviceController.updateService)
    .delete(serviceController.deleteService);

export default router;
