import React from 'react'
import Logo from "../../assets/Logo2.png"
const AboutUs = () => {
  return (
    <div className="about bg-gray-50 py-16">
        <div className=" mt-3 text-center py-8" id="aboutus">
          <div>
            <h2 className="text-[#ebeced] text-[100px] text-center font-extrabold tracking-[-3px] capitalize">About Us</h2>
            <p className="mt-[-40px] text-[20px] text-center text-[#797979]">Less is more work</p>
          </div>
          <div className='flex flex-col md:flex-row mt-40 justify-evenly items-center'>
            <div>
              <img src={Logo} alt="Logo" className='w-full' />
            </div>
            <div className='md:basis-custom mx-2 leading-loose relative before:content-[""] before:absolute before:-top-[100%] before:-left-12 before:w-1 md:before:h-[400px] before:bg-main before:h-[0]'>
              <p >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus minus aperiam expedita pariatur doloremque rerum? Explicabo, veritatis dolorum. Quo recusandae error excepturi cupiditate ullam consectetur ex omnis ea, ut aliquam!</p>

            </div>
          </div>
        </div>
    </div>
  )
}

export default AboutUs