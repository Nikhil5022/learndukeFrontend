import React, { useState } from 'react'

function ProfilePhoto({back, handleProfilePhotoChange}) {
  const [avatar, setAvatar] = useState({});

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar({
            url: e.target.result,
          })
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <form className="flex flex-col items-center justify-center">
        <label htmlFor='photo' className='text-2xl'>Profile Photo</label>
        <input accept="image/*" id="photo" type="file" className="text-lg border-2 border-slate-900  p-2 h-full w-3/4 my-4" onChange={handleImageUpload} required/>
        { avatar && <div>
          <img className='w-40 h-40 rounded-full border-2 border-slate-700 drop-shadow-xl mb-5' src={avatar.url}/>
        </div>
        }
      <div className="flex">
          <button className="border-2 mx-4 p-3 rounded-md px-6 border-orange-500" type="button" onClick={back}>
            Back
          </button>
          <button className="border-2 border-orange-500 mx-4 p-3 rounded-md px-7 bg-orange-500 text-white" type="submit" onClick={(e) =>{
            e.preventDefault()
            handleProfilePhotoChange(avatar)
          } 
          }>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProfilePhoto