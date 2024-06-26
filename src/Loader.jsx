import "./Loader.css"

function Loader() {
  return (
    <div className={`rounded-xl border-2 border-slate-300  bg-gray-200 text-gray-200 w-full mt-5 mx-auto p-5 border-${"#4D4C5C"} cursor-pointer relative overflow-hidden`}
    style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
      <div>
        <div className="flex items-center mb-4">
          <img
            src={
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            className="w-10 h-10 rounded-full md:mr-2 mb-2 md:mb-0"
            alt=""
          />
          <div className="ml-2 shine-animation  text-lg shine-animation">
          </div>
        </div>
        <div className="text-3xl font-semibold bg-gray-300 text-gray-300">"Backend dev"</div>
        <div className="mt-3 bg-gray-300 text-gray-300">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel dignissimos harum alias aperiam voluptate ad 
        </div>
      </div>
      <div className="flex mt-4 space-x-3 md:space-x-8 w-56 rounded-lg h-14 bg-gray-300 text-gray-300">
        
      </div>
    </div>
  );
}

export default Loader;
