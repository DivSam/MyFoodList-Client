import React, { useEffect, useRef, useState } from "react";
import { PlaceDetail, getGoogleMapsApiClient } from "../lib/googleApiClient";
import { Review } from "../types/types";

interface PlacesSearchInputProps {
  name: string;
  onPlaceChange: (details: PlaceDetail) => void;
  onReset: boolean;
  reviewData: Review | null;
  editMode: boolean;
}

export default function PlacesSearchInput(props: PlacesSearchInputProps) {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [placeDetail, setPlaceDetail] = useState<any>();

  const sessionTokenRef = useRef<string>();

  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setValue("");
}, [props.onReset]);

useEffect(() => {
  if (props.reviewData && props.editMode) {
    setValue(props.reviewData.name);
    setPlaceDetail(props.reviewData.details);
  }else{
    setValue("");
  }
}, [props.reviewData, props.editMode]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!newValue || newValue.trim().length <= 3) {
      setSuggestions([]);
      return;
    }

    timeoutRef.current = setTimeout(async () => {
      const google = await getGoogleMapsApiClient();

      if (!sessionTokenRef.current) {
        sessionTokenRef.current =
          new google.maps.places.AutocompleteSessionToken();
      }

      new google.maps.places.AutocompleteService().getPlacePredictions(
        {
          input: newValue,
          sessionToken: sessionTokenRef.current,
        },
        (predictions: any, status: any) => {
          if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
            setSuggestions([]);
            return;
          }
          if (
            status !== google.maps.places.PlacesServiceStatus.OK ||
            !predictions
          ) {
            alert(status);
            return;
          }
          setSuggestions(predictions);
        }
      );
    }, 350);
  };

  const handleSuggestionSelected = async (suggestion: any) => {
    setValue(suggestion.description);
    setSuggestions([]);

    const google = await getGoogleMapsApiClient();

    const sessionToken = sessionTokenRef.current;
    sessionTokenRef.current = undefined;

    new google.maps.places.PlacesService(
      document.getElementById("googlemaps-attribution-container")!
    ).getDetails(
      {
        placeId: suggestion.place_id,
        fields: [
          "formatted_address",
          "name",
          "place_id",
          "geometry.location",
        ],
        sessionToken,
      },
      (place: any, status: any) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          setPlaceDetail(place);
          props.onPlaceChange(place);
        }
      }
    );
  };

  return (
    <>
        <input
          id="location-input"
          name={props.name}
          className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"}
          placeholder="Enter an address or a place name"
          onChange={handleChange}
          value={value}
          list="mapSuggestions"
          required
        />
        {suggestions.length > 0 && (
          <div>
            <ul className="" role="listbox">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.place_id}
                  className="text-xs bg-gray-50 border border-gray-300 px-2.5 py-1 m-1 truncate"
                  tabIndex={-1}
                  role="option"
                  aria-selected="false"
                  onClick={() => handleSuggestionSelected(suggestion)}
                >
                  {suggestion.description}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div id="googlemaps-attribution-container"></div>
    </>
  );
}
