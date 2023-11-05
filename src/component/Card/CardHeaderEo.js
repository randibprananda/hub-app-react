import moment from 'moment/moment'
import React from 'react'
import { Link } from 'react-router-dom'
import { IconBag } from '../../assets'

function CardHeaderEo({value, label}) {
    return (
        <div className='lg:col-span-3 col-span-6'>
            <div className='bg-white w-full md:w-[300px] rounded-xl flex items-center gap-5 px-[26px] py-5'>
                <img src={IconBag}/>
                <h1 className='text-[#454545] font-[700] text-[32px]'>{value}</h1>
                <h1 className='text-[#A8A8A8] font-[500]'>{label}</h1>
            </div>
        </div>
    )
}

export default CardHeaderEo