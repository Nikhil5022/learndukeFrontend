import React, { useState, useEffect, useCallback } from "react";
import Tutorial from "./Tutorial";
import { FaAngleDown, FaSearch, FaMapMarkerAlt, FaAngleUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Define the filter options
const filterOptions = ["All", "Remote", "Offline", "Part-time", "Fulltime", "Internship", "Contract", "Hometuition", "Onlinetuition"];

export default function Body() {
  const navigate = useNavigate();
  const [showFullContent, setShowFullContent] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
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
        console.log(response.data);
        setTutorialJobs(response.data);

        // Iterate over tutorialJobs after setting the state
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
  }, [searchTitle, searchLocation, selectedFilter]);

  const handleSearch = () => {
    let filteredJobs = tutorialJobs;

    if (searchTitle) {
      filteredJobs = filteredJobs.filter((job) =>
        job.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }

    if (searchLocation) {
      filteredJobs = filteredJobs.filter((job) =>
        job.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }

    if (selectedFilter !== "All") {
      filteredJobs = filteredJobs.filter((job) => job.jobType.toLowerCase() === selectedFilter.toLowerCase());
    }

    setNewTutorialJobs(filteredJobs);
  };

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full lg:w-10/12 p-4">
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row justify-center items-center space-x-3">
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
          <div className="flex flex-col">
            <div className="md:w-1/4 md:mr-4 mb-4 md:mb-0">
              <FilterOptions selectedFilter={selectedFilter} onFilterChange={handleFilterChange} />
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

function FilterOptions({ selectedFilter, onFilterChange }) {
  console.log(selectedFilter);
  const [visibleOptions, setVisibleOptions] = useState(filterOptions.slice(0, 3));
  const [dropdownOptions, setDropdownOptions] = useState(filterOptions.slice(3));
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const availableWidth = window.innerWidth - 30;
      const optionWidth = 90;
      const maxVisibleOptions = Math.floor((availableWidth - 50) / optionWidth);

      setVisibleOptions(filterOptions.slice(0, maxVisibleOptions));
      setDropdownOptions(filterOptions.slice(maxVisibleOptions));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="mt-8 sticky top-32">
      <div className="flex md:space-x-4 w-full">
        {visibleOptions.map((option, index) => (
          <button
            key={index}
            className={`px-4 py-2 bg-gray-200 rounded-lg md:w-full whitespace-nowrap mr-2 md:mr-0 w-fit ${selectedFilter === option ? "bg-blue-500 text-gray-500" : ""}`}
            onClick={() => onFilterChange(option)}
          >
            {option}
          </button>
        ))}
        {dropdownOptions.length > 0 && (
          <button onClick={toggleDropdown} className="px-4 py-2 bg-gray-200 rounded-lg mb-2 md:mr-0">
            {dropdownVisible ? <FaAngleUp className="inline-block text-xl" /> : <FaAngleDown className="inline-block text-xl" />}
          </button>
        )}
      </div>
      {dropdownVisible && (
        <div className="left-0 mt-2 rounded-lg flex space-x-3">
          {dropdownOptions.map((option, index) => (
            <button
              key={index}
              className={`px-4 py-2 text-left bg-gray-200 rounded-lg hover:bg-gray-300 ${selectedFilter === option ? "bg-blue-500 text-white" : ""}`}
              onClick={() => {
                onFilterChange(option);
                setDropdownVisible(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
