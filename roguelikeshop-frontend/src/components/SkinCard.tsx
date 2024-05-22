import {Link} from "react-router-dom";
import {Skin} from "../api/shop/SkinsApi.ts";

export default function SkinCard({skin}: { skin: Skin }) {
	return (
		<div>
			<Link to={'/skins/' + skin.id}>{skin.name}</Link>- <span
			style={{color: skin.rarity.color.hex_code}}>{skin.rarity.name}</span> - <span
			style={{color: skin.color.hex_code}}>{skin.color.name}</span> - {skin.price}
		</div>
	);
}