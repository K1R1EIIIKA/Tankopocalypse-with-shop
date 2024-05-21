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
    is_active: boolean;
}

export async function getCart() {
    try {
        const response = await axios.get('http://localhost:8000/api/shop/cart', { withCredentials: true });
        const cart = response.data;
        cart.user = await getUser();
        console.log(cart.user)

        const items = cart.items;
        const skins = cart.skins;

        cart.items = [];
        for (const cartItem of items) {
           cart.items.push(await getCartItem(cartItem));
        }
        cart.skins = [];
        for (const cartSkin of skins) {
            cart.skins.push(await getCartSkin(cartSkin));
        }
        return cart;
    }
    catch (error) {
        console.error('There was an error!', error);
        return null;
    }
}

export async function addToCart(itemId: number) {
    try {
        console.log({ item_id: itemId, user_id: (await getUser()).id })
        await axios.post('http://localhost:8000/api/shop/cart/add-item/', { item_id: itemId, user_id: (await getUser()).id }, { withCredentials: true });
        return true;
    }
    catch (error) {
        console.error('There was an error!', error);
        return false;
    }
}

export async function removeFromCart(itemId: number) {
    try {
        await axios.post('http://localhost:8000/api/shop/cart/remove-item/', { item_id: itemId, user_id: (await getUser()).id }, { withCredentials: true });
        return true;
    }
    catch (error) {
        console.error('There was an error!', error);
        return false;
    }
}