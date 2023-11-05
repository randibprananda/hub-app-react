import moment from 'moment/moment'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Api from '../../Api'
import { IconBag, Logo, Wedding } from '../../assets'

function CardEo({id, image, title, price, active}) {

    const [enabled, setEnabled] = useState(active)
    const navigate = useNavigate();

    const onShowDetail = (id) => {
        const params = { id: id };
        navigate("/detail-even-organization", {
          state: params,
        });
      };

    const updateActivated = async () => {
        await Api.updateActivatedEOService(id, localStorage.getItem('token-hub'))
    }

    return (
        <div className='bg-white shadow-lg rounded-lg h-[400px] w-[293px]'>
            <img  src={!image ? Logo : image} className="w-full h-52 rounded-t-lg object-cover"/>
            <div className='p-4'>
                <h1 className='mb-[19px] line-clamp-1 text-[#475569] text-[18px]'>{title}</h1>
                <h1 className='text-[20px] font-semibold text-[#1A1A1A] mb-[19px]'>Rp. {price}</h1>
                <button className='mb-[20px] w-full bg-cherry hover:bg-cherry text-white h-[30px] text-sm rounded-[8px]' onClick={() => onShowDetail(id)} >Lihat Layanan</button>
                <div className='flex items-center justify-end space-x-2'>
                    <h1 className='text-gray-400 text-sm'>Tampilkan Layanan</h1>
                    <div className="flex">
                        <label className="inline-flex relative items-center mr-5 cursor-pointer">
                            <input type="checkbox" className="sr-only peer"  checked={enabled} readOnly />
                            <div onClick={() => { updateActivated(id); setEnabled(!enabled);   }} className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cherry"></div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardEo
