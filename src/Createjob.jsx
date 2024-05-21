import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CreateJob() {
  const [email, setEmail] = useState("");
  useEffect(() => {
    // getting data from local storage
    const data = localStorage.getItem("user");
    if (data) {
      const user = JSON.parse(data);
      setEmail(user.email);
    } else {
      console.log("User not found in local storage");
    }
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    minAmountPerHour: "",
    maxAmountPerHour: "",
    jobType: "",
    location: "",
    phoneNumber: "",
    whatsappNumber: "",
    countryCode: "+1", // Default country code
    isDifferentWhatsappNumber: false, // Flag to indicate if WhatsApp number is different
  });

  const [formErrors, setFormErrors] = useState({
    title: false,
    description: false,
    minAmountPerHour: false,
    maxAmountPerHour: false,
    jobType: false,
    location: false,
    phoneNumber: false,
    whatsappNumber: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });

    // If WhatsApp number is same as phone number, update WhatsApp number when phone number changes
    if (name === "phoneNumber" && !formData.isDifferentWhatsappNumber) {
      setFormData({ ...formData, whatsappNumber: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    let errors = false;
    const updatedFormErrors = { ...formErrors };
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        updatedFormErrors[key] = true;
        errors = true;
      } else {
        updatedFormErrors[key] = false; // Reset error state if field is not empty
      }
    });
    setFormErrors(updatedFormErrors);
    if (!errors) {
      // Perform form submission
      const jobData = { ...formData, email: email };
      await axios.post("http://localhost:3000/addJob", jobData).then((res) => {
        console.log("Job created successfully:", res.data);
        alert("Job created successfully");
      });
      console.log("Form submitted successfully");
    }
  };

  const countryCodes = [
    { code: "+1", name: "United States" },
    { code: "+91", name: "India" },
    { code: "+44", name: "United Kingdom" },
    // Add more country codes as needed
  ];

  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-orange-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2">
        <h2 className="text-2xl font-semibold mb-4 text-orange-700">
          Create a Job
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-semibold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`border rounded py-2 px-3 w-full text-orange-700 bg-orange-50 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 ${
                formErrors.title && submitted ? "border-red-500" : ""
              }`}
            />
            {formErrors.title && submitted && (
              <p className="text-red-500 text-xs mt-1">
                This field is required
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-semibold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`border rounded py-2 px-3 w-full text-orange-700 bg-orange-50 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 ${
                formErrors.description && submitted ? "border-red-500" : ""
              }`}
              rows="4"
            />
            {formErrors.description && submitted && (
              <p className="text-red-500 text-xs mt-1">
                This field is required
              </p>
            )}
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="mb-4 md:w-1/2">
              <label
                htmlFor="minAmountPerHour"
                className="block text-gray-700 font-semibold mb-2"
              >
                Minimum Amount per Hour
              </label>
              <input
                type="number"
                id="minAmountPerHour"
                name="minAmountPerHour"
                value={formData.minAmountPerHour}
                onChange={handleChange}
                className={`border rounded py-2 px-3 w-full text-orange-700 bg-orange-50 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 ${
                  formErrors.minAmountPerHour && submitted
                    ? "border-red-500"
                    : ""
                }`}
                min={100}
              />
              {formErrors.minAmountPerHour && submitted && (
                <p className="text-red-500 text-xs mt-1">
                  This field is required
                </p>
              )}
            </div>
            <div className="mb-4 md:w-1/2">
              <label
                htmlFor="maxAmountPerHour"
                className="block text-gray-700 font-semibold mb-2"
              >
                Maximum Amount per Hour
              </label>
              <input
                type="number"
                id="maxAmountPerHour"
                name="maxAmountPerHour"
                value={formData.maxAmountPerHour}
                onChange={handleChange}
                className={`border rounded py-2 px-3 w-full text-orange-700 bg-orange-50 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 ${
                  formErrors.maxAmountPerHour && submitted
                    ? "border-red-500"
                    : ""
                }`}
                max={10000}
              />
              {formErrors.maxAmountPerHour && submitted && (
                <p className="text-red-500 text-xs mt-1">
                  This field is required
                </p>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="jobType"
              className="block text-gray-700 font-semibold mb-2"
            >
              Job Type
            </label>
            <select
              id="jobType"
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className={`border rounded py-2 px-3 w-full text-orange-700 bg-orange-50 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 ${
                formErrors.jobType && submitted ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Job Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
            </select>
            {formErrors.jobType && submitted && (
              <p className="text-red-500 text-xs mt-1">
                This field is required
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-gray-700 font-semibold mb-2"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`border rounded py-2 px-3 w-full text-orange-700 bg-orange-50 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 ${
                formErrors.location && submitted ? "border-red-500" : ""
              }`}
            />
            {formErrors.location && submitted && (
              <p className="text-red-500 text-xs mt-1">
                This field is required
              </p>
            )}
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="isDifferentWhatsappNumber"
              name="isDifferentWhatsappNumber"
              checked={formData.isDifferentWhatsappNumber}
              onChange={handleChange}
              className="mr-2 mt-1"
            />
            <label
              htmlFor="isDifferentWhatsappNumber"
              className="text-gray-700"
            >
              <span className="font-semibold">Below number is not whatsapp number(First click and then enter number)</span> 
            </label>
          </div>
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 font-semibold mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`border rounded py-2 px-3 w-full text-orange-700 bg-orange-50 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 ${
                formErrors.phoneNumber && submitted ? "border-red-500" : ""
              }`}
            />
            {formErrors.phoneNumber && submitted && (
              <p className="text-red-500 text-xs mt-1">
                This field is required
              </p>
            )}
          </div>

          {formData.isDifferentWhatsappNumber && (
            <div className="mb-4">
              <label
                htmlFor="whatsappNumber"
                className="block text-gray-700 font-semibold mb-2"
              >
                WhatsApp Number
              </label>
              <input
                type="tel"
                id="whatsappNumber"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                className={`border rounded py-2 px-3 w-full text-orange-700 bg-orange-50 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 ${
                  formErrors.whatsappNumber && submitted ? "border-red-500" : ""
                }`}
              />
              {formErrors.whatsappNumber && submitted && (
                <p className="text-red-500 text-xs mt-1">
                  This field is required
                </p>
              )}
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="countryCode"
              className="block text-gray-700 font-semibold mb-2"
            >
              Country Code
            </label>
            <select
              id="countryCode"
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              className={`border rounded py-2 px-3 w-full text-orange-700 bg-orange-50 focus:border-orange-500 focus:ring-2 focus:ring-orange-200`}
            >
              {countryCodes.map((country) => (
                <option key={country.code} value={country.code}>
                  {`${country.name} (${country.code})`}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
