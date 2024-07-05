import React from "react";
import sample from "../assets/user.png";
function Webinars() {
  const url =
    "https://preplaced.in/_next/image?url=https%3A%2F%2Fimages.bannerbear.com%2Fdirect%2FlPOmJb1Y6aez60g4Ga%2Frequests%2F000%2F058%2F769%2F035%2FMRj52Zwoa6xjOvvvYxWkdO3eE%2Fa5a1bea5e7a790de5df17ce4ec7cd0964f33d023.png&w=384&q=75";
  const liveWebinars = [
    {
      title: "Ace your coding interviews with Me",
      description:
        "This is the description of the webinar 1 This is the description of the webinar 1 This is the description of the webinar 1",
      domain: "Hiring",
      photo: {
        public_id: "1234",
        url: url,
      },
      startTime: "2021-09-01T10:00:00Z",
      creator: {
        id: "1234",
        name: "Creator 1",
        photo: sample,
      },
      isPaid: true,
      price: 100,
      status: "Live",
      liveLink: "https://www.meet.google.com/kon-siqa-nof",
    },
    {
      title: "Ace your coding interviews with Me",
      description:
        "his is the description of the webinar 1 This is the description of the webinar 1 This is the description of the webinar 1",
      domain: "Hiring",
      photo: {
        public_id: "1234",
        url: url,
      },
      startTime: "2021-09-01T10:00:00Z",
      creator: {
        id: "1234",
        name: "Creator 1",
        photo: sample,
      },
      isPaid: true,
      price: 100,
      status: "Live",
      liveLink: "https://www.meet.google.com/kon-siqa-nof",
    },
    {
      title: "Ace your coding interviews with Me",
      description:
        "his is the description of the webinar 1 This is the description of the webinar 1 This is the description of the webinar 1",
      domain: "Hiring",
      photo: {
        public_id: "1234",
        url: url,
      },
      startTime: "2021-09-01T10:00:00Z",
      creator: {
        id: "1234",
        name: "Creator 1",
        photo: sample,
      },
      isPaid: true,
      price: 100,
      status: "Live",
      liveLink: "https://www.meet.google.com/kon-siqa-nof",
    },
    {
      title: "Ace your coding interviews with Me",
      description:
        "his is the description of the webinar 1 This is the description of the webinar 1 This is the description of the webinar 1",
      domain: "Hiring",
      photo: {
        public_id: "1234",
        url: url,
      },
      startTime: "2021-09-01T10:00:00Z",
      creator: {
        id: "1234",
        name: "Creator 1",
        photo: sample,
      },
      isPaid: true,
      price: 100,
      status: "Live",
      liveLink: "https://www.meet.google.com/kon-siqa-nof",
    },
  ];
  return (
    <div className="w-full p-4 flex">
      <div className="p-2 my-2  w-full xl:w-4/6">
        <div className="w-full">
          <h1 className="text-3xl mt-4 ml-5 px-4 font-semibold">
            Live Webinars
          </h1>
          <p className="px-4 my-2 ml-5">
            Level up your career with live and exclusive webinars from top
            mentors.
          </p>
          <div className="grid grid-cols-1  3xl:grid-cols-2 xl:w-full p-3">
            {/* live webinar cards */}
            {liveWebinars.map((webinar, index) => 
                <WebinarCard key={index} webinar={webinar} />
            )}
          </div>
        </div>
        <div className="w-full">
          <h1 className="text-3xl mt-4 ml-5 px-4 font-semibold">
            Past Webinars
          </h1>
          <p className="px-4 my-2 ml-5">
            Level up your career with live and exclusive webinars from top
            mentors.
          </p>
          <div className="grid grid-cols-1  3xl:grid-cols-2 xl:w-full p-3">
            {/* live webinar cards */}
            {liveWebinars.map((webinar, index) => (
              <WebinarCard key={index} webinar={webinar} />
            ))}
          </div>
        </div>
      </div>
      <div
        className="top-28 h-fit z-0 border-none w-2/6 p-3 sticky hidden xl:flex"
        style={{
          maxHeight: "80vh",
        }}
      >
        <div className="w-full p-2">
          <h1 className="text-xl my-2 font-semibold text-center">
            Mentors with upcoming webinars
          </h1>
          {liveWebinars.map((webinar, index) => (
            <div className="border border-slate-300 rounded-lg flex p-2 my-2 items-center justify-between">
              <div className="flex flex-col w-9/12">
                <h1 className="font-semibold p-1">{webinar.title}</h1>
                <div className="flex items-center p-1">
                  <img
                    src={webinar.creator.photo}
                    className="max-w-8 rounded-full mr-3"
                  />
                  <p>{webinar.creator.name}</p>
                </div>
              </div>
              <button className="rounded-xl text-blue-500 px-2">
                See details {">"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WebinarCard({ webinar }) {
  return (
    <div className="flex border rounded-xl border-slate-400 shadow-lg p-5 mx-10 my-5 lg:m-2 flex-col lg:flex-row lg:w-10/12 lg:mx-auto xl:w-11/12">
      <div className="flex items-center justify-center  px-1 lg:w-7/12">
        <img
          src={webinar.photo.url}
          className="rounded-lg w-full lg:w-full 2xl:w-10/12"
          alt="webinar"
        />
      </div>
      <div className="p-4 flex  justify-center flex-col ">
        <p className="text-orange-600 font-semibold">{webinar.startTime}</p>
        <h1 className="font-semibold text-2xl whitespace-break-spaces">
          {webinar.title}
        </h1>
        <div className="flex items-center my-2">
          <img
            src={webinar.creator.photo}
            className="max-w-8 rounded-full mr-3"
          />
          <p>{webinar.creator.name}</p>
        </div>
        <div className="flex flex-col lg:flex-row">
          <button
            className="p-3 mt-3 lg:p-2 lg:mr-5 border-orange-500 border-2 rounded-xl"
          >
            Register for Webinar
          </button>
          <button
            className="p-3 mt-3 border-orange-500 border-2 bg-orange-500 text-white rounded-xl"
          >
            Book a Free Trial
          </button>
        </div>
      </div>
    </div>
  );
}

export default Webinars;
