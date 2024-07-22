import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Webinar.css";
import Modal from "../Modal";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { MdPayment } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Loader from "../assets/WebinarLoader.gif";
import { FaPlus, FaWhatsapp } from "react-icons/fa";
function Webinars() {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showMentorModal, setShowMentorModal] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [mentorData, setMentorData] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [upcomingWebinars, setUpcomingWebinars] = useState(null);
  const [liveWebinars, setLiveWebinars] = useState(null);
  const [pastWebinars, setPastWebinars] = useState(null);
  const [liveLoading, setLiveLoading] = useState(true);
  const [pastLoading, setPastLoading] = useState(true);
  const [upLoading, setUpLoading] = useState(true);
  const [livePageNumber, setLivePageNumber] = useState(1);
  const [showLiveLoadmore, setShowLiveLoadmore] = useState(true);
  const [upcomingPageNumber, setUpcomingPageNumber] = useState(1);
  const [showUpcomingLoadmore, setShowUpcomingLoadmore] = useState(true);
  const [showPastLoadmore, setShowPastLoadmore] = useState(true);
  const [pastPageNumber, setPastPageNumber] = useState(1);
  const [limitExceeded, setLimitExceeded] = useState(false);

  const showLiveWebinarFirst = useRef(null);
  const showPastWebinarFirst = useRef(null);
  const [userData, setUserData] = useState(null); 

  useEffect(() => {
    if (showLiveWebinarFirst.current) {
      const offset = 100;
      const elementPosition =
        showLiveWebinarFirst.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, [liveWebinars]);

  useEffect(() => {
    if (showPastWebinarFirst.current) {
      const offset = 100;
      const elementPosition =
        showPastWebinarFirst.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, [pastWebinars]);

  let user = JSON.parse(localStorage.getItem("user"));

  // useEffect(() => {
  //   // window.scroll(0,0)
    
  // }, []);
  useEffect(() => {
    setDisabled(true);
    async function getUser(){
      if(user){
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/getUser/${user?.email}`)
        setUserData(res.data)
      }
      setDisabled(false)
    }
    getUser()
    async function isMentor() {
      let res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/isAlreadyMentor/${user?.email}`
      );
      setMentorData(res.data.mentor);
      setDisabled(false);
    }
    isMentor();
    }, [])

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/google`;
  };

  useEffect(() => {
    setUpLoading(true);
    async function getUpcoming() {
      const res = await axios.get(
        `${
          import.meta.env.VITE_SERVER_URL
        }/upcoming-webinars?page=${upcomingPageNumber}`
      );
      console.log(res.data);
      setUpcomingWebinars((prev) => {
        return prev ? [...prev, ...res.data.webinars] : res.data.webinars;
      });
      setUpLoading(false);
      if (
        res.data.currentPage == res.data.totalPages ||
        res.data.webinars.length == 0
      ) {
        setShowUpcomingLoadmore(false);
      }
    }
    getUpcoming();
  }, [upcomingPageNumber]);

  useEffect(() => {
    setLiveLoading(true);
    async function getLive() {
      console.log(livePageNumber);

      const res = await axios.get(
        `${
          import.meta.env.VITE_SERVER_URL
        }/live-webinars?page=${livePageNumber}&limit=2`
      );
      console.log(res.data);
      setLiveWebinars((prev) => {
        return prev ? [...prev, ...res.data.webinars] : res.data.webinars;
      });

      setLiveLoading(false);
      if (
        res.data.currentPage == res.data.totalPages ||
        res.data.webinars.length == 0
      ) {
        setShowLiveLoadmore(false);
      }
    }

    getLive();
  }, [livePageNumber]);

  useEffect(() => {
    setPastLoading(true);

    async function getPast() {
      const res = await axios.get(
        `${
          import.meta.env.VITE_SERVER_URL
        }/past-webinars?page=${pastPageNumber}`
      );

      console.log(res.data);

      setPastWebinars((prev) => {
        return prev ? [...prev, ...res.data.webinars] : res.data.webinars;
      });

      setPastLoading(false);

      if (
        res.data.currentPage == res.data.totalPages ||
        res.data.webinars.length == 0
      ) {
        setShowPastLoadmore(false);
      }
    }

    getPast();
  }, [pastPageNumber]);

  return (disabled && (liveLoading || pastLoading || upLoading)) ? <DataFetchLoading /> : (
    <div className="w-full p-4 flex relative">
      <div className="p-2 my-2  w-full xl:w-4/6">
        { liveWebinars && liveWebinars.length > 0 && 
        <>
        <div className="w-full">
          <div className="flex flex-col sm:flex-row justify-center w-full ">
            <div className="w-full">
              <h1 className="text-3xl mt-4 ml-4 md:px-4 font-semibold">
                Live Webinars
              </h1>
            </div>
          </div>
          <div className="webinarGrid grid grid-cols-1 3xl:grid-cols-2 xl:w-full space-x-2 md:space-x-0 lg:p-3">
            { 
              liveWebinars.map((webinar, index) => (
                <div key={index}>
                  {index == liveWebinars.length - 2 ? (
                    <div>
                      <div ref={showLiveWebinarFirst}>
                        <WebinarCard key={index} webinar={webinar} />
                      </div>
                    </div>
                  ) : (
                    <WebinarCard key={index} webinar={webinar} />
                  )}
                </div>
              ))
            }
          </div>
          <div className="flex justify-center">
            {showLiveLoadmore && !liveLoading && (
              <button
                className="text-gray-500 my-2 text-xs hover:underline hover:text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 w-auto transition duration-150 ease-in-out whitespace-nowrap flex items-center space-x-2 border border-gray-300 rounded-lg p-2"
                onClick={() => {
                  setLivePageNumber(livePageNumber + 1);
                }}
              >
                <FaPlus className="text-xs" /> <span>Load More</span>
              </button>
            )}
          </div>
          </div>
        <div className="flex items-center justify-center xl:hidden">
          <p className="w-11/12 my-3 border-2 border-orange-100"></p>
        </div>
        </>
          }
          
        {upcomingWebinars && upcomingWebinars.length > 0 && 
        <div className="w-full xl:hidden">
          <div className="flex flex-col sm:flex-row justify-center md:justify-between w-full ">
            <div className="w-full">
              <h1 className="text-3xl mt-4 ml-2 md:px-4 font-semibold">
                Upcoming Webinars
              </h1>
            </div>
          </div>
          <div className="webinarGrid grid grid-cols-1 3xl:grid-cols-2 xl:w-full space-x-2 md:space-x-0 lg:p-3">
            {/* live webinar cards */}
            { 
            upcomingWebinars.map((webinar, index) => (
                <WebinarCard key={index} webinar={webinar} />
              ))}
          </div>
          <div className="flex justify-center">
            {showUpcomingLoadmore && !upLoading && (
              <button
                className="text-gray-500 my-2 text-xs hover:underline hover:text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 w-auto transition duration-150 ease-in-out whitespace-nowrap flex items-center space-x-2 border border-gray-300 rounded-lg p-2"
                onClick={() => {
                  setUpcomingPageNumber(upcomingPageNumber + 1);
                }}
              >
                <FaPlus className="text-xs" /> <span>Load More</span>
              </button>
            )}
          </div>
            <div className="flex items-center justify-center">
              <p className="w-11/12 my-3 border-2 border-orange-100"></p>
            </div>
          </div>
          } 
        <div className="w-full">
          <h1 className="text-3xl mt-4 md:ml-5 px-4 font-semibold">
            Past Webinars
          </h1>
          <div className="webinarGrid grid grid-cols-1 3xl:grid-cols-2 xl:w-full space-x-2 md:space-x-0 lg:p-3">
            {pastWebinars && pastWebinars.length > 0 ? (
              pastWebinars.map((webinar, index) => (
                <div key={index}>
                  {index == pastWebinars.length - 2 ? (
                    <div>
                      <div ref={showPastWebinarFirst}>
                        <WebinarCard key={index} webinar={webinar} />
                      </div>
                    </div>
                  ) : (
                    <WebinarCard key={index} webinar={webinar} />
                  )}
                </div>
              ))
            ) : (
              <div
                className="flex-col flex items-center
            justify-center text-center text-lg p-4"
              >
                No Past webinars found!
              </div>
            )}
          </div>
          <div className="flex justify-center">
            {showPastLoadmore && !pastLoading && (
              <button
                className="text-gray-500 my-2 text-xs hover:underline hover:text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 w-auto transition duration-150 ease-in-out whitespace-nowrap flex items-center space-x-2 border border-gray-300 rounded-lg p-2"
                onClick={() => {
                  setPastPageNumber(pastPageNumber + 1);
                }}
              >
                <FaPlus className="text-xs" /> <span>Load More</span>
              </button>
            )}
          </div>
        </div>
      </div>
      <div
        className="top-20 h-fit z-0 border-none w-2/6 p-3 sticky hidden xl:flex overflow-y-scroll"
        style={{
          maxHeight: "70vh",
        }}
      >
        <div className="w-full p-2">
          <h1 className="text-xl my-2 font-semibold text-center">
            Mentors with upcoming webinars
          </h1>
          <div className="overflow-y-scroll h-fit section">
            {
              // upLoading ? (
              //   <DataFetchLoading />
              // ) :
              upcomingWebinars && upcomingWebinars.length > 0 ? (
                upcomingWebinars.map((webinar, index) => (
                  <div
                    key={index}
                    className="border-b border-slate-300 rounded-lg flex p-2 my-2 items-center justify-between "
                  >
                    <div className="flex flex-col w-9/12">
                      <h1 className="font-semibold text-xl p-1">{webinar.title}</h1>
                      <div className="flex items-center p-1">
                        <img
                          src={webinar.creator.photo}
                          className="max-w-6 rounded-full mr-3"
                        />
                        <p>{webinar.creator.name}</p>
                      </div>
                    </div>
                    <button
                      className="rounded-xl text-blue-500 px-2 whitespace-nowrap"
                      onClick={() =>
                        navigate(`/detailedWebinar/${webinar._id}`)
                      }
                    >
                      See details {">"}
                    </button>
                  </div>
                ))
              ) : (
                <div
                  className="flex-col flex items-center
              justify-center text-center text-lg p-4"
                >
                  No Upcoming Webinars!
                </div>
              )
            }
          </div>
          <div className="flex justify-center">
            {showUpcomingLoadmore && !upLoading && (
              <button
                className="text-gray-500 my-2 text-xs hover:underline hover:text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 w-auto transition duration-150 ease-in-out whitespace-nowrap flex items-center space-x-2 border border-gray-300 rounded-lg p-2"
                onClick={() => {
                  setUpcomingPageNumber(upcomingPageNumber + 1);
                }}
              >
                <FaPlus className="text-xs" /><span>Load More</span>
              </button>
            )}
          </div>
        </div>
      </div>
      {showLoginModal && (
        <Modal
          isOpen={setShowLoginModal}
          onClose={() => setShowLoginModal(false)}
        >
          <div className="flex flex-col justify-center space-y-4 items-center">
            <p className="font-semibold text-lg">
              Please login to create a Webinar!
            </p>
            <button
              className="bg-black hover:text-black hover:bg-white text-white px-5 py-2 rounded-2xl flex items-center transform hover:scale-105 duration-300 m-2"
              onClick={handleGoogleLogin}
            >
              <FcGoogle className=" text-xl mr-2 mt-0.5" />
              <div>Login</div>
            </button>
          </div>
        </Modal>
      )}
      {showMentorModal && (
        <Modal
          isOpen={showMentorModal}
          onClose={() => setShowMentorModal(false)}
        >
          <div className="flex flex-col justify-center space-y-4 items-center">
            <p className="font-semibold text-lg">You are not a Mentor.</p>
            <button
              className="bg-black hover:text-black hover:bg-white text-white px-5 py-2 rounded-2xl flex items-center transform hover:scale-105 duration-300 m-2"
              onClick={() => user && navigate("/become-a-mentor")}
            >
              <div>Create Mentor Profile</div>
            </button>
          </div>
        </Modal>
      )}
      {showPremiumModal && (
        <Modal
          isOpen={showPremiumModal}
          onClose={() => setShowPremiumModal(false)}
        >
          <div className="text-lg flex flex-col space-y-3 items-center justify-center">
            <div className="text-center">
              <img
                src={mentorData.profilePhoto.url}
                alt="profile photo"
                className="rounded-lg max-w-52 max-h-52 md:max-w-60 md:max-h-60 aspect-square object-cover"
                style={{ boxShadow: "0 0 20px 10px rgba(0,0,0,0.2)" }}
              />
              <h1 className="text-xl font-semibold mt-2">{user.name}</h1>
            </div>
            <div className="mb-4">
              Your profile is{" "}
              <span className="text-red-500 font-semibold">Inactive</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row space-x-3 items-center justify-center mt-2">
            {/* edit mentor */}
            <button
              className="px-3 py-1 bg-gradient-to-l from-yellow-500 to-orange-500 rounded-xl text-white whitespace-nowrap flex items-center justify-center space-x-1"
              onClick={() => {
                navigate("/become-a-mentor", {
                  state: { mentorData, newData: false },
                });
              }}
            >
              <CiEdit className="w-5 h-5 mr-2" />
              Edit Mentor
            </button>
            <button
              className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl text-white whitespace-nowrap flex items-center justify-center space-x-1"
              onClick={() => {
                navigate("/mentor/payment", {
                  state: { mentorData, newData: false, modified: false },
                });
              }}
            >
              <MdPayment className="w-5 h-5 mr-2 mt-2 sm:mt-0" />
              Pay to Activate
            </button>
          </div>
        </Modal>
      )}
      {
        limitExceeded && (
          <Modal isOpen={limitExceeded} onClose={() => setLimitExceeded(false)}>
            <div className="flex flex-col justify-center space-y-4 items-center text-center">
              <p className="font-semibold text-lg">You have exceeded the monthly limit <br/> of webinars you can create!</p>
              <div className="flex">
                <button className="px-10 py-1 bg-gradient-to-l from-yellow-500 to-orange-500 rounded-sm text-white whitespace-nowrap flex items-center justify-center space-x-1 mr-3 text-lg" onClick={()=> setLimitExceeded(false)}>Close</button>
              <button  className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-sm text-white whitespace-nowrap flex items-center justify-center space-x-1 text-lg"
              onClick={() => {
                navigate("/mentor/payment", {
                  state: { mentorData, newData: false, modified: false },
                });
              }}>Upgrade Plan</button>
              </div>
            </div>
          </Modal>
      )}
      {mentorData && (
        <div
          className="fixed bottom-4 right-4 bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg cursor-pointer hover:bg-orange-600 hover:scale-105 transition-transform duration-300"
          onClick={() => {

            let limit = 0;  
            if(mentorData){
              limit = webinarLimits(mentorData);
            }
            user
            ? mentorData
            ? mentorData.isPremium
            ? userData?.webinarLimit < limit ? navigate("/create-webinar") : setLimitExceeded(true)
            : setShowPremiumModal(true)
            : setShowMentorModal(true)
            : setShowLoginModal(true)
          }
        }
          disabled={disabled}
        >
          <FaPlus className="text-xl" />
        </div>
      )}
    </div>
  );
}

const WebinarCard = React.memo(({webinar}) => {

  const handleWhatsapp = async () => {
    await axios
      .get(
        `${import.meta.env.VITE_SERVER_URL}/getWhatsappNumber/${
          webinar.creator.id
        }`
      )
      .then((res) => {
        console.log(res.data);
        window.open(`https://wa.me/${res.data}`);
      });
  };

  const calculate = (date) => {
    let newDate = new Date(date);
    return `${newDate.toDateString()} ${newDate.toLocaleTimeString()}`;
  };

  return (
    <div className="md:flex gap-[22px] rounded-2xl border border-gray-300 p-4 md:p-6 my-2 bg-white">
      <img src={webinar.photo.url} referrerPolicy="no-referrer" alt="" width="363" height="204" className="w-full h-auto md:max-h-[210px] md:w-[339px] rounded-xl object-cover" />

      <div className="flex grow flex-col justify-between ml-2 mt-3">
        <Link to={`/detailedWebinar/${webinar._id}`}>
          <p className="text-sm font-semibold text-[#FB6514]">{calculate(webinar.startTime)}</p>
          <p className="text-xl md:text-2xl mt-1 font-bold text-[#101828]">{webinar.title}</p>

          <div className="mt-[13px] flex items-center gap-1.5 text-center">
            <img src={webinar.creator.photo} alt="" loading="lazy" width="28" height="28" decoding="async" data-nimg="1" className="h-6 w-6 rounded-full object-cover" />
            <p className="text-sm font-semibold leading-[18px] text-gray-900">{webinar.creator.name}</p>
            <p className="text-gray-600">|</p>
            <p className="text-sm leading-[18px] text-gray-600">{webinar.domain}</p>
          </div>
        </Link>
        <div className="relative bottom-0 flex items-center gap-3  flex-col-reverse md:flex-row-reverse mt-2 -ml-1">
            <button className="flex w-full justify-center rounded-lg  bg-black px-5 py-3" onClick={handleWhatsapp}>
            <div className="text-sm font-semibold items-center text-white flex">
            <FaWhatsapp className="w-4 h-4 mr-1 mt-0.5" />Connect with Mentor</div>
            </button>
            <Link to={`/detailedWebinar/${webinar._id}`} className="flex w-full justify-center whitespace-nowrap rounded-lg border border-gray-400 px-5 py-3 text-sm font-semibold text-gray-800">See Details Now</Link>
          </div>
      </div>
      </div>
  )
})

function webinarLimits(mentor) {
  let limit = 0; 
  mentor.plans.forEach(plan => {
    if (plan && plan == 'Premium' || plan == 'Lifetime') {
      limit = Math.max(limit, Infinity);
    } else if (plan && plan == 'Advance') {
      limit = Math.max(limit, 9);
    } else if (plan && plan == 'Basic') {
      limit = Math.max(limit, 3);
    }
});
  return limit;
}

function DataFetchLoading() {
  return (
    <div
      className="flex-col flex items-center
          justify-center text-lg p-4" style={{height: "80vh"}}
    >
      <img src={Loader} className="max-w-80" />
    </div>
  );
}

export default Webinars;
