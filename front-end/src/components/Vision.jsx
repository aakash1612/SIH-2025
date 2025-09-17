import React from "react";
import Navbar from"./Navbar"
import Footer from "./Footer"
const Vision = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-100 to-green-200">
        <Navbar></Navbar>
      {/* Header Section */}
      <div className="bg-green-700 text-white text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold">Our Vision</h1>
        <p className="mt-0 text-lg md:text-xl max-w-3xl mx-auto">
          Harnessing the power of <span className="font-semibold text-yellow-300">AI</span>, 
          <span className="font-semibold text-yellow-300"> multispectral/hyperspectral imaging</span>, 
          and <span className="font-semibold text-yellow-300">sensor data</span> to transform agriculture 
          into a smarter, more sustainable future.
        </p>
      </div>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-6">
            Problem Statement
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Farmers often struggle to monitor <span className="font-semibold">crop health</span>, 
            maintain <span className="font-semibold">soil quality</span>, and 
            predict <span className="font-semibold">pest risks</span> effectively. Traditional methods 
            are time-consuming, less accurate, and reactive rather than proactive.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-green-700 mt-10 mb-6">
            Our Solution
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We aim to build an <span className="font-semibold">AI-powered platform</span> that integrates:
          </p>

          <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
            <li>🚜 <strong>Crop Health Monitoring:</strong> Using multispectral/hyperspectral imaging to detect stress and diseases early.</li>
            <li>🌱 <strong>Soil Condition Analysis:</strong> Real-time soil quality insights using IoT and sensor data.</li>
            <li>🪲 <strong>Pest Risk Prediction:</strong> AI models to forecast pest outbreaks and recommend preventive measures.</li>
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold text-green-700 mt-10 mb-6">
            Impact
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our vision is to empower farmers with <span className="font-semibold">data-driven decisions</span>, 
            reduce crop losses, optimize resource use, and promote sustainable farming practices worldwide.
          </p>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default Vision;
