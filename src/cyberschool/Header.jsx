import React from "react";
import {
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaPhone,
} from "react-icons/fa";
import { CiMail } from "react-icons/ci";

export default function Header() {
  return (
    <div className="h-12 w-full " style={{ backgroundColor: "#FF6900" }}>
      <div className=" flex justify-center text-white items-center space-x-10">
        <div className="font-semibold">IAO - 2021-03-1930</div>
        <div className="flex space-x-2">
          <FaInstagram className="text-xl cursor-pointer" />
          <FaTwitter className="text-xl cursor-pointer" />
          <FaFacebook className="text-xl cursor-pointer" />
          <FaYoutube className="text-xl cursor-pointer" />
          <FaLinkedin className="text-xl cursor-pointer" />
        </div>
        <div style={{backgroundColor:"#5B2673"}} className="h-12 items-center text-center px-6 font-semibold">Admission Open 2024-25 | Nur to Grade 8</div>
        <div className="flex">
          <FaPhone  className="rotate-180 rota"/>
          <div>Call{" "}</div>
          <div>1234567890</div>
        </div>
        <div className="flex">
          <CiMail />
          email
        </div>
      </div>
    </div>
  );
}
