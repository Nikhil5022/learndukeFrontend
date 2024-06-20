import { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { TfiClose } from "react-icons/tfi";
import Modal from "../../../Modal";

function Skills({ next, back, handleSkillsChange, mentorData }) {
  const [selectedSkills, setSelectedSkills] = useState(mentorData.skills);
  const [mainSkills, setMainSkills] = useState([]);
  const [showModal, setShowModal] = useState(false);
  //   const [searchTerm, setSearchTerm] = useState("");
  //   const [searchResults, setSearchResults] = useState([]);
  const inputDomains = [
    "Engineering",
    "Data Science",
    "Career Counselling",
    "Product",
    "Schooling",
    "Govt. Exams",
    "College",
    "JEE / NEET",
    "Extra Class",
    "Interview Prep",
    "Business",
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
    },
    {
      "Data Science": [
        "PowerBI",
        "Excel",
        "Tableau",
        'Python',
        "R",
        "Hadoop",
        "SQL",
        "MySql",
        "Data Cleaning",
        "Data Filtering",
        "AWS",
        "Google Cloud",
        "Matplotlib",
        "Machine Learning",
        "Data processing",
        "Matlab",
      ],
    },
    {
      "Career Counselling": [
        "Advising",
        "Cultural Awareness",
        "Problem Solving",
        "Consulting",
        "Mentoring",
        "Guidance",
        "Motivation",
        "Networking",
        "Goal Setting",
        "Leadership",
        "Communication",
        "Researching",
      ],
    },
    {
      Product: [
        "Product Manager",
        "Program Manager",
        "Project Manager",
        "UI / UX Designer",
      ],
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
      College: [
        "Clinical Diagnosis",
        "Patient Education",
        "Medical Coding",
        "Surgical Techniques",
        "Mechanical",
        "Pharmaceutical Compounding",
        "Pharmacokinetics",
        "Metallurgy",
        "Fashion Design",
        "Accounting",
        "Financial Analysis",
        "Market Research",
        "Analytical Skills",
        "Inventory Management",
        "Drug Formulation",
        "Fashion Illustration",
        "Textile Knowledge",
        "Pattern Making",
        "UX Design",
        "3d Modeling",
        "Typography",
        "Brand Identity Development",
        "Environmental Design",
        "CRM",
        "Database Management",
      ],
    },
    {
      "Extra Class": [
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
        "Casio",
      ],
    },
    {
      Product: [
        "Problem solving",
        "Analytics",
        "Research Skills",
        "Microsoft Office",
        "Strategic Thinking",
        "Design",
        "Wireframing",
        "Leadership",
        "Sales",
        "Scrum",
        "Jira",
        "Figma",
      ],
    },
    {
      "JEE / NEET": [
        "Algebra",
        "Trignometry",
        "Statistics",
        "Probability",
        "Geometry",
        "Calculus",
        "3d Geometry",
        "Differential Equations",
        "Linear Algebra",
        "Mechanics",
        "Electrostatics",
        "Quantum Mechanics",
        "Optics",
        "Thermodynamics",
        "Kinematics",
        "Organic Chemistry",
        "Inorganic Chemistry",
        "Physical Chemistry",
        "Biochemistry",
        "Biotechnology",
        "Microbiology",
      ],
    },
    {
      "Interview Prep": [
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
      ],
    },
    {
      Business: [
        "Entrepreneur",
        "Risk Management",
        "Finance Management",
        "Market analysis",
        "Negotiation",
        "Marketing",
        "Networking",
        "Sales",
        "Time management",
        "Customer Service",
        "Communication",
        "Digital Marketing",
        "Team building",
      ],
    },
  ];

  useEffect(() => {
    const domain = mentorData.domain;
    inputDomains.map((dom) => {
      if (domain.includes(dom)) {
        skillsList.map((skills) => {
          if (skills[dom]) {
            skills[dom].map((singleSkill) => {
              if (!selectedSkills.includes(singleSkill)) {
                setMainSkills((prev) => [...prev, singleSkill]);
              }
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
      setMainSkills(mainSkills.filter((item) => item !== skill));
    }
  };

  // Function to handle skill removal
  const handleSkillRemove = (skill) => {
    setSelectedSkills(
      selectedSkills.filter((selectedSkill) => selectedSkill !== skill)
    );
    if (!mainSkills.includes(skill)) {
      setMainSkills([skill, ...mainSkills]);
    }
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

  const handleNotChecked = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <div className="w-11/12 flex sm:flex-col flex-col">
      <div className="flex  flex-col items-center flex-1">
        <h3 className="text-2xl m-4">Selected Skills</h3>
        <ul className=" max-h-40 section overflow-y-scroll flex-col w-11/12 lg:w-6/12">
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
            selectedSkills.length > 0 ? next(e) : handleNotChecked(e);
          }}
        >
          Next
        </button>
      </div>
      {showModal && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <div className="text-xl flex items-center justify-center">
            Please select atleast one skill.
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Skills;
