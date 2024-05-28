import React, { useState, useEffect } from "react";
import Tutorial from "./Tutorial";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Define the filter options
const filterOptions = ["All", "Remote", "Offline", "Part-time", "Full-time", "Internship", "Contract", "Hometuition", "Onlinetuition"];
const domainOptions = ["Domain", "Math", "Science", "English", "Programming", "Music"];

export default function Body() {
  const navigate = useNavigate();
  const [showFullContent, setShowFullContent] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedDomain, setSelectedDomain] = useState("Domain");
  const [tutorialJobs, setTutorialJobs] = useState([]);
  const [newTutorialJobs, setNewTutorialJobs] = useState([]);
  const userData = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(userData);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [premium, setPremium] = useState(false);

  useEffect(() => {
    axios
      .get("https://learndukeserver.vercel.app/getJobs")
      .then((response) => {
        console.log("Jobs fetched:", response.data);
        setTutorialJobs(response.data);

        response.data.forEach((job, i) => {
          axios
            .get(`https://learndukeserver.vercel.app/getUser/${job.email}`)
            .then((userResponse) => {
              job.userName = userResponse.data.name;
              job.imageLink = userResponse.data.profilephoto.url;
              setNewTutorialJobs((prevJobs) => [...prevJobs, job]);
            })
            .catch((error) => {
              console.error("Error fetching user data:", error);
            });
        });
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchTitle, searchLocation, selectedFilter, selectedDomain]);

  const handleSearch = () => {
    let filteredJobs = [...tutorialJobs];
    console.log("Initial Jobs:", filteredJobs);
  
    if (searchTitle) {
      filteredJobs = filteredJobs.filter((job) =>
        job.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
      console.log("After title filter:", filteredJobs);
    }
  
    if (searchLocation) {
      filteredJobs = filteredJobs.filter((job) =>
        job.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
      console.log("After location filter:", filteredJobs);
    }
  
    if (selectedFilter !== "All") {
      filteredJobs = filteredJobs.filter((job) =>
        job.jobType.toLowerCase() === selectedFilter.toLowerCase()
      );
      console.log("After job type filter:", filteredJobs);
    }
  
    // Check if domain filter should be applied
    if (selectedDomain !== "Domain") {
      filteredJobs = filteredJobs.filter((job) =>
        job.domain && job.domain.toLowerCase() === selectedDomain.toLowerCase()
      );
      console.log("After domain filter:", filteredJobs);
    }
  
    setNewTutorialJobs(filteredJobs);
  };
  

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const handleDomainChange = (event) => {
    setSelectedDomain(event.target.value);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full lg:w-10/12 p-4">
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-3 md:space-x-3">
            <div className="w-full flex flex-col md:flex-row border border-gray-300 items-center rounded-lg" style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
              <div className="w-full md:w-1/2 flex">
                <FaSearch className="text-gray-500 m-4 text-xl" />
                <input
                  type="text"
                  placeholder="Search for a job"
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value)}
                  className="border-2 border-none rounded-l-lg p-4 w-full focus:outline-none"
                />
              </div>
              <div className="border-r-2 h-10 w-0.5 m-1 hidden md:flex"></div>
              <div className="w-full md:w-1/2 flex">
                <FaMapMarkerAlt className="text-gray-500 m-4 text-xl" />
                <input
                  type="text"
                  placeholder="Search by location"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="border-2 border-none rounded-r-lg p-4 w-full focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-5 justify-start md:justify-between md:items-center">
            <div className="text-2xl font-semibold">Search remote and offline jobs near your location</div>
          </div>
          <div className="flex flex-col mt-4">
            <div className="flex flex-wrap items-center gap-2">
              <FilterOptions selectedFilter={selectedFilter} onFilterChange={handleFilterChange} selectedDomain={selectedDomain} onDomainChange={handleDomainChange} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              {newTutorialJobs.map((job, index) => (
                <Tutorial
                  key={index}
                  imageLink={job.imageLink}
                  userName={job.userName}
                  title={job.title}
                  description={job.description}
                  minAmountPerHour={job.minAmountPerHour}
                  maxAmountPerHour={job.maxAmountPerHour}
                  jobType={job.jobType}
                  phoneNumber={job.phoneNumber}
                  location={job.location}
                  whatsappNumber={job.whatsappNumber}
                  email={job.email}
                  requirements={job.requirements}
                  responsibilities={job.responsibilities}
                  tags={job.tags}
                  id={job._id}
                  isPremium={job.isPremium}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterOptions({ selectedFilter, onFilterChange, selectedDomain, onDomainChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        value={selectedDomain}
        onChange={onDomainChange}
        className="px-4 py-1 bg-gray-200 rounded-2xl font-semibold focus:outline-none text-sm"
      >
        {domainOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {filterOptions.map((option, index) => (
        <button
          key={index}
          className={`px-4 py-1 bg-gray-200 rounded-2xl font-semibold text-sm ${selectedFilter === option ? "bg-gray-400 text-black" : ""}`}
          onClick={() => onFilterChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
