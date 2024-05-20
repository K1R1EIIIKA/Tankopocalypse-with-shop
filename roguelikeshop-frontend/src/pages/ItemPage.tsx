import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {getItem} from "../api/itemsApi.ts";
import {Item} from "../api/itemsApi.ts";

export default function ItemPage() {
    const {id} = useParams<{ id: string }>();
    const [item, setItem] = useState<Item | null>(null);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        if (id) {
            getItem(Number(id)).then(setItem);
            hasFetched.current = true;
        }
    }, [id]);

    if (!item) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{item.name}</h1>
            <p>Rarity: <span style={{color: item.rarity.color.hex_code}}>{item.rarity.name}</span></p>
            <p>Price: {item.price}</p>
        </div>
    );
}
