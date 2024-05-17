import axios from "axios";

export interface Color {
    id: number;
    hex_code: string;
    name: string;
}

export async function getColors() {
    try {
        const response = await axios.get('http://localhost:8000/api/shop/colors');
        return response.data;
    } catch (error) {
        console.error('There was an error!', error);
        return null;
    }
}

export async function getColor(id: number) {
    try {
        const response = await axios.get(`http://localhost:8000/api/shop/colors/${id}`);
        return response.data;
    } catch (error) {
        console.error('There was an error!', error);
        return null;
    }
}
