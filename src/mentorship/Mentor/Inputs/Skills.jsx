import { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { TfiClose } from "react-icons/tfi";

function Skills({ next, back, handleSkillsChange, mentorData }) {
  const [selectedSkills, setSelectedSkills] = useState(mentorData.skills);
  const [mainSkills, setMainSkills] = useState([]);
  //   const [searchTerm, setSearchTerm] = useState("");
  //   const [searchResults, setSearchResults] = useState([]);
  const inputDomains = [
    "Engineering",
    "Schooling",
    "Govt. Exams",
    "College",
    "JEE / NEET",
    "Extra Class",
    "Interview Prep",
    "Others",
  ];
  const skillsList = [
    {
      Engineering: [
        "DSA",
        "HTML",
        "CSS",
        "Web Development",
        "React",
        "Angular",
        "Node.js",
        "Express.js",
        "MongoDB",
        "SQL",
        "Python",
        "Java",
        "C++",
        "C",
        "Machine Learning",
        "Data Science",
        "Artificial Intelligence",
        "Cyber Security",
        "Ethical Hacking",
        "Networking",
        "Blockchain",
        "IoT",
        "Embedded Systems",
        "Robotics",
        "Automation",
        "Control Systems",
        "VLSI",
        "Digital Electronics",
        "Analog Electronics",
        "Power Electronics",
        "Signal Processing",
        "Communication Systems",
        "Microwave Engineering",
        "Antenna Design",
        "Radar Systems",
        "Satellite Communication",
        "Mobile Communication",
        "Optical Communication",
        "Wireless Communication",
      ],
    },{
      "Data Science" : [
        "PowerBI",
        "Excel",
        "Tableau",
        "SQL",
        "MySql",
        "Data Cleaning",
        "Data Filtering",
      ]
    },
    {
      Schooling: [
        "Physics",
        "Maths",
        "Biology",
        "Chemistry",
        "Genetics",
        "Ecology",
        "Environmental Science",
        "Earth Science",
        "Astronomy",
        "Astrophysics",
        "Meteorology",
        "Oceanography",
        "Geology",
        "Paleontology",
        "Archaeology",
        "Anthropology",
        "History",
        "Political Science",
        "Economics",
      ],
    },
    {
      "Govt. Exams": [
        "Defence Services",
        "Police Services",
        "Forest Services",
        "Railway Services",
        "Banking Services",
        "Insurance Services",
        "Postal Services",
        "Telecom Services",
        "Central Services",
        "State Services",
        "Local Services",
        "Public Services",
        "Private Services",
        "Government Services",
        "Administrative Services",
        "Revenue Services",
        "Finance Services",
        "Accounting Services",
        "Audit Services",
        "Taxation Services",
        "Customs Services",
        "Excise Services",
        "Legal Services",
        "Judicial Services",
        "Legislative Services",
        "Executive Services",
        "Regulatory Services",
        "Development Services",
        "Planning Services",
        "Engineering Services",
        "Technical Services",
        "Scientific Services",
        "Medical Services",
        "Health Services",
        "Educational Services",
        "Training Services",
        "Research Services",
        "Information Services",
        "Communication Services",
        "Transport Services",
        "Logistics Services",
        "Supply Chain Services",
      ],
    },
    {
      "College" : [
        "Mechanical",
        "Metallurgy",
        "Fashion Design",
        "Accounting",
      ]
    },
    {
      "Extra Class":[
        "Kathak",
        "Classical",
        "Hip Hop",
        "Kartanak Music",
        "Punjabi Music",
        "Clay Work",
        "Color Painting",
        "South India Cooking",
        "Gujrati Style Cooking",
        "Western Music",
        "Guitarist",
        "Tabla/Dholak",
        "Harmonium",
        "Casio"
      ]
    },
    {
      "JEE / NEET" : [
        "Algebra",
        "Trignometry",
        "Statistics",
        "Probability",
        "Geometry",
        "Calculus",
        "Differential Equations",
        "Linear Algebra",
        "Mechanics",
        "Electrostatics",
        "Quantum Mechanics",
        "Optics",
        "Thermodynamics",
        "Organic Chemistry",
        "Inorganic Chemistry",
        "Physical Chemistry",
        "Biochemistry",
        "Biotechnology",
        "Microbiology",
      ]
    },{
      "Interview Prep":[
        "Case Study",
        "Presentation Skills",
        "Body Language",
        "Corporate Etiquette",
        "Stress Management",
        "Time Management",
        "Confidence Building",
        "Public Speaking",
        "Communication Skills",
        "Leadership Skills",
        "Team Building",
        "Problem Solving",
        "Logical Reasoning",
        "Verbal Ability",
        "Quantitative Aptitude",
        "Decision Making",
        "Negotiation Skills",
        "Conflict Management",
        "Emotional Intelligence",
        "Motivation",
      ]
    }
  ];

  useEffect(() => {
    const domain = mentorData.domain;

    inputDomains.map((dom) => {
      if (domain.includes(dom)) {
        skillsList.map((skills) => {
          if (skills[dom]) {
            skills[dom].map((singleSkill) => {
              setMainSkills((prev) => [...prev, singleSkill]);
            });
          }
        });
      }
    });
  }, []);

  // Function to handle skill selection
  const handleSkillSelect = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // Function to handle skill removal
  const handleSkillRemove = (skill) => {
    setSelectedSkills(
      selectedSkills.filter((selectedSkill) => selectedSkill !== skill)
    );
  };

  // Function to handle search input change

  //   const handleSearchChange = (event) => {
  //     setSearchTerm(event.target.value);
  //   if (event.target.value === "") { //     setSearchResults([]);
  //   } else {
  //     const filteredSkills = mainSkills.filter((skill) =>
  //       skill.toLowerCase().includes(event.target.value.toLowerCase())
  //     );
  //     setSearchResults(filteredSkills.slice(0, 5));
  //   }
  //   };

  return (
    <div className="w-11/12 flex sm:flex-col flex-col">
      <div className="flex  flex-col items-center flex-1">
        <h3 className="text-2xl m-4">Selected Skills</h3>
        <ul className=" max-h-40 section overflow-y-scroll justify-center flex-col w-11/12 lg:w-6/12">
          {selectedSkills.map((skill) => (
            <div
              key={skill}
              className="flex flex-1 item-center  text-center cursor-pointer relative"
              onClick={() => handleSkillRemove(skill)}
            >
              <li className="m-1 text-left mr-10 text-lg p-1"> {skill} </li>
              <TfiClose className="text-lg absolute right-0 top-4" />
            </div>
          ))}
        </ul>
      </div>
      <p className="border-2 my-2 w-full border-orange-300"> </p>
      {/* 
       <div className="relative"> <h2>Search Skills</h2> <input className="border-2" type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search skills" /> {searchResults.length > 0 && ( <ul className="z-10 absolute border-2 h-32 w-full border-orange-500 backdrop-blur-xl"> {searchResults.map((skill) => ( <li key={skill} onClick={() => { handleSkillSelect(skill); setShowPopup(false); }} > {skill} </li> ))} </ul> )} </div> <p className="border-2 w-full border-orange-300"> </p> */}
      <div className="flex flex-1 flex-col items-center">
        <h3 className="text-2xl m-4 ">All Skills</h3>
        <ul className=" max-h-40 w-full lg:w-6/12 overflow-y-scroll section flex-1 justify-center flex-col">
          {mainSkills.map((skill) => (
            <div
              key={skill}
              className="flex flex-1 px-4 cursor-pointer relative"
              onClick={() => handleSkillSelect(skill)}
            >
              <li className="m-1 w-full text-lg p-1">{skill}</li>
              <IoIosAdd className="text-2xl absolute right-2 top-3" />
            </div>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-center">
        <button
          className="border-orange-500 border-2 py-3 px-5 rounded-lg m-4"
          onClick={back}
        >
          Back
        </button>
        <button
          className="bg-orange-500 text-white py-3 px-5 rounded-lg m-4"
          onClick={(e) => {
            handleSkillsChange(selectedSkills);
            next(e);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Skills;
