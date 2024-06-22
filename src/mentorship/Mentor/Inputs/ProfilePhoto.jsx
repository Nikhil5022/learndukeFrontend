import React, { useEffect, useState } from 'react'
import sampleUser from "../../../assets/user.png"
import Modal from '../../../Modal'

function ProfilePhoto({back, handleProfilePhotoChange,mentorData}) {
  const [avatar, setAvatar] = useState("");
  const [change, setChange] = useState(false)
  useEffect(() => {
    if( mentorData.profilePhoto!=="" && mentorData.profilePhoto.url  ){
      setAvatar(mentorData.profilePhoto.url)
    }
    else{
      setAvatar('')
    }
  }
  , [])

  const [showModal, setShowModal] = useState(false);

  const handleImageUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result)
        setChange(true)
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <form className="flex flex-col items-center justify-center">
        <label htmlFor='photo' className='text-2xl'>Profile Photo</label>
        <input id="photo" type="file" className="text-lg border-2 border-slate-900  p-2 h-full w-3/4 my-4" onChange={handleImageUpload} required/>
         <div className='border-2 border-slate-700 flex items-center justify-center drop-shadow-xl rounded-full w-40 h-40 mb-5 overflow-hidden'>
          <img className='w-full h-full mt-0 rounded-full ' src={avatar.length >0 ? avatar : sampleUser }/>
        </div>
        
      <div className="flex">
          <button className="border-2 mx-4 p-3 rounded-md px-6 border-orange-500" type="button" onClick={back}>
            Back
          </button>
          <button className="border-2 border-orange-500 mx-4 p-3 rounded-md px-7 bg-orange-500 text-white" type="submit" 
          onClick={(e) =>{
            e.preventDefault()
            avatar ?  handleProfilePhotoChange({avatar,change}) : setShowModal(true)
          } }
          >
            Submit
          </button>
        </div>
        {
        showModal && (
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}> 
          <div className="text-xl flex items-center justify-center">
            Please upload a photo
          </div>
          </Modal>
        )
        }
      </form>
    </div>
  )
}
export default ProfilePhoto;