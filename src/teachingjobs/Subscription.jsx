import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import axios from "axios";
import image from "../assets/learnDuke.png";

export default function Subscription() {
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      name: "Basic",
      price: 99, // in INR
      benefits: ["Call to HR directly", "100 days access limit"],
      days: 100,
    },
    {
      name: "Advance",
      price: 399, // in INR
      benefits: [
        "Placement support",
        "Resume building",
        "Job update every day",
        "Call to HR",
        "1-year access period",
      ],
      days: 365,
    },
    {
      name: "Premium",
      price: 999, // in INR
      benefits: [
        "One-to-one mentorship",
        "Job support",
        "Unlimited HR call",
        "Resume building",
        "Mock interview",
        "100% placement with our side",
        "Upskill program for 6 months",
      ],
      days: 180,
    },
    {
      name: "Teacher Pro",
      price: 399, // in INR
      benefits: [
        "Home tuition connect",
        "Direct connection to parents",
        "Minimum 10k earning",
        "Online tuition connect",
        "24*7 support",
      ],
      days: 100,
    },
  ];

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      axios.get(`https://learndukeserver.vercel.app/getUser/${user.email}`).then((response) => {
        setUserData(response.data);
      });
    }
  }, [user]);

  const openModal = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const checkoutHandler = async (plan) => {
    if (!user) {
      return;
    }

    try {
      const { data } = await axios.post("https://learndukeserver.vercel.app/checkout", {
        amount: plan.price, // amount in paisa
      });

      const options = {
        key: "rzp_test_jH3t9W8Up3P2iW",
        amount: plan.price * 100, // amount in paisa
        currency: "INR",
        name: user.name || "Sample User",
        description: `${plan.name} Plan Purchase`,
        image: image,
        order_id: data.order.id,
        callback_url: `https://learndukeserver.vercel.app/verify/payment/${user.email}`,
        prefill: {
          name: user.name || "Sample User",
          email: user.email || "Sample@gmail.com",
          contact: user.mobile || "0000000000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#121212",
        },
        handler: function (response) {
          const paymentDate = new Date();
          const expirationDate = new Date(paymentDate);
          expirationDate.setDate(expirationDate.getDate() + plan.days);

          const paymentDetails = {
            paymentDate: paymentDate.toLocaleString(),
            plan: plan.name,
            amount: plan.price,
            status: "Completed",
            user: user.email,
            expirationDate: expirationDate.toLocaleString(),
            transactionId: response.razorpay_payment_id, // Ensure transaction ID is unique
            ...response,
          };
          console.log("Payment Successful", paymentDetails);
          // Send payment details to server or handle UI update
          axios.post("https://learndukeserver.vercel.app/addPayment", paymentDetails).then((response) => {
            console.log("Payment details saved:", response.data);
          });
        },
        modal: {
          ondismiss: function () {
            console.log("Payment form closed");
          },
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return user ? (
    <div className="flex justify-center py-10 bg-white text-black">
      <div className="w-full md:w-11/12 lg:w-9/12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`w-full p-6 border border-black rounded-lg shadow-lg bg-white ${
                index > 1 ? "md:h-fit" : ""
              }`}
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
                    className="px-4 py-2 bg-black text-white font-semibold rounded hover:bg-gray-800 transition duration-200"
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
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div className="bg-white p-6 rounded shadow-lg relative w-full max-w-md">
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            onClick={() => setShowModal(false)}
          >
            <span className="text-2xl">&times;</span>
          </button>
          <h2 className="text-xl font-semibold mb-4">Your Subscriptions</h2>
          {userData?.plans.includes(selectedPlan.name) ? (
            <p>You are already subscribed to the {selectedPlan.name} plan.</p>
          ) : (
            <div>
              <h3 className="text-lg font-semibold">{selectedPlan.name}</h3>
              <p>Price: ₹{selectedPlan.price}</p>
              <ul className="list-disc list-inside mb-4">
                {selectedPlan.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-black text-white font-semibold rounded hover:bg-gray-800 transition duration-200"
                  onClick={() => {
                    checkoutHandler(selectedPlan);
                    setShowModal(false);
                  }}
                >
                  Pay
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      )}
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen text-2xl font-semibold text-gray-500">
      Please login to view subscription plans
    </div>
  );
}
