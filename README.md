# 🌍 ItinerAI – AI-Powered Travel Itinerary Generator

[![React](https://img.shields.io/badge/Frontend-React.js-61DAFB?logo=react)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Backend-Firebase-FFCA28?logo=firebase)](https://firebase.google.com/)
[![Google Gemini](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-4285F4?logo=google)](https://ai.google.dev/)
[![TailwindCSS](https://img.shields.io/badge/UI-TailwindCSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)


---

## ✨ Overview

**ItinerAI** is an **AI-powered trip planner** that generates personalized travel itineraries in seconds.  
Users simply enter details like their **destination, travel duration, budget,** and **companions**, and the app uses **Google Gemini AI** to create a complete travel plan — including hotels, attractions, timings, and recommendations.

---

## 🎯 Features

- 🤖 **AI Travel Planner** – Generates day-by-day itineraries using **Google Gemini 2.5 Flash**
- 🏨 **Hotel Recommendations** – Suggests realistic hotel options with price, ratings, and images
- 📸 **Google Places API Integration** – Fetches live photos for hotels and destinations
- 🔐 **Google OAuth Authentication** – Secure sign-in and user session management
- ☁️ **Cloud Database** – Saves user-generated trips using **Firebase Firestore**
- 💾 **My Trips Dashboard** – View and revisit previously generated itineraries
- 💡 **Responsive UI** – Built with **TailwindCSS** and optimized for all devices

---

## 🧩 Tech Stack

| Layer | Technologies |
|--------|---------------|
| **Frontend** | React.js, Vite, TailwindCSS |
| **Backend** | Firebase Firestore |
| **Authentication** | Google OAuth (`@react-oauth/google`) |
| **AI Integration** | Google Gemini 2.5 Flash via `@google/genai` SDK |
| **External APIs** | Google Places API |
| **UI Libraries** | Radix UI, Sonner (toast notifications), React Icons |

---

## 🧠 How It Works

1. User signs in via **Google OAuth**  
2. Inputs travel details *(location, days, budget, type of traveler)*  
3. App builds a **custom AI prompt** → sent to **Gemini 2.5 Flash**  
4. Gemini responds with a structured **JSON itinerary**  
5. The data is stored in **Firebase Firestore** and rendered in the UI  

---

## 💡 Future Improvements

- 🗺️ Interactive **map view** of itineraries  
- 💬 Trip sharing with friends and social export options  
- ✈️ Live flight and cost estimations  
- 💾 Offline trip access and export as PDF  
