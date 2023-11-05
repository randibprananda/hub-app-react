import React, { useState, Fragment } from 'react';
import { FooterTwo, NavbarAdmin, Sidebar } from '../../../../component'
import { ActivePartner, BgBanner, Brian, IconAction, IconAddon, IconEmail, IconPhoneOutline, IconNext, IconPartnerDark, IconPartnerGradient, IconPartnerGray, IconStakeholder, IconStatus, NotActivePartner, IconEmailOutline, IconBagCherry, IconArrowRight, IconBagYellow, IconBagPrimary, IconBidding, IconBiddingColor, IconBiddingYellow, IconTagGreen, IconStar, IconStarYellow, IconTagRed, BgDashboard, Wedding } from '../../../../assets';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate'
import Api from '../../../../Api';
import { useEffect } from 'react';
import imageHandle from '../../../../utils/imageHandle';
import { Menu, Transition } from "@headlessui/react";
import { Backdrop, Box, Fade, Modal } from '@mui/material'
import { Close } from '@mui/icons-material'

const modalWrapper = {
    overflow: "auto",
    maxHeight: "100vh",
    display: "flex",
};

const modalBlock = {
    position: "relative",
    zIndex: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    
}
const modalContentStyle = {
    position: "relative",
    background: "white",
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    borderRadius: "8px",
    width: '80vh',
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ListBidding = () => {
  const [open, setOpen] = useState(true);
 
  const [limit, setLimit] = useState(1)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState('')
  const [search, setSearch] = useState('')
  const [isActive, setIsActive] = useState('')
  const [addons, setAddOns] = useState('')
  const [stakeholderId, setStakeholderId] = useState('')
  const [error, setError] = useState(false)
  const handlePageClick = () => {
      setPage(page + 1)
  }
  const [enabled, setEnabled] = useState(false);
  const [layanan, setLayanan] = useState(1);

  const [bidding, setBidding] = useState(false);
  const [offeringLetter, setOfferingLetter] = useState('')
  const [conceptPresentation, setConceptPresentation] = useState('')
  const [budgetPlan, setBudgetPlan] = useState('')

  const showBidding = () => {
    setBidding(true);
  }

  const closeBidding = () => {
    setBidding(false);
  }
 
  
  return (
    <div>
      <div className="h-full bg-outline">
      
          <Sidebar activeMenu={2} open={open} setOpen={setOpen}/>    
          <div
              className={`${open ? 
                "lg:ml-80 md:ml-28 ml-0" 
                : "lg:ml-24 md:ml-28 ml-0"
              } 
              h-full p-7`}
            >
              <NavbarAdmin title={'Partner'} image={IconPartnerGradient} open={open} setOpen={setOpen}/>
              <div className='flex flex-wrap items-center gap-3 mb-[30px] pt-[120px]'>
                  <Link to={'/admin/partner'} className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>Partner </Link>
                  <img src={IconNext} alt='' />
                  <Link to={'/admin/detail-partner'} className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>Detail Partner </Link>
                  <img src={IconNext} alt='' />
                  <button className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>Bidding Partner  </button>
              </div>
              <div className="flex flex-col">
                <div className="-my-2">
                    <div className="py-2 inline-block w-full">
                        <div className="shadow  bg-white border-b border-gray-200 sm:rounded-lg">
                            <div className='px-6 w-full py-5 space-y-4'>
                                <div className='flex items-center md:justify-between md:flex-row flex-col md:space-y-0 space-y-3 mt-5'>
                                    <div className=''>
                                        <h1 className='text-2xl text-[#2E3A44] font-bold'>Daftar Bidding</h1>
                                        
                                    </div>
                                    
                                    <div className='flex gap-3'>
                                        <div className="relative md:w-max w-full">
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_979_102668)">
                                                        <path d="M14.6786 12.9277C15.889 11.276 16.4311 9.2283 16.1965 7.19412C15.9619 5.15994 14.9679 3.28936 13.4133 1.9566C11.8588 0.623835 9.85831 -0.0728113 7.81217 0.0060301C5.76603 0.0848715 3.8251 0.933387 2.37771 2.38182C0.930312 3.83025 0.0831854 5.77178 0.00580817 7.81798C-0.0715691 9.86417 0.626509 11.8641 1.96038 13.4177C3.29426 14.9713 5.16555 15.964 7.1999 16.1972C9.23424 16.4303 11.2816 15.8867 12.9324 14.6752H12.9311C12.9686 14.7252 13.0086 14.7727 13.0536 14.8189L17.8661 19.6314C18.1005 19.866 18.4185 19.9978 18.7501 19.9979C19.0816 19.9981 19.3997 19.8664 19.6342 19.6321C19.8688 19.3977 20.0006 19.0797 20.0008 18.7481C20.0009 18.4165 19.8693 18.0985 19.6349 17.8639L14.8224 13.0514C14.7777 13.0062 14.7296 12.9657 14.6786 12.9277ZM15.0011 8.12268C15.0011 9.02552 14.8233 9.91952 14.4778 10.7536C14.1323 11.5877 13.6259 12.3456 12.9875 12.984C12.3491 13.6224 11.5912 14.1289 10.7571 14.4744C9.92296 14.8199 9.02896 14.9977 8.12612 14.9977C7.22329 14.9977 6.32929 14.8199 5.49517 14.4744C4.66106 14.1289 3.90317 13.6224 3.26476 12.984C2.62636 12.3456 2.11995 11.5877 1.77445 10.7536C1.42895 9.91952 1.25112 9.02552 1.25112 8.12268C1.25112 6.29932 1.97545 4.55064 3.26476 3.26133C4.55408 1.97201 6.30276 1.24768 8.12612 1.24768C9.94949 1.24768 11.6982 1.97201 12.9875 3.26133C14.2768 4.55064 15.0011 6.29932 15.0011 8.12268Z" fill="#A8A8A8" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_979_102668">
                                                            <rect width="20" height="20" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>

                                            </div>
                                            <input type="text" id="simple-search"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full pr-10 p-2.5"
                                                placeholder="Search" required onChange={ (e) => setSearch(e.target.value)}
                                            />
                                        </div>
                                        <div className='flex md:space-y-0 space-y-3 gap-2 md:flex-row flex-col'>
                                            <div className='relative'>
                                                <select onChange={ (e) => setIsActive(e.target.value) } className='bg-gray-50 text-[#A8A8A8] border border-gray-300 text-sm rounded-lg  block w-full pl-10 p-2.5 appearance-none'>
                                                    <option value="" disabled>Filter Status</option>
                                                    <option value={true}>Partner Aktif</option>
                                                    <option value={false}>Partner Non Aktif</option>
                                                    <option value={''}>Tampilkan Semua</option>

                                                </select>
                                                <img src={IconStatus} className='absolute top-3 left-4' alt='' />
                                            </div>
                                        
                                            
                                        </div>

                                    </div>
                                </div>
                                <h1 className='font-normal text-black text-[12px] mt-16'>Menampilkan <span className='font-bold'>100</span> Layanan Jasa</h1>
                            </div>
                            <div >
                                <div className='overflow-x-auto scrollbar-hide p-5 space-y-4'>
                                   
                                    <div className='w-full grid grid-cols-12 bg-gray-50 p-5 rounded-lg items-center'>
                                        <div className='col-span-3'>
                                            <div className="flex items-center">
                                                <div className=" h-[60px] w-[60px]">
                                                    <img className="h-[60px] w-[60px] rounded" src={BgDashboard} alt="" />
                                                </div>
                                                <div className="ml-4 flex flex-col space-y-2">
                                                    <h1 className="text-base font-inter font-medium text-[#1E293B]">Event Ulang tahun Perusahaan : HUT</h1>
                                                    <h1 className="text-base font-inter font-medium text-[#1E293B]">BRI ke- 128</h1>

                                                </div>
                                            </div>

                                        </div>
                                        <div className='col-span-3'>
                                            <div className='flex justify-center items-center gap-2'>
                                                <img src={Brian} className='w-[20px] h-[20px] rounded-full'/>
                                                <h1 className="text-sm font-inter font-normal text-[#1E293B]">Celiscar Santa </h1>
                                            </div>
                                           
                                        </div>
                                        <div className='col-span-3'>
                                            <div className='flex justify-center'>
                                                <span className='bg-[#DEFDFF] border border-[#0085FF] text-[#0085FF] font-medium text-sm px-3 py-2 rounded-lg'>Bidding Diajukan</span>

                                            </div>
                                           
                                        </div>
                                    
                                        <div className='col-span-3'>
                                            <div className='flex justify-center'>
                                                <button onClick={showBidding} className='bg-white hover:bg-primary hover:text-white text-primary border-2 border-primary rounded-xl px-3 py-2 text-base'>Lihat Detail</button>
                                            </div>

                                        </div>

                                    </div>
                                    <div className='w-full grid grid-cols-12 bg-gray-50 p-5 rounded-lg items-center'>
                                        <div className='col-span-3'>
                                            <div className="flex items-center">
                                                <div className=" h-[60px] w-[60px]">
                                                    <img className="h-[60px] w-[60px] rounded" src={BgDashboard} alt="" />
                                                </div>
                                                <div className="ml-4 flex flex-col space-y-2">
                                                    <h1 className="text-base font-inter font-medium text-[#1E293B]">Event Ulang tahun Perusahaan : HUT</h1>
                                                    <h1 className="text-base font-inter font-medium text-[#1E293B]">BRI ke- 128</h1>

                                                </div>
                                            </div>

                                        </div>
                                        <div className='col-span-3'>
                                            <div className='flex justify-center items-center gap-2'>
                                                <img src={Brian} className='w-[20px] h-[20px] rounded-full'/>
                                                <h1 className="text-sm font-inter font-normal text-[#1E293B]">Celiscar Santa </h1>
                                            </div>
                                           
                                        </div>
                                        <div className='col-span-3'>
                                            <div className='flex justify-center'>
                                                <span className='bg-[#E8FFF3] border border-[#30DF3F] text-[#30DF3F] font-medium text-sm px-3 py-2 rounded-lg'>Pemenang Tender</span>

                                            </div>
                                           
                                        </div>
                                    
                                        <div className='col-span-3'>
                                            <div className='flex justify-center'>
                                                <button className='bg-white hover:bg-primary hover:text-white text-primary border-2 border-primary rounded-xl px-3 py-2 text-base'>Lihat Detail</button>
                                            </div>

                                        </div>

                                    </div>
                                    <div className='w-full grid grid-cols-12 bg-gray-50 p-5 rounded-lg items-center'>
                                        <div className='col-span-3'>
                                            <div className="flex items-center">
                                                <div className=" h-[60px] w-[60px]">
                                                    <img className="h-[60px] w-[60px] rounded" src={BgDashboard} alt="" />
                                                </div>
                                                <div className="ml-4 flex flex-col space-y-2">
                                                    <h1 className="text-base font-inter font-medium text-[#1E293B]">Event Ulang tahun Perusahaan : HUT</h1>
                                                    <h1 className="text-base font-inter font-medium text-[#1E293B]">BRI ke- 128</h1>

                                                </div>
                                            </div>

                                        </div>
                                        <div className='col-span-3'>
                                            <div className='flex justify-center items-center gap-2'>
                                                <img src={Brian} className='w-[20px] h-[20px] rounded-full'/>
                                                <h1 className="text-sm font-inter font-normal text-[#1E293B]">Celiscar Santa </h1>
                                            </div>
                                           
                                        </div>
                                        <div className='col-span-3'>
                                            <div className='flex justify-center'>
                                                <span className='bg-[#FFE2E5] border border-[#F64E60] text-[#F64E60] font-medium text-sm px-3 py-2 rounded-lg'>Open Tender Ditutup</span>

                                            </div>
                                           
                                        </div>
                                    
                                        <div className='col-span-3'>
                                            <div className='flex justify-center'>
                                                <button className='bg-white hover:bg-primary hover:text-white text-primary border-2 border-primary rounded-xl px-3 py-2 text-base'>Lihat Detail</button>
                                            </div>

                                        </div>

                                    </div>
                                
                                </div>
                                <div className='flex justify-center'>
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
                                        // pageRangeDisplayed={limit}
                                        // pageCount={totalPages}
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

                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                open={bidding}
                                onClose={closeBidding}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                                sx={modalWrapper}
                            >
                                <Fade in={bidding}>
                                    <Box sx={modalBlock}>
                                        <Box sx={modalContentStyle}>
                                            <div className='space-y-5'>
                                                <div className='flex justify-between items-start'>
                                                    <h1 className='text-lg text-black font-semibold'>Detail Bidding</h1>
                                                    <button onClick={closeBidding} className='hover:text-dark-3'>
                                                        <Close />
                                                    </button>
                                                </div>
                                                <div className='space-y-5'>
                                                    <div>
                                                        <img src={Wedding} className="w-full h-64 object-cover rounded-lg" alt="Konnect Logo" />
                                                    </div>

                                                    <div>
                                                        <span className='bg-[#DEFDFF] border border-[#0085FF] text-[#0085FF] font-medium text-sm px-3 py-2 rounded-lg'>Bidding Diajukan</span>
                                                    </div>

                                                    <div> 
                                                        <span className='bg-[#E8FFF3] border border-[#30DF3F] text-[#30DF3F] font-medium text-sm px-3 py-2 rounded-lg'>Pemenang Tender</span>
                                                       
                                                    </div>

                                                    <div>
                                                        <span className='bg-[#FFE2E5] border border-[#F64E60] text-[#F64E60] font-medium text-sm px-3 py-2 rounded-lg'>Open Tender Ditutup</span>
                                                    </div>

                                                    <div>
                                                        <h1 className='text-[16px] font-semibold text-[#2E3A44] mt-6 mb-3'>Big Event: Spektacular Ulang tahun Perusahaan</h1>
                                                    </div>
                                                    <div className='lg:flex gap-5'>
                                                        <img src={Wedding} alt='JoinTender' className='h-[18px] w-[18px] rounded-full' />
                                                        <p className='text-[10px] text-[#B0B0B0]'>Celiscar Santa </p>
                                                    </div>
                                                   
                                                    <div>
                                                        <p className='text-[12px] text-[#1A1A1A] w-full mt-3 mb-4 line-clamp-3'>
                                                            Kami adalah organisasi nirlaba  membutuhkan seseorang yang dapat memimpin dan mengelola seluruh proyek. Mulai dari proses perancangan proyek, pelaksanaan, proyek selesai , hingga proses evaluasi 
                                                        </p>
                                                    </div>
                                                  
                                                    <div className='flex items-end gap-4'>
                                                        <div className='lg:flex lg:items-center gap-9'>
                                                            <div>
                                                                <h1 className='text-[10px] text-[#454545]'>Estimasi Peserta</h1>
                                                                <div className='flex h-max gap-2'>
                                                                    <div className='flex h-max gap-1 bg-[#F6F6F6] rounded-[4px] p-2'>
                                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M12 4.77338C11.96 4.76671 11.9133 4.76671 11.8733 4.77338C10.9533 4.74004 10.22 3.98671 10.22 3.05338C10.22 2.10004 10.9866 1.33337 11.94 1.33337C12.8933 1.33337 13.66 2.10671 13.66 3.05338C13.6533 3.98671 12.92 4.74004 12 4.77338Z" stroke="#6A6A6A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                                            <path d="M11.3133 9.62669C12.2267 9.78003 13.2333 9.62003 13.94 9.14669C14.88 8.52003 14.88 7.49336 13.94 6.86669C13.2267 6.39336 12.2067 6.23336 11.2933 6.39336" stroke="#6A6A6A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                                            <path d="M3.97995 4.77338C4.01995 4.76671 4.06661 4.76671 4.10661 4.77338C5.02661 4.74004 5.75995 3.98671 5.75995 3.05338C5.75995 2.10004 4.99328 1.33337 4.03995 1.33337C3.08661 1.33337 2.31995 2.10671 2.31995 3.05338C2.32661 3.98671 3.05995 4.74004 3.97995 4.77338Z" stroke="#6A6A6A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                                            <path d="M4.66663 9.62669C3.75329 9.78003 2.74663 9.62003 2.03996 9.14669C1.09996 8.52003 1.09996 7.49336 2.03996 6.86669C2.75329 6.39336 3.77329 6.23336 4.68663 6.39336" stroke="#6A6A6A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                                            <path d="M7.99997 9.75336C7.95997 9.74669 7.9133 9.74669 7.8733 9.75336C6.9533 9.72002 6.21997 8.96669 6.21997 8.03336C6.21997 7.08002 6.98664 6.31335 7.93997 6.31335C8.8933 6.31335 9.65997 7.08669 9.65997 8.03336C9.6533 8.96669 8.91997 9.72669 7.99997 9.75336Z" stroke="#6A6A6A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                                            <path d="M6.05998 11.8534C5.11998 12.48 5.11998 13.5067 6.05998 14.1334C7.12665 14.8467 8.87331 14.8467 9.93998 14.1334C10.88 13.5067 10.88 12.48 9.93998 11.8534C8.87998 11.1467 7.12665 11.1467 6.05998 11.8534Z" stroke="#6A6A6A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                                        </svg>
                                                                        <span className='text-[#6A6A6A] text-[10px]'>1000 - 5000</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <h1 className='text-[10px] text-[#454545]'>Estimasi Pelaksanaan</h1>
                                                                <div className='flex h-max gap-2'>
                                                                    <div className='flex h-max gap-1 bg-[#F6F6F6] rounded-[4px] p-2'>
                                                                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M3.68745 0C3.80812 0 3.92385 0.0479374 4.00918 0.133266C4.09451 0.218595 4.14245 0.334327 4.14245 0.455V1.30585H9.0285V0.46085C9.0285 0.340176 9.07644 0.224445 9.16177 0.139116C9.2471 0.0537874 9.36283 0.00585 9.4835 0.00585C9.60417 0.00585 9.7199 0.0537874 9.80523 0.139116C9.89056 0.224445 9.9385 0.340176 9.9385 0.46085V1.30585H11.7C12.0447 1.30585 12.3752 1.44272 12.619 1.68638C12.8628 1.93004 12.9998 2.26053 13 2.6052V11.7007C12.9998 12.0453 12.8628 12.3758 12.619 12.6195C12.3752 12.8631 12.0447 13 11.7 13H1.3C0.955331 13 0.62477 12.8631 0.380991 12.6195C0.137212 12.3758 0.000172334 12.0453 0 11.7007L0 2.6052C0.000172334 2.26053 0.137212 1.93004 0.380991 1.68638C0.62477 1.44272 0.955331 1.30585 1.3 1.30585H3.23245V0.45435C3.23262 0.333789 3.28064 0.218225 3.36595 0.133037C3.45126 0.047848 3.56689 -1.23021e-07 3.68745 0ZM0.91 5.0323V11.7007C0.91 11.7519 0.920088 11.8026 0.939687 11.8499C0.959286 11.8972 0.988014 11.9402 1.02423 11.9764C1.06044 12.0126 1.10344 12.0414 1.15075 12.061C1.19807 12.0806 1.24878 12.0907 1.3 12.0907H11.7C11.7512 12.0907 11.8019 12.0806 11.8492 12.061C11.8966 12.0414 11.9396 12.0126 11.9758 11.9764C12.012 11.9402 12.0407 11.8972 12.0603 11.8499C12.0799 11.8026 12.09 11.7519 12.09 11.7007V5.0414L0.91 5.0323ZM4.33355 9.50235V10.5852H3.25V9.50235H4.33355ZM7.04145 9.50235V10.5852H5.95855V9.50235H7.04145ZM9.75 9.50235V10.5852H8.66645V9.50235H9.75ZM4.33355 6.9173V8.0002H3.25V6.9173H4.33355ZM7.04145 6.9173V8.0002H5.95855V6.9173H7.04145ZM9.75 6.9173V8.0002H8.66645V6.9173H9.75ZM3.23245 2.2152H1.3C1.24878 2.2152 1.19807 2.22529 1.15075 2.24489C1.10344 2.26449 1.06044 2.29321 1.02423 2.32943C0.988014 2.36564 0.959286 2.40864 0.939687 2.45595C0.920088 2.50327 0.91 2.55398 0.91 2.6052V4.12295L12.09 4.13205V2.6052C12.09 2.55398 12.0799 2.50327 12.0603 2.45595C12.0407 2.40864 12.012 2.36564 11.9758 2.32943C11.9396 2.29321 11.8966 2.26449 11.8492 2.24489C11.8019 2.22529 11.7512 2.2152 11.7 2.2152H9.9385V2.81905C9.9385 2.93972 9.89056 3.05545 9.80523 3.14078C9.7199 3.22611 9.60417 3.27405 9.4835 3.27405C9.36283 3.27405 9.2471 3.22611 9.16177 3.14078C9.07644 3.05545 9.0285 2.93972 9.0285 2.81905V2.2152H4.14245V2.8132C4.14245 2.93387 4.09451 3.0496 4.00918 3.13493C3.92385 3.22026 3.80812 3.2682 3.68745 3.2682C3.56678 3.2682 3.45105 3.22026 3.36572 3.13493C3.28039 3.0496 3.23245 2.93387 3.23245 2.8132V2.2152Z" fill="#6A6A6A" />
                                                                        </svg>

                                                                        <span className='text-[#6A6A6A] text-[10px]'>24 Februari 2023</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                    
                                                    <div className='mt-5'>
                                                        <p className='text-[#5C5C5C] text-start text-xs'>Anggaran</p>
                                                        <p className='font-semibold text-xl text-[#1A1A1A]'>Rp 120.000.000</p>
                                                    </div>
                                                    <div className='bg-[#F1F1F1] p-5 rounded-lg my-[30px]'>
                                                        <h1 className='text-base font-semibold text-[#888888] mb-3'>Daftar Bidding</h1>

                                                        <div className='flex items-center justify-between'>
                                                            <div className='flex items-center gap-2'>
                                                                <h1 className='text-[16px] font-medium font-inter'>30</h1>
                                                                <h1 className='text-[12px] font-normal font-inter'>Orang</h1>

                                                            </div>
                                                            <div>
                                                                <h1 className='text-[12px] font-normal font-inter text-gray-600'>Target 40 orang</h1>
                                                            </div>
                                                        </div>   
                                                        <progress className="progress progress-accent w-full" value="70" max="100"></progress>
                                                        <div className='flex items-center gap-3 justify-end py-2'>
                                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M6.99547 1C3.77547 1 1.16797 3.61333 1.16797 6.83333C1.16797 10.0533 3.77547 12.6667 6.99547 12.6667C10.2213 12.6667 12.8346 10.0533 12.8346 6.83333C12.8346 3.61333 10.2213 1 6.99547 1ZM7.0013 11.5C4.42297 11.5 2.33464 9.41167 2.33464 6.83333C2.33464 4.255 4.42297 2.16667 7.0013 2.16667C9.57964 2.16667 11.668 4.255 11.668 6.83333C11.668 9.41167 9.57964 11.5 7.0013 11.5ZM7.29297 3.91667H6.41797V7.41667L9.48047 9.25417L9.91797 8.53667L7.29297 6.97917V3.91667Z" fill="#C1121F"/>
                                                            </svg>

                                                            <h1 className='text-sm text-[#C1121F]'>14 hari lagi</h1>

                                                        </div>
                                                        <div className='flex justify-between mb-3 items-center'>
                                                            <h1 className='text-sm  text-primary blur-sm hover:blur-none select-none'>Xeno.Entertaiment - 13/03/2023</h1>
                                                            <h1 className='text-sm font-semibold text-primary'>1.000.000.000</h1>
                                                        </div>
                                                        <div className='flex justify-between mb-3 items-center'>
                                                            <h1 className='text-sm  text-gray-400 blur-sm hover:blur-none select-none'>Maju Jaya - 13/03/2023</h1>
                                                            <h1 className='text-sm font-semibold text-[#1A1A1A]'>800.000.000</h1>
                                                        </div>
                                                         <div className='flex justify-between mb-3 items-center'>
                                                            <h1 className='text-sm  text-gray-400 blur-sm hover:blur-none select-none'>Harapan Bersama - 13/03/2023</h1>
                                                            <h1 className='text-sm font-semibold text-[#1A1A1A]'>500.000.000</h1>
                                                        </div>
                                                        
                                                    </div>

                                                    {/* <div className='py-4'>
                                                        <p className='text-[#2E3A44] font-semibold text-xs'>Upload File</p>
                                                        <div className='py-3'>
                                                            <h1 className='text-[#2E3A44CC]/80 text-xs italic font-[500] mb-[10px]'>Surat Penawaran<span className='text-[#C1121F] ml-[10px]'>*</span></h1>
                                                            <button className='text-primary text-xs underline'>Unduh Template</button>
                                                            <div className='flex lg:flex-row flex-col space-x-10 mt-[10px] '>
                                                                <div className="">
                                                                    <div className="flex items-center justify-center gap-3 w-full">
                                                                        <label htmlFor={'offering-letter'} className="cursor-pointer">
                                                                            <div className='flex p-2 gap-2 items-center rounded-lg bg-[#F9FBFC] border-[#E3E8F1] border w-56'>
                                                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path d="M5.41634 16.6663C4.14967 16.6663 3.06912 16.2302 2.17467 15.358C1.28023 14.4802 0.833008 13.4108 0.833008 12.1497C0.833008 11.0663 1.15801 10.0997 1.80801 9.24967C2.46356 8.39967 3.31912 7.85801 4.37467 7.62467C4.72467 6.3469 5.41912 5.31356 6.45801 4.52467C7.50245 3.73023 8.68301 3.33301 9.99967 3.33301C11.6275 3.33301 13.0052 3.89967 14.133 5.03301C15.2663 6.16079 15.833 7.53856 15.833 9.16634C16.7941 9.27745 17.5886 9.69412 18.2163 10.4163C18.8497 11.1275 19.1663 11.9608 19.1663 12.9163C19.1663 13.9608 18.8025 14.8469 18.0747 15.5747C17.3469 16.3025 16.4608 16.6663 15.4163 16.6663H10.833C10.3775 16.6663 9.98579 16.5025 9.65801 16.1747C9.33023 15.8525 9.16634 15.4608 9.16634 14.9997V10.708L7.83301 11.9997L6.66634 10.833L9.99967 7.49967L13.333 10.833L12.1663 11.9997L10.833 10.708V14.9997H15.4163C15.9997 14.9997 16.4913 14.7969 16.8913 14.3913C17.2969 13.9913 17.4997 13.4997 17.4997 12.9163C17.4997 12.333 17.2969 11.8413 16.8913 11.4413C16.4913 11.0358 15.9997 10.833 15.4163 10.833H14.1663V9.16634C14.1663 8.01634 13.7608 7.03301 12.9497 6.21634C12.1386 5.40523 11.1552 4.99967 9.99967 4.99967C8.84968 4.99967 7.86634 5.40523 7.04967 6.21634C6.23856 7.03301 5.83301 8.01634 5.83301 9.16634H5.41634C4.61079 9.16634 3.92467 9.45245 3.35801 10.0247C2.78579 10.5913 2.49967 11.2775 2.49967 12.083C2.49967 12.8886 2.78579 13.583 3.35801 14.1663C3.92467 14.7219 4.61079 14.9997 5.41634 14.9997H7.49967V16.6663" fill="#A8A8A8" />
                                                                                </svg>
                                                                                <h1 className='text-sm text-[#A8A8A8] '>Unggah surat penawaran</h1>
                                                                            </div>
                                                                            <input
                                                                                type="file"
                                                                              
                                                                                name='offering-letter'
                                                                                id='offering-letter'
                                                                                className='rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] hidden'
                                                                            />
                                                                        </label>
                                                                        {offeringLetter &&
                                                                            <div className='border-primary border rounded-full p-2 flex gap-1 items-center'>
                                                                                <h1 className='text-sm text-[#2E3A44CC]/80 line-clamp-1'>offering name</h1>
                                                                                <button onClick={() => setOfferingLetter(null)}>
                                                                                    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                        <path d="M12.2437 4.49378C12.5854 4.15206 12.5854 3.59802 12.2437 3.25629C11.902 2.91457 11.3479 2.91457 11.0062 3.25629L7.5 6.76251L3.99379 3.25629C3.65207 2.91457 3.09803 2.91457 2.7563 3.25629C2.41458 3.59802 2.41458 4.15206 2.7563 4.49378L6.26251 7.99999L2.75629 11.5062C2.41457 11.8479 2.41457 12.402 2.75629 12.7437C3.09801 13.0854 3.65206 13.0854 3.99378 12.7437L7.5 9.23748L11.0062 12.7437C11.3479 13.0854 11.902 13.0854 12.2437 12.7437C12.5854 12.402 12.5854 11.8479 12.2437 11.5062L8.73749 7.99999L12.2437 4.49378Z" fill="#2E3A44" fill-opacity="0.8" />
                                                                                    </svg>
                                                                                </button>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <h1 className='text-[#2E3A44CC]/80 text-xs italic font-[500] my-[10px]'>Presentasi Konsep<span className='text-[#C1121F] ml-[10px]'>*</span></h1>
                                                            <button className='text-primary text-xs underline'>Unduh Template</button>
                                                            <div className='flex lg:flex-row flex-col space-x-10 mt-[10px] '>
                                                                <div className="">
                                                                    <div className="flex items-center justify-center gap-3 w-full">
                                                                        <label htmlFor={'conceptPresentation'} className="cursor-pointer">
                                                                            <div className='flex p-2 gap-2 items-center rounded-lg bg-[#F9FBFC] border-[#E3E8F1] border w-56'>
                                                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path d="M5.41634 16.6663C4.14967 16.6663 3.06912 16.2302 2.17467 15.358C1.28023 14.4802 0.833008 13.4108 0.833008 12.1497C0.833008 11.0663 1.15801 10.0997 1.80801 9.24967C2.46356 8.39967 3.31912 7.85801 4.37467 7.62467C4.72467 6.3469 5.41912 5.31356 6.45801 4.52467C7.50245 3.73023 8.68301 3.33301 9.99967 3.33301C11.6275 3.33301 13.0052 3.89967 14.133 5.03301C15.2663 6.16079 15.833 7.53856 15.833 9.16634C16.7941 9.27745 17.5886 9.69412 18.2163 10.4163C18.8497 11.1275 19.1663 11.9608 19.1663 12.9163C19.1663 13.9608 18.8025 14.8469 18.0747 15.5747C17.3469 16.3025 16.4608 16.6663 15.4163 16.6663H10.833C10.3775 16.6663 9.98579 16.5025 9.65801 16.1747C9.33023 15.8525 9.16634 15.4608 9.16634 14.9997V10.708L7.83301 11.9997L6.66634 10.833L9.99967 7.49967L13.333 10.833L12.1663 11.9997L10.833 10.708V14.9997H15.4163C15.9997 14.9997 16.4913 14.7969 16.8913 14.3913C17.2969 13.9913 17.4997 13.4997 17.4997 12.9163C17.4997 12.333 17.2969 11.8413 16.8913 11.4413C16.4913 11.0358 15.9997 10.833 15.4163 10.833H14.1663V9.16634C14.1663 8.01634 13.7608 7.03301 12.9497 6.21634C12.1386 5.40523 11.1552 4.99967 9.99967 4.99967C8.84968 4.99967 7.86634 5.40523 7.04967 6.21634C6.23856 7.03301 5.83301 8.01634 5.83301 9.16634H5.41634C4.61079 9.16634 3.92467 9.45245 3.35801 10.0247C2.78579 10.5913 2.49967 11.2775 2.49967 12.083C2.49967 12.8886 2.78579 13.583 3.35801 14.1663C3.92467 14.7219 4.61079 14.9997 5.41634 14.9997H7.49967V16.6663" fill="#A8A8A8" />
                                                                                </svg>
                                                                                <h1 className='text-sm text-[#A8A8A8] '>Unggah presentasi konsep</h1>
                                                                            </div>
                                                                            <input
                                                                                type="file"
                                                                             
                                                                                name='conceptPresentation'
                                                                                id='conceptPresentation'
                                                                                className='rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] hidden'
                                                                            />
                                                                        </label>
                                                                        {conceptPresentation &&
                                                                            <div className='border-primary border rounded-full p-2 flex gap-1 items-center'>
                                                                                <h1 className='text-sm text-[#2E3A44CC]/80 line-clamp-1'>conceptPresentation name</h1>
                                                                                <button onClick={() => setConceptPresentation(null)}>
                                                                                    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                        <path d="M12.2437 4.49378C12.5854 4.15206 12.5854 3.59802 12.2437 3.25629C11.902 2.91457 11.3479 2.91457 11.0062 3.25629L7.5 6.76251L3.99379 3.25629C3.65207 2.91457 3.09803 2.91457 2.7563 3.25629C2.41458 3.59802 2.41458 4.15206 2.7563 4.49378L6.26251 7.99999L2.75629 11.5062C2.41457 11.8479 2.41457 12.402 2.75629 12.7437C3.09801 13.0854 3.65206 13.0854 3.99378 12.7437L7.5 9.23748L11.0062 12.7437C11.3479 13.0854 11.902 13.0854 12.2437 12.7437C12.5854 12.402 12.5854 11.8479 12.2437 11.5062L8.73749 7.99999L12.2437 4.49378Z" fill="#2E3A44" fill-opacity="0.8" />
                                                                                    </svg>
                                                                                </button>
                                                                            </div>
                                                                        }
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <h1 className='text-[#2E3A44CC]/80 text-xs italic font-[500] my-[10px]'>Anggaran (RAB)<span className='text-[#C1121F] ml-[10px]'>*</span></h1>
                                                            <button className='text-primary text-xs underline'>Unduh Template</button>
                                                            <div className='flex lg:flex-row flex-col space-x-10 mt-[10px] '>
                                                                <div className="">
                                                                    <div className="flex items-center justify-center gap-3 w-full">
                                                                        <label htmlFor={'budgetPlan'} className="cursor-pointer">
                                                                            <div className='flex p-2 gap-2 items-center rounded-lg bg-[#F9FBFC] border-[#E3E8F1] border w-56'>
                                                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path d="M5.41634 16.6663C4.14967 16.6663 3.06912 16.2302 2.17467 15.358C1.28023 14.4802 0.833008 13.4108 0.833008 12.1497C0.833008 11.0663 1.15801 10.0997 1.80801 9.24967C2.46356 8.39967 3.31912 7.85801 4.37467 7.62467C4.72467 6.3469 5.41912 5.31356 6.45801 4.52467C7.50245 3.73023 8.68301 3.33301 9.99967 3.33301C11.6275 3.33301 13.0052 3.89967 14.133 5.03301C15.2663 6.16079 15.833 7.53856 15.833 9.16634C16.7941 9.27745 17.5886 9.69412 18.2163 10.4163C18.8497 11.1275 19.1663 11.9608 19.1663 12.9163C19.1663 13.9608 18.8025 14.8469 18.0747 15.5747C17.3469 16.3025 16.4608 16.6663 15.4163 16.6663H10.833C10.3775 16.6663 9.98579 16.5025 9.65801 16.1747C9.33023 15.8525 9.16634 15.4608 9.16634 14.9997V10.708L7.83301 11.9997L6.66634 10.833L9.99967 7.49967L13.333 10.833L12.1663 11.9997L10.833 10.708V14.9997H15.4163C15.9997 14.9997 16.4913 14.7969 16.8913 14.3913C17.2969 13.9913 17.4997 13.4997 17.4997 12.9163C17.4997 12.333 17.2969 11.8413 16.8913 11.4413C16.4913 11.0358 15.9997 10.833 15.4163 10.833H14.1663V9.16634C14.1663 8.01634 13.7608 7.03301 12.9497 6.21634C12.1386 5.40523 11.1552 4.99967 9.99967 4.99967C8.84968 4.99967 7.86634 5.40523 7.04967 6.21634C6.23856 7.03301 5.83301 8.01634 5.83301 9.16634H5.41634C4.61079 9.16634 3.92467 9.45245 3.35801 10.0247C2.78579 10.5913 2.49967 11.2775 2.49967 12.083C2.49967 12.8886 2.78579 13.583 3.35801 14.1663C3.92467 14.7219 4.61079 14.9997 5.41634 14.9997H7.49967V16.6663" fill="#A8A8A8" />
                                                                                </svg>
                                                                                <h1 className='text-sm text-[#A8A8A8] '>Unggah anggaran (RAB)</h1>
                                                                            </div>
                                                                            <input
                                                                                type="file"
                                                                             
                                                                                name='budgetPlan'
                                                                                id='budgetPlan'
                                                                                className='rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] hidden'
                                                                            />
                                                                        </label>
                                                                        {budgetPlan &&
                                                                            <div className='border-primary border rounded-full p-2 flex gap-1 items-center'>
                                                                                <h1 className='text-sm text-[#2E3A44CC]/80 line-clamp-1'>budgetPlan name</h1>
                                                                                <button onClick={() => setBudgetPlan(null)}>
                                                                                    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                        <path d="M12.2437 4.49378C12.5854 4.15206 12.5854 3.59802 12.2437 3.25629C11.902 2.91457 11.3479 2.91457 11.0062 3.25629L7.5 6.76251L3.99379 3.25629C3.65207 2.91457 3.09803 2.91457 2.7563 3.25629C2.41458 3.59802 2.41458 4.15206 2.7563 4.49378L6.26251 7.99999L2.75629 11.5062C2.41457 11.8479 2.41457 12.402 2.75629 12.7437C3.09801 13.0854 3.65206 13.0854 3.99378 12.7437L7.5 9.23748L11.0062 12.7437C11.3479 13.0854 11.902 13.0854 12.2437 12.7437C12.5854 12.402 12.5854 11.8479 12.2437 11.5062L8.73749 7.99999L12.2437 4.49378Z" fill="#2E3A44" fill-opacity="0.8" />
                                                                                    </svg>
                                                                                </button>
                                                                            </div>
                                                                        }
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div className='flex justify-end mt-11'>
                                                                <button className='px-[10px] py-[14px] bg-cherry rounded-lg text-white text-sm'>Ajukan Penawaran</button>
                                                            </div>
                                                        </div>

                                                    </div> */}
                                                    
                                                </div>
                                            </div>
                                        </Box>
                                    </Box>
                                </Fade>
                            </Modal>
                          

                           
                        </div>
                    </div>
                    
                </div>  
              </div>

          </div>
      
      </div>
      <FooterTwo/>
    </div>
  );
};

export default ListBidding;
