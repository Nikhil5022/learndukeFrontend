import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Userdata() {
    const [User, setUser] = useState(null);
    useEffect(() => {
        const user=JSON.parse(localStorage.getItem("user"));
        console.log(user);
        setUser(user);
    }, []);



  const [formData, setFormData] = useState({
    linkedin: '',
    github: '',
    phoneNumber: '',
    whatsappNumber: '',
    bio: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.linkedin) formErrors.linkedin = 'LinkedIn profile is required';
    if (!formData.github) formErrors.github = 'GitHub profile is required';
    if (!formData.phoneNumber) formErrors.phoneNumber = 'Phone number is required';
    if (!formData.whatsappNumber) formErrors.whatsappNumber = 'WhatsApp number is required';
    if (!formData.bio) formErrors.bio = 'Bio is required';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form Data Submitted:', formData);
      axios.post('http://localhost:3000/updateUserInfo/' + User.email, formData).then((response) => {
        console.log(response.data);
        alert('User data updated successfully');
        window.location.href = 'http://localhost:5173/';
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-orange-600">User Data</h1>
        <div className="mb-4">
          <label className="block text-gray-700">LinkedIn</label>
          <input
            type="text"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            className="w-full p-2 border border-orange-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          {errors.linkedin && <p className="text-red-500 text-xs mt-1">{errors.linkedin}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">GitHub</label>
          <input
            type="text"
            name="github"
            value={formData.github}
            onChange={handleChange}
            className="w-full p-2 border border-orange-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          {errors.github && <p className="text-red-500 text-xs mt-1">{errors.github}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border border-orange-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">WhatsApp Number</label>
          <input
            type="text"
            name="whatsappNumber"
            value={formData.whatsappNumber}
            onChange={handleChange}
            className="w-full p-2 border border-orange-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          {errors.whatsappNumber && <p className="text-red-500 text-xs mt-1">{errors.whatsappNumber}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full p-2 border border-orange-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          {errors.bio && <p className="text-red-500 text-xs mt-1">{errors.bio}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Userdata;
