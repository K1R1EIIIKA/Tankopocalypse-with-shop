import {useEffect, useRef, useState} from "react";
import {addToCart, Cart, checkout, getCart, removeFromCart} from "../../api/shop/cart/cartApi.ts";

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
				console.log('Item added to cart')
				getCart().then((cart) => setCart(cart));
			}
		});
	}

	function handleCheckout() {
		checkout().then(r => {
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
					{cart.items_count !== 0 ? (
						<>
							{cart.items.length > 0 && (
								<div>
									<h3>Items</h3>
									<div>
										{cart.items.map((cartItem) => (
											<div key={cartItem.id}>
												<p>{cartItem.item.name}</p>
												<p>Count: {cartItem.count}</p>
												<p>Price: {cartItem.price}</p>
												<button onClick={handleRemoveFromCart(cartItem.item.id)}>-</button>
												<button onClick={handleAddToCart(cartItem.item.id)}>+</button>
											</div>
										))}
									</div>
								</div>
							)}
							{cart.skins.length > 0 && (
								<div>
									<h3>Skins</h3>
									{cart.skins.map((cartSkin) => (
										<div key={cartSkin.id}>
											<p>{cartSkin.skin.name}</p>
											<p>Count: {cartSkin.count}</p>
											<p>Price: {cartSkin.price}</p>
											<button onClick={handleRemoveFromCart(cartSkin.skin.id)}>-
											</button>
											<button onClick={handleAddToCart(cartSkin.skin.id)}>+</button>
										</div>
									))}
								</div>
							)}
							<p>Total price: {cart.total_price}</p>
							<p>Items count: {cart.items_count}</p>
							<button onClick={handleCheckout}>Оформить заказ</button>
						</>
					) : (
						<p>Cart is empty</p>
					)}
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
}