import React, { useState, useRef, useEffect } from "react";
import Tutorial from "./Tutorial";
import { FaAngleDown } from "react-icons/fa";
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

  useEffect(() => {
    axios
      .get("http://localhost:3000/getJobs")
      .then((response) => {
        
        setTutorialJobs(response.data);

        // Iterate over tutorialJobs after setting the state
        response.data.forEach((job) => {
          axios
            .get(`http://localhost:3000/getUser/${job.email}`)
            .then((userResponse) => {
              // i need to add name into the job object as userName
              job.userName = userResponse.data.name;
              job.imageLink = userResponse.data.profilephoto;
              setNewTutorialJobs([...newTutorialJobs, job]);
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

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const shortContent =
    "On Preply's tutoring jobs page you can always find open requests for qualified teachers of different languages and subjects to offer tuition to learners in genrea...";
  const fullContent =
    "On Preply's tutoring jobs page you can always find open requests for qualified teachers of different languages and subjects to offer tuition to learners in general, as well as those who participate in our corporate language training programs and business English courses. Preply offers the chance to teach online with a flexible schedule, access to students from all over the world and constant customer service! In order to reply to student requests, you need to have a profile that shows your hourly price and your availability. Just check our tutoring jobs and find new students here!";

  // Filter tutorial jobs based on the selected filter option
  const filteredTutorialJobs =
    selectedFilter === "All"
      ? tutorialJobs
      : tutorialJobs.filter((job) => job.locationtype === selectedFilter);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full lg:w-10/12 p-4">
        <div className="flex flex-col">
          <div className="flex justify-between">
            <div className="text-3xl font-extrabold">Online tutoring jobs</div>
            <button
              className="bg-orange-400 text-white px-5 rounded-2xl text-center items-center mr-2"
              onClick={() => navigate("/createjob")}
            >
              Create Job
            </button>
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
            {/* Filter component */}
            <FilterOptions
              selectedFilter={selectedFilter}
              onFilterChange={handleFilterChange}
            />
          </div>
          {/* Display tutorials based on screen size */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
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
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
//
function FilterOptions({ selectedFilter, onFilterChange }) {
  const [visibleOptions, setVisibleOptions] = useState(
    filterOptions.slice(0, 3)
  );
  const [dropdownOptions, setDropdownOptions] = useState(
    filterOptions.slice(3)
  );
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

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
    <div className="relative">
      <div className="flex">
        <div className="flex overflow-hidden mt-4" ref={dropdownRef}>
          {visibleOptions.map((option, index) => (
            <button
              key={index}
              className={`px-4 py-2 bg-gray-200 rounded-lg mb-2 mr-2 md:ml-2 ${
                selectedFilter === option ? "bg-blue-500 text-orange-600" : ""
              }`}
              onClick={() => onFilterChange(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="flex justify-end right-0 overflow-hidden mt-4">
          {dropdownOptions.length > 0 && (
            <button
              onClick={toggleDropdown}
              className={`px-4 py-2 bg-gray-200 rounded-lg mb-2 ml-2 mr-2 md:ml-2`}
            >
              <FaAngleDown className="inline-block text-xl" />
            </button>
          )}
        </div>
      </div>
      {dropdownVisible && (
        <div className="flex left-0" ref={dropdownRef}>
          {dropdownOptions.map((option, index) => (
            <button
              key={index}
              className={`px-4 py-2 text-left bg-gray-200 rounded-lg m-2 ${
                selectedFilter === option ? " text-orange-600" : ""
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
