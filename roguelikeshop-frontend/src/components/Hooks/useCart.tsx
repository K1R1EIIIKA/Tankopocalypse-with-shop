import {Cart, getCart} from "../../api/shop/cart/cartApi.ts";
import {useEffect, useState} from "react";

let globalCart: ((userInfo: Cart) => void) | null = null;

export function useCart() {
	const [cart, setCart] = useState<Cart | null>(null);

	useEffect(() => {
		globalCart = setCart;
		getCart().then(setCart);
		return () => {
			globalCart = null;
		};
	}, []);

	return cart;
}

export function refreshCart() {
	if (globalCart) {
		getCart().then(globalCart);
	}
}