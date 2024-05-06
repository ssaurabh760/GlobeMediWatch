/**
 * Notification service module.
 * @module notificationService
 */

import Notification from '../models/notification-model.js';
import sendEmail from '../utilities/emailHandler.js';

/**
 * Create a new notification.
 * @async
 * @function createNotification
 * @param {Object} notificationDetails - The details of the notification.
 * @param {string} userEmail - The email of the user to send the notification to.
 * @param {string} userName - The name of the user.
 * @param {string} userMessage - The message to send to the user.
 * @returns {Promise<Object>} The newly created notification.
 * @throws {Error} If an error occurs while creating the notification.
 */
export const createNotification = async (notificationDetails, userEmail, userName, userMessage) => {
  try {
    const newNotification = new Notification(notificationDetails);
    await newNotification.save();
    await sendEmail(userEmail, notificationDetails.subject, userName, userMessage);
    return newNotification;
  } catch (error) {
    throw new Error(`Error creating notification: ${error.message}`);
  }
};

/**
 * Get a notification by its ID.
 * @async
 * @function getNotificationById
 * @param {string} id - The ID of the notification to retrieve.
 * @returns {Promise<Object|null>} The notification object if found, or null if not found.
 * @throws {Error} If an error occurs while fetching the notification.
 */
export const getNotificationById = async (id) => {
  try {
    const notification = await Notification.findById(id);
    return notification;
  } catch (error) {
    throw new Error(`Error fetching notification: ${error.message}`);
  }
};

/**
 * Get all notifications.
 * @async
 * @function getAllNotifications
 * @returns {Promise<Array>} An array of all notifications.
 * @throws {Error} If an error occurs while fetching the notifications.
 */
export const getAllNotifications = async () => {
  try {
    const notifications = await Notification.find({});
    return notifications;
  } catch (error) {
    throw new Error(`Error fetching notifications: ${error.message}`);
  }
};