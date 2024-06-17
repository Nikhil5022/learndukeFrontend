import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { RiVisaLine } from "react-icons/ri";
import { RiMastercardFill } from "react-icons/ri";
import { RiPaypalFill } from "react-icons/ri";
import { SiAmericanexpress } from "react-icons/si";
import { FaCcDiscover } from "react-icons/fa";
import { FaApplePay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  if (location.pathname === "/createJob") {
    return null;
  }
  const navigator = useNavigate();
  return (
    <div className="w-full flex justify-center mt-10">
      <div className="w-full md:w-10/12 lg:w-9/12 flex flex-col space-y-6 px-4">
        <div className="w-full h-0.5 bg-yellow-500"></div>
        <div className="w-full flex flex-col md:flex-row text-center md:text-left ">
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="text-xl font-semibold my-5">Resources</div>
            <div className="font-normal hover:underline my-3"
              onClick={() => {
                navigator("/teachingjobs");
              }}
            >
              Find Your Remote and offline Job
            </div>
            <div
              className="font-normal hover:underline my-3"
              onClick={() => {
                navigator("/reviews");
              }}
            >
              Customer Reviews
            </div>
            <div className="font-normal hover:underline my-3">Our Story</div>
            <div className="font-normal hover:underline my-3">
              <a href="https://learnduke.com/live">Learnduke upskill program</a>
            </div>
            <div className="font-normal hover:underline my-3">
              <a href="">Mentorship</a>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="text-xl font-semibold my-5">Contact Us</div>
            <div
              className="font-normal hover:underline my-3 hover:cursor-pointer"
              onClick={() => {
                navigator("/contactus");
              }}
            >
              Contact Us
            </div>
            <div className="font-normal hover:underline my-3"
              onClick={() => {navigator("/faq")}}
            >FAQ</div>
          </div>
        </div>
        <div className="flex justify-center space-x-10 text-xl mb-5">
          <FaFacebook
            onClick={() => {
              window.open(
                "https://www.facebook.com/profile.php?id=61555285526363",
                "_blank"
              );
            }}
            className="cursor-pointer"
          />
          <FaInstagram
            onClick={() => {
              window.open(
                "https://www.instagram.com/learnduke_india?igsh=bjVmODg3ejFwMzR6",
                "_blank"
              );
            }}
            className="cursor-pointer"
          />
        </div>
        <hr />
        <div className="mt-10">
          <div className="flex justify-center space-x-5">
            <RiVisaLine className="text-xl" />
            <RiMastercardFill className="text-xl" />
            <RiPaypalFill className="text-xl" />
            <SiAmericanexpress className="text-xl" />
            <FaCcDiscover className="text-xl" />
            <FaApplePay className="text-xl" />
          </div>
          <div className=" font-normal text-sm m-5" style={{ color: "#404040" }}>
            © 2021 LearnDuke. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
