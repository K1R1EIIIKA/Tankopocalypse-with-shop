import {useEffect, useRef, useState} from 'react';
import {getItems, Item} from "../../api/shop/itemsApi.ts";
import ItemCard from "../../components/ItemCard/ItemCard.tsx";
import {getSkins, Skin} from "../../api/shop/SkinsApi.ts";
import SkinCard from "../../components/SkinCard/SkinCard.tsx";
import './App.css';

export default function App() {
	const [items, setItems] = useState<Item[] | null>(null);
	const [skins, setSkins] = useState<Skin[] | null>(null);
	const hasFetched = useRef(false);

	function getRandomItems(items: Item[], skins: Skin[], count: number): JSX.Element[] {
		const allItems: { type: 'item' | 'skin', item: Item | Skin }[] = [];
		allItems.push(...items.map((item) => ({ type: 'item', item })));
		allItems.push(...skins.map((skin) => ({ type: 'skin', item: skin })));

		const indices = Array.from({ length: allItems.length }, (_, i) => i);
		for (let i = indices.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[indices[i], indices[j]] = [indices[j], indices[i]];
		}

		const randomItems: { type: 'item' | 'skin', item: Item | Skin }[] = [];
		for (let i = 0; i < count && i < indices.length; i++) {
			randomItems.push(allItems[indices[i]]);
		}

		return randomItems.map((item) => {
			if (item.type === 'item') {
				return <ItemCard key={item.item.id} item={item.item}/>;
			} else {
				return <SkinCard key={item.item.id} skin={item.item}/>;
			}
		});
	}

	useEffect(() => {
		if (hasFetched.current) return;

		console.log('App component mounted');

		getItems().then((items) => setItems(sortItems(items)));
		getSkins().then((skins) => setSkins(sortSkins(skins)));
		hasFetched.current = true;

	}, []);

	return (
		<>
			<section className={'row d-flex align-items-center'}>
				<h2 className={'col mt-5'}>Скачайте нашу игру! <br/>
					Дайте нам много своих денег!!!!</h2>
				<div className={'col d-flex justify-content-center'}>
					<button className={'btn-main btn btn-primary mt-5'}>Скачать</button>
				</div>
			</section>

			<section className={'mt-5'}>
				<h2 className={'fw-bold mb-3'}>Популярные товары</h2>
				{items && skins ? (
					<div className={'row items-row'}>
						{getRandomItems(items, skins, 6)}
					</div>
				) : (
					<p>Loading items...</p>
				)}
			</section>
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
