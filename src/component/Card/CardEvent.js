import React from 'react'
import { Link } from 'react-router-dom'

const CardEvent = ({ background, title, company, link }) => {
    return (
        <div className='lg:h-[410px] w-[316px] h-[183px] lg:w-[590px] rounded-xl flex items-end' style={{ backgroundImage: `url(${background})` }}>
            <div className='bg-black/70 md:py-7 p-2 rounded-b-xl flex justify-between md:px-[34px] w-full'>
                <div>
                    <h1 className='text-white font-semibold text-sm lg:text-2xl'>{title}</h1>
                    <h1 className='text-white text-xs mt-2'>by {company}</h1>
                </div>
                <Link to={link} className="text-white px-[14px] py-[5px] rounded bg-primary text-[8px] h-max">Hubungi partner</Link>
            </div>
        </div>
    )
}
export default CardEvent