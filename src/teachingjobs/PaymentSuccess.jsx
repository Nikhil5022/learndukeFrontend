import React from "react";
import {Link} from "react-router-dom" 

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
      <h1 className="text-3xl m-4 font-semibold"> Order Successful</h1>
      <p>The payment was successful. </p>
      <p>You now have access to premium membership.</p>
      <p className="m-2">Reference No:- XPsfsj38r8489</p>
      <Link to={"/"}>
      <button className="border-2 p-4 rounded-xl border-black">Go to Home</button>
      </Link>
    </div>
  );
};

export default PaymentSuccess;
