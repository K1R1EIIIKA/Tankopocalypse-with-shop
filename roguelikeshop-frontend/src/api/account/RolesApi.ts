import axios from "axios";

export interface Role {
    id: number;
    name: string;
    name_ru: string;
}

export async function getRoles() {
    try {
        const response = await axios.get('http://localhost:8000/api/account/roles');
        return response.data;
    } catch (error) {
        console.error('There was an error!', error);
        return null;
    }
}

export async function getRole(id: number) {
    try {
        const response = await axios.get(`http://localhost:8000/api/account/roles/${id}`);
        return response.data;
    } catch (error) {
        console.error('There was an error!', error);
        return null;
    }
}