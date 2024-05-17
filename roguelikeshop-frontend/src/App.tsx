import {useEffect, useState} from 'react';
import axios from 'axios';

interface Color {
    id: number;
    hex_code: string;
    name: string;
}

export default function App() {
    const [colors, setColors] = useState<Color[]>([]);
    const [time, setTime] = useState<Date>(new Date());

    useEffect(() => {
        axios.get('http://localhost:8000/api/shop/colors')
            .then((response) => {
                setColors(response.data);
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });

        const interval = setInterval(() => {
                setTime(new Date());
            }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
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