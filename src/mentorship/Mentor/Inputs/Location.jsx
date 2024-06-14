import React from 'react'

function Location({next, back, handleLocationChange}) {
  const allLocations = ["Online","At Home"];
  const [selectedLocations, setSelectedLocations] = React.useState([]);

  const handleChecked = (e) => {
    if (e.target.checked) {
      setSelectedLocations([...selectedLocations, e.target.value]);
    } else {
      setSelectedLocations(selectedLocations.filter((location) => location !== e.target.value));
    }
  }
  const handleNotChecked = (e) => {
    e.preventDefault()
    alert("Please select at least 1 Location")
  }

  return (
    <form onSubmit={selectedLocations.length>0 ? next : handleNotChecked} className="flex flex-col justify-center">
      <label className="text-2xl">
        Choose Your Preferred Location 
        </label>
        <br />
        {
          allLocations.map((loc) => {
            return (
              <div key={loc} className="flex ">
                <input
                  type="checkbox"
                  id={loc}
                  name={loc}
                  value={loc}
                  onChange={handleChecked}
                  className="mx-3"
                />
                <label className="cursor-pointer" htmlFor={loc}>{loc}</label>
              </div>
            );
          })
        }
      <br />
      <div className="flex">
      <button className="border-2 mx-4 p-3 rounded-md px-6 border-orange-500" type="button" onClick={back}>Back</button>
      <button className="border-2 border-orange-500 mx-4 p-3 rounded-md px-7 bg-orange-500 text-white" type="submit" onClick= {()=> handleLocationChange(selectedLocations)}>Next</button>
      </div>
    </form>
  )
}

export default Location