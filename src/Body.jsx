import React, { useState,useRef, useEffect } from "react";
import Tutorial from "./Tutorial";
import { FaSearch, FaMapMarkerAlt, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import crying from "./assets/crying.gif";

// Define the filter options
const filterOptions = [
  "All",
  "Remote",
  "Offline",
  "Part-time",
  "Full-time",
  "Internship",
  "Contract",
  "Hometuition",
  "Onlinetuition",
];
const domainOptions = [
  "Domain",
  "Information Technology (IT)",
  "Finance",
  "Healthcare",
  "Education",
  "Manufacturing",
  "Retail",
  "Telecommunications",
  "Construction",
  "Hospitality",
  "Transportation and Logistics",
  "Real Estate",
  "Media and Entertainment",
  "Marketing and Advertising",
  "Energy and Utilities",
  "Government",
  "Non-Profit",
  "Consulting",
  "Legal",
  "Automotive",
  "Pharmaceuticals",
  "Consumer Goods",
  "Agriculture",
  "Aerospace and Defense",
  "Insurance",
  "Human Resources",
  "Research and Development (R&D)",
  "Biotechnology",
  "Food and Beverage",
  "Environmental Services",
  "Sports and Recreation",
  "Date entry",
  "Content writing"
];

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://learndukeserver.vercel.app/getReviewedJobs")
      .then((response) => {
        console.log("Jobs fetched:", response.data);
        setTutorialJobs(response.data);

        const jobPromises = response.data.map((job) =>
          axios
            .get(`https://learndukeserver.vercel.app/getUser/${job.email}`)
            .then((userResponse) => {
              job.userName = userResponse.data.name;
              job.imageLink = userResponse.data.profilephoto.url;
              return job;
            })
        );

        Promise.all(jobPromises).then((jobsWithUserData) => {
          setNewTutorialJobs(jobsWithUserData);
          setLoading(false);
        });
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      });

      window.scrollTo(0, 0);
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
      filteredJobs = filteredJobs.filter(
        (job) => job.jobType.toLowerCase() === selectedFilter.toLowerCase()
      );
      console.log("After job type filter:", filteredJobs);
    }

    if (selectedDomain !== "Domain") {
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.domain &&
          job.domain.toLowerCase() === selectedDomain.toLowerCase()
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
    <div className="flex flex-col min-h-screen">
      <div className="w-full lg:w-10/12 mx-auto p-4 flex-grow">
        <div className="flex flex-col ">
          <div className="flex flex-col md:flex-row  space-y-3 md:space-x-3 w-full">
            <div
              className="w-full flex flex-col md:flex-row border border-gray-300 items-center rounded-lg shadow"
            >
              <div className="w-full md:w-1/2 flex">
                <FaSearch className="text-gray-500 m-4 text-xl" />
                <input
                  type="text"
                  placeholder="Search for a job"
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value)}
                  className="border-none rounded-l-lg p-4 w-full focus:outline-none"
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
                  className="border-none rounded-r-lg p-4 w-full focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-5  w-full">
            <div className="text-2xl font-semibold ">
              Search remote and offline jobs near your location
            </div>
          </div>
          <div className="flex flex-col mt-4 w-full">
            <div className="flex flex-wrap  gap-2">
              <FilterOptions
                selectedFilter={selectedFilter}
                onFilterChange={handleFilterChange}
                selectedDomain={selectedDomain}
                onDomainChange={handleDomainChange}
              />
            </div>
            {loading ? (
              <div className="flex justify-center items-center mt-10">
                <ClipLoader size={50} color={"#123abc"} loading={loading} />
              </div>
            ) : newTutorialJobs.length > 0 ? (
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
            ) : (
              <div className="flex flex-col items-center justify-center mt-10">
                <img src={crying} alt="No jobs found" className="w-32" />
                <div className="text-center text-lg font-semibold text-gray-500">
                  No jobs found
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
     
    </div>
  );
}

function FilterOptions({
  selectedFilter,
  onFilterChange,
  selectedDomain,
  onDomainChange,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3); // Default number of items to show in the carousel
  const containerRef = useRef(null);
  const optionRef = useRef(null);

  const updateItemsToShow = () => {
    if (containerRef.current && optionRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const optionWidth = optionRef.current.offsetWidth + 50; // Include margin and padding
      const newItemsToShow = Math.floor(containerWidth / optionWidth);
      setItemsToShow(newItemsToShow > 0 ? newItemsToShow : 1);
      setCurrentIndex(0); // Reset the index to start when resizing
    }
  };

  useEffect(() => {
    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);

    return () => {
      window.removeEventListener("resize", updateItemsToShow);
    };
  }, []);

  const handleNext = () => {
    const newIndex = currentIndex + itemsToShow;
    setCurrentIndex(newIndex >= filterOptions.length ? filterOptions.length - itemsToShow : newIndex);
  };

  const handlePrev = () => {
    const newIndex = currentIndex - itemsToShow;
    setCurrentIndex(newIndex < 0 ? 0 : newIndex);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col-reverse lg:flex-row  w-full lg:hidden">
        <div className="flex items-center overflow-hidden w-full mt-3" ref={containerRef}>
          <button
            className="p-2 transition-transform transform hover:scale-110"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <FaArrowLeft />
          </button>
          <div className="flex gap-2 overflow-hidden transition-all duration-500 ease-in-out">
            {filterOptions.slice(currentIndex, currentIndex + itemsToShow).map((option, index) => (
              <button
                key={index}
                ref={index === 0 ? optionRef : null} // Reference the first visible option
                className={`px-4 py-1 bg-gray-200 rounded-2xl font-semibold whitespace-nowrap text-sm ${
                  selectedFilter === option ? "bg-gray-400 text-black" : ""
                }`}
                onClick={() => onFilterChange(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            className="p-2 transition-transform transform hover:scale-110"
            onClick={handleNext}
            disabled={currentIndex >= filterOptions.length - itemsToShow}
          >
            <FaArrowRight />
          </button>
        </div>
        <select
          value={selectedDomain}
          onChange={onDomainChange}
          className="px-4 py-1 bg-gray-200 rounded-2xl font-semibold focus:outline-none text-sm w-28 ml-4"
        >
          {domainOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden lg:flex justify-between w-full items-center mt-4">
        <div className="flex gap-2">
          {filterOptions.map((option, index) => (
            <button
              key={index}
              className={`px-4 py-1 bg-gray-200 rounded-2xl font-semibold whitespace-nowrap text-sm ${
                selectedFilter === option ? "bg-gray-400 text-black" : ""
              }`}
              onClick={() => onFilterChange(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <select
          value={selectedDomain}
          onChange={onDomainChange}
          className="px-4 py-1 bg-gray-200 rounded-2xl font-semibold focus:outline-none text-sm w-28 ml-4"
        >
          {domainOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
