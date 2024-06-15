import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import sampleUser from "../../../assets/user.png";
import Modal from "../../../Modal.jsx";
import image from "../../../assets/learnDuke.png";

function MentorPayment() {
  const [mentorData, setMentorData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setMentorData(location.state?.mentorData);
    // setMentorData();
  }, []);

  const plans = [
    {
      name: "Basic",
      price: 99, // in INR
      benefits: ["Sample Content", "30 Days Validity"],
      days: 30,
    },
    {
      name: "Advance",
      price: 199, // in INR
      benefits: ["Sample Content", "90 Days Validity"],
      days: 90,
    },
    {
      name: "Premium",
      price: 299, // in INR
      benefits: ["Sample Content", "180 Days Validity"],
      days: 180,
    },
    {
      name: "Teacher Pro",
      price: 999,
      benefits: ["Sample Content", "365 Days Validity"],
      days: 365,
    },
  ];
  const user = JSON.parse(localStorage.getItem("user"));

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
        callback_url: `https://learndukeserver.vercel.app/verify/payment/${user.email}/${plan.name}/${plan.price}/${plan.days}`,
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
    <div className=" flex item-center justify-center flex-col lg:flex-row">
      <div className="flex-col flex items-center justify-center w-full lg:w-1/3">
        <div className="flex w-64 h-64 rounded-xl mt-10 p-1 shodow-lg flex-col items-center justify-end">
          <img
            src={
              mentorData?.profilePhoto ? mentorData.profilePhoto : sampleUser
            }
            alt={user?.name}
            className="h-40 border-2 border-slate-300 rounded-2xl"
          />
          <div className="mt-4 text-2xl font-serif">{user?.name}</div>
        </div>
        <h1 className="text-lg sm:10/12 lg:w-10/12 md:11/12 font-semibold text-center mx-4 mb-5 p-3">
          Your mentor profile has been created.
          <br /> Make a purchase in order to make it visible to the users.
        </h1>
      </div>
      <p className="w-11/12 border-orange-300 border-y-2 mx-auto lg:hidden"></p>
      <div className="w-full lg:w-2/3 p-4 flex items-center flex-col justify-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Mentor Plans
        </h1>
        <div className="w-full flex flex-wrap items-center justify-center ">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="border-2 relative w-80 p-4 bg-white rounded-lg m-4 flex flex-col"
              style={{ boxShadow: "0 0 10px 2px #444" }}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="text-xl font-semibold">{plan.name}</div>
                <div className="text-xl font-semibold">₹{plan.price}</div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  {plan.benefits.map((benefit, i) => (
                    <div key={i} className="mb-2 flex items-center">
                      <FaCheck className="text-green-500 mr-2" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <button
                    className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-900 border-2  transition duration-200 absolute bottom-3 right-3"
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
                    checkoutHandler(selectedPlan);
                    setShowModal(false);
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

