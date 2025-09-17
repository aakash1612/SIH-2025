// frontend/src/components/Weather.jsx
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import weatherbg from "../assets/weatherbg.mp4"; // Your background video

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetch("/cities.json")
      .then((res) => res.json())
      .then((data) => setCities(data.map((c) => c.name)))
      .catch((err) => console.error("Error loading cities.json:", err));
  }, []);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setWeather(null);
    try {
      const res = await fetch(`http://localhost:5000/api/weather?location=${city}`);
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch weather");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={weatherbg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional Dark Overlay for readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-5"></div>

      {/* Navbar */}
      <div className="relative z-10">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-1 p-6 relative z-10 mt-16 mb-16">
        <div className="bg-white bg-opacity-90 rounded-2xl shadow-md p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center">5-Day Weather Forecast</h1>

          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border p-2 rounded-lg mb-4"
          >
            <option value="">Select City</option>
            {cities.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>

          <button
            onClick={fetchWeather}
            disabled={!city || loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Fetching..." : "Get Forecast"}
          </button>

          {weather && weather.forecast && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-center">{weather.city}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {weather.forecast.map((day, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-lg shadow text-center">
                    <p className="font-bold">{day.date}</p>
                    <p>🌡 {day.temperature}°C</p>
                    <p>{day.description}</p>
                    <p>💧 {day.humidity}% | 🌬 {day.wind} m/s</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Weather;
