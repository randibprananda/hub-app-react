import { Star } from '@mui/icons-material'
import moment from 'moment/moment'
import React from 'react'
import { Link } from 'react-router-dom'
import LazyLoad from 'react-lazy-load';

function Card3({ rating, link, imgProfile, author, img1, img2, img3, place }) {
    return (
        <div className='bg-white w-fit rounded-lg p-4 flex flex-col gap-4'>
            <div className='flex justify-between items-start'>
                <div className='flex gap-2 items-center'>
                    <div className="relative w-[55px] h-[55px] overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <LazyLoad offset={400}>
                            <img src={imgProfile} className="absolute w-[55px] h-[55px] object-cover" alt="Konnect Logo" />
                        </LazyLoad>
                    </div>
                    <div>
                        <p className='text-xs font-bold text-black'>{author}</p>
                        <p className='text-xs text-[#646464]'>{place}</p>
                        <div className="flex items-center gap-1 text-sm text-[#FDBE0F]">
                            <Star sx={{ fontSize: 15 }} /><span>{rating}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <Link to={link} className={`self-end justify-self-end bg-white me-auto px-2.5 py-1.5 font-semibold text-[10px] text-[#2D014B] rounded-[4px] w-fit border`}>
                        Lihat Partner
                    </Link>
                </div>
            </div>
            <div className='flex gap-2.5'>
                <div className='space-y-1.5 w-[108px]'>
                    <div className="relative w-[108px] h-[93px] overflow-hidden bg-gray-100 rounded dark:bg-gray-600">
                        <LazyLoad offset={400}>
                            <img src={img1} className="absolute object-cover w-[108px] h-[93px]" alt="Konnect Logo" />
                        </LazyLoad>
                    </div>
                    <p className='text-[9px]'>Kolibree Enterprise- Event Organizer by Najla</p>
                </div>
                <div className='space-y-1.5 w-[108px]'>
                    <div className="relative w-[108px] h-[93px] overflow-hidden bg-gray-100 rounded dark:bg-gray-600">
                        <LazyLoad offset={400}>
                            <img src={img2} className="absolute object-cover w-[108px] h-[93px]" alt="Konnect Logo" />
                        </LazyLoad>
                    </div>
                    <p className='text-[9px]'>Kolibree Enterprise- Event Organizer by Najla</p>
                </div>
                <div className='space-y-1.5 w-[108px]'>
                    <div className="relative w-[108px] h-[93px] overflow-hidden bg-gray-100 rounded dark:bg-gray-600">
                        <LazyLoad offset={400}>
                            <img src={img3} className="absolute object-cover w-[108px] h-[93px]" alt="Konnect Logo" />
                        </LazyLoad>
                    </div>
                    <p className='text-[9px]'>Kolibree Enterprise- Event Organizer by Najla</p>
                </div>
            </div>
        </div>
    )
}

export default Card3
