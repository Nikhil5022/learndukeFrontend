import React from "react";

function MentorLoader() {
  return (
    <div className="md:border border-gray-300 bg-gray-200 rounded-lg transition-shadow text-gray-200 duration-300 ease-in-out overflow-hidden cursor-pointer flex flex-col h-7/12 relative">
      <div style={{ paddingTop: "100%" }}>
        <img
          src={
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
          alt="profile photo"
          className="absolute top-0 left-0 w-full h-11/12 object-cover rounded-lg"
        />
        <div className="absolute inset-0"></div>
      </div>
      <div className="p-1 md:p-3 flex-grow space-y-1.5 mt-1 ">
        <div className="flex justify-between items-center">
          <div className="text-base font-semibold bg-gray-300 text-gray-300 whitespace-nowrap">
            "Rahul Verma"
          </div>
          <div className="  px-1 rounded-md whitespace-nowrap bg-gray-300 text-gray-300 hidden md:flex">
            2 YOE
          </div>
          <div className="bg-gray-300 text-gray-300  px-1 rounded-md whitespace-nowrap md:hidden">
            1 Y
          </div>
        </div>
        <div className="text-sm whitespace-nowrap bg-gray-300 text-gray-300">
          Hourly Fees : ₹{500}
        </div>
        <div className="flex overflow-hidden relative w-full">
          {["IIT", "NIT", "IIIT"]
            .map((skill, index) => (
              <div
                key={index}
                className={`shine-animation rounded-md whitespace-nowrap bg-gray-300 w-3 mx-2 text-gray-300  text-xs ${
                  index != 0 && "ml-1"
                }`}
              >
                {skill}
              </div>
            ))}
        </div>
      </div>
<div className="shine-animation"></div>
    </div>
  );
}

export default MentorLoader;
