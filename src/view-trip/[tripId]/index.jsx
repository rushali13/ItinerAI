import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import Hotels from "../components/Hotels";
import InfoSection from "../components/InfoSection";
import PlacesToVisit from "../components/PlacesToVisit";

function ViewTrip() {
  const { tripId } = useParams();
  const [tripData, setTripData] = useState([]);

  useEffect(() => {
    const fetchTripData = async () => {
      if (tripId) {
        const docRef = doc(db, "AITrips", tripId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document:", docSnap.data());
          setTripData(docSnap.data());
        } else {
          toast("No Trip Found!");
        }
      }
    };
    fetchTripData();
  }, [tripId]);
  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      <InfoSection trip={tripData} />
      <Hotels trip={tripData} />
      <PlacesToVisit trip={tripData} />
    </div>
  );
}

export default ViewTrip;
