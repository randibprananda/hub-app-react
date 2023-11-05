import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import { BgDashboard } from '../../assets'

const CardVenue = ({image, linkTo, title, date, location, discount, percentage, price}) => {

    return (
        <Link to={linkTo}>
            <div className='w-[280px] h-[380px] rounded-xl bg-white shadow-lg'>
                <img src={image} className='h-[174px] rounded-t-xl object-cover'/>
                <div className='px-[20px] py-[10px]'>
                    <h1 className='text-[#2E3A44] font-[600] text-[20px] line-clamp-1'>{title}</h1>
                    <p className='py-[10px] text-[#737373] text-xs font-[500]'>{date}</p>
                    <p className='text-[#737373] text-xs font-[500] mb-[22.5px]'>{location}</p>
                    <div className='flex items-center gap-[10px] mb-[10px]'>
                        <p className='text-[#A8A8A8] text-xs font-[500] line-through'>Rp. {(parseInt(discount).toLocaleString()).replaceAll(',', ".")}</p>
                        <div className='py-1 px-[6px] bg-[#E2FFFC] rounded-[10px]'>
                            <h1 className='text-[#00CDB4] text-[10px] font-[500]'>{percentage}</h1>
                        </div>
                    </div>
                    <h1 className='text-[#282828] font-bold text-[24px]'>Rp. {(parseInt(price).toLocaleString()).replaceAll(',', ".")}</h1>
                </div>
            </div>
        </Link>
    )
}

export default CardVenue