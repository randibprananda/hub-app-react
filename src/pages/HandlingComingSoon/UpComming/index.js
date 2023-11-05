import React from 'react'
import { BackgroundUpcoming, UpcomingIcon, Logo } from '../../../assets'

import {
    Link,
    Routes,
    Route,
    useNavigate,
} from 'react-router-dom';

const UpComming = () => {
    const navigate = useNavigate();
    return (
        <div className="static w-screen">
            
            <div className='absolute'>
                <img src={BackgroundUpcoming} className="h-screen lg:h-screen w" alt="Flowbite Logo" />
            </div>
            <div className='absolute top-3 right-3 left-3'>
                <button className='flex items-center' onClick={() => navigate(-1)}>
                    <div>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.7065 11.3741C15.097 10.9836 15.097 10.3504 14.7065 9.95989C14.3159 9.56936 13.6828 9.56936 13.2922 9.95989L7.95891 15.2932C7.76365 15.4885 7.66602 15.7444 7.66602 16.0003C7.66602 16.1359 7.693 16.2652 7.74189 16.3831C7.79069 16.5011 7.86303 16.6116 7.95891 16.7074L13.2922 22.0408C13.6828 22.4313 14.3159 22.4313 14.7065 22.0408C15.097 21.6502 15.097 21.0171 14.7065 20.6266L11.0802 17.0003H23.9993C24.5516 17.0003 24.9993 16.5526 24.9993 16.0003C24.9993 15.448 24.5516 15.0003 23.9993 15.0003H11.0802L14.7065 11.3741Z" fill="#2E3A44"/>
                        </svg>

                    </div>
                    <img src={Logo} className="w-[125px] h-[40px]" alt="Flowbite Logo" />
                </button>
            </div>
            <div className='absolute top-10 bottom-10 left-12 right-12 grid justify-items-center'>
                
                <div className='flex lg:flex-row flex-col items-center'>
                    <div className='lg:mb-0 mb-10'>
                        <h1 className='text-[64px] font-semibold font-inter'>Upcoming Features</h1>
                        <p className='text-[24px] font-inter font-normal w-96'>This feature is under construction and will coming soon.</p>
                        <button onClick={() => navigate(-1)} className='bg-cherry hover:bg-indigo-900 font-semibold text-[18px] mt-[24px] text-white rounded-[16px] w-[326px] h-[53px] flex justify-center items-center'>Kembali ke Beranda</button>
                        
                    </div>
                    <img src={UpcomingIcon} className="h-[400px] w-[500px] lg:h-[588px] lg:w-[634px]" alt="Flowbite Logo" />
                    
                </div>
                
            </div>
        </div>
    )
}

export default UpComming