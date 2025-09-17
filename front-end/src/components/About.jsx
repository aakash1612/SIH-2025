import React from "react";
import Navbar from "./Navbar"
import Footer from "./Footer"

function About() {
  return (
    <div className="min-h-screen gap-0 flex-col justify-center">
    <Navbar></Navbar>
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6 mb-0">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">About Us</h1>

      <div className="bg-white shadow-lg rounded-xl p-6 max-w-3xl w-full space-y-4 border border-gray-200">
        <p>
          <span className="font-semibold">Problem Statement ID:</span> 25099
        </p>
        <p>
          <span className="font-semibold">Problem Statement Title:</span> 
          AI-powered monitoring of crop health, soil condition and pest risks using multispectral/hyperspectral imaging and sensor data.
        </p>
        <p>
          <span className="font-semibold">Theme:</span> Agriculture, Food Tech & Rural Development
        </p>
        <p>
          <span className="font-semibold">PS Category:</span> Software
        </p>
        <p>
          <span className="font-semibold">Team ID:</span> T133
        </p>
        <p>
          <span className="font-semibold">Team Name:</span> Future Makers
        </p>
      </div>
    </div>
    <Footer ></Footer>
    </div>
    
  );
}

export default About;
