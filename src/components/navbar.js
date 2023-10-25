export default function Navbar(){
    return(
        <div className='flex items-center justify-evenly w-screen'>
        <div className='font-bold text-3xl'>
          EMS
        </div>

        <a href='/employee'>Employee</a>
        <a href='/department'>Department</a>
        <a href='/promotions'>Promotions</a>
        <a href='/assignstaff'>Assign</a>

      </div>
    )
}