export default function Navbar(){
    return(
      <div className=" flex items-center justify-evenly  bg-navbarcolor w-full  h-16" >
      <h3 className="text-white text-xl font-bold">EMS</h3>
      <input type="text"  placeholder="Search..." className="bg-greycolor rounded-lg text-white "></input>
      <a className="text-white font-bold" href="/employee">Employee</a>

      <a className="text-white font-bold" href="/department">Department</a>
      <a className="text-white font-bold" href="/promotions">Promotions</a>
      <a className="text-white font-bold" href="/assignstaff">Assign</a>
      <a className="text-white font-bold" href="/chatbot">Chatbot</a>

  </div>
    )
}