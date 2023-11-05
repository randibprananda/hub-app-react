import { Close } from '@mui/icons-material'
import { Backdrop, Fade, Modal } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Api from '../../../../Api'
import { AltImage, IconNext, IconServiceEO, IconServiceEOCherry, IconServiceEOWhite, IconShop, Talent, UpgradeAkun } from '../../../../assets'
import { FooterTwo, Navbar } from '../../../../component'
import Card6 from '../../../../component/Card/Card6'
import imageHandle from '../../../../utils/imageHandle'
import moment from 'moment'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    'border-radius': "8px",
};


function DashboardProfileEventHunter() {
    const [index, setIndex] = useState(1)
    const [open, setOpen] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [data, setData] = useState('');
    const [users, setUsers] = useState('');

    const [serviceAll, setServiceAll] = useState();
    const [serviceBooked, setServiceBooked] = useState();
    const [serviceFinish, setServiceFinish] = useState();

    const [statisticAll, setStatisticAll] = useState();
    const [statisticBooked, setStatisticBooked] = useState();
    const [statisticFinish, setStatisticFinish] = useState();

    const [dataDetail, setDataDetail] = useState('')
    

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenDetail = async(id) => {
        try {
            const response = await Api.getDetailServiceEventHunter(localStorage.getItem('token-hub'), id)
            setDataDetail(response.data.data)
            console.log(response.data.data)
            setOpenDetail(true);
        } catch (error) {
            console.log(error)
        }
    };
    const handleCloseDetail = () => setOpenDetail(false);

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
            const response = await Api.getDataService(localStorage.getItem('token-hub'))
            setData(response.data)

            const responseAll = await Api.getServiceAll(localStorage.getItem('token-hub'))
            const responseBooked = await Api.getServiceBooking(localStorage.getItem('token-hub'))
            const responseFinish = await Api.getServiceFinish(localStorage.getItem('token-hub'))

            setServiceAll(responseAll.data.data)
            setStatisticAll(responseAll.data.statistic.all)

            setServiceBooked(responseBooked.data.data)
            setStatisticBooked(responseBooked.data.statistic.booking)

            setServiceFinish(responseFinish.data.data)
            setStatisticFinish(responseFinish.data.statistic.finish)


        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
        getFetchUser()
    }, [])

    // console.log("ini", serviceAll);
    return (
        <div className='bg-[#E3E8F1] min-h-screen'>
            <Navbar />
            <div className='md:px-[75px] px-2.5 pt-[120px] pb-[10px] md:pt-[140px] md:pb-[30px] mb-10'>
                <div className='flex items-center gap-3 mb-[30px]'>
                    <Link to={''} className='text-black-k text-xs lg:text-sm font-[500] hover:text-primary'>Beranda</Link>
                    <img src={IconNext} />
                    <Link to={''} className='text-black-k text-xs lg:text-sm font-[500] hover:text-primary'>Beranda Profile</Link>
                </div>
                <div className='space-y-8 md:space-y-10'>
                    {/* Section 1 */}
                    <div className='py-4 space-y-8 bg-white rounded-xl md:py-7 md:px-14 px-6'>
                        <div className='flex flex-wrap items-center gap-5 md:gap-7'>
                            <div className=''>
                                <div className="relative object-cover md:w-24 md:h-24 w-[73px] h-[73px] overflow-hidden bg-gray-100 border rounded-full">
                                    <img src={'https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'} className="absolute" alt="Konnect Logo" />
                                </div>
                            </div>
                            <div className='flex flex-col flex-wrap md:flex-nowrap'>
                                <p className='md:text-2xl text-base font-semibold text-black-k'>{users.username}</p>
                                <div className='md:flex flex-wrap gap-2.5 items-center'>
                                    <p className='font-medium md:text-base text-sm text-dark-5'>Event Hunter</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Section 2 */}
                    <div className='bg-primary rounded-xl md:py-12 py-4 lg:px-14 md:px-7 px-1.5 space-y-8'>
                        <div className='md:grid md:grid-cols-12 flex md:gap-0 gap-1 items-center md:items-start'>
                            <div className="md:col-span-4 flex-shrink-0">
                                <img src={UpgradeAkun} className=" md:w-[293px] w-[114px] h-[96px] md:h-[245px]" alt="Konnect Logo" />
                            </div>
                            <div className=' md:col-span-8 md:mt-0 md:px-5 lg:px-10'>
                                <h1 className='font-bold text-sm md:text-2xl text-white mb-3'>Dapatkan Keuntungan dan Berkolaborasi dengan Tim Kami!</h1>
                                <h1 className='md:text-base text-xs text-white mb-5'>Ingin membawa bisnis Anda ke tingkat berikutnya dan bekerja sama dengan tim kami? Upgrade ke Akun Partner dan nikmati manfaat yang luar biasa</h1>
                                {/* <button className='px-5 py-3 text-lg text-white rounded-lg bg-cherry hover:bg-cherry'>Upgrade ke Akun Partner Sekarang!</button> */}
                                <Link to={'/upcoming-features'} className='px-2.5 py-2 text-sm text-white rounded-lg bg-cherry hover:bg-cherry md:py-3 md:px-5 md:text-lg text-[9px]'>Upgrade ke Akun Partner Sekarang!</Link>

                            </div>
                        </div>
                    </div>
                    {/* Section 3 */}
                    <div className='py-4 space-y-8 bg-white rounded-xl md:py-7 md:px-14'>
                        <div className='flex flex-wrap items-center justify-between gap-5 md:px-0 px-6'>
                            <div className='space-y-2.5'>
                                <p className='md:text-2xl text-dark-3 font-semibold text-sm'>Riwayat Layanan </p>
                            </div>
                        </div>
                        <div className='space-y-12'>
                            <div className='flex overflow-x-auto gap-8 scrollbar-hide md:px-0 px-6'>
                                <div className='relative py-6 space-y-8 border rounded-2xl px-7 flex-shrink-0 md:w-[370px] w-[200px]'>
                                    <div className='flex gap-2.5'>
                                        <div>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16 8.75C15.59 8.75 15.25 8.41 15.25 8V4.5C15.25 3.42 14.58 2.75 13.5 2.75H10.5C9.42 2.75 8.75 3.42 8.75 4.5V8C8.75 8.41 8.41 8.75 8 8.75C7.59 8.75 7.25 8.41 7.25 8V4.5C7.25 2.59 8.59 1.25 10.5 1.25H13.5C15.41 1.25 16.75 2.59 16.75 4.5V8C16.75 8.41 16.41 8.75 16 8.75Z" fill="#00CDB4" />
                                                <path d="M8.00009 17.78C7.59009 17.78 7.25009 17.44 7.25009 17.03C7.25009 16.61 7.59009 16.28 8.00009 16.28H19.7601C20.0601 16.28 20.2901 16.02 20.2601 15.72L19.5801 10.03C19.3401 8.09 19.0001 6.5 15.6001 6.5H8.40009C5.00009 6.5 4.66009 8.09 4.43009 10.03L3.53009 17.53C3.24009 19.99 4.00009 22 7.51009 22H16.4901C19.6501 22 20.5801 20.37 20.5301 18.25C20.5201 17.98 20.3001 17.78 20.0301 17.78H8.00009Z" fill="#00CDB4" />
                                            </svg>
                                        </div>

                                        <p className='font-medium text-dark-5 text-xs md:text-base'>Total Layanan Terbooking </p>
                                    </div>
                                    <p className='md:text-2xl text-sm font-semibold text-dark-3'>{statisticBooked ?? 0} Layanan</p>
                                </div>
                                <div className='relative py-6 space-y-8 border rounded-2xl px-7 flex-shrink-0 md:w-[370px] w-[200px]'>
                                    <div className='flex gap-2.5'>
                                        <div>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16 8.75C15.59 8.75 15.25 8.41 15.25 8V4.5C15.25 3.42 14.58 2.75 13.5 2.75H10.5C9.42 2.75 8.75 3.42 8.75 4.5V8C8.75 8.41 8.41 8.75 8 8.75C7.59 8.75 7.25 8.41 7.25 8V4.5C7.25 2.59 8.59 1.25 10.5 1.25H13.5C15.41 1.25 16.75 2.59 16.75 4.5V8C16.75 8.41 16.41 8.75 16 8.75Z" fill="#00CDB4" />
                                                <path d="M8.00009 17.78C7.59009 17.78 7.25009 17.44 7.25009 17.03C7.25009 16.61 7.59009 16.28 8.00009 16.28H19.7601C20.0601 16.28 20.2901 16.02 20.2601 15.72L19.5801 10.03C19.3401 8.09 19.0001 6.5 15.6001 6.5H8.40009C5.00009 6.5 4.66009 8.09 4.43009 10.03L3.53009 17.53C3.24009 19.99 4.00009 22 7.51009 22H16.4901C19.6501 22 20.5801 20.37 20.5301 18.25C20.5201 17.98 20.3001 17.78 20.0301 17.78H8.00009Z" fill="#00CDB4" />
                                            </svg>
                                        </div>


                                        <p className='font-medium text-dark-5 text-xs md:text-base'>Total Layanan Selesai  </p>
                                    </div>
                                    <p className='md:text-2xl text-sm font-semibold text-dark-3'>{statisticFinish ?? 0} Layanan</p>
                                    {/* jika terverifikasi */}
                                    {/* <div><Link to={""} className="text-cherry font-medium text-sm hover:text-[#170026]">Lihat Riwayat</Link></div> */}
                                    {/* jika belum terverifikasi */}

                                </div>
                                <div className='relative py-6 space-y-8 border rounded-2xl px-7 flex-shrink-0 md:w-[370px] w-[200px]'>
                                    <div className='flex gap-2.5'>
                                        <div>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16 8.75C15.59 8.75 15.25 8.41 15.25 8V4.5C15.25 3.42 14.58 2.75 13.5 2.75H10.5C9.42 2.75 8.75 3.42 8.75 4.5V8C8.75 8.41 8.41 8.75 8 8.75C7.59 8.75 7.25 8.41 7.25 8V4.5C7.25 2.59 8.59 1.25 10.5 1.25H13.5C15.41 1.25 16.75 2.59 16.75 4.5V8C16.75 8.41 16.41 8.75 16 8.75Z" fill="#00CDB4" />
                                                <path d="M8.00009 17.78C7.59009 17.78 7.25009 17.44 7.25009 17.03C7.25009 16.61 7.59009 16.28 8.00009 16.28H19.7601C20.0601 16.28 20.2901 16.02 20.2601 15.72L19.5801 10.03C19.3401 8.09 19.0001 6.5 15.6001 6.5H8.40009C5.00009 6.5 4.66009 8.09 4.43009 10.03L3.53009 17.53C3.24009 19.99 4.00009 22 7.51009 22H16.4901C19.6501 22 20.5801 20.37 20.5301 18.25C20.5201 17.98 20.3001 17.78 20.0301 17.78H8.00009Z" fill="#00CDB4" />
                                            </svg>
                                        </div>

                                        <p className='font-medium text-dark-5 text-xs md:text-base'>Total Semua Layanan  </p>
                                    </div>
                                    <p className='md:text-2xl text-sm font-semibold text-dark-3'>{statisticAll ?? 0} Layanan</p>

                                </div>
                            </div>
                            <div className='flex items-center justify-between gap-5 md:px-0 px-2.5'>
                                <div className='flex overflow-x-auto scrollbar-hide lg:gap-7 md:gap-3.5 gap-2'>
                                    <button onClick={() => setIndex(1)} className={`flex items-center gap-2.5 p-3 text-xs font-semibold ${index == 1 ? "bg-primary hover:bg-primary/75 text-white" : "bg-dark-8 text-light-gray hover:bg-dark-6"} rounded-lg flex-shrink-0`}>
                                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="9.04762" height="9.04762" rx="2" fill="white" />
                                            <rect y="9.95239" width="9.04762" height="9.04762" rx="2" fill="white" />
                                            <rect x="9.95215" width="9.04762" height="9.04762" rx="2" fill="white" />
                                            <rect x="9.95215" y="9.95239" width="9.04762" height="9.04762" rx="2" fill={index == 1 ? 'white' : '#C0C6D4'} />
                                        </svg>
                                        <span>Semua Layanan</span>
                                    </button>
                                    <button onClick={() => setIndex(2)} className={`flex items-center gap-2.5 p-3 text-xs font-semibold ${index == 2 ? "bg-primary hover:bg-primary/75 text-white" : "bg-dark-8 text-light-gray hover:bg-dark-6"} rounded-lg flex-shrink-0`}>
                                        <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M0 3C0 2.20435 0.316071 1.44129 0.87868 0.87868C1.44129 0.316071 2.20435 0 3 0H15C15.7956 0 16.5587 0.316071 17.1213 0.87868C17.6839 1.44129 18 2.20435 18 3V17C18 17.7956 17.6839 18.5587 17.1213 19.1213C16.5587 19.6839 15.7956 20 15 20H3C2.20435 20 1.44129 19.6839 0.87868 19.1213C0.316071 18.5587 0 17.7956 0 17V3ZM5 3V10L7.293 7.707C7.48053 7.51953 7.73484 7.41421 8 7.41421C8.26516 7.41421 8.51947 7.51953 8.707 7.707L11 10V3C11 2.73478 10.8946 2.48043 10.7071 2.29289C10.5196 2.10536 10.2652 2 10 2H6C5.73478 2 5.48043 2.10536 5.29289 2.29289C5.10536 2.48043 5 2.73478 5 3Z" fill={index == 2 ? 'white' : '#C0C6D4'} />
                                        </svg>

                                        <span>Layanan Terbooking</span>
                                    </button>
                                    <button onClick={() => setIndex(3)} className={`flex items-center gap-2.5 p-3 text-xs font-semibold ${index == 3 ? "bg-primary hover:bg-primary/75 text-white" : "bg-dark-8 text-light-gray hover:bg-dark-6"} rounded-lg flex-shrink-0`}>
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.6 13.2L14.65 6.15L13.25 4.75L7.6 10.4L4.75 7.55L3.35 8.95L7.6 13.2ZM2 18C1.45 18 0.979 17.8043 0.587 17.413C0.195667 17.021 0 16.55 0 16V2C0 1.45 0.195667 0.979 0.587 0.587C0.979 0.195667 1.45 0 2 0H16C16.55 0 17.021 0.195667 17.413 0.587C17.8043 0.979 18 1.45 18 2V16C18 16.55 17.8043 17.021 17.413 17.413C17.021 17.8043 16.55 18 16 18H2Z" fill={index == 3 ? 'white' : '#C0C6D4'} />
                                        </svg>

                                        <span>Layanan Selesai</span>
                                    </button>
                                </div>
                            </div>
                            {index == 1 ?
                                <div className='grid gap-2 md:gap-8 lg:grid-cols-4 grid-cols-2 md:px-0 px-1'>
                                    {serviceAll && Object.values(serviceAll).map((data, index) => {
                                        // console.log("id", data?.package_pricing?.eoServiceId != null ? data?.package_pricing?.eoServiceId : data?.package_pricing?.productSupplyId != null ? data?.package_pricing?.productSupplyId : data?.package_pricing?.talentServiceId != null ? data?.package_pricing?.talentServiceId : data?.package_pricing?.venueServiceId != null ? data?.package_pricing?.venueServiceId : null)
                                        const package_pricing = data.package_pricing
                                        return (
                                            // <Card6
                                            //     icon={IconServiceEOWhite}
                                            //     image={package_pricing.service_type == 'EO' ? imageHandle(package_pricing?.eo_service?.eo_images[0]?.image) : package_pricing.service_type == 'VENUE' ? imageHandle(package_pricing?.venue_service?.venue_images[0]?.image) : package_pricing.service_type == 'TALENT' ? imageHandle(package_pricing?.talent_service?.talent_images[0]?.image) : package_pricing.service_type == 'PRODUCT' ? imageHandle(package_pricing?.product_supply?.product_images[0]?.image) : AltImage}
                                            //     title={package_pricing.service_type == 'EO' ? package_pricing?.eo_service?.name : package_pricing.service_type == 'VENUE' ? package_pricing?.venue_service?.name : package_pricing.service_type == 'TALENT' ? package_pricing?.talent_service?.name : package_pricing.service_type == 'PRODUCT' ? package_pricing?.product_supply?.namaLayanan : "undefined"}
                                            //     price={data.package_pricing?.total_price}
                                            //     layanan={data.package_pricing?.service_type}
                                            //     id={data?.package_pricing?.eoServiceId != null ? data?.package_pricing?.eoServiceId : data?.package_pricing?.productSupplyId != null ? data?.package_pricing?.productSupplyId : data?.package_pricing?.talentServiceId != null ? data?.package_pricing?.talentServiceId : data?.package_pricing?.venueServiceId != null ? data?.package_pricing?.venueServiceId : null}
                                            // />
                                            
                                            // <Card6
                                            //     id={data?.package_pricing?.eoServiceId != null ? data?.package_pricing?.eoServiceId : data?.package_pricing?.productSupplyId != null ? data?.package_pricing?.productSupplyId : data?.package_pricing?.talentServiceId != null ? data?.package_pricing?.talentServiceId : data?.package_pricing?.venueServiceId != null ? data?.package_pricing?.venueServiceId : null}
                                            //     image={package_pricing.service_type == 'EO' ? imageHandle(package_pricing?.eo_service?.eo_images[0]?.image) : package_pricing.service_type == 'VENUE' ? imageHandle(package_pricing?.venue_service?.venue_images[0]?.image) : package_pricing.service_type == 'TALENT' ? imageHandle(package_pricing?.talent_service?.talent_images[0]?.image) : package_pricing.service_type == 'PRODUCT' ? imageHandle(package_pricing?.product_supply?.product_images[0]?.image) : AltImage}
                                            //     icon={IconServiceEOCherry}
                                            //     status={data.status}
                                            //     title={package_pricing.service_type == 'EO' ? package_pricing?.eo_service?.name : package_pricing.service_type == 'VENUE' ? package_pricing?.venue_service?.name : package_pricing.service_type == 'TALENT' ? package_pricing?.talent_service?.name : package_pricing.service_type == 'PRODUCT' ? package_pricing?.product_supply?.namaLayanan : "undefined"}
                                            //     description={package_pricing.service_type == 'EO' ? package_pricing?.eo_service?.description : package_pricing.service_type == 'VENUE' ? package_pricing?.venue_service?.description : package_pricing.service_type == 'TALENT' ? package_pricing?.talent_service?.description : package_pricing.service_type == 'PRODUCT' ? package_pricing?.product_supply?.namaLayanan : "undefined"}
                                            //     price={data.package_pricing?.total_price}
                                            //     layanan={data.package_pricing?.service_type}
                                            // />

                                            <div key={index} className='w-[292px] min-h-[400px] border rounded-[8px] shadow-md py-[17px] px-[16px] space-y-[20px]'>
                                                <div className='h-[144px] border w-full rounded-[4px] bg-cover p-[8px]' style={{ backgroundImage: `url(${package_pricing.service_type == 'EO' ? imageHandle(package_pricing?.eo_service?.eo_images[0]?.image) : package_pricing.service_type == 'VENUE' ? imageHandle(package_pricing?.venue_service?.venue_images[0]?.image) : package_pricing.service_type == 'TALENT' ? imageHandle(package_pricing?.talent_service?.talent_images[0]?.image) : package_pricing.service_type == 'PRODUCT' ? imageHandle(package_pricing?.product_supply?.product_images[0]?.image) : AltImage})` }}>
                                                    <img alt='icon' src={IconServiceEOCherry}/>
                                                </div>
                                                <div className={`py-[6px] px-[10px] w-fit rounded-[8px] border ${data.status === 'COMPLETE' ? 'border-[#00AF99] bg-[#E7F7F3]' : data.status === 'UNPAID' ? 'border-[#F2AA67] bg-[#FFF8ED]' : data.status === 'PAID' ? 'border-[#54A5F0] bg-[#ECF8FF]' : data.status === 'FAILED' ? 'border-[#F05454] bg-[#FFEDED]' : null}`}>
                                                    <p className={`text-sm capitalize ${data.status === 'COMPLETE' ? 'text-[#00AF99]' : data.status === 'UNPAID' ? 'text-[#F2AA67]' : data.status === 'PAID' ? 'text-[#54A5F0]' : data.status === 'FAILED' ? 'text-[#F05454]' : null}`}>
                                                        {data.status === 'COMPLETE' ? 'Complete' : data.status === 'UNPAID' ? 'Belum Bayar' : data.status === 'PAID' ? 'Sudah Bayar' : data.status === 'FAILED' ? 'Batal' : null}
                                                    </p>
                                                </div>
                                                <div className='space-y-[4px] '>
                                                    <h1 className='text-[#475569] text-[18px] line-clamp-1'>{package_pricing.service_type == 'EO' ? package_pricing?.eo_service?.name : package_pricing.service_type == 'VENUE' ? package_pricing?.venue_service?.name : package_pricing.service_type == 'TALENT' ? package_pricing?.talent_service?.name : package_pricing.service_type == 'PRODUCT' ? package_pricing?.product_supply?.namaLayanan : "undefined"}</h1>
                                                    <h1 className='text-[#C0C6D4] font-semibold text-[18px] line-clamp-1'>{package_pricing.service_type == 'EO' ? package_pricing?.eo_service?.description : package_pricing.service_type == 'VENUE' ? package_pricing?.venue_service?.description : package_pricing.service_type == 'TALENT' ? package_pricing?.talent_service?.description : package_pricing.service_type == 'PRODUCT' ? package_pricing?.product_supply?.namaLayanan : "undefined"}</h1>
                                                </div>
                                                <h1 className='text-[#1A1A1A] text-[20px] font-semibold'>Rp. {data.package_pricing?.total_price}</h1>
                                                <button className='mb-[8px] w-full bg-cherry shadow-sm text-white py-2 text-xs md:text-sm rounded-[8px]' onClick={() => handleOpenDetail(data.id)}>Detail</button>
                                            </div>
                                        )
                                    })}
                                </div>
                                : null}
                            {index == 2 ?
                                <div className='grid gap-2 md:gap-8 lg:grid-cols-4 grid-cols-2 md:px-0 px-1'>
                                    {serviceBooked && Object.values(serviceBooked).map((data, index) => {
                                        const package_pricing = data.package_pricing
                                        return (
                                            <div className='w-[292px] min-h-[400px] border rounded-[8px] shadow-md py-[17px] px-[16px] space-y-[20px]'>
                                                <div className='h-[144px] border w-full rounded-[4px] bg-cover p-[8px]' style={{ backgroundImage: `url(${package_pricing.service_type == 'EO' ? imageHandle(package_pricing?.eo_service?.eo_images[0]?.image) : package_pricing.service_type == 'VENUE' ? imageHandle(package_pricing?.venue_service?.venue_images[0]?.image) : package_pricing.service_type == 'TALENT' ? imageHandle(package_pricing?.talent_service?.talent_images[0]?.image) : package_pricing.service_type == 'PRODUCT' ? imageHandle(package_pricing?.product_supply?.product_images[0]?.image) : AltImage})` }}>
                                                    <img alt='icon' src={IconServiceEOCherry}/>
                                                </div>
                                                <div className={`py-[6px] px-[10px] w-fit rounded-[8px] border ${data.status === 'COMPLETE' ? 'border-[#00AF99] bg-[#E7F7F3]' : data.status === 'UNPAID' ? 'border-[#F2AA67] bg-[#FFF8ED]' : data.status === 'PAID' ? 'border-[#54A5F0] bg-[#ECF8FF]' : data.status === 'FAILED' ? 'border-[#F05454] bg-[#FFEDED]' : null}`}>
                                                    <p className={`text-sm capitalize ${data.status === 'COMPLETE' ? 'text-[#00AF99]' : data.status === 'UNPAID' ? 'text-[#F2AA67]' : data.status === 'PAID' ? 'text-[#54A5F0]' : data.status === 'FAILED' ? 'text-[#F05454]' : null}`}>
                                                        {data.status === 'COMPLETE' ? 'Complete' : data.status === 'UNPAID' ? 'Belum Bayar' : data.status === 'PAID' ? 'Sudah Bayar' : data.status === 'FAILED' ? 'Batal' : null}
                                                    </p>
                                                </div>
                                                <div className='space-y-[4px] '>
                                                    <h1 className='text-[#475569] text-[18px] line-clamp-1'>{package_pricing.service_type == 'EO' ? package_pricing?.eo_service?.name : package_pricing.service_type == 'VENUE' ? package_pricing?.venue_service?.name : package_pricing.service_type == 'TALENT' ? package_pricing?.talent_service?.name : package_pricing.service_type == 'PRODUCT' ? package_pricing?.product_supply?.namaLayanan : "undefined"}</h1>
                                                    <h1 className='text-[#C0C6D4] font-semibold text-[18px] line-clamp-1'>{package_pricing.service_type == 'EO' ? package_pricing?.eo_service?.description : package_pricing.service_type == 'VENUE' ? package_pricing?.venue_service?.description : package_pricing.service_type == 'TALENT' ? package_pricing?.talent_service?.description : package_pricing.service_type == 'PRODUCT' ? package_pricing?.product_supply?.namaLayanan : "undefined"}</h1>
                                                </div>
                                                <h1 className='text-[#1A1A1A] text-[20px] font-semibold'>Rp. {data.package_pricing?.total_price}</h1>
                                                <button className='mb-[8px] w-full bg-cherry shadow-sm text-white py-2 text-xs md:text-sm rounded-[8px]'>Detail</button>
                                            </div>
                                        )
                                    })}
                                </div>
                                : null}
                            {index == 3 ?
                                <div className='grid gap-2.5 md:gap-8 lg:grid-cols-4 grid-cols-2 md:px-0 px-1'>
                                    {serviceFinish && Object.values(serviceFinish).map((data, index) => {
                                        const package_pricing = data.package_pricing
                                        return (
                                            <div className='w-[292px] min-h-[400px] border rounded-[8px] shadow-md py-[17px] px-[16px] space-y-[20px]'>
                                                <div className='h-[144px] border w-full rounded-[4px] bg-cover p-[8px]' style={{ backgroundImage: `url(${package_pricing.service_type == 'EO' ? imageHandle(package_pricing?.eo_service?.eo_images[0]?.image) : package_pricing.service_type == 'VENUE' ? imageHandle(package_pricing?.venue_service?.venue_images[0]?.image) : package_pricing.service_type == 'TALENT' ? imageHandle(package_pricing?.talent_service?.talent_images[0]?.image) : package_pricing.service_type == 'PRODUCT' ? imageHandle(package_pricing?.product_supply?.product_images[0]?.image) : AltImage})` }}>
                                                    <img alt='icon' src={IconServiceEOCherry}/>
                                                </div>
                                                <div className={`py-[6px] px-[10px] w-fit rounded-[8px] border ${data.status === 'COMPLETE' ? 'border-[#00AF99] bg-[#E7F7F3]' : data.status === 'UNPAID' ? 'border-[#F2AA67] bg-[#FFF8ED]' : data.status === 'PAID' ? 'border-[#54A5F0] bg-[#ECF8FF]' : data.status === 'FAILED' ? 'border-[#F05454] bg-[#FFEDED]' : null}`}>
                                                    <p className={`text-sm capitalize ${data.status === 'COMPLETE' ? 'text-[#00AF99]' : data.status === 'UNPAID' ? 'text-[#F2AA67]' : data.status === 'PAID' ? 'text-[#54A5F0]' : data.status === 'FAILED' ? 'text-[#F05454]' : null}`}>
                                                        {data.status === 'COMPLETE' ? 'Complete' : data.status === 'UNPAID' ? 'Belum Bayar' : data.status === 'PAID' ? 'Sudah Bayar' : data.status === 'FAILED' ? 'Batal' : null}
                                                    </p>
                                                </div>
                                                <div className='space-y-[4px] '>
                                                    <h1 className='text-[#475569] text-[18px] line-clamp-1'>{package_pricing.service_type == 'EO' ? package_pricing?.eo_service?.name : package_pricing.service_type == 'VENUE' ? package_pricing?.venue_service?.name : package_pricing.service_type == 'TALENT' ? package_pricing?.talent_service?.name : package_pricing.service_type == 'PRODUCT' ? package_pricing?.product_supply?.namaLayanan : "undefined"}</h1>
                                                    <h1 className='text-[#C0C6D4] font-semibold text-[18px] line-clamp-1'>{package_pricing.service_type == 'EO' ? package_pricing?.eo_service?.description : package_pricing.service_type == 'VENUE' ? package_pricing?.venue_service?.description : package_pricing.service_type == 'TALENT' ? package_pricing?.talent_service?.description : package_pricing.service_type == 'PRODUCT' ? package_pricing?.product_supply?.namaLayanan : "undefined"}</h1>
                                                </div>
                                                <h1 className='text-[#1A1A1A] text-[20px] font-semibold'>Rp. {data.package_pricing?.total_price}</h1>
                                                <button className='mb-[8px] w-full bg-cherry shadow-sm text-white py-2 text-xs md:text-sm rounded-[8px]'>Detail</button>
                                            </div>
                                        )
                                    })}
                                </div>
                                : null}
                        </div>
                        
                        {/* jika data kosong */}
                        {/*<div className="flex flex-col items-center justify-center w-full mt-16 md:mt-32 space-y-11">
                            <img src={NoData} />
                            <p className='text-dark-7'>Belum ada layanan yang ditambah</p>
                            <div><button onClick={handleOpen} className=' flex gap-2.5 text-white p-3 bg-primary rounded-lg hover:bg-primary/75 hover:text-white'><Add /><span>Tambah Bidding</span></button></div>
                        </div> */}
                    </div>
                </div>
            </div>
            <FooterTwo />

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <div className='flex items-start justify-between'>
                            <h1 className='text-lg font-semibold'>Tambah Bidding</h1>
                            <button onClick={handleClose} className='hover:text-dark-3'>
                                <Close />
                            </button>
                        </div>
                        <div className='my-5 space-y-2.5'>
                            <div className='space-y-1.5'>
                                <label className="text-sm font-medium text-dark-5">Nama Project<span className='text-[#C1121F] ml-[10px]'>*</span></label>
                                <input type='text' placeholder='Masukan nama  project tender...' required className='rounded-[12px] outline-none border border-[#E3E8F1] w-full py-2.5 px-3.5' />
                            </div>
                            <div className='grid grid-cols-2 gap-5'>
                                <div className='space-y-1.5'>
                                    <label className="text-sm font-medium text-dark-5">Estimasi Peserta<span className='text-[#C1121F] ml-[10px]'>*</span></label>
                                    <input type='number' placeholder='' min={0} required className='rounded-[12px] outline-none border border-[#E3E8F1] w-full py-2.5 px-3.5' />
                                </div>
                                <div className='space-y-1.5'>
                                    <label className="text-sm font-medium text-dark-5">Estimasi Waktu<span className='text-[#C1121F] ml-[10px]'>*</span></label>
                                    <input type='date' placeholder='' required className='rounded-[12px] outline-none border border-[#E3E8F1] w-full py-2.5 px-3.5' />
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-5'>
                                <div className='space-y-1.5'>
                                    <label className="text-sm font-medium text-dark-5">Estimasi Biaya<span className='text-[#C1121F] ml-[10px]'>*</span></label>
                                    <input type='number' placeholder='' min={0} required className='rounded-[12px] outline-none border border-[#E3E8F1] w-full py-2.5 px-3.5' />
                                </div>
                                <div className='space-y-1.5'>
                                    <label className="text-sm font-medium text-dark-5">Model Penawan<span className='text-[#C1121F] ml-[10px]'>*</span></label>
                                    <select
                                        className="text-[#A8A8A8] text-sm font-[500] rounded-[12px] outline-none border border-[#E3E8F1] w-full py-[15px]">
                                        <option hidden>Pilih Model Penawaran</option>
                                    </select>
                                </div>
                            </div>
                            <div className='space-y-1.5'>
                                <label className="text-sm font-medium text-dark-5">Deskripsi Isi<span className='text-[#C1121F] ml-[10px]'>*</span></label>
                                <textarea rows={3} placeholder='Tuliskan desktipsi project...' required className='rounded-[12px] outline-none border border-[#E3E8F1] w-full py-2.5 px-3.5'></textarea>
                            </div>
                        </div>

                        <div className="flex flex-row justify-end mt-9">
                            <button
                                className="px-5 py-2 ml-2 font-semibold border rounded-md border-dark-5 text-dark-5 hover:text-white hover:bg-cherry/50"
                                onClick={handleClose}
                            >
                                Batal
                            </button>
                            <button
                                className="px-5 py-2 ml-2 font-semibold text-white rounded-md bg-cherry hover:bg-cherry/50"
                            >
                                Simpan
                            </button>
                        </div>
                    </Box>
                </Fade>
            </Modal>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openDetail}
                onClose={handleCloseDetail}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openDetail}>
                    <Box sx={style}>
                        <div className='space-y-[20px] max-h-[867px] overflow-auto scrollbar-hide'>
                            <div className='flex items-start justify-between'>
                                <h1 className='text-lg font-semibold text-[#2E3A44]'>Riwayat Layanan</h1>
                                <button onClick={handleCloseDetail} className='hover:text-dark-3'>
                                    <Close className='text-[#000000]'/>
                                </button>
                            </div>
                            <div className='bg-[#F5F5F5] rounded-[8px] py-[24px] px-[26px] space-y-[16px]'>
                                <div className='flex items-center gap-[22px]'>
                                    <img alt='icon' src={IconShop}/>
                                    <h1 className='text-[#2D014B] font-semibold'>{dataDetail.company_name}</h1>
                                </div>
                                <div className='bg-white min-h-[275px] py-[15px] px-[20px] rounded-[4px] space-y-[11px]'>
                                    <div className='grid grid-cols-12 gap-[24px]'>
                                        <img alt='banner' className='col-span-6 rounded-[4px]' src={imageHandle(dataDetail.image)}/>
                                        <div className='space-y-[6px] col-span-6'>
                                            <h1 className='text-[#2E3A44] text-[20px] font-medium'>{dataDetail.service_name}</h1>
                                            <p className='text-[#595E6A] text-[18px] font-medium'>{dataDetail.package_name}</p>
                                            <p className='text-[#474B55] font-medium'>{dataDetail.qty} PAX</p>
                                            <p className='text-[#888888] text-sm'>Tanggal Acara</p>
                                            <p className='text-[#474B55] font-semibold'>{dataDetail.date}</p>
                                        </div>
                                    </div>
                                    <p className='text-[#888888] text-sm'>Event Brief</p>
                                    <p className='text-[#474B55] font-semibold'>{dataDetail.event_brief}</p>
                                </div>
                                <div className='bg-white min-h-[158px] py-[15px] px-[20px] rounded-[4px] space-y-[11px]'>
                                    <div className='grid grid-cols-12 gap-[24px]'>
                                        <div className='space-y-[4px] col-span-6'>
                                            <p className='text-[#6C727F] text-sm'>Ditagih Ke</p>
                                            <p className='text-[#1A1C21] text-[16px] font-semibold'>{dataDetail.billing_to}</p>
                                        </div>
                                        <div className='space-y-[4px] col-span-6'>
                                            <p className='text-[#6C727F] text-sm'>Nomor Invoice</p>
                                            <p className='text-[#1A1C21] text-[16px] font-semibold'>{dataDetail.invoice}</p>
                                        </div>
                                        <div className='space-y-[4px] col-span-6'>
                                            <p className='text-[#6C727F] text-sm'>Dari</p>
                                            <p className='text-[#1A1C21] text-[16px] font-semibold'>{dataDetail.company_name}</p>
                                            <p className='text-[#5E6470] text-[10px]'>{dataDetail.company_phone}</p>
                                        </div>
                                        <div className='space-y-[4px] col-span-6'>
                                            <p className='text-[#6C727F] text-sm'>Tanggal Invoice</p>
                                            <p className='text-[#1A1C21] text-[16px] font-semibold'>{moment(dataDetail.date_invoice).format('DD/MM/YYYY')}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='bg-white min-h-[56px] py-[15px] px-[20px] rounded-[4px]'>
                                    <p className='text-[#6C727F] text-sm'>Status Pembayaran</p>
                                    <p className={`font-bold uppercase ${dataDetail.payment_status === 'COMPLETE' ? 'text-[#00AF99]' : dataDetail.payment_status === 'UNPAID' ? 'text-[#F2AA67]' : dataDetail.payment_status === 'PAID' ? 'text-[#54A5F0]' : dataDetail.payment_status === 'FAILED' ? 'text-[#F05454]' : null}`}>
                                        {dataDetail.payment_status === 'COMPLETE' ? 'Complete' : dataDetail.payment_status === 'UNPAID' ? 'Belum Bayar' : dataDetail.payment_status === 'PAID' ? 'Sudah Bayar' : dataDetail.payment_status === 'FAILED' ? 'Batal' : null}
                                    </p>
                                </div>
                                <div className='bg-white min-h-[176px] py-[15px] px-[20px] rounded-[4px]'>
                                    <div className='flex items-center justify-between border-b-2 border-dashed border-[#C0C6D4] pb-[14px]'>
                                        <h1 className='text-[#474B55] text-[13px]'>Subtotal</h1>
                                        <h1 className='text-[#454545] text-[13px] font-semibold'>Rp. {dataDetail.sub_total}</h1>
                                    </div>
                                    <div className='flex items-center justify-between border-b-2 border-black py-[14px]'>
                                        <h1 className='text-[#474B55] text-[13px]'>Biaya Admin</h1>
                                        <h1 className='text-[#454545] text-[13px] font-semibold'>Rp. {dataDetail.admin_fee}</h1>
                                    </div>
                                    <div className='flex items-center justify-between py-[14px]'>
                                        <h1 className='text-[#737373] text-[13px] font-bold'>Total Persanan</h1>
                                        <h1 className='text-[#00CDB4] text-[16px] font-bold'>Rp. {dataDetail.total_payment}</h1>
                                    </div>
                                </div>
                                <button className='mb-[8px] w-full bg-[#130F26] shadow-sm text-white py-[16px] text-[18px] md:text-sm rounded-[8px]' onClick={() => window.open(dataDetail.payment_link, '_self')}>Bayar Sekarang</button>
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div >
    )
}

export default DashboardProfileEventHunter