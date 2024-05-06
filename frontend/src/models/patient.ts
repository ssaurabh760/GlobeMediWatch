import { Camp } from './camp';
/**
* Patient interface
* Represents a patient object
*/
export interface Patient {
    /**
     * Unique identifier of the patient (optional)
     */
    _id?: string;
   
    /**
     * The first name of the patient
     */
    firstName: string;
   
    /**
     * The last name of the patient
     */
    lastName: string;
   
    /**
     * The medical history of the patient
     */
    medicalHistory: string;
   
    /**
     * The current medical conditions of the patient
     */
    currentConditions: string;
   
    /**
     * The camps attended by the patient
     */
    campsAttended: Camp[];
   }