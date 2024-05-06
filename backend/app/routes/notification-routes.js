/**
 * Notification routes module.
 * @module notificationRoutes
 */

import express from 'express';
import * as notificationController from '../controllers/notification-controller.js';

/**
 * Express router for notification routes.
 * @type {express.Router}
 */
const router = express.Router();

/**
 * Route for creating a new notification and retrieving all notifications.
 * @name CreateNotificationAndGetAllNotifications
 * @route {POST} /
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
router.route('/')
  /**
   * Endpoint to create a new notification.
   * @name CreateNotification
   * @function
   * @inner
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {void}
   */
  .post(notificationController.createNotification)
  
  /**
   * Endpoint to get all notifications.
   * @name GetAllNotifications
   * @function
   * @inner
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {void}
   */
  .get(notificationController.getAllNotifications);

/**
 * Route for retrieving a specific notification by ID.
 * @name GetNotificationById
 * @route {GET} /:_id
 * @function
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
router.route('/:_id')
  .get(notificationController.getNotificationById);

export default router;