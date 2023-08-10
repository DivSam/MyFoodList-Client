import { MdOutlineReviews } from 'react-icons/md';
import FileUploader from './fileUploader';
import React, { useEffect, useState } from 'react';
import PlacesSearchInput from './placesSearchInput';
import StarRating from './starRating';
import { Rating, Review, foodType } from '../types/types';
import { PlaceDetail } from '../lib/googleApiClient';

interface FormProps {
    onSubmit: (state: boolean) => void;
    reviewData: Review | null;
    editMode: boolean;
    onEditModeChange: (editMode: boolean) => void;
    session: any;
}

export const Form = (props: FormProps) => {
    const [files, setFiles] = useState<FileList | null>(null); 
    const [placeDetails, setPlaceDetails] = useState<PlaceDetail | null>(null);
    const [resetState, setResetState] = useState<boolean>(false);

    useEffect(() => { 
        // set the value of price ranges and food types because default value doesn't work for some reason
        if (props.reviewData && props.editMode) {
            const form = document.getElementById("formReview") as HTMLFormElement;
            const priceRange = form.elements.namedItem("priceRange") as HTMLSelectElement;
            const type = form.elements.namedItem("type") as HTMLSelectElement;
            const comments = form.elements.namedItem("comments") as HTMLTextAreaElement;
            comments.value = props.reviewData.comments;
            priceRange.value = props.reviewData.priceRange;
            type.value = props.reviewData.type;
            setPlaceDetails(props.reviewData.details);
        }else{
            const form = document.getElementById("formReview") as HTMLFormElement;
            form.reset();
        }
            
    }, [props.reviewData, props, props.editMode]);

    const handleUploadFiles = (fileList: FileList | null) => {
        setFiles(fileList);
    }

    const handleLocationChange = (details: PlaceDetail) => {
        setPlaceDetails(details);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(buildReview(formData)),
        };
        console.log(requestOptions.body);
        let response = await fetch('https://food-guide-392203.nn.r.appspot.com/review', requestOptions);
        let reviewId = await response.json().then(data => data.id)

        submitImg(reviewId);
        alert("Submission was successful");
        props.onSubmit(true);
        setResetState(prevState => !prevState);
        form.reset();

    }

    const handleEditSave = async (e: any) => {
        const form = document.getElementById("formReview") as HTMLFormElement;
        const formData = new FormData(form);
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(buildReview(formData)),
        };

        //ignore error caused by this, TS is just acting up
        await fetch(`https://food-guide-392203.nn.r.appspot.com/${props.reviewData?.id}`, requestOptions); 
        setResetState(prevState => !prevState);
        props.onEditModeChange(false);
        form.reset();

    }

    const submitImg = async (reviewId: string) => {
        const formData = new FormData();

        if (!files) return;

        formData.append("review", reviewId);

        for (let i =0; i < files.length; i++) {
            formData.append("files", files[i]);
        }

        await fetch("https://food-guide-392203.nn.r.appspot.com/review/upload_files", {
            method: 'POST',
            body: formData,
        })
        .then((res) => console.log(res))
        .catch((err) => (err));
    }

    const buildReview = (formData: FormData) => {
        const rating: Rating = {
            "food": formData.get('foodRating') as unknown as number,
            "vibes": formData.get('vibesRating') as unknown as number,
            "service": formData.get('serviceRating') as unknown as number,
            "worth": formData.get('worthRating') as unknown as number,
        }

        const review: Review = {
            "sessionEmail": props.session.user.email,
            "name": placeDetails?.name as string,
            "address": formData.get('address') as string,
            "details": placeDetails,
            "type": formData.get('type') as string,
            "priceRange": formData.get('priceRange') as string,
            "ratings": rating,
            "overallScore": computeOverallScore(rating),
            "comments": formData.get('comments') as string,
            "images": [],
        }

        return review;
    }

    const computeOverallScore = (rating: Rating) => {
        return rating.food*0.25 + rating.vibes*0.25 + rating.service*0.25 + rating.worth*0.25;
    }

    return (
        <form className="justify-stretch h-full" id="formReview" onSubmit={handleSubmit}>
            <div className="grid justify-stretch xl:h-full gap-2 xl:grid-cols-2 xl:gap-4">
                <div className="xl:col-span-2 flex flex-col justify-center items-left">
                    <div className="flex">
                        <MdOutlineReviews size={24} className="mr-2"/>
                        <span>Add review</span>
                    </div>
                </div>
                <div className="xl:col-span-2 text-left" >
                    <label className="block tracking-wide mb-2 text-xs">
                        Location
                    </label>
                    <PlacesSearchInput name="address" onPlaceChange={handleLocationChange} onReset={resetState} reviewData={props.reviewData} editMode={props.editMode}/>
                </div>
                <div className="text-left">
                    <label className="block tracking-wide mb-2 text-xs">Type</label>
                    <select
                        name="type"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        defaultValue={props.reviewData?.type}
                        
                    >   
                        { foodType.map(type => {
                            return <option key={type} className="text-gray-300" value={type}>{type}</option>
                        })}
                    </select>
                </div>
                <div className="text-left">
                    <label className="block tracking-wide mb-2 text-xs">Price range</label>
                    <select
                        name="priceRange"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" 
                        defaultValue={props.reviewData?.priceRange}
                        
                    >   
                        <option className="text-gray-300" value="$">$</option>
                        <option className="text-gray-300" value="$$">$$</option>
                        <option className="text-gray-300" value="$$$">$$$</option>
                        <option className="text-gray-300" value="$$$$">$$$$</option>
                        
                    </select>
                </div>
                <div className="text-left" >
                    <label className="block tracking-wide mb-2 text-xs">
                        Food satisfaction
                    </label>
                    <StarRating name="foodRating" onReset={resetState} reviewData={props.reviewData} editMode={props.editMode}/>
                </div>
                <div className="text-left" >
                    <label className="block tracking-wide mb-2 text-xs">
                        Vibes
                    </label>
                    <StarRating name="vibesRating" onReset={resetState} reviewData={props.reviewData} editMode={props.editMode}/>
                </div>
                <div className="text-left" >
                    <label className="block tracking-wide mb-2 text-xs">
                        Service & staff
                    </label>
                    <StarRating name="serviceRating" onReset={resetState} reviewData={props.reviewData} editMode={props.editMode}/>
                </div>
                <div className="text-left" >
                    <label className="block tracking-wide mb-2 text-xs">
                        Worth it
                    </label>
                    <StarRating name="worthRating" onReset={resetState} reviewData={props.reviewData} editMode={props.editMode}/>
                </div>
                <div className="xl:col-span-2 xl:row-span-3 text-left" >
                    <label htmlFor="message" className="block tracking-wide mb-2 text-xs">Comments</label>
                    <textarea 
                        name="comments"
                        id="message" 
                        rows={3} 
                        className="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" 
                        placeholder="hmm..."
                        />
                        
                </div>
                <div className="xl:col-span-2" >
                    <FileUploader onUpload={handleUploadFiles}/>
                </div>
                <div className="xl:col-span-2 text-left">
                    {props.editMode ? (
                        <button type="button" className="rounded-lg border border-gray-300 px-8 py-1 mt-2 mr-2" onClick={handleEditSave}>Save &#x3A;&#41;</button>
                    ) : (
                        <button type="submit" className="rounded-lg border border-gray-300 px-8 py-1 mt-2">Submit &#x3A;&#41;</button>
                )}


                    
                </div>
            </div>
        </form>
    )
}