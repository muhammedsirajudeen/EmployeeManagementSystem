import Image from 'next/image'
import { Inter } from 'next/font/google'

import Navbar from '@/components/navbar'
export default function Home() {
  return (
      <div className=' w-screen h-screen flex flex-col items-center justify-start'>
        <Navbar/>

        <div className='flex flex-col items-center justify-evenly  h-screen'>
            <div className=' font-bold text-3xl '>We at EMS provide the best Employee Management Service available.</div>
            <div className='font-bold text-2xl '>OUR SERVICES</div>
            <div className='flex items-center justify-evenly w-screen'>

              <div className='flex items-center justify-center flex-col font-bold border border-white w-40 h-40'>
                MANAGE EMPLOYEE
              </div>
              <div className='flex items-center justify-center flex-col font-bold border border-white w-40 h-40'>
                MANAGE DEPARTMENT
              </div>
              <div className='flex items-center justify-center flex-col border font-bold border-white w-40 h-40'>
                HANDLE PROMOTIONS
              </div>
              <div className='flex flex-col items-center justify-center border font-bold border-white w-40 h-40'>
                ASSIGN EMPLOYEE
              </div>

            </div>
        </div>
      </div>
  )
}
