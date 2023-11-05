import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Card8({ id, image, title, price, active, icon, bintang, rating, jml_comment }) {

    const [enabled, setEnabled] = useState(active)
    const navigate = useNavigate();

    return (
        <div className='bg-white shadow-sm border rounded-lg h-[325px] w-[293px]'>
            {/* <img  src={!image ? Logo : image} className="w-full h-[161px] rounded-t-lg object-cover"/> */}
            <div className='relative'>
                <div className='absolute top-3 right-3 left-3'>
                    <img src={icon} />
                </div>
                <img src={image} className="w-full h-[161px] rounded-t-lg object-cover" />
            </div>
            <div className='p-4'>
                <h1 className='mb-[19px] line-clamp-1 text-[#475569] text-[18px] text-start'>{title}</h1>
                <h1 className='text-[20px] font-semibold text-[#1A1A1A] mb-[19px] text-start'>Rp. {price}</h1>
                <div className="flex space-x-3">
                    <img src={bintang} />
                    <h1 className="text-base font-inter font-medium text-[#FDBE0F]">{rating} </h1>
                    <h1 className="text-base font-inter font-normal text-gray-800">({jml_comment})</h1>

                </div>
            </div>
        </div>
    )
}

export default Card8
