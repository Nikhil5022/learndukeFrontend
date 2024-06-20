import React, { useState, useEffect, useRef } from "react";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import learnDuke from "./assets/learnDuke.png";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSearch } from 'react-icons/fa';
import axios from "axios";
import './navbar.css';
export default function Navbar() {
  const location = useLocation();
  if (location.pathname === "/createjob") {
    return null;
  }

  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState(null);

  const clickoutside = useRef();

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
        axios
          .get(`https://learndukeserver.vercel.app/getUser/${email}`)
          .then((response) => {
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
    window.location.href = "/";
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (clickoutside.current && !clickoutside.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    // scroll event 
    window.addEventListener("scroll", () => {
      setShowMenu(false);
    });

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div className="p-4 flex justify-between items-center sticky top-0 bg-white h-20 border-b border-gray-200 z-50">
      <div className="flex items-center space-x-4 lg:space-x-6">
        <img
          src={learnDuke}
          alt="Learn Duke Logo"
          className="h-16 cursor-pointer"
          onClick={() => navigate("/")}
        />
        
        <div className="hidden md:flex space-x-4 items-center">
        <div className="cursor-pointer hover:underline" onClick={()=>{navigate('/teachingjobs')}}>Explore Jobs</div>
        <div className="cursor-pointer hover:underline" onClick={()=>{navigate('/mentorship')}}>Mentorship</div>
      </div>
      </div>
     
      <div className="flex items-center space-x-6">
        {showMenu && (
          <div className="absolute top-16 right-0 bg-white p-4 rounded-lg shadow-md z-10 flex flex-col w-2/3 lg:hidden animate-slide-down" ref={clickoutside}>
            {user ? (
              <>
                <div
                  className="flex items-center mb-4 cursor-pointer"
                  onClick={() => {
                    navigate("/userpage");
                    setShowMenu(false);
                  }}
                >
                  <img
                    src={photo}
                    alt="User"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div className="font-semibold">{user.name}</div>
                </div>
                <div
                  className="text-base font-semibold mb-4 cursor-pointer "
                  onClick={() => {
                    navigate("/teachingjobs");
                    setShowMenu(false);
                  }}
                >
                  Explore Jobs
                </div>
                <div
                  className="text-base font-semibold  mb-4 cursor-pointer"
                  onClick={() => {
                    navigate("/mentorship");
                    setShowMenu(false);
                  }}
                >
                  Mentorship
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
                  onClick={() => navigate("/teachingjobs")}
                >
                  Explore Jobs
                </div>
                <div
                  className="text-base font-semibold mb-4 cursor-pointer"
                  onClick={() => navigate("/mentorship")}
                >
                  Mentorship
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
          <div className="hidden md:flex items-center space-x-3">
            <div
              className="border-2 border-orange-500 cursor-pointer rounded-full"
              onClick={() => navigate("/userpage")}
            >
              <img src={photo} alt="User" className="w-8 h-8 rounded-full" />
            </div>
            <button
              className="px-4 py-2 rounded-lg font-semibold bg-orange-500 text-white"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="hidden md:block">
            <button
              className="px-4 py-2 rounded-lg font-semibold bg-black text-white"
              onClick={handleGoogleLogin}
            >
              Log in with Google
            </button>
          </div>
        )}
        <div className="md:hidden">
          {showMenu ? (
            <RiCloseLine className="cursor-pointer" size={35} onClick={toggleMenu} />
          ) : (
            <RiMenuLine className="cursor-pointer" size={35} onClick={toggleMenu} />
          )}
        </div>
      </div>
    </div>
  );
}
