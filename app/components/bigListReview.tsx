import { useState } from "react";
import { OverallReview, Image } from "../types/types";
import { GrLocationPin } from "react-icons/gr";

interface BigListReviewProps {
    place: OverallReview
}

const convertImg = (img: any) => {
    if (img) {
        const key = Object.keys(img)[0];
        const b64 = img[key].file.data.toString();
        const mimeType = img[key].file.contentType;
        const src = "data:" + mimeType + ";base64," + b64;
        return src;

    }
    return "";
}

const ImageCarousel = (props: BigListReviewProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handlePrevClick = () => {
        setCurrentImageIndex(
            (currentImageIndex - 1 + props.place.images.length) %
            props.place.images.length
        );
    };

    const handleNextClick = () => {
        setCurrentImageIndex(
            (currentImageIndex + 1) % props.place.images.length
        );
    };
    return (
        <div className="relative h-36">
            {props.place.images.length > 0 && (
                <>
                    <div className="absolute inset-0 flex justify-center items-center overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            className="object-contain h-full w-full"
                            src={convertImg(props.place.images[currentImageIndex])}
                            alt={`Image ${currentImageIndex}`}
                        />
                    </div>
                    <div className="image-carousel__controls absolute bottom-0 left-0 right-0 flex justify-between p-4">
                        <button
                            className="bg-transparent text-black font-bold py-2 px-4 rounded"
                            onClick={handlePrevClick}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 transform rotate-180"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                        <button
                            className="bg-transparent text-black font-bold py-2 px-4 rounded"
                            onClick={handleNextClick}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>
                </>
            )}
        </div>

    );
};


export default function BigListReview(props: BigListReviewProps) {
    return (
        <div className="grid grid-cols-2 rounded-lg border border-gray-300 text-left px-4 py-4 text-xs my-4">
            <div className="grid grid-rows-4">
                <div className="text-base font-semibold">
                    {props.place.name}
                </div>
                <div className="flex">
                    <GrLocationPin size={14} className="mr-1" />
                    <span>{props.place.address}</span>
                </div>
                <div>
                    <span className="rounded-lg text-blue-700 bg-blue-100 border border-blue-300 py-1 px-1">{props.place.type}</span>
                </div>
                <div className="my-1">
                    <span className="rounded-lg text-orange-700 bg-orange-100 border border-orange-300 py-1 px-1">{props.place.avg_rating.toFixed(3)}/5</span>
                </div>
            </div>
            <div>
                <ImageCarousel place={props.place} />
            </div>
        </div>


    )

}