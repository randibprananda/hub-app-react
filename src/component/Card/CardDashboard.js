import moment from 'moment/moment'
import React from 'react'
import { Link } from 'react-router-dom'
// import { IconBag } from '../../assets'

function CardDashboard({image, value, label}) {
    return (
        <>
            <div className='lg:col-span-3 col-span-6'>
                <div className='bg-white w-full h-24 rounded-xl shadow-sm p-7 flex items-center space-x-6'>
                    <img src={image}/>
                    <h1 className='text-black text-3xl font-bold'>{value}</h1>
                    <h1 className='text-gray-400 text-xl'>{label}</h1>
                </div>
            </div>
        </>
    )
}

export default CardDashboard
