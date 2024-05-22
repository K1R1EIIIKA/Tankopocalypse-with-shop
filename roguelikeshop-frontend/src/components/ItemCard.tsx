import {Link} from "react-router-dom";
import {Item} from "../api/shop/itemsApi.ts";

export default function ItemCard({item}: { item: Item }) {
	return (
		<div>
			<Link to={'/items/' + item.id}>{item.name}</Link>- <span
			style={{color: item.rarity.color.hex_code}}>{item.rarity.name}</span> - {item.price}
		</div>
	);
}