import React from 'react'

function Education({next, back, handleEducationChange}) {
  return (
    <div className='flex flex-col items-center justify-center'>
      <form onSubmit={next} className="flex flex-col items-center justify-center">
        <label htmlFor='education' className='text-2xl'>Education</label>
        <input id="education" type="text" className="text-lg border-2 border-slate-900 rounded-lg p-2 w-4/4 my-4" onChange={handleEducationChange} required placeholder='Add your education details'/>
      <div className="flex">
          <button className="border-2 mx-4 p-3 rounded-md px-6 border-orange-500" type="button" onClick={back}>
            Back
          </button>
          <button className="border-2 border-orange-500 mx-4 p-3 rounded-md px-7 bg-orange-500 text-white" type="submit">
            Next
          </button>
        </div>
      </form>
    </div>
  )
}

export default Education