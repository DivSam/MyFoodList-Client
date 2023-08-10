import { Review, Image } from "../types/types"
import { GrLocationPin } from "react-icons/gr";

interface ReviewProps {
    review: Review;
    onEditModeChange: (editMode: boolean) => void;
    editMode: boolean;
    onEditCollectReviewData: (reviewData: Review | null) => void;
    delete: () => void;
}

export default function ReviewView(props: ReviewProps) {
    const convertImg = (image: any) => {
        if (image) {
          const key = Object.keys(image)[0];
          const b64 = image[key].file.data.toString();
          const mimeType = image[key].file.contentType;
          const src = "data:" + mimeType + ";base64," + b64;
          return src;
        }
        return "";
      };

    const handleButtonClick = () => {
        props.onEditModeChange(!props.editMode);

        if (props.editMode) {
            props.onEditCollectReviewData(null);
        }
        else {
            props.onEditCollectReviewData(props.review);
        }

    }
    const handleDelete = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`https://food-guide-392203.nn.r.appspot.com/review/${props.review?.id}`, requestOptions) // ignore error typescript acting up
            .then(response => response.json());

        props.delete();
    }
    return (
        <div className="grid grid-cols-3 rounded-lg border border-gray-500 h-48 w-[99%] my-4 overflow-hidden">
            <div className="p-4 h-48">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={convertImg(props.review.images)} className="object-cover rounded-lg h-40 w-full" alt={props.review.name}></img>
            </div>
            <div className="grid grid-rows-6 col-span-2 gap-2 py-6 px-4 h-48 text-left text-xs">
                <div className="flex flex-col justify-center">
                    <span className="font-semibold">{props.review.name}</span>
                </div>
                <div className="flex flex-col justify-center">
                    <div className="flex">
                        <GrLocationPin size={14} className="mr-1" />
                        <div className="truncate mr-1">{props.review.address}</div>
                    </div>
                </div>
                <div>
                    <div className="center relative inline-block select-none whitespace-nowrap rounded-lg text-blue-700 bg-blue-100 border border-blue-300 mr-2 py-1 px-3.5 align-baseline leading-none">
                        {props.review.type}
                    </div>
                    <div className="center relative inline-block select-none whitespace-nowrap rounded-lg text-green-700 bg-green-100 border border-green-300 mr-2 py-1 px-3.5 align-baseline leading-none">
                        {props.review.priceRange}
                    </div>
                    <div className="center relative inline-block select-none whitespace-nowrap rounded-lg text-orange-700 bg-orange-100 border border-orange-300 mr-2 py-1 px-3.5 align-baseline leading-none">
                        {props.review.overallScore}/5
                    </div>
                </div>
                <div className="row-span-2 text-xs mt-2">
                    <span className="font-semibold">Comments: </span>{props.review.comments}
                </div>
                <div className="row-span-2 text-xs">
                    <button className="rounded-lg border border-gray-300 px-8 py-1 mt-2" onClick={handleButtonClick}>{props.editMode ? 'Cancel' : 'Edit'}</button>
                </div>
                <div className="row-span-2 text-xs mt-2">
                    <button className="rounded-lg border border-gray-300 px-8 py-1 mt-2" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    )
}
