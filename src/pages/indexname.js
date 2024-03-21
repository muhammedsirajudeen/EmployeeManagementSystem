import Image from 'next/image'
import { Inter } from 'next/font/google'

import Navbar from '@/components/navbar'
import { useEffect } from 'react'
import axios from 'axios'
export default function Home() {
  useEffect(()=>{
    async function coldstartRemedy(){
      let response=await axios.get("/api/hello")
    }
    coldstartRemedy()
  })
  return (
      <div className=' w-screen h-screen flex flex-col items-center justify-start bg-gray-500 text-white overflow-x-hidden'>
        <Navbar/>

        <div className='flex flex-col items-center justify-evenly  h-screen'>
            <img className='w-full h-96'  src='/corporate1.jpg'></img>
            {/* <Image src="/corporate1.jpg" alt='imaeg' height={100} width={500} ></Image> */}
            <div className='font-bold text-2xl '>OUR <span className='text-cyan-500'>FEATURES</span></div>
            <div className='flex flex-wrap items-center justify-evenly w-screen'>

              <div className='flex items-center mt-10 justify-center flex-col font-bold  bg-boxcolor rounded-2xl w-60 h-60'>
                <h1>MANAGE EMPLOYEE</h1>
                <p className='font-light text-center m-3' >Lorem ipsum dolor sit amet consectetur. Consectetur habitant vitae cras congue egestas ridiculus.</p>
                <button className='bg-cyan-500 p-1 rounded-lg' >Read More.</button>
              </div>
              <div className='flex  items-center mt-10 justify-center flex-col font-bold  bg-boxcolor rounded-2xl w-60 h-60'>
                <h1>MANAGE Department</h1>
                <p className='font-light text-center m-3' >Lorem ipsum dolor sit amet consectetur. Consectetur habitant vitae cras congue egestas ridiculus.</p>
                <button className='bg-cyan-500 p-1 rounded-lg' >Read More.</button>
              </div>
              <div className='flex  items-center mt-10 justify-center flex-col font-bold  bg-boxcolor rounded-2xl w-60 h-60'>
                <h1>Handle Promotions</h1>
                <p className='font-light text-center m-3' >Lorem ipsum dolor sit amet consectetur. Consectetur habitant vitae cras congue egestas ridiculus.</p>
                <button className='bg-cyan-500 p-1 rounded-lg' >Read More.</button>
              </div>

              <div className='flex  items-center mt-10  justify-center flex-col font-bold  bg-boxcolor rounded-2xl w-60 h-60'>
                <h1>Assign Employee</h1>
                <p className='font-light text-center m-3' >Lorem ipsum dolor sit amet consectetur. Consectetur habitant vitae cras congue egestas ridiculus.</p>
                <button className='bg-cyan-500 p-1 rounded-lg' >Read More.</button>
              </div>


            </div>
        </div>
      </div>
  )
}
