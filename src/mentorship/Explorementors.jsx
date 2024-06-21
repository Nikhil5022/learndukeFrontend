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
  FaPhoneAlt,
} from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import "./mentors.css";
import { useNavigate } from "react-router-dom";
import user2 from "../assets/user.png";
import crying from "../assets/crying.gif";
import { MdSchool } from "react-icons/md";
import Loader from "../Loader";


const domainOptions = [
  { name: "All Domains", icon: <FaGlobe />, number: 0 },
  { name: "Engineering", icon: <FaLaptopCode />, number: 1 },
  { name: "Data Science", icon: <FaDatabase />, number: 2 },
  { name: "Business", icon: <FaChartLine />, number: 3 },
  { name: "School", icon: <FaSchool />, number: 4 },
  { name: "College", icon: <FaGraduationCap />, number: 5 },
  { name: "Govt Exams", icon: <FaUniversity />, number: 6 },
  { name: "Jee/neet", icon: <FaBook />, number: 7 },
  { name: "Extra class", icon: <FaChalkboardTeacher />, number: 8 },
  { name: "Interview prep", icon: <FaChalkboardTeacher />, number: 9 },
  { name: "Career Counselling", icon: <PiStudentBold />, number: 10 },
];

const subDomainOptions = [
  {
    name: "Engineering",
    options: [
      "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "DevOps/SRE/Cloud Engineer",
        "Cyber Security Engineer",
        "QA Automation Engineer",
        "Engineering Manager",
        "Electrical Engineering",
        "Mechanical Engineering",
        "Civil Engineering",
        "Chemical Engineering",
        "Aerospace Engineering",
        "Biomedical Engineering",
        "Environmental Engineering",
        "Instruments Engineering",
        "AIML Engineer",
    ],
  },
  {
    name: "Data Science",
    options: [
      "Data Analyst",
      "Data Engineer",
      "Data Scientist",
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
  },{
    name: "Career Counselling",
    options: [
      "Career Path",
        "Study Abroad ",
        "Admission Path",
        "Life Skill",
        "College Path",
        "Course Path",
        "Job Path",
        "Career Advisor",
        "Career Consultant",
    ]
  },
  {
    name: "School",
    options: [
      "Class 1",
        "Class 2",
        "Class 3",
        "Class 4",
        "Class 5",
        "Class 6",
        "Class 7",
        "Class 8",
        "Class 9",
        "Class 10",
        "Class 11",
        "Class 12",
    ],
  },
  {
    name: "College",
    options: [
      "Pharmacy",
        "Management",
        "Commerce",
        "Arts",
        "Science",
        "Law",
        "Medical",
        "Engineering",
        "Fashion",
        "Design",
        "Mass Communication",
        "Hotel Management",
        "Agriculture",
        "Computer Application",
    ],
  },
  {
    name: "Govt Exams",
    options: ["UPSC",
        "MPPSC",
        "NDA",
        "SSC CHSL",
        "SSC CGL",
        "OPSC OAS",
        "OSSSC",
        "Railway Group D ",
        "Banking",
        "Judiciary",
        "Defence",
        "State PSC",
        "Police",
        "Teaching",],
  },
  {
    name: "Jee/neet",
    options: ["Physics", "Chemistry", "Biology", "Mathematics"],
  },
  {
    name: "Extra class",
    options: [
      "Dance", 
        "Music",
        "Art and Craft",
        "Yoga",
        "Meditation",
        "Cooking",
        "Photography",
        "Fitness",
        "Personality Development",
        "Public Speaking",
        "Communication Skills",
        "Debate",
        "Instrumental Music",
        "Painting",
        "Sketching",
        "Craft",
    ],
  },
  {
    name: "Interview prep",
    options: [
      "Resume Round",
        "GD Round",
        "Aptitude Round",
        "Technical Interview",
        "HR Interview",
        "Salary Negotiation"
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
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [onLoad, setOnLoad] = useState(false);

  const handleResize = () => {
    const newDisplayedNames = mentors.map((mentor, index) => {
      const cardWidth = cardRefs.current[index]?.offsetWidth || 250;
      const maxChars = Math.floor(cardWidth / 13); // Approximate number of characters per pixel width
      return mentor.name.length > maxChars
        ? `${mentor.name.substring(0, maxChars - 3)}...`
        : mentor.name;
    });
    setDisplayedNames(newDisplayedNames);
  };

  const fetchMentors = async () => {
    try {
      const response = await axios.get("https://learndukeserver.vercel.app/getMentors");
      setMentors(response.data);
      setOriginalMentors(response.data);
      console.log(response.data);
      setOnLoad(true);
      handleResize(); // Calculate displayed names right after setting mentors data
    } catch (error) {
      console.error("Error fetching mentors:", error);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    fetchMentors();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mentors]);

  useEffect(() => {
    handleResize();
  }, [mentors, windowWidth]);

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
    const left = e.target.getBoundingClientRect().left;
    setLeft(left);
    setSelectedDomain(domain);
    setShowSubDomains(domain);

    if (domain === "All Domains") {
      setSelectedSubDomains([]);
      setMentors(originalMentors); // Reset mentors to all mentors if "All Domains" is selected
    }
  };

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

  useEffect(() => {
    const filteredMentors = originalMentors.filter((mentor) => {
      if (selectedDomain === "All Domains") {
        return true;
      }
      if (!mentor.domain.includes(selectedDomain)) {
        return false;
      }
      if (
        selectedSubDomains.length > 0 &&
        !selectedSubDomains.some((subDomain) =>
          mentor.subDomain.includes(subDomain)
        )
      ) {
        return false;
      }
      return true;
    });

    setFilteredMentors(filteredMentors);
  }, [selectedDomain, selectedSubDomains, originalMentors]);

  const handleOnchange = (e) => {
    const searchValue = e.target.value.toLowerCase();

    const filteredMentors = originalMentors.filter((mentor) => {
      const nameMatch = mentor.name.toLowerCase().includes(searchValue);

      const domainMatch = mentor.domain.some((domain) =>
        domain.toLowerCase().includes(searchValue)
      );
      const subdomainMatch = mentor.subDomain.some((subdomain) =>
        subdomain.toLowerCase().includes(searchValue)
      );
      const skillsMatch = mentor.skills.some((skill) =>
        skill.toLowerCase().includes(searchValue)
      );

      const locationMatch = mentor.location.toLowerCase().includes(searchValue);

      return domainMatch || subdomainMatch || skillsMatch || nameMatch || locationMatch;
    });

    setFilteredMentors(filteredMentors);
  };

  const calculateNameToShow = (name) => {

   
    const index = mentors.findIndex((mentor) => mentor.name === name);
    return displayedNames[index];
  }

  return (
    <div>
      {onLoad && (
        <div className="w-full lg:w-10/12 mx-auto p-4 flex-grow">
          <div className="text-3xl font-sans text-center mb-10 mt-5">
            Connect with{" "}
            <span className="bg-gradient-to-r from-orange-200 to-orange-500 text-transparent bg-clip-text">
              Mentor
            </span>{" "}
            of your choice.
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
          <div className="lg:hidden overflow-x-auto hidden-scrollbar mt-3 mb-3">
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
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div className="hidden relative lg:flex">
            {showSubDomains && selectedDomain !== "All Domains" && (
              <div
                ref={subDomainDropdownRef}
                className={`absolute top-50  bg-white p-4 rounded-lg z-50 w-fit mx-auto`}
                style={{
                  boxShadow: "0 0 10px 10px rgba(0,0,0,0.1)",
                  left: left - 180,
                }}
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
                        className="whitespace-nowrap text-md"
                        htmlFor={subDomain}
                      >
                        {subDomain}
                      </label>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3  xl:grid-cols-4 gap-5 md:gap-3 lg:gap-6">
            {filteredMentors.map((mentor, index) => (
              <div
              key={index}
              className="md:border border-gray-300 rounded-lg bg-white transition-shadow duration-300 ease-in-out overflow-hidden cursor-pointer flex flex-col"
              ref={(el) => (cardRefs.current[index] = el)}
              onClick={() => {
                console.log(mentor._id);
                navigation(`/detailedmentor/${mentor._id}`);
              }}
            >
              <div className="relative w-full" style={{ paddingTop: '100%' }}>
                <img
                  src={mentor.profilePhoto.url || user2}
                  alt="profile photo"
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0"></div>
              </div>
              <div className="p-1 md:p-3 flex-grow space-y-1.5 mt-1">
                <div className="flex justify-between items-center">
                  <div className="text-base font-semibold whitespace-nowrap">
                    {calculateNameToShow(mentor.name)}
                  </div>
                  <div className="text-gray-600 bg-gray-200 px-1 rounded-md whitespace-nowrap hidden md:flex">
                    {mentor.experience} YOE
                  </div>
                  <div className="text-gray-600 bg-gray-200 px-1 rounded-md whitespace-nowrap md:hidden">
                    {mentor.experience} Y
                  </div>
                </div>
                <div className="text-gray-500 text-sm whitespace-nowrap">
                  Hourly Fees : ₹{mentor.hourlyFees}
                </div>
                <div className="flex overflow-hidden w-full">
                  <MdSchool className="mr-1"/>
                  {mentor.skills.sort().slice(0, 3).map((skill, index) => (
                    <div
                      key={index}
                      className={`rounded-md whitespace-nowrap text-gray-600 text-xs ${index!=0 && "ml-1"}`}
                    >
                      {skill}
                      {index<2 && <span className="text-gray-400">,</span>}
                      {index === 2 && mentor.skills.length > 3 && "..."}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            ))}
            {filteredMentors.length === 0 && (
              <div className="text-center w-full col-span-full">
                <div className="flex justify-center p-3">
                  <img src={crying} alt="No mentors found" className="w-40" />
                </div>
                <div className="text-2xl font-bold -translate-x-4">
                  No mentors found
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {onLoad === false && (
        <Loader />
      )}
    </div>
  );
}

export default Explorementors;
