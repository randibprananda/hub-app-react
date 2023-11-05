import React, { useState, Fragment } from 'react';
import { FooterTwo, NavbarAdmin, Sidebar } from '../../../../component'
import { ActivePartner, BgBanner, Brian, IconAction, IconAddon, IconEmail, IconPhoneOutline, IconNext, IconPartnerDark, IconPartnerGradient, IconPartnerGray, IconStakeholder, IconStatus, NotActivePartner, IconEmailOutline, IconBagCherry, IconArrowRight, IconBagYellow, IconBagPrimary, IconBidding, IconBiddingColor, IconBiddingYellow, IconTagGreen, IconStar, IconStarYellow, IconTagRed, Wedding, IconDropdown } from '../../../../assets';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate'
import Api from '../../../../Api';
import { useEffect } from 'react';
import imageHandle from '../../../../utils/imageHandle';  
import { Backdrop, Box, Fade, Modal } from '@mui/material'
import { Close } from '@mui/icons-material'

const stylePatner = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
  'border-radius': "8px",


};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const DetailListLayananPartner = () => {
  const [open, setOpen] = useState(true);
  const [tender, setTender] = useState('')
  const [stakeholderList, setStakeholderList] = useState('')
  const [limit, setLimit] = useState(1)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState('')
  const [search, setSearch] = useState('')
  const [isActive, setIsActive] = useState('')
  const [addons, setAddOns] = useState('')
  const [stakeholderId, setStakeholderId] = useState('')
  const [error, setError] = useState(false)
  const [dropdown, setDropdown] = useState(false);
  const [openTab, setOpenTab] = useState(0);
  const handlePageClick = () => {
      setPage(page + 1)
  }
  const [enabled, setEnabled] = useState(false);
  const [layanan, setLayanan] = useState(1);

  const scrollLeft = (i) => {
    document.getElementById(`content${i}`).scrollLeft -= 300;
}
const scrollRight = (i) => {
    document.getElementById(`content${i}`).scrollLeft += 300;
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
                  <Link to={'/admin/detail-partner'} className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>Detail Partner </Link>
                  <img src={IconNext} alt='' />
                  <Link to={'/admin/detail-partner/list-layanan-partner'} className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>Layanan Partner  </Link>
                  <img src={IconNext} alt='' />
                  <button className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>Detail Layanan Partner </button>
              </div>
              <div className="flex flex-col">
                <div className='mt-[20px] w-full bg-[#ECEEF6] shadow-sm rounded-[12px] py-[39px] px-[24px]'>
                    <h1 className='text-[30px] font-medium text-[#2D014B]'>Premium Garden Wedding Party Package</h1>
                    <div className='flex items-center space-x-[6px] mt-[11px] mb-[22px]'>
                        <div>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.57666 1.99712C8.31974 1.55435 7.68034 1.55435 7.42342 1.99712L5.61405 5.11532C5.48713 5.33404 5.26777 5.4833 5.01772 5.52107L1.62685 6.03322C1.05733 6.11924 0.857554 6.83831 1.30109 7.20578L3.82715 9.29859C4.06098 9.49232 4.17093 9.7979 4.11412 10.0962L3.45335 13.5663C3.34889 14.1148 3.92475 14.541 4.41885 14.2809L7.61179 12.5997C7.85481 12.4717 8.14527 12.4717 8.38829 12.5997L11.5812 14.2809C12.0753 14.541 12.6512 14.1148 12.5467 13.5663L11.886 10.0962C11.8292 9.7979 11.9391 9.49232 12.1729 9.29859L14.699 7.20578C15.1425 6.83832 14.9428 6.11924 14.3732 6.03322L10.9824 5.52107C10.7323 5.4833 10.5129 5.33404 10.386 5.11532L8.57666 1.99712Z" fill="#FFC124" />
                            </svg>
                        </div>
                        <h1 className='font-bold text-[12px] text-[#081C4F]'>4.5/5</h1>
                        <h1 className='font-normal text-[12px] text-[#5B6785]'>(80 Ulasan)</h1>
                    </div>
                    <div className='grid lg:grid-cols-12 grid-cols-6 gap-5'>
                        <div className='lg:col-span-7 col-span-6'>
                          <div>
                              <img src={Wedding} className="w-full h-[395px] rounded-lg" />
                          </div>
                          <div className="">
                              <div className="flex mt-[34px] relative">
                                  <div className='absolute inset-y-0 left-0 z-10 px-[36px]  flex items-center justify-center'>
                                      <button onClick={() => scrollLeft(1)} className="m-3 p-5 rounded-full bg-white/50 hover:bg-gray-100 shadow-lg">
                                          <svg width="14" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <path fillRule="evenodd" clipRule="evenodd" d="M7.70711 0.959565C7.31658 0.569041 6.68342 0.569041 6.29289 0.959565L0.959559 6.2929C0.569035 6.68342 0.569035 7.31659 0.959559 7.70711L6.29289 13.0404C6.68342 13.431 7.31658 13.431 7.70711 13.0404C8.09763 12.6499 8.09763 12.0168 7.70711 11.6262L3.08088 7.00001L7.70711 2.37378C8.09763 1.98325 8.09763 1.35009 7.70711 0.959565Z" fill="#2E3A44" />
                                          </svg>
                                      </button>
                                  </div>
                              
                                  <div id="content1" className="flex items-center justify-start gap-5 overflow-x-auto scroll-smooth scrollbar-hide">
                                      
                                      <img src={Wedding} className=' h-[105px] w-[105px] rounded-md' alt='' />
                                      <img src={Wedding} className=' h-[105px] w-[105px] rounded-md' alt='' />
                                      <img src={Wedding} className=' h-[105px] w-[105px] rounded-md' alt='' />
                                      <img src={Wedding} className=' h-[105px] w-[105px] rounded-md' alt='' />
                                      <img src={Wedding} className=' h-[105px] w-[105px] rounded-md' alt='' />
                                      <img src={Wedding} className=' h-[105px] w-[105px] rounded-md' alt='' />
                                      <img src={Wedding} className=' h-[105px] w-[105px] rounded-md' alt='' />
                                      <img src={Wedding} className=' h-[105px] w-[105px] rounded-md' alt='' />
                                      <img src={Wedding} className=' h-[105px] w-[105px] rounded-md' alt='' />
                                      <img src={Wedding} className=' h-[105px] w-[105px] rounded-md' alt='' />
                                          
                                  </div>
                                
                                  <div className='absolute inset-y-0 right-0 z-10 px-[36px]  flex items-center justify-center'>
                                      <button onClick={() => scrollRight(1)} className="m-3 p-5 rounded-full bg-white/50 hover:bg-gray-100 shadow-lg">
                                          <svg width="14" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <path fillRule="evenodd" clipRule="evenodd" d="M0.292893 0.95958C0.683418 0.569056 1.31658 0.569056 1.70711 0.95958L7.04044 6.29291C7.43097 6.68344 7.43097 7.3166 7.04044 7.70713L1.70711 13.0405C1.31658 13.431 0.683418 13.431 0.292893 13.0405C-0.0976311 12.6499 -0.0976311 12.0168 0.292893 11.6262L4.91912 7.00002L0.292893 2.37379C-0.0976311 1.98327 -0.0976311 1.3501 0.292893 0.95958Z" fill="#2E3A44" />
                                          </svg>
                                      </button>
                                  </div>
                              </div>
                          </div>
                          <div className='mt-[24px]'>
                              <h1 className='text-[18px] font-semibold text-[#2D014B]'>Deskripsi Layanan</h1>
                              <p className='text-[14px] text-[#454545]'>Layanan Premium Garden Wedding Party Package merupakan jenis paket premium untuk event wedding garden. Layanan ini terbagi menjadi 3 pilihan paket yang dapet di pilih sesuai dengan kebutuhan dan budget anda. </p>
                              <p className='text-[14px] mt-1'>Secara umum, paket wedding ini sudah memuat fasilitas dasar seperti:</p>
                              <div>
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
                              </div>
                              <div className='py-[24px] border-b border-gray-500 mt-[44px]'></div>
                              <div className='mt-[49px] h-[124px] rounded-lg bg-white p-[20px]'>
                                  <h1 className='text-[18px] font-semibold'>Ulasan Layanan </h1>
                                  <div className='flex items-center justify-between mt-[27px]'>
                                      <div className='flex items-center gap-[10px]'>
                                          <div className='w-[8px] h-[34px] bg-[#00CDB4] rounded-full'>
                                          </div>
                                          <div className='flex items-center space-x-2'>
                                              <div>
                                                  <svg width="25" height="25" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <path d="M16.2133 5.63406L11.1905 4.90408L8.94521 0.352135C8.88388 0.227506 8.78299 0.126615 8.65836 0.0652895C8.3458 -0.0890138 7.96597 0.0395723 7.80969 0.352135L5.56438 4.90408L0.541613 5.63406C0.403136 5.65384 0.276528 5.71912 0.179594 5.81803C0.062406 5.93848 -0.00216996 6.10053 5.56796e-05 6.26856C0.00228131 6.4366 0.0711264 6.59688 0.191463 6.71418L3.8255 10.2572L2.96694 15.2602C2.94681 15.3766 2.95969 15.4963 3.00412 15.6057C3.04855 15.7151 3.12275 15.8099 3.21832 15.8793C3.31388 15.9488 3.42698 15.99 3.54479 15.9984C3.6626 16.0068 3.78041 15.982 3.88485 15.9269L8.37745 13.5648L12.87 15.9269C12.9927 15.9922 13.1351 16.0139 13.2716 15.9902C13.6158 15.9308 13.8473 15.6044 13.788 15.2602L12.9294 10.2572L16.5634 6.71418C16.6623 6.61724 16.7276 6.49064 16.7474 6.35216C16.8008 6.00597 16.5595 5.68549 16.2133 5.63406Z" fill="#FDBE0F" />
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
                                                  <div className="z-10 absolute  w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                                                      <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioButton">
                                                          <li>
                                                              <div className="flex items-center">
                                                                  <input id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 text-teal-500 bg-gray-100 border-gray-300 focus:ring-teal-500 dark:focus:ring-text-teal-500 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                                  <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Terbaru</label>
                                                              </div>
                                                          </li>
                                                          <li>
                                                              <div className="flex items-center">
                                                                  <input checked id="default-radio-2" type="radio" value="" name="default-radio" className="w-4 h-4 text-teal-500 bg-gray-100 border-gray-300 focus:ring-teal-500 dark:focus:ring-text-teal-500 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                                  <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Terpopular</label>
                                                              </div>
                                                          </li>
                                                          <li>
                                                              <div className="flex items-center">
                                                                  <input id="default-radio-3" type="radio" value="" name="default-radio" className="w-4 h-4 text-teal-500 bg-gray-100 border-gray-300 focus:ring-teal-500 dark:focus:ring-text-teal-500 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                                  <label htmlFor="default-radio-3" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ranting</label>
                                                              </div>
                                                          </li>
                                                      </ul>
                                                  </div>
                                              ) : (null)}
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
                                              <path d="M8.57666 1.99712C8.31974 1.55435 7.68034 1.55435 7.42342 1.99712L5.61405 5.11532C5.48713 5.33404 5.26777 5.4833 5.01772 5.52107L1.62685 6.03322C1.05733 6.11924 0.857554 6.83831 1.30109 7.20578L3.82715 9.29859C4.06098 9.49232 4.17093 9.7979 4.11412 10.0962L3.45335 13.5663C3.34889 14.1148 3.92475 14.541 4.41885 14.2809L7.61179 12.5997C7.85481 12.4717 8.14527 12.4717 8.38829 12.5997L11.5812 14.2809C12.0753 14.541 12.6512 14.1148 12.5467 13.5663L11.886 10.0962C11.8292 9.7979 11.9391 9.49232 12.1729 9.29859L14.699 7.20578C15.1425 6.83832 14.9428 6.11924 14.3732 6.03322L10.9824 5.52107C10.7323 5.4833 10.5129 5.33404 10.386 5.11532L8.57666 1.99712Z" fill="#FFC124" />
                                          </svg>
                                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <path d="M8.57666 1.99712C8.31974 1.55435 7.68034 1.55435 7.42342 1.99712L5.61405 5.11532C5.48713 5.33404 5.26777 5.4833 5.01772 5.52107L1.62685 6.03322C1.05733 6.11924 0.857554 6.83831 1.30109 7.20578L3.82715 9.29859C4.06098 9.49232 4.17093 9.7979 4.11412 10.0962L3.45335 13.5663C3.34889 14.1148 3.92475 14.541 4.41885 14.2809L7.61179 12.5997C7.85481 12.4717 8.14527 12.4717 8.38829 12.5997L11.5812 14.2809C12.0753 14.541 12.6512 14.1148 12.5467 13.5663L11.886 10.0962C11.8292 9.7979 11.9391 9.49232 12.1729 9.29859L14.699 7.20578C15.1425 6.83832 14.9428 6.11924 14.3732 6.03322L10.9824 5.52107C10.7323 5.4833 10.5129 5.33404 10.386 5.11532L8.57666 1.99712Z" fill="#FFC124" />
                                          </svg>
                                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <path d="M8.57666 1.99712C8.31974 1.55435 7.68034 1.55435 7.42342 1.99712L5.61405 5.11532C5.48713 5.33404 5.26777 5.4833 5.01772 5.52107L1.62685 6.03322C1.05733 6.11924 0.857554 6.83831 1.30109 7.20578L3.82715 9.29859C4.06098 9.49232 4.17093 9.7979 4.11412 10.0962L3.45335 13.5663C3.34889 14.1148 3.92475 14.541 4.41885 14.2809L7.61179 12.5997C7.85481 12.4717 8.14527 12.4717 8.38829 12.5997L11.5812 14.2809C12.0753 14.541 12.6512 14.1148 12.5467 13.5663L11.886 10.0962C11.8292 9.7979 11.9391 9.49232 12.1729 9.29859L14.699 7.20578C15.1425 6.83832 14.9428 6.11924 14.3732 6.03322L10.9824 5.52107C10.7323 5.4833 10.5129 5.33404 10.386 5.11532L8.57666 1.99712Z" fill="#FFC124" />
                                          </svg>
                                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <path d="M8.57666 1.99712C8.31974 1.55435 7.68034 1.55435 7.42342 1.99712L5.61405 5.11532C5.48713 5.33404 5.26777 5.4833 5.01772 5.52107L1.62685 6.03322C1.05733 6.11924 0.857554 6.83831 1.30109 7.20578L3.82715 9.29859C4.06098 9.49232 4.17093 9.7979 4.11412 10.0962L3.45335 13.5663C3.34889 14.1148 3.92475 14.541 4.41885 14.2809L7.61179 12.5997C7.85481 12.4717 8.14527 12.4717 8.38829 12.5997L11.5812 14.2809C12.0753 14.541 12.6512 14.1148 12.5467 13.5663L11.886 10.0962C11.8292 9.7979 11.9391 9.49232 12.1729 9.29859L14.699 7.20578C15.1425 6.83832 14.9428 6.11924 14.3732 6.03322L10.9824 5.52107C10.7323 5.4833 10.5129 5.33404 10.386 5.11532L8.57666 1.99712Z" fill="#FFC124" />
                                          </svg>
                                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <path d="M8.57666 1.99712C8.31974 1.55435 7.68034 1.55435 7.42342 1.99712L5.61405 5.11532C5.48713 5.33404 5.26777 5.4833 5.01772 5.52107L1.62685 6.03322C1.05733 6.11924 0.857554 6.83831 1.30109 7.20578L3.82715 9.29859C4.06098 9.49232 4.17093 9.7979 4.11412 10.0962L3.45335 13.5663C3.34889 14.1148 3.92475 14.541 4.41885 14.2809L7.61179 12.5997C7.85481 12.4717 8.14527 12.4717 8.38829 12.5997L11.5812 14.2809C12.0753 14.541 12.6512 14.1148 12.5467 13.5663L11.886 10.0962C11.8292 9.7979 11.9391 9.49232 12.1729 9.29859L14.699 7.20578C15.1425 6.83832 14.9428 6.11924 14.3732 6.03322L10.9824 5.52107C10.7323 5.4833 10.5129 5.33404 10.386 5.11532L8.57666 1.99712Z" fill="#FFC124" />
                                          </svg>
                                      </div>
                                  </div>
                                  <div className='border-t-2 h-5'></div>
                                  <div className="pt-[14px]">
                                      <p className='text-[14px] font-normal'>Paket ini sangat rekomended  apalagi untuk pasangan dengan budget pas-pasan. Harga Murah tapi kualitas tidak murahan.berulang-ulang untuk bisa dapetin hasil yg kita mau. Thanks for the help, best wishes!</p>
                                  </div>
                                  <div className='flex flex-row items-center gap-2 mt-[10px]'>
                                      <img src={Wedding} className="w-[72px] h-[72px] rounded-lg" />
                                      <img src={Wedding} className="w-[72px] h-[72px] rounded-lg" />
                                      <img src={Wedding} className="w-[72px] h-[72px] rounded-lg" />
                                  </div>
                                  <div className='mt-[12px]'>
                                      <h1 className='text-[12px] text-gray-400'>2 hari yang lalu</h1>
                                  </div>

                              </div>

                          </div>
                          <div className='flex items-center lg:justify-end justify-center mt-[30px] gap-[5px]'>
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
                        <div className='lg:col-span-5 col-span-6'>
                          <div className="flex flex-wrap bg-white rounded-[12px] p-[30px]">
                              <div className="w-full">
                                  <h1 className='text-[20px] font-inter font-medium text-black text-center py-3'>Paket Layanan</h1>
                                  <div className='flex items-center gap-2 w-full'>
                                    
                                        <button className={`w-full ${openTab === 1 ? 'bg-[#F6F6F6] py-[6px] rounded-[12px]' : ''}`} onClick={() => setOpenTab(1)}>
                                            <h1 className={`text-[#081C4F] font-semibold ${openTab === 1 ? 'underline underline-offset-2' : ''}`}>Starter</h1>
                                        </button>
                                        <button className={`w-full ${openTab === 2 ? 'bg-[#F6F6F6] py-[6px] rounded-[12px]' : ''}`} onClick={() => setOpenTab(2)}>
                                            <h1 className={`text-[#081C4F] font-semibold ${openTab === 2 ? 'underline underline-offset-2' : ''}`}>Medium </h1>
                                        </button>
                                        <button className={`w-full ${openTab === 3 ? 'bg-[#F6F6F6] py-[6px] rounded-[12px]' : ''}`} onClick={() => setOpenTab(3)}>
                                            <h1 className={`text-[#081C4F] font-semibold ${openTab === 3 ? 'underline underline-offset-2' : ''}`}>Expert</h1>
                                        </button>
                                  </div>
                                  <div className="relative flex flex-col min-w-0 break-words mt-[24px] w-full">
                                      <div className="px-4 py-5 flex-auto">
                                          <div className="tab-content tab-space">
                                              
                                              <div className={openTab === 1 ? "block" : "hidden"} id={1}>
                                                  <div className='mb-[24px]'>
                                                      <p className='text-[14px] font-[500] text-[#64748B]'>
                                                        Paket Starter cocok untuk kamu yang memiliki budget minimal namun ingin mendapat yang maksimal.  
                                                      </p>
                                                  </div>
                                                  <div className='mb-6 space-y-2'>
                                                    <h2 className='text-[14px] font-[500] text-[#64748B]'>1. Sudah termasuk dengan MC </h2>
                                                    <h2 className='text-[14px] font-[500] text-[#64748B]'>2. Sudah termasuk 1 fotografer</h2>
                                                    <h2 className='text-[14px] font-[500] text-[#64748B]'>1. Sudah termasuk dengan MC </h2>
                                                    <h2 className='text-[14px] font-[500] text-[#64748B]'>2. Sudah termasuk 1 fotografer</h2>
                                                    <h2 className='text-[14px] font-[500] text-[#64748B]'>1. Sudah termasuk dengan MC </h2>
                                                    <h2 className='text-[14px] font-[500] text-[#64748B]'>2. Sudah termasuk 1 fotografer</h2>
                                                  </div>
                                                  {/* Donwload Portofolio */}
                                                  {/* <div className='mb-6'>
                                                      <div className='relative'>
                                                          <select name='' className='rounded-[12px] outline-none border bg-[#FAFAFA] text-[#5C5C5C] border-[#E3E8F1] w-full appearance-none px-[20px] py-[15px] relative text-sm font-[500]'>
                                                              <option value="" disabled>Ketersediaan Tanggal Booking</option>
                                                              <option value={''}>Ketersediaan Tanggal Booking</option>

                                                          </select>
                                                          <img src={IconDropdown} className='absolute top-6 right-4' alt='' />
                                                      </div>
                                                      <div className='relative mt-6'>
                                                          <button  className='rounded-[12px] text-start outline-none border bg-[#FAFAFA] text-[#5C5C5C] border-[#E3E8F1] w-full appearance-none px-[20px] py-[15px] relative text-sm font-[500] flex items-center justify-between'>
                                                              <h1>Unduh Portfolio</h1>
                                                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M14.25 2.5C14.25 2.36193 14.1381 2.25 14 2.25H7C5.48122 2.25 4.25 3.48122 4.25 5V19C4.25 20.5188 5.48122 21.75 7 21.75H17C18.5188 21.75 19.75 20.5188 19.75 19V9.14706C19.75 9.00899 19.6381 8.89706 19.5 8.89706H15C14.5858 8.89706 14.25 8.56127 14.25 8.14706V2.5ZM14.0315 13.1643C14.355 12.9056 14.8269 12.958 15.0857 13.2815C15.3444 13.6049 15.292 14.0769 14.9685 14.3357L12.4746 16.3308C12.3459 16.4361 12.1816 16.4994 12.0025 16.5L12.0001 16.5L11.9937 16.5C11.8177 16.4985 11.6561 16.4364 11.5288 16.3335L9.03151 14.3357C8.70806 14.0769 8.65562 13.6049 8.91438 13.2815C9.17313 12.958 9.6451 12.9056 9.96855 13.1643L11.2501 14.1896V10.75C11.2501 10.3358 11.5858 10 12.0001 10C12.4143 10 12.7501 10.3358 12.7501 10.75V14.1895L14.0315 13.1643Z" fill="black" />
                                                                  <path d="M15.75 2.82414C15.75 2.63964 15.9426 2.5225 16.0862 2.63839C16.2071 2.736 16.3158 2.85036 16.4085 2.97955L19.4217 7.17745C19.4903 7.27302 19.416 7.39706 19.2983 7.39706H16C15.8619 7.39706 15.75 7.28513 15.75 7.14706V2.82414Z" fill="black" />
                                                              </svg>
                                                          </button>
                                                      </div>
                                                  </div> */}
                                                  <div className=''>
                                                      <div className='flex items-center gap-2'>
                                                          <p className="line-through text-gray-500">Rp. 12.000</p>
                                                          {/* Nominal Rp  */}
                                                          <div className="bg-[#FDE5D9] text-[#E6193B] p-2 font-medium text-[10px] rounded-lg">Rp. 120.000</div>
                                                          {/* Nominal Percent */}
                                                          <div className="bg-[#FDE5D9] text-[#E6193B] p-2 font-medium text-[10px] rounded-lg">12 %</div>
                                                        
                                                      </div>
                                                      <h1 className='text-[#2D014B] font-[900] text-[20px]'>Rp. 12.000.000</h1>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
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

export default DetailListLayananPartner;
