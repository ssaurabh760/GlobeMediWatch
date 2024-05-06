/**
 * Route initialization module.
 * @module routeInitializer
 */

import FundraiserRouter from './fundraiser-route.js';
import ServiceRouter from './services-route.js';
import VolunteerRouter from './volunteers-routes.js';
import CampRouter from './camps-routes.js';
import PatientRouter from './patients-routes.js';
import PatientRecordRouter from './patientRecord-routes.js';
import NotificationRouter from './notification-routes.js';
import UserRouter from './user-routes.js';
import HealthOrgRouter from './health-org-routes.js';
import PaymentRouter from './payment-route.js';

/**
 * Initialize the application routes.
 * @function initializeRoutes
 * @param {Object} app - The Express application instance.
 * @returns {void}
 */
const initializeRoutes = (app) => {
  /**
   * Fundraiser routes.
   * @name FundraiserRoutes
   * @path {POST} /fundraisers
   */
  app.use('/fundraisers', FundraiserRouter);

  /**
   * Service routes.
   * @name ServiceRoutes
   * @path {POST} /services
   */
  app.use('/services', ServiceRouter);

  /**
   * Volunteer routes.
   * @name VolunteerRoutes
   * @path {POST} /volunteers
   */
  app.use('/volunteers', VolunteerRouter);

  /**
   * Camp routes.
   * @name CampRoutes
   * @path {POST} /camps
   */
  app.use('/camps', CampRouter);

  /**
   * Patient routes.
   * @name PatientRoutes
   * @path {POST} /patients
   */
  app.use('/patients', PatientRouter);

  /**
   * Patient record routes.
   * @name PatientRecordRoutes
   * @path {POST} /patientRecords
   */
  app.use('/patientRecords', PatientRecordRouter);

  /**
   * Notification routes.
   * @name NotificationRoutes
   * @path {POST} /notifications
   */
  app.use('/notifications', NotificationRouter);

  /**
   * User routes.
   * @name UserRoutes
   * @path {POST} /users
   */
  app.use('/users', UserRouter);

  /**
   * Health organization routes.
   * @name HealthOrgRoutes
   * @path {POST} /healthorgs
   */
  app.use('/healthorgs', HealthOrgRouter);

  /**
   * Payment routes.
   * @name PaymentRoutes
   * @path {POST} /payments
   */
  app.use('', PaymentRouter);
};

export default initializeRoutes;