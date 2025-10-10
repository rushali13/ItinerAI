import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetPlacePhoto } from "@/service/GlobalApi";
import PropTypes from "prop-types";

function HotelCard({ hotel, index }) {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    const fetchPhoto = async () => {
      const url = await GetPlacePhoto(hotel?.hotelName);
      if (url) setPhotoUrl(url);
      console.log("Photo URL:", url);
    };

    if (hotel?.hotelName) {
      fetchPhoto();
    }
  }, [hotel]);

  return (
    <Link
      key={index}
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        hotel?.hotelName +
        " " +
        hotel?.hotelAddress
      }
      target="_blank"
    >
      <div className="hover:scale-105 transition-all cursor-pointer">
        <img src={photoUrl || "/placeholder.png"} className="rounded-xl" />
        <div className="my-2 flex flex-col gap-2">
          <h2 className="font-medium">{hotel?.hotelName}</h2>
          <h2 className="text-xs text-gray-500">📍{hotel?.address}</h2>
          <h2 className="text-sm">🪙 {hotel?.pricePerNight} per night</h2>
          <h2 className="text-xs">⭐ {hotel?.rating}</h2>
        </div>
      </div>
    </Link>
  );
}
HotelCard.propTypes = {
  hotel: PropTypes.shape({
    hotelName: PropTypes.string,
    address: PropTypes.string,
    pricePerNight: PropTypes.string,
    rating: PropTypes.string,
    hotelAddress: PropTypes.string,
  }).isRequired,
  index: PropTypes.number,
};
export default HotelCard;
