
import * as volunteerService from '../services/volunteers-service.js';
import { setResponse, setError } from './response-handler.js';


// Create a new volunteer
export const createVolunteer = async (req, res) => {
    try {
        const newVolunteer = await volunteerService.createVolunteer(req.body);
        setResponse(newVolunteer, res, 201);
    } catch (error) {
        setError(error, res);
    }
}

// Retrieve all volunteers
export const getAllVolunteers = async (req, res) => {
    try {
        const volunteers = await volunteerService.getAllVolunteers();
        setResponse(volunteers, res);
    } catch (error) {
        setError(error, res);
    }
}

// Retrieve a specific volunteer by ID
export const getVolunteerById = async (req, res) => {
    try {
        const volunteer = await volunteerService.getVolunteerById(req.params.id);
        if (!volunteer) {
            setResponse({ message: 'Volunteer not found' }, res, 404);
            return;
        }
        setResponse(volunteer, res);
    } catch (error) {
        setError(error, res);
    }
}

// Update a specific volunteer by ID
export const updateVolunteer = async (req, res) => {
    try {
        const updatedVolunteer = await volunteerService.updateVolunteerById(req.params.id, req.body, { new: true });
        if (!updatedVolunteer) {
            setResponse({ message: 'Volunteer not found' }, res, 404);
            return;
        }
        setResponse(updatedVolunteer, res);
    } catch (error) {
        setError(error, res);
    }
}

// Delete a specific volunteer by ID
export const deleteVolunteer = async (req, res) => {
    try {
        console.log('Deleting volunteer');
        const deletedVolunteer = await volunteerService.deleteVolunteerById(req.params.id);
        if (!deletedVolunteer) {
            setResponse({ message: 'Volunteer not found' }, res, 404);
            return;
        }
        setResponse(deletedVolunteer, res);
    } catch (error) {
        setError(error, res);
    }
}

export const registerVolunteerForCamp = async (req, res) => {
    try {
        const { volunteerId, campId } = req.params;
        const volunteer = await volunteerService.registerVolunteerForCamp(volunteerId, campId);
        setResponse(volunteer, res);
    } catch (error) {
        console.log('Error registering volunteer for camp:', error);
        setError(error, res);
    }
};

export const removeVolunteerFromCamp = async (req, res) => {
    try {
        const { volunteerId, campId } = req.params;
        const volunteer = await volunteerService.removeVolunteerFromCamp(volunteerId, campId);
        setResponse(volunteer, res);
    } catch (error) {
        setError(error, res);
    }
};