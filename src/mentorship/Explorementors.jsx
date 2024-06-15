import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  FaPhone,
  FaWhatsapp,
  FaLaptopCode,
  FaDatabase,
  FaChartLine,
  FaSchool,
  FaGraduationCap,
  FaUniversity,
  FaBook,
  FaChalkboardTeacher,
  FaGlobe,
  FaTimes,
} from "react-icons/fa";
import "./explorementors.css";
import { useNavigate } from "react-router-dom";

const domainOptions = [
  { name: "All Domains", icon: <FaGlobe />,number:0 },
  { name: "Engineering", icon: <FaLaptopCode />, number:1 },
  { name: "Data Science", icon: <FaDatabase />, number:2},
  { name: "Business", icon: <FaChartLine /> , number:3},
  { name: "School", icon: <FaSchool />, number:4},
  { name: "College", icon: <FaGraduationCap />, number:5},
  { name: "Govt Exams", icon: <FaUniversity />, number:6},
  { name: "Jee/neet", icon: <FaBook />, number:7},
  { name: "Extra class", icon: <FaChalkboardTeacher />, number:8},
  { name: "Interview prep", icon: <FaChalkboardTeacher />, number:9},
];

const subDomainOptions = [
  {
    name: "Engineering",
    options: [
      "Frontend developer",
      "Backend developer",
      "Full stack developer",
      "DevOps/sre /cloud engineer",
      "Cybersecurity engineer",
      "QA/Automation testing engineer",
    ],
  },
  {
    name: "Data Science",
    options: [
      "Data analyst",
      "Data engineer",
      "Data scientist",
      "Machine learning engineer",
      "Business intelligence analyst",
      "Big data engineer",
    ],
  },
  {
    name: "Business",
    options: [
      "Business analyst",
      "Product manager",
      "Project manager",
      "Digital marketing manager",
      "Sales manager",
      "HR manager",
    ],
  },
  {
    name: "School",
    options: [
      "Mathematics",
      "Physics",
      "Chemistry",
      "Biology",
      "English",
      "Social",
    ],
  },
  {
    name: "College",
    options: [
      "Mathematics",
      "Physics",
      "Chemistry",
      "Biology",
      "English",
      "Social",
    ],
  },
  {
    name: "Govt Exams",
    options: ["SSC", "UPSC", "Banking", "Railway", "Defence", "State PSC"],
  },
  {
    name: "Jee/neet",
    options: ["Physics", "Chemistry", "Biology", "Mathematics"],
  },
  {
    name: "Extra class",
    options: [
      "Mathematics",
      "Physics",
      "Chemistry",
      "Biology",
      "English",
      "Social",
    ],
  },
  {
    name: "Interview prep",
    options: [
      "Frontend developer",
      "Backend developer",
      "Full stack developer",
      "DevOps/sre /cloud engineer",
      "Cybersecurity engineer",
      "QA/Automation testing engineer",
    ],
  },
];

function Explorementors() {
  const navigation = useNavigate();
  const [mentors, setMentors] = useState([]);
  const [originalMentors, setOriginalMentors] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("All Domains");
  const [selectedSubDomains, setSelectedSubDomains] = useState([]);
  const [showSubDomains, setShowSubDomains] = useState(null);
  const cardRefs = useRef([]);
  const subDomainDropdownRef = useRef(null);
  const [displayedNames, setDisplayedNames] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3000/getMentors").then((response) => {
      console.log(response.data);
      setMentors(response.data);
      setOriginalMentors(response.data);
    });
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        windowWidth >= 768 && // 768px is the breakpoint for medium (md) devices
        subDomainDropdownRef.current &&
        !subDomainDropdownRef.current.contains(event.target)
      ) {
        setShowSubDomains(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [subDomainDropdownRef, windowWidth]);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    function handleResize() {
      const newDisplayedNames = mentors.map((mentor, index) => {
        const cardWidth = cardRefs.current[index]?.offsetWidth || 0;
        const maxChars = Math.floor(cardWidth / 15); // Approximate number of characters per pixel width
        return mentor.name.length > maxChars
          ? `${mentor.name.substring(0, maxChars - 3)}...`
          : mentor.name;
      });
      setDisplayedNames(newDisplayedNames);
    }

    // Initial call to handleResize
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener
    return () => window.removeEventListener("resize", handleResize);
  }, [mentors]);

  const calculateSkillsToShow = (cardWidth, skills) => {
    const padding = 16; // Adjust based on your padding/margin
    const skillWidth = 50; // Approximate width of a skill item in pixels

    // Calculate how many skill items can fit in the card
    const maxSkills = Math.floor((cardWidth - padding) / skillWidth);

    return maxSkills;
  };

  const getDomainIcon = (domain) => {
    const domainOption = domainOptions.find((option) => option.name === domain);
    return domainOption ? domainOption.icon : null;
  };

  const handleDomainClick = (domain, e) => {
    // Calculate the left position of the dropdown
    const left = e.target.getBoundingClientRect().left;
    console.log(left);
    setLeft(left);

    setSelectedDomain(domain);
    setShowSubDomains(showSubDomains === domain ? null : domain);
    if (domain === "All Domains") {
      setSelectedSubDomains([]);
      setMentors(originalMentors); // Reset mentors to all mentors if "All Domains" is selected
    }
  };

  const handleSubDomainChange = (subDomain) => {
    setSelectedSubDomains((prevSelectedSubDomains) =>
      prevSelectedSubDomains.includes(subDomain)
        ? prevSelectedSubDomains.filter((sd) => sd !== subDomain)
        : [...prevSelectedSubDomains, subDomain]
    );
    if (windowWidth < 768) {
      setShowSubDomains(selectedDomain); // Keep the dropdown open on small screens
    }
  };

  const filteredMentors = mentors.filter((mentor) => {
    if (selectedDomain === "All Domains") {
      return true;
    }
    if (!mentor.domains.includes(selectedDomain)) {
      return false;
    }
    if (
      selectedSubDomains.length > 0 &&
      !selectedSubDomains.some((subDomain) =>
        mentor.subdomains.includes(subDomain)
      )
    ) {
      return false;
    }
    return true;
  });

  const handleOnchange = (e) => {
    const searchValue = e.target.value.toLowerCase();

    const filteredMentors = originalMentors.filter((mentor) => {
      const nameMatch = mentor.name.toLowerCase().includes(searchValue);

      const domainMatch = mentor.domains.some((domain) =>
        domain.toLowerCase().includes(searchValue)
      );
      const subdomainMatch = mentor.subdomains.some((subdomain) =>
        subdomain.toLowerCase().includes(searchValue)
      );
      const skillsMatch = mentor.skills.some((skill) =>
        skill.toLowerCase().includes(searchValue)
      );

      return domainMatch || subdomainMatch || skillsMatch || nameMatch;
    });

    setMentors(filteredMentors);
  };

  return (
    <div className="w-full lg:w-10/12 mx-auto p-4 flex-grow">
      <div className="text-3xl font-sans text-center mb-10 mt-5">
        Book a{" "}
        <span className="bg-gradient-to-r from-orange-200 to-orange-500 text-transparent bg-clip-text">
          Free Trial
        </span>{" "}
        with a Mentor of your Choice
      </div>
      {/* Filter options */}
      <input
        type="text"
        placeholder="Search by name, domain, or skill"
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        onChange={handleOnchange}
      />
      <div className="flex space-x-1 md:space-x-2 lg:space-x-3 mb-3 overflow-x-auto hidden-scrollbar">
        {domainOptions.map((option, index) => (
          <div key={index} className="relative">
            <button
              className={`flex flex-col md:flex-row items-center space-x-1 cursor-pointer border border-gray-300 px-2 py-1 whitespace-nowrap rounded-lg ${
                selectedDomain === option.name
                  ? "bg-black text-white"
                  : "text-black"
              }`}
              onClick={(e) => handleDomainClick(option.name, e)}
            >
              <span>{option.icon}</span>

              <span className="text-sm">{option.name}</span>
            </button>
          </div>
        ))}
      </div>
      <div className="md:hidden overflow-x-auto hidden-scrollbar mt-3 mb-3">
        {showSubDomains && selectedDomain !== "All Domains" && (
          <div
            className="flex w-fit space-x-1"
            style={{ boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
          >
            {subDomainOptions
              .find(
                (subDomainOption) => subDomainOption.name === selectedDomain
              )
              .options.map((subDomain, subDomainIndex) => (
                <div
                  key={subDomainIndex}
                  className={`whitespace-nowrap border border-gray-200 rounded-3xl text-sm px-2 py-1 mx-auto cursor-pointer ${
                    selectedSubDomains.includes(subDomain)
                      ? "bg-black text-white"
                      : "text-black"
                  }`}
                >
                  <label
                    className="whitespace-nowrap text-sm font-light"
                    htmlFor={subDomain}
                  >
                    {subDomain}
                  </label>
                  {selectedSubDomains.includes(subDomain) && (
                    <FaTimes
                      className="inline mb-0.5 ml-2 cursor-pointer"
                      onClick={() => handleSubDomainChange(subDomain)}
                    />
                  )}
                  {!selectedSubDomains.includes(subDomain) && (
                    <input
                      type="checkbox"
                      id={subDomain}
                      name={subDomain}
                      className="hidden"
                      checked={selectedSubDomains.includes(subDomain)}
                      onChange={() => handleSubDomainChange(subDomain)}
                    />
                  )}
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="hidden relative md:flex">
        {showSubDomains && selectedDomain !== "All Domains" && (
          <div
            ref={subDomainDropdownRef}
            className={`absolute top-50  bg-white p-4 rounded-lg z-50 w-fit mx-auto`}
            style={{ boxShadow: "0 0 10px rgba(0,0,0,0.1)", left: left-180}}
          >
            <div className="whitespace-nowrap text-2xl font-bold m-2">
              {selectedDomain + " "} Domains
            </div>
            <hr />
            {subDomainOptions
              .find(
                (subDomainOption) => subDomainOption.name === selectedDomain
              )
              .options.map((subDomain, subDomainIndex) => (
                <div
                  key={subDomainIndex}
                  className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md flex m-1"
                >
                  <input
                    type="checkbox"
                    id={subDomain}
                    name={subDomain}
                    className="mr-2"
                    checked={selectedSubDomains.includes(subDomain)}
                    onChange={() => handleSubDomainChange(subDomain)}
                  />
                  <label
                    className="whitespace-nowrap text-sm"
                    htmlFor={subDomain}
                  >
                    {subDomain}
                  </label>
                </div>
              ))}
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-3 lg:gap-6">
        {filteredMentors.map((mentor, index) => (
          <div
            key={mentor.profilephoto.public_id}
            className="border rounded-lg bg-white transition-shadow duration-300 ease-in-out overflow-hidden cursor-pointer"
            ref={(el) => (cardRefs.current[index] = el)}
            onClick={() => {
              console.log(mentor._id);
              navigation(`/detailedmentor/${mentor._id}`);
            }}
          >
            <div className="relative md:pt-3 md:pl-3 md:pr-3 w-full">
              <img
                src={mentor.profilephoto.url}
                alt="profile photo"
                className="object-cover rounded-lg w-full h-full"
              />
              <div className="absolute inset-0 "></div>
            </div>
            <div className="p-2 md:p-3 lg:p-6">
              <div className="flex justify-between items-center mb-2">
                <div className="text-base font-bold whitespace-nowrap">
                  {displayedNames[index]}
                </div>
                <div className="text-gray-600 bg-gray-200 px-1 rounded-md whitespace-nowrap">
                  {mentor.experience} YOE
                </div>
              </div>
              <div className="text-gray-500 text-sm mb-4 whitespace-nowrap">
                Hourly Fees : ₹{mentor.hourlyRate}
              </div>
              <div className="flex overflow-hidden mb-4">
                <div className="flex flex-nowrap space-x-2">
                  {mentor.skills
                    .slice(
                      0,
                      calculateSkillsToShow(
                        cardRefs.current[index]?.offsetWidth || 0,
                        mentor.skills
                      )
                    )
                    .map((skill, skillIndex) => (
                      <div key={skillIndex} className="text-xs flex">
                        {skill}
                      </div>
                    ))}
                  {mentor.skills.length >
                    calculateSkillsToShow(
                      cardRefs.current[index]?.offsetWidth || 0,
                      mentor.skills
                    ) && <div className="text-xs flex items-center">...</div>}
                </div>
              </div>
              <div className="flex justify-between items-center">
                {getDomainIcon(mentor.domain)}
                <a
                  href={`tel:${mentor.phoneNumber}`}
                  className="text-green-600 text-xl hover:text-green-800 transition-colors duration-300 ease-in-out"
                >
                  <FaPhone />
                </a>
                <a
                  href={`https://wa.me/${mentor.whatsappNumber}`}
                  className="text-green-500 text-xl hover:text-green-700 transition-colors duration-300 ease-in-out"
                >
                  <FaWhatsapp className="text-2xl" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explorementors;