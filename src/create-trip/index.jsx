import { Button } from "@/components/ui/button.jsx";
import { generateTravelPlan } from "@/service/AiModal.jsx";
import { db } from "@/service/firebaseConfig.jsx";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Input } from "../components/ui/input.jsx";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelList,
} from "../constants/options.jsx";
import SignInDialog from "@/components/custom/SignInDialog.jsx";


function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenerateTrips = async () => {
    const user = localStorage.getItem("user");
    console.log("User:", user);
    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (formData?.noOfDays > 5) {
      toast("Please select days less than or equal to 5");
      return;
    }
    if (
      !formData?.noOfDays ||
      !formData?.location ||
      !formData?.budget ||
      !formData?.traveller
    ) {
      toast("Please fill all details");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveller}", formData?.traveller)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    try {
      const result = await generateTravelPlan(FINAL_PROMPT);
      setLoading(false);
      console.log("AI Result:", result);
      saveAiTrip(result);
    } catch (err) {
      setLoading(false);
      console.error("AI Error:", err);
      toast("Failed to generate travel plan. Please try again.");
    }
  };

  const saveAiTrip = async (tripData) => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const docId = Date.now().toString();
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: tripData,
        userEmail: user?.email,
        id: docId,
      });
      setLoading(false);
      navigate("/view-trip/" + docId);
    } catch (err) {
      setLoading(false);
      console.error("Firestore Error:", err);
      toast("Failed to save trip data. Please try again.");
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏖️🏕️
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>
      <div className="mt-10 flex flex-col gap-9">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v.label);
              },
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder="Eg. 3"
            type="number"
            onChange={(e) => {
              handleInputChange("noOfDays", e.target.value);
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                  formData?.budget == item.title && "shadow-lg border-black"
                }`}
                onClick={() => {
                  handleInputChange("budget", item.title);
                }}
              >
                <h2 className="text-3xl text-right">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.description}</h2>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan travelling with in your next adventure?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelList.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  handleInputChange("traveller", item.people);
                }}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                  formData?.traveller == item.people && "shadow-lg border-black"
                }`}
              >
                <h2 className="text-3xl text-right">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.description}</h2>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end mb-10">
          <Button disabled={loading} onClick={handleGenerateTrips}>
            {loading ? (
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
            ) : (
              "Generate"
            )}
          </Button>
        </div>
      </div>
      <SignInDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </div>
  );
}
export default CreateTrip;
