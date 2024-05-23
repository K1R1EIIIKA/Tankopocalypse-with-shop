import {Link} from "react-router-dom";
import {Skin} from "../../api/shop/SkinsApi.ts";

export default function SkinCard({skin}: { skin: Skin }) {
	return (
		<div className={'col-4 p-2'}>
			<div className={'item-card p-3'}>
				<Link to={'/skins/' + skin.id} className={'text-decoration-none text-black text-center'}>
					<p className={'link-dark item-name mb-2'}>{skin.name}</p>
					<p className={'mb-0'}><span style={{color: skin.rarity.color.hex_code}} className={'mt-auto'}>
						{skin.rarity.name}
					</span> - {skin.price}₽
					</p>
				</Link>
			</div>
		</div>
	);
}