import React from 'react'
import Background from '../../../assets/images/500Background.png'

const InternetServerError = () => {
    return (
        <div className="static w-screen">
            <div className='absolute left-0 bottom-0 right-0'>
                <img src={Background} className="h-[150px] w-screen lg:h-[450px] md:h-[200px]" alt="Flowbite Logo" />
            </div>
            <div className='absolute left-0 top-0 right-0 grid justify-items-center md:pb-[98px] pb-[98px]'>
                <img src={require("../../../assets/images/500.png")} className="h-[152px] w-[255px] md:h-[600px] md:w-[500px]" alt="Flowbite Logo" />
            </div>
        </div>
    )
}

export default InternetServerError