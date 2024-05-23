import {useEffect, useRef, useState} from "react";
import {addToCart, Cart, checkout, getCart, removeFromCart} from "../../api/shop/cart/cartApi.ts";
import {refreshUserInfo} from "../../components/Hooks/useUserInfo.tsx";
import {refreshCart} from "../../components/Hooks/useCart.tsx";
import './CartPage.css';
import {Link} from "react-router-dom";

export default function CartPage() {
	const [cart, setCart] = useState<Cart | null>(null);
	const hasFetched = useRef(false);

	useEffect(() => {
		if (hasFetched.current) return;

		console.log('Cart component mounted');

		getCart().then((cart) => setCart(cart));
		hasFetched.current = true;
	}, []);

	const handleRemoveFromCart: (itemId: number, type: string) => () => void = (itemId, type) => () => {
		removeFromCart(itemId, type).then(r => {
			if (r) {
				getCart().then((cart) => setCart(cart));
				refreshCart();
			}
		});
	}

	const handleAddToCart: (itemId: number, type: string) => () => void = (itemId, type) => () => {
		addToCart(itemId, type).then(r => {
			if (r) {
				getCart().then((cart) => setCart(cart));
				refreshCart();
			}
		});
	}

	function handleCheckout() {
		checkout().then(r => {
			if (r) {
				getCart().then((cart) => setCart(cart));
				refreshUserInfo();
				refreshCart();
			}
		});
	}

	return (
		<>
			{cart ? (
				<>
					{cart.items_count !== 0 ? (
						<>
							<div className="row mt-4">
								<div className="col">
									{cart.items.length > 0 && (
										<div>
											<h3>Предметы</h3>
											<div>
												{cart.items.map((cartItem) => (
													<div key={cartItem.id} className={'item-container mb-4'}>
														<Link to={'/items/' + cartItem.item.id} className={'text-decoration-none text-black'}>
															<p className={'mb-1'}>
																{cartItem.item.name} - <span style={{color: cartItem.item.rarity.color.hex_code}}>{cartItem.item.rarity.name}</span>
															</p>
														</Link>
														<h5>{cartItem.price}₽</h5>
														<div className="button-container">
															<button className={'btn button-add me-2'}
																			onClick={handleRemoveFromCart(cartItem.item.id, 'item')}>-
															</button>
															<span className={'me-3 ms-2'}>{cartItem.count}</span>
															<button className={'btn button-remove'}
																			onClick={handleAddToCart(cartItem.item.id, 'item')}>+
															</button>
														</div>
													</div>
												))}
											</div>
										</div>
									)}
									{cart.skins.length > 0 && (
										<div>
											<hr/>
											<h3>Скины</h3>
											{cart.skins.map((cartSkin) => (
												<div key={cartSkin.id} className={'item-container mb-4'}>
													<Link to={'/skins/' + cartSkin.skin.id} className={'text-decoration-none text-black'}>
														<p className={'mb-1'}>
															{cartSkin.skin.name} - <span style={{color: cartSkin.skin.rarity.color.hex_code}}>{cartSkin.skin.rarity.name}</span>
														</p>
													</Link>
													<h5>{cartSkin.price}₽</h5>
													<div className="button-container">
														<button className={'btn button-add me-2'}
																		onClick={handleRemoveFromCart(cartSkin.skin.id, 'skin')}>-
														</button>
														<span className={'me-3 ms-2'}>{cartSkin.count}</span>
														<button className={'btn button-remove'}
																		onClick={handleAddToCart(cartSkin.skin.id, 'skin')}>+
														</button>
													</div>
												</div>
											))}
										</div>
									)}
								</div>
								<div className="col">
									<h3>Итого: {cart.total_price}₽</h3>
									<h4>Количество предметов: {cart.items_count}</h4>
									<button onClick={handleCheckout} className="btn btn-checkout btn-primary">Оплатить</button>
								</div>
							</div>
						</>
					) : (
						<p>Cart is empty</p>
					)}
				</>
			) : (
				<p>Loading...</p>
			)}
		</>
	);
}