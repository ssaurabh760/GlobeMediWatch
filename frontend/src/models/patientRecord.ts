import { Patient } from './patient';
import { Camp } from './camp';
import { Service } from './service';
/**
* PatientRecord interface
* Represents a patient record object
*/
export interface PatientRecord {
    /**
     * Unique identifier of the patient record
     */
    _id: string;
   
    /**
     * The patient associated with the record
     */
    patientID: Patient;
   
    /**
     * The camp associated with the record
     */
    campID: Camp;
   
    /**
     * The details of the services provided to the patient
     */
    serviceDetails: Service[];
   
    /**
     * The diagnosis of the patient
     */
    diagnosis: string;
   
    /**
     * The treatment provided to the patient
     */
    treatmentProvided: string;
   
    /**
     * The follow-up instructions for the patient (optional)
     */
    followUpInstructions?: string;
   }