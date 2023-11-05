import React from 'react'
import { BackgorundComing, BackgroundUpcoming, ComingSoonIcon, UpcomingIcon } from '../../../assets'

const ComingSoon = () => {
    return (
        <div className="static w-screen">
            <div className='absolute'>
                <img src={BackgorundComing} className="h-screen lg:h-screen w-screen " alt="Flowbite Logo" />
            </div>
            <div className='absolute top-10 right-12 grid justify-items-center'>
                <div className='flex lg:flex-row flex-col items-center lg:gap-[24px] gap-0'>
                    <div className='lg:mb-0 mb-10 flex flex-col'>
                        <div className='mb-[65px]'>
                            <h1 className='text-[64px] font-semibold font-inter'>Coming Soon</h1>
                            <p className='text-[34px] font-inter font-semibold'>Get notified when we launch.</p>

                        </div>
                        <p className='text-[24px] font-inter lg:text-end'> We will prepare the best</p>
                       
                    </div>
                    <img src={ComingSoonIcon} className="h-[300px] w-[600px] lg:h-[524px] lg:w-[726px]" alt="Flowbite Logo" />
                    
                </div>
                
            </div>
        </div>
    )
}

export default ComingSoon