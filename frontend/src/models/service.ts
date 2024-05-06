/**
* Service interface
* Represents a service object
*/
export interface Service {
  /**
   * Unique identifier of the service
   */
  _id: string;
 
  /**
   * The name of the service
   */
  serviceName: string;
 
  /**
   * The description of the service
   */
  description: string;
 
  /**
   * The entity or organization offering the service (optional)
   */
  offeredBy?: string;
 }