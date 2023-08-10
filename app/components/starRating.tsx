"use client";

import { useEffect, useState } from "react";
import { Rating } from '@mui/material';
import { Review } from "../types/types";

interface StarRatingProps {
    name: string;
    onReset: boolean;
    reviewData: Review | null;
    editMode: boolean;
}

export default function StarRating(props: StarRatingProps) {
    const [value, setValue] = useState<number | null>(0);
    
    useEffect(() => {
        setValue(0);
    }, [props.onReset]);

    useEffect(() => {
        if (props.reviewData && props.editMode) {
            if (props.name === "foodRating"){
                setValue(props.reviewData.ratings.food);
            }
            else if (props.name === "vibesRating"){
                setValue(props.reviewData.ratings.vibes);
            }
            else if (props.name === "serviceRating"){
                setValue(props.reviewData.ratings.service);
            }
            else if (props.name === "worthRating"){
                setValue(props.reviewData.ratings.worth);
            }
        }else{
            setValue(0);
        }
    }, [props.reviewData, props.editMode, props.name]);
    
    return (
        <Rating
            id="rating"
            name={props.name}
            value={value}
            size="large"
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            precision={0.5}
        />
    )
}