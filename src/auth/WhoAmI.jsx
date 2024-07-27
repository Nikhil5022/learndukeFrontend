import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function WhoAmI() {
  const navigate = useNavigate();
  useEffect(() => {
    const saveUserDetails = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const email = urlParams.get("email");
      const name = urlParams.get("name");
      const accessToken = urlParams.get("accessToken");
      if (email==null || name==null || accessToken==null) {
        console.table({email, name, accessToken})
        navigate("/jobs");
      }
    };
    saveUserDetails();
  }, []);
  return (
    <div className="flex p-4 t">
      <div className="w-1/2 t p-2 flex flex-col justify-center items-center">
        <div>
          <h1 className="text-3xl m-4 font-serif">
            Let's get started....
            <br />
          </h1>
          <p className="w-full p-2 text-xl"> I'm a ...</p>
          <div className="py-4 flex flex-col items-start">
            <button
              className="py-2 px-4 rounded-md border border-gray-400 w-3/4 text-left m-2"
              onClick={() => navigate("/hr-details")}
            >
              ◯ HR
            </button>
            <button
              className="py-2 px-4 rounded-md border border-gray-400 w-3/4 text-left m-2"
              onClick={() => navigate("/become-a-mentor")}
            >
              ◯ Mentor
            </button>
            <button
              className="py-2 px-4 rounded-md border border-gray-400 w-3/4 text-left m-2"
              onClick={() => navigate("/jobs")}
            >
              ◯ Student
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/2 t p-2"> Design yet to be added</div>
    </div>
  );
}

export default WhoAmI;
