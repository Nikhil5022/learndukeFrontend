import React, { useState, useEffect } from "react";
import axios from "axios";
import emailjs from "emailjs-com";
import Modal from "../Modal";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDataUpdateModal, setUserDataUpdateModal] = useState(false);
  const [inValidCredentials, setInValidCredentials] = useState(false);  
  const [userNotfound, setUserNotfound] = useState(false);


  useEffect(() => {
    window.scrollTo(0, 0);
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
          setUserDataUpdateModal(true);
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
          setInValidCredentials(true);
          setEmail("");
          setPassword("");
        }

        if (response.data.message === "Admin not found") {
          setUserNotfound(true);
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

  const handleReview = (job) => {
    console.log("Reviewing job:", job);
    setSelectedJob(job);
    setModalOpen(true);
  };

  const handleAccept = async () => {
    // Logic for accepting the job, ensuring required data is provided

  
    try {
      const response = await axios.post(
        `https://learndukeserver.vercel.app/approveJob/${selectedJob._id}` // Use template literal for clarity
      );
      console.log(response.data);
  
      emailjs.send(
        "service_u8g5efc", // Replace with your actual service ID
        "template_1f02q6q", // Replace with your actual template ID
        {
          to_email: selectedJob.email,
          message: `Your job having title: ${selectedJob.title}`,
          reply_to: selectedJob.email,
          from_name: "learnduke admin",
        },
        "Mwms6Vebtr7VYP1Hr" // Replace with your actual user ID
      )
      .then((response) => {
        console.log("EMAIL SENT!", response.status, response.text);
        // Optionally handle successful email sending here, e.g., display a success message
      })
      .catch((error) => {
        console.error("ERROR SENDING EMAIL:", error);
        // Handle email sending errors here, e.g., display an error message to the user
      });
      

      
      // Update jobs state with reviewed flag
      setJobs((prevJobs) =>
        prevJobs.map((job) => (job._id === selectedJob._id ? { ...job, isReviewed: true } : job))
      );
    } catch (error) {
      console.error("Error reviewing job:", error);
    }
  
    console.log("Job accepted:", selectedJob);
    setModalOpen(false);
  };
  

  const handleReject = () => {
    // Logic for rejecting the job
    axios
      .post("https://learndukeserver.vercel.app/rejectJob/" + selectedJob._id)
      .then((response) => {
        console.log(response.data);
        
        setJobs((prevJobs) =>
          prevJobs.map((j) =>
            j._id === selectedJob._id
              ? { ...j, isReviewed: false, isRejected: true }
              : j
          )
        );
      })
      .catch((error) => {
        console.error("Error reviewing job:", error);
      });
    emailjs.send(
      "service_u8g5efc",
      "template_fjpzhe8",
      {
        to_email: selectedJob.email,
        message: `Your job having title: ${selectedJob.title} has been rejected`,
        reply_to: selectedJob.email,
        from_name: "learnduke admin",
      },
      "Mwms6Vebtr7VYP1Hr"
    ).then((response) => {
      console.log("EMAIL SENT!", response.status, response.text);
    }).catch((error) => {
      console.error("ERROR SENDING EMAIL:", error);
    });
    console.log("Job rejected:", selectedJob);
    setModalOpen(false);
  };

  return (
    <>
    {/* Modal with message */}
   

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
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.name}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.phoneNumber}
                      </td>
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
                      className="px-2 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Job Title
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Whatsapp Number
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Job Type
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Review
                    </th>

                    <th
                      scope="col"
                      className="px-2 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredJobs.map((job) => (
                    <tr key={job._id}>
                      <td className="px-2 py-4 whitespace-nowrap">
                        {job.title}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap">
                        {job.whatsappNumber}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap">
                        {job.jobType}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap">
                        {job.location}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap">
                        {job.isReviewed ? (
                          <span
                            className="px-2 py-1 bg-green-500 text-white rounded cursor-pointer"
                            onClick={() =>
                              axios
                                .post(
                                  `https://learndukeserver.vercel.app/undoReview/${job._id}`
                                )
                                .then((response) => {
                                  console.log(response.data);
                                  setJobs((prevJobs) =>
                                    prevJobs.map((j) =>
                                      j._id === job._id
                                        ? {
                                            ...j,
                                            isReviewed: false,
                                            isRejected: false,
                                          }
                                        : j
                                    )
                                  );
                                })
                                .catch((error) => {
                                  console.error("Error undoing review:", error);
                                })
                            }
                          >
                            Undo
                          </span>
                        ) : job.isRejected ? (
                          <button
                            onClick={() =>
                              axios
                                .post(
                                  `https://learndukeserver.vercel.app/undoReject/${job._id}`
                                )
                                .then((response) => {
                                  console.log(response.data);
                                  setJobs((prevJobs) =>
                                    prevJobs.map((j) =>
                                      j._id === job._id
                                        ? { ...j, isRejected: false }
                                        : j
                                    )
                                  );
                                })
                                .catch((error) => {
                                  console.error(
                                    "Error undoing rejection:",
                                    error
                                  );
                                })
                            }
                            className="bg-red-500 text-white py-1 px-2 rounded"
                          >
                            Undo Reject
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => handleReview(job)}
                              className="bg-blue-500 text-white py-1 px-2 rounded mr-2"
                            >
                              Review
                            </button>
                            
                          </>
                        )}
                      </td>

                      <td className="px-2 py-4 whitespace-nowrap">
                        <button
                          onClick={() => {
                            
                            setIsModalOpen(true);
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
      {modalOpen && (
        // job detail modal
        <div className="fixed h-screen inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg w-2/3">
            <h2 className="text-xl font-semibold mb-4">Job Details</h2>
            <div className="mb-4">
              <strong>Title:</strong> {selectedJob.title}
            </div>
            <div className="mb-4">
              <strong>Email:</strong> {selectedJob.email}
            </div>
            <div className="mb-4">
              <strong>Job Type:</strong> {selectedJob.jobType}
            </div>
            <div className="mb-4">
              <strong>Location:</strong> {selectedJob.location}
            </div>
            <div className="mb-4">
              <strong>Description:</strong> {selectedJob.description}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleReject}
                className="bg-red-500 text-white py-2 px-4 rounded mr-2"
              >
                Reject
              </button>
              <button
                onClick={handleAccept}
                className="bg-green-500 text-white py-2 px-4 rounded"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
      {userDataUpdateModal && (
        <Modal
          isOpen={userDataUpdateModal}
          onClose={() => setUserDataUpdateModal(false)}
        >
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">User data updated!</h2>
            <button
              onClick={() => setUserDataUpdateModal(false)}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
      {inValidCredentials && (
        <Modal
          isOpen={inValidCredentials}
          onClose={() => setInValidCredentials(false)}
        >
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">Invalid credentials!</h2>
            <button
              onClick={() => setInValidCredentials(false)}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
      {userNotfound && (
        <Modal
          isOpen={userNotfound}
          onClose={() => setUserNotfound(false)}
        >
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">Admin not found!</h2>
            <button
              onClick={() => setUserNotfound(false)}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
            <button
              onClick={() => {
                axios
                  .post(
                    `https://learndukeserver.vercel.app/deleteJob/${selectedJob._id}`
                  )
                  .then((response) => {
                    console.log(response.data);
                    setJobs((prevJobs) =>
                      prevJobs.filter((job) => job._id !== selectedJob._id)
                    );
                    setIsModalOpen(false);
                  })
                  .catch((error) => {
                    console.error("Error deleting job:", error);
                  });
              }}
              className="bg-red-500 text-white py-2 px-4 rounded mr-2"
            >
              Delete
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
