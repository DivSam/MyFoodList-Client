import { useEffect, useRef, useState } from 'react';
import { Review,LatLng } from '../types/types';
import { getGoogleMapsApiClient } from '../lib/googleApiClient';
import { mapStyles } from '../lib/mapStyles';
interface MapMarkerProps {
  reviews: Review[];
  currentLocation: LatLng | null;
}


const MapComponent = (props: MapMarkerProps) => {
    const mapContainerRef = useRef(null);
    var currentInfoWindow: any;

    useEffect(() => {
      // Fetch data and initialize the map here
      fetchDataAndInitializeMap();
    },);

    const fetchDataAndInitializeMap = async () => {
      const google = getGoogleMapsApiClient();
      google.then((google) => {
        if (!mapContainerRef.current) return;
        const map = new google.maps.Map(mapContainerRef.current, {
          center: props.currentLocation, 
          zoom: 12, 
        });
        // create style for map
        map.setOptions({ styles: mapStyles });

        if (!props.reviews) return;

        props.reviews.forEach((item:Review) => {
            const lat = item.details?.geometry?.location.lat;
            const lng = item.details?.geometry?.location.lng;
            if (lat && lng){
              const marker = new google.maps.Marker({
                position: { lat: lat, lng: lng }, // Use the fetched lat and lng values
                map: map,
                title: item.name, 
            });

            const contentString = `<div id="content">
            <div id="siteNotice">
            </div>
            <h1 id="firstHeading" class="firstHeading">${item.name}</h1>
            <div id="bodyContent">
            <p>${item.details?.formatted_address}</p>
            <h1> Overall Score: ${item.overallScore}</h1>
            </div>
            </div>`;
            const infowindow = new google.maps.InfoWindow({
              content: contentString,
            });
            marker.addListener("click", () => {
              
              if (currentInfoWindow) {
                currentInfoWindow.close();
              }
              infowindow.open({
                anchor: marker,
                map,
              });
              currentInfoWindow = infowindow;
            }
            );

          }

          });
      });
    };
    
    return (
      <div>
      <div ref={mapContainerRef} style={{ width: '100%', height: '800px' }}> </div>
      </div>
    );
    
   
  };
  
  export default MapComponent;