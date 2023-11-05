import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { IconNext, Wedding } from '../../../../assets'
import { Card5, FooterTwo, Navbar } from '../../../../component'
import ReactPaginate from 'react-paginate'
import Api from '../../../../Api'
import imageHandle from '../../../../utils/imageHandle'


const DetailEventOrganizer = () => {
    const [openTab, setOpenTab] = useState(1);

    const [dropdown, setDropdown] = useState(false);

    const {id} = useParams();

    const [users, setUsers] = useState('');
    const [transaction, setTransaction] = useState({});
    const [packagePricing, setPackagePricing] = useState({});
    const [eoService, setEoService] = useState({});
    const [admin, setAdmin] = useState({})
    const [company, setCompany] = useState({})
    const [image, setImage] = useState('');


    const scrollRight = (i) =>{
        document.getElementById(`scroll`).scrollLeft += 300;
    }

    const scrollLeft = (i) =>{
        document.getElementById(`scroll`).scrollLeft -= 300;
    }

    const getFetchUser = async () => {
        try {
            const response = await Api.fetch(localStorage.getItem('token-hub'))
            setUsers(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getData = async () => {
        try {
            const response = await Api.getServiceByID(id, localStorage.getItem('token-hub'))
            // .then((response) => {
                setTransaction(response.data)
                setPackagePricing(response.data.package_pricing)
                setEoService(response.data.package_pricing.eo_service)
                // setAdmin(eoService.user)
                setCompany(response.data.package_pricing.eo_service.user.company)
                setImage(response.data.package_pricing.eo_service.user)
            // })

            console.log(response.data.package_pricing.eo_service.user)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getFetchUser()
        getData()
    }, [])
    
    return (
        <div className='bg-[#E3E8F1] min-h-screen font-inter'>
            <Navbar/>
            <div className='md:px-[75px] px-[36px] pt-[120px] pb-[10px] md:pt-[140px] md:pb-[30px]'>
                {/* Section 1 */}
                <div>
                    <div className='flex items-center gap-3'>
                        <Link to={'/dashbord-even-organization'} className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>Beranda</Link>
                        <img src={IconNext}/>
                        <button className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>Profil</button>
                        <img src={IconNext}/>
                        <button className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>Riwayat Layanan</button>

                       
                    </div>
                   <div className='mt-[30px] w-full bg-[#ECEEF6] shadow-sm rounded-[12px] p-[22px]'>
                    {/* <h1 className='text-[30px] font-medium'>{service.package_pricing.eo_service.name}</h1> */}
                    <h1 className='text-[30px] font-medium'>{eoService.name}</h1>
                    <div className='flex items-center space-x-[6px] mt-[11px] mb-[22px]'>
                        <div>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.57666 1.99712C8.31974 1.55435 7.68034 1.55435 7.42342 1.99712L5.61405 5.11532C5.48713 5.33404 5.26777 5.4833 5.01772 5.52107L1.62685 6.03322C1.05733 6.11924 0.857554 6.83831 1.30109 7.20578L3.82715 9.29859C4.06098 9.49232 4.17093 9.7979 4.11412 10.0962L3.45335 13.5663C3.34889 14.1148 3.92475 14.541 4.41885 14.2809L7.61179 12.5997C7.85481 12.4717 8.14527 12.4717 8.38829 12.5997L11.5812 14.2809C12.0753 14.541 12.6512 14.1148 12.5467 13.5663L11.886 10.0962C11.8292 9.7979 11.9391 9.49232 12.1729 9.29859L14.699 7.20578C15.1425 6.83832 14.9428 6.11924 14.3732 6.03322L10.9824 5.52107C10.7323 5.4833 10.5129 5.33404 10.386 5.11532L8.57666 1.99712Z" fill="#FFC124"/>
                            </svg>
                        </div>
                        <h1 className='font-bold text-[12px]'>4.5/5</h1>
                        <h1 className='font-normal text-[12px] text-[#5B6785]'>(80 Ulasan)</h1>

                    </div>
                    <div className='grid lg:grid-cols-12 grid-cols-6 gap-5'>
                        <div className='lg:col-span-7'>
                            <div>
                                {/* <img  src={Wedding} className="w-full h-[395px] rounded-lg"/> */}
                                <img src={imageHandle(image.image)} className="w-full h-[395px] rounded-lg"/>
                            </div>
                            <div className='mt-[24px]'>
                                <h1 className='text-[18px] font-semibold'>Deskripsi Layanan</h1>
                                <p className='text-[14px]'>{eoService.description}</p>
                                {/* <p className='text-[14px]'>{eoService.description}</p> */}
                                {/* <p className='text-[14px] mt-1'>Secara umum, paket wedding ini sudah memuat fasilitas dasar seperti:</p> */}
                                {/* <div>
                                    <h1 className='text-[14px] font-semibold'>Dekorasi (Maksimal 7 m) meliputi </h1>
                                    <p className='text-[14px]'>- Standing flowers</p>
                                    <p className='text-[14px]'>- Level maks 30cm </p>
                                    <p className='text-[14px]'>- Lampu sorot </p>
                                    <p className='text-[14px]'>- Kursi pengantin Permadani </p>
                                    <p className='text-[14px]'>- Karpet Pelaminan Mini Garden </p>
                                </div>
                                <div>
                                    <h1 className='text-[14px] font-semibold'>Akad Set meliputi </h1>
                                    <p className='text-[14px]'>- Dekorasi Meja</p>
                                    <p className='text-[14px]'>- Kursi tiffany dekorasi Bunga Meja </p>
                    
                                </div>
                                <div>
                                    <h1 className='text-[14px] font-semibold'>Enterance meliputi  </h1>
                                    <p className='text-[14px]'>- Kotak angpau</p>
                                    <p className='text-[14px]'>- Welcome sign </p>
                    
                                </div>
                                <div>
                                    <h1 className='text-[14px] font-semibold'>Jalur Jalan meliputi </h1>
                                    <p className='text-[14px]'>- Dekorasi wedding gate </p>
                                    <p className='text-[14px]'>- Karpet Jalan</p>
                                    <p className='text-[14px]'>- Bunga Jalan</p>
                    
                                </div>
                                <div>
                                    <h1 className='text-[14px]'>Untuk Perbedaan pada setiap paket, berbeda dalam jumlah dan jenis fasilitas yang didukung. </h1>
                                </div> */}

                                <div className='py-[24px] border-t-2 border-b-2 border-gray-400 mt-[24px]'>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex space-x-[16px]'>
                                            <img
                                                className="w-[54px] h-[54px] object-cover rounded-full"
                                                src={"https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"}
                                                alt="img"
                                            />
                                            <div className='flex flex-col'>
                                                <h1 className='text-black text-[18px] font-bold'>{company.name}</h1>
                                                <h1 className='text-gray-400 text-[12px]'>{company.address}, {company.province}  </h1>
                                                <div className='flex items-center space-x-2'>
                                                    <div>
                                                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M16.2133 5.63406L11.1905 4.90408L8.94521 0.352135C8.88388 0.227506 8.78299 0.126615 8.65836 0.0652895C8.3458 -0.0890138 7.96597 0.0395723 7.80969 0.352135L5.56438 4.90408L0.541613 5.63406C0.403136 5.65384 0.276528 5.71912 0.179594 5.81803C0.062406 5.93848 -0.00216996 6.10053 5.56796e-05 6.26856C0.00228131 6.4366 0.0711264 6.59688 0.191463 6.71418L3.8255 10.2572L2.96694 15.2602C2.94681 15.3766 2.95969 15.4963 3.00412 15.6057C3.04855 15.7151 3.12275 15.8099 3.21832 15.8793C3.31388 15.9488 3.42698 15.99 3.54479 15.9984C3.6626 16.0068 3.78041 15.982 3.88485 15.9269L8.37745 13.5648L12.87 15.9269C12.9927 15.9922 13.1351 16.0139 13.2716 15.9902C13.6158 15.9308 13.8473 15.6044 13.788 15.2602L12.9294 10.2572L16.5634 6.71418C16.6623 6.61724 16.7276 6.49064 16.7474 6.35216C16.8008 6.00597 16.5595 5.68549 16.2133 5.63406Z" fill="#FDBE0F"/>
                                                        </svg>
                                                        
                                                    </div>
                                                    <h1 className='font-semibold text-[14px] text-[#FDBE0F]'>4.5</h1>
                                                    <h1 className='font-semibold text-[12px] text-gray-500'>(1000)</h1>
                                                  


                                                </div>

                                            </div>


                                        </div>
                                        <button className='bg-white px-5 py-2.5 hover:bg-gray-400 hover:text-white rounded-lg shadow-sm font-bold text-[12px]'>Kunjungi Profile </button>

                                    </div>

                                </div>
                                <div className='mt-[24px] h-[124px] rounded-lg bg-white p-[20px]'>
                                    <h1 className='text-[18px] font-semibold'>Ulasan Layanan </h1>
                                    <div className='flex items-center justify-between mt-[27px]'>
                                        <div className='flex items-center gap-[10px]'>
                                            <div className='w-[8px] h-[34px] bg-[#00CDB4] rounded-full'>

                                            </div>
                                            <div className='flex items-center space-x-2'>
                                                <div>
                                                    <svg width="25" height="25" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M16.2133 5.63406L11.1905 4.90408L8.94521 0.352135C8.88388 0.227506 8.78299 0.126615 8.65836 0.0652895C8.3458 -0.0890138 7.96597 0.0395723 7.80969 0.352135L5.56438 4.90408L0.541613 5.63406C0.403136 5.65384 0.276528 5.71912 0.179594 5.81803C0.062406 5.93848 -0.00216996 6.10053 5.56796e-05 6.26856C0.00228131 6.4366 0.0711264 6.59688 0.191463 6.71418L3.8255 10.2572L2.96694 15.2602C2.94681 15.3766 2.95969 15.4963 3.00412 15.6057C3.04855 15.7151 3.12275 15.8099 3.21832 15.8793C3.31388 15.9488 3.42698 15.99 3.54479 15.9984C3.6626 16.0068 3.78041 15.982 3.88485 15.9269L8.37745 13.5648L12.87 15.9269C12.9927 15.9922 13.1351 16.0139 13.2716 15.9902C13.6158 15.9308 13.8473 15.6044 13.788 15.2602L12.9294 10.2572L16.5634 6.71418C16.6623 6.61724 16.7276 6.49064 16.7474 6.35216C16.8008 6.00597 16.5595 5.68549 16.2133 5.63406Z" fill="#FDBE0F"/>
                                                    </svg>
                                                    
                                                </div>
                                                <h1 className='font-semibold text-[24px] text-[#FDBE0F]'>4.5</h1>
                                                <h1 className='font-semibold text-[16px] text-[#FDBE0F]'>(1000)</h1>
                                                


                                            </div>

                                        </div>
                                        <div className='flex items-center gap-[10px]'>
                                            <h1 className='text-[14px] font-medium'>Urutkan </h1>
                                                <div>
                                                    <button 
                                                    onClick={() => setDropdown(!dropdown)}
                                                    className="text-gray-800 bg-white border-2 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 w-40" type="button">
                                                        <div className='flex items-center justify-between'>
                                                            <h1>Terbaru</h1> 
                                                            <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>

                                                        </div>
                                                    </button>

                                                    {dropdown ? (
                                                        <div  className="z-10 absolute  w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                                                            <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioButton">
                                                            <li>
                                                                <div className="flex items-center">
                                                                    <input id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 text-teal-500 bg-gray-100 border-gray-300 focus:ring-teal-500 dark:focus:ring-text-teal-500 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                                                    <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Terbaru</label>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="flex items-center">
                                                                    <input checked id="default-radio-2" type="radio" value="" name="default-radio" className="w-4 h-4 text-teal-500 bg-gray-100 border-gray-300 focus:ring-teal-500 dark:focus:ring-text-teal-500 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                                                    <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Terpopular</label>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="flex items-center">
                                                                    <input id="default-radio-3" type="radio" value="" name="default-radio" className="w-4 h-4 text-teal-500 bg-gray-100 border-gray-300 focus:ring-teal-500 dark:focus:ring-text-teal-500 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                                                    <label htmlFor="default-radio-3" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ranting</label>
                                                                </div>
                                                            </li>
                                                            </ul>
                                                        </div>
                                                    ):(null)}

                                                </div>

                                        </div>

                                    </div>

                                </div>
                                <div className='mt-[14px] rounded-lg bg-white p-[20px]'>
                                    <div className='flex items-center justify-between pb-5'>
                                        <div className='flex items-center space-x-[16px]'>
                                            <img
                                                className="w-[54px] h-[54px] object-cover rounded-full"
                                                src={"https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"}
                                                alt="img"
                                            />
                                            <div className='flex flex-col'>
                                                <h1 className='text-black text-[18px] font-bold'>Yazid Ridho</h1>
                                                <h1 className='text-gray-400 text-[12px]'>Paket Starter</h1>
                                                

                                            </div>


                                        </div>
                                        <div className='flex items-center'>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.57666 1.99712C8.31974 1.55435 7.68034 1.55435 7.42342 1.99712L5.61405 5.11532C5.48713 5.33404 5.26777 5.4833 5.01772 5.52107L1.62685 6.03322C1.05733 6.11924 0.857554 6.83831 1.30109 7.20578L3.82715 9.29859C4.06098 9.49232 4.17093 9.7979 4.11412 10.0962L3.45335 13.5663C3.34889 14.1148 3.92475 14.541 4.41885 14.2809L7.61179 12.5997C7.85481 12.4717 8.14527 12.4717 8.38829 12.5997L11.5812 14.2809C12.0753 14.541 12.6512 14.1148 12.5467 13.5663L11.886 10.0962C11.8292 9.7979 11.9391 9.49232 12.1729 9.29859L14.699 7.20578C15.1425 6.83832 14.9428 6.11924 14.3732 6.03322L10.9824 5.52107C10.7323 5.4833 10.5129 5.33404 10.386 5.11532L8.57666 1.99712Z" fill="#FFC124"/>
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.57666 1.99712C8.31974 1.55435 7.68034 1.55435 7.42342 1.99712L5.61405 5.11532C5.48713 5.33404 5.26777 5.4833 5.01772 5.52107L1.62685 6.03322C1.05733 6.11924 0.857554 6.83831 1.30109 7.20578L3.82715 9.29859C4.06098 9.49232 4.17093 9.7979 4.11412 10.0962L3.45335 13.5663C3.34889 14.1148 3.92475 14.541 4.41885 14.2809L7.61179 12.5997C7.85481 12.4717 8.14527 12.4717 8.38829 12.5997L11.5812 14.2809C12.0753 14.541 12.6512 14.1148 12.5467 13.5663L11.886 10.0962C11.8292 9.7979 11.9391 9.49232 12.1729 9.29859L14.699 7.20578C15.1425 6.83832 14.9428 6.11924 14.3732 6.03322L10.9824 5.52107C10.7323 5.4833 10.5129 5.33404 10.386 5.11532L8.57666 1.99712Z" fill="#FFC124"/>
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.57666 1.99712C8.31974 1.55435 7.68034 1.55435 7.42342 1.99712L5.61405 5.11532C5.48713 5.33404 5.26777 5.4833 5.01772 5.52107L1.62685 6.03322C1.05733 6.11924 0.857554 6.83831 1.30109 7.20578L3.82715 9.29859C4.06098 9.49232 4.17093 9.7979 4.11412 10.0962L3.45335 13.5663C3.34889 14.1148 3.92475 14.541 4.41885 14.2809L7.61179 12.5997C7.85481 12.4717 8.14527 12.4717 8.38829 12.5997L11.5812 14.2809C12.0753 14.541 12.6512 14.1148 12.5467 13.5663L11.886 10.0962C11.8292 9.7979 11.9391 9.49232 12.1729 9.29859L14.699 7.20578C15.1425 6.83832 14.9428 6.11924 14.3732 6.03322L10.9824 5.52107C10.7323 5.4833 10.5129 5.33404 10.386 5.11532L8.57666 1.99712Z" fill="#FFC124"/>
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.57666 1.99712C8.31974 1.55435 7.68034 1.55435 7.42342 1.99712L5.61405 5.11532C5.48713 5.33404 5.26777 5.4833 5.01772 5.52107L1.62685 6.03322C1.05733 6.11924 0.857554 6.83831 1.30109 7.20578L3.82715 9.29859C4.06098 9.49232 4.17093 9.7979 4.11412 10.0962L3.45335 13.5663C3.34889 14.1148 3.92475 14.541 4.41885 14.2809L7.61179 12.5997C7.85481 12.4717 8.14527 12.4717 8.38829 12.5997L11.5812 14.2809C12.0753 14.541 12.6512 14.1148 12.5467 13.5663L11.886 10.0962C11.8292 9.7979 11.9391 9.49232 12.1729 9.29859L14.699 7.20578C15.1425 6.83832 14.9428 6.11924 14.3732 6.03322L10.9824 5.52107C10.7323 5.4833 10.5129 5.33404 10.386 5.11532L8.57666 1.99712Z" fill="#FFC124"/>
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.57666 1.99712C8.31974 1.55435 7.68034 1.55435 7.42342 1.99712L5.61405 5.11532C5.48713 5.33404 5.26777 5.4833 5.01772 5.52107L1.62685 6.03322C1.05733 6.11924 0.857554 6.83831 1.30109 7.20578L3.82715 9.29859C4.06098 9.49232 4.17093 9.7979 4.11412 10.0962L3.45335 13.5663C3.34889 14.1148 3.92475 14.541 4.41885 14.2809L7.61179 12.5997C7.85481 12.4717 8.14527 12.4717 8.38829 12.5997L11.5812 14.2809C12.0753 14.541 12.6512 14.1148 12.5467 13.5663L11.886 10.0962C11.8292 9.7979 11.9391 9.49232 12.1729 9.29859L14.699 7.20578C15.1425 6.83832 14.9428 6.11924 14.3732 6.03322L10.9824 5.52107C10.7323 5.4833 10.5129 5.33404 10.386 5.11532L8.57666 1.99712Z" fill="#FFC124"/>
                                            </svg>
                                        </div>

                                    </div>
                                    <div className='border-t-2 h-5'></div>
                                    <dv className="pt-[14px]">
                                        <p className='text-[14px] font-normal'>Paket ini sangat rekomended  apalagi untuk pasangan dengan budget pas-pasan. Harga Murah tapi kualitas tidak murahan.berulang-ulang untuk bisa dapetin hasil yg kita mau. Thanks for the help, best wishes!</p>
                                    
                                    </dv>
                                    <div className='flex flex-row items-center gap-2 mt-[10px]'>
                                        <img  src={Wedding} className="w-[72px] h-[72px] rounded-lg"/>
                                        <img  src={Wedding} className="w-[72px] h-[72px] rounded-lg"/>
                                        <img  src={Wedding} className="w-[72px] h-[72px] rounded-lg"/>
                                    </div>
                                    <div className='mt-[12px]'>
                                        <h1 className='text-[12px] text-gray-400'>2 hari yang lalu</h1>
                                    </div>
                                    

                                </div>
                                
                            </div>
                            <div className='flex items-center justify-end mt-[30px] gap-[5px]'>
                                <ReactPaginate
                                    breakLabel={<span className="mr-4">...</span>}
                                    nextLabel={
                                        <span className="flex items-center justify-center w-12 h-12 rounded-full border-2 hover:bg-cherry hover:text-white">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.94 4L6 4.94L9.05333 8L6 11.06L6.94 12L10.94 8L6.94 4Z" fill="currentColor" />
                                            </svg>

                                        </span>
                                    }
                                    // onPageChange={handlePageClick}
                                    // pageRangeDisplayed={5}
                                    pageCount={100}
                                    previousLabel={
                                        <span className="flex items-center justify-center w-12 h-12 rounded-full border-2 hover:bg-cherry hover:text-white">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.06 12L11 11.06L7.94667 8L11 4.94L10.06 4L6.06 8L10.06 12Z" fill="currentColor" />
                                            </svg>

                                        </span>
                                    }
                                    // renderOnZeroPageCount={null}
                                    containerClassName="flex items-center justify center mt-8 mb-4 space-x-10"
                                    disabledClassName="w-12 h-12 rounded-full border-2 flex items-center justify-center"
                                    activeClassName="w-12 h-12 rounded-full border-2 bg-cherry text-white flex items-center justify-center"
                                />
                            </div>

                        </div>
                        <div className='lg:col-span-5'>
                            <div className="flex flex-wrap bg-white rounded-[12px] p-[30px]">
                                <div className="w-full">
                                    <ul
                                        className="flex mb-0 list-none pt-3 pb-4 flex-row"
                                        role="tablist"
                                    >
                                      
                                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                            <a
                                                className={
                                                "text-xs font-bold px-5 py-3 block leading-normal " +
                                                (openTab === 1
                                                    ? "text-[#081C4F] bg-gray-100 underline underline-offset-8 shadow-lg rounded"
                                                    : "text-[#64748B] bg-white")
                                                }
                                                onClick={e => {
                                                e.preventDefault();
                                                setOpenTab(1);
                                                }}
                                                data-toggle="tab"
                                                href="#link1"
                                                role="tablist"
                                            >
                                                {packagePricing.name}
                                            </a>
                                        </li>
                                        {/* <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                            <a
                                                className={
                                                "text-xs font-bold px-5 py-3 block leading-normal " +
                                                (openTab === 2
                                                    ? "text-[#081C4F] bg-gray-100 underline underline-offset-8 shadow-lg rounded"
                                                    : "text-[#64748B] bg-white")
                                                }
                                                onClick={e => {
                                                e.preventDefault();
                                                setOpenTab(2);
                                                }}
                                                data-toggle="tab"
                                                href="#link2"
                                                role="tablist"
                                            >
                                                Medium
                                            </a>
                                        </li>
                                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                            <a
                                                className={
                                                "text-xs font-bold px-5 py-3 block leading-normal " +
                                                (openTab === 3
                                                    ? "text-[#081C4F] bg-gray-100 underline underline-offset-8 shadow-lg rounded"
                                                    : "text-[#64748B] bg-white")
                                                }
                                                onClick={e => {
                                                e.preventDefault();
                                                setOpenTab(3);
                                                }}
                                                data-toggle="tab"
                                                href="#link3"
                                                role="tablist"
                                            >
                                                Expert
                                            </a>
                                        </li> */}
          

                                    </ul>
                                <div className="relative flex flex-col min-w-0 break-words mt-[24px] w-full mb-6 ">
                                    <div className="px-4 py-5 flex-auto">
                                    <div className="tab-content tab-space">
                                        <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                            <div >
                                                <div className='mb-[41px]'>
                                                    <p className='text-[12px] font-medium text-[#64748B]'>
                                                        {packagePricing.description} 
                                                    </p>
                                                
                                                    {/* <ol className="list-decimal text-[12px] font-medium text-[#64748B] ml-3">
                                                        <li>Sudah termasuk dengan MC </li>
                                                        <li>Sudah termasuk 1 fotografer </li>
                                                
                                                    </ol> */}

                                                </div>
                                                <div>
                                                    {(packagePricing.disc_price != 0 && packagePricing.disc_percentage != 0) ? <>
                                                        <div className='flex items-center gap-2'>
                                                            <p className="line-through text-gray-500">Rp {parseInt(packagePricing.price).toLocaleString()}</p>
                                                            <div className="bg-red-200 text-red-600 p-2 font-medium text-[10px] rounded-lg">{(packagePricing.disc_price == 0) ? packagePricing.disc_percentage+'%' : 'Rp ' + parseInt(packagePricing.price).toLocaleString()}</div>

                                                        </div>
                                                    </> : <>
                                                    
                                                    </>}
                                                    <h1 className='text-[#FF601B] font-bold text-[20px]'>Rp {parseInt(packagePricing.total_price).toLocaleString()}</h1>
                                                    {/* <div className='flex lg:flex-row flex-col lg:gap-[24px] gap-0 items-center mt-[8px]'>
                                                        <div className='flex flex-row gap-1 items-center'>
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M3.5 12C3.5 7.30558 7.30558 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C7.30558 20.5 3.5 16.6944 3.5 12ZM12.75 7C12.75 6.58579 12.4142 6.25 12 6.25C11.5858 6.25 11.25 6.58579 11.25 7V12C11.25 12.2586 11.3832 12.4989 11.6025 12.636L14.6025 14.511C14.9538 14.7305 15.4165 14.6238 15.636 14.2725C15.8555 13.9212 15.7488 13.4585 15.3975 13.239L12.75 11.5843V7Z" fill="#5B6785"/>
                                                            </svg>

                                                            <h1 className='text-[14px] font-normal text-[#5B6785]'>Dikirim dalam 7 Hari</h1>

                                                        </div>
                                                        <div className='flex flex-row gap-1 items-center'>
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M6.54543 8.1629C6.33021 8.10612 6.15133 7.95667 6.05716 7.75499C5.963 7.5533 5.96329 7.32021 6.05795 7.11875L7.7187 3.58436C7.84246 3.32098 8.10742 3.15296 8.39843 3.15332C8.68944 3.15368 8.95398 3.32235 9.07709 3.58604L9.80971 5.15528C9.83591 5.14499 9.86295 5.13606 9.89078 5.1286C14.2381 3.96373 18.7067 6.54364 19.8715 10.891C21.0364 15.2383 18.4565 19.7069 14.1091 20.8717C9.7618 22.0366 5.29326 19.4567 4.12839 15.1094C3.75797 13.7269 3.7663 12.33 4.09074 11.0313C4.19112 10.6294 4.59828 10.385 5.00015 10.4854C5.40201 10.5858 5.6464 10.993 5.54602 11.3948C5.28172 12.4528 5.27444 13.5909 5.57728 14.7211C6.52774 18.2683 10.1738 20.3733 13.7209 19.4229C17.2681 18.4724 19.3731 14.8264 18.4226 11.2792C17.4877 7.79007 13.9447 5.69626 10.4531 6.53331L11.1923 8.11661C11.3154 8.3803 11.2748 8.69141 11.0882 8.91474C10.9017 9.13807 10.6027 9.23331 10.3214 9.15907L6.54543 8.1629Z" fill="#5B6785"/>
                                                            </svg>

                                                            <h1 className='text-[14px] font-normal text-[#5B6785]'>1 kali revisi</h1>

                                                        </div>

                                                    </div> */}
                                                    <div className='mt-[24px]'>
                                                        <button className='bg-[#2D014B] hover:bg-orange-700  w-full rounded-lg h-[44px] text-[14px] font-light italic text-white'>{(transaction.status == 'SUCCESS') ? transaction.service_status : transaction.status}</button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        {/* <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                      
                                        </div>
                                        <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                                       
                                        </div> */}
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>

                        </div>

                    </div>

                   </div>

                   <div className="pt-[60px]">
                        <div>
                            <h2 className='font-bold text-[32px]'>Rekomendasi EO Terbaik </h2>
                            <p>Butuh bantuan untuk urusan pengadaan acara? Cari di KonectHub ajaa</p>
                        </div>
                        <div className="flex mt-[34px]">
                            <div className='flex items-center justify-center'>
                                <button onClick={() => scrollLeft(1)} className="m-3 p-5 rounded-full bg-white hover:bg-gray-100 shadow-lg">
                                    <svg width="14" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M7.70711 0.959565C7.31658 0.569041 6.68342 0.569041 6.29289 0.959565L0.959559 6.2929C0.569035 6.68342 0.569035 7.31659 0.959559 7.70711L6.29289 13.0404C6.68342 13.431 7.31658 13.431 7.70711 13.0404C8.09763 12.6499 8.09763 12.0168 7.70711 11.6262L3.08088 7.00001L7.70711 2.37378C8.09763 1.98325 8.09763 1.35009 7.70711 0.959565Z" fill="#2E3A44" />
                                    </svg>
                                </button>
                            </div>
                            <div id="scroll" className="flex items-center justify-start overflow-x-auto scroll-smooth scrollbar-hide">
                                <div>
                                    <Card5 price={40000000} priceDisc={50000000} disc={50} pack={"pax"} rating={'4.9'} image={"https://images.unsplash.com/photo-1638132704795-6bb223151bf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"} title={'Kolibree Enterprise- Event Organizer by Najla'}/>
                                </div>
                                <div>
                                    <Card5 price={40000000} priceDisc={50000000} disc={50} pack={"pax"} rating={'4.9'} image={"https://images.unsplash.com/photo-1638132704795-6bb223151bf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"} title={'Kolibree Enterprise- Event Organizer by Najla'}/>
                                </div>
                                <div>
                                    <Card5 price={40000000} priceDisc={50000000} disc={50} pack={"pax"} rating={'4.9'} image={"https://images.unsplash.com/photo-1638132704795-6bb223151bf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"} title={'Kolibree Enterprise- Event Organizer by Najla'}/>
                                </div>
                                <div>
                                    <Card5 price={40000000} priceDisc={50000000} disc={50} pack={"pax"} rating={'4.9'} image={"https://images.unsplash.com/photo-1638132704795-6bb223151bf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"} title={'Kolibree Enterprise- Event Organizer by Najla'}/>
                                </div>
                                <div>
                                    <Card5 price={40000000} priceDisc={50000000} disc={50} pack={"pax"} rating={'4.9'} image={"https://images.unsplash.com/photo-1638132704795-6bb223151bf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"} title={'Kolibree Enterprise- Event Organizer by Najla'}/>
                                </div>
                                <div>
                                    <Card5 price={40000000} priceDisc={50000000} disc={50} pack={"pax"} rating={'4.9'} image={"https://images.unsplash.com/photo-1638132704795-6bb223151bf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"} title={'Kolibree Enterprise- Event Organizer by Najla'}/>
                                </div>
                                <div>
                                    <Card5 price={40000000} priceDisc={50000000} disc={50} pack={"pax"} rating={'4.9'} image={"https://images.unsplash.com/photo-1638132704795-6bb223151bf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"} title={'Kolibree Enterprise- Event Organizer by Najla'}/>
                                </div>
                                
                            </div>
                            <div className='flex items-center justify-center'>
                                <button onClick={() => scrollRight(1)} className="m-3 p-5 rounded-full bg-white hover:bg-gray-100 shadow-lg">
                                    <svg width="14" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M0.292893 0.95958C0.683418 0.569056 1.31658 0.569056 1.70711 0.95958L7.04044 6.29291C7.43097 6.68344 7.43097 7.3166 7.04044 7.70713L1.70711 13.0405C1.31658 13.431 0.683418 13.431 0.292893 13.0405C-0.0976311 12.6499 -0.0976311 12.0168 0.292893 11.6262L4.91912 7.00002L0.292893 2.37379C-0.0976311 1.98327 -0.0976311 1.3501 0.292893 0.95958Z" fill="#2E3A44" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterTwo/>
        </div>
    )
}

export default DetailEventOrganizer
