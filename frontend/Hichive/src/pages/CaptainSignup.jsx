import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/Captaincontext";
import axios from "axios";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // For UI error handling

  const { captain , setCaptain } = React.useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submithandler = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset previous errors

    const captaindata = {
      fullname: { firstname: firstName, lastname: lastName },
      email,
      password: pass,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };

    try {
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const response = await axios.post(
        `${BASE_URL}/captain/register`,
        captaindata,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201) {
        setCaptain(response.data.captain);
        localStorage.setItem("token", response.data.token);
        navigate("/cstart");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Signup failed. Try again.");
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border-4 border-gray-300">
        <img
          src="/images/hitchhive-logo.png"
          alt="HitchHive Logo"
          className="w-16 mx-auto mb-4"
        />

        <h2 className="text-2xl font-bold text-center mb-6">
          HitchHive Welcomes You!
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}

        <form onSubmit={submithandler}>
          {/* Name Inputs */}
          <label className="block mb-2 text-gray-700">Name</label>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder="First name"
              value={firstName}
              required
              className="p-3 w-1/2 mb-4 border-2 border-gray-400 rounded bg-gray-100"
            />
            <input
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder="Last name"
              value={lastName}
              required
              className="p-3 w-1/2 mb-4 border-2 border-gray-400 rounded bg-gray-100"
            />
          </div>

          {/* Email Input */}
          <label className="block mb-2 text-gray-700">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email}
            placeholder="email@example.com"
            required
            className="w-full p-3 mb-4 border-2 border-gray-400 rounded bg-gray-100"
          />

          {/* Password Input */}
          <label className="block mb-2 text-gray-700">Password</label>
          <input
            onChange={(e) => setPass(e.target.value)}
            value={pass}
            type="password"
            placeholder="********"
            required
            className="w-full p-3 mb-6 border-2 border-gray-400 rounded bg-gray-100"
          />

          {/* Vehicle Information Inputs */}
          <label className="block mb-2 text-gray-700">Vehicle Details</label>

          <div className="flex gap-4">
            <input
              onChange={(e) => setVehicleColor(e.target.value)}
              type="text"
              value={vehicleColor}
              placeholder="Vehicle Color"
              required
              className="p-3 w-1/2 mb-4 border-2 border-gray-400 rounded bg-gray-100"
            />
            <input
              onChange={(e) => setVehiclePlate(e.target.value)}
              type="text"
              value={vehiclePlate}
              placeholder="Plate Number"
              required
              className="p-3 w-1/2 mb-4 border-2 border-gray-400 rounded bg-gray-100"
            />
          </div>

          <div className="flex gap-4">
            <input
              onChange={(e) => setVehicleCapacity(e.target.value)}
              type="number"
              value={vehicleCapacity}
              placeholder="Capacity"
              required
              className="p-3 w-1/2 mb-4 border-2 border-gray-400 rounded bg-gray-100"
            />
            <select
              onChange={(e) => setVehicleType(e.target.value)}
              value={vehicleType}
              required
              className="p-3 w-1/2 mb-4 border-2 border-gray-400 rounded bg-gray-100"
            >
              <option value="">Type</option>
              <option value="car">car</option>
              <option value="auto">auto</option>
              <option value="bike">bike</option>
            </select>
          </div>

          <button className="w-full bg-[#111] text-white font-semibold py-3 rounded text-lg">
            Create Captain Account
          </button>
        </form>

        <p className="text-center mt-4">
          Already a Captain?{" "}
          <Link to="/captain-login" className="text-blue-600">
            Log in
          </Link>
        </p>
      </div>

      <p className="absolute bottom-2 text-[10px] leading-tight text-center w-full px-4">
        This site is protected by reCAPTCHA and the{" "}
        <span className="underline">Google Privacy Policy</span> and{" "}
        <span className="underline">Terms of Service apply</span>.
      </p>
    </div>
  );
};

export default CaptainSignup;
