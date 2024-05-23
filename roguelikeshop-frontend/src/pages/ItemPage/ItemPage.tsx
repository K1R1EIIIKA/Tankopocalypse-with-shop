import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {getItem, Item} from "../../api/shop/itemsApi.ts";
import {addToCart} from "../../api/shop/cart/cartApi.ts";
import {refreshCart} from "../../components/Hooks/useCart.tsx";
import './ItemPage.css';

export default function ItemPage() {
	const {id} = useParams<{ id: string }>();
	const [item, setItem] = useState<Item | null>(null);
	const hasFetched = useRef(false);

	useEffect(() => {
		if (hasFetched.current) return;
		if (id) {
			getItem(Number(id)).then(setItem);
			hasFetched.current = true;
		}
	}, [id]);

	if (!item) {
		return <p>Loading...</p>;
	}

	const handleAddToCart: (itemId: number) => () => void = (itemId) => () => {
		addToCart(itemId, 'item').then(r => {
			refreshCart();
			console.log(r);
		});
	}

	return (
		<div className={'item-page'}>
			<h1 className={'mt-3 mb-3'}>{item.name}</h1>
			<h3 className={'mb-2'}>{item.description}</h3>
			<h5 className={'mb-1'}>Редкость: <span style={{color: item.rarity.color.hex_code}}>{item.rarity.name}</span></h5>
			<h5 className={'mb-3'}>Цена: {item.price}₽</h5>
			<button onClick={handleAddToCart(item.id)} className={'btn btn-primary'}>В корзину</button>
		</div>
	);
}
