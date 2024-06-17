import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import sampleUser from "../../../assets/user.png";
import Modal from "../../../Modal.jsx";
import image from "../../../assets/learnDuke.png";

function MentorPayment() {
  const [mentorData, setMentorData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [user, setUser] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() =>{
    const userPresent = JSON.parse(localStorage.getItem("user"));
    if(!userPresent){
      navigate("/mentorship");
    }
    setUser(userPresent);
  },[])

  useEffect(() => {
    window.scrollTo(0, 0);
    let data = location.state ? location.state.mentorData : null;
    if (!data) {
      navigate("/mentorship");
    }
    setMentorData(data);
    console.log(mentorData)

    sendData();
  }, [mentorData]);

  async function sendData() {
    if(Object.keys(mentorData).length > 0){
      await axios.post(`http://127.0.0.1:3000/addMentor/${user.email}`, mentorData);
    }
  }

  const plans = [
    {
      name: "Basic",
      price: 99, // in INR
      benefits: ["30 Days Validity","Student can connect directly", "Minimum earning 10k/month", "24/7 Support", ],
      days: 30,
    },
    {
      name: "Advance",
      price: 199, // in INR
      benefits: ["100 Days Validity","Student can connect directly","Minimum earning 15k/month","5 Personalized Ads", "24/7 Support"],
      days: 100,
    },
    {
      name: "Premium",
      price: 499,
      benefits: ["Lifetime membership for first 3000 members","365 Days Validity","Student can connect directly","Minimum earning 30k/month","Unlimited Personalized Ads","Personal Training Sessions" , "24/7 Support"],
      days: 365,
    }
  ];

  const checkoutHandler = async (plan) => {
    if (!user) {
      alert("Please login first to proceed to checkout");
      return;
    }

    try {
      const { data } = await axios.post(
        "https://learndukeserver.vercel.app/checkout",
        {
          amount: plan.price, // amount in paisa
        }
      );

      const options = {
        key: "rzp_test_jH3t9W8Up3P2iW",
        amount: plan.price * 100, // amount in paisa
        currency: "INR",
        name: user?.name || "Sample User",
        description: `${plan.name} Plan Purchase`,
        image: image,
        order_id: data.order.id,
        callback_url: `http://localhost:3000/verify/payment/mentor/${user.email}/${plan.name}/${plan.price}/${plan.days}`,
        redirect: true,
        prefill: {
          name: user?.name || "Sample User",
          email: user.email || "Sample@gmail.com",
          contact: user.mobile || "0000000000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#121212",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  const openModal = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  return user ? (
    <div className=" flex item-center justify-center flex-col">
      <div className="flex flex-col lg:flex-row">

      <div className="flex-col flex-1 flex items-center w-full">
        <div className="flex w-9/12 h-72 items-center justify-center  rounded-xl mt-10 p-1 shodow-lg flex-col">
          <img
            src={
              mentorData?.profilePhoto ? mentorData.profilePhoto : sampleUser
            }
            alt={user?.name}
            className="h-40 border-2 border-slate-300 rounded-2xl"
          />
          <div className="mt-4 text-2xl font-serif">{user?.name}</div>
        </div>
        
        <h1 className="text-lg sm:10/12 lg:w-10/12 md:w-11/12 font-semibold text-center mx-4 -mt-5 p-3">
          Your mentor profile has been created.
          <br /> Make a purchase in order to make it visible to the users.
        </h1>
      </div>
      <p className="w-11/12 border-orange-300 border-y-2 mx-auto lg:hidden"></p>
      <div className="flex-1 m-5 flex-col flex items-center mt-9">
        <div className=" border-2 bg-orange-500 text-white flex flex-col items-center rounded-lg border-slate-500 w-10/12">
        <h1 className="text-3xl mx-auto my-3 px-3 text-center font-semibold">Benefits of Teacher Pass</h1>
          <ul className="list-disc list-inside font-normal">
            <li className="ml-2 p-2 text-lg">Better Profile Visibility. 
              You can get Home Tututions, Online Tututions and even Job opportunity from Education Section.</li>
            <li className="m-2 p-2 text-lg">Networking Opportunity. Connect with large number of users.</li>
            <li className="m-2 p-2 text-lg">Earn a side income of 10 to 30k per month.</li>
            <li className="m-2 p-2 text-lg">Help millions of students grow by mentoring them.</li>
            </ul>
        </div>
      </div>
      </div>
      <p className="w-11/12 border-orange-300 border-y-2 mx-auto "></p>
      <div className="w-full p-4 flex items-center flex-col justify-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Mentor Plans
        </h1>
        <div className="w-full flex flex-wrap items-center justify-center ">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="border-2 relative w-80 p-4 bg-white rounded-lg m-4 flex flex-col min-h-80"
              style={{ boxShadow: "0 0 10px 0 rgba(249, 115, 22, 0.5)" }}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="text-xl font-semibold">{plan.name}</div>
                <div className="text-xl font-semibold">₹{plan.price}</div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  {plan.benefits.map((benefit, i) => (
                    <div key={i} className="mb-2 flex ">
                      <FaCheck className="text-green-500 mr-2 mt-1.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <button
                    className="px-4 py-2 border-orange-500 font-semibold rounded-lg hover:bg-orange-500 hover:text-white border-2  transition duration-200 absolute bottom-3 right-3"
                    onClick={() => openModal(plan)}
                  >
                    Pay
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal onClose={() => setShowModal(false)} isOpen={showModal}>
      <div className="relative">
              <h3 className="text-3xl font-semibold">{selectedPlan?.name}</h3>
              <p className="text-xl my-1">Price: ₹{selectedPlan?.price}</p>
              <ul className="list-disc list-inside mb-4">
                {selectedPlan?.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 absolute bg-black text-white font-semibold rounded hover:bg-gray-800 transition duration-200 bottom-0 right-1"
                  onClick={() => {
                    setShowModal(false);
                    checkoutHandler(selectedPlan);
                  }}
                >
                  Pay
                </button>
              </div>
            </div>
      </Modal>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen text-2xl font-semibold text-gray-500">
      Please login to view mentor plans
    </div>
  );
}

export default MentorPayment;

