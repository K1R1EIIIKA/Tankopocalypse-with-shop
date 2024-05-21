import {getUser, User} from "../../account/UserApi.ts";
import {CartItem, getCartItem} from "./cartItemsApi.ts";
import {CartSkin, getCartSkin} from "./cartSkinsApi.ts";
import axios from "axios";

export interface Cart {
    id: number;
    user: User;
    items: CartItem[];
    skins: CartSkin[];
    total_price: number;
    items_count: number;
}

export async function getCart() {
    console.log(document.cookie)
    try {
        const response = await axios.get('http://localhost:8000/api/shop/cart', { withCredentials: true });
        const cart = response.data;
        cart.user = await getUser();
        for (let cartItem of cart.items) {
            console.log(cartItem)
            cartItem = await getCartItem(cartItem);
        }
        for (let cartSkin of cart.skins) {
            cartSkin = await getCartSkin(cartSkin);
        }
        return cart;
    }
    catch (error) {
        console.error('There was an error!', error);
        return null;
    }
}