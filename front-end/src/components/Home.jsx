import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import bgVideo from "../assets/bg1.mp4";

// React Icons
import { FaTractor, FaCloudSunRain, FaSeedling } from "react-icons/fa";
import { GiPlantRoots } from "react-icons/gi"; // Fixed icon import

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="text-center py-8 px-4 relative">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover -z-10"
          >
            <source src={bgVideo} type="video/mp4" />
          </video>
          <div className="absolute top-0 left-0 w-full h-full bg-black/40 -z-5"></div>
          <h1 className="text-2xl md:text-3xl font-light text-white italic max-w-3xl mx-auto">
            “Next to the Word of God, the noble art of{" "}
            <span className="text-orange-500 font-semibold">farming</span> is the
            greatest treasure in the world.”
          </h1>
          <p className="mt-4 text-white">- Inspired by Martin Luther</p>
        </div>

        {/* Services Section */}
        <div className="flex flex-wrap justify-center gap-6 py-10 bg-white">
          {/* Organic Farming */}
          <div className="w-64 p-6 bg-white rounded-xl shadow-md border text-center hover:shadow-lg transition">
            <div className="text-orange-500 text-4xl mb-2">
              <FaTractor />
            </div>
            <h3 className="text-lg font-semibold text-orange-600">Organic Farming</h3>
            <p className="text-gray-600 text-sm mt-1">
              Basics of Organic Farming <br /> Health status of crops
            </p>
            <button
              onClick={() => navigate("/upload")}
              className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition"
            >
              Enquire
            </button>
          </div>

          {/* Soil Management */}
          <div className="w-64 p-6 bg-white rounded-xl shadow-md border text-center hover:shadow-lg transition">
            <div className="text-orange-500 text-4xl mb-2">
              <GiPlantRoots />
            </div>
            <h3 className="text-lg font-semibold text-orange-600">Soil Management</h3>
            <p className="text-gray-600 text-sm mt-1">
              Soil Science & Fertility <br /> Advanced Soil Management
            </p>
            <button
              onClick={() => navigate("/soil-enquiry")}
              className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition"
            >
              Enquire
            </button>
          </div>

          {/* Weather */}
          <div className="w-64 p-6 bg-white rounded-xl shadow-md border text-center hover:shadow-lg transition">
            <div className="text-orange-500 text-4xl mb-2">
              <FaCloudSunRain />
            </div>
            <h3 className="text-lg font-semibold text-orange-600">Weather</h3>
            <p className="text-gray-600 text-sm mt-1">
              Today's weather forecast <br /> Geographical details
            </p>
            <button
              onClick={() => navigate("/weather")}
              className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition"
            >
              Enquire
            </button>
          </div>

          {/* Crop Production */}
          <div className="w-64 p-6 bg-white rounded-xl shadow-md border text-center hover:shadow-lg transition">
            <div className="text-orange-500 text-4xl mb-2">
              <FaSeedling />
            </div>
            <h3 className="text-lg font-semibold text-orange-600">Crop Production</h3>
            <p className="text-gray-600 text-sm mt-1">
              Short-term Crop Planning <br /> Seasonal Crop Cycles
            </p>
            <button
              onClick={() => alert("Crop Production functionality coming soon!")}
              className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition"
            >
              Enquire
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
