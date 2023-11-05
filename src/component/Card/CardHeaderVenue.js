import React from 'react'

const CardVanue = ({image, value, title}) => {
    return (
        <div className='bg-white w-full md:w-[300px] rounded-xl flex items-center gap-5 px-[26px] py-5'>
            <img src={image}/>
            <h1 className='text-[#454545] font-[700] text-[32px]'>{value}</h1>
            <h1 className='text-[#A8A8A8] font-[500]'>{title}</h1>
        </div>
    )
}

export default CardVanue