/**
 * ManageServices component
 * Allows managing services for a specific health organization
 */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Service } from '../../models/service';
import './ManageServices.scss';
import { FaPlus, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import Alert from '@mui/material/Alert';
import {
  setServices,
  setNewServiceName,
  setNewServiceDescription,
  setEditingService,
  setAlert,
  setDeletedServiceId,
  setNewServiceId,
  getAllServices,
  getNewServiceName,
  getNewServiceDescription,
  getEditingService,
  getAlert,
  getDeletedServiceId,
  getNewServiceId,
} from '../../store/slice/servicesSlice';

interface CampServicesProps {
  healthOrgId: string;
}

/**
 * ManageServices component
 * @param {CampServicesProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const ManageServices: React.FC<CampServicesProps> = ({ healthOrgId }) => {
  const dispatch = useDispatch();
  const services = useSelector(getAllServices());
  const newServiceName = useSelector(getNewServiceName());
  const newServiceDescription = useSelector(getNewServiceDescription());
  const editingService = useSelector(getEditingService());
  const alert = useSelector(getAlert());
  const deletedServiceId = useSelector(getDeletedServiceId());
  const newServiceId = useSelector(getNewServiceId());

  useEffect(() => {
    fetchServices();
  }, []);

  /**
   * Displays an alert message
   * @param {string} message - Alert message
   * @param {'success' | 'error'} type - Alert type
   * @param {number} duration - Alert duration in milliseconds (default: 3000)
   */
  const showAlert = (message: string, type: 'success' | 'error', duration: number = 3000) => {
    dispatch(setAlert({ message, type }));
    setTimeout(() => dispatch(setAlert(null)), duration);
  };

  /**
   * Fetches services from the API
   */
  const fetchServices = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/services?offeredBy=${healthOrgId}`);
      if (Array.isArray(response.data)) {
        dispatch(setServices(response.data));
      } else {
        console.error('Invalid response data format. Expected an array.');
        dispatch(setServices([]));
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      dispatch(setServices([]));
    }
  };

  /**
   * Handles adding a new service
   */
  const handleAddService = async () => {
    if (newServiceName.trim() === '' || newServiceDescription.trim() === '') {
      showAlert('Please fill in all fields.', 'error');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/services', {
        serviceName: newServiceName.trim(),
        description: newServiceDescription.trim(),
        offeredBy: healthOrgId,
      });
      dispatch(setNewServiceId(response.data._id));
      dispatch(setServices([response.data, ...services]));
      clearForm();
      showAlert('Service added successfully.', 'success');
    } catch (error) {
      console.error('Error adding service:', error);
      showAlert('Failed to add service. Please try again.', 'error');
    }
  };

  /**
   * Handles editing a service
   * @param {Service} service - Service to edit
   */
  const handleEditService = (service: Service) => {
    dispatch(setEditingService(service));
    dispatch(setNewServiceName(service.serviceName));
    dispatch(setNewServiceDescription(service.description));
  };

  /**
   * Handles updating a service
   */
  const handleUpdateService = async () => {
    if (!editingService || newServiceName.trim() === '' || newServiceDescription.trim() === '') {
      showAlert('Please fill in all fields.', 'error');
      return;
    }
    try {
      const response = await axios.put(`http://localhost:3000/services/${editingService._id}`, {
        serviceName: newServiceName.trim(),
        description: newServiceDescription.trim(),
      });
      dispatch(setServices(services.map((service) => (service._id === editingService._id ? response.data : service))));
      showAlert('Service updated successfully.', 'success');
      clearForm();
    } catch (error) {
      console.error('Error updating service:', error);
      showAlert('Failed to update service. Please try again.', 'error');
    }
  };

  /**
   * Handles deleting a service
   * @param {string} serviceId - ID of the service to delete
   */
  const handleDeleteService = async (serviceId: string) => {
    try {
      await axios.delete(`http://localhost:3000/services/${serviceId}`);
      dispatch(setDeletedServiceId(serviceId));
      setTimeout(() => {
        dispatch(setServices(services.filter((service) => service._id !== serviceId)));
        dispatch(setDeletedServiceId(null));
      }, 500); // Adjust the delay to match the animation duration
      showAlert('Service deleted successfully.', 'success');
      if (editingService && editingService._id === serviceId) {
        clearForm();
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      showAlert('Failed to delete service. Please try again.', 'error');
    }
  };

  /**
   * Clears the service form
   */
  const clearForm = () => {
    dispatch(setEditingService(null));
    dispatch(setNewServiceName(''));
    dispatch(setNewServiceDescription(''));
  };

  return (
    <div className="camp-services" data-aos="fade-up">
      <div className="alert-container">
        {alert && (
          <Alert severity={alert.type} onClose={() => setAlert(null)}>
            {alert.message}
          </Alert>
        )}
      </div>
      <h1 className="title">Manage Services</h1>
      <div className="content">
        <div className="add-service">
          <h2>{editingService ? 'Edit Service' : 'Add New Service'}</h2>
          <input
            type="text"
            placeholder="Service Name"
            value={newServiceName}
            onChange={(e) => dispatch(setNewServiceName(e.target.value))}
            required
          />
          <textarea
            placeholder="Service Description"
            value={newServiceDescription}
            onChange={(e) => dispatch(setNewServiceDescription(e.target.value))}
            required
          ></textarea>
          <div className="form-actions">
            {editingService ? (
              <>
                <button className="update-button" onClick={handleUpdateService}>
                  <FaEdit /> Update
                </button>
                <button className="clear-button" onClick={clearForm}>
                  <FaTimes /> Cancel
                </button>
              </>
            ) : (
              <>
                <button className="add-button" onClick={handleAddService}>
                  <FaPlus /> Add
                </button>
                <button className="clear-button" onClick={clearForm}>
                  <FaTimes /> Clear
                </button>
              </>
            )}
          </div>
        </div>
        <div className="services">
          <h2>Existing Services</h2>
          <ul className={`service-list ${services.length > 5 ? 'scrollable' : ''}`}>
            {services.map((service) => (
              <li
                key={service._id}
                className={`service-item ${service._id === newServiceId ? 'fade-in' : ''
                  } ${service._id === deletedServiceId ? 'fade-out' : ''}`}
              >
                <div className="service-info">
                  <h3>{service.serviceName}</h3>
                  <p>{service.description}</p>
                </div>
                <div className="service-actions">
                  <button className="edit-button" onClick={() => handleEditService(service)}>
                    <FaEdit />
                  </button>
                  <button className="delete-button" onClick={() => handleDeleteService(service._id)}>
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManageServices;