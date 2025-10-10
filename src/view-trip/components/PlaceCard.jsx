// import { FaLocationDot } from "react-icons/fa6";
// import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { GetPlacePhoto } from "@/service/GlobalApi";

function PlaceCard({ place }) {
    const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    const fetchPhoto = async () => {
      const url = await GetPlacePhoto(place?.placeName);
      if (url) setPhotoUrl(url);
      console.log("Photo URL:", url);
    };

    if (place?.placeName) {
      fetchPhoto();
    }
  }, [place]);
  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        place?.geoCoordinates?.latitude +
        "%2C" +
        place?.geoCoordinates?.longitude
      }
      target="_blank"
    >
      <div className="shadow-md p-3 mt-2 rounded-xl flex gap-5 hover:scale-105 transition-all">
        <img
          src={photoUrl || "/placeholder.png"}
          className="w-[130px] h-[130px] rounded-xl"
        />
        <div className="flex flex-col gap-2">
          <h2 className="font-medium text-md">{place?.placeName}</h2>
          <p className="text-sm text-gray-600">{place?.placeDetails}</p>
          <h2>
            🕗{" "}
            {place?.travelTime === "N/A (starting point)"
              ? "Starting point"
              : place?.travelTime}
          </h2>
         
        </div>
      </div>
    </Link>
  );
}

PlaceCard.propTypes = {
  place: PropTypes.shape({
    geoCoordinates: PropTypes.shape({
      latitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      longitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    placeName: PropTypes.string,
    placeDetails: PropTypes.string,
    travelTime: PropTypes.string,
  }).isRequired,
};

export default PlaceCard;
