import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./Navbar";
import Body from "./Body";
import Teachingjobs from "./teachingjobs/Teachingjobs";
import Cyberschool from "./cyberschool/Cyberschool";
import Findteachingjobs from "./teachingjobs/Findteachingjobs";
import Contactus from "./teachingjobs/Contactus";
import Reviews from "./teachingjobs/Reviews";
import TeachingNavbar from "./teachingjobs/TeachingNavbar";
import Cart from "./teachingjobs/Cart";
import Footer from "./teachingjobs/Footer";
import Faq from "./teachingjobs/Faq";
import Createjob from "./Createjob";
import Admin from "./admin/Admin";
import Userpage from "./teachingjobs/Userpage";
import Userdata from "./Userdata";
import PaymentSuccess from "./teachingjobs/PaymentSuccess";

// function NavbarWrapper() {
//   const location = useLocation();
//   const showNavbar =
//     location.pathname !== "/teachingJobs" &&
//     location.pathname !== "/cyberschool" &&
//     location.pathname !== "/findteachingjobs" &&
//     location.pathname !== "/contactus" &&
//     location.pathname !== "/reviews" &&
//     location.pathname !== "/cart" &&
//     location.pathname !== "/faq";
//   return showNavbar ? <Navbar /> : <TeachingNavbar />;
// }

export default function App() {
  return (
    <Router>
      <>
        {/* Render NavbarWrapper instead of Navbar */}
       <Navbar />
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
          {/* Add additional routes here */}
        </Routes>
        <Footer />
      </>
    </Router>
  );
}
