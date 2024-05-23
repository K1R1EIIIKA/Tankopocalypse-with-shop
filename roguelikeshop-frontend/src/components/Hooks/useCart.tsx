import {Cart, getCart} from "../../api/shop/cart/cartApi.ts";
import {useEffect, useState} from "react";
import {useAppSelector} from "../../api/app/hooks.ts";
import {User} from "../../api/account/UserApi.ts";

let globalCart: ((userInfo: Cart) => void) | null = null;

export function useCart() {
	const [cart, setCart] = useState<Cart | null>(null);
	const user: User = useAppSelector((state) => state.auth.user);

	useEffect(() => {
		if (!user) {
			setCart(null);
			return;
		}
		globalCart = setCart;
		getCart().then(setCart);
		return () => {
			globalCart = null;
		};
	}, [user]);

	return cart;
}

export function refreshCart() {
	if (globalCart) {
		getCart().then(globalCart);
	}
}