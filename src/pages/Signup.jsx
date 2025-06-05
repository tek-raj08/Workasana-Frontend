import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Signup = () => {
  const [firstName, setFirstName] = useState("Tek");
  const [lastName, setLastName] = useState("Raj");
  const [email, setEmail] = useState("tek@gmail.com");
  const [password, setPassword] = useState("Tek@1234");
  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(BASE_URL + "/auth/signup", {
        firstName,
        lastName,
        email,
        password
    },
)
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-600">
      <div className="w-97 p-6 shadow-lg bg-white rounded-md">
        <p className="text-blue-700 text-center text-2xl ">workasana</p>
        <h5 className="text-center text-3xl">Sign up to your account</h5>
        <p className="text-center">Please enter your details</p>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName" className="block text-base mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border w-full text-base px-2 py-1 rounded focus:outline-none "
              placeholder="Enter your first name"
              required
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-base mb-1 mt-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border w-full text-base px-2 py-1 rounded focus:outline-none "
              placeholder="Enter your last name"
              required
            />
            
          </div>

          <div>
            <label htmlFor="email" className="block text-base mb-1 mt-1">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border w-full text-base px-2 py-1 rounded focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-base mb-1 mt-1">
              Password
            </label>
            <div className="flex justify-between items-center px-1 border rounded">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" px-2 py-1  outline-none "
              placeholder="Password"
              required
            />
            <FontAwesomeIcon onClick={togglePassword} icon={showPassword ? faEyeSlash : faEye} />
            </div>
            
          </div>
          <button className="bg-blue-500 text-white block w-full mt-2 py-1 rounded">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
