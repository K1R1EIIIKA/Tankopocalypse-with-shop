import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {addToCart} from "../api/shop/cart/cartApi.ts";
import {getSkin, Skin} from "../api/shop/SkinsApi.ts";

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
			console.log(r);
		});
	}

	return (
		<div>
			<h1>{skin.name}</h1>
			<h3>{skin.description}</h3>
			<p>Rarity: <span style={{color: skin.rarity.color.hex_code}}>{skin.rarity.name}</span></p>
			<p>Color: <span style={{color: skin.color.hex_code}}>{skin.color.name}</span></p>
			<p>Price: {skin.price}</p>
			<button onClick={handleAddToCart(skin.id)}>Add to cart</button>
		</div>
	);
}
