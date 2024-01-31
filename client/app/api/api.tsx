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

// get number of completed tasks and number of incompleted tasks and total number of tasks
export const getNumberOfTasks = async () => {
    const response = await axios.get(`${API_URL}/tasks/completed/number`, { withCredentials: true });
    return response.data;
}


// get completed tasks between two dates
export const getCompletedTasksBetweenDates = async (startDate: string, endDate: string) => {
    const response = await axios.get(`${API_URL}/tasks/completed/${startDate}/${endDate}`, { withCredentials: true });
    return response.data.completedTasks;
}

//get the number of completed tasks  and incompleted tasks and all tasks between two dates
export const getNumberOfTasksBetweenDates = async (startDate: string, endDate: string) => {
    const response = await axios.get(`${API_URL}/tasks/completed/number/${startDate}/${endDate}`, { withCredentials: true });
    return response.data;
}

// get the number of completed tasks and incompleted tasks in a date 
export const getNumberOfTasksInDate = async (date: string) => {
    const response = await axios.get(`${API_URL}/tasks/completed/${date}`, { withCredentials: true });
    return response.data;
}

// get the number of completed tasks and incompleted by date 
export const getNumberOfTasksByDate = async () => {
    const response = await axios.get(`${API_URL}/tasks/summary`, { withCredentials: true });
    return response.data;
}

// get the number of completed tasks and incompleted tasks by month
export const getNumberOfTasksByMonth = async () => {
    const response = await axios.get(`${API_URL}/tasks/completion-rate/monthly`, { withCredentials: true });
    return response.data;
}
