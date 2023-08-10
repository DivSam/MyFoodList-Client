import ReviewView from "./review";
import { Review } from "../types/types";

interface ListReviewsProps {
    reviews: Review[];
    onEditModeChange: (editMode: boolean) => void;
    editMode: boolean;
    onEditCollectReviewData: (reviewData: Review | null) => void;
    reviewData: Review | null;
    delete: () => void;
}

export default function ListReviews(props: ListReviewsProps) {

    const handleEditModeChange = (editMode: boolean) => {
        props.onEditModeChange(editMode);
    };

    const handleEditCollectReviewData = (reviewData: Review | null) => {
        props.onEditCollectReviewData(reviewData);
    };

    return (
        <div>
            {props.reviews && props.reviews.map(function(review, i){
                return (
                <ReviewView 
                    key={i} 
                    review={review} 
                    onEditCollectReviewData={handleEditCollectReviewData} 
                    onEditModeChange={handleEditModeChange} 
                    editMode={props.editMode}
                    delete={props.delete}
                    />
                );
                
            })};
        </div>
    )
}