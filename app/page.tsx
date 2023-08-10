"use client";

import { useEffect, useState } from "react";
import {Form} from "./components/form";
import Tabs from "./components/tabs";
import ListReviews from "./components/listReviews";
import MapComponent from "./components/map";
import { BarChart } from "./components/barChart";
import { LatLng, Review } from "./types/types";
import { useSession } from "next-auth/react";
import OverallList from "./components/bigList";
import Calendar from "./components/calendar";


export default function Home() {
  const [activeTab, setActiveTab] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [submitState, setSubmitState] = useState<boolean>(false);
  const [reviewData, setReviewData] = useState<Review | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const {data: session} = useSession();
  const [deleteState, setDeleteState] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<LatLng | null>(null);

  useEffect(() => {
      if (session && session.user){
        fetch(`https://food-guide-392203.nn.r.appspot.com/reviews/${session.user.email}`)
        .then(response => response.json())
        .then(data => {
          setReviews(data) 
        });
        getCurrentLocation();
      }else{
        setReviews([]);
      }
  }, [submitState, editMode, session, deleteState]);

  const onSubmit = () => {
    setSubmitState(prevState => !prevState);
  }
  
  const changeTab = (tab: string) =>{
    setActiveTab(tab);
  }

  const handleEditModesChange = (editMode: boolean) => {
    setEditMode(editMode);
  }  

  const handleDelete = () => { 
  setDeleteState(prevState => !prevState);
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const setTab = () => {
    switch(activeTab) { 
      case "list": { 
       
          if (session && session.user){
            return (
              <ListReviews 
                reviews={reviews}
                onEditCollectReviewData={setReviewData} 
                onEditModeChange={setEditMode} 
                editMode={editMode} 
                reviewData={reviewData}
                delete={handleDelete}
              />
          )
          }else{
            return (<div> Please sign in to see your reviews </div>)
          }
        
      }
      case "overallList": {
        return (<OverallList />)
      }
      case "map": { 
        if (session && session.user){
          return (<MapComponent reviews={reviews} currentLocation={currentLocation} />)
        }else{
          return (<div> Please sign in to see your reviews on the Map! </div>)
        }
      } 
      case "calendar": { 
        return (<Calendar/>)
      }
      case "bar": { 
        return (<BarChart />)
      }
     
      default: { 
        //statements; 
        break; 
      } 
   }
  }

  return (
    <main className="flex min-h-screen flex-col justify-stretch p-16 bg-white">
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 justify-stretch font-mono text-gray-500 text-sm text-center leading-6 rounded-lg h-full">
        <div className="col-span-2 p-4 rounded-lg border border-gray-400">
          <Tabs changeTab={changeTab} />
          <div className="h-full flex max-h-[calc(100vh-14rem)] overflow-y-auto flex-col flex-grow">{ setTab() }</div>
        </div>
        <div className="col-span-2 xl:col-span-1 p-4 rounded-lg border border-gray-400">
          {session && session.user ? (
            <Form onSubmit={onSubmit}
            reviewData={reviewData} 
            editMode={editMode} 
            onEditModeChange={handleEditModesChange}
            session={session}
            />
          ) : ( <div> Please sign in to add a review </div>)
          }
          
        </div>
      </div>
    </main>
  )
}
