import {useEffect, useRef, useState} from 'react';
import {getItems, Item} from "../api/itemsApi.ts";
import ItemCard from "../components/ItemCard.tsx";

export default function App() {
    const [items, setItems] = useState<Item[] | null>(null);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;

        console.log('App component mounted');

        getItems().then((items) => setItems(sortItems(items)));
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
                <p>Loading...</p>
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