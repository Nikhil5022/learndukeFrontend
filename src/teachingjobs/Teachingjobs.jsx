import React, { useRef } from "react";
import teachingjobs from "../assets/teachingjobs.jpg";
import companies from "../assets/companies.jpg";
import DosAndDonts from "./DosAndDonts";
import { useNavigate } from "react-router-dom";
import Achievements from "../assets/Achievements.jpg";
import numbers2 from "../assets/numbers2.jpg";
// import Aboutlearnduke from "../assets/Aboutlearnduke.mp4";

export default function Teachingjobs() {
  const navigator = useNavigate();
  const scrollRef = useRef(null);

  const handleAddToCart = () => {
    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  
    const products = [
      { name: "Product 1", price: 999 },
    ];
  
    if (products.length > 0) {
      navigator("/cart", { state: { products: products } });

    } else {
      console.error("Products array is empty");
    }
  };
  

  return (
    <div ref={scrollRef}>
      <div className="w-full flex justify-center">
        <div className="w-full md:w-10/12 lg:w-9/12 flex flex-col md:flex-row px-4">
          <img src={teachingjobs} alt="" className="w-full mb-5 md:mb-0" />
          <div className="flex flex-col  md:p-10">
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
        <div className="w-full md:w-10/12 lg:w-9/12 flex justify-evenly space-y-6 px-4">
          {/* <div className="flex flex-col mt-5">
            <span
              className="text-3xl  md:text-8xl font-bold"
              style={{
                background: "linear-gradient(90deg, orange, orange)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              5000+
            </span>
            <span className="tracking-normal text-2xl font-semibold text-center">
              Active online and offline jobs
            </span>
          </div>
          <div className="flex flex-col ml-5">
            <span
              className="text-3xl  md:text-8xl font-bold"
              style={{
                background: "linear-gradient(90deg, orange, orange)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              2000+
            </span>
            <span className="tracking-normal text-2xl font-semibold text-center mr-10">
              Companies hiring
            </span>
          </div>
          <div className="flex flex-col">
            <span
              className="text-3xl  md:text-8xl font-bold"
              style={{
                background: "linear-gradient(90deg, orange, orange)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              1000+
            </span>
            <span className="tracking-normal text-2xl font-semibold text-center">
              New jobs every week
            </span>
          </div> */}
          <img src={numbers2} alt="" />
        </div>
      </div>
      <div className="w-full flex justify-center mt-10">
        <div className="w-full md:w-10/12 lg:w-9/12 flex flex-col space-y-6 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-100">
              <div className="text-xl font-bold leading-relaxed tracking-wide mb-3">
                We see every job before you do 👁️
              </div>
              <div
                className="leading-relaxed tracking-wide font-thin"
                style={{ color: "#404040" }}
              >
                Our specialty is finding job opportunities from multiple sources
                in real time, before they're visible to everyone else. This
                gives you the advantage to apply for these jobs before anyone
                else does.
              </div>
            </div>
            <div className="p-4 bg-gray-100">
              <div className="text-xl font-bold leading-relaxed tracking-wide mb-3">
                Apply directly to the employer 👩🏻‍💼
              </div>
              <div
                className="leading-relaxed tracking-wide font-thin"
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
            <div className="p-4 bg-gray-100">
              <div className="text-xl font-bold leading-relaxed tracking-wide mb-3">
                1000+ new jobs every week ✅
              </div>
              <div
                className="leading-relaxed tracking-wide font-thin"
                style={{ color: "#404040" }}
              >
                We are constantly monitoring social media, news sites and top
                company career pages to discover new job vacancies. Each week,
                we post thousands of new opportunities for remote work.
              </div>
            </div>
            <div className="p-4 bg-gray-100">
              <div className="text-xl font-bold leading-relaxed tracking-wide mb-3">
                Expert assistance available 😊
              </div>
              <div
                className="leading-relaxed tracking-wide font-thin"
                style={{ color: "#404040" }}
              >
                Our dedicated and helpful customer support team is always at
                your service. For any assistance, feel free to reach out to us
                via Instagram, Facebook, or Email.
              </div>
            </div>
          </div>
          <div className="items-center" style={{ color: "#404040" }}>
            <div className="text-center text-xl md:text-3xl font-semibold mt-12">
              Great employers actively offering jobs
            </div>
            <div className="mt-10">
              <img src={companies} alt="" className="w-full" />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="text-2xl md:text-4xl font-bold p-5 mb-5 text-center px-3 md:px-16">
              The #1 Job Site for Genuine Opportunities for Indians.
            </div>
            <button className="bg-blue-500 text-white p-2 px-4 hover:scale-105">
              Find jobs now
            </button>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="font-semibold text-xl">Trusted By</div>
          </div>
          <div className="mt-10 flex flex-col  justify-center overflow-x-hidden">
            {/* <div className="flex">
              <img src={Achievements} alt="" className="h-16 md:h-32" />
              <img src={Achievements2} alt="" className="h-16 md:h-32" />
            </div>
            <div className="flex">
              <img src={rozerpay} alt="" className="h-40" />
              <img src={phonepay} alt="" className="h-36" />
            </div> */}
            <img src={Achievements} alt="" className="w-full" />
          </div>
          <div>
            <div className="text-2xl font-bold m-3">How it works: </div>
            <ol className="ml-2 md:ml-10">
              <li className="m-1 leading-relaxed tracking-wide">
                <span className="font-semibold " style={{ color: "#404040" }}>
                  Step 1:{" "}
                </span>
                Complete the checkout process and place your order.
              </li>
              <li className="m-1 leading-relaxed tracking-wide">
                <span className="font-semibold " style={{ color: "#404040" }}>
                  Step 2:{" "}
                </span>
                Immediately after placing your order, you will receive an email
                containing a link to access remote job vacancies.
              </li>
              <li className="m-1 leading-relaxed tracking-wide">
                <span className="font-semibold " style={{ color: "#404040" }}>
                  Step 3:{" "}
                </span>
                Browse through the listings, apply for the positions that match
                your skills and interests, and get hired.
              </li>
            </ol>
            <div className="text-xl font-bold m-3">
              Wide range of online and offline jobs categories for freshers and
              experienced candidates:
            </div>
            <div
              className="mt-5 m-3  leading-relaxed tracking-wider"
              style={{ color: "#404040" }}
            >
              We offer job listings in various categories such as Accounting &
              Finance, Business & Management, Computer & IT, Content Creation,
              Customer Service, Data Entry, Data Science & Analytics, Design,
              Education & Training, Engineering, Home tutions & NGO jobs HR &
              Recruiting, Sales & Marketing, and many more.
            </div>
          </div>
          <div className="flex flex-col md:flex-row px-3 md:px-10">
            <div className="w-full md:w-1/2">
              {/* <video
                loop
                controls
                className={`w-full p-2 md:p-0 md:pr-10 md:pl-0 md:pt-10 md:pb-0`}
              >
                <source src={Aboutlearnduke} type="video/mp4" />
              </video> */}
            </div>
            <div className="w-full md:w-1/2 flex flex-col  md:px-10">
              <div
                className="text-lg font-thin tracking-wide text-left m-2 mt-5"
                style={{ color: "#404040" }}
              >
                Buy one year membership to gain unlimited access to all job
                vacancies.
              </div>
              <div className="text-3xl font-semibold tracking-wider text-left m-2">
                Find an authentic remote job for you
              </div>
              <div className="text-left m-2">
                <span className="text-lg font-bold">Rs. 999.00</span>
                <span className="text-white text-sm bg-orange-600 rounded-lg px-2 py-1 ml-2">
                  sale
                </span>
              </div>
              <button
                className="w-full border border-blue-500 py-4 text-blue-500 hover:border-2"
                onClick={handleAddToCart}
              >
                Add to cart
              </button>

              <button
                className="w-full text-white bg-blue-500 py-4 mt-2 hover:scale-105"
                onClick={() => {
                  window.open("https://rzp.io/l/learndukeindia", "_blank");
                }}
              >
                Buy it now
              </button>

              <div className="font-thin text-blue-500 hover:cursor-pointer mt-5 hover:underline">
                view full details
              </div>
            </div>
          </div>
          <div className="w-full">
            <DosAndDonts />
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="text-center text-3xl font-semibold">Join now</div>
            <div
              className="font-thin text-center tracking-wide mt-5"
              style={{ color: "#040404" }}
            >
              Click on the button below to know more details and apply for
              online and offline jobs.
            </div>
            <button className="bg-blue-500 text-white w-fit p-2 px-4 hover:scale-105 mt-5">
              Find jobs now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
