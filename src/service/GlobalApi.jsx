import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchText";
const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=300&maxWidthPx=600&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
    "X-Goog-FieldMask": ["places.photos", "places.displayName", "places.id"],
  },
};

const GetPlaceDetails = (data) => {
  try {
    console.log("Request Data:", data); // Log the request data
    const response = axios.post(BASE_URL, data, config);
    console.log("Response Data:", response.data); // Log the response data
    return response;
  } catch (error) {
    console.error("Error fetching place details:", error);
  } 
};

const GetPlacePhoto = async (location) => {
  try {
    const data = {
      textQuery: location,
    };
    const res = await GetPlaceDetails(data);
    const photoName = res.data.places[0]?.photos?.[3]?.name; // safer indexing
    if (!photoName) throw new Error("No photo found");

    const photoUrl = PHOTO_REF_URL.replace("{NAME}", photoName);
    console.log("Generated Photo URL:", photoUrl);
    return photoUrl; // return this
  } catch (error) {
    console.error("Error getting photo:", error);
    return null;
  }
};


export { GetPlaceDetails, GetPlacePhoto };
