import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function UserPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [userData, setUserData] = useState(null);
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.email) {
      axios
        .get(`http://localhost:3000/getUser/${user.email}`)
        .then((response) => {
          setUserData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError("There was an error fetching the user data.");
          console.error(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const handleDelete = (jobId) => {
    axios
      .delete(`http://localhost:3000/deleteJob/${jobId}`)
      .then((response) => {
        setJobs(jobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        console.error("There was an error deleting the job:", error);
      });
  };

  const filteredJobs = jobs.filter((job) => {
    const titleMatch =
      job?.title?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    const descriptionMatch = job?.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const locationMatch =
      job?.location?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    const jobTypeMatch = !filterOption || job?.jobType === filterOption;

    return (titleMatch || descriptionMatch || locationMatch) && jobTypeMatch;
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserData({ ...userData, profilephoto:{
          url: e.target.result,
        } });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    console.log("User Data:", userData);
    // Save the updated profile data to the server
    axios.post(`http://localhost:3000/editUserData/${user.email}`, userData).then((response) => {
      console.log("Profile data updated successfully:", response.data);
      alert("Profile data updated successfully");
      setIsEditEnabled(false);
    });
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center h-screen items-center">
        <div className="w-full md:w-10/12 lg:w-9/12 flex flex-col px-4">
          <p className="text-center text-4xl font-bold">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center h-screen items-center">
        <div className="w-full md:w-10/12 lg:w-9/12 flex flex-col px-4">
          <p className="text-center text-4xl font-bold">{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full flex justify-center h-screen items-center">
        <div className="w-full md:w-10/12 lg:w-9/12 flex flex-col px-4">
          <p className="text-center text-4xl font-bold">Not Authorized</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center py-8">
      <div className="w-full md:w-10/12 lg:w-9/12 flex flex-col px-4">
        <div>
          {isEditEnabled ? (
            <div className="bg-orange-100 p-6 rounded-lg shadow-lg">
              <div className="flex justify-between">
              <div className="text-2xl font-semibold">Edit Profile</div>
              <button
                onClick={() => setIsEditEnabled(false)}
                className=" bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
              >Cancel</button>
              </div>
              <div className="flex justify-center m-5">
                <label htmlFor="profilePhotoInput" className="relative cursor-pointer group">
                  <img
                    src={userData.profilephoto.url}
                    alt=""
                    className="w-20 rounded-full"
                  />
                  
                </label>
                <input
                  type="file"
                  id="profilePhotoInput"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold">Name</label>
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold">Email</label>
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold">LinkedIn</label>
                  <input
                    type="text"
                    value={userData.linkedin}
                    onChange={(e) => setUserData({ ...userData, linkedin: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold">GitHub</label>
                  <input
                    type="text"
                    value={userData.github}
                    onChange={(e) => setUserData({ ...userData, github: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold">Phone Number</label>
                  <input
                    type="text"
                    value={userData.phoneNumber}
                    onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold">WhatsApp Number</label>
                  <input
                    type="text"
                    value={userData.whatsappNumber}
                    onChange={(e) => setUserData({ ...userData, whatsappNumber: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block font-semibold">Bio</label>
                  <textarea
                    value={userData.bio}
                    onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                    className="w-full p-2 border rounded"
                    rows={10}
                  />
                </div>
              </div>
              <div className="flex justify-end">
              <button
                className="mt-4 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
                onClick={handleSaveProfile}
              >
                Save
              </button>
              </div>
            </div>
          ) : (
            <div className="w-full flex ">
              <div className="w-1/3 flex flex-col items-center bg-orange-50 p-5 rounded-l-3xl shadow-lg">
                <img
                  src={userData?.profilephoto.url}
                  alt="Profile pic"
                  className="w-2/4 rounded-full my-5"
                  />
                <div className="text-2xl font-semibold my-3 text-center">
                  {userData?.name}
                </div>
              </div>
              <div className="w-2/3 bg-orange-100 p-5 rounded-r-3xl">
                <div className="flex justify-between">
                  <div className="text-2xl font-semibold my-3 text-orange-500">About Me</div>
                  <button
                    className="text-white bg-orange-500 px-5 h-12  rounded-md"
                    onClick={() => setIsEditEnabled(true)}
                  >
                    Edit
                  </button>
                </div>
                <div className="flex space-x-5 my-5">
                  {/* linkedin icon */}
                  <div
                    className=" p-3 rounded-lg cursor-pointer"
                    onClick={() => window.open(userData.linkedin, "_blank")}
                  >
                    <FaLinkedin className="text-3xl text-blue-800" />
                  </div>

                  {/* github icon */}
                  <div
                    className=" p-3 rounded-lg cursor-pointer"
                    onClick={() => window.open(userData.github, "_blank")}
                  >
                    <FaGithub className="text-3xl text-gray-800" />
                  </div>
                </div>
                <div>{userData.bio}</div>
                {userData.isPremium && (
                  <div className="bg-green-200 p-2 rounded-lg mt-5">
                    Premium Member
                  </div>
                )}
                {user && (
                  <div>
                    <div className="text-2xl font-semibold my-3 text-orange-600">
                      Contact
                    </div>
                    <div className="text-lg mb-2">
                      <span className="mr-2">Phone:</span>
                      {userData.phoneNumber}
                    </div>
                    <div className="text-lg mb-2">
                      <span className="mr-2">WhatsApp:</span>
                      {userData.whatsappNumber}
                    </div>
                    <div className="text-lg mb-2">
                      <span className="mr-2">Email:</span>
                      {userData.email}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <h1 className="text-2xl font-bold mt-10 mb-5">Your Jobs</h1>
        <div className="flex items-center mb-4">
          <input
            type="text"
            className="border border-gray-300 rounded-md px-4 py-2 mr-4 w-1/3"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-md px-4 py-2 w-1/3"
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
          >
            <option value="">Filter by job type...</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Freelance">Freelance</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
            <option value="Temporary">Temporary</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
        <div className="w-full">
          {filteredJobs.length === 0 ? (
            <p className="text-lg">No jobs available</p>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job._id}
                className="border rounded-lg p-4 my-2 flex justify-between items-center shadow-lg"
              >
                <div className="flex items-center space-x-4 w-full">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{job.title}</h2>
                    <p className="text-gray-600 mt-2">{job.description}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-100 rounded-lg p-2">
                      <span className="font-semibold">
                        {job.minAmountPerHour}-
                      </span>
                      <span>{job.maxAmountPerHour}/Hour</span>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-2">
                      {job.jobType}
                    </div>
                    {job.location && (
                      <div className="bg-gray-100 rounded-lg p-2">
                        {job.location}
                      </div>
                    )}
                    <button
                      className="bg-red-500 text-white px-4 py-2 h-10 rounded hover:bg-red-600 transition-all duration-200"
                      onClick={() => handleDelete(job._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
