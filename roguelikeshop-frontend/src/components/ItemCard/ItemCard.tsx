import {Link} from "react-router-dom";
import {Item} from "../../api/shop/itemsApi.ts";
import './ItemCard.css';

export default function ItemCard({item}: { item: Item }) {
	return (
		<div className={'col-4 p-2'}>
			<div className={'item-card p-3'}>
				<Link to={'/items/' + item.id} className={'text-decoration-none text-black text-center'}>
					<p className={'link-dark item-name mb-2'}>{item.name}</p>
					<p className={'mb-0'}><span style={{color: item.rarity.color.hex_code}} className={'mt-auto'}>
     {item.rarity.name}
    </span> - {item.price}₽</p>
				</Link>
			</div>
		</div>
	);
}