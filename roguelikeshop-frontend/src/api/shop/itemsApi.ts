import {getRarity, Rarity} from "./RaritiesApi.ts";
import axios from "axios";

export interface Item {
	id: number;
	description: string;
	name: string;
	price: number;
	rarity: Rarity;
}

export async function getItems() {
	try {
		const response = await axios.get('http://localhost:8000/api/shop/items');
		const items = response.data;
		for (const item of items) {
			item.rarity = await getRarity(item.rarity);
		}
		return items;
	} catch (error) {
		console.error('There was an error!', error);
		return null;
	}
}

export async function getItem(id: number) {
	try {
		const response = await axios.get(`http://localhost:8000/api/shop/items/${id}`);
		const item = response.data;
		item.rarity = await getRarity(item.rarity);
		return response.data;
	} catch (error) {
		console.error('There was an error!', error);
		return null;
	}
}
