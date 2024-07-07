import axios from "axios";
import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import Modal from "../Modal";

function CreateWebinar() {

  const initialWebinarState = {
    title: "",
    description: "",
    domain: "",
    startTime: "",
    endTime: "",
    liveLink: "",
    isPaid: false,
    price: function () {
        return this.isPaid === true ? 0 : null;
    },
    additionalBenefits: [],
    topic: [
      {
        name: "",
        description: [],
      },
    ],
  }
  const [webinar, setWebinar] = useState({
    title: "",
    description: "",
    domain: "",
    startTime: "",
    endTime: "",
    liveLink: "",
    isPaid: false,
    price: function () {
        return this.isPaid === true ? 0 : null;
    },
    additionalBenefits: [""],
    topic: [
      {
        name: "",
        description: [""],
      },
    ],
  });
  const navigate = useNavigate()
  const [successModal,setSuccessModal] = useState(false)

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(()=>{         
    if(!user){
      navigate("/webinars")
    }
  }, [])

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3000/create-webinar", {
      mail: user.email,
      webinar
    })

      console.log(res)
      setWebinar(initialWebinarState)
      if(res.status === 200){
        setSuccessModal(true)
      }
      // else{
      //   setFailureModal(true)
      // }
  }

  console.log(webinar)

  return (
    <div className="w-full p-4">
      <div className="mx-auto flex flex-col items-center">
        <h1 className="text-2xl font-semibold my-1">Enter details of Webinar</h1>
        <form onSubmit={handleSubmit}  className="mx-auto w-10/12 max-w-xl mt-5 text-black">
          <div className="flex flex-col px-4 my-2">
            <label htmlFor="title" className="text-gray-800 font-semibold" >
              Title
            </label>
            <input
              value={webinar.title}
              onChange={(e) => 
                setWebinar((prevState) => ({
                ...prevState,
                title: e.target.value,
              }))}
              type="text"
              name="title"
              id="title"
              className="border-b-2 border-slate-500 p-1 outline-none font-normal"
              placeholder="Enter the title of webinar"
              required
            />
          </div>
          <div className="flex flex-col px-4 my-2">
            <label htmlFor="link" className="text-gray-800 font-semibold" >
              Link of Webinar
            </label>
            <input
              value={webinar.liveLink}
              onChange={(e) =>setWebinar((prevState) => ({
                ...prevState,
                liveLink: e.target.value,
              }))}
              type="text"
              name="link"
              id="link"
              className="border-b-2 border-slate-500 p-1 outline-none font-normal"
              placeholder="Enter the link of webinar"
              required
            />
          </div>
          <div className="flex flex-col px-4 my-2">
            <label htmlFor="description" className="text-gray-800 font-semibold">
              Description
            </label>
            <textarea
              value={webinar.description}
              onChange={(e)=> setWebinar((prevState) => ({
                ...prevState,
                description: e.target.value,
              }))}
              name="description"
              id="description"
              placeholder="Enter description of webinar"
              className="border-2 border-slate-500 my-2 p-3 outline-none"
              rows={"3"}
              required
            />
          </div>
          <div className="flex px-4 my-2">
            <label htmlFor="domain" className="text-gray-800 mr-5 font-semibold py-2">Domain</label>
            <select value={webinar.domain}
            onChange={(e)=> setWebinar((prevState) => ({
              ...prevState,
              domain: e.target.value,
            }))}
            name="domain" id="domain" className="px-1 sm:px-5 py-2 border-2 border-slate-500" required> 
                <option value="">Select any Domain</option>
                <option value="Hiring">Hiring</option>
                <option value="Career">Career</option>
                <option value="Study Abroad">Study Abroad</option>
            </select>
          </div>
          <div className="flex flex-col sm:flex-row px-4 my-4">
            <div className="flex items-center md:space-y-0 space-y-1">
            <label htmlFor="startTime" className="text-gray-800 font-semibold mr-0.5">Start Time</label>
            <input
            value={webinar.startTime}
            onChange={(e)=> setWebinar((prevState) => ({
              ...prevState,
              startTime: e.target.value,
            }))}
             type="datetime-local" id="startTime" name="startTime" className="border-2 ml-2 h-10 px-4 mr-4 p-2 border-slate-500" required/>
            </div>
            <div className="flex items-center  md:space-y-0 space-y-4">
            <label htmlFor="endTime" className="text-gray-800 font-semibold ">End Time</label>
            <input value={webinar.endTime}
            onChange={(e)=> setWebinar((prevState) => ({
              ...prevState,
              endTime: e.target.value,
            }))} type="datetime-local" id="endTime" name="endTime" className="border-2 ml-4 sm:ml-0.5 h-10 p-2 border-slate-500" required/>
          </div>
          </div>
          <div className="flex items-center  text-center px-4 my-2">
            <div className="flex items-center justify-center">
            <input
             value={webinar.isPaid}
             onClick={()=> setWebinar((prev) => ({
              ...prev,
              isPaid : !webinar.isPaid
             }))}
              type="checkbox" id="isPaid" name="isPaid" className="border-2 p-2 border-slate-500" />
            <label htmlFor="isPaid" className="text-gray-800 mx-3 font-semibold py-2">Is Paid</label>
            </div>
            {webinar.isPaid && <div className="flex items-center mx-5">
              <label htmlFor="price" className="text-gray-800 font-semibold ">Price</label>
            <input
            value={webinar.price}
            onChange={(e)=> setWebinar((prevState) => ({
              ...prevState,
              price: e.target.value,
            }))}
             type="number" id="price" name="price" className="border-b-2 ml-3 h-10 p-2 border-slate-500" placeholder="Entry price of webinar" required/>
            </div>}
          </div>
          <div className="flex items-center justify-center">
            <button type="button" className="w-40 py-4 m-2 rounded-xl bg-orange-500 text-white" onClick={()=> navigate("/webinars")}>Cancel</button>
            <button type="submit" className="border-2 w-40 py-3 m-2 rounded-xl border-orange-500 text-black text-lg">Create</button>
          </div>
        </form>
      </div>
      {
        successModal && <Modal isOpen={successModal} onClose={() => {
        setSuccessModal(false)
        navigate("/webinars")
        }}>
          <div className="flex flex-col items-center justify-center text-lg text-center">
            <h1 className="text-xl">
              Webinar created successfully!
              </h1>
          <div>

          <button className="p-2 border-orange-500 rounded-xl shadow-md border-2 m-3" onClick={() => setSuccessModal(false)}>
            Create Another
          </button>
          <button className="p-2 shadow-md border-2 border-orange-500 bg-orange-500 text-white rounded-xl m-3" onClick={() => navigate("/webinars")}>
            Explore Webinars
          </button>
          </div>
          </div>
        </Modal>
      }
    </div>
  );
}
export default CreateWebinar;
