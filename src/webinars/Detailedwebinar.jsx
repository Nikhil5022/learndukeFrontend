import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";
import { MdLiveTv } from "react-icons/md";
import { MdEmergencyRecording } from "react-icons/md";
import { IoDocumentSharp } from "react-icons/io5";
import { BsFillTagsFill } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { GiSandsOfTime } from "react-icons/gi";
import { TiTick } from "react-icons/ti";
import { IoMdUndo } from "react-icons/io";
import { IoCopyOutline } from "react-icons/io5";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import Modal from "../Modal";
import { FcGoogle } from "react-icons/fc";

function Detailedwebinar() {
  const { id } = useParams();
  const [webinar, setWebinar] = useState(null);
  const [mentor, setMentor] = useState(null);
  const [copy, setCopy] = useState(false);
  const [user, setUser] = useState(null);
  const [registerModal, setRegisterModal] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [showConsent, setShowConsent] = useState(false)
  const [loginModal, setLoginModal] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/getWebinarParticipants/${id}`)
      .then((res) => {
        setParticipants(res.data);
        console.log(res.data);
      });
  }, []);
  const [registerLoader, setRegisterLoader] = useState(false);

  const handleClickcopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 2000);
  };

  {
    /* /* --------------------------changed------------------------------- */
  }
  useEffect(() => {
    const loginUser = JSON.parse(localStorage.getItem("user"));
    async function getUserData() {
      if (loginUser) {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/getUser/${loginUser.email}`
        );
        setUser(response.data);
      }
    }

    async function getWebinar() {
      if (id) {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/getWebinar/${id}`
        );
        setWebinar(response.data.webinar);
        setMentor(response.data.mentor);
      }
    }

    loginUser && getUserData();
    getWebinar();
  }, [id]);

  if (!webinar) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const additionalBenefits = [
    {
      name: "Live Q&A",
      description:
        "Join the mentor's live Q&A to ask questions, learn from others, and clear up any confusion.",
      icon: <MdLiveTv />,
    },
    {
      name: "Recording of the entire Session",
      description:
        "Once the session is done, we'll provide you with a recording of the entire thing.",
      icon: <MdEmergencyRecording />,
    },
    {
      name: "Exciting Quiz sessions",
      description:
        "Participate in the mentor's quiz for a good time and to clarify any doubts you may have.",
      icon: <IoDocumentSharp />,
    },
    {
      name: "Exclusive Discount on all our 1:1 mentorship programs",
      description:
        "Receive an exclusive participant-only discount coupon for any mentorship plan.",
      icon: <BsFillTagsFill />,
    },
  ];

  {
    /* /* --------------------------changed------------------------------- */
  }

  const handleUnregister = async () => {
    user &&
      (await axios
        .post(`${import.meta.env.VITE_SERVER_URL}/unregister-for-webinar`, {
          mail: user.email,
          webinarId: id,
        })
        .then((res) => {
          setWebinar((prev) => ({
            ...prev,
            participants: webinar.participants.filter(
              (obj) => obj !== user?._id
            ),
          }));
        }));
  };

  {
    /* /* --------------------------changed------------------------------- */
  }

  const handleRegister = async () => {
    const u = JSON.parse(localStorage.getItem("user"));
    if (webinar.isPaid && u) {
      setRegisterModal(true);
    } else if (u) {
      setRegisterLoader(true);
      await axios
        .post(`${import.meta.env.VITE_SERVER_URL}/register-for-webinar`, {
          mail: u.email,
          webinarId: webinar._id,
        })
        .then((res) => {
          setWebinar((prevWebinar) => ({
            ...prevWebinar,
            participants: [...prevWebinar.participants, user._id],
          }));
        });
      setRegisterLoader(false);
    }
  };

  return (
    <div className="flex justify-center" style={{ backgroundColor: "#fafafa" }}>
      <div className="w-full lg:w-10/12 pt-5 md:pt-10 p-2">
        <div className="flex flex-col md:flex-row w-full">
          <div className="w-full md:w-4/6">
            <div
              className="font-bold tracking-normal leading-relaxed p-2 text-lg md:text-2xl"
              style={{ color: "#1a1a1a" }}
            >
              {webinar.title}
            </div>
            <div className="border border-gray-300 p-4 rounded-xl bg-white">
              <img
                src={webinar.photo.url}
                alt="webinar"
                className="w-full h-auto rounded-lg"
              />
              <hr className="my-4" />
              <div className="flex md:items-center md:justify-between flex-col sm:flex-row">
                <div className="flex items-center space-x-3 w-full sm:w-9/12">
                  <img
                    src={mentor.profilePhoto.url}
                    alt=""
                    className="h-14 rounded-full"
                  />
                  <div className="flex flex-col items-start">
                    <div className="flex space-x-2 items-center">
                      <div className="text-lg font-semibold">{mentor.name}</div>
                      <div className="text-xs border border-blue-400 text-blue-400 px-1 rounded-2xl">
                        Mentor
                      </div>
                    </div>
                    <div>Experience: {mentor.experience}</div>
                  </div>
                </div>
                <div className="flex sm:items-center">
                  <button
                    className="bg-green-200 text-green-700 border border-green-600 p-3 rounded-lg my-3 sm:m-3 w-full sm:ml-3 whitespace-nowrap flex justify-center items-center space-x-2"
                    onClick={() => {
                      user ? window.open(
                        `https://wa.me/${mentor.whatsappNumber}`,
                        "_blank"
                      ): setLoginModal(true)
                    }}
                  >
                    <FaWhatsapp className="text-2xl" />
                    <span>Connect with Mentor</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="border border-gray-300 p-6 rounded-xl bg-white mt-10">
              <div className="text-xl font-bold">About the Webinar</div>
              <hr className="my-4" />
              <div className="py-5">{webinar.description}</div>
              <div className="py-5">During the session, we'll cover:</div>
              {webinar.topics &&
                webinar.topics.map((topic, index) => (
                  <div key={index} className="mb-7">
                    <div className="font-semibold">{topic.name}</div>
                    <ul className="list-disc pl-5 text-gray-300 mt-3">
                      {topic.descriptions.map((desc, i) => (
                        <li
                          key={i}
                          style={{ color: "#3B4152" }}
                          className="m-2"
                        >
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              <hr className="my-4" />
              <div className="flex md:items-center md:justify-between flex-col sm:flex-row">
                <div className="flex items-center space-x-3 w-full sm:w-9/12 ">
                  <img
                    src={mentor.profilePhoto.url}
                    alt=""
                    className="h-14 rounded-full"
                  />
                  <div className="flex flex-col items-start">
                    <div className="flex space-x-2 items-center">
                      <div className="text-lg font-semibold">{mentor.name}</div>
                      <div className="text-xs border border-blue-400 text-blue-400 px-1 rounded-2xl">
                        Mentor
                      </div>
                    </div>
                    <div>Experience: {mentor.experience}</div>
                  </div>
                </div>
                <div className="flex sm:items-center">
                  <button
                    className="bg-green-200 text-green-700 border border-green-600 p-3 rounded-lg my-3 sm:m-3 w-full sm:ml-3 whitespace-nowrap flex justify-center items-center space-x-2"
                    onClick={() => {
                      user ? window.open(
                        `https://wa.me/${mentor.whatsappNumber}`,
                        "_blank"
                      ): setLoginModal(true)
                    }}
                  >
                    <FaWhatsapp className="text-2xl" />
                    <span>Connect with Mentor</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="border border-gray-300 p-6 rounded-xl bg-white mt-10">
              <div className="text-xl font-bold">Additional Benefits</div>
              <hr className="my-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {webinar.additionalBenefits &&
                  webinar.additionalBenefits.map((benefitName, index) => {
                    const benefit = additionalBenefits.find(
                      (b) => b.name === benefitName
                    );
                    return (
                      benefit && (
                        <div
                          key={index}
                          className="flex items-start rounded-lg border border-gray-300 p-3"
                        >
                          <div className="mr-2 mt-1 text-gray-500 text-2xl">
                            {benefit.icon}
                          </div>
                          <div>
                            <div className="font-semibold">{benefit.name}</div>
                            <div className="text-gray-700">
                              {benefit.description}
                            </div>
                          </div>
                        </div>
                      )
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/6 mt-7 ">
            <div className="bg-white p-5 m-5 rounded-lg border border-gray-300 flex flex-col space-y-3">
              {/* /* --------------------------changed------------------------------- */}
              {webinar.status !== "Past" && (
                <div className="text-sm font-semibold text-green-500">
                  Register for FREE Live Webinar
                </div>
              )}
              <div className="flex items-center text-lg">
                <SlCalender />
                <div className="ml-2">
                  <div className=" font-semibold">
                    {/* /* --------------------------changed------------------------------- */}
                    {months[new Date(webinar.startTime).getMonth()]}{" "}
                    {new Date(webinar.startTime).getDate()} ,
                    {new Date(webinar.startTime).getFullYear()}
                    {" | "}
                    {
                      new Date(webinar.startTime).toLocaleString().substring(11) // Safely get the timezone part
                    }
                  </div>
                </div>
              </div>
              <div>
                {webinar.status === "Past" ? (
                  <div className="text-lg font-semibold">
                    Webinar has already ended!
                  </div>
                ) : (
                  <div>
                    {user && webinar.participants.includes(user?._id) && 
                      webinar.status === "Live" ? (
                        <button
                          className="bg-blue-400 text-white p-3 rounded-lg w-full"
                          onClick={() =>
                            window.open(webinar.liveLink, "_blank")
                          }
                        >
                          Join Webinar
                        </button>
                      ) : user && webinar.status == "Upcoming" &&  webinar.participants.includes(user?._id) ? (
                        <div className="flex md:flex-col flex-col  sm:flex-row items-center justify-evenly">
                          <button className="bg-green-200 text-green-600 border border-green-600 cursor-default p-3 rounded-lg w-full sm:w-1/2 md:w-full my-2 sm:mx-1 md:my-2 md:mx-0">
                            Registered
                          </button>
                          {user.email != mentor.email && (
                            <button
                              className="bg-red-200 text-red-700 border border-red-700 cursor-pointer p-3 rounded-lg w-full sm:w-1/2 md:w-full text-center flex items-center justify-center"
                              onClick={(e) => {
                                e.preventDefault()
                                setShowConsent(true)
                              }}
                            >
                              Undo
                              <span className="mx-1">
                                <IoMdUndo />
                              </span>
                            </button>
                          )}
                        </div>
                      )
                     : (
                      <button
                        className="bg-black text-white p-3 rounded-lg w-full flex items-center justify-center"
                        onClick={() => user ? handleRegister() : setLoginModal(true)}
                      >
                        {registerLoader ? (
                          <div className="w-8 h-8 rounded-full animate-spin border-t-2 border-b-2"></div>
                        ) : (
                          "Register Now"
                        )}
                      </button>
                    )}
                  </div>
                )}
              </div>
              {webinar.status !== "Past" && (
                <>
                  <hr className="my-4" />
                  <div className="flex justify-between">
                    <div className="relative flex h-7 w-7">
                      {participants.map((participant, index) => (
                        <img
                          key={index}
                          src={participant.profilephoto.url}
                          alt=""
                          className="absolute h-7 w-7 rounded-full"
                          style={{
                            left: `${index * 50}%`,
                            zIndex: participants.length + index,
                          }}
                        />
                      ))}
                    </div>

                    <div className="flex items-center space-x-2 text-orange-400">
                      <GiSandsOfTime
                        style={{
                          animation: "spin 2s linear infinite",
                        }}
                        className=""
                      />
                      <span>Only Few Seats Left</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="bg-white p-3 m-5 rounded-lg border border-gray-300 flex flex-col space-y-2 ">
              <div className="flex  items-center justify-between flex-col sm:flex-row md:flex-col">
                <div className="flex flex-col space-x-2 w-10/12 sm:w-5/12 md:w-full items-center text-center justify-center">
                  <img
                    src={mentor.profilePhoto.url}
                    className="rounded-lg w-64 sm:w-36 md:w-64 my-2"
                    alt=""
                  />
                  <div className="text-xl md:text-2xl font-semibold  text-center">
                    {mentor.name}
                  </div>
                </div>
                <div className="text-sm font-semibold text-justify md:leading-tight md:tracking-tight text-gray-400 w-full sm:w-7/12  md:w-full  md:p-3">
                  "{mentor.description}"
                </div>
              </div>
              <hr className="my-4" />
              <div className="flex flex-wrap">
                {mentor.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 text-gray-500 px-3 mx-1 py-1 rounded-lg m-1"
                  >
                    {skill}
                  </div>
                ))}
              </div>
              <hr className="my-4" />
              {/* /* --------------------------changed------------------------------- */}
              <div className="my-2">
                {webinar.isPaid && (
                  <div className="flex space-x-3 items-center">
                    <div className="flex items-center space-x-2">
                      Price of Webinar :{" "}
                      <span className="text-lg font-bold">
                        {" "}
                        ₹{webinar.price} /-
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <button className="text-black border border-gray-300 p-3 rounded-lg w-full">
                  View Profile
                </button>
              </div>

              <div>
                <div className="text-white bg-blue-500 p-2 text-center rounded-t-xl font-semibold">
                  Connect with Mentor directly
                </div>
                <div className="text-center text-sm border border-blue-500 p-2 rounded-b-xl bg-blue-100">
                  <div>
                    <button
                      onClick={() => {
                        user ? window.open(
                          // call
                          `tel:${mentor.phoneNumber}`,
                          "_blank"
                        ) : setLoginModal(true)
                      }}
                      className="flex justify-center items-center space-x-2 w-full rounded-lg"
                    >
                      {" "}
                      <FaPhoneAlt className="text-md mt-0.5" />
                      <span>Call</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-5 m-5 rounded-lg border border-gray-300 flex flex-col space-y-3">
              <div>
                <div>Spread the word</div>
                <hr className="my-4" />
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={window.location.href}
                    readOnly
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    contentEditable={false}
                  />

                  {copy ? (
                    <div className="text-green-500 mt-2 text-3xl">
                      <TiTick />
                    </div>
                  ) : (
                    <button
                      className="text-gray-500 p-2 rounded-lg"
                      onClick={handleClickcopy}
                    >
                      <IoCopyOutline />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /* --------------------------changed------------------------------- */}
      {user && (
        <Modal isOpen={registerModal} onClose={() => setRegisterModal(false)}>
          <div className="flex flex-col items-center justify-center">
            <h1 className="font-semibold text-2xl mb-2">
              This is a paid webinar.
            </h1>
            <p className="text-center text-lg mb-1">
              You have to pay ₹{webinar.price}/- <br />
            </p>
            <button
              className="px-6 py-2 mt-1 rounded-lg border-2 border-green-500 bg-green-100 text-green-600"
              onClick={() =>
                (window.location.href = `${
                  import.meta.env.VITE_SERVER_URL
                }/pay/webinar?webinarId=${webinar._id}&mail=${user.email}`)
              }
            >
              Pay Now
            </button>
          </div>
        </Modal>
      )}
      {
        <Modal onClose={() => setShowConsent(false)} isOpen={showConsent}>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-xl my-2 font-semibold text-red-600">THIS WILL CANCEL YOUR REGISTRATION.</h1>
            <p className="text-lg">Are you sure want to undo ?</p>
            <div className="flex flex-col md:flex-row space-x-3 items-center justify-center mt-2">
            <button
              className="px-5 py-2 bg-green-100 text-green-500 border-green-500 border rounded-lg whitespace-nowrap flex items-center justify-center space-x-1"
              onClick={() => setShowConsent(false)}
            >
              Cancel
            </button>
            <button
              className="px-5 py-2 bg-red-100 text-red-500 border-red-500 border rounded-lg whitespace-nowrap flex items-center justify-center space-x-1"
              onClick={handleUnregister}
            >
              Continue
            </button>
          </div>
          </div>
        </Modal>
      }
      {loginModal && (
        <Modal isOpen={loginModal} onClose={() => setLoginModal(false)}>
          <div className="flex flex-col justify-center items-center">
            <p className="text-lg font-semibold">You need to login first!</p>
            <button
              className="bg-black hover:text-black hover:bg-white text-white px-5 py-2 rounded-2xl flex items-center transform hover:scale-105 duration-300 m-2"
              onClick={() => window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/google`}
            >
              <FcGoogle className="text-xl mr-2 mt-0.5" />
              <div>Login</div>
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Detailedwebinar;
