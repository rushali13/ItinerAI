import { GetPlacePhoto } from "@/service/GlobalApi";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function MyTripCard({ trip }) {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    const fetchPhoto = async () => {
      const url = await GetPlacePhoto(trip?.userSelection?.location);
      if (url) setPhotoUrl(url);
      console.log("Photo URL:", url);
    };

    if (trip?.userSelection?.location) {
      fetchPhoto();
    }
  }, [trip]);
  return (
    <Link
      to={`/view-trip/${trip?.id}`}
      className="border p-3 rounded-lg hover:shadow-lg transition-shadow duration-300"
    >
      <div>
        <img
          src={photoUrl || "placeholder.png"}
          className="w-full h-40 object-cover rounded-lg"
        />
        <div>
          <h2 className="font-bold text-lg">{trip?.userSelection?.location}</h2>
          <p className="text-sm text-gray-500">
            {trip?.userSelection?.noOfDays}{" "}
            {trip?.userSelection?.noOfDays > 1 ? "Days" : "Day"} trip with{" "}
            {trip?.userSelection?.budget} Budget
          </p>
        </div>
      </div>
    </Link>
  );
}

MyTripCard.propTypes = {
  trip: PropTypes.object.isRequired,
};

export default MyTripCard;
