import React, { useState, useEffect, useCallback } from "react";
import Tutorial from "./Tutorial";
import { FaAngleDown, FaSearch, FaMapMarkerAlt, FaAngleUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Define the filter options
const filterOptions = ["All", "School", "College", "HomeTuition", "Remote"];

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
  const [userCache, setUserCache] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/getJobs")
      .then((response) => {
        const jobs = response.data;
        const updatedJobsPromises = jobs.map((job) => {
          if (!userCache[job.email]) {
            return axios
              .get(`http://localhost:3000/getUser/${job.email}`)
              .then((userResponse) => {
                const updatedJob = {
                  ...job,
                  userName: userResponse.data.name,
                  imageLink: userResponse.data.profilephoto.url,
                };
                setUserCache((prevCache) => ({
                  ...prevCache,
                  [job.email]: userResponse.data,
                }));
                return updatedJob;
              })
              .catch((error) => {
                console.error("Error fetching user data:", error);
                return job; // Return the original job in case of error
              });
          } else {
            const cachedUser = userCache[job.email];
            return {
              ...job,
              userName: cachedUser.name,
              imageLink: cachedUser.profilephoto.url,
            };
          }
        });

        Promise.all(updatedJobsPromises).then((updatedJobs) => {
          setNewTutorialJobs(updatedJobs);
        });

        setTutorialJobs(jobs);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, [userCache]);

  useEffect(() => {
    handleSearch();
  }, [searchTitle, searchLocation, tutorialJobs]);

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

    setNewTutorialJobs(filteredJobs);
  };

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const shortContent =
    "On Preply's tutoring jobs page you can always find open requests for qualified teachers of different languages and subjects to offer tuition to learners in general...";
  const fullContent =
    "On Preply's tutoring jobs page you can always find open requests for qualified teachers of different languages and subjects to offer tuition to learners in general, as well as those who participate in our corporate language training programs and business English courses. Preply offers the chance to teach online with a flexible schedule, access to students from all over the world and constant customer service! In order to reply to student requests, you need to have a profile that shows your hourly price and your availability. Just check our tutoring jobs and find new students here!";

  const filteredTutorialJobs =
    selectedFilter === "All"
      ? newTutorialJobs
      : newTutorialJobs.filter((job) => job.locationtype === selectedFilter);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full lg:w-10/12 p-4">
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row justify-center items-center space-x-3">
            {/* input for search */}
            <div className="w-full flex flex-col md:flex-row border border-gray-300  items-center rounded-lg"
              style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
            >
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
              {/* vertical line */}
              <div className="border-r-2 h-10 w-0.5 m-1 hidden md:flex"></div>
              <div className="w-full md:w-1/2 flex">
                <FaMapMarkerAlt className="text-gray-500 m-4 text-xl" />
                {/* input by location */}
                <input
                  type="text"
                  placeholder="Search by location"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="border-2 border-none rounded-r-lg p-4 w-full focus:outline-none"
                />
              </div>
             
            </div>
            {user && (
              <button
                className="text-white rounded-2xl items-center m-3 md:m-0 md:ml-2 w-32"
                onClick={() => navigate("/createjob")}
              >
                <div className="bg-orange-500 rounded-2xl px-5 py-3">Create Job</div>
              </button>
            )}
          </div>

          <div
            className={`mt-4 ${showFullContent ? "" : "overflow-hidden"}`}
            style={{ color: "#4D4C5C" }}
          >
            {showFullContent ? fullContent : shortContent}
            <button
              onClick={toggleContent}
              className="cursor-pointer ml-2 underline font-semibold"
            >
              {showFullContent ? "Read Less" : "Read More"}
            </button>
          </div>
          <div className="flex flex-col md:flex-row mt-3 justify-start md:justify-between md:items-center">
            <div className="text-2xl font-bold">
              Latest online tutoring jobs
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 md:mr-4 mb-4 md:mb-0">
              <FilterOptions
                selectedFilter={selectedFilter}
                onFilterChange={handleFilterChange}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 mt-3 md:w-2/3">
              {filteredTutorialJobs.map((job, index) => (
                <Tutorial
                  key={index}
                  imageLink={job.imageLink} // Pass the image link from the job object
                  userName={job.userName} // Assuming userName is coming from the user data
                  title={job.title} // Pass other relevant props accordingly
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
  const [visibleOptions, setVisibleOptions] = useState(
    filterOptions.slice(0, 3)
  );
  const [dropdownOptions, setDropdownOptions] = useState(
    filterOptions.slice(3)
  );
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
    <div className="mt-8 sticky top-10">
      <div className="flex flex-wrap md:flex-col md:items-start md:space-y-2">
        {visibleOptions.map((option, index) => (
          <button
            key={index}
            className={`px-4 py-2 bg-gray-200 rounded-lg md:w-full mr-2 md:mr-0 ${
              selectedFilter === option ? "bg-blue-500 text-gray-500" : ""
            }`}
            onClick={() => onFilterChange(option)}
          >
            {option}
          </button>
        ))}
        {dropdownOptions.length > 0 && (
          <button
            onClick={toggleDropdown}
            className="px-4 py-2 bg-gray-200 rounded-lg mb-2 md:mr-0"
          >{
            dropdownVisible ? 
            <FaAngleUp className="inline-block text-xl" />
            :
            <FaAngleDown className="inline-block text-xl" /> 
          }
          </button>
        )}
      </div>
      {dropdownVisible && (
        <div
          className=" left-0 mt-2 rounded-lg flex space-x-3"
          ref={dropdownRef}
        >
          {dropdownOptions.map((option, index) => (
            <button
              key={index}
              className={`px-4 py-2  text-left bg-gray-200 rounded-lg hover:bg-gray-300 ${
                selectedFilter === option ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => {
                onFilterChange(option);
                setDropdownVisible(false); // Close dropdown after selecting an option
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
