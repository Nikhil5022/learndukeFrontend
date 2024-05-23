import React, { useState, useEffect } from "react";
import { FaWallet, FaPhone } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import whatsapp from "./assets/whatsapp2.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Tutorial({
  imageLink,
  userName,
  title,
  description,
  minAmountPerHour,
  maxAmountPerHour,
  jobType,
  phoneNumber,
  location,
  whatsappNumber,
  email,
  requirements,
  responsibilities,
  tags,
  id,
  
}) {
  // console.log(imageLink)
  const navigate = useNavigate();
  const borderColor = "#4D4C5C";
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(null);
  const [isPremium, setIsPremium] = useState(false);   


  useEffect(() => {
    const isLogin = JSON.parse(localStorage.getItem("user")) ? setIsLogin(true) : setIsLogin(false);
    axios
      .get(`https://learndukeserver.vercel.app/getUser/${email}`)
      .then((userResponse) => {
        setUser(userResponse.data);
        setIsPremium(userResponse.data.isPremium);  
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [email, isLogin]);

  const handleCallNow = () => {
    if(isLogin){
      if(isPremium){
        window.location.href=`tel:${phoneNumber},_blank`;
      }
      else{
        alert("You need to be a premium user to call the user.")
        window.location.href="/findteachingjobs";
      }
    }else{
      alert("You need to login to call the user.")
    }
  };
user
  const handleWhatsApp = () => {
    if (isLogin){

      if (isPremium) {
        window.location.href = `https://wa.me/${whatsappNumber}`, "_blank";
      } else {
        alert("You need to be a premium user to call the user.")
        window.location.href = "/findteachingjobs";
      }
    } else{
      alert("You need to login to call the user.")
    }
  };


  function handleJobClick() {
    // need to send this data to another page to show the details of the job
  
    // i want to send this file to /detailedjob page
    // console.log("jobData", jobData)
    navigate('/detailedjob/'+id);

  }
  

  return (
    <div
      className={`rounded-xl border-2 border-slate-300 mt-5 p-5 border-${borderColor} cursor-pointer`}
      style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
      
    >
      <div onClick={handleJobClick}>

      <div className="flex  items-center  mb-4">
        <img
          src={
            imageLink ??
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
          className="w-10 h-10 rounded-full md:mr-2 mb-2 md:mb-0"
          alt=""
        />
        <div style={{ color: borderColor }} className="ml-2 text-lg">
          {userName}
        </div>
      </div>
      <div className="text-3xl font-semibold">{title}</div>
      <div style={{ color: borderColor }} className="mt-3">
        {description.slice(0,200)+ "...."}
      </div>
      <div className="flex flex-wrap mt-4 space-x-3 md:space-x-8">
        <div
          className={` border-2 border-${borderColor} p-2 rounded-3xl mt-3 flex items-center`}
        >
          <FaWallet className="w-6 h-6 mr-2 text-orange-400" />
          <span>
            &#8377;{minAmountPerHour}-&#8377;{maxAmountPerHour}/Hour
          </span>
        </div>
        <div
          className={` border-2 border-${borderColor} items-center mt-3 pl-1 pr-1 rounded-3xl flex  text-center`}
        >
          {jobType}
        </div>
        <div className="">
          {jobType !== "Remote" && (
            <div
              className={` border-2 border-${borderColor} mt-3 p-2 rounded-3xl flex items-center flex-wrap`}
            >
              {location}
            </div>
          )}
        </div>
      </div>
      </div>
      <div className="flex mt-4 space-x-3 md:space-x-8">
        <button
          onClick={handleCallNow}
          className="bg-orange-400 text-white px-4 py-3 rounded-3xl text-center"
        >
          <div className="flex justify-center items-center">
            <FaPhone style={{ transform: "rotateY(180deg)" }} />
            <div className="ml-2">Call Now</div>
          </div>
        </button>
        <button
          onClick={handleWhatsApp}
          className="bg-green-400 text-white px-4 py-3 rounded-3xl text-center"
        >
          <div className="flex justify-center items-center">
            <FaWhatsapp style={{ transform: "rotateY(180deg)" }} />
            <div className="ml-2">WhatsApp</div>
          </div>
        </button>
      </div>
    </div>
  );
}