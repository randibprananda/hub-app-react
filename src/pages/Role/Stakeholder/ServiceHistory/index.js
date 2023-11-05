import { Add, Close } from '@mui/icons-material';
import { Backdrop, Box, Fade, Modal } from '@mui/material';
import React, { useEffect } from 'react';
import {
  IconBuilding,
  IconDesignTools,
  IconNext,
  IconServiceStakholder,
  IconShop,
  IconUser,
  IconUserGroup,
  ServiceEmptyVector,
  Shop,
  Wedding,
} from '../../../../assets';
import { FooterTwo, Navbar } from '../../../../component';

import moment from 'moment';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import Api from '../../../../Api';
import Card4 from '../../../../component/Card/Card4';
import imageHandle from '../../../../utils/imageHandle';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
  'border-radius': '8px',
};

const modalWrapper = {
  overflow: 'auto',
  maxHeight: '100vh',
  display: 'flex',
};

const modalBlock = {
  position: 'relative',
  zIndex: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 'auto',
};
const modalContentStyle = {
  position: 'relative',
  background: 'white',
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
};

function ServiceHistory() {
  const [index, setIndex] = useState(1);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [data, setData] = useState([]);
  const [dataDetail, setDataDetail] = useState([]);
  const [type, setType] = useState('eo');
  const [page, setPage] = useState(1);
  const [limit, setlimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [openDetail, setOpenDetail] = useState(false);

  const handleOpenDetail = async(service, id) => {
    try {
        const response = await Api.getRiwayatLayananDetailStakeholder(localStorage.getItem('token-hub'), service, id)
        setDataDetail(response.data.data)
        console.log(response.data.data)
        setOpenDetail(true);
    } catch (error) {
        console.log(error)
    }
};
const handleCloseDetail = () => setOpenDetail(false);

  const getHistory = async () => {
    try {
      const response = await Api.getRiwayatLayananStakeholder(localStorage.getItem('token-hub'), type, page, limit);
      setData(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const getHistoryById = async (id) => {
    try {
      const response = await Api.getHistoryServiceById(localStorage.getItem('token-hub'), id);
      setDataDetail(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHistory(type);
  }, [type, page]);

  return (
    <div className='bg-[#E3E8F1] min-h-screen'>
      <Navbar />
      <div className='md:px-[75px] px-[36px] pt-[120px] pb-[10px] md:pt-[140px] md:pb-[30px] mb-10'>
        <div className='flex flex-wrap items-center gap-3 mb-[30px]'>
          <Link
            to={''}
            className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>
            Beranda
          </Link>
          <img src={IconNext} />
          <Link
            to={'/dashboard-stakeholder'}
            className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>
            Beranda Profile
          </Link>
          <img src={IconNext} />
          <Link
            to={''}
            className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>
            Riwayat Layanan
          </Link>
        </div>
        <div className='py-4 space-y-8 bg-white rounded-xl md:py-7 md:px-14 px-7'>
          <div className='flex flex-wrap items-center justify-between gap-5'>
            <div className='space-y-2.5'>
              <p className='text-2xl font-semibold text-black-k'>Layanan </p>
              <p className='text-sm font-medium text-dark-5'>{data.length} Total Layanan</p>
            </div>
            <div className='flex flex-wrap lg:gap-7 md:gap-3.5 gap-2'>
              <button
                onClick={() => {
                  setIndex(1);
                  setType('EO');
                }}
                className={`flex items-center gap-2.5 p-3 text-xs font-semibold ${
                  index == 1 ? 'bg-primary hover:bg-primary/75 text-white' : 'bg-dark-8 text-light-gray hover:bg-dark-6'
                } rounded-lg`}>
                <svg
                  width='25'
                  height='24'
                  viewBox='0 0 25 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M16.6583 8.23285C16.6583 10.5825 14.7851 12.4666 12.449 12.4666C10.1129 12.4666 8.23974 10.5825 8.23974 8.23285C8.23974 5.88227 10.1129 4 12.449 4C14.7851 4 16.6583 5.88227 16.6583 8.23285ZM12.449 20C9.01785 20 6.08809 19.456 6.08809 17.2802C6.08809 15.1034 8.99904 14.5396 12.449 14.5396C15.8802 14.5396 18.81 15.0836 18.81 17.2604C18.81 19.4362 15.899 20 12.449 20ZM18.4571 8.30922C18.4571 9.50703 18.0998 10.6229 17.473 11.5505C17.4086 11.646 17.4659 11.7748 17.5796 11.7946C17.7363 11.8216 17.8984 11.8369 18.0631 11.8414C19.7062 11.8846 21.1809 10.821 21.5883 9.21974C22.1918 6.84123 20.4198 4.7059 18.1634 4.7059C17.9181 4.7059 17.6835 4.73201 17.4551 4.77884C17.4238 4.78605 17.3907 4.80046 17.3728 4.82838C17.3513 4.8626 17.3674 4.90853 17.3889 4.93825C18.0667 5.8938 18.4571 7.05918 18.4571 8.30922ZM21.1782 13.5126C22.2823 13.7296 23.0084 14.1727 23.3093 14.8166C23.5636 15.3453 23.5636 15.9586 23.3093 16.4864C22.849 17.4851 21.3654 17.8058 20.7887 17.8886C20.6696 17.9066 20.5738 17.8031 20.5864 17.6833C20.8809 14.9157 18.5377 13.6035 17.9315 13.3018C17.9055 13.2883 17.9002 13.2676 17.9028 13.255C17.9046 13.246 17.9154 13.2316 17.9351 13.2289C19.2468 13.2046 20.6571 13.3847 21.1782 13.5126ZM6.93711 11.8413C7.10186 11.8368 7.26304 11.8224 7.42063 11.7945C7.53434 11.7747 7.59165 11.6459 7.52718 11.5504C6.9004 10.6228 6.54313 9.50694 6.54313 8.30913C6.54313 7.05909 6.93353 5.89371 7.61135 4.93816C7.63284 4.90844 7.64806 4.86251 7.62746 4.82829C7.60956 4.80127 7.57553 4.78596 7.54509 4.77875C7.31586 4.73192 7.08127 4.70581 6.83593 4.70581C4.57951 4.70581 2.80751 6.84114 3.41191 9.21965C3.81932 10.8209 5.29405 11.8845 6.93711 11.8413ZM7.09694 13.2545C7.09962 13.268 7.09425 13.2878 7.06918 13.3022C6.4621 13.6039 4.11883 14.9161 4.41342 17.6827C4.42595 17.8034 4.33104 17.9061 4.21195 17.889C3.63531 17.8061 2.15163 17.4855 1.69139 16.4867C1.4362 15.9581 1.4362 15.3457 1.69139 14.817C1.99225 14.1731 2.71752 13.73 3.82156 13.512C4.34358 13.385 5.75294 13.2049 7.0656 13.2292C7.0853 13.2319 7.09515 13.2464 7.09694 13.2545Z'
                    fill={index == 1 ? 'white' : '#C0C6D4'}
                  />
                </svg>
                <span>Event Organizer</span>
              </button>
              <button
                onClick={() => {
                  setIndex(2);
                  setType('VENUE');
                }}
                className={`flex items-center gap-2.5 p-3 text-xs font-semibold ${
                  index == 2 ? 'bg-primary hover:bg-primary/75 text-white' : 'bg-dark-8 text-light-gray hover:bg-dark-6'
                } rounded-lg`}>
                <svg
                  width='25'
                  height='24'
                  viewBox='0 0 25 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M11.8196 3H5.58961C3.59961 3 2.59961 4.01 2.59961 6.02V22H7.99961V18.25C7.99961 17.84 8.33961 17.5 8.74961 17.5C9.15961 17.5 9.49961 17.83 9.49961 18.25V22H14.7996V6.02C14.7996 4.01 13.8096 3 11.8196 3ZM11.2496 12.75H6.29961C5.88961 12.75 5.54961 12.41 5.54961 12C5.54961 11.59 5.88961 11.25 6.29961 11.25H11.2496C11.6596 11.25 11.9996 11.59 11.9996 12C11.9996 12.41 11.6596 12.75 11.2496 12.75ZM11.2496 9H6.29961C5.88961 9 5.54961 8.66 5.54961 8.25C5.54961 7.84 5.88961 7.5 6.29961 7.5H11.2496C11.6596 7.5 11.9996 7.84 11.9996 8.25C11.9996 8.66 11.6596 9 11.2496 9Z'
                    fill={index == 2 ? 'white' : '#C0C6D4'}
                  />
                  <path
                    d='M23.5 21.2501H21.23V18.2501C22.18 17.9401 22.87 17.0501 22.87 16.0001V14.0001C22.87 12.6901 21.8 11.6201 20.49 11.6201C19.18 11.6201 18.11 12.6901 18.11 14.0001V16.0001C18.11 17.0401 18.79 17.9201 19.72 18.2401V21.2501H1.5C1.09 21.2501 0.75 21.5901 0.75 22.0001C0.75 22.4101 1.09 22.7501 1.5 22.7501H20.43C20.45 22.7501 20.46 22.7601 20.48 22.7601C20.5 22.7601 20.51 22.7501 20.53 22.7501H23.5C23.91 22.7501 24.25 22.4101 24.25 22.0001C24.25 21.5901 23.91 21.2501 23.5 21.2501Z'
                    fill={index == 2 ? 'white' : '#C0C6D4'}
                  />
                </svg>
                <span>Venue</span>
              </button>
              <button
                onClick={() => {
                  setIndex(3);
                  setType('PRODUCT');
                }}
                className={`flex items-center gap-2.5 p-3 text-xs font-semibold ${
                  index == 3 ? 'bg-primary hover:bg-primary/75 text-white' : 'bg-dark-8 text-light-gray hover:bg-dark-6'
                } rounded-lg`}>
                <svg
                  width='25'
                  height='24'
                  viewBox='0 0 25 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M21.5391 13.2799L20.6191 12.3799L12.8691 20.1199L13.7991 21.0499C14.5791 21.8299 15.3891 22.2199 16.1891 22.2199C16.9891 22.2199 17.7991 21.8299 18.5791 21.0499L21.5391 18.0899C23.1291 16.4899 23.1291 14.8799 21.5391 13.2799Z'
                    fill={index == 3 ? 'white' : '#C0C6D4'}
                  />
                  <path
                    d='M11.1898 2.92994C9.61976 1.35994 7.96977 1.35994 6.39977 2.92994L3.42977 5.88994C1.86977 7.45994 1.86977 9.10994 3.42977 10.6799L4.34977 11.5999L12.0998 3.84994L11.1898 2.92994Z'
                    fill={index == 3 ? 'white' : '#C0C6D4'}
                  />
                  <path
                    d='M22.3098 3.94009C20.9998 7.21009 18.0098 11.4801 15.1598 14.2701C14.7498 11.6901 12.6898 9.67009 10.0898 9.31009C12.8898 6.45009 17.1898 3.42009 20.4698 2.10009C21.0498 1.88009 21.6298 2.05009 21.9898 2.41009C22.3698 2.79009 22.5498 3.36009 22.3098 3.94009Z'
                    fill={index == 3 ? 'white' : '#C0C6D4'}
                  />
                  <path
                    d='M14.2791 15.09C14.0791 15.26 13.8791 15.43 13.6791 15.59L11.8891 17.02C11.8891 16.99 11.8791 16.95 11.8791 16.91C11.7391 15.84 11.2391 14.85 10.4291 14.04C9.60914 13.22 8.58914 12.72 7.46914 12.58C7.43914 12.58 7.39914 12.57 7.36914 12.57L8.81914 10.74C8.95914 10.56 9.10914 10.39 9.26914 10.21L9.94914 10.3C12.0991 10.6 13.8291 12.29 14.1691 14.43L14.2791 15.09Z'
                    fill={index == 3 ? 'white' : '#C0C6D4'}
                  />
                  <path
                    d='M10.9298 17.6198C10.9298 18.7198 10.5098 19.7698 9.70976 20.5598C9.09976 21.1798 8.27977 21.5998 7.27977 21.7198L4.82976 21.9898C3.48976 22.1398 2.33976 20.9898 2.48976 19.6398L2.75976 17.1798C2.99976 14.9898 4.82976 13.5898 6.76976 13.5498C6.95976 13.5398 7.16976 13.5498 7.36976 13.5698C8.21976 13.6798 9.03976 14.0698 9.72976 14.7498C10.3998 15.4198 10.7798 16.2098 10.8898 17.0398C10.9098 17.2398 10.9298 17.4298 10.9298 17.6198Z'
                    fill={index == 3 ? 'white' : '#C0C6D4'}
                  />
                </svg>
                <span>Peralatan</span>
              </button>
              <button
                onClick={() => {
                  setIndex(4);
                  setType('TALENT');
                }}
                className={`flex items-center gap-2.5 p-3 text-xs font-semibold ${
                  index == 4 ? 'bg-primary hover:bg-primary/75 text-white' : 'bg-dark-8 text-light-gray hover:bg-dark-6'
                } rounded-lg`}>
                <svg
                  width='25'
                  height='24'
                  viewBox='0 0 25 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M20.0099 5.85L14.0699 2.42C13.0999 1.86 11.8999 1.86 10.9199 2.42L4.98992 5.85C4.01992 6.41 3.41992 7.45 3.41992 8.58V15.42C3.41992 16.54 4.01992 17.58 4.98992 18.15L10.9299 21.58C11.8999 22.14 13.0999 22.14 14.0799 21.58L20.0199 18.15C20.9899 17.59 21.5899 16.55 21.5899 15.42V8.58C21.5799 7.45 20.9799 6.42 20.0099 5.85ZM12.4999 7.34C13.7899 7.34 14.8299 8.38 14.8299 9.67C14.8299 10.96 13.7899 12 12.4999 12C11.2099 12 10.1699 10.96 10.1699 9.67C10.1699 8.39 11.2099 7.34 12.4999 7.34ZM15.1799 16.66H9.81992C9.00992 16.66 8.53992 15.76 8.98992 15.09C9.66992 14.08 10.9899 13.4 12.4999 13.4C14.0099 13.4 15.3299 14.08 16.0099 15.09C16.4599 15.75 15.9799 16.66 15.1799 16.66Z'
                    fill={index == 4 ? 'white' : '#C0C6D4'}
                  />
                </svg>
                <span>Talent</span>
              </button>
            </div>
          </div>
          {index == 1 ? (
            <>
              <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-[30px]'>
                {data.length > 0 ? (
                  data.map((val, index) => {
                    console.log(val)
                    return (
                        <div key={index} className='w-full min-h-[400px] border rounded-[8px] shadow-md py-[17px] px-[16px] space-y-[20px]'>
                            <div className='h-[144px] border w-full rounded-[4px] bg-cover p-[8px]' style={{ backgroundImage: `url(${imageHandle(val.image)})` }}>
                                <img alt='icon' src={IconServiceStakholder}/>
                            </div>
                            <div className={`py-[6px] px-[10px] w-fit rounded-[8px] border ${val.payment_status === 'COMPLETE' ? 'border-[#00AF99] bg-[#E7F7F3]' : val.payment_status === 'UNPAID' ? 'border-[#F2AA67] bg-[#FFF8ED]' : val.payment_status === 'PAID' ? 'border-[#54A5F0] bg-[#ECF8FF]' : val.payment_status === 'FAILED' ? 'border-[#F05454] bg-[#FFEDED]' : null}`}>
                                <p className={`text-sm capitalize ${val.payment_status === 'COMPLETE' ? 'text-[#00AF99]' : val.payment_status === 'UNPAID' ? 'text-[#F2AA67]' : val.payment_status === 'PAID' ? 'text-[#54A5F0]' : val.payment_status === 'FAILED' ? 'text-[#F05454]' : null}`}>
                                    {val.payment_status === 'COMPLETE' ? 'Complete' : val.payment_status === 'UNPAID' ? 'Belum Bayar' : val.payment_status === 'PAID' ? 'Sudah Bayar' : val.payment_status === 'FAILED' ? 'Batal' : null}
                                </p>
                            </div>
                            <div className='space-y-[4px] '>
                                <h1 className='text-[#475569] text-[18px] line-clamp-1'>{val.service_type == 'EO' ? val.service_name : val.service_type == 'VENUE' ? val.service_name : val.service_type == 'TALENT' ? val.service_name : val.service_type == 'PRODUCT' ? val.service_name : "undefined"}</h1>
                                <h1 className='text-[#C0C6D4] font-semibold text-[18px] line-clamp-1'>{val.company_name}</h1>
                            </div>
                            <h1 className='text-[#1A1A1A] text-[20px] font-semibold'>Rp. {val.price}</h1>
                            <button className='mb-[8px] w-full bg-cherry shadow-sm text-white py-2 text-xs md:text-sm rounded-[8px]' onClick={() => handleOpenDetail(val.service_type, val.id)} >Detail</button>
                        </div>
                    )
                  })
                ) : (
                  <div className='flex items-center justify-center col-span-4'>
                    <img src={ServiceEmptyVector} />
                  </div>
                )}
              </div>
              <div className='flex justify-center'>
                <ReactPaginate
                  breakLabel={<span className='mr-4'>...</span>}
                  nextLabel={
                    <span
                      className='flex items-center justify-center w-6 h-6 border-2 rounded-full md:w-12 md:h-12 hover:bg-cherry hover:text-white'
                      onClick={() => page < totalPages && setPage(page + 1)}>
                      <svg
                        width='16'
                        height='16'
                        viewBox='0 0 16 16'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M6.94 4L6 4.94L9.05333 8L6 11.06L6.94 12L10.94 8L6.94 4Z'
                          fill='currentColor'
                        />
                      </svg>
                    </span>
                  }
                  pageRangeDisplayed={limit}
                  pageCount={totalPages}
                  previousLabel={
                    <span
                      className='flex items-center justify-center w-6 h-6 border-2 rounded-full md:w-12 md:h-12 hover:bg-cherry hover:text-white'
                      onClick={() => totalPages > page > 1 && setPage(page - 1)}>
                      <svg
                        width='16'
                        height='16'
                        viewBox='0 0 16 16'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M10.06 12L11 11.06L7.94667 8L11 4.94L10.06 4L6.06 8L10.06 12Z'
                          fill='currentColor'
                        />
                      </svg>
                    </span>
                  }
                  // renderOnZeroPageCount={null}
                  containerClassName='flex flex-wrap items-center justify-center md:space-x-10 space-x-2'
                  disabledClassName='md:w-12 w-6 md:h-12 h-6 rounded-full border-2 flex items-center justify-center'
                  activeClassName='md:w-12 w-7 md:h-12 h-7 rounded-full border-2 bg-cherry text-white flex items-center justify-center'
                />
              </div>
            </>
          ) : null}
          {index == 2 ? (
            <>
              <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1'>
                {data.length > 0 ? (
                  data.map((val, index) => (
                    <div key={index}>
                      <Card4
                        click={() => {
                          setOpen(true);
                          getHistoryById(val.id);
                        }}
                        price={val.price}
                        link=''
                        buttonText='Detail Booking'
                        color='cherry'
                        title={val.service_name}
                        company={val.company}
                        image={val.image}
                      />
                    </div>
                  ))
                ) : (
                  <div className='flex items-center justify-center col-span-4'>
                    <img src={ServiceEmptyVector} />
                  </div>
                )}
              </div>
              <div className='flex justify-center'>
                <ReactPaginate
                  breakLabel={<span className='mr-4'>...</span>}
                  nextLabel={
                    <span
                      className='flex items-center justify-center w-6 h-6 border-2 rounded-full md:w-12 md:h-12 hover:bg-cherry hover:text-white'
                      onClick={() => page < totalPages && setPage(page + 1)}>
                      <svg
                        width='16'
                        height='16'
                        viewBox='0 0 16 16'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M6.94 4L6 4.94L9.05333 8L6 11.06L6.94 12L10.94 8L6.94 4Z'
                          fill='currentColor'
                        />
                      </svg>
                    </span>
                  }
                  pageRangeDisplayed={limit}
                  pageCount={totalPages}
                  previousLabel={
                    <span
                      className='flex items-center justify-center w-6 h-6 border-2 rounded-full md:w-12 md:h-12 hover:bg-cherry hover:text-white'
                      onClick={() => totalPages > page > 1 && setPage(page - 1)}>
                      <svg
                        width='16'
                        height='16'
                        viewBox='0 0 16 16'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M10.06 12L11 11.06L7.94667 8L11 4.94L10.06 4L6.06 8L10.06 12Z'
                          fill='currentColor'
                        />
                      </svg>
                    </span>
                  }
                  // renderOnZeroPageCount={null}
                  containerClassName='flex flex-wrap items-center justify-center md:space-x-10 space-x-2'
                  disabledClassName='md:w-12 w-6 md:h-12 h-6 rounded-full border-2 flex items-center justify-center'
                  activeClassName='md:w-12 w-7 md:h-12 h-7 rounded-full border-2 bg-cherry text-white flex items-center justify-center'
                />
              </div>
            </>
          ) : null}
          {index == 3 ? (
            <>
              <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1'>
                {data.length > 0 ? (
                  data.map((val, index) => (
                    <div key={index}>
                      <Card4
                        click={() => {
                          setOpen(true);
                          getHistoryById(val.id);
                        }}
                        price={val.price}
                        link=''
                        buttonText='Detail Booking'
                        color='cherry'
                        title={val.service_name}
                        company={val.company}
                        image={val.image}
                      />
                    </div>
                  ))
                ) : (
                  <div className='flex items-center justify-center col-span-4'>
                    <img src={ServiceEmptyVector} />
                  </div>
                )}
              </div>
              <div className='flex justify-center'>
                <ReactPaginate
                  breakLabel={<span className='mr-4'>...</span>}
                  nextLabel={
                    <span
                      className='flex items-center justify-center w-6 h-6 border-2 rounded-full md:w-12 md:h-12 hover:bg-cherry hover:text-white'
                      onClick={() => page < totalPages && setPage(page + 1)}>
                      <svg
                        width='16'
                        height='16'
                        viewBox='0 0 16 16'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M6.94 4L6 4.94L9.05333 8L6 11.06L6.94 12L10.94 8L6.94 4Z'
                          fill='currentColor'
                        />
                      </svg>
                    </span>
                  }
                  pageRangeDisplayed={limit}
                  pageCount={totalPages}
                  previousLabel={
                    <span
                      className='flex items-center justify-center w-6 h-6 border-2 rounded-full md:w-12 md:h-12 hover:bg-cherry hover:text-white'
                      onClick={() => totalPages > page > 1 && setPage(page - 1)}>
                      <svg
                        width='16'
                        height='16'
                        viewBox='0 0 16 16'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M10.06 12L11 11.06L7.94667 8L11 4.94L10.06 4L6.06 8L10.06 12Z'
                          fill='currentColor'
                        />
                      </svg>
                    </span>
                  }
                  // renderOnZeroPageCount={null}
                  containerClassName='flex flex-wrap items-center justify-center md:space-x-10 space-x-2'
                  disabledClassName='md:w-12 w-6 md:h-12 h-6 rounded-full border-2 flex items-center justify-center'
                  activeClassName='md:w-12 w-7 md:h-12 h-7 rounded-full border-2 bg-cherry text-white flex items-center justify-center'
                />
              </div>
            </>
          ) : null}
          {index == 4 ? (
            <>
              <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1'>
                {data.length > 0 ? (
                  data.map((val, index) => (
                    <div key={index}>
                      <Card4
                        click={() => {
                          setOpen(true);
                          getHistoryById(val.id);
                        }}
                        price={val.price}
                        link=''
                        buttonText='Detail Booking'
                        color='cherry'
                        title={val.service_name}
                        company={val.company}
                        image={val.image}
                      />
                    </div>
                  ))
                ) : (
                  <div className='flex items-center justify-center col-span-4'>
                    <img src={ServiceEmptyVector} />
                  </div>
                )}
              </div>
              <div className='flex justify-center'>
                <ReactPaginate
                  breakLabel={<span className='mr-4'>...</span>}
                  nextLabel={
                    <span
                      className='flex items-center justify-center w-6 h-6 border-2 rounded-full md:w-12 md:h-12 hover:bg-cherry hover:text-white'
                      onClick={() => page < totalPages && setPage(page + 1)}>
                      <svg
                        width='16'
                        height='16'
                        viewBox='0 0 16 16'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M6.94 4L6 4.94L9.05333 8L6 11.06L6.94 12L10.94 8L6.94 4Z'
                          fill='currentColor'
                        />
                      </svg>
                    </span>
                  }
                  pageRangeDisplayed={limit}
                  pageCount={totalPages}
                  previousLabel={
                    <span
                      className='flex items-center justify-center w-6 h-6 border-2 rounded-full md:w-12 md:h-12 hover:bg-cherry hover:text-white'
                      onClick={() => totalPages > page > 1 && setPage(page - 1)}>
                      <svg
                        width='16'
                        height='16'
                        viewBox='0 0 16 16'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M10.06 12L11 11.06L7.94667 8L11 4.94L10.06 4L6.06 8L10.06 12Z'
                          fill='currentColor'
                        />
                      </svg>
                    </span>
                  }
                  // renderOnZeroPageCount={null}
                  containerClassName='flex flex-wrap items-center justify-center md:space-x-10 space-x-2'
                  disabledClassName='md:w-12 w-6 md:h-12 h-6 rounded-full border-2 flex items-center justify-center'
                  activeClassName='md:w-12 w-7 md:h-12 h-7 rounded-full border-2 bg-cherry text-white flex items-center justify-center'
                />
              </div>
            </>
          ) : null}
        </div>
      </div>
      <FooterTwo />
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        sx={modalWrapper}>
        <Fade in={open}>
          <Box sx={modalBlock}>
            <Box sx={modalContentStyle}>
              <div className='space-y-5'>
                <div className='flex items-start justify-between'>
                  <h1 className='text-lg font-semibold text-black'>Detail Booking Layanan</h1>
                  <button
                    onClick={handleClose}
                    className='hover:text-dark-3'>
                    <Close />
                  </button>
                </div>
                <div className='bg-[#D9D9D9] md:px-7 px-3.5 md:py-6 py-3 rounded-lg space-y-4'>
                  <div className='flex gap-5'>
                    <img src={Shop} />
                    <p className='font-semibold text-cherry'>{dataDetail.company_name}</p>
                  </div>
                  <div className='flex flex-wrap gap-6 bg-white px-2.5 py-5 rounded'>
                    <img
                      src={imageHandle(dataDetail?.image)}
                      alt={dataDetail?.service_name}
                      className='rounded w-[109px] lg:w-[260px] h-[75px] lg:h-auto'
                    />
                    <div className='space-y-1 lg:space-y-4'>
                      <h4 className='text-[12px] lg:text-xl text-black-k'>{dataDetail.service_name}</h4>
                      <p className='lg:text-lg italic text-dark-6 text-[10px]'>Variasi : {dataDetail.package_name}</p>
                      <p className='text-[#888888] text-[8px] lg:text-sm'>{dataDetail.qty} Pax</p>
                      <p className='text-[#1A1A1A] text-[12px] lg:text-xl font-semibold'>
                        Rp {parseInt(dataDetail.price).toLocaleString().replaceAll(',', '.')}{' '}
                        <span className='text-[12px] lg:text-sm text-[#888888]'>/pax</span>
                      </p>
                    </div>
                  </div>
                  <div className='w-full rounded px-[10px] py-[18px] bg-white'>
                    <div className='flex gap-[144px]'>
                      <div>
                        <h4 className='font-light text-[10px] lg:text-[14px]'>Nomor Invoice</h4>
                        <p className='font-semibold text-cherry text-[12px] lg:text-[16px]'>
                          {dataDetail.number_invoice}
                        </p>
                      </div>
                      <div>
                        <h4 className='font-light text-[10px] lg:text-[14px]'>Tanggal Invoice</h4>
                        <p className='font-semibold text-cherry text-[12px] lg:text-[16px]'>
                          {moment(dataDetail.date_invoice).format('D/M/YYYY')}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className='font-light text-[10px] lg:text-[14px]'>Status</h4>
                      <p
                        className={`font-semibold text-[12px] lg:text-[16px] ${
                          dataDetail.status === 'UNPAID'
                            ? 'text-red-500'
                            : dataDetail.status === 'PAID'
                            ? 'text-green-500'
                            : dataDetail === 'FAILED'
                            ? 'text-[#8950FC]'
                            : dataDetail === 'COMPLETE'
                            ? 'text-[#0085FF]'
                            : 'text-black'
                        }`}>
                        {dataDetail.status === 'UNPAID'
                          ? 'BELUM DIBAYAR'
                          : dataDetail.status === 'PAID'
                          ? 'DIBAYAR'
                          : dataDetail === 'FAILED'
                          ? 'GAGAL'
                          : dataDetail === 'COMPLETE'
                          ? 'SELESAI'
                          : '-'}
                      </p>
                    </div>
                  </div>
                  <div className='lg:py-6 bg-white rounded lg:px-7 p-[17px]'>
                    <div className='flex justify-between pb-3.5 pt-5 border-dashed border-b-2 border-b-light-gray'>
                      <p className='text-xs text-dark-6'>Subtotal Produk</p>
                      <p className='text-xs text-dark-3 text-end'>
                        Rp{' '}
                        {parseInt(dataDetail.qty * dataDetail.price)
                          .toLocaleString()
                          .replaceAll(',', '.')}
                      </p>
                    </div>
                    {/* <div className='flex justify-between pb-3.5 pt-5 border-dashed border-b-2 border-b-light-gray'>
                                            <p className='text-xs text-dark-6'>Biaya Penanganan</p>
                                            <p className='text-xs text-dark-3 text-end'>Rp 50.000</p>
                                        </div> */}
                    <div className='flex justify-between pb-3.5 pt-5 border-b-2 border-b-black-k'>
                      <p className='text-xs text-dark-6'>Biaya Admin</p>
                      <p className='text-xs text-dark-3 text-end'>
                        Rp {parseInt(dataDetail.admin_fee).toLocaleString().replaceAll(',', '.')}
                      </p>
                    </div>
                    <div className='flex justify-between pb-3.5 pt-5'>
                      <p className='text-xs text-dark-6'>Total Pesanan</p>
                      <p className='text-primary text-end'>
                        Rp {parseInt(dataDetail.total_payment).toLocaleString().replaceAll(',', '.')}
                      </p>
                    </div>
                    <div className='flex justify-between pb-3.5 pt-5'>
                      <p className='text-xs text-dark-6'>Metode Pembayaran</p>
                      <p className='text-xs font-semibold text-black-k text-end'>{dataDetail.payment_method}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Box>
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
    </div>
  );
}

export default ServiceHistory;
