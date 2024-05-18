import {Item} from "../api/itemsApi.ts";

export default function ItemCard({ item }: { item: Item }) {
    return (
        <div>
            <a href={'/items/' + item.id}>{item.name}</a>-  <span style={{ color: item.rarity.color.hex_code }}>{item.rarity.name}</span> - {item.price}
        </div>
    );
}