import {getItems, Item} from "../../api/shop/itemsApi.ts";
import {useEffect, useState} from "react";
import {Rarity} from "../../api/shop/RaritiesApi.ts";
import ItemCard from "../../components/ItemCard/ItemCard.tsx";
import './Items.css';

export default function Items() {
	const [sortedItems, setSortedItems] = useState<{ rarities: Rarity[], items: Item[] } | null>(null);

	useEffect(() => {
		getItems().then((items) => {
			const sorted = sortItemsByRarity(items);
			setSortedItems(sorted);
		});
	}, []);

	function sortItemsByRarity(items: Item[]): { rarities: Rarity[], items: Item[] } {
		const raritiesMap: Map<number, Rarity> = new Map();
		const uniqueItemsMap: Map<number, Item> = new Map();

		items.forEach((item) => {
			if (!raritiesMap.has(item.rarity.id)) {
				raritiesMap.set(item.rarity.id, item.rarity);
			}

			if (!uniqueItemsMap.has(item.id)) {
				uniqueItemsMap.set(item.id, item);
			}
		});

		const rarities = Array.from(raritiesMap.values()).sort((a, b) => a.index - b.index);
		const uniqueItems = Array.from(uniqueItemsMap.values());

		console.log(rarities, uniqueItems)

		return {rarities, items: uniqueItems};
	}

	return (
		<>
			<h1 className={'mb-4 mt-4 items-main-h1'}>Предметы</h1>
			<div className="row justify-content-center">
				{sortedItems ? (
					<div>
						{sortedItems.rarities.map((rarity) => (
							<div key={rarity.id}>
								<h3 className={'mb-1'}>{rarity.name}</h3>
								<div className="row mb-4">
									{sortedItems.items.map((item) => (
										item.rarity.id === rarity.id ? (
											<ItemCard item={item} key={item.id}/>
										) : null
									))}
								</div>
							</div>
						))}
					</div>
				) : (
					<p>Loading items...</p>
				)}
			</div>
		</>
	);
}
