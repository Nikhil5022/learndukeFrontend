import React, { useState } from "react";

function HrDetails() {
  const [hrData, setHrData] = useState({
    name: "",
    email: "",
    number: "",
    aadhar: "",
    pan: "",
    companyName: "",
    companyLogo: "",
    companyWebsite: "",
    companyEmail: "",
    companyNumber: "",
    companyAddress: "",
    companyDescription: "",
    companyLinkedin: "",
    companyDomain: "",
    gstIn: "",
  });

  const hrFormFields = [
    {
      name: "name",
      type: "text",
      placeholder: "Enter your full name",
      label: "Full Name",
      icon: "user",
    },
    {
      name: "pan",
      type: "text",
      placeholder: "Enter your pan number",
      label: "Pan",
      icon: "card",
    },
    {
      name: "aadhar",
      type: "number",
      placeholder: "Enter your aadhar number",
      label: "Aadhar",
      icon: "card",
    },
    {
      name: "email",
      type: "email",
      placeholder: "Enter your work email",
      label: "Email",
      icon: "email",
    },
    {
      name: "number",
      type: "number",
      placeholder: "Enter your number",
      label: "Phone Number",
      icon: "phone",
    },
    {
      name: "companyName",
      type: "text",
      placeholder: "Enter your company name",
      label: "Company Name",
      icon: "company",
    },
    {
      name: "companyWebsite",
      type: "url",
      placeholder: "Enter your company website",
      label: "Company Website",
      icon: "company",
    },
    {
      name: "companyEmail",
      type: "email",
      placeholder: "Enter your company email",
      label: "Company Email",
      icon: "company",
    },
    {
      name: "companyNumber",
      type: "number",
      placeholder: "Enter your company number",
      label: "Company Number",
      icon: "company",
    },
    {
      name: "companyAddress",
      type: "text",
      placeholder: "Enter your company address",
      label: "Company Address",
      icon: "company",
    },
    {
      name: "companyDescription",
      type: "text",
      placeholder: "Enter your company description",
      label: "Company Description",
      icon: "company",
    },
    {
      name: "companyLinkedin",
      type: "url",
      placeholder: "Enter your company linkedin",
      label: "Company Linkedin",
      icon: "company",
    },
    {
      name: "companyDomain",
      type: "text",
      placeholder: "Enter your company domain",
      label: "Company Domain",
      icon: "company",
    },
    {
      name: "gstIn",
      type: "text",
      placeholder: "Enter your company GSTIN",
      label: "GSTIN",
      icon: "company",
    },
    {
      name: "companyLogo",
      type: "file",
      placeholder: "Upload your company logo",
      label: "Company Logo",
      icon: "company",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(hrData);
  };

  return (
    <div className="w-full p-4 flex flex-col items-center justify-center relative">
      {/* <div className="absolute bg-pink-600 w-40 h-40 rounded-full left-40 top-20 -z-10" style={{ filter: "blur(130px)"}}></div> */}
      <div className="w-full p-3 flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-11/12 items-center md:w-3/5 p-2 py-3 backdrop-blur-3xl bg-gray-300 rounded-lg bg-opacity-20 justify-center"
          style={{ boxShadow: "0 0 40px 10px rgba(0, 0, 0, 0.2)" }}
        >
          <h2 className="text-2xl text-center mb-4">
            Details of HR and Company
          </h2>
          {hrFormFields.map((field, index) => {
            return (
              <div
                key={index}
                className="flex py-2 items-start flex-col w-10/12"
              >
                <label htmlFor={field.name} className="w-full">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  className={`border border-gray-300 w-full p-2 ${field.type === 'number' ? 'no-spinner' : ''}`}
                  required
                  value={hrData[field.name]}
                  onChange={(e) =>
                    setHrData((prev) => ({
                      ...prev,
                      [field.name]: e.target.value,
                    }))
                  }
                />
              </div>
            );
          })}

          <button type="submit">Submit</button>
        </form>
      </div>
      {/* for removing the arrows of input type number */}
      <style jsx>{`
        /* Hide the spinner controls for number inputs */
        .no-spinner::-webkit-outer-spin-button,
        .no-spinner::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .no-spinner {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
}

export default HrDetails;
