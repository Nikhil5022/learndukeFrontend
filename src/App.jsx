import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Body from "./Body";
import Teachingjobs from "./teachingjobs/Teachingjobs";
import Cyberschool from "./cyberschool/Cyberschool";
import Findteachingjobs from "./teachingjobs/Findteachingjobs";
import Contactus from "./teachingjobs/Contactus";
import Reviews from "./teachingjobs/Reviews";
import Cart from "./teachingjobs/Cart";
import Footer from "./teachingjobs/Footer";
import Faq from "./teachingjobs/Faq";
import Createjob from "./Createjob";
import Admin from "./admin/Admin";
import Userpage from "./teachingjobs/Userpage";
import Userdata from "./Userdata";
import PaymentSuccess from "./teachingjobs/PaymentSuccess";
import Detailedjob from "./teachingjobs/Detailedjob";
import PaymentFailure from "./teachingjobs/PaymentFailure";
import { FaPlus } from "react-icons/fa";
import Subscription from "./teachingjobs/Subscription";

function App() {
  const [user, setUser] = useState(null);
  const [showNav, setShowNav] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  useEffect(() => {
    // Update showNav based on the current location
    if (location.pathname === "/createjob") {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  }, [location]);

  return (
    <>
      {showNav && <Navbar />}
      <Routes>
        <Route path="/" element={<Teachingjobs />} />
        <Route path="/teachingJobs" element={<Body />} />
        <Route path="/cyberschool" element={<Cyberschool />} />
        <Route path="/findteachingjobs" element={<Findteachingjobs />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/createjob" element={<Createjob />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/userpage" element={<Userpage />} />
        <Route path="/userdata" element={<Userdata />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        <Route path="/detailedjob/:jobId" element={<Detailedjob />} />
        <Route path="/paymentfailure" element={<PaymentFailure />} />
        <Route path="/subscription" element={<Subscription />} />
        {/* Add additional routes here */}
      </Routes>
      {showNav && <Footer />}
      {user && showNav && (
        <div
          className="fixed bottom-4 right-4 bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg cursor-pointer hover:bg-orange-600 hover:scale-105 transition-transform duration-300"
          onClick={() => {
            window.location.href = "/createjob";
          }}
        >
          <FaPlus className="text-xl" />
        </div>
      )}
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
