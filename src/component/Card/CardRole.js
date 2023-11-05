import React from 'react'
import { EventHunterVector, PartnerVector, StakeHolderVector } from '../../assets'

const CardRole = ({title, buttonText, onClickButton, role, desc}) => {
    return (
        <div className='lg:w-[393px] w-full lg:h-[249px] bg-[#EBEBEB] rounded-[10px] lg:p-0 p-2.5 lg:py-[45px] lg:px-[32px]'>
            <div className='flex items-center mb-6 lg:mb-9 gap-5'>
                <img src={`${role === 'Event Hunter' ? EventHunterVector : role === 'Stakeholder' ? StakeHolderVector : PartnerVector}`} alt='ilustrasi role'/>
                <div>
                    <h1 className='font-semibold text-[#393939] text-base lg:text-[24px]'>{title}</h1>
                    <h1 className='text-[#A8A8A8] lg:text-base text-xs'>
                        {
                            role === 'Event Hunter' ? 'Sedang mencari event atau kebutuhan event?' 
                            :
                            role === 'Stakeholder' ? 'Menyediakan penawaran seputar event?'
                            :
                            'Menyediakan jasa dan layanan seputar event?'
                        }
                    </h1>
                </div>
            </div>
            <button className={`${role === 'Event Hunter' ? 'bg-primary' : role === 'Partner' ? 'bg-kuning' : 'bg-cherry'} rounded-lg text-white font-semibold py-3 lg:px-8 px-6 w-full lg:mb-4 mb-[14px] lg:text-lg text-xs capitalize`} onClick={onClickButton}>{buttonText}</button>
        </div>
    )
}

export default CardRole