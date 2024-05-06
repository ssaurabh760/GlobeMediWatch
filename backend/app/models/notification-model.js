/**
 * Notification model module.
 * @module notificationModel
 */

import mongoose from "mongoose";

/**
 * Notification schema definition.
 * @typedef {Object} NotificationSchema
 * @property {mongoose.Schema.Types.ObjectId} targetUser - The target user ID (ref: 'User').
 * @property {string} subject - The subject of the notification.
 * @property {string} message - The message of the notification.
 * @property {Date} timeStamp - The timestamp of the notification (default: current date, immutable).
 */
const notificationSchema = new mongoose.Schema({
  targetUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  timeStamp: {
    type: Date,
    default: Date.now,
    immutable: true
  }
});

/**
 * Notification model.
 * @type {mongoose.Model<NotificationSchema>}
 */
const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;