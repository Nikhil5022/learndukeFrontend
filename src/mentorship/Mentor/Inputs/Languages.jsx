import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { TfiClose } from "react-icons/tfi";

function Languages({ handleLanguageChange, next, back }) {
  //indian languages
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const allLanguages = [
    "English",
    "Hindi",
    "Bengali",
    "Telugu",
    "Marathi",
    "Tamil",
    "Urdu",
    "Gujarati",
    "Kannada",
    "Odia",
    "Malayalam",
    "Punj",
    "Sindhi",
    "Assamese",
    "Maithili",
    "Santali",
    "Kashmiri",
    "Nepali",
    "Konkani",
    "Dogri",
    "Manipuri",
    "Bodo",
    "Santhali",
    "Khasi",
    "Mizo",
    "Garo",
    "Ao",
    "Angami",
    "Chakhesang",
    "Chang",
    "Konyak",
    "Lotha",
    "Phom",
    "Pochury",
    "Rengma",
    "Sangtam",
    "Sumi",
    "Yimchunger",
    "Zeliang",
  ];

  const handleChecked = (e) => {
    let updatedLanguages;
    if (e.target.checked) {
      updatedLanguages = [...allLanguages, e.target.value];
    } else {
      updatedLanguages = allLanguages.filter(
        (value) => value !== e.target.value
      );
    }
    setSelectedLanguages(updatedLanguages);
  };

  const handleNotChecked = (e) => {
    e.preventDefault();
    alert("Please select at least 1 Language");
  }

  const handleLanguageSelect = (lang) => {
    if (!selectedLanguages.includes(lang)) {
      setSelectedLanguages([...selectedLanguages, lang]);
    }
  };

  const handleLanguageRemove = (lang) => {
    setSelectedLanguages(
      selectedLanguages.filter((i) => i !== lang)
    );
  };

  const handleSubmit = (e) => {
    handleLanguageChange(selectedLanguages);
    next(e);
  };

  return (
    <div>
      <div className="flex  flex-col items-center flex-1">
        <h3 className="text-2xl m-4">Selected Languages</h3>
        <ul className=" max-h-40 overflow-y-scroll t justify-center flex-col w-11/12 lg:w-6/12">
          {selectedLanguages.map((lang) => (
            <div
              key={lang}
              className="flex flex-1 item-center  text-center cursor-pointer relative"
              onClick={() => handleLanguageRemove(lang)}
            >
              <li className="m-1 p-1"> {lang} </li>
              <TfiClose className="text-lg absolute right-2 top-3" />
            </div>
          ))}
        </ul>
      </div>
      <div className="flex flex-1 flex-col items-center">
        <h3 className="text-2xl m-4">All Languages</h3>
        <ul className=" max-h-40 overflow-y-scroll t flex-1 justify-center flex-col">
          {allLanguages.map((lang) => (
            <div 
            key={lang}
            className="flex flex-1 item-center  text-center cursor-pointer relative"
            onClick={() => handleLanguageSelect(lang)}>
            <li className="m-1 p-1">
              {lang}
            </li>
            <IoIosAdd className="text-2xl absolute right-2 top-2" />
                </div>
          ))}
        </ul>
      </div>
        <div className="flex">
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
            onClick={(e) => {
              selectedLanguages.length<=0 ? handleNotChecked(e) : 
              handleSubmit(e) 
            }}   
          >
            Next
          </button>
        </div>
    </div>
  );
}

export default Languages;
