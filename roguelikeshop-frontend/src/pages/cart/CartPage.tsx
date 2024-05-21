import {useEffect, useRef, useState} from "react";
import {getCart, Cart} from "../../api/shop/cart/cartApi.ts";

export default function CartPage() {
    const [cart, setCart] = useState<Cart | null>(null);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;

        console.log('Cart component mounted');

        getCart().then((cart) => setCart(cart));
        hasFetched.current = true;
    }, []);

    return (
        <div>
            <h1>Cart</h1>
            {cart ? (
                <div>
                    <p>Total price: {cart.total_price}</p>
                    <p>Items count: {cart.items_count}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}