import moment from 'moment/moment'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Api from '../../Api'

import { BgDashboard, IconBagCherry, IconBagPrimary, IconBagPurple, IconBagYellow, IconNext, IconNexts, IconPrev, IconPrevs, IconServiceVenueWhite, IconVanue, Logo, LogoDefault, VenueEmptyVector, BackgroundAuth, IconLocation, IconBag, IconBagLight, IconDollar, IconBagTwo, IconMoney, IconCheckGreen, IconSucces, IconCancel, IconCheck, IconCheckDark, IconCheckPrimary } from '../../assets'

function CardOpenTender({image, Title, location, date, badanusaha, layanan, nominal, handleOpen, handleOpenPartner, handleOpenPilih, partnerCount}) {

    
    return (
        <div className='w-full bg-white h-full rounded-[12px] p-[24px]'> 
            <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-[14px]'>
                    <img className='w-[46px] h-[46px] rounded-[16px]' src={image} />
                    <div className='flex flex-col'>
                        <h1 className='font-semibold text-[18px] text-cherry'>{Title}</h1>
                        <div className='flex items-center gap-2'>
                            <img src={IconLocation} className="w-[16px] h-[16px]"/>
                            <h2 className='font-normal text-[12px] text-[#64748B]'>{location} </h2>
                        </div>
                            
                    </div>

                </div>
                <h1 className='font-medium text-[14px] text-[#64748B]'>{date}</h1>
            </div>
            {/* Detail Layanan */}
            <div className='flex pt-[15px] justify-between'>
                <div className='flex lg:flex-row flex-col lg:space-x-24 lg:space-y-0 space-y-5'>
                    <div className='flex items-center gap-2'>
                        <img src={IconBagTwo} className="w-[16px] h-[16px]"/>
                        <div>
                            <h1 className='font-normal text-[12px]'>Badan Usaha</h1>
                            <h2 className='font-medium text-[14px]'>{badanusaha}</h2>

                        </div>

                    </div>
                    <div className='flex items-center gap-2'>
                        <img src={IconBagLight} className="w-[16px] h-[16px]"/>
                        <div>
                            <h1 className='font-normal text-[12px]'>Layanan</h1>
                            <h2 className='font-medium text-[14px]'>{layanan}</h2>

                        </div>

                    </div>
                    <div className='flex items-center gap-2'>
                        <img src={IconMoney} className="w-[16px] h-[16px]"/>
                        <div>
                            <h1 className='font-normal text-[12px]'>Nominal Bidding</h1>
                            <h2 className='font-bold text-[14px]'>{nominal}</h2>

                        </div>

                    </div>

                </div>
                {/* <div className='flex items-center'>
                    <button onClick={handleOpenPartner} className='text-white px-5 w-[128px] py-2.5 rounded-lg border-2 border-cherry bg-cherry hover:bg-violet-900 lg:text-[16px] text-sm font-semibold'
                        type="button"      
                    >
                    Pilih Partner
                    </button>

                </div> */}
                {/* <div className='flex items-center space-y-2'>
                    <div className='flex flex-col items-start'>
                        <div className='flex gap-2'>
                            <img src={IconCheckGreen}/>
                            <h1 className='font-semibold text-[14px]'>Partner Terpilih</h1>

                        </div>
                        <button onClick={handleOpenPilih} className='text-white px-5 py-2.5 w-[128px] rounded-lg border-2 bg-primary hover:bg-teal-300 lg:text-[16px] text-sm font-semibold'
                            type="button"      
                        >
                        Batalkan
                        </button>

                    </div>

                </div> */}
                {partnerCount === 0 && (
                <div className='flex items-center'>
                        <button
                            onClick={handleOpenPartner}
                            className='text-white px-5 w-[128px] py-2.5 rounded-lg border-2 border-cherry bg-cherry hover:bg-violet-900 lg:text-[16px] text-sm font-semibold'
                            type="button"
                        >
                            Pilih Partner
                        </button>
                </div>
                )}
                {partnerCount === 1 && (
                <div className='flex items-center space-y-2'>
                        <div className='flex flex-col items-start'>
                            <div className='flex gap-2'>
                                <img src={IconCheckGreen}/>
                                <h1 className='font-semibold text-[14px]'>Partner Terpilih</h1>
                            </div>
                            <button
                                onClick={handleOpenPilih}
                                className='text-white px-5 py-2.5 w-[128px] rounded-lg border-2 bg-primary hover:bg-teal-300 lg:text-[16px] text-sm font-semibold'
                                type="button"      
                            >
                                Batalkan
                            </button>
                        </div>
                </div>
                )}


            </div>
            {/* Detail Layanan */}
            <div className='pt-[15px]'>
                <button onClick={handleOpen} className='text-primary hover:text-teal-300 text-[14px] font-medium border-b-2 border-b-primary'>Lihat Detail Partner</button>
            </div>


          
            

        </div>
    )
}

export default CardOpenTender
