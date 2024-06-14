import { useState } from "react";
import Domain from "./Inputs/Domain";
import "./BecomeMentor.css"
import SubDomain from "./Inputs/SubDomain";
import Skills from "./Inputs/Skills";
import About from "./Inputs/About";
// import Description from "./Inputs/Description";
import Languages from "./Inputs/Languages";
import HourlyFees from "./Inputs/HourlyFees";
import Experience from "./Inputs/Experience";
import Location from "./Inputs/Location";
import Education from "./Inputs/Education";
import Number from "./Inputs/Number";
import Availability from "./Inputs/Availability";
import Address from "./Inputs/Address";
import ProfilePhoto from "./Inputs/ProfilePhoto";
import Description from "./Inputs/Description";

function BecomeMentor() {
  const [mentorData, setMentorData] = useState({
    profilePhoto: {},
    whatsAppNumber: "",
    phoneNumber: "",
    domain: [],
    subDomain: [],
    skills: [],
    about: "",
    experience: "",
    education: "",
    locationType: [],
    languages: [],
    hourlyFees: "",
    availabilityStartTime: "",
    availabilityEndTime: "",
    description: "",
    location: "",
  });

  const [currentStep, setCurrentStep] = useState(1);

  function next(e) {
    e.preventDefault();
    setCurrentStep(i => {
       return i<14 ? (i+1) : i;
    })    
  }

  function back() {
    setCurrentStep(i => {
        return i<1 ? i : (i-1);
    })
  }

  function handleDomainChange(e){
    setMentorData((prevState) => ({
      ...prevState,
      domain: e,
    }));
  };
  function handleSubDomainChange(e){
    setMentorData((prevState) => ({
      ...prevState,
      subDomain: e,
    }));
  };

  function handleSkillsChange(e) {
    setMentorData((prevState) => ({
      ...prevState,
      skills: e,
    }));
  }
  function handleAboutChange(e) {
    setMentorData((prevState) => ({
      ...prevState,
      about: e,
    }));
  }
  function handleDescriptionChange(e) {
    setMentorData((prevState) => ({
      ...prevState,
      description: e,
    }));
  }
  function handleLanguageChange(e) {
    setMentorData((prevState) => ({
      ...prevState,
      languages: e,
    }));
  }
  function handleExperienceChange(e) {
    setMentorData((prevState) => ({
      ...prevState,
      experience: e.target.value,
    }));
  }
  function handleLocationChange(e) {
    setMentorData((prevState) => ({
      ...prevState,
      locationType: e,
    }));
  }
  function handleHourlyFeesChange(e) {
    setMentorData((prevState) => ({
      ...prevState,
      hourlyFees: e.target.value,
    }));
  }
  function handleNumberChange(obj) {
    setMentorData((prevState) => ({
      ...prevState,
      phoneNumber: obj[0],
      whatsAppNumber: obj[1],
    }));
  }
  function handleProfilePhotoChange(e) {
    console.log(e);
    setMentorData((prevState) => ({
      ...prevState,
      profilePhoto: e,
    }));
    handleSubmit();
  }
  function handleEducationChange(e) {
    setMentorData((prevState) => ({
      ...prevState,
      education: e.target.value,
    }));
  }
  function handleAvailabilityChange(e) {
    setMentorData((prevState) => ({
      ...prevState,
      availabilityStartTime: e[0],
      availabilityEndTime: e[1],
    }));
  }
  function handleAddressChange(e) {
    setMentorData((prevState) => ({
      ...prevState,
      location: e.target.value,
    }));
  }

  function handleSubmit() {
    console.log(mentorData);
  }

  function Suggestion({ obj }) {
    return (
      <div className="flex items-center justify-center p-2 suggestion t">
        <div className="border-2 bg-orange-500 border-slate-900 text-white rounded-lg p-3 flex items-center justify-center flex-col min-w-96 suggestion_container">
          <h1 className="text-2xl p-2 font-semibold">
            😊{obj.name}
          </h1>
          <p className="my-4 lg:px-10 text-lg text-justify">
            {obj.suggestion}
          </p>
        </div>
      </div>
    );
  }

  const formSuggestions = [
    {
      id: 1,
      name: "Domain",
      suggestion:
        "LearnDuke offers you the opportunity to teach and share your knowledge in over 100 Domains. Use the search engine to select your main Domain and let the adventure begin :)",
      children: <Domain key={1} next={next} 
       handleDomainChange={handleDomainChange}/>,
    },
    {
      id: 2,
      name: "Sub Domain",
      suggestion:
        "Add sub domains to your Domain. It has many benefits and helps is better visibility of your profile to the users.",
      children: <SubDomain key={2} next={next} back={back} domain={mentorData.domain} handleSubDomainChange={handleSubDomainChange} />,
    },
    {
      id: 3,
      name: "Skills",
      suggestion:
        "Add Skills that your are pretty proud of. They'll help in drawing attention to your profile",
      children: <Skills key={3} next={next} back={back} domain={mentorData.domain} handleSkillsChange={handleSkillsChange}/>,
    },
    {
      id: 4,
      name: "About You",
      suggestion: `
      This is the keystone of your post! Make sure it is unique, catchy.
     Describe About:
        - The subjects you teach
        - Diploma, method, etc.
        - Your distinguishing features and everything
        that makes you stand out.`,
      children: <About key={4} handleAboutChange={handleAboutChange} next={next} back={back}/>,
    },
    {
      id: 5,
      name: "Description",
      suggestion: `Explain your approach as a teacher and how you share your knowledge

    - Your teaching techniques and methods
    - The usual structure of a class
    - Your special features as a teacher`,
      children: <Description key={5} handleDescriptionChange={handleDescriptionChange} next={next} back={back}/>,
    },
    {
      id: 6,
      name: "Languages",
      suggestion: `
        Add the languages you speak and teach in. This will help you to reach a wider audience.
        `,
      children: <Languages key={6} handleLanguageChange={handleLanguageChange} next={next} back={back}/>,
    },
    {
      id: 7,
      name: "Hourly Fees",
      suggestion: `
        You are free to choose your hourly fee and to change it at any time.
        If you are just starting out, you may not want to choose a fee that is too high. Wait for users' reviews and adjust the fee.`,
      children: <HourlyFees key={7} next={next} back={back} handleHourlyFeesChange={handleHourlyFeesChange}/>,
    },
    {
      id: 8,
      name: "Experience",
      suggestion:
        "Enter the year of Experience you have in the selected domain. This will useful in achieving trust from the users.",
      children: <Experience key={8} next={next} back={back} handleExperienceChange={handleExperienceChange}/>,
    },
    {
      id: 9,
      name: "Location",
      suggestion: `
        Your address will never appear on the site. It will only be given to students you agree to teach.
        You can offer your classes at home at the address indicated. If you prefer to teach online, you can also indicate it.`,
      children: <Location key={9} next={next} back={back} handleLocationChange={handleLocationChange}/>,
    },
    {
      id: 10,
      name: "Education",
      suggestion: "Enter any other emails you have.",
      children: <Education key={12} next={next} back={back} handleEducationChange={handleEducationChange}/>,
    },
    {
      id: 11,
      name: "Number",
      suggestion:
        "Please choose your mobile number so that user can contact you directly without any third party interference.",
      children: <Number key={11} handleNumberChange={handleNumberChange} next={next} back={back} />,
    },
    {
      id: 12,
      name: "Availability",
      suggestion:
        "Mention the timings when you'll be freely available to teach.",
      children: <Availability key={10} next={next} back={back} handleAvailabilityChange={handleAvailabilityChange}/>,
    },
    {
      id: 13,
      name: "Address",
      suggestion:
        "Mention the timings when you'll be freely available to teach.",
      children: <Address key={10} next={next} back={back} handleAddressChange={handleAddressChange}/>,
    },
    {
      id: 14,
      name: "Profile Photo",
      suggestion: `Your photo will be common on all your post. A professional and high definition image will help maximize the chances of receiving class requests. Upload your individual picture with a smiling face! `,
      children: <ProfilePhoto key={13} back={back}  handleProfilePhotoChange={handleProfilePhotoChange}/>,
    },
  ];

  return (
    <div>
      <div className="m-4">
       <progress value={currentStep} max={14} className="w-full h-2" />
     </div>
        <div className="w-full flex items-center justify-center">
       <div className="flex-1 flex items-center justify-center">
        {formSuggestions.map(
          (obj) =>
            obj.id === currentStep && <Suggestion key={obj.id} obj={obj} />
        )}
      </div>
      <div className="flex-1 t mentorInputs flex items-center justify-center flex-col">
        {formSuggestions.map((obj) => obj.id === currentStep && obj.children)}
      </div>
    </div>

    </div>
  );
}

export default BecomeMentor;
