/**
 * PatientFormPopup component
 * Renders a form for adding a new patient and allows selecting attended camps
 */
import { useState, useEffect } from "react";
import { Patient } from "../../models/patient";
import { Camp } from "../../models/camp";
import { getCampsByOfferedBy } from "../../services/client";

interface PatientFormPopupProps {
    onClose: () => void;
    onSave: (patient: Patient) => void;
    healthOrgId: string;
}

/**
 * PatientFormPopup component
 * @param {PatientFormPopupProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const PatientFormPopup: React.FC<PatientFormPopupProps> = ({ onClose, onSave, healthOrgId }) => {
    const [newPatient, setNewPatient] = useState<Patient>({
        firstName: '',
        lastName: '',
        campsAttended: [],
        medicalHistory: '',
        currentConditions: '',
    });
    const [camps, setCamps] = useState<Camp[]>([]);

    useEffect(() => {
        fetchCamps();
    }, []);

    /**
     * Fetches the camps offered by the health organization
     */
    const fetchCamps = async () => {
        try {
            const fetchedCamps = await getCampsByOfferedBy(healthOrgId);
            setCamps(fetchedCamps);
        } catch (error) {
            console.error("Error fetching camps:", error);
        }
    };

    /**
     * Handles input change events for form fields
     * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
     */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewPatient({ ...newPatient, [name]: value });
    };

    /**
     * Handles change events for the camps attended select field
     * @param {React.ChangeEvent<HTMLSelectElement>} e - Select change event
     */
    const handleCampsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCampIds = Array.from(e.target.selectedOptions, (option) => option.value);
        const selectedCamps = camps.filter((camp) => selectedCampIds.includes(camp._id));
        setNewPatient({ ...newPatient, campsAttended: selectedCamps });
    };

    /**
     * Handles saving the new patient
     */
    const handleSave = async () => {
        try {
            onSave(newPatient);
            onClose();
        } catch (error) {
            console.error("Error saving patient:", error);
        }
    };

    return (
        <div className="patient-form-popup">
            <div className="patient-form-content">
                <h2>Add New Patient</h2>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={newPatient.firstName}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={newPatient.lastName}
                    onChange={handleInputChange}
                    required
                />
                <select
                    name="campsAttended"
                    multiple
                    value={newPatient.campsAttended.map((camp) => camp._id)}
                    onChange={handleCampsChange}
                >
                    {camps.map((camp) => (
                        <option key={camp._id} value={camp._id}>{camp.campName}</option>
                    ))}
                </select>
                <input
                    type="text"
                    name="medicalHistory"
                    placeholder="Medical History"
                    value={newPatient.medicalHistory}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="currentConditions"
                    placeholder="Current Conditions"
                    value={newPatient.currentConditions}
                    onChange={handleInputChange}
                />
                <div className="form-actions">
                    <button className="save-button" onClick={handleSave}>Save</button>
                    <button className="cancel-button" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default PatientFormPopup;