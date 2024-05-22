import {getRarity, Rarity} from "./RaritiesApi.ts";
import {Color, getColor} from "./colorsApi.ts";
import axios from "axios";

export interface Skin {
	id: number;
	name: string;
	price: number;
	description: string;
	rarity: Rarity;
	color: Color;
	only_one: boolean;
}

export async function getSkins() {
	try {
		const response = await axios.get('http://localhost:8000/api/shop/skins');
		const skins = response.data;
		for (const skin of skins) {
			skin.rarity = await getRarity(skin.rarity);
			skin.color = await getColor(skin.color);
		}
		return skins;
	} catch (error) {
		console.error('There was an error!', error);
		return null;
	}
}

export async function getSkin(id: number) {
	try {
		const response = await axios.get(`http://localhost:8000/api/shop/skins/${id}`);
		const skin = response.data;
		skin.rarity = await getRarity(skin.rarity);
		skin.color = await getColor(skin.color);
		return skin;
	} catch (error) {
		console.error('There was an error!', error);
		return null;
	}
}