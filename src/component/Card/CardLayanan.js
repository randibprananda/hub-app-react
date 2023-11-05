import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Api from '../../Api'

function CardLayanan({id, image, title, price, active, icon, layanan}) {

    const [enabled, setEnabled] = useState(active)
    const navigate = useNavigate();

    const onShowDetail = (id) => {
        const params = { id: id };
        if(layanan === 'eo') {
            navigate("/detail-even-organization", {
              state: params,
            });
        } else if (layanan === 'venue') {
            navigate("/detail-venue", {
              state: params,
            });
        } else if (layanan === 'talent') {
            navigate("/detail-layanan-talent", {
              state: params,
            });
        } else if (layanan === 'supplier') {
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
        <div className='bg-white shadow-sm border rounded-lg md:h-[400px] md:w-[280px] w-[177px]'>
            {/* <img  src={!image ? Logo : image} className="w-full h-[161px] rounded-t-lg object-cover"/> */}
            <div className='relative'>
                <div className='absolute top-3 right-3 left-3'>
                    <img src={icon} alt=''/>
                </div>
                <img  src={image} className="w-full md:h-[161px] h-[133px] rounded-t-lg object-cover" alt=''/>
            </div>
            <div className='p-3 md:p-4'>
                <h1 className='mb-1 md:mb-[19px] line-clamp-1 text-neutural text-xs md:text-[18px]'>{title}</h1>
                <h1 className='text-xs md:text-[20px] font-semibold text-[#1A1A1A] mb-[19px]'>Rp. {price}</h1>
                <button className='mb-[8px] w-full bg-cherry shadow-sm text-white h-[30px] text-xs md:text-sm rounded-[8px]' onClick={() => onShowDetail(id)} >Lihat Layanan</button>
                <button className='md:mb-[20px] mb-2 w-full bg-white border shadow-sm  text-cherry h-[30px] text-xs md:text-sm rounded-[8px]' onClick={() => onShowEdit(id)} >Edit Layanan</button>
                <div className='flex items-center justify-end space-x-2'>
                    <h1 className='text-neutural text-xs md:text-sm'>Tampilkan Layanan</h1>
                    <div className="flex">
                        <label className="inline-flex relative items-center md:mr-5 cursor-pointer">
                            <input type="checkbox" className="sr-only peer"  checked={enabled} readOnly />
                            <div onClick={() => { updateActivated(id); setEnabled(!enabled);   }} className="md:w-11 md:h-6 w-[29px] h-[17px] bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-[14px] after:h-[14px] md:after:h-5 md:after:w-5 after:transition-all peer-checked:bg-cherry"></div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardLayanan
