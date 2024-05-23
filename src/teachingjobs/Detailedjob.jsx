import React, { useState, useEffect } from "react";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaMoneyBillWave,
  FaBriefcase,
  FaMapMarkerAlt,
  FaShareAlt,
  FaTag
} from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Detailedjob() {
  const navigate = useNavigate();
  const [job, setJob] = useState();
  const [isPremium, setIsPremium] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [user, setUser] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const jobId = window.location.pathname.split("/").pop();
    axios.get(`https://learndukeserver.vercel.app/getJobById/${jobId}`).then((response) => {
      axios
        .get(`https://learndukeserver.vercel.app/getUser/${response.data.email}`)
        .then((userResponse) => {
          setPhoto(userResponse.data.profilephoto.url);
          setUser(userResponse.data.name);
        });
      setJob(response.data);
    });
    axios
      .get(`https://learndukeserver.vercel.app/getSimilarJobs/${jobId}`)
      .then((response) => {
        setSimilarJobs(response.data);
      });
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      axios
        .get(`https://learndukeserver.vercel.app/getUser/${user.email}`)
        .then((response) => {
          setIsPremium(response.data.isPremium);
          setIsLogin(true);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setIsLogin(false);
        });
    }
  }, [isLogin, user]);

  const handleShare = () => {
    if (navigator.share && isLogin) {
      navigator
        .share({
          title: job.title,
          text: `Check out this job: ${job.title}`,
          url: window.location.href,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };

  if (!job) {
    return <div className="h-screen ">No job details available</div>;
  }

  return (
    <div className="flex flex-col-reverse w-full p-5 justify-center text-gray-800 space-y-5 md:flex-row">
    <div className="w-full mb-5 md:w-2/5 md:mb-0 animate-fade-in-left">
      {/* Rendering similar jobs */}
      <div>
        <div className="text-2xl font-semibold text-orange-700 mb-5">
          Similar Jobs
        </div>
        <div className="grid grid-cols-1 gap-4">
          {similarJobs.map((job, index) => (
            <div
              key={index}
              className="border border-orange-400 rounded-lg shadow-md p-4 bg-white hover:bg-orange-50 transition-colors cursor-pointer transform hover:scale-105 duration-300"
              onClick={() => {
                window.location.href = `/detailedjob/${job._id}`;
              }}
            >
              <div className="text-xl font-bold text-orange-700 mb-2">
                {job.title}
              </div>
              <div className="flex flex-wrap mb-2">
                {job.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="border border-orange-400 px-2 py-1 rounded-2xl m-1 text-sm text-orange-600 flex items-center"
                  >
                    <FaTag className="mr-1" /> {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center mb-1 text-gray-600">
                <FaMapMarkerAlt className="mr-2 text-orange-500" />
                {job.location}
              </div>
              <div className="flex items-center text-gray-600">
                <FaBriefcase className="mr-2 text-orange-500" />
                {job.jobType}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="w-full flex flex-col border border-orange-400 rounded-lg p-5 bg-white shadow-md mt-12 animate-fade-in-right md:mt-0 md:ml-5 md:flex-grow">
      <div className="p-3 rounded-lg m-3 flex justify-center">
        <img src={photo} alt="" className="w-24 h-24 shadow-lg rounded-full" />
      </div>
      <div className="text-lg font-semibold text-orange-700 m-3 text-center">
        {user}
      </div>
      <div className="text-2xl font-semibold text-orange-700 mb-3 text-center">
        {job.title}
      </div>
      <div className="w-full flex flex-wrap justify-around mb-3 space-x-3 ">
        <div className="flex items-center border border-orange-400 px-3 py-1 rounded-2xl animate-pulse m-2">
          <FaMoneyBillWave className="mr-2 text-orange-500" />
          {job.minAmountPerHour}-{job.maxAmountPerHour}/Hour
        </div>
        <div className="flex items-center border border-orange-400 px-3 py-1 rounded-2xl animate-pulse m-2">
          <FaBriefcase className="mr-2 text-orange-500" />
          {job.jobType}
        </div>
        <div className="flex items-center border border-orange-400 px-3 py-1 rounded-2xl animate-pulse m-2">
          <FaMapMarkerAlt className="mr-2 text-orange-500" />
          {job.location}
        </div>
      </div>
      <div className="mb-3">
        <div className="text-lg font-semibold mb-2 text-orange-700">
          About The Job
        </div>
        <div className="mb-3">
          <div className="font-semibold">Description:</div>
          <div className="m-3">{job.description}</div>
        </div>
        <div className="mb-3">
          <div className="font-semibold">Responsibilities</div>
          <div className="m-3">{job.responsibilities}</div>
        </div>
        <div className="mb-3">
          <div className="font-semibold">Requirements</div>
          <div className="m-3">{job.requirements}</div>
        </div>
        <div className="mb-3">
          <div className="font-semibold">Tags</div>
          <div className="flex flex-wrap m-3">
            {job.tags.map((tag, index) => (
              <span
                key={index}
                className="border border-orange-400 px-2 py-1 rounded-2xl m-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-center  space-x-3 mt-3">
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-2xl flex items-center transform hover:scale-105 duration-300 m-2"
            onClick={() => {
              if(isLogin){
                if (isPremium) {
                  window.location.href = `tel:${job.phoneNumber}`;
                } else {
                  alert("You need to be a premium user to call this number");
                }
              }else{
                alert("You need to login to call this number");
              }
            }}
          >
            <FaPhoneAlt className="mr-2" />
            Call
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-2xl flex items-center transform hover:scale-105 duration-300 m-2"
            onClick={() => {
              if(isLogin){
                if (isPremium) {
                  window.location.href = `https://wa.me/${job.whatsappNumber}`;
                } else {
                  alert("You need to be a premium user to call this number");
                }
              }else{
                alert("You need to login to call this number");
              }
            }}
          >
            <FaWhatsapp className="mr-2" />
            WhatsApp
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-2xl flex items-center transform hover:scale-105 duration-300 m-2"
            onClick={handleShare}
          >
            <FaShareAlt className="mr-2" />
            Share
          </button>
        </div>
      </div>
    </div>
  </div>
  
  );
}