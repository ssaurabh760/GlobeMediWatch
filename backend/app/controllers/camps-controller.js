import * as campService from '../services/camps-service.js';
import { setResponse, setError } from './response-handler.js';

// Create a new camp
export const createCamp = async (request, response) => {
    try {
        const { campName, campType, date, description, address, offeredBy, volunteers } = request.body;
        const newCamp = await campService.createCamp(campName,campType, date, description, address, offeredBy, volunteers);
        setResponse(newCamp, response);
    } catch(error) {
        setError(error, response);
    }
}

// Retrieve a specific camp by ID
export const getCampById = async (request, response) => {
    try {
        const { id } = request.params;
        const camp = await campService.getCampById(id);
        setResponse(camp, response);
    } catch(error) {
        setError(error, response);
    }
}
// List all camps
export const getAllCamps = async (request, response) => {
    try {
        const camps = await campService.getAllCamps();
        setResponse(camps, response);
    } catch(error) {
        setError(error, response);
    }
}
// Update a specific camp by ID
export const updateCamp = async (request, response) => {
    try {
        const { id } = request.params;
        const updates = request.body;
        const updatedCamp = await campService.updateCampById(id, updates);
        setResponse(updatedCamp, response);
    } catch(error) {
        setError(error, response);
    }
}

export const deleteCamp = async (request, response) => {
    try {
        const { id } = request.params;
        await campService.deleteCampById(id);
        setResponse({ message: 'Camp deleted successfully' }, response);
    } catch(error) {
        setError(error, response);
    }
}
// Retrieve a specific camp by date
export const getCampByDate = async (request, response) => {
    try {
        const { date } = request.params;
        const camp = await campService.getCampByDate(date);
        setResponse(camp, response);
    } catch(error) {
        setError(error, response);
    }
}

// Retrieve a specific camp by type
export const addVolunteerToCamp = async (request, response) => {
    try {
        const { campId, volunteerId } = request.params;
        const camp = await campService.addVolunteerToCamp(campId, volunteerId);
        setResponse(camp, response);
    } catch(error) {
        setError(error, response);
    }
}
// Retrieve a specific camp by type
export const getCampsByOfferedBy = async (request, response) => {
    try {
      const { healthOrgId } = request.params;
      const camps = await campService.getCampsByOfferedBy(healthOrgId);
      setResponse(camps, response);
    } catch (error) {
      setError(error, response);
    }
};

export const getVolunteersForCamps = async (request, response) => {
    try {
        const { campId } = request.params;
        const camps = await campService.getVolunteersForCamps(campId);
        setResponse(camps, response);
    } catch(error) {
        setError(error, response);
    }
}

export const getCampsByVolunteer = async (request, response) => {
    try {
        const { volunteerId } = request.params;
        const camps = await campService.getCampsByVolunteer(volunteerId);
        setResponse(camps, response);
    } catch(error) {
        setError(error, response);
    }
}

export const search = async (request, response) => {
    try {
        const { keywords } = request.query;
        console.log(request.query);
        const filteredCamps = await campService.search(keywords);
        response.status(200).json(filteredCamps);
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }

}



