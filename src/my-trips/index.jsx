import { useEffect } from "react";
import { useNavigation } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useState } from "react";
import MyTripCard from "./components/MyTripCard.jsx";
import { Skeleton } from "@/components/ui/skeleton"

function MyTrips() {
  const navigate = useNavigation();
  const [myTrips, setMyTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setMyTrips([]); 
    GetMyTrips();
  }, []);
  const GetMyTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }
    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user.email)
    );
    const querySnapshot = await getDocs(q);
    const trips = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      trips.push(doc.data());
    });

    setMyTrips(trips);
    setIsLoading(false);
  };

  return (
  <div className="px-5 sm:px-10 md:px-32 lg:px-56 xl:px-10 mt-10">
    <h2 className="font-bold text-3xl my-10">My Trips</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {isLoading ? (
        // Show loading skeletons
        Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-60 w-full rounded-lg" />
        ))
      ) : myTrips.length > 0 ? (
        // Render trip cards
        myTrips.map((trip, index) => <MyTripCard trip={trip} key={index} />)
      ) : (
        // Show message when no trips found
        <p className="col-span-full text-center text-gray-500">
          No trips found. Create a new trip!
        </p>
      )}
    </div>
  </div>
);

}

export default MyTrips;
