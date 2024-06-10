import React, { useEffect, useState } from "react";
import teachingjobs from "../assets/teachingjobs.jpg";
import companies from "../assets/companies.jpg";
import DosAndDonts from "./DosAndDonts";
import { useNavigate } from "react-router-dom";
import Achievements from "../assets/Achievements.jpg";
import numbers2 from "../assets/numbers2.jpg";
import axios from "axios";
import image from "../assets/learnDuke.png";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Teachingjobs() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [userData, setUserData] = useState();
  

  useEffect(() => {
    
   
    AOS.init({
      duration: 1200,
      once: true, // whether animation should happen only once - while scrolling down
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if(user){
      axios.get("https://learndukeserver.vercel.app/getUser/"+user.email).then((res) => {
      console.log(res.data);
      setUserData(res.data);
    });
    }
  }, []);

  const checkoutHandler = async () => {
    if (!user) {
      return;
    }

    const { data } = await axios.post(
      "https://learndukeserver.vercel.app/checkout",
      {
        amount: 99,
      }
    );

    const options = {
      key: "rzp_test_jH3t9W8Up3P2iW",
      amount: 9900 / 100,
      currency: "INR",
      name: user.name ? user.name : "Sample User",
      description: "Tutorial of RazorPay",
      image: image,
      order_id: data.order.id,
      callback_url: `https://learndukeserver.vercel.app/verify/payment/${user.email}`,
      prefill: {
        name: user.name ? user.name : "Sample User",
        email: user.email ? user.email : "Sample@gmail.com",
        contact: user.mobile && user.mobile,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#121212",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };

  const handleAddToCart = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const products = [{ name: "Product 1", price: 999 }];

    if (products.length > 0) {
      navigate("/cart", { state: { products: products } });
    } else {
      console.error("Products array is empty");
    }
  };

  return (
    <div className="mt-10">
      <div className="w-full flex justify-center">
        <div
          className="w-full md:w-10/12 lg:w-9/12 flex flex-col md:flex-row px-4"
          data-aos="fade-in"
          data-aos-duration="1000"
        >
          <img src={teachingjobs} alt="" className="w-full mb-5 md:mb-0" />
          <div className="flex flex-col md:p-10">
            <div className="text-4xl font-bold m-3 leading-relaxed tracking-wider">
              Find an authentic online and offline jobs for you
            </div>
            <div
              className="text-lg leading-loose tracking-wider ml-3"
              style={{ color: "#404040" }}
            >
              Welcome to LearnDuke, the{" "}
              <span className="font-semibold">best site</span> for Indians 🇮🇳
              seeking Online and offline work! Browse{" "}
              <span className="font-semibold">thousands</span> of{" "}
              <span className="font-semibold">online and offline jobs</span>{" "}
              across all major industries and find your perfect online and
              offline jobs with your{" "}
              <span className="font-semibold">Location</span>.
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center mt-10">
        <div
          className="w-full md:w-10/12 lg:w-9/12 flex justify-evenly space-y-6 px-4"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <img src={numbers2} alt="" className="w-full" />
        </div>
      </div>
      <div className="w-full flex justify-center mt-10">
        <div className="w-full md:w-10/12 lg:w-9/12 flex flex-col space-y-6 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-100" data-aos="fade-right" data-aos-anchor-placement="center-center">
              <div className="text-xl font-bold leading-relaxed tracking-wide mb-3">
                We see every job before you do 👁️
              </div>
              <div
                className="leading-relaxed tracking-wide font-normal"
                style={{ color: "#404040" }}
              >
                Our specialty is finding job opportunities from multiple sources
                in real time, before they're visible to everyone else. This
                gives you the advantage to apply for these jobs before anyone
                else does.
              </div>
            </div>
            <div className="p-4 bg-gray-100" data-aos="fade-left" data-aos-anchor-placement="center-center">
              <div className="text-xl font-bold leading-relaxed tracking-wide mb-3">
                Call directly to the employer 👩🏻‍💼
              </div>
              <div
                className="leading-relaxed tracking-wide font-normal"
                style={{ color: "#404040" }}
              >
                Browse high quality remote job opportunities and submit your
                application straight to the best companies. We don't permit
                agencies to post vacancies, ensuring only genuine and top remote
                jobs are listed.
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-100" data-aos="fade-right"  data-aos-anchor-placement="center-center">
              <div className="text-xl font-bold leading-relaxed tracking-wide mb-3">
                1000+ new jobs every week ✅
              </div>
              <div
                className="leading-relaxed tracking-wide font-normal"
                style={{ color: "#404040" }}
              >
                We are constantly monitoring social media, news sites and top
                company career pages to discover new job vacancies. Each week,
                we post thousands of new opportunities for remote work.
              </div>
            </div>
            <div className="p-4 bg-gray-100" data-aos="fade-left"  data-aos-anchor-placement="center-center">
              <div className="text-xl font-bold leading-relaxed tracking-wide mb-3">
                Mentorship assistance available 😊
              </div>
              <div
                className="leading-relaxed tracking-wide font-normal"
                style={{ color: "#404040" }}
              >
                Our dedicated and helpful customer support team is always at
                your service. For any assistance, feel free to reach out to us
                via Instagram, Facebook, or Email.
              </div>
            </div>
          </div>
          <div className="items-center" style={{ color: "#404040" }}>
            <div
              className="text-center text-xl md:text-3xl font-semibold mt-12"
              data-aos="fade-up"
            >
              Great employers actively offering jobs
            </div>
            <div className="mt-10" data-aos="fade-up">
              <img src={companies} alt="" className="w-full" />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div
              className="text-2xl md:text-4xl font-bold p-5 mb-5 text-center px-3 md:px-16"
              data-aos="fade-up"
            >
              The #1 Job Site for Genuine Opportunities for Indians.
            </div>
            <button
              className="bg-blue-500 text-white p-2 px-4 hover:scale-105"
              data-aos="fade-up"
              onClick={() => {
                navigate("/teachingjobs");
              }}
            >
              Find jobs now
            </button>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="font-semibold text-xl" data-aos="fade-up">
              Trusted By
            </div>
          </div>
          <div
            className="mt-10 flex flex-col justify-center overflow-x-hidden"
            data-aos="fade-up"
          >
            <img src={Achievements} alt="" className="w-full" />
          </div>
          <div>
            <div className="text-2xl font-bold m-3" data-aos="fade-up">
              How it works:
            </div>
            <ol className="ml-2 md:ml-10">
              <li
                className="m-1 leading-relaxed tracking-wide"
                data-aos="fade-up"
              >
                <span className="font-semibold " style={{ color: "#404040" }}>
                  Step 1:{" "}
                </span>
                Complete the checkout process and place your order.
              </li>
              <li
                className="m-1 leading-relaxed tracking-wide"
                data-aos="fade-up"
              >
                <span className="font-semibold " style={{ color: "#404040" }}>
                  Step 2:{" "}
                </span>
                Immediately after placing your order, you will receive an email
                containing a link to access remote job vacancies.
              </li>
              <li
                className="m-1 leading-relaxed tracking-wide"
                data-aos="fade-up"
              >
                <span className="font-semibold " style={{ color: "#404040" }}>
                  Step 3:{" "}
                </span>
                Browse through the listings, apply for the positions that match
                your skills and interests, and get hired.
              </li>
            </ol>
            <div className="text-xl font-bold m-3" data-aos="fade-up">
              Wide range of online and offline jobs categories for freshers and
              experienced candidates:
            </div>
            <div
              className="mt-5 m-3 leading-relaxed tracking-wider"
              style={{ color: "#404040" }}
              data-aos="fade-up"
            >
              We offer job listings in various categories such as Accounting &
              Finance, Business & Management, Computer & IT, Content Creation,
              Customer Service, Data Entry, Data Science & Analytics, Design,
              Education & Training, Engineering, Home tutions & NGO jobs HR &
              Recruiting, Sales & Marketing, and many more.
            </div>
          </div>
          <div className="flex flex-col md:flex-row px-3 md:px-10">
            <div className="w-full md:w-1/2" data-aos="fade-in">
              <img src={teachingjobs} alt="" className="w-full" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col md:px-10 overflow-hidden">
              <div
                className="text-lg font-normal tracking-wide text-left m-2 mt-5"
                style={{ color: "#404040" }}
                data-aos="slide-left"
              >
                Buy one year membership to gain unlimited access to all job
                vacancies.
              </div>
              <div
                className="text-3xl font-semibold tracking-wider text-left m-2"
                data-aos="slide-left"
              >
                Find an authentic remote job for you
              </div>
              <div className="text-left m-2" data-aos="slide-left">
                <span className="text-lg font-bold">Rs. 99.00</span>
                <span className="text-white text-sm bg-orange-600 rounded-lg px-2 py-1 ml-2">
                  sale
                </span>
              </div>
              <button
                className="w-full border border-blue-500 py-4 text-blue-500 hover:border-2 hover-scale-up"
                data-aos="slide-left"
                onClick={handleAddToCart}
              >
                Add to cart
              </button>

              <button
                className="w-full text-white bg-blue-500 py-4 mt-2 hover:scale-105"
                data-aos="slide-left"
                onClick={()=>{
                  navigate("/subscription");
                }}
              >
                Buy it now
              </button>

              <div
                className="font-normal text-blue-500 hover:cursor-pointer mt-5 hover:underline"
                data-aos="slide-left"
              >
                view full details
              </div>
            </div>
          </div>
          <div className="w-full" data-aos="fade-up">
            <DosAndDonts />
          </div>
          <div className="flex flex-col justify-center items-center">
            <div
              className="text-center text-3xl font-semibold"
              data-aos="fade-up"
            >
              Join now
            </div>
            <div
              className="font-normal text-center tracking-wide mt-5"
              style={{ color: "#040404" }}
              data-aos="fade-up"
            >
              Click on the button below to know more details and apply for
              online and offline jobs.
            </div>
            <button
              className="bg-blue-500 text-white p-2 px-4 hover:scale-105"
              data-aos="fade-up"
              onClick={() => {
                navigate("/teachingjobs");
              }}
            >
              Find jobs now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
