import {Color, getColor} from "./colorsApi.ts";
import axios from "axios";

export interface Rarity {
	id: number;
	index: number;
	name: string;
	color: Color;
}

export async function getRarities() {
	try {
		const response = await axios.get('http://localhost:8000/api/shop/rarities');
		const rarities = response.data;
		for (const rarity of rarities) {
			rarity.color = await getColor(rarity.color);
		}
		return rarities;
	} catch (error) {
		console.error('There was an error!', error);
		return null;
	}
}

export async function getRarity(id: number) {
	try {
		const response = await axios.get(`http://localhost:8000/api/shop/rarities/${id}`);
		const rarity = response.data;
		rarity.color = await getColor(rarity.color);
		return rarity;
	} catch (error) {
		console.error('There was an error!', error);
		return null;
	}
}
