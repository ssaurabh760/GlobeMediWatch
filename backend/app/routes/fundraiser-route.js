import express from 'express';
import * as fundraiserController from '../controllers/fundraiser-controller.js';

/**
 * Express router for handling fundraiser routes.
 * @type {import('express').Router}
 */
const router = express.Router();

/**
 * Route for getting all fundraisers.
 * @name GET /api/fundraisers
 * @function
 * @memberof module:routes/fundraiser-route
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @returns {void}
 */
router.route('/')
    .get(fundraiserController.getAllFundraisers)
    .post(fundraiserController.createFundraiser);

/**
 * Route for getting a fundraiser by ID, updating a fundraiser, or deleting a fundraiser.
 * @name GET|PUT|DELETE /api/fundraisers/:id
 * @function
 * @memberof module:routes/fundraiser-route
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @returns {void}
 */
router.route('/:id')
    .get(fundraiserController.getFundraiserById)
    .put(fundraiserController.updateFundraiser)
    .delete(fundraiserController.deleteFundraiser);

/**
 * Route for donating to a fundraiser.
 * @name POST /api/fundraisers/:id/donate
 * @function
 * @memberof module:routes/fundraiser-route
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @returns {void}
 */
router.route('/:id/donate')
    .post(fundraiserController.donateToFundraiser);

/**
 * Route for getting fundraisers by health organization ID.
 * @name GET /api/fundraisers/organization/:healthOrgId
 * @function
 * @memberof module:routes/fundraiser-route
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @returns {void}
 */
router.route('/organization/:healthOrgId')
    .get(fundraiserController.getFundraisersByCampId);

export default router;
