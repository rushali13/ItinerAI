// import React from "react";
import PropTypes from "prop-types";
import PlaceCard from "./PlaceCard";

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-lg my-5">Places to Visit</h2>
      <div>
        {trip?.tripData?.itinerary?.map((plan, index) => (
          <div key={index} >
            <h2 className="font-medium text-lg">{"Day " + plan.day}</h2>
            <div className="grid grid-cols-1 gap-2" >
              {plan.places.map((place, index) => (
                <div className="my-3" key={index}>
                  <h2 className="font-medium, text-sm text-orange-800">
                    🕰️ {place?.bestTimeToVisit}
                  </h2>
                  <PlaceCard place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

PlacesToVisit.propTypes = {
  trip: PropTypes.shape({
    tripData: PropTypes.shape({
      itinerary: PropTypes.arrayOf(
        PropTypes.shape({
          day: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          places: PropTypes.arrayOf(
            PropTypes.shape({
              bestTimeToVisit: PropTypes.string,
              // Add other place properties as needed
            })
          )
        })
      )
    })
  })
};

export default PlacesToVisit;

