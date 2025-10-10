export const SelectTravelList = [
	{
		id: 1,
		title: "Just Me",
		description: "A Sole travels in exploration",
		icon: "✈️",
		people: "1 people",
	},
	{
		id: 2,
		title: "A Couple",
		description: "Two travels in tandem",
		icon: "🥂",
		people: "2 people",
	},
	{
		id: 3,
		title: "Family",
		description: "A group of fum loving adv",
		icon: "🏡",
		people: "3 to 5 people",
	},
	{
		id: 4,
		title: "Friends",
		description: "A bunch of thrill-seeks",
		icon: "⛵",
		people: "5 to 10 people",
	},
];

export const SelectBudgetOptions = [
	{
		id: 1,
		title: "Cheap",
		description: "Stay conscious of costs",
		icon: "💵",
	},
	{
		id: 2,
		title: "Moderate",
		description: "Keep cost on the average side",
		icon: "💰",
	},
	{
		id: 3,
		title: "Luxury",
		description: "Don't worry about cost",
		icon: "💸",
	},
];

// export const AI_PROMPT = "Generate Travel Plan for Location : {location} for {totalDays} Days for {traveller} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, provide accurate hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, provide accurate Place Image Url, Geo Coordinates, ticket pricing, time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format."

export const AI_PROMPT = `
You are a travel planner AI. Generate a travel plan for:
Location: {location}
Duration: {totalDays} days
Traveler type: {traveller}
Budget: {budget}

Return the response strictly in the following JSON schema (do not include extra text or Markdown formatting):

{
  "tripDetails": {
    "location": "string",
    "durationDays": number,
    "travellerType": "string",
    "budget": "string",
    "overview": "string"
  },
  "hotels": [
    {
      "hotelName": "string",
      "address": "string",
      "pricePerNight": "string",
      "rating": number,
      "description": "string",
      "imageUrl": "string (publicly available image link)",
      "geoCoordinates": {
        "latitude": number,
        "longitude": number
      }
    }
  ],
  "itinerary": [
    {
      "day": number,
      "places": [
        {
          "placeName": "string",
          "placeDetails": "string",
          "bestTimeToVisit": "string",
          "ticketPricing": "string",
          "travelTime": "string",
          "geoCoordinates": {
            "latitude": number,
            "longitude": number
          },
          "imageUrl": "string (publicly available image link)"
        }
      ]
    }
  ]
}

Important:
- Respond ONLY with valid JSON matching the schema above.
- Do not include \`\`\`json or any other markdown formatting.
- Ensure all URLs and coordinates are realistic and public.
`;




