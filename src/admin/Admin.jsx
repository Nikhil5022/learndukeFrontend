import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPremium, setShowPremium] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const tokenfe=localStorage.getItem("token");
    if(tokenfe){
      setIsLogged(true);
      setToken(tokenfe);
    }
  }, []);
  

  useEffect(() => {
    if (isLogged) {
      axios
        .get("http://localhost:3000/getUsers")
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [isLogged]);

  const handleToggle = async (userId) => {
    try {
      const user = users.find((user) => user._id === userId);
      if (!user) return;

      const updatedIsPremium = !user.isPremium;

      await axios
        .post(`http://localhost:3000/updateUser/${user.email}`, {
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
    axios.post("http://localhost:3000/login", { email,password}).then((response) => {
        console.log(response.data);
        if(response.data.token){
            localStorage.setItem("token", response.data.token);
            setIsLogged(true);
            setToken(response.data.token);
        }
        if(response.data.message==="Invalid credentials"){
            alert("Invalid credentials");
            setEmail("");
            setPassword("");
        }

        if(response.data.message==="Admin not found"){
            alert("User not found");
            setEmail("");
            setPassword("");
        }
    
        }).catch((error) => {
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

  return (
    <>
      {isLogged ? (
        <div className="container mx-auto p-4 md:p-8">
          <h2 className="text-2xl font-semibold mb-4">User List</h2>
          <div className="flex flex-col md:flex-row items-center mb-4">
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchQuery}
              onChange={handleSearchChange}
              className="border p-2 mb-2 md:mb-0 md:mr-2 w-full md:w-1/2 rounded-lg"
            />
            <label className="text-sm md:text-base">
              <input
                type="checkbox"
                checked={showPremium}
                onChange={handlePremiumFilterChange}
                className="mr-1"
              />
              Show Premium Users
            </label>
            <button
                onClick={() => {
                    setIsLogged(false);
                    localStorage.removeItem("token");
                    setToken("");
                    setEmail("");
                    setPassword("");
                }}
                className="bg-red-500 text-white py-2 px-4 rounded ml-auto"
            >Logout</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Profile Photo
                  </th>
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
                    Is Premium
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={user.profilephoto}
                        alt="Profile"
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{user.email}</td>
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
                  </tr>
                ))}
              </tbody>
            </table>
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
    </>
  );
}
