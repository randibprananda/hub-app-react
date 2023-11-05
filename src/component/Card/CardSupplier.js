import { Star } from '@mui/icons-material'
import moment from 'moment/moment'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function CardSupplier({ title, subTitle, desc, price, disc, priceDisc, image, minOrder, pack, last }) {
    return (
        <Link to={""} className="relative">
            {last ?
                <div className="absolute top-[180px] left-[55px] z-10">
                    <p className="text-white text-4xl">See All</p>
                </div>
                : null}
            <div className={last ? "brightness-[0.35] transition-all duration-500 ease-in-out hover:brightness-[0.25] bg-white w-[223px] m-2 rounded-lg shadow-lg" : "car1d bg-white w-[223px] m-2 rounded-lg shadow-lg"}>
                <div className="top">
                    <img
                        className="w-[223px] h-[171px] object-cover rounded-t-lg"
                        src={image}
                        alt="img"
                    />
                </div>
                <div className="bottom flex flex-col justify-center items-start p-3 space-y-7">
                    <div className="space-y-2.5">
                        <div className="text-xl font-semibold text-black-k">
                            {title}
                        </div>
                        <p className='text-xs text-dark-5'>{subTitle}</p>
                        <p className='text-xs text-dark-5'>{desc}</p>
                    </div>
                    <div className="space-y-1.5 pb-5">
                        <div className="flex items-center gap-3">
                            {priceDisc ? <p className="line-through text-[#64748B] text-[10px]">Rp. {(parseInt(priceDisc).toLocaleString()).replaceAll(',', ".")}</p> : null}
                            {disc ? <p className="bg-[#E2FFFC] p-1 text-[10px] text-primary rounded-md">{disc} %</p> : null}
                        </div>
                        <div className="flex items-center">
                            <p className="font-semibold text-xl">Rp {price ? (parseInt(price).toLocaleString()).replaceAll(',', ".") : null}</p>
                            {pack ? <p className="text-dark-6 text-xs">/{pack}</p> : null}
                        </div>
                        {minOrder ? <p className="text-[#888888] text-xs">Min. Order {minOrder} pax</p> : null}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CardSupplier