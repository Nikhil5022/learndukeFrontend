import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from '../Modal'

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPremium, setShowPremium] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [view, setView] = useState("users"); // New state for switching views
  const [setModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const tokenfe = localStorage.getItem("token");
    if (tokenfe) {
      setIsLogged(true);
      setToken(tokenfe);
    }
  }, []);

  useEffect(() => {
    if (isLogged) {
      axios
        .get("https://learndukeserver.vercel.app/getUsers")
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });

      axios
        .get("https://learndukeserver.vercel.app/getJobs") // Fetching job data
        .then((response) => {

          setJobs(response.data);
        })
        .catch((error) => {
          console.error("Error fetching job data:", error);
        });
    }
  }, [isLogged]);

  const handleToggle = async (userId) => {
    try {
      const user = users.find((user) => user._id === userId);
      if (!user) return;

      const updatedIsPremium = !user.isPremium;

      await axios
        .post(`https://learndukeserver.vercel.app/updateUser/${user.email}`, {
          isPremium: updatedIsPremium,
        })
        .then((response) => {
          console.log(response.data);
          alert("User updated successfully");
        });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isPremium: updatedIsPremium } : user
        )
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePremiumFilterChange = (event) => {
    setShowPremium(event.target.checked);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(email, password);
    axios
      .post("https://learndukeserver.vercel.app/login", { email, password })
      .then((response) => {
        console.log(response.data);
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          setIsLogged(true);
          setToken(response.data.token);
        }
        if (response.data.message === "Invalid credentials") {
          alert("Invalid credentials");
          setEmail("");
          setPassword("");
        }

        if (response.data.message === "Admin not found") {
          alert("User not found");
          setEmail("");
          setPassword("");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  };

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      (user.name || "").toLowerCase().includes(query) ||
      (user.email || "").toLowerCase().includes(query);
    const matchesPremium = !showPremium || user.isPremium;
    return matchesSearch && matchesPremium;
  });

  const filteredJobs = jobs.filter((job) => {
    const query = searchQuery.toLowerCase();
    return (job.title || "").toLowerCase().includes(query);
  });

  return (
    <>
      {isLogged ? (
        <div className="container mx-auto p-4 md:p-8">
          <h2 className="text-2xl font-semibold mb-4">
            {view === "users" ? "User List" : "Job List"}
          </h2>
          <div className="flex flex-col md:flex-row items-center mb-4">
            <input
              type="text"
              placeholder="Search by name, email, or job title"
              value={searchQuery}
              onChange={handleSearchChange}
              className="border p-2 mb-2 md:mb-0 md:mr-2 w-full md:w-1/2 rounded-lg"
            />
            {view === "users" && (
              <label className="text-sm md:text-base">
                <input
                  type="checkbox"
                  checked={showPremium}
                  onChange={handlePremiumFilterChange}
                  className="mr-1"
                />
                Show Premium Users
              </label>
            )}
            <button
              onClick={() => {
                setIsLogged(false);
                localStorage.removeItem("token");
                setToken("");
                setEmail("");
                setPassword("");
              }}
              className="bg-red-500 text-white py-2 px-4 rounded ml-auto"
            >
              Logout
            </button>
            <button
              onClick={() => setView(view === "users" ? "jobs" : "users")}
              className="bg-blue-500 text-white py-2 px-4 rounded ml-2"
            >
              {view === "users" ? "Show Job List" : "Show User List"}
            </button>
          </div>
          <div className="overflow-x-auto">
            {view === "users" ? (
              <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Phone Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Is Premium
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Plans
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user._id}>
                      <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                      <td className="px-4 py-4 whitespace-nowrap">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.phoneNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <label
                          htmlFor={`toggle-${user._id}`}
                          className="flex items-center cursor-pointer"
                        >
                          <div className="relative">
                            <input
                              type="checkbox"
                              id={`toggle-${user._id}`}
                              name={`toggle-${user._id}`}
                              checked={user.isPremium}
                              onChange={() => handleToggle(user._id)}
                              className="sr-only"
                            />
                            <div className="block bg-gray-600 w-14 h-8 md:w-16 md:h-10 rounded-full"></div>
                            <div
                              className={`dot absolute left-1 top-1 md:left-1 md:top-1.5 bg-white w-6 h-6 md:w-7 md:h-7 rounded-full transition ${
                                user.isPremium
                                  ? "translate-x-full bg-green-400"
                                  : "bg-gray-600"
                              }`}
                            ></div>
                          </div>
                          <div className="ml-3 text-gray-700 font-medium text-sm md:text-base">
                            Premium
                          </div>
                        </label>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <ul>
                          {user.plans.map((plan, index) => (
                            <li key={index}>{plan}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Job Title
                    </th>
                    {/* email */}
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      jobtype
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Location
                    </th>
                    {/* delete  */}
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Delete
                    </th>
                    
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredJobs.map((job) => (
                    <tr key={job._id}>
                      <td className="px-6 py-4 whitespace-nowrap">{job.title}</td>
                      <td className="px-4 py-4 whitespace-nowrap">{job.email}</td>
                      <td className="px-4 py-4 whitespace-nowrap">{job.jobType}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{job.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => {
                            axios
                              .delete(
                                `https://learndukeserver.vercel.app/deleteJob/${job._id}`
                              )
                              .then((response) => {
                                console.log(response.data);
                                // update jobs state
                                setJobs((prevJobs) =>
                                  prevJobs.filter((j) => j._id !== job._id)
                                );

                              })
                              .catch((error) => {
                                console.error("Error deleting job:", error);
                              });
                              setModalOpen(true);
                          }}
                          className="bg-red-500 text-white py-1 px-2 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <Modal open={setModalOpen} onClose={() => setModalOpen(false)}>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Job Deleted</h2>
              <p>Job has been deleted successfully</p>
            </div>
          </Modal>
        </div>
      ) : (
        <div className="flex justify-center items-center h-svh bg-gray-100">
          <form
            onSubmit={handleLogin}
            className="bg-white p-6 rounded shadow-md w-full max-w-sm"
          >
            <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded"
            >
              Login
            </button>
          </form>
        </div>
      )}
    </>
  );
}
