import React, { useState, useEffect } from "react";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import learnDuke from "./assets/learnDuke.png";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./teachingjobs/teaching.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  // if path is /createjob, then navbar should not be seen
  const location = useLocation();
  if (location.pathname === "/createJob") {
    return null;
  }

  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userdata = JSON.parse(storedUser);
      axios
        .get(`https://learndukeserver.vercel.app/getUser/${userdata.email}`)
        .then((response) => {
          setPhoto(response.data.profilephoto.url);
        });
    }
  }, []);

  useEffect(() => {
    const saveUserDetails = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const email = urlParams.get("email");
      const name = urlParams.get("name");
      const accessToken = urlParams.get("accessToken");

      if (email && name && accessToken) {
        localStorage.setItem(
          "user",
          JSON.stringify({ email, name, accessToken })
        );
        axios.get(`https://learndukeserver.vercel.app/getUser/${email}`).then((response) => {
          setPhoto(response.data.profilephoto.url);
        });
        setUser({ email, name, accessToken });
        navigate("/teachingjobs");
      } else {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }
    };

    saveUserDetails();
  }, [navigate]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://learndukeserver.vercel.app/auth/google";
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="p-3 flex justify-between items-center sticky top-0 bg-orange-50 h-20 border-b border-gray-300 z-50">
      <div className="flex space-x-6 items-center">
        <div className="flex">
          <img
            src={learnDuke}
            alt=""
            className="h-10 ml-2 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <div className="hidden md:flex space-x-4">
          <div
            className="text-base font-semibold m-1.5 cursor-pointer"
            onClick={() => {
              navigate("/teachingJobs");
            }}
          >
            Explore Jobs
          </div>
          <div className="text-base font-semibold m-1.5 cursor-pointer">
            Corporate training
          </div>
          <div className="text-base font-semibold m-1.5 cursor-pointer">
            Become a tutor
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-6">
        {showMenu && (
          <div className="absolute top-16 right-0 bg-white p-4 rounded-lg shadow-md z-10 flex flex-col w-2/3 lg:hidden">
            {user ? (
              <>
              <button
                className="text-white rounded-2xl items-center m-3 md:m-0 md:ml-2 w-32"
                onClick={() => navigate("/createjob")}
              >
                <div className="bg-orange-500 rounded-2xl px-5 py-3">Create Job</div>
              </button>
                <div
                  className="flex items-center mb-4"
                  onClick={() => {
                    navigate("/userpage");
                    setShowMenu(false);
                  }}
                >
                  <img
                    src={photo}
                    alt=""
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div className="font-semibold">{user.name}</div>
                </div>
                <div
                  className="text-base font-semibold mb-4 cursor-pointer"
                  onClick={() => {
                    navigate("/teachingJobs");
                    setShowMenu(false);
                  }}
                >
                  Explore Jobs
                </div>
                <div className="text-base font-semibold mb-4 cursor-pointer">
                  Corporate training
                </div>
                <div className="text-base font-semibold mb-4 cursor-pointer">
                  Become a tutor
                </div>
                <button
                  className="px-4 py-2 rounded-lg font-semibold bg-orange-500 text-white"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <div
                  className="text-base font-semibold mb-4 cursor-pointer"
                  onClick={() => {
                    navigate("/teachingJobs");
                  }}
                >
                  Explore Jobs
                </div>
                <div className="text-base font-semibold mb-4 cursor-pointer">
                  Corporate training
                </div>
                <div className="text-base font-semibold mb-4 cursor-pointer">
                  Become a tutor
                </div>
                <button
                  className="px-4 py-2 rounded-lg font-semibold bg-black text-white"
                  onClick={handleGoogleLogin}
                >
                  Log in with Google
                </button>
              </>
            )}
          </div>
        )}
        {user ? (
          <div className="rounded-lg  justify-between space-x-3 items-center hidden md:flex">
            <button
                className="text-white rounded-2xl items-center m-3 md:m-0 md:ml-2 w-32"
                onClick={() => navigate("/createjob")}
              >
                <div className="bg-orange-500 rounded-2xl px-5 py-3">Create Job</div>
              </button>
            <div
              className="border-2 border-orange-500 cursor-pointer rounded-full"
              onClick={() => {
                navigate("/userpage");
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
          {showMenu ? (
            <RiCloseLine
              className="md:hidden cursor-pointer"
              size={35}
              onClick={toggleMenu}
            />
          ) : (
            <RiMenuLine
              className="md:hidden cursor-pointer"
              size={35}
              onClick={toggleMenu}
            />
          )}
        </div>
      </div>
    </div>
  );
}
