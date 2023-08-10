import { useState, useEffect } from 'react';
import { OverallReview } from '../types/types';
import BigListReview from './bigListReview';

export default function OverallList() {
    const [places, setPlaces] = useState<OverallReview[]>([]);

    useEffect(() => {
        fetch(`https://food-guide-392203.nn.r.appspot.com/overall`)
            .then(response => response.json())
            .then(data => setPlaces(data.data))
    }, []);



    return (
        <div>
            {places && places.map(function (place, i) {
                return (
                    <BigListReview key={i} place={place} />
                );
            }
            )}
        </div>
    )
}