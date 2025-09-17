import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const API_BASE_URL = "http://localhost:5000/api"; 
const POLL_INTERVAL = 5000; // 5 seconds

function SoilEnquiry() {
  const [entries, setEntries] = useState([]);
  const [latestReading, setLatestReading] = useState({ ph: null, moisture: null, N: null, P: null, K: null });
  const [states, setStates] = useState({ ph: "", moisture: "", N: "", P: "", K: "" });

  const token = localStorage.getItem("token");

  // Calculate state based on normal ranges
  const calculateState = (reading) => {
    const normalRanges = {
      ph: { min: 6.0, max: 7.5 },
      moisture: { min: 20, max: 60 },
      N: { min: 0.1, max: 0.5 },
      P: { min: 0.05, max: 0.3 },
      K: { min: 0.1, max: 0.6 },
    };
    const result = {};
    for (const key in reading) {
      const val = reading[key];
      if (val === null || val === undefined) {
        result[key] = "";
      } else if (val < normalRanges[key].min) {
        result[key] = "Low";
      } else if (val > normalRanges[key].max) {
        result[key] = "High";
      } else {
        result[key] = "Normal";
      }
    }
    return result;
  };

  // Fetch previous entries from backend
  const fetchPreviousEntries = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/soil`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.length > 0) {
        const latest = res.data[res.data.length - 1].sensorReadings;
        setLatestReading(latest);
        setStates(calculateState(latest));
      }
      setEntries(res.data.reverse()); // latest first
    } catch (err) {
      console.error("Error fetching soil entries:", err);
    }
  };

  useEffect(() => {
    fetchPreviousEntries(); // initial fetch

    const interval = setInterval(() => {
      fetchPreviousEntries();
    }, POLL_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  // Manual Analyze (optional)
  const analyzeReading = () => {
    const calculated = calculateState(latestReading);
    setStates(calculated);
    setEntries([{ sensorReadings: latestReading, states: calculated, createdAt: new Date(), _id: Date.now() }, ...entries]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLatestReading({ ...latestReading, [name]: value !== "" ? parseFloat(value) : null });
  };

  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-6 py-6">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">Soil Enquiry</h1>

        {/* Input form */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-8 max-w-lg mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-center">Enter Current Sensor Readings</h2>
          {["ph", "moisture", "N", "P", "K"].map((key) => (
            <div key={key} className="mb-4">
              <label className="block font-medium mb-1">{key.toUpperCase()}</label>
              <input
                type="number"
                name={key}
                value={latestReading[key] ?? ""}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder={`Enter ${key.toUpperCase()} value or leave blank`}
              />
            </div>
          ))}

          <button
            onClick={analyzeReading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
          >
            Analyze
          </button>
        </div>

        {/* Display previous entries */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entries.map((entry, index) => (
            <div
              key={entry._id}
              className={`p-4 border rounded shadow-sm ${index === 0 ? "border-2 border-orange-500" : ""}`}
            >
              <h3 className="font-semibold mb-2 text-center">
                {new Date(entry.createdAt).toLocaleString()}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {["ph", "moisture", "N", "P", "K"].map((key) => {
                  const value = entry.sensorReadings[key];
                  const state = entry.states ? entry.states[key] : "";
                  return (
                    <div key={key} className="p-2 border rounded text-center">
                      <p className="font-medium">{key.toUpperCase()}</p>
                      <p className="text-xl">{value != null ? value : "No data"}</p>
                      {value != null && state && (
                        <p
                          className={`font-semibold mt-1 ${
                            state === "High"
                              ? "text-red-600"
                              : state === "Low"
                              ? "text-blue-600"
                              : state === "Normal"
                              ? "text-green-600"
                              : "text-gray-600"
                          }`}
                        >
                          {state}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default SoilEnquiry;
