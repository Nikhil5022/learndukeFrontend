import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
import { FaPhoneAlt, FaPlus, FaWhatsapp } from "react-icons/fa";
import Subscription from "./teachingjobs/Subscription";
import Detailedmentors from "./mentorship/Detailedmentors";
import LandingPage from "./mentorship/LandingPage";
import BecomeMentor from "./mentorship/Mentor/BecomeMentor";
import MentorPayment from "./mentorship/Mentor/payment/MentorPayment";
import Explorementors from './mentorship/Explorementors';
import MentorPaymentSuccess from "./mentorship/Mentor/MentorPaymentSuccess";

function App() {
  const [user, setUser] = useState(null);
  const [showNav, setShowNav] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const location = useLocation();
  const [showCreateJob, setShowCreateJob] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  useEffect(() => {
    if(location.pathname ==="/mentorship"|| location.pathname ==="/explorementors" || location.pathname.includes("/detailedmentor") || location.pathname === "/mentor/payment" || location.pathname === "/become-a-mentor") {
      setShowCreateJob(false)
    }else{
      setShowCreateJob(true)
      setShowFooter(true);
    }
    // Update showNav based on the current location
    if (location.pathname === "/createjob") {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  }, [location]);

  const handleCallNow = () => {
    window.location.href = `tel:6371313613,_blank`;
  };

  const handleWhatsApp = () => {
    (window.location.href = `https://wa.me/6371313613`), "_blank";
  };

  return (
    <>
      {showNav && <Navbar />}
      <Routes>
        <Route path="/" element={<Teachingjobs />} />
        <Route path="/teachingJobs" element={<Body />} />
        <Route path="/mentorship" element={<LandingPage />} />
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
        <Route path="/paymentfailed" element={<PaymentFailure />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/explorementors" element={<Explorementors />} />
        <Route path="/detailedmentor/:mentorId" element={<Detailedmentors />} />
        <Route path="/become-a-mentor" element={<BecomeMentor />} />
        <Route path="/mentor/payment" element={<MentorPayment />} />
        <Route path="/mentor/paymentsuccess" element={<MentorPaymentSuccess />} />
        {/* Add additional routes here */}
      </Routes>
      {showNav && showFooter && <Footer />}
      {user && showNav && (
        <>
          <div
            className="fixed bottom-44 right-0 bg-gray-500 text-white rounded-l-full w-12 h-12 flex items-center justify-center shadow-lg cursor-pointer hover:bg-gray-600 hover:scale-105 transition-transform duration-300 backdrop-blur-lg"
            onClick={handleCallNow}
          >
            <FaPhoneAlt className="text-xl text-blue-400" />
          </div>
          <div
            className="fixed bottom-32 right-0 bg-gray-500 text-white rounded-l-full w-12 h-12 flex items-center justify-center shadow-lg cursor-pointer hover:bg-gray-600 hover:scale-105 transition-transform duration-300 backdrop-blur-lg"
            onClick={handleWhatsApp}
          >
            <FaWhatsapp className="text-2xl text-green-400" />
          </div>
          {(user && showCreateJob) && (
            <div
              className="fixed bottom-4 right-4 bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg cursor-pointer hover:bg-orange-600 hover:scale-105 transition-transform duration-300"
              onClick={() => navigate("/createjob")}
            >
              <FaPlus className="text-xl" />
            </div>
          )}
        </>
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
