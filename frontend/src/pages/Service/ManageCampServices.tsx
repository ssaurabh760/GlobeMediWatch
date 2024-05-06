/**
 * ManageCampServices component
 * Allows managing services assigned to camps for a specific health organization
 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageCampServices.scss';
import { FaPlus, FaTrash } from 'react-icons/fa';
import Alert from '@mui/material/Alert';
import { Camp } from '../../models/camp';
import { Service } from '../../models/service';

interface ManageCampServicesProps {
  healthOrgId: string;
}

/**
 * ManageCampServices component
 * @param {ManageCampServicesProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const ManageCampServices: React.FC<ManageCampServicesProps> = ({ healthOrgId }) => {
  const [camps, setCamps] = useState<Camp[]>([]);
  const [selectedCamp, setSelectedCamp] = useState<Camp | null>(null);
  const [orgServices, setOrgServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchCamps();
    fetchOrgServices();
  }, []);

  /**
   * Fetches camps from the API
   */
  const fetchCamps = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/camps/organization/${healthOrgId}`);
      setCamps(response.data);
    } catch (error) {
      console.error('Error fetching camps:', error);
    }
  };

  /**
   * Fetches organization services from the API
   */
  const fetchOrgServices = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/services?offeredBy=${healthOrgId}`);
      setOrgServices(response.data);
    } catch (error) {
      console.error('Error fetching organization services:', error);
    }
  };

  /**
   * Displays an alert message
   * @param {string} message - Alert message
   * @param {'success' | 'error'} type - Alert type
   * @param {number} duration - Alert duration in milliseconds (default: 3000)
   */
  const showAlert = (message: string, type: 'success' | 'error', duration: number = 3000) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), duration);
  };

  /**
   * Handles selecting a camp
   * @param {Camp} camp - Selected camp
   */
  const handleCampSelect = (camp: Camp) => {
    setSelectedCamp(camp);
  };

  /**
   * Handles selecting a service
   * @param {Service} service - Selected service
   */
  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
  };

  /**
   * Handles assigning a service to a camp
   */
  const handleAssignService = async () => {
    if (!selectedCamp || !selectedService) {
      showAlert('Please select a camp and a service.', 'error');
      return;
    }

    try {
      // Check if the service is already present in the camp
      if (selectedCamp.servicesOffered.some((service: Service) => service._id === selectedService._id)) {
        showAlert('Service is already assigned to this camp.', 'error');
        return;
      }

      const response = await axios.put(`http://localhost:3000/camps/${selectedCamp._id}`, {
        servicesOffered: [...selectedCamp.servicesOffered, selectedService],
      });

      const updatedCamp = response.data;
      setCamps(camps.map(camp => (camp._id === updatedCamp._id ? updatedCamp : camp)));
      setSelectedCamp(updatedCamp);
      setSelectedService(null);
      showAlert('Service assigned successfully.', 'success');
    } catch (error) {
      console.error('Error assigning service:', error);
      showAlert('Failed to assign service. Please try again.', 'error');
    }
  };

  /**
   * Handles removing a service from a camp
   * @param {string} serviceId - ID of the service to remove
   */
  const handleRemoveService = async (serviceId: string) => {
    if (!selectedCamp) return;

    try {
      const response = await axios.put(`http://localhost:3000/camps/${selectedCamp._id}`, {
        servicesOffered: selectedCamp.servicesOffered.filter((service: Service) => service._id !== serviceId),
      });

      const updatedCamp = response.data;
      setCamps(camps.map(camp => (camp._id === updatedCamp._id ? updatedCamp : camp)));
      setSelectedCamp(updatedCamp);
      showAlert('Service removed successfully.', 'success');
    } catch (error) {
      console.error('Error removing service:', error);
      showAlert('Failed to remove service. Please try again.', 'error');
    }
  };

  return (
    <div className="manage-camp-services">
      <div className="alert-container">
        {alert && (
          <Alert severity={alert.type} onClose={() => setAlert(null)}>
            {alert.message}
          </Alert>
        )}
      </div>
      <h1 className="manage-camp-services-title">Manage Camp Services</h1>
      <div className="content">
        <div className="camp-selection">
          <h2>Select Camp</h2>
          <ul className="camp-list">
            {camps.map((camp, index) => (
              <li
                key={camp._id}
                className={`camp-item ${selectedCamp?._id === camp._id ? 'selected' : ''}`}
                onClick={() => handleCampSelect(camp)}
              >
                {index + 1}. {camp.campName}
              </li>
            ))}
          </ul>
        </div>
        {selectedCamp && (
          <div className="service-assignment">
            <h2>Assign Service</h2>
            <select
              className="service-select"
              value={selectedService?._id || ''}
              onChange={e => handleServiceSelect(orgServices.find(service => service._id === e.target.value)!)}
            >
              <option value="">Select a service</option>
              {orgServices.map(service => (
                <option key={service._id} value={service._id}>
                  {service.serviceName}
                </option>
              ))}
            </select>
            <button className="assign-button" onClick={handleAssignService} disabled={!selectedService}>
              <FaPlus /> Assign
            </button>
          </div>
        )}
      </div>
      {selectedCamp && (
        <div className="assigned-services">
          <h2>Assigned Services</h2>
          <ul className="service-list">
            {selectedCamp.servicesOffered.map((service, index) => (
              <li key={service._id} className="service-item">
                <div className="service-info">
                  <p><strong>Service #{index + 1}</strong></p>
                  <p><strong>Service ID:</strong> {service._id}</p>
                  <p><strong>Service Name:</strong> <strong>{service.serviceName}</strong></p>
                  <p><strong>Description:</strong> {service.description}</p>
                </div>
                <div className="service-actions">
                  <button className="remove-button" onClick={() => handleRemoveService(service._id)}>
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ManageCampServices;