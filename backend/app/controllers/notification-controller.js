/**
 * Notification controller module.
 * @module notificationController
 */

import * as notificationService from '../services/notification-service.js';
import { setResponse, setError } from './response-handler.js';

/**
 * Create a new notification.
 * @async
 * @function createNotification
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
export const createNotification = async (req, res) => {
  try {
    const notificationDetails = req.body;
    const userEmail = req.body.targetUser.email;
    const userName = req.body.targetUser.firstname + ' ' + req.body.targetUser.lastname;
    const userMessage = req.body.message;

    const newNotification = await notificationService.createNotification(
      notificationDetails,
      userEmail,
      userName,
      userMessage
    );

    setResponse(newNotification, res, 201);
  } catch (error) {
    console.log(error);
    setError(error, res);
  }
};

/**
 * Get a notification by its ID.
 * @async
 * @function getNotificationById
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
export const getNotificationById = async (req, res) => {
  try {
    const notificationId = req.params._id;
    const notification = await notificationService.getNotificationById(notificationId);

    if (!notification) {
      setResponse({ message: 'Notification not found' }, res, 404);
      return;
    }

    setResponse(notification, res);
  } catch (error) {
    setError(error, res);
  }
};

/**
 * Get all notifications.
 * @async
 * @function getAllNotifications
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await notificationService.getAllNotifications();
    setResponse(notifications, res);
  } catch (error) {
    setError(error, res);
  }
};
