import {useEffect, useRef, useState} from 'react';
import {getItems, Item} from "../../api/shop/itemsApi.ts";
import ItemCard from "../../components/ItemCard/ItemCard.tsx";
import {getSkins, Skin} from "../../api/shop/SkinsApi.ts";
import SkinCard from "../../components/SkinCard.tsx";
import './App.css';

export default function App() {
	const [items, setItems] = useState<Item[] | null>(null);
	const [skins, setSkins] = useState<Skin[] | null>(null);
	const hasFetched = useRef(false);

	function getRandomItems(items: Item[], skins: Skin[], count: number): (Item | Skin)[] {
		const allItems: { type: 'item' | 'skin', item: Item | Skin }[] = [];
		allItems.push(...items.map((item) => ({ type: 'item', item })));
		allItems.push(...skins.map((skin) => ({ type: 'skin', item: skin })));

		// Создаем массив индексов элементов
		const indices = Array.from({ length: allItems.length }, (_, i) => i);
		// Перемешиваем массив индексов
		for (let i = indices.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[indices[i], indices[j]] = [indices[j], indices[i]];
		}

		const randomItems: { type: 'item' | 'skin', item: Item | Skin }[] = [];
		// Выбираем случайные элементы на основе перемешанных индексов
		for (let i = 0; i < count && i < indices.length; i++) {
			randomItems.push(allItems[indices[i]]);
		}

		return randomItems.map((randomItem) => randomItem.item);
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
					<button className={'btn btn-primary mt-5'}>Скачать</button>
				</div>
			</section>

			<section className={'mt-5'}>
				<h2 className={'fw-bold mb-3'}>Популярные товары</h2>
				{items && skins ? (
					<div className={'row items-row'}>
						{getRandomItems(items, skins, 6).map((item) => (
							(item as Item).id ? <ItemCard key={(item as Item).id} item={item as Item}/> : <SkinCard key={(item as Skin).id} skin={item as Skin}/>
						))}
					</div>
				) : (
					<p>Loading items...</p>
				)}
			</section>

			{/*<h1>Items</h1>*/}
			{/*{items ? (*/}
			{/*	<div>*/}
			{/*		{items.map((item) => (*/}
			{/*			<ItemCard key={item.id} item={item}/>*/}
			{/*		))}*/}
			{/*	</div>*/}
			{/*) : (*/}
			{/*	<p>Loading items...</p>*/}
			{/*)}*/}
			{/*<h1>Skins</h1>*/}
			{/*{skins ? (*/}
			{/*	<div>*/}
			{/*		{skins.map((skin) => (*/}
			{/*			<SkinCard key={skin.id} skin={skin}/>*/}
			{/*		))}*/}
			{/*	</div>*/}
			{/*) : (*/}
			{/*	<p>Loading skins...</p>*/}
			{/*)}*/}
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
