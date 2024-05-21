import {useEffect, useRef, useState} from "react";
import {getCart, Cart, addToCart, removeFromCart} from "../../api/shop/cart/cartApi.ts";

export default function CartPage() {
    const [cart, setCart] = useState<Cart | null>(null);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;

        console.log('Cart component mounted');

        getCart().then((cart) => setCart(cart));
        hasFetched.current = true;
    }, []);

    const handleRemoveFromCart: (itemId: number) => () => void = (itemId) => () => {
        removeFromCart(itemId).then(r => {
            if (r) {
                getCart().then((cart) => setCart(cart));
            }
        });
    }

    const handleAddToCart: (itemId: number) => () => void = (itemId) => () => {
        addToCart(itemId).then(r => {
            if (r) {
                getCart().then((cart) => setCart(cart));
            }
        });
    }

    return (
        <div>
            <h1>Cart</h1>
            {cart ? (
                <div>
                    <p>Total price: {cart.total_price}</p>
                    <p>Items count: {cart.items_count}</p>
                    <h3>Items</h3>
                    <div>
                        {cart.items.map((cartItem) => (
                            <div key={cartItem.id}>
                                <p>{cartItem.item.name}</p>
                                <p>Count: {cartItem.count}</p>
                                <p>Price: {cartItem.price}</p>
                                <button onClick={handleRemoveFromCart(cartItem.item.id)}>Remove from cart</button>
                                <button onClick={handleAddToCart(cartItem.item.id)}>Add to cart</button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}