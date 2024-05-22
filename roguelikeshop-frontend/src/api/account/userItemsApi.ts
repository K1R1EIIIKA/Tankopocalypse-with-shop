import {getItem, Item} from "../shop/itemsApi.ts";
import {User} from "./UserApi.ts";
import axios from "axios";

export interface UserItem {
	id: number;
	user: User;
	item: Item;
	count: number;
	price: number;
}

export async function getUserItems() {
	try {
		const response = await axios.get('http://localhost:8000/api/account/user-items', {withCredentials: true});
		const userItems = response.data;
		for (const userItem of userItems) {
			userItem.item = await getItem(userItem.item);
		}
		return userItems;
	} catch (error) {
		console.error('There was an error!', error);
		return null;
	}
}

export async function getUserItem(id: number) {
	try {
		const response = await axios.get(`http://localhost:8000/api/account/user-items/${id}`, {withCredentials: true});
		const userItem = response.data;
		userItem.item = await getItem(userItem.item);
		return userItem;
	} catch (error) {
		console.error('There was an error!', error);
		return null;
	}
}