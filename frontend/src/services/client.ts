import axios from "axios";

const API_URL = 'http://localhost:3000';


interface SignupParams {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
}


const axiosInstance = axios.create({
    baseURL: API_URL,
});


export const setAuthToken = (token) => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
};

// Passing the token to the axios instance for creating a volunteer
export const createVolunteer = async (formData: any) => {
    try {
        const response = await axios.post(`${API_URL}/volunteer_forms`, formData);
        return response.data;
    } catch (error) {
        console.error('Error creating volunteer:', error);
    }
}
// Creating a health camp
export const createHealthCamp = async (campformData: any) => {
    try {
        const response = await axios.post(`${API_URL}/camps`, campformData);
        return response.data;
    } catch (error) {
        console.error('Error creating health camp:', error);
    }
}

// Fetching all the camps
export const getAllCamps = async () => {
    try {
        const response = await axios.get(`${API_URL}/camps`);
        return response.data;
    } catch (error) {
        console.error('Error fetching camps:', error);
    }
}


export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, { email, password });
        localStorage.setItem('token', response.data.token);
        setAuthToken(response.data.token);
        return response.data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export const signup = async ({ firstname, lastname, email, password, role }) => {
    try {
        const response = await axios.post(`${API_URL}/users/signup`, {
            firstname,
            lastname,
            email,
            password,
            role
        });
        return response.data;
    } catch (error) {
        console.error('Error during signup:', error);ƒ
        throw error;
    }
};

export const updateUserById = async (userId: string, updateData: any) => {
    try {
        const response = await axiosInstance.patch(`/users/${userId}`, updateData);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const deleteUserById = async (userId: string) => {
    try {
        const response = await axiosInstance.delete(`/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};



export const createHealthOrganizationProfile = async (profileData) => {
    try {
        const response = await axiosInstance.post('/healthorgs', profileData);
        return response.data;
    } catch (error) {
        console.error('Error creating health organization profile:', error);
        throw error;
    }
};
// Fetching the camps by a particular health organization
export const getCampsByOfferedBy = async (offeredBy: any) => {
    try {
        const response = await axiosInstance.get(`/camps/organization/${offeredBy}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching camps:', error);
        throw error;
    }
};

// Fetching the volunteers by a particular camp

export const getVolunteersByCamp = async (campId: any) => {
    try {
        const response = await axiosInstance.get(`/camps/${campId}/volunteers`);
        return response.data;
    } catch (error) {
        console.error('Error fetching volunteers:', error);
        throw error;
    }
};

// Fetching the camps by a particular volunteer
export const getCampsByVolunteer = async (volunteerId: any) => {
    try {
        const response = await axiosInstance.get(`/camps/volunteers/${volunteerId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching camps:', error);
        throw error;
    }
}

export const getCurrentUser = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');  // Early throw if no token exists
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axiosInstance.get('/users/me', config);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch user:", error);
        throw error;
    }
};
//Updated Camp by a health organisation

export const updateCamp = async (campId: any, campData: any) => {
    try {
        console.log('campData:', campData);
        const response = await axiosInstance.put(`/camps/${campId}`, campData);
        return response.data;
    } catch (error) {
        console.error('Error updating camp:', error);
        throw error;
    }
}

// Deleting a camp by a health organisation
export const deleteCamp = async (campId: any) => {
    try {
        const response = await axiosInstance.delete(`/camps/${campId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting camp:', error);
        throw error;
    }
}

// Registering a volunteer for a camp
export const registerVolunteerForCamp = async (campId: any, volunteerId: any) => {
    try {
        const response = await axiosInstance.post(`/volunteers/${volunteerId}/camps/${campId}`);
        return response.data;
    } catch (error) {
        console.error('Error registering volunteer for camp:', error);
        throw error;
    }
}

// Fetching a camp by its id
export const getCampById = async (campId: any) => {
    try {
        const response = await axiosInstance.get(`/camps/${campId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching camp:', error);
        throw error;
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        const response = await axios.get(`${API_URL}/users/profile/email/${email}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw error;
    }
};

export const getVolunteerById = async (volunteerId: string) => {
    try {
        const response = await axiosInstance.get(`/volunteers/${volunteerId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching volunteer:', error);
        throw error;
    }
};

export const removeVolunteerFromCamp = async (volunteerId: string, campId: string) => {
    try {
        const response = await axiosInstance.delete(`/volunteers/${volunteerId}/camps/${campId}`);
        return response.data;
    } catch (error) {
        console.error('Error removing volunteer from camp:', error);
        throw error;
    }
};

