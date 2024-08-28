import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../features/auth/authSlice";

const UserActivation = () => {
  const { uid, token } = useParams(); // Extract uid and token from URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleActivation = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/users/activation/`, {
        uid,
        token,
      });

      if (response.status === 204) {
        // 204 means no content, but successful
        toast.success("Account activated successfully!");
        navigate("/login"); // Redirect to login page after successful activation
      }
    } catch (error) {
      toast.error("Activation failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Activate Your Account</h2>
        <p className="mb-6">Click the button below to activate your account.</p>
        <button
          onClick={handleActivation}
          className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Activating..." : "Activate Account"}
        </button>
      </div>
    </div>
  );
};

export default UserActivation;
