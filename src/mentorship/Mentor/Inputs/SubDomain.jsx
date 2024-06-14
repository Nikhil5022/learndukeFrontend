import { dom } from "@fortawesome/fontawesome-svg-core";
import { useEffect, useState } from "react";

function SubDomain({ next, handleSubDomainChange, domain, back }) {
  const allSubDomains = [
    {
      Engineering: [
        "Computer Science",
        "Civil",
        "Mechanical",
        "Information Technology",
        "Electronic",
        "Electrical",
        "Agricultural",
        "Biotechnology",
        "Automobile",
        "Robotics",
        "Chemical",
      ],
    },
    {
      Schooling: [
        "Social Science",
        "Physics",
        "Chemistry",
        "Humanities",
        "Biology",
        "Mathematics",
        "Information Technology",
        "History",
        "Geography",
        "Politics",
      ],
    },
    {
      "Govt. Exams": [
        "UPSC",
        "MPPSC",
        "NDA",
        "SSC CHSL",
        "SSC CGL",
        "Railway Group D ",
        "Banking",
        "Judiciary",
      ],
    },
  ];

  const [checks, setChecks] = useState(false);
  const [subDomains, setSubDomains] = useState([]);
  const [selectedSubDomain, setSelectedSubDomain] = useState([]);

  const handleChecked = (e) => {
    let updatedSd;
    if (e.target.checked) {
      updatedSd = [...selectedSubDomain, e.target.value];
    } else {
      updatedSd = selectedSubDomain.filter((value) => value !== e.target.value);
    }
    setSelectedSubDomain(updatedSd);
    setChecks(updatedSd.length > 0);
  };

  const handleNotChecked = (e) => {
    e.preventDefault();
    alert("Please select at least 1 subdomain");
  };

  useEffect(() => {
    if(domain.includes("Engineering")){
      allSubDomains[0]["Engineering"].map((singleSubDomain) => {setSubDomains((prev) => [...prev, singleSubDomain]);});
    }
    if(domain.includes("Govt. Exams")){
      allSubDomains[2]["Govt. Exams"].map((singleSubDomain) => {setSubDomains((prev) => [...prev, singleSubDomain]);});
    }
    if(domain.includes("Schooling")){
      allSubDomains[1]["Schooling"].map((singleSubDomain) => {setSubDomains((prev) => [...prev, singleSubDomain]);});
    }
  }, []);


  return (
    <form
      className="w-full flex flex-col items-center"
      onSubmit={checks ? next : handleNotChecked}
    >
      <h1 className="text-2xl">Choose Your Sub Domain</h1>
      <div className="max-h-60 overflow-scroll w-11/12">
        { subDomains.length > 0 ? subDomains.map((singleSubDomain,i) => (
          <div key={i} className="flex t items-center"
          >
            <input
              type="checkbox"
              id={singleSubDomain}
              name={singleSubDomain}
              value={singleSubDomain}
              onChange={handleChecked}
              className="mx-3 cursor-pointer"
            />
            <label className=" cursor-pointer" htmlFor={singleSubDomain}>{singleSubDomain}</label>
          </div>
        )) : <p>loading...</p>
        }
      </div>
      <br />
      <div className="flex ">
        <button
          className="border-2 mx-4 p-3 rounded-md px-6 border-orange-500"
          type="button"
          onClick={back}
        >
          Back
        </button>
        <button
          className="border-2 border-orange-500 mx-4 p-3 rounded-md px-7 bg-orange-500 text-white"
          type="submit"
          onClick={() => handleSubDomainChange(selectedSubDomain)}
        >
          Next
        </button>
      </div>
    </form>
  );
}

export default SubDomain;
