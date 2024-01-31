import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true });
        return response;
    }
    catch (error) {
        console.error('Error during login:', error);
        if (error.response) {
            return error.response;
        }
        else {
            return error;
        }
    }
};

export const register = async (name: string, email: string, password: string) => {
    const response = await axios.post(`${API_URL}/register`, { name, email, password });
    return response;
    };

export const isAuthenticated = async () => {
    const response = await axios.get(`${API_URL}/user`, { withCredentials: true });
    return response.data;
};

export const logout = async () => {
    const response = await axios.post(`${API_URL}/logout`, null, { withCredentials: true });
    return response.data;
};

export const getTasks = async () => {
    const response = await axios.get(`${API_URL}/tasks`, { withCredentials: true });
    return response.data;
}

export const getTask = async (id: string) => {
    const response = await axios.get(`${API_URL}/tasks/${id}`, { withCredentials: true });
    return response.data;
}

export const createTask = async (task: TaskProps) => {
    const response = await axios.post(`${API_URL}/tasks`, task, { withCredentials: true });
    return response.data;
}

export const updateTask = async (id: string, task: TaskProps) => {
    const response = await axios.put(`${API_URL}/tasks/${id}`, task, { withCredentials: true });
    return response.data;
}

export const deleteTask = async (id: string) => {
    const response = await axios.delete(`${API_URL}/tasks/${id}` , { withCredentials: true });
    return response.data;
}

export const markTaskAsCompleted = async (id: string) => {
    const response = await axios.put(`${API_URL}/tasks/mark-completed/${id}`,null, { withCredentials: true });
    return response.data;
}

// get completed tasks
export const getCompletedTasks = async () => {
    const response = await axios.get(`${API_URL}/tasks/completed` , { withCredentials: true });
    return response.data;
}

// get incompleted tasks
export const getIncompletedTasks = async () => {
    const response = await axios.get(`${API_URL}/tasks/incompleted`, { withCredentials: true });
    return response.data;
}

// get number of completed tasks
export const getNumberOfCompletedTasks = async () => {
    const response = await axios.get(`${API_URL}/tasks/completed/number`, { withCredentials: true });
    return response.data;
}

//get percentage of completed tasks
export const getPercentageOfCompletedTasks = async () => {
    const response = await axios.get(`${API_URL}/tasks/completed/percentage`, { withCredentials: true });
    return response.data;
}

// get completed tasks between two dates
export const getCompletedTasksBetweenDates = async (startDate: string, endDate: string) => {
    const response = await axios.get(`${API_URL}/tasks/completed/between/${startDate}/${endDate}`, { withCredentials: true });
    return response.data;
}