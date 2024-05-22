import {useEffect, useRef, useState} from 'react';
import {getItems, Item} from "../api/shop/itemsApi.ts";
import ItemCard from "../components/ItemCard.tsx";
import {getSkins, Skin} from "../api/shop/SkinsApi.ts";
import SkinCard from "../components/SkinCard.tsx";

export default function App() {
	const [items, setItems] = useState<Item[] | null>(null);
	const [skins, setSkins] = useState<Skin[] | null>(null);
	const hasFetched = useRef(false);

	useEffect(() => {
		if (hasFetched.current) return;

		console.log('App component mounted');

		getItems().then((items) => setItems(sortItems(items)));
		getSkins().then((skins) => setSkins(sortSkins(skins)));
		hasFetched.current = true;

	}, []);

	return (
		<>
			<h1>Items</h1>
			{items ? (
				<div>
					{items.map((item) => (
						<ItemCard key={item.id} item={item} />
					))}
				</div>
			) : (
				<p>Loading items...</p>
			)}
			<h1>Skins</h1>
			{skins ? (
				<div>
					{skins.map((skin) => (
						<SkinCard key={skin.id} skin={skin} />
					))}
				</div>
			) : (
				<p>Loading skins...</p>
			)}
		</>
	);
}

function sortItems(items: Item[]) {
	return items.sort((a, b) => {
		if (a.rarity.index === b.rarity.index) {
			return a.price - b.price;
		}
		return a.rarity.index - b.rarity.index;
	});
}

function sortSkins(skins: Skin[]) {
	return skins.sort((a, b) => {
		if (a.rarity.index === b.rarity.index) {
			return a.price - b.price;
		}
		return a.rarity.index - b.rarity.index;
	});
}
