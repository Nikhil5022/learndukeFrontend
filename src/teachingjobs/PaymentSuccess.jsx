import React from "react";
import {Link} from "react-router-dom" 
import Lines from "../mentorship/TsParticles/Lines";
import { confetti } from "../mentorship/TsParticles/options.js";

const PaymentSuccess = () => {
  return (
    <div
      style={{
        height: "80dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Lines particle={confetti} />
      <h1 className="text-3xl m-4 font-semibold"> Order Successful!</h1>
      <p className="text-xl text-center">The payment was successfully completed.</p>
      <p className="text-xl p-1 text-center">You now have access to selected plan.</p>
      <div className="flex m-5">

      <Link to={"/teachingjobs"}>
      <button className="border-2 m-3 p-4 rounded-xl border-orange-500">Go to Jobs</button>
      </Link>
      <Link to={"/explorementors"}>
      <button className="border-2 m-3 py-4 px-1 rounded-xl border-orange-500">Explore Mentors</button>
      </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
