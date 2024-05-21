import axios from "axios";

export interface User {
    id: number;
    email: string;
    name: string;
}

export async function getUser() {
    try {
        const response = await axios.get('http://localhost:8000/api/auth/user', { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('There was an error!', error);
        return null;
    }
}