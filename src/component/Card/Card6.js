import moment from 'moment/moment'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Api from '../../Api'
import { IconBag, Logo, Wedding } from '../../assets'

function Card6({id, image, title, description, price, active, icon, layanan, status}) {

    const [enabled, setEnabled] = useState(active)
    const navigate = useNavigate();

    const onShowDetail = (id) => {
        const params = { id: id };
        if(layanan === 'EO') {
            navigate("/detail-even-organization", {
              state: params,
            });
        } else if (layanan === 'VENUE') {
            navigate("/detail-venue", {
              state: params,
            });
        } else if (layanan === 'TALENT') {
            navigate("/detail-layanan-talent", {
              state: params,
            });
        } else if (layanan === 'PRODUCT') {
            navigate("/detail-layanan-supplier", {
              state: params,
            });
        }
      };


      const onShowEdit = (id) => {
        const params = { id: id };
        if(layanan === 'eo') {
            navigate("/edit-layanan-eo", {
              state: params,
            });
        } else if (layanan === 'venue') {
            navigate("/edit-layanan-venue", {
              state: params,
            });
        } else if (layanan === 'talent') {
            navigate("/edit-layanan-talent", {
              state: params,
            });
        } else if (layanan === 'supplier') {
            navigate("/edit-layanan-supplier", {
              state: params,
            });
        }
      };

    const updateActivated = async () => {
        try {
            if(layanan === 'eo') {
                const resEO = await Api.updateActivatedEOService(id, localStorage.getItem('token-hub'))
            } else if(layanan === 'venue') {
                const resVenue = await Api.updateActivatedVenueService(id, localStorage.getItem('token-hub'))
            } else if(layanan === 'talent') {
                const resTalent = await Api.updateActivatedTalentService(id, localStorage.getItem('token-hub'))
                console.log(resTalent)
            } else if(layanan === 'supplier') {
                const resSuplier = await Api.updateActivatedSupplierService(id, localStorage.getItem('token-hub'))
                console.log(resSuplier)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='bg-white shadow-sm border rounded-lg md:h-[330px] md:w-[293px] w-[1px] h-[267px]'>
            {/* <img  src={!image ? Logo : image} className="w-full h-[161px] rounded-t-lg object-cover"/> */}
            <div className='relative'>
                <div className='absolute top-3 right-3 left-3'>
                    <img src={icon}/>
                </div>
                <img  src={image} className="w-full md:h-[161px] h-[131px] rounded-t-lg object-cover" alt=''/>
            </div>
            <div className='p-4'>
                <h1 className='md:mb-[19px] mb-1 line-clamp-1 text-neutural md:text-lg text-xs'>{title}</h1>
                <h1 className='md:text-xl text-xs font-semibold text-title-active mb-[19px]'>Rp. {price}</h1>
                <button className='mb-[8px] w-full bg-cherry shadow-sm text-white py-2 text-xs md:text-sm rounded-[8px]' onClick={() => onShowDetail(id)} >Lihat Layanan</button>
            </div>
        </div>
        
        // <div className='w-[292px] min-h-[400px] border rounded-[8px] shadow-md py-[17px] px-[16px] space-y-[20px]'>
        //     <div className='h-[144px] border w-full rounded-[4px] bg-cover p-[8px]' style={{ backgroundImage: `url(${image})` }}>
        //         <img alt='icon' src={icon}/>
        //     </div>
        //     <div className={`py-[6px] px-[10px] w-fit rounded-[8px] border ${status === 'COMPLETE' ? 'border-[#00AF99] bg-[#E7F7F3]' : status === 'UNPAID' ? 'border-[#F2AA67] bg-[#FFF8ED]' : status === 'PAID' ? 'border-[#54A5F0] bg-[#ECF8FF]' : status === 'FAILED' ? 'border-[#F05454] bg-[#FFEDED]' : null}`}>
        //         <p className={`text-sm capitalize ${status === 'COMPLETE' ? 'text-[#00AF99]' : status === 'UNPAID' ? 'text-[#F2AA67]' : status === 'PAID' ? 'text-[#54A5F0]' : status === 'FAILED' ? 'text-[#F05454]' : null}`}>
        //             {status === 'COMPLETE' ? 'Complete' : status === 'UNPAID' ? 'Belum Bayar' : status === 'PAID' ? 'Sudah Bayar' : status === 'FAILED' ? 'Batal' : null}
        //         </p>
        //     </div>
        //     <div className='space-y-[4px] '>
        //         <h1 className='text-[#475569] text-[18px] line-clamp-1'>{title}</h1>
        //         <h1 className='text-[#C0C6D4] font-semibold text-[18px] line-clamp-1'>{description}</h1>
        //     </div>
        //     <h1 className='text-[#1A1A1A] text-[20px] font-semibold'>Rp. {price}</h1>
        //     <button className='mb-[8px] w-full bg-cherry shadow-sm text-white py-2 text-xs md:text-sm rounded-[8px]' onClick={() => onShowDetail(id)} >Detail</button>
        // </div>
    )
}

export default Card6
