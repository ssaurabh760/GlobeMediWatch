import { User } from '../models/user';

/**
* Notification interface
* Represents a notification object
*/
export interface Notification {
    /**
     * Unique identifier of the notification (optional)
     */
    _id?: string;

    /**
     * The user who is the target of the notification
     */
    targetUser: User;

    /**
     * The subject of the notification
     */
    subject: string;

    /**
     * The message content of the notification
     */
    message: string;

    /**
     * The timestamp indicating when the notification was created
     */
    timeStamp: Date;
}