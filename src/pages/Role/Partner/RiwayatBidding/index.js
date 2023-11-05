import { Menu, Transition } from '@headlessui/react';
import { Close } from '@mui/icons-material';
import { Backdrop, Box, Fade, Modal } from '@mui/material';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import Api from '../../../../Api';
import { IconNext, LogoDefault } from '../../../../assets';
import { CardBidding, FooterTwo, Navbar } from '../../../../component';
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
    'border-radius': "8px",
};

const modalWrapper = {
    overflow: "auto",
    maxHeight: "100vh",
    display: "flex",
    width: "100%",
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
    width: "700px",
    '@media (max-width: 600px)': {
      width: "325px",
    },
};

const RiwayatBidding = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [openBiding, setOpenBiding] = useState(false);
    const [selected, setSelected] = useState('Filter');
    const handleSelect = (option) => {
        setIsActive(option);
    };

    const [tenderUser, setTenderUser] = useState('')
    const [tenderResult, setTenderResult] = useState('')
    const [tenderImage, setTenderImage] = useState('')
    const [tenderCategory, setTenderCategory] = useState('')
    const [tenderStakeholder, setTenderStakeholder] = useState('')
    const [tenderBidApp, setTenderBidApp] = useState('')
    const handleOpenBiding = async (id) => {
        setOpen(true)
        try {
            const response = await Api.PartnerGetRiwayatDetail(localStorage.getItem('token-hub'), id)
            setTenderResult(response.data.tenderResult)
            setTenderResult(response.data.tenderResult)
            setTenderBidApp(response.data.tenderResult.bid_applicants)
            setTenderCategory(response.data.tenderResult.partner_category)
            setTenderImage(response.data.tenderResult?.tender_images[0].image)
            setTenderStakeholder(response.data.tenderResult.stakeholder)
            setTenderUser(response.data.user)
        } catch (error) {
            console.log(error)
        }
    };

    const [listRiwayat, setListRiwayat] = useState('')
    const [limit, setLimit] = useState(6)
    const [page, setPage] = useState(1)
    const [pageTotal, setPageTotal] = useState('')
    const [isActive, setIsActive] = useState('Filter')

    const getData = async() => {
        try {
            const response = await Api.PartnerGetRiwayat(localStorage.getItem('token-hub'), limit, page, isActive)
            setListRiwayat(response.data.pagination.data)
            setPageTotal(response.data.pagination.totalPages)
            
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getData()
    }, [])

    return (
        
        <div className='bg-[#E3E8F1] min-h-screen'>
            <Navbar />
            <div className='md:px-[75px] px-[10px] pt-[120px] pb-[10px] md:pt-[140px] md:pb-[30px]'>
                <div className='flex flex-wrap items-center gap-3 mb-[30px]'>
                    <Link to={''} className='text-black-k text-xs lg:text-sm font-[500] hover:text-primary'>Beranda</Link>
                    <img src={IconNext} alt='' />
                    <Link to={'/dashboard-partner'} className='text-black-k text-xs lg:text-sm font-[500] hover:text-primary'>Beranda Profile</Link>
                </div>
                <div className='py-4 space-y-8 bg-white rounded-xl md:py-7 md:px-14 px-7'>
                    <div className='md:flex md:flex-wrap items-center md:justify-between gap-5'>
                        <div className='space-y-2.5'>
                            <p className='md:text-2xl text-base font-semibold text-black-k'>Bidding</p>
                            <p className='md:text-lg text-xs font-medium text-dark-5'>Riwayat bidding</p>
                            <p className='md:text-sm text-[10px] font-medium text-dark-7'>{listRiwayat.length} Bidding </p>
                        </div>
                        <div className="relative inline-block text-left">
                            <Menu>
                                {({ open }) => (
                                    <>
                                        <span className="rounded-md shadow-sm">
                                            <Menu.Button className="inline-flex items-center justify-center w-full p-3 md:text-base text-xs font-medium bg-white border text-cherry border-cherry rounded-xl hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 md:mt-0 mt-6">
                                                <div className="mr-2 -ml-1">
                                                    <svg className='md:w-5 md:h-5 w-[14px] h-2.5' width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.7" d="M11.202 2.0293C9.96673 2.0293 1.4419 2.0293 1.4419 2.0293C0.20663 2.0293 0 2.34402 0 2.73174C0 3.11893 0.20663 3.43417 1.4419 3.43417H11.202C12.4373 3.43417 12.6439 3.20003 12.6439 2.73174C12.6439 2.34402 12.4373 2.0293 11.202 2.0293Z" fill="#2D014B" />
                                                        <path d="M18.0005 2.38089C18.0005 3.35042 17.2146 4.13671 16.2444 4.13671C15.2747 4.13671 14.4883 3.35042 14.4883 2.38089C14.4883 1.4108 15.2747 0.624512 16.2444 0.624512C17.2146 0.624512 18.0005 1.4108 18.0005 2.38089Z" fill="#2D014B" />
                                                        <path opacity="0.7" d="M6.34747 7.64893H16.1178C17.3543 7.64893 17.5615 7.96365 17.5615 8.35136C17.5615 8.73856 17.3543 9.0538 16.1178 9.0538H6.34747C5.11092 9.0538 4.91762 8.73856 4.91762 8.35136C4.91762 7.96365 5.11092 7.64893 6.34747 7.64893Z" fill="#2D014B" />
                                                        <path d="M0.000500441 8.00052C0.000500441 8.97005 0.786347 9.75634 1.7566 9.75634C2.72628 9.75634 3.5127 8.97005 3.5127 8.00052C3.5127 7.03043 2.72628 6.24414 1.7566 6.24414C0.786347 6.24414 0.000500441 7.03043 0.000500441 8.00052Z" fill="#2D014B" />
                                                        <path opacity="0.7" d="M11.202 13.2686H1.4419C0.20663 13.2686 0 13.5833 0 13.971C0 14.3582 0.20663 14.6734 1.4419 14.6734H11.202C12.4373 14.6734 12.6439 14.3582 12.6439 13.971C12.6439 13.5833 12.4373 13.2686 11.202 13.2686Z" fill="#2D014B" />
                                                        <path d="M18.0005 13.6202C18.0005 14.5897 17.2146 15.376 16.2444 15.376C15.2747 15.376 14.4883 14.5897 14.4883 13.6202C14.4883 12.6501 15.2747 11.8638 16.2444 11.8638C17.2146 11.8638 18.0005 12.6501 18.0005 13.6202Z" fill="#2D014B" />
                                                    </svg>
                                                </div>
                                                {isActive}
                                            </Menu.Button>
                                        </span>

                                        <Transition
                                            show={open}
                                            enter="transition duration-100 ease-out"
                                            enterFrom="transform scale-95 opacity-0"
                                            enterTo="transform scale-100 opacity-100"
                                            leave="transition duration-75 ease-out"
                                            leaveFrom="transform scale-100 opacity-100"
                                            leaveTo="transform scale-95 opacity-0"
                                        >
                                            <Menu.Items
                                                static
                                                className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                            >
                                                <div className="py-1">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                className={`${active ? 'bg-gray-100 text-gray-900 w-full text-start' : 'text-start text-gray-700 w-full'
                                                                    } block px-4 py-2 text-sm`}
                                                                onClick={() => handleSelect(true)}
                                                            >
                                                                Bidding diajukan
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                className={`${active ? 'bg-gray-100 text-gray-900 w-full text-start' : 'text-start text-gray-700 w-full'
                                                                    } block px-4 py-2 text-sm`}
                                                                onClick={() => handleSelect(false)}
                                                            >
                                                                Open Tender ditutup
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                </div>
                                            </Menu.Items>
                                        </Transition>
                                    </>
                                )}
                            </Menu>
                        </div>
                    </div>
                    <div className='space-y-12'>
                        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2 md:grid-cols-1'>
                            {Object.values(listRiwayat).map((data, index) => {
                                return (
                                  <div key={index}>
                                    <CardBidding
                                      openModal={() => handleOpenBiding(data.id)}
                                      title={data.title}
                                      imgProfile={!data.stakeholder ? LogoDefault : imageHandle(data.stakeholder.image)}
                                      author={data.stakeholder.fullname}
                                      desc={data.description}
                                      people={data.participant_estimate}
                                      date={moment(data.implementation_estimate).format('MMMM DD, YYYY')}
                                      budget={data.budget_target}
                                      image={
                                        !data.tender_images[0] ? LogoDefault : imageHandle(data.tender_images[0].image)
                                      }
                                      textBudget='Anggaran'
                                      satuan='Orang'
                                      jml_tender={data.bidApplicantsCount}
                                      jml_target={data.maksimal_partner}
                                      sisa_hari={data.daysLeft}
                                    />
                                    <Modal
                                      aria-labelledby='transition-modal-title'
                                      aria-describedby='transition-modal-description'
                                      open={open}
                                      onClose={handleClose}
                                      closeAfterTransition
                                      BackdropComponent={Backdrop}
                                      BackdropProps={{
                                        timeout: 500
                                      }}
                                      sx={modalWrapper}
                                    >
                                      <Fade in={open}>
                                        <Box sx={modalBlock}>
                                          <Box sx={modalContentStyle}>
                                            <div className='space-y-5'>
                                              <div className='flex items-start justify-between'>
                                                <h1 className='text-lg font-semibold'>Detail Bidding</h1>
                                                <button onClick={handleClose} className='hover:text-dark-3'>
                                                  <Close />
                                                </button>
                                              </div>
                                              <img
                                                src={!tenderImage ? LogoDefault : imageHandle(tenderImage)}
                                                alt=''
                                                className='w-full rounded-xl md:h-80'
                                              />
                                              <div className='py-1.5 px-7 text-xxs w-max border-[#0085FF] border bg-[#DEFDFF] rounded-lg text-[#0085FF]'>
                                                Bidding Diajukan
                                              </div>
                                              {/* <div className='py-1.5 px-7 text-xxs w-max border-[#30DF3F] border bg-[#E8FFF3] rounded-lg text-[#30DF3F]'>
                                                                Pemenang Tender
                                                            </div> */}
                                              {/* <div className='py-1.5 px-7 text-xxs w-max border-[#F64E60] border bg-[#FFE2E5] rounded-lg text-[#F64E60]'>
                                                                Open Tender Ditutup
                                                            </div> */}
                                              <div className='space-y-4'>
                                                <h3>{tenderResult.title}</h3>
                                                <div className='flex items-center gap-2'>
                                                  <div className='relative w-5 h-5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600'>
                                                    <img
                                                      src={
                                                        !tenderStakeholder.image
                                                          ? LogoDefault
                                                          : imageHandle(tenderStakeholder.image)
                                                      }
                                                      className='absolute'
                                                      alt='Konnect Logo'
                                                    />
                                                  </div>
                                                  <p className='text-[10px] text-[#B0B0B0]'>
                                                    {tenderStakeholder.fullname}
                                                  </p>
                                                </div>
                                                <p className='overflow-hidden text-xs text-ellipsis'>
                                                  {tenderResult.description}
                                                </p>
                                                <hr className='my-10 bg-[#E3E8F1] border border-[#DFDFDF]'></hr>
                                                <div className='flex gap-2'>
                                                  <div>
                                                    <h1 className='text-[10px] text-[#454545]'>Estimasi Peserta</h1>
                                                    <div className='flex gap-1 bg-[#F6F6F6] rounded-[4px] p-2'>
                                                      <svg
                                                        width='16'
                                                        height='16'
                                                        viewBox='0 0 16 16'
                                                        fill='none'
                                                        xmlns='http://www.w3.org/2000/svg'
                                                      >
                                                        <path
                                                          d='M12 4.77338C11.96 4.76671 11.9133 4.76671 11.8733 4.77338C10.9533 4.74004 10.22 3.98671 10.22 3.05338C10.22 2.10004 10.9866 1.33337 11.94 1.33337C12.8933 1.33337 13.66 2.10671 13.66 3.05338C13.6533 3.98671 12.92 4.74004 12 4.77338Z'
                                                          stroke='#6A6A6A'
                                                          strokeWidth='1.2'
                                                          strokeLinecap='round'
                                                          strokeLinejoin='round'
                                                        />
                                                        <path
                                                          d='M11.3133 9.62669C12.2267 9.78003 13.2333 9.62003 13.94 9.14669C14.88 8.52003 14.88 7.49336 13.94 6.86669C13.2267 6.39336 12.2067 6.23336 11.2933 6.39336'
                                                          stroke='#6A6A6A'
                                                          strokeWidth='1.2'
                                                          strokeLinecap='round'
                                                          strokeLinejoin='round'
                                                        />
                                                        <path
                                                          d='M3.97995 4.77338C4.01995 4.76671 4.06661 4.76671 4.10661 4.77338C5.02661 4.74004 5.75995 3.98671 5.75995 3.05338C5.75995 2.10004 4.99328 1.33337 4.03995 1.33337C3.08661 1.33337 2.31995 2.10671 2.31995 3.05338C2.32661 3.98671 3.05995 4.74004 3.97995 4.77338Z'
                                                          stroke='#6A6A6A'
                                                          strokeWidth='1.2'
                                                          strokeLinecap='round'
                                                          strokeLinejoin='round'
                                                        />
                                                        <path
                                                          d='M4.66663 9.62669C3.75329 9.78003 2.74663 9.62003 2.03996 9.14669C1.09996 8.52003 1.09996 7.49336 2.03996 6.86669C2.75329 6.39336 3.77329 6.23336 4.68663 6.39336'
                                                          stroke='#6A6A6A'
                                                          strokeWidth='1.2'
                                                          strokeLinecap='round'
                                                          strokeLinejoin='round'
                                                        />
                                                        <path
                                                          d='M7.99997 9.75336C7.95997 9.74669 7.9133 9.74669 7.8733 9.75336C6.9533 9.72002 6.21997 8.96669 6.21997 8.03336C6.21997 7.08002 6.98664 6.31335 7.93997 6.31335C8.8933 6.31335 9.65997 7.08669 9.65997 8.03336C9.6533 8.96669 8.91997 9.72669 7.99997 9.75336Z'
                                                          stroke='#6A6A6A'
                                                          strokeWidth='1.2'
                                                          strokeLinecap='round'
                                                          strokeLinejoin='round'
                                                        />
                                                        <path
                                                          d='M6.05998 11.8534C5.11998 12.48 5.11998 13.5067 6.05998 14.1334C7.12665 14.8467 8.87331 14.8467 9.93998 14.1334C10.88 13.5067 10.88 12.48 9.93998 11.8534C8.87998 11.1467 7.12665 11.1467 6.05998 11.8534Z'
                                                          stroke='#6A6A6A'
                                                          strokeWidth='1.2'
                                                          strokeLinecap='round'
                                                          strokeLinejoin='round'
                                                        />
                                                      </svg>

                                                      <span className='text-[#6A6A6A] text-[10px]'>
                                                        {tenderResult.participant_estimate}
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div>
                                                    <h1 className='text-[10px] text-[#454545]'>Estimasi Pelaksanaan</h1>
                                                    <div className='flex gap-1 bg-[#F6F6F6] rounded-[4px] p-2'>
                                                      <svg
                                                        width='13'
                                                        height='13'
                                                        viewBox='0 0 13 13'
                                                        fill='none'
                                                        xmlns='http://www.w3.org/2000/svg'
                                                      >
                                                        <path
                                                          d='M3.68745 0C3.80812 0 3.92385 0.0479374 4.00918 0.133266C4.09451 0.218595 4.14245 0.334327 4.14245 0.455V1.30585H9.0285V0.46085C9.0285 0.340176 9.07644 0.224445 9.16177 0.139116C9.2471 0.0537874 9.36283 0.00585 9.4835 0.00585C9.60417 0.00585 9.7199 0.0537874 9.80523 0.139116C9.89056 0.224445 9.9385 0.340176 9.9385 0.46085V1.30585H11.7C12.0447 1.30585 12.3752 1.44272 12.619 1.68638C12.8628 1.93004 12.9998 2.26053 13 2.6052V11.7007C12.9998 12.0453 12.8628 12.3758 12.619 12.6195C12.3752 12.8631 12.0447 13 11.7 13H1.3C0.955331 13 0.62477 12.8631 0.380991 12.6195C0.137212 12.3758 0.000172334 12.0453 0 11.7007L0 2.6052C0.000172334 2.26053 0.137212 1.93004 0.380991 1.68638C0.62477 1.44272 0.955331 1.30585 1.3 1.30585H3.23245V0.45435C3.23262 0.333789 3.28064 0.218225 3.36595 0.133037C3.45126 0.047848 3.56689 -1.23021e-07 3.68745 0ZM0.91 5.0323V11.7007C0.91 11.7519 0.920088 11.8026 0.939687 11.8499C0.959286 11.8972 0.988014 11.9402 1.02423 11.9764C1.06044 12.0126 1.10344 12.0414 1.15075 12.061C1.19807 12.0806 1.24878 12.0907 1.3 12.0907H11.7C11.7512 12.0907 11.8019 12.0806 11.8492 12.061C11.8966 12.0414 11.9396 12.0126 11.9758 11.9764C12.012 11.9402 12.0407 11.8972 12.0603 11.8499C12.0799 11.8026 12.09 11.7519 12.09 11.7007V5.0414L0.91 5.0323ZM4.33355 9.50235V10.5852H3.25V9.50235H4.33355ZM7.04145 9.50235V10.5852H5.95855V9.50235H7.04145ZM9.75 9.50235V10.5852H8.66645V9.50235H9.75ZM4.33355 6.9173V8.0002H3.25V6.9173H4.33355ZM7.04145 6.9173V8.0002H5.95855V6.9173H7.04145ZM9.75 6.9173V8.0002H8.66645V6.9173H9.75ZM3.23245 2.2152H1.3C1.24878 2.2152 1.19807 2.22529 1.15075 2.24489C1.10344 2.26449 1.06044 2.29321 1.02423 2.32943C0.988014 2.36564 0.959286 2.40864 0.939687 2.45595C0.920088 2.50327 0.91 2.55398 0.91 2.6052V4.12295L12.09 4.13205V2.6052C12.09 2.55398 12.0799 2.50327 12.0603 2.45595C12.0407 2.40864 12.012 2.36564 11.9758 2.32943C11.9396 2.29321 11.8966 2.26449 11.8492 2.24489C11.8019 2.22529 11.7512 2.2152 11.7 2.2152H9.9385V2.81905C9.9385 2.93972 9.89056 3.05545 9.80523 3.14078C9.7199 3.22611 9.60417 3.27405 9.4835 3.27405C9.36283 3.27405 9.2471 3.22611 9.16177 3.14078C9.07644 3.05545 9.0285 2.93972 9.0285 2.81905V2.2152H4.14245V2.8132C4.14245 2.93387 4.09451 3.0496 4.00918 3.13493C3.92385 3.22026 3.80812 3.2682 3.68745 3.2682C3.56678 3.2682 3.45105 3.22026 3.36572 3.13493C3.28039 3.0496 3.23245 2.93387 3.23245 2.8132V2.2152Z'
                                                          fill='#6A6A6A'
                                                        />
                                                      </svg>

                                                      <span className='text-[#6A6A6A] text-[10px]'>
                                                        {moment(tenderResult.implementation_estimate).format('LL')}
                                                      </span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className='flex flex-wrap items-end gap-3'>
                                                  <div className='mr-10 space-y-1'>
                                                    <p className='text-[#888888] text-xs'>Anggaran</p>
                                                    <p className='font-semibold text-xl text-[#1A1A1A]'>
                                                      Rp{' '}
                                                      {parseInt(tenderResult.budget_target)
                                                        .toLocaleString()
                                                        .replaceAll(',', '.')}
                                                    </p>
                                                  </div>
                                                </div>
                                                <div className='bg-[#F1F1F1] p-5 rounded-lg my-[30px]'>
                                                  <h1 className='text-base font-semibold text-[#888888] mb-3'>
                                                    Daftar Bidding
                                                  </h1>

                                                  <div className='flex items-center justify-between'>
                                                    <div className='flex items-center gap-2'>
                                                      <h1 className='text-[16px] font-medium font-inter'>
                                                        {tenderBidApp.length}
                                                      </h1>
                                                      <h1 className='text-[12px] font-normal font-inter'>Orang</h1>
                                                    </div>
                                                    <div>
                                                      <h1 className='text-[12px] font-normal font-inter text-gray-600'>
                                                        Target {tenderResult.maksimal_partner} orang
                                                      </h1>
                                                    </div>
                                                  </div>
                                                  <progress
                                                    className='w-full progress progress-accent'
                                                    value={tenderBidApp.length}
                                                    max={tenderResult.maksimal_partner}
                                                  ></progress>
                                                  <div className='flex items-center justify-end gap-3 py-2'>
                                                    <svg
                                                      width='14'
                                                      height='14'
                                                      viewBox='0 0 14 14'
                                                      fill='none'
                                                      xmlns='http://www.w3.org/2000/svg'
                                                    >
                                                      <path
                                                        d='M6.99547 1C3.77547 1 1.16797 3.61333 1.16797 6.83333C1.16797 10.0533 3.77547 12.6667 6.99547 12.6667C10.2213 12.6667 12.8346 10.0533 12.8346 6.83333C12.8346 3.61333 10.2213 1 6.99547 1ZM7.0013 11.5C4.42297 11.5 2.33464 9.41167 2.33464 6.83333C2.33464 4.255 4.42297 2.16667 7.0013 2.16667C9.57964 2.16667 11.668 4.255 11.668 6.83333C11.668 9.41167 9.57964 11.5 7.0013 11.5ZM7.29297 3.91667H6.41797V7.41667L9.48047 9.25417L9.91797 8.53667L7.29297 6.97917V3.91667Z'
                                                        fill='#C1121F'
                                                      />
                                                    </svg>

                                                    <h1 className='text-sm text-[#C1121F]'>14 hari lagi</h1>
                                                  </div>
                                                  {Object.values(tenderBidApp).map((data, index) => {
                                                    return (
                                                      <div className='flex items-center justify-between mb-3'>
                                                        <h1
                                                          className={`text-sm ${
                                                            index === 0 ? 'text-primary' : 'text-gray-400'
                                                          }  blur-sm hover:blur-none select-none`}
                                                        >
                                                          {data.partner.company.company_name} -{' '}
                                                          {moment(data.createdAt).format('DD/MM/YYYY')}
                                                        </h1>
                                                        <h1
                                                          className={`text-sm font-semibold ${
                                                            index === 0 ? 'text-primary' : 'text-[#1A1A1A]'
                                                          }`}
                                                        >
                                                          {data.nominal_bidding}
                                                        </h1>
                                                      </div>
                                                    );
                                                  })}
                                                </div>
                                              </div>
                                            </div>
                                          </Box>
                                        </Box>
                                      </Fade>
                                    </Modal>
                                  </div>
                                );
                            })}
                        </div>

                        <div className='flex justify-center'>
                            <ReactPaginate
                                breakLabel={<span className="mr-4">...</span>}
                                nextLabel={
                                    <span className="flex items-center justify-center w-6 h-6 border-2 rounded-full md:w-12 md:h-12 hover:bg-cherry hover:text-white">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.94 4L6 4.94L9.05333 8L6 11.06L6.94 12L10.94 8L6.94 4Z" fill="currentColor" />
                                        </svg>

                                    </span>
                                }
                                // onPageChange={handlePageClick}
                                // pageRangeDisplayed={5}
                                pageCount={pageTotal}
                                previousLabel={
                                    <span className="flex items-center justify-center w-6 h-6 border-2 rounded-full md:w-12 md:h-12 hover:bg-cherry hover:text-white">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.06 12L11 11.06L7.94667 8L11 4.94L10.06 4L6.06 8L10.06 12Z" fill="currentColor" />
                                        </svg>

                                    </span>
                                }
                                // renderOnZeroPageCount={null}
                                containerClassName="flex flex-wrap items-center justify-center md:space-x-10 space-x-2"
                                disabledClassName="md:w-12 w-6 md:h-12 h-6 rounded-full border-2 flex items-center justify-center"
                                activeClassName="md:w-12 w-7 md:h-12 h-7 rounded-full border-2 bg-cherry text-white flex items-center justify-center"
                            />


                        </div>
                    </div>

                    {/* jika data kosong */}
                    {/*<div className="flex flex-col items-center justify-center w-full mt-16 md:mt-32 space-y-11">
                            <img src={NoData} alt='' />
                            <p className='text-dark-7'>Belum ada layanan yang ditambah</p>
                            <div><button onClick={handleOpen} className=' flex gap-2.5 text-white p-3 bg-primary rounded-lg hover:bg-primary/75 hover:text-white'><Add /><span>Tambah Bidding</span></button></div>
                        </div> */}
                </div>
            </div>
            <FooterTwo />
        </div>
    )
}

export default RiwayatBidding