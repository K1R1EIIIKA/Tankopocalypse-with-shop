import {useEffect, useRef, useState} from 'react';
import {Color} from './api/colorsApi.ts';
import {getColors} from './api/colorsApi.ts';
import {getItems, Item} from "./api/itemsApi.ts";

export default function App() {
    const [colors, setColors] = useState<Color[]>([]);
    const [items, setItems] = useState<Item[] | null>(null);
    const [time, setTime] = useState<Date>(new Date());
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;

        console.log('App component mounted');

        getColors().then(setColors);
        getItems().then((items) => setItems(sortItems(items)));
        hasFetched.current = true;

        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <h1>Items</h1>
            {items ? (
                <ul>
                    {items.map((item: Item) => (
                        <li key={item.id}>
                            {item.name} <span
                            style={{color: item.rarity.color.hex_code}}>{item.rarity.name}</span> - {item.price})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
            <h1>Colors</h1>
            {time.toLocaleTimeString()}
            <ul>
                {colors && colors.map((color: Color) => (
                    <li key={color.id} style={{color: color.hex_code}}>
                        {color.name} ({color.hex_code})
                    </li>
                ))}
            </ul>
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