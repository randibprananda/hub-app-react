import React from 'react'
import Background from '../../../assets/images/419Background.png'

const PageExpired = () => {
    return (
        <div className="static w-screen">
            <div className='absolute'>
                <img src={Background} className="h-[150px] w-screen lg:h-[600px] md:h-[200px]" alt="Flowbite Logo" />
            </div>
            <div className='absolute left-0 top-0 right-0 md:py-[75px] py-[50px] grid justify-items-center'>
                <img src={require("../../../assets/images/419.png")} className="h-[152px] w-[255px] md:h-[300px] md:w-[500px]" alt="Flowbite Logo" />
                <div className='pt-[40px] text-center'>
                    <label className='font-semibold font-inter md:text-[60px] text-[30px] text-[#000000]'>419 Page Expired</label>
                </div>
                <div className='pt-[26px] text-center'>
                    <p className='font-normal font-inter md:text-[28px] text-[14px] text-[#2E3A44]'>Sorry, your session has expired.</p>
                    <p className='font-normal font-inter md:text-[28px] text-[14px] text-[#2E3A44]'>Please refresh and try again</p>
                </div>
            </div>
        </div>
    )
}

export default PageExpired