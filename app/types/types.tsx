import { PlaceDetail } from "../lib/googleApiClient";

export interface Review {
    id?: string;
    "sessionEmail": string;
    "name": string;
    "address": string;
    "details": PlaceDetail | null;
    "type": string;
    "priceRange": string;
    "ratings": Rating;
    "overallScore": number;
    "comments": string;
    "images": [];
}
export interface LatLng {
    lat: number;
    lng: number;
}
export interface Rating {
    "food": number;
    "vibes": number;
    "service": number;
    "worth": number;
}

export interface Image {
    review: string,
    file: {
        data: Buffer,
        contentType: String,
    },
    uploadTime: string,
};

export interface OverallReview {
    "name": string;
    "address": string;
    "type": string;
    "_id": string;
    "avg_rating": number;
    "images": [][];
}

export const foodType = ["Italian", "Thai", "French", "Middle Eastern", "Japanese", "Chinese", "Vietnamese", "Korean", "Mexican", "Quebecois", "Indian", "Greek", "Portuguese", "American"];