// import { Button } from "@/components/ui/button";
// import { IoIosSend } from "react-icons/io";
import { useState, useEffect } from "react";
import { GetPlacePhoto } from "@/service/GlobalApi";

function InfoSection({ trip }) {
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
    <div>
      <img
        src={photoUrl || "/placeholder.png"}
        alt="Location"
        className="h-[300px] w-full object-cover rounded-xl"
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            📍{trip?.userSelection?.location}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              📅 {trip?.userSelection?.noOfDays} Day
              {trip?.userSelection?.noOfDays > 1 && "s"}
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💰 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🧑‍🤝‍🧑 {trip?.userSelection?.traveller}
            </h2>
          </div>
        </div>
        <div>
          {/* <Button>
            <IoIosSend />
          </Button> */}
        </div>
      </div>
    </div>
  );
}

import PropTypes from "prop-types";

InfoSection.propTypes = {
  trip: PropTypes.object.isRequired,
};

export default InfoSection;
