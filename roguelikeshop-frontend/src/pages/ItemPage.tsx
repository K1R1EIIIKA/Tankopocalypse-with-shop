import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {getItem} from "../api/shop/itemsApi.ts";
import {Item} from "../api/shop/itemsApi.ts";

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

    function addItemToCart() {

    }

    return (
        <div>
            <h1>{item.name}</h1>
            <h3>{item.description}</h3>
            <p>Rarity: <span style={{color: item.rarity.color.hex_code}}>{item.rarity.name}</span></p>
            <p>Price: {item.price}</p>
            <button onClick={addItemToCart}>Add to Cart</button>
        </div>
    );
}
