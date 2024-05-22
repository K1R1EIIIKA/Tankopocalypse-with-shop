import {getSkin, Skin} from "../SkinsApi.ts";
import axios from "axios";

export interface CartSkin {
	id: number;
	skin: Skin;
	count: number;
	price: number;
}

export async function getCartSkins() {
	try {
		const response = await axios.get('http://localhost:8000/api/shop/cart-skins');
		const cartSkins = response.data;
		for (const cartSkin of cartSkins) {
			cartSkin.skin = await getSkin(cartSkin.skin);
		}
		return cartSkins;
	} catch (error) {
		console.error('There was an error!', error);
		return null;
	}
}

export async function getCartSkin(id: number) {
	try {
		const response = await axios.get(`http://localhost:8000/api/shop/cart-skins/${id}`);
		const cartSkin = response.data;
		cartSkin.skin = await getSkin(cartSkin.skin);
		return cartSkin;
	} catch (error) {
		console.error('There was an error!', error);
		return null;
	}
}