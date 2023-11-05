import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BackgroundAuth, SuccessRegisterVector } from '../../../assets'
import { NavbarAuth } from '../../../component'

const RegisterSuccess = () => {

    const navigate = useNavigate()

    useEffect(() => {
        if(localStorage.getItem('token-hub')) {
            navigate('/')
        }
    }, [])

    return (
        <div style={{ backgroundImage: `url(${BackgroundAuth})` }} className='min-h-screen bg-repeat-y bg-cover'>
            <NavbarAuth/>
            <div className='flex flex-col justify-center items-center mt-14'>
                <img src={SuccessRegisterVector}/>
                <h1 className='text-[16px] font-[500] text-[#C0C6D4] text-center mt-14'>Akun partner anda berhasil dibuat. Terima kasih telah mempercayakan kami untuk membantu memenuhi kebutuhan bisnis Anda.</h1>
                <div className='mb-7'>
                    <button className='bg-[#00CDB4] text-white font-bold h-[52px] w-[300px] lg:w-[519px] text-center rounded-xl mt-10' onClick={ () => navigate('/login')}>Masuk</button>
                </div>
            </div>
        </div>
    )
}

export default RegisterSuccess