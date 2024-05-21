import React, { useState, useEffect } from "react";
import { RiMenuLine, RiCloseLine, RiArrowDropDownLine } from "react-icons/ri";
import learnDuke from "./assets/learnDuke.png";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./teachingjobs/teaching.css";
import axios from "axios";

export default function Navbar() {
  const navigator = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userdata=JSON.parse(storedUser);
      axios.get(`http://localhost:3000/getUser/${userdata.email}`).then((response) => {
        setPhoto(response.data.profilephoto);
      });
    }

  }, []);



  useEffect(() => {
    const saveUserDetails = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const email = urlParams.get('email');
      const name = urlParams.get('name');
      const accessToken = urlParams.get('accessToken');

      if (email && name && accessToken) {
        localStorage.setItem("user", JSON.stringify({ email, name, accessToken }));
        axios.get(`http://localhost:3000/getUser/${email}`).then((response) => {
          setPhoto(response.data.profilephoto);
        });
        setUser({ email, name, accessToken });
        navigator("/userdata");
      } else {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }
    };

    // Call the function to save user details when the component mounts
    saveUserDetails();
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleGoogleLogin = () => {
    // Redirect user to Google authentication page
    window.location.href = "http://localhost:3000/auth/google";
  };

  const handleLogout = () => {
    // Clear user details from local storage
    localStorage.removeItem("user");
    // Clear user state
    setUser(null);
    // Redirect user to home page
    navigator("/");
  };

  return (
    <div className="m-4 flex justify-between">
      <div className="flex space-x-6 items-center">
        <div className="flex">
          <img src={learnDuke} alt="" className="h-10 ml-2 cursor-pointer"
          onClick={() => {
            navigator("/");
          }}
          />
        </div>
        <div className="hidden md:flex space-x-4">
          <div
            className="text-base font-semibold m-1.5 cursor-pointer"
            onClick={() => {
              navigator("/teachingJobs");
            }}

          >
            Explore Jobs
          </div>
          <div className="text-base font-semibold m-1.5" onClick={() => {}}>
            Corporate training
          </div>
          <div className="text-base font-semibold m-1.5">Become a tutor</div>
        </div>
      </div>
      <div className="flex items-center space-x-6">
        {showMenu && (
          <div className="absolute top-16 right-0 bg-white p-4 rounded-lg shadow-md z-10 flex flex-col w-1/3 lg:hidden">
            <div className="flex items-center">
              <FaUserCircle className="text-xl mr-2" />
              <div className="font-semibold">Log in</div>
            </div>
            <hr className="m-2 mb-5" />
            <div
              className="text-base font-semibold mb-4"
              onClick={() => {
                navigator("/teachingJobs");
              }}
            >
              Explore Jobs
            </div>
            <div className="text-base font-semibold mb-4">
              Corporate training
            </div>
            <div className="text-base font-semibold mb-4">Become a tutor</div>
            <div className="text-base">English, USD</div>
          </div>
        )}
       
       
        {user ? (
          <div className="rounded-lg flex justify-between space-x-3 items-center">
            <div className="border-2 border-orange-500  cursor-pointer rounded-full"
            
            onClick={() => {
              navigator("/userpage");
            }}
            >
              <img src={photo} alt="" className="w-8 rounded-full" />
            </div>
            <button
              className="px-4 py-1 rounded-lg font-semibold bg-orange-500 text-white"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="hidden md:block border-2 border-black rounded-lg">
            <button
              className="px-4 py-1 rounded-lg font-semibold"
              onClick={handleGoogleLogin}
            >
              Log in with Google
            </button>
          </div>
        )}
        <div>
          <RiMenuLine
            className="md:hidden cursor-pointer"
            size={35}
            onClick={toggleMenu}
          />
        </div>
      </div>
    </div>
  );
}
