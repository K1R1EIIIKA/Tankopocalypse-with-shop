import {getItem, Item} from "../itemsApi.ts";
import axios from "axios";

export interface CartItem {
	id: number;
	item: Item;
	count: number;
	price: number;
}

export async function getCartItems() {
	try {
		const response = await axios.get('http://localhost:8000/api/shop/cart-items');
		const cartItems = response.data;
		for (const cartItem of cartItems) {
			cartItem.item = await getItem(cartItem.item);
		}
		return cartItems;
	} catch (error) {
		console.error('There was an error!', error);
		return null;
	}
}

export async function getCartItem(id: number) {
	try {
		const response = await axios.get(`http://localhost:8000/api/shop/cart-items/${id}`);
		const cartItem = response.data;
		cartItem.item = await getItem(cartItem.item);
		return cartItem;
	} catch (error) {
		console.error('There was an error!', error);
		return null;
	}
}