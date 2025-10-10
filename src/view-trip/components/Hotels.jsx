import PropTypes from "prop-types";
import HotelCard from "./HotelCard";

function Hotels({ trip }) {

	
	return (
		<div>
			<h2 className="font-bold text-xl my-5">Hotel Recommendations</h2>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
				{console.log(trip?.tripData?.hotels)}
				{trip?.tripData?.hotels?.map((hotel, index) => (
					<HotelCard key={index} hotel={hotel} />
				))}
			</div>
		</div>
	);
}
Hotels.propTypes = {
	trip: PropTypes.object
};


export default Hotels;
