/**
 * Client module
 * Provides functions for interacting with the API
 */
import axios from 'axios';
import { Notification } from '../models/notification';

const API_BASE_URL = 'http://localhost:3000';

/**
 * Sends a notification to the API
 * @param {Notification} notificationData - Notification data to send
 * @returns {Promise<Notification>} Promise that resolves to the created notification
 * @throws {Error} If an error occurs while sending the notification
 */
export const sendNotification = async (notificationData: Notification) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/notifications`, notificationData);
    return response.data;
  } catch (error) {
    console.error('Failed to send notification:', error);
    throw error;
  }
};