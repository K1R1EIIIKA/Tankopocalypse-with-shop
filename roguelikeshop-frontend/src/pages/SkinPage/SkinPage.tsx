import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {addToCart} from "../../api/shop/cart/cartApi.ts";
import {getSkin, Skin} from "../../api/shop/SkinsApi.ts";
import {refreshCart} from "../../components/Hooks/useCart.tsx";
import './SkinPage.css';

export default function SkinPage() {
	const {id} = useParams<{ id: string }>();
	const [skin, setSkin] = useState<Skin | null>(null);
	const hasFetched = useRef(false);

	useEffect(() => {
		if (hasFetched.current) return;
		if (id) {
			getSkin(Number(id)).then(setSkin);
			hasFetched.current = true;
		}
	}, [id]);

	if (!skin) {
		return <p>Loading...</p>;
	}

	const handleAddToCart: (skinId: number) => () => void = (skinId) => () => {
		addToCart(skinId, 'skin').then(r => {
			refreshCart();
			console.log(r);
		});
	}

	return (
		<div className={'skin-page'}>
			<h1 className={'mt-3 mb-3'}>{skin.name}</h1>
			<h3 className={'mb-2'}>{skin.description}</h3>
			<h5 className={'mb-1'}>Редкость: <span style={{color: skin.rarity.color.hex_code}}>{skin.rarity.name}</span></h5>
			<h5 className={'mb-3'}>Цена: {skin.price}₽</h5>
			<button onClick={handleAddToCart(skin.id)} className={'btn btn-primary'}>В корзину</button>
		</div>
	);
}
