import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Domain({ handleDomainChange, next}){

  const navigate = useNavigate()
  let [selectedDomain, setSelectedDomain] = useState([])
  let [checks, setChecks] = useState(false)

  const inputDomains = ["Engineering", "Schooling", "Govt. Exams"]
  
  const handleChecked = (e) => {
    let updatedDomain;
    if (e.target.checked) {
      updatedDomain = [...selectedDomain, e.target.value];
    } else {
      updatedDomain = selectedDomain.filter((value) => value !== e.target.value);
    }
    setSelectedDomain(updatedDomain);
    setChecks(updatedDomain.length > 0);
  };

  const handleNotChecked = (e) => {
    e.preventDefault()
    alert("Please select at least 1 Domain")
  }

  return (
    <form onSubmit={checks ? next : handleNotChecked} className="flex flex-col justify-center">
      <label className="text-2xl">
        Choose Your Domains
        </label>
        <br />
        {
          inputDomains.map((domain) => {
            return (
              <div key={domain} className="flex p-2 text-lg">
                <input
                  type="checkbox"
                  id={domain}
                  name={domain}
                  value={domain}
                  onChange={handleChecked}
                  className="mx-3"
                />
                <label className="cursor-pointer" htmlFor={domain}>{domain}</label>
              </div>
            );
          })
        }
      <br />
      <div className="flex">
      <button className="border-2 mx-4 p-3 rounded-md px-6 border-orange-500" type="button" onClick={() => navigate("/mentorship")}>Cancel</button>
      <button className="border-2 border-orange-500 mx-4 p-3 rounded-md px-7 bg-orange-500 text-white" type="submit" onClick= {()=> handleDomainChange(selectedDomain)}>Next</button>
      </div>
    </form>
  );
}

export default Domain;
