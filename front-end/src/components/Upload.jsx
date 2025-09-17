import React, { useRef, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import agri from "../assets/agri.mp4"; // ✅ Import your background video

const API_BASE_URL = "http://localhost:5000/api"; // backend base URL

function Upload() {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(selectedFile ? URL.createObjectURL(selectedFile) : null);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select an image!");

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      setResult(null);
      const token = localStorage.getItem("token");

      const res = await axios.post(`${API_BASE_URL}/analysis/analyze`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setResult({
        predicted_class: res.data.predicted_class,
        confidence: res.data.confidence,
        grain_weight: res.data.grain_weight,
        gsw: res.data.gsw,
        psii: res.data.psii,
        fertilizer_status: res.data.fertilizer_status,
        crop_status: res.data.crop_status,
      });
    } catch (err) {
      console.error("Error analyzing image:", err);
      alert("Error analyzing image, check console for details.");
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
        <source src={agri} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional Dark Overlay for readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-5"></div>

      {/* Navbar */}
      <div className="relative z-10">
        <Navbar />
      </div>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-6 relative z-10 mt-16 mb-16">
        <div className="bg-white bg-opacity-90 shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-6 text-green-700">
            Upload Crop Image
          </h2>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Choose Image Button */}
          <button
            onClick={handleFileSelect}
            className="w-full mb-4 px-6 py-3 bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-105 active:scale-95"
          >
            Choose Image
          </button>

          {file && <p className="mb-4 text-gray-700">{file.name}</p>}

          {/* Analyze Button */}
          <button
            onClick={handleUpload}
            disabled={loading}
            className={`w-full px-6 py-3 font-semibold rounded-lg shadow-md text-white transition transform hover:scale-105 active:scale-95 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300"
            }`}
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>

          {loading && (
            <div className="flex justify-center items-center mt-4">
              <div className="w-8 h-8 border-4 border-green-600 border-dashed rounded-full animate-spin"></div>
            </div>
          )}

          {result && !loading && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg text-left">
              <p>
                <strong>Predicted Class:</strong> {result.predicted_class}
              </p>
              <p>
                <strong>Confidence:</strong> {result.confidence}
              </p>
              <p>
                <strong>Grain Weight:</strong> {result.grain_weight}
              </p>
              <p>
                <strong>GSW:</strong> {result.gsw}
              </p>
              <p>
                <strong>PSII:</strong> {result.psii}
              </p>
              <p>
                <strong>Fertilizer Status:</strong> {result.fertilizer_status}
              </p>
              <p>
                <strong>Crop Status:</strong> {result.crop_status}
              </p>

              {preview && (
                <div className="mt-4 text-center">
                  <strong>Uploaded Image:</strong>
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-2 max-w-xs rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default Upload;
