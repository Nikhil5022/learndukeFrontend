import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";
import poster from "../assets/poster.webp";
import { MdLiveTv } from "react-icons/md";
import { MdEmergencyRecording } from "react-icons/md";
import { IoDocumentSharp } from "react-icons/io5";
import { BsFillTagsFill } from "react-icons/bs";



function Detailedwebinar() {
  const { id } = useParams();
  const [webinar, setWebinar] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/getWebinar/${id}`).then((res) => {
        console.log(res.data);
        setWebinar(res.data);
      });
    }
  }, [id]);

  if (!webinar) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const additionalBenefits = [
    {
      name: "Live Q&A",
      description: "Join the mentor's live Q&A to ask questions, learn from others, and clear up any confusion.",
      icon: <MdLiveTv />
    },
    {
      name: "Recording of the entire Session",
      description: "Once the session is done, we'll provide you with a recording of the entire thing.",
      icon: <MdEmergencyRecording />
    },
    {
      name: "Exciting Quiz sessions",
      description: "Participate in the mentor's quiz for a good time and to clarify any doubts you may have.",
      icon: <IoDocumentSharp />,
    },
    {
      name: "Exclusive Discount on all our 1:1 mentorship programs",
      description: "Receive an exclusive participant-only discount coupon for any mentorship plan.",
      icon: <BsFillTagsFill />
    },
  ];

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
            <div className="border border-gray-300 p-6 rounded-xl bg-white">
              <img src={poster} alt="webinar" className="w-full h-auto" />
              <hr className="my-4" />
              <div className="flex justify-between">
                <div></div>
                <div>
                  <button className="bg-black text-white p-3 rounded-lg">
                    Book a FREE 1:1 Trial Session
                  </button>
                </div>
              </div>
            </div>
            <div className="border border-gray-300 p-6 rounded-xl bg-white mt-10">
              <div className="text-xl font-bold">About the Webinar</div>
              <hr className="my-4" />
              <div className="py-5">{webinar.description}</div>
              <div className="py-5">During the session, we'll cover:</div>
              {webinar.topics.map((topic, index) => (
                <div key={index} className="mb-7">
                  <div className="font-semibold">{topic.name}</div>
                  <ul className="list-disc pl-5 text-gray-300 mt-3">
                    {topic.description.map((desc, i) => (
                      <li key={i} style={{ color: "#3B4152" }} className="m-2">
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <hr className="my-4" />
              <div className="flex justify-between mt-5">
                <div></div>
                <div>
                  <button className="bg-black text-white p-3 rounded-lg">
                    Book a FREE 1:1 Trial Session
                  </button>
                </div>
              </div>
            </div>
            <div className="border border-gray-300 p-6 rounded-xl bg-white mt-10">
              <div className="text-xl font-bold">Additional Benefits</div>
              <hr className="my-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {webinar.additionalBenefits.map((benefitName, index) => {
                const benefit = additionalBenefits.find(
                  (b) => b.name === benefitName
                );
                return (
                  benefit && (
                    <div key={index} className="flex items-start rounded-lg border border-gray-300 p-3">
                      <div className="mr-2 mt-1 text-gray-500 text-2xl">{benefit.icon}</div>
                      <div>
                        <div className="font-semibold">{benefit.name}</div>
                        <div className="text-gray-700">{benefit.description}</div>
                      </div>
                    </div>
                  )
                );
              })}
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/6"></div>
        </div>
      </div>
    </div>
  );
}

export default Detailedwebinar;
