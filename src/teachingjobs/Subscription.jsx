import React from "react";
import { FaCheck } from "react-icons/fa";

export default function Subscription() {
  const plans = [
    {
      name: "Basic",
      price: "₹99",
      benefits: ["Call to HR directly", "100 days access limit"],
    },
    {
      name: "Advance",
      price: "₹399",
      benefits: [
        "Placement support",
        "Resume building",
        "Job update every day",
        "Call to HR",
        "1-year access period",
      ],
    },
    {
      name: "Premium",
      price: "₹999",
      benefits: [
        "One-to-one mentorship",
        "Job support",
        "Unlimited HR call",
        "Resume building",
        "Mock interview",
        "100% placement with our side",
        "Upskill program for 6 months",
      ],
    },
    {
      name: "Teacher Pro",
      price: "₹399",
      benefits: [
        "Home tuition connect",
        "Direct connection to parents",
        "Minimum 10k earning",
        "Online tuition connect",
        "24*7 support",
      ],
    },
  ];

  return (
    <div className="flex justify-center py-10 bg-white text-black">
    
      <div className="w-full md:w-11/12 lg:w-9/12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`w-full p-6 border border-black rounded-lg shadow-lg bg-white ${index > 1 ? 'md:h-fit' : ''}`}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="text-xl font-semibold">{plan.name}</div>
                <div className="text-xl font-semibold">{plan.price}</div>
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
                  <button className="px-4 py-2 bg-black text-white font-semibold rounded hover:bg-gray-800 transition duration-200">
                    Pay
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
