import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      navigate("/dashboard");

      // localStorage.setItem("token", response.data.token)
    } catch (err) {
      console.error(err);
      if(err?.response?.status === 404){
        
        alert(err?.response?.data?.message || "Something went wrong.")
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-600">
      <div className="w-97 p-6 shadow-lg bg-white rounded-md">
        <p className="text-blue-700 text-center text-2xl ">workasana</p>
        <h5 className="text-center text-3xl">Log in to your account</h5>
        <p className="text-center">Please enter your details</p>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-base mb-1">
              Email
            </label>
            <input
              type="email"
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
            <div className="flex justify-between items-center border  px-2 py-1 rounded">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" outline-none"
                placeholder="Password"
                required
              />
              <FontAwesomeIcon
                onClick={togglePassword}
                icon={showPassword ? faEyeSlash : faEye}
              />
            </div>
          </div>
          
          <button
          
            className="bg-blue-500 text-white block w-full mt-2 py-1 rounded cursor-pointer"
          >
            Sign in
          </button>
        </form>
        <div className="flex justify-between items-center mt-3 border border-amber-100 rounded px-1">
          <div>
            <p>Don't have a account</p>
          </div>
          <div>
            <Link to={"/signup"}>
              <button className="text-blue-600 font-bold">Signup</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
