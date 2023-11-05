import React from 'react'

function CardAbout({ img, title, desc }) {
    return (
        <div className="w-screen md:px-[140px] px-[75px] ">
            <div className='grid md:grid-cols-2 grid-cols-1 justify-center items-center lg:gap-14 md:gap-5 gap-3'>
                <div className='flex justify-center'>
                    <img src={img} className='bg-gray-200 lg:h-[310px] md:h-[250]-px h-[150px] w-auto rounded-md' />
                </div>
                <div className='space-y-3'>
                    <h3 className='font-semibold lg:text-2xl md:text-xl text-base md:text-start text-center'>{title}</h3>
                    <p className='lg:text-base md:text-sm text-xs text-dark-6 md:text-start text-center'>{desc}</p>
                </div>
            </div>
        </div>
    )
}

export default CardAbout