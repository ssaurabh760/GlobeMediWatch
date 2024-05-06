import React, { useState, useEffect } from 'react';
import './ViewHealthCampsByHealthOrgs.scss'
import { Camp } from './../../models/camp';
import * as client from './../../services/client';
import { sendNotification } from './../../services/CreateNotificationService';
import { Notification } from './../../models/notification';
import { format } from 'date-fns';


// Define the ViewCampByHealthOrgs component
interface ViewCampByHealthOrgsProps {
    offeredBy: string;
}
// Define the the camps by Health Organisation
const ViewCampByHealthOrgs: React.FC<ViewCampByHealthOrgsProps> = ({ offeredBy }) => {
    const [camps, setCamps] = useState<Camp[]>([]);
    const [selectedCamp, setSelectedCamp] = useState<Camp | null>(null);
    const [notifyVolunteers, setNotifyVolunteers] = useState(false);



    useEffect(() => {
        client.getCampsByOfferedBy(offeredBy)
            .then(setCamps)
            .catch(error => {
                console.error('Failed to fetch camps', error);
            });
    }, [offeredBy]);


    // const ViewCampByHealthOrgs: React.FC = () => {
    //     const [camps, setCamps] = useState<Camp[]>([]);
    //     const [selectedCamp, setSelectedCamp] = useState<Camp | null>(null);

    // useEffect(() => {
    //     // Simulate fetching data from API with dummy data
    //     setTimeout(() => {
    //         const dummyCamps: Camp[] = [
    //             {
    //                 _id: '1',
    //                 campName: 'Eye Checkup Camp',
    //                 campType: 'Eye Health',
    //                 date: '2024-04-25',
    //                 description: 'Free eye checkups and glasses distribution',
    //                 address: '789 Park Avenue, New York, NY',
    //                 offeredBy: '12345',
    //                 volunteers: ['volunteer1', 'volunteer2'],
    //                 servicesOffered: [
    //                     {   
    //                         _id: '1',
    //                         serviceName: 'Blood Testing',
    //                         description: 'Blood tests for various health indicators'

    //                     },  
    //                     {   _id: '2',
    //                         serviceName: 'Vaccination',
    //                         description: 'Flu and tetanus vaccinations'
    //                     }
    //                 ]
    //             },
    //             {
    //                 _id: '2',
    //                 campName: 'Dental Camp',
    //                 campType: 'Dental Care',
    //                 date: '2024-05-15',
    //                 description: 'Dental examinations and basic treatments for free',
    //                 address: '456 Elm Street, Los Angeles, CA',
    //                 offeredBy: '12345',
    //                 volunteers: ['volunteer3', 'volunteer4'],
    //                 servicesOffered: [
    //                     {   
    //                         _id: '1',
    //                         serviceName: 'Blood Testing',
    //                         description: 'Blood tests for various health indicators'

    //                     },  
    //                     {   _id: '2',
    //                         serviceName: 'Vaccination',
    //                         description: 'Flu and tetanus vaccinations'
    //                     }
    //                 ]
    //             },
    //             {
    //                 _id: '3',
    //                 campName: 'General Health Screening',
    //                 campType: 'General Health',
    //                 date: '2024-06-10',
    //                 description: 'General health checkups including blood tests and vaccinations',
    //                 address: '123 Main Street, Chicago, IL',
    //                 offeredBy: '12345',
    //                 volunteers: ['volunteer5', 'volunteer6'],
    //                 servicesOffered: [
    //                     {   
    //                         _id: '1',
    //                         serviceName: 'Blood Testing',
    //                         description: 'Blood tests for various health indicators'

    //                     },  
    //                     {   _id: '2',
    //                         serviceName: 'Vaccination',
    //                         description: 'Flu and tetanus vaccinations'
    //                     }
    //                 ]
    //             }
    //         ];
    //         setCamps(dummyCamps);
    //     }, 1000); // simulate network delay
    // }, []);

    const handleCardClick = (camp: Camp) => {
        setSelectedCamp({
            ...camp,
            date: getLocalDateISOString(camp.date) // Format date for input[type="date"]
        });
    };

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Updated Camp:', selectedCamp);
        // Add code here to save the updated camp
    };

    const getLocalDateISOString = (dateString: string | number | Date) => {
        const date = new Date(dateString);
        const timeZoneOffset = date.getTimezoneOffset() * 60000; // offset in milliseconds
        const localISOTime = new Date(date.getTime() - timeZoneOffset).toISOString();
        return localISOTime.split('T')[0];
    }
    const handleSave = () => {
        if (!selectedCamp) return;
        const originalCamp = camps.find(camp => camp._id === selectedCamp._id);
        // Adjust the date to send to the backend
        const adjustedDate = new Date(selectedCamp.date + 'T00:00:00');
        adjustedDate.setDate(adjustedDate.getDate() + 1);
        const isoDate = adjustedDate.toISOString().split('T')[0];

        client.updateCamp(selectedCamp._id, {
            ...selectedCamp,
            date: isoDate // Use the adjusted date
        }).then(() => {
            // Update the camps array with the updated camp information
            const updatedCamps = camps.map(camp => {
                if (camp._id === selectedCamp._id) {
                    return {
                        ...camp,
                        campName: selectedCamp.campName,
                        date: isoDate,
                        description: selectedCamp.description,
                        address: selectedCamp.address
                    };
                }
                return camp;
            });
            setCamps(updatedCamps); // Set the updated camps array to state
            alert('Camp updated successfully');

            // Check if any fields have been updated
            const updatedFields = [];

            if (originalCamp) {
                if (originalCamp.campName !== selectedCamp.campName) {
                    updatedFields.push(`Camp Name: ${originalCamp.campName} -> ${selectedCamp.campName}\n`);
                }

                if (originalCamp.date.split('T')[0] !== isoDate) {
                    const formattedOriginalDate = format(new Date(originalCamp.date), 'MMMM d, yyyy');
                    const formattedSelectedDate = format(new Date(isoDate), 'MMMM d, yyyy');
                    updatedFields.push(`Date: ${formattedOriginalDate} -> ${formattedSelectedDate}\n`);
                }
                if (originalCamp.description !== selectedCamp.description) {
                    updatedFields.push(`Description:\n- ${originalCamp.description}\n-> ${selectedCamp.description}\n`);
                }
                if (originalCamp.address !== selectedCamp.address) {
                    updatedFields.push(`Address:\n- ${originalCamp.address}\n- ${selectedCamp.address}\n`);
                }
            }

            // Send notifications only if any fields are updated and the checkbox is checked
            if (updatedFields.length > 0 && notifyVolunteers) {
                const updatedFieldsMessage = updatedFields.join('\n\n');

                selectedCamp.volunteers.forEach(async (volunteer) => {
                    try {
                        const notificationData: Notification = {
                            targetUser: volunteer,
                            subject: 'Health Camp Update',
                            message: `The health camp "${selectedCamp.campName}" has been updated:\n\n${updatedFieldsMessage}`,
                            timeStamp: new Date(),
                        };

                        await sendNotification(notificationData);
                    } catch (error) {
                        console.error('Failed to send notification:', error);
                    }
                });
            }

        }).catch(error => {
            console.error('Failed to update camp:', error);
        });
    };


    const handleDelete = () => {
        if (!selectedCamp) return;

        client.deleteCamp(selectedCamp._id)
            .then(() => {
                alert('Camp deleted successfully');
                console.log('Camp deleted successfully');
                setSelectedCamp(null);
                setCamps(camps.filter(camp => camp._id !== selectedCamp._id));
            })
            .catch(error => {
                console.error('Failed to delete camp:', error);
            });
    }

    const handleChange = (field: keyof Camp, value: any) => {
        setSelectedCamp(prev => ({
            ...prev,
            [field]: value
        }) as Camp);
    };

    if (camps.length === 0) {
        return (
            <div className="healthCamp-no-camps">
                <h2>No camps available.</h2>
            </div>
        );
    }


    return (
        <div className="healthCamp-container" >
            <div className="healthCamp-list" data-aos="fade-up">
                {camps.map(camp => (
                    <div key={camp._id} className="healthCamp-card" onClick={() => handleCardClick(camp)}>
                        <h3>{camp.campName}</h3>
                        <p>{new Date(camp.date).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
            <div className="healthCamp-details">
                {selectedCamp && (
                    <form>
                        <h2>Edit Camp Details</h2>
                        <input
                            type="text"
                            value={selectedCamp.campName}
                            onChange={(e) => setSelectedCamp({ ...selectedCamp, campName: e.target.value })}
                        />
                        <input
                            type="date"
                            value={selectedCamp.date}
                            onChange={(e) => setSelectedCamp({ ...selectedCamp, date: e.target.value })}
                        />
                        <textarea
                            value={selectedCamp.description}
                            onChange={(e) => setSelectedCamp({ ...selectedCamp, description: e.target.value })}
                        />
                        <input
                            type="text"
                            value={selectedCamp.address}
                            onChange={(e) => setSelectedCamp({ ...selectedCamp, address: e.target.value })}
                        />
                        <div className="custom-checkbox">
                            <input
                                type="checkbox"
                                id="notifyVolunteers"
                                checked={notifyVolunteers}
                                onChange={(e) => setNotifyVolunteers(e.target.checked)}
                            />
                            <label htmlFor="notifyVolunteers">Notify Volunteers</label>
                        </div>
                        <button type="button" onClick={(handleSave)} className="healthCamp-save-button">Save Changes</button>
                        <button type="button" onClick={(handleDelete)} className="healthCamp-delete-button">Delete Camp</button>

                    </form>
                )}
            </div>
        </div>
    );
};

export default ViewCampByHealthOrgs;