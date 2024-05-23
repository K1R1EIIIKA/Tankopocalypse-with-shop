import {getSkins, Skin} from "../../api/shop/SkinsApi.ts";
import {useEffect, useState} from "react";
import {Rarity} from "../../api/shop/RaritiesApi.ts";
import SkinCard from "../../components/SkinCard.tsx";

export default function Skins() {
	const [sortedSkins, setSortedSkins] = useState<{ rarities: Rarity[], skins: Skin[] } | null>(null);

	useEffect(() => {
		getSkins().then((skins) => {
			const sorted = sortSkinsByRarity(skins);
			setSortedSkins(sorted);
		});
	}, []);

	function sortSkinsByRarity(skins: Skin[]): { rarities: Rarity[], skins: Skin[] } {
		const raritiesMap: Map<number, Rarity> = new Map();
		const uniqueItemsMap: Map<number, Skin> = new Map();

		skins.forEach((skin) => {
				if (!raritiesMap.has(skin.rarity.id)) {
					raritiesMap.set(skin.rarity.id, skin.rarity);
				}

				if (!uniqueItemsMap.has(skin.id)) {
					uniqueItemsMap.set(skin.id, skin);
				}
			}
		);

		const rarities = Array.from(raritiesMap.values()).sort((a, b) => a.index - b.index);
		const uniqueItems = Array.from(uniqueItemsMap.values());

		console.log(rarities, uniqueItems)

		return {rarities, skins: uniqueItems};
	}

	return (
		<>
			<h1 className={'mb-4 mt-4 items-main-h1'}>Скины</h1>
			<div className="row justify-content-center">
				{sortedSkins ? (
					<div>
						{sortedSkins.rarities.map((rarity) => (
							<div key={rarity.id}>
								<h3 className={'mb-1'}>{rarity.name}</h3>
								<div className="row mb-4">
									{sortedSkins.skins.map((skin) => (
										skin.rarity === rarity
											? <SkinCard skin={skin} key={skin.id}/>
											: null
									))}
								</div>
							</div>
						))}
					</div>
				) : (
					<p>Loading skins...</p>
				)}
			</div>
		</>
	);
}