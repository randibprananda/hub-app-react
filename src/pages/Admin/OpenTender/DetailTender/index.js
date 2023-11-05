import React, { useState } from 'react';
import { Sidebar, NavbarAdmin, FooterTwo } from '../../../../component';
import {
  Brian,
  IconAddFile,
  IconCheckGreen,
  IconCheckWhite,
  IconChecklist,
  IconChecklistGreen,
  IconChecklistPrimary,
  IconChecklistWhite,
  IconClose,
  IconFile,
  IconLocation,
  IconMessage,
  IconMessageWhite,
  IconNext,
  IconStar,
  LogoDefault,
  Wedding
} from '../../../../assets';
import { Link, useLocation } from 'react-router-dom';
import { Backdrop, Box, Fade, Modal } from '@mui/material';
import { Close } from '@mui/icons-material';
import Api from '../../../../Api';
import { useEffect } from 'react';
import moment from 'moment';
import imageHandle from '../../../../utils/imageHandle';

const modalWrapper = {
  overflow: 'auto',
  maxHeight: '100vh',
  display: 'flex'
};

const modalBlock = {
  position: 'relative',
  zIndex: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 'auto',
  width: '60%'
};
const modalContentStyle = {
  position: 'relative',
  background: 'white',
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px'
};

const styleAddOns = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
  'border-radius': '8px'
};

const DetailTender = () => {
  const params = useLocation();
  const [open, setOpen] = useState(true);
  const [openTab, setOpenTab] = useState(1);
  const [detail, setDetail] = useState(false);
  const [acc, setAcc] = useState(false);
  const [hide, setHide] = useState(true);
  const [detailCompany, setDetailCompany] = useState('');
  const [detailCompanyDoc, setDetailCompanyDoc] = useState('');
  const handleDetail = async (id) => {
    setDetail(true);
    try {
      const response = await Api.getCompany(localStorage.getItem('token-hub'), id);
      setDetailCompany(response.data);
      setDetailCompanyDoc(response.data.legal_documents);
    } catch (error) {
      console.log(error);
    }
  };

  const CloseDetail = () => {
    setDetail(false);
  };

  const handleAcc = () => {
    setAcc(true);
  };

  const CloseAcc = () => {
    setAcc(false);
  };

  const addOns = async () => {
    setHide(false);
    setAcc(false);
    try {
      const response = await Api.approveAddOn(localStorage.getItem('token-hub'), params.state.tenderId);
    } catch (error) {
      console.log(error);
    }
  };

  const [detailTender, setDetailTender] = useState('');
  const [detailTenderImage, setDetailTenderImage] = useState('');
  const [detailTenderStakeholder, setDetailTenderStakeholder] = useState('');
  const [detailTenderBidding, setDetailTenderBidding] = useState('');
  const [timeline, setTimeline] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [statusAddon, setStatusAddon] = useState('');

  const getDetailTender = async () => {
    try {
      const response = await Api.getTenderDetailById(params.state.tenderId);
      const resTimeline = await Api.getTimelineTender(localStorage.getItem('token-hub'), params.state.tenderId);
      const companyName = resTimeline.data.data?.[0]?.bid_applicants?.map(
        (applicant) => applicant.partner.company.name || []
      );
      setTimeline(resTimeline.data.data);
      setDetailTender(response.data.tenderData);
      setDetailTenderImage(response.data.tenderData.tender_images[0]);
      setDetailTenderStakeholder(response.data.tenderData.stakeholder);
      setDetailTenderBidding(response.data.tenderData.bid_applicants);
      setCompanyName(companyName);
      setStatusAddon(response.data.tenderData.status_addOn);
    } catch (error) {
      console.log(error);
    }
  };

  const sendPendampinganKonect = () => {
    const message = `Halo pak/bu ${
      detailTenderStakeholder.fullname
    }, kami dari admin konect ingin informasikan terkait teder ${
      detailTender.title
    } yang telah di buat  bapak/ibu. Untuk add on yang telah bapak/ibu ajukan, kami ${
      statusAddon === 'approved' ? 'Menyetujui' : 'Menolak'
    } add on tersebut, Terimakasih.`;
    const url = `https://wa.me/${detailTenderStakeholder.phone}?&text=${message}`;
    window.open(url, '_blank');
  };

  const sendRecomendationPartner = () => {
    const message = `Halo pak/bu ${
      detailTenderStakeholder.fullname
    }, kami dari admin konect ingin informasikan terkait open teder ${
      detailTender.title
    } yang telah dibuat bapak/ibu. Setelah kami mendapatkan 3 kandidat partner yang dipilih oleh bapak/ibu. Dan kami telah melakukan cross check kandidat yang di pilih, kami merekomendasikan ${companyName.join(
      ', '
    )} untuk berabung dan kolaborasi dengan project ${detailTender.title}, Terimakasih`;

    const url = `https://wa.me/${detailTenderStakeholder.phone}?&text=${message}`;
    window.open(url, '_blank');
  };

  useEffect(() => {
    getDetailTender();
  }, [getDetailTender]);

  return (
    <div>
      <div className='h-full bg-outline'>
        <Sidebar activeMenu={4} open={open} setOpen={setOpen} />
        <div
          className={`${open ? 'lg:ml-80 md:ml-28 ml-0' : 'lg:ml-24 md:ml-28 ml-0'} 
                    h-full p-7`}
        >
          <NavbarAdmin title={'Open Tender'} open={open} setOpen={setOpen} />
          <div className='flex flex-wrap items-center gap-3 mb-[30px] pt-[120px]'>
            <Link to={'/admin/open-tender'} className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>
              Open Tender
            </Link>
            <img src={IconNext} alt='' />
            <button className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>Detail Open Tender </button>
          </div>
          <div className='p-5 bg-white rounded-xl '>
            <div className='md:grid md:grid-cols-12'>
              <div className='md:col-span-4'>
                <div className=''>
                  <img
                    src={!detailTenderImage ? LogoDefault : imageHandle(detailTenderImage.image)}
                    alt=''
                    className='w-full md:h-full rounded-xl'
                  />
                </div>
              </div>
              <div className='flex items-center mt-5 md:col-span-8 md:px-8 md:mt-0'>
                <div className='space-y-3'>
                  {/* JIka terverified maka memunculkan pendamping konect */}
                  {detailTender.add_on && (
                    <div className='flex items-center gap-2'>
                      <img src={IconChecklistGreen} />
                      <h1 className='text-cherry text-[12px] font-semibold'>Pendampingan Konect</h1>
                    </div>
                  )}
                  {/*  */}
                  <h1 className='md:text-[28px] text-lg font-semibold text-[#2E3A44] md:line-clamp-3'>
                    {detailTender.title}
                  </h1>
                  <div className='flex mt-[12px] mb-[8px]'>
                    <img
                      className='rounded-full w-[18px] h-[18px]'
                      src={!detailTenderStakeholder.image ? LogoDefault : imageHandle(detailTenderStakeholder.image)}
                      alt=''
                    />
                    <label className='pl-[10px] font-inter font-medium text-[#737373] text-[10px]'>
                      {detailTenderStakeholder.fullname}
                    </label>
                  </div>
                  {detailTender.is_active ? (
                    <div className='py-1.5 px-4 bg-[#E8FFF3] text-xs text-[#30DF3F] border-[#30DF3F] w-max rounded-md mt-4 '>
                      Tender Active
                    </div>
                  ) : (
                    <div className='py-1.5 px-4 bg-[#FFDDE0] text-xs text-[#C1121F] border-[#C1121F] w-max rounded-md mt-4 '>
                      Tender Selesai
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <ul className='flex flex-row pt-3 pb-4 mb-0 list-none' role='tablist'>
            <li className='mr-2 -mb-px w-max last:mr-0'>
              <a
                className={
                  'text-xs font-bold px-5 py-3 block leading-normal ' +
                  (openTab === 1 ? 'text-[#081C4F]  underline underline-offset-8 rounded' : 'text-[#64748B] ')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle='tab'
                href='#link1'
                role='tablist'
              >
                Informasi Tender
              </a>
            </li>
            <li className='mr-2 -mb-px w-max last:mr-0'>
              <a
                className={
                  'text-xs font-bold px-5 py-3 block leading-normal ' +
                  (openTab === 2 ? 'text-[#081C4F]  underline underline-offset-8 rounded' : 'text-[#64748B]')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle='tab'
                href='#link2'
                role='tablist'
              >
                Timeline
              </a>
            </li>
          </ul>
          <div className='flex flex-wrap bg-white rounded-[12px] px-8'>
            <div className='w-full'>
              <div className='relative flex flex-col min-w-0 break-words mt-[24px] w-full mb-6 '>
                <div className='flex-auto '>
                  <div className='tab-content tab-space'>
                    <div className={openTab === 1 ? 'block' : 'hidden'} id='link1'>
                      <div>
                        <h1 className='text-xxs text-[#454545] '>Deskripsi </h1>
                        <h1 className='mt-2 text-base text-[#2E3A44]'>{detailTender.description}</h1>
                        <hr class='my-4 w-full h-[1px]  border border-[#DFDFDF]' />
                        <div className='flex items-center gap-9'>
                          <div>
                            <h1 className='text-[10px] text-[#454545]'>Estimasi Peserta</h1>
                            <div className='flex gap-2 h-max'>
                              <div className='flex h-max gap-1 bg-[#F6F6F6] rounded-[4px] p-2'>
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
                                <span className='text-[#6A6A6A] text-[10px]'>{detailTender.participant_estimate}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h1 className='text-[10px] text-[#454545]'>Estimasi Pelaksanaan</h1>
                            <div className='flex gap-2 h-max'>
                              <div className='flex h-max gap-1 bg-[#F6F6F6] rounded-[4px] p-2'>
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
                                  {moment(detailTender.implementation_estimate).format('DD MMMM YYYY')}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='mt-5'>
                          <p className='text-[#5C5C5C] text-start text-xs'>Anggaran</p>
                          <p className='font-semibold text-xl text-[#1A1A1A]'>Rp {detailTender.budget_target}</p>
                        </div>
                        {statusAddon === 'approved' && (
                          <div className='flex items-center gap-2 mt-4'>
                            <svg
                              width='20'
                              height='20'
                              viewBox='0 0 20 20'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M9.12467 10.5837L7.97884 9.41699C7.81217 9.25033 7.6144 9.16699 7.38551 9.16699C7.15662 9.16699 6.95856 9.25033 6.79134 9.41699C6.62467 9.58366 6.53773 9.78171 6.53051 10.0112C6.52329 10.2406 6.60329 10.4384 6.77051 10.6045L8.54134 12.3753C8.70801 12.542 8.90245 12.6253 9.12467 12.6253C9.3469 12.6253 9.54134 12.542 9.70801 12.3753L13.2497 8.83366C13.4163 8.66699 13.4997 8.46921 13.4997 8.24032C13.4997 8.01144 13.4163 7.81338 13.2497 7.64616C13.083 7.47949 12.885 7.39616 12.6555 7.39616C12.4261 7.39616 12.2283 7.47949 12.0622 7.64616L9.12467 10.5837ZM9.99967 18.2712H9.79134C9.7219 18.2712 9.6594 18.2573 9.60384 18.2295C7.7844 17.66 6.2844 16.5314 5.10384 14.8437C3.92329 13.1559 3.33301 11.2914 3.33301 9.25033V5.31283C3.33301 4.9656 3.43384 4.6531 3.63551 4.37533C3.83717 4.09755 4.09745 3.89616 4.41634 3.77116L9.41634 1.89616C9.61079 1.82671 9.80523 1.79199 9.99967 1.79199C10.1941 1.79199 10.3886 1.82671 10.583 1.89616L15.583 3.77116C15.9025 3.89616 16.163 4.09755 16.3647 4.37533C16.5663 4.6531 16.6669 4.9656 16.6663 5.31283V9.25033C16.6663 11.292 16.0761 13.1567 14.8955 14.8445C13.715 16.5323 12.215 17.6606 10.3955 18.2295C10.3261 18.2573 10.1941 18.2712 9.99967 18.2712Z'
                                fill='url(#paint0_linear_794_39575)'
                              />
                              <defs>
                                <linearGradient
                                  id='paint0_linear_794_39575'
                                  x1='9.99902'
                                  y1='2.00024'
                                  x2='9.99967'
                                  y2='18.2712'
                                  gradientUnits='userSpaceOnUse'
                                >
                                  <stop stop-color='#00CDB4' />
                                  <stop offset='1' stop-color='#028878' />
                                </linearGradient>
                              </defs>
                            </svg>
                            <h1 className='text-xs font-semibold text-cherry'>Pendampingan Konect</h1>
                          </div>
                        )}
                        <div className='bg-[#F1F1F1] p-5 rounded-lg my-[30px]'>
                          <h1 className='text-base font-semibold text-[#888888] mb-3'>Daftar Bidding</h1>
                          <div>
                            <div className='flex items-center justify-between'>
                              <div className='flex items-center gap-1'>
                                <p className='text-base font-medium text-black'>{detailTenderBidding.length}</p>
                                <p className='text-sm text-black'>orang</p>
                              </div>
                              <p className='text-sm text-[#737373] '>Target {detailTender.maksimal_partner} orang</p>
                            </div>
                            <progress
                              className='w-full progress progress-accent'
                              value={`${(detailTenderBidding.length / detailTender.maksimal_partner) * 100}`}
                              max='100'
                            ></progress>
                          </div>
                          {Object.values(detailTenderBidding).map((data, index) => {
                            return (
                              <div className='flex items-center justify-between mb-3' key={index}>
                                <h1 className='text-sm text-primary'>{data.partner.company.company_name}</h1>
                                <h1 className='text-sm font-semibold text-primary'>{data.nominal_bidding}</h1>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className={openTab === 2 ? 'block' : 'hidden'} id='link2'>
                      <div className='p-3 lg:p-5'>
                        {Object.values(timeline).map((data, index) => {
                          return (
                            <ol className='relative border-l border-gray-200 dark:border-gray-700' key={index}>
                              {/*akun terverified  */}
                              <li className='mb-10 ml-6'>
                                <span className='absolute flex items-center justify-center w-7 h-7 bg-[#FFECBD] rounded-full -left-3 ring-8 ring-white'>
                                  <img src={IconFile} />
                                </span>
                                <div className='flex lg:flex-row md:flex-row flex-col items-center mb-1 lg:text-[16px] md:text-[14px] text-[12px] font-semibold text-gray-900 space-x-3'>
                                  <img
                                    className='w-[24px] h-[24px] rounded-full'
                                    src={
                                      !detailTenderStakeholder.image
                                        ? LogoDefault
                                        : imageHandle(detailTenderStakeholder.image)
                                    }
                                  />
                                  <span className='font-semibold'>{detailTenderStakeholder.fullname}</span>
                                  <span className='font-medium text-center md:text-left'>mensubmit tender</span>
                                  <span className='font-light'>{moment(data.createdAt).format('DD MMMM YYYY')}</span>
                                </div>
                              </li>
                              {data.add_on && (
                                <>
                                  <li className='mb-10 ml-6'>
                                    <span className='absolute flex items-center justify-center w-7 h-7 bg-[#C7F4FF] rounded-full -left-3 ring-8 ring-white'>
                                      <img src={IconAddFile} />
                                    </span>
                                    <div className='flex lg:flex-row md:flex-row flex-col items-center mb-1 lg:text-[16px] md:text-[14px] text-[12px] font-semibold text-gray-900 space-x-3'>
                                      <img
                                        className='w-[24px] h-[24px] rounded-full'
                                        src={
                                          !detailTenderStakeholder.image
                                            ? LogoDefault
                                            : imageHandle(detailTenderStakeholder.image)
                                        }
                                      />
                                      <span className='font-semibold'>{detailTenderStakeholder.fullname}</span>
                                      <span className='font-medium text-center md:text-left'>
                                        mengajukan pendampingan konect{' '}
                                      </span>
                                      <span className='font-light'>
                                        {moment(data.createdAt).format('DD MMMM YYYY')}
                                      </span>
                                    </div>
                                    <div className='lg:w-[527px] w-full h-full rounded-xl shadow-lg border mt-10 px-8 py-6 space-y-3'>
                                      <h1 className='text-base font-semibold'>Add Ons</h1>
                                      <p className='text-xs font-normal'>{data.add_on}</p>
                                    </div>
                                    <div className='flex flex-col gap-3 py-6 lg:flex-row md:flex-row lg:items-center'>
                                      <button
                                        className='bg-kuning px-5 py-2.5 flex items-center gap-2 text-white font-semibold lg:text-[16px] md:text-[14px] text-[12px] rounded-md lg:w-auto md:w-auto w-full'
                                        onClick={sendPendampinganKonect}
                                      >
                                        <img src={IconMessageWhite} />
                                        Hubungi Stake Holder
                                      </button>
                                      {data.status_addOn !== 'approved' ? (
                                        <div className={`${hide ? 'block' : 'hidden'}`}>
                                          <button
                                            onClick={handleAcc}
                                            className='bg-primary px-5 py-2.5 flex items-center gap-2 text-white font-semibold lg:text-[16px] md:text-[14px] text-[12px] rounded-md lg:w-auto md:w-auto w-full'
                                          >
                                            <img src={IconChecklistWhite} />
                                            Setujui Add Ons
                                          </button>
                                        </div>
                                      ) : null}
                                    </div>
                                  </li>
                                  {data.status_addOn === 'approved' ? (
                                    <li className='mb-10 ml-6'>
                                      <span className='absolute flex items-center justify-center w-7 h-7 bg-[#93FFF2] rounded-full -left-3 ring-8 ring-white'>
                                        <img src={IconChecklist} />
                                      </span>
                                      <div className='flex lg:flex-row md:flex-row flex-col items-center mb-1 lg:text-[16px] md:text-[14px] text-[12px] font-semibold text-gray-900 space-x-3'>
                                        <span className='font-medium text-center md:text-left'>
                                          Pendampingan Konect disetujui
                                        </span>
                                        <span className='font-light'>14 Oktober 2022 </span>
                                      </div>
                                    </li>
                                  ) : null}
                                </>
                              )}
                              {data.deadline === new Date() && (
                                <li className='mb-10 ml-6'>
                                  <span className='absolute flex items-center justify-center w-7 h-7 bg-[#FFBEC3] rounded-full -left-3 ring-8 ring-white'>
                                    <img src={IconClose} />
                                  </span>
                                  <div className='flex lg:flex-row md:flex-row flex-col items-center mb-1 lg:text-[16px] md:text-[14px] text-[12px] font-semibold text-gray-900 space-x-3'>
                                    <span className='font-medium text-center md:text-left'>Open tender selesai </span>
                                    <span className='font-light'>20 Februari 2023 </span>
                                  </div>
                                </li>
                              )}
                              {data.bid_applicants && (
                                <li className='mb-10 ml-6'>
                                  <span className='absolute flex items-center justify-center w-7 h-7 bg-[#DEDCFF] rounded-full -left-3 ring-8 ring-white'>
                                    <img src={IconStar} />
                                  </span>
                                  <div className='flex lg:flex-row md:flex-row flex-col items-center mb-1 lg:text-[16px] md:text-[14px] text-[12px] font-semibold text-gray-900 space-x-3'>
                                    <img
                                      className='w-[24px] h-[24px] rounded-full'
                                      src={
                                        !detailTenderStakeholder.image
                                          ? LogoDefault
                                          : imageHandle(detailTenderStakeholder.image)
                                      }
                                    />
                                    <span className='font-semibold'>Celiscar Santa</span>
                                    <span className='font-medium text-center md:text-left'>
                                      mengirim 3 partner rekomendasi{' '}
                                    </span>
                                    <span className='font-light'>
                                      {moment(data.bid_applicants[0].createdAt).format('DD MMMM YYYY')}
                                    </span>
                                  </div>
                                  <div className='lg:w-[527px] w-full h-full rounded-xl shadow-lg border mt-10 lg:px-8 px-6 lg:py-6 py-4'>
                                    {Object.values(data.bid_applicants).map((data, index) => {
                                      return (
                                        <div
                                          className='flex flex-col items-center w-full h-full py-4 border-b-2 lg:h-20 lg:flex-row md:flex-row lg:justify-between md:justify-between'
                                          key={index}
                                        >
                                          <div className='flex items-center space-x-3 '>
                                            <img
                                              className='lg:w-[46px] md:w-[36px] w-[26px] lg:h-[46px] md:h-[36px] h-[26px] rounded-lg'
                                              src={
                                                !data.partner.company.company_logo
                                                  ? LogoDefault
                                                  : imageHandle(data.partner.company.company_logo)
                                              }
                                            />
                                            <div className='flex flex-col'>
                                              <h1 className='font-semibold lg:text-[18px] md:text-[14px] text-[12px] line-clamp-1 w-[200px]'>
                                                {data.partner.company.name}
                                              </h1>
                                              <div className='flex items-center gap-1'>
                                                <img src={IconLocation} className='w-[16px] h-[16px]' />
                                                <h1 className='lg:text-[12px] text-[10px] font-normal'>
                                                  {data.partner.company.city}
                                                </h1>
                                              </div>
                                            </div>
                                          </div>
                                          <button
                                            onClick={() => {
                                              handleDetail(data.partner.company.id);
                                            }}
                                            className='text-primary hover:text-teal-300 lg:text-[14px] text-[12px] font-medium border-b-2 border-b-primary'
                                          >
                                            Lihat Detail Partner
                                          </button>
                                        </div>
                                      );
                                    })}
                                  </div>
                                  <div className='flex flex-col items-center gap-3 py-6 lg:flex-row md:flex-row'>
                                    <button
                                      className='bg-kuning px-5 py-2.5 flex items-center gap-2 text-white font-semibold lg:text-[16px] md:text-[14px] text-[12px] rounded-md md:w-auto w-full'
                                      onClick={sendRecomendationPartner}
                                    >
                                      <img src={IconMessageWhite} />
                                      Hubungi Stake Holder
                                    </button>
                                  </div>
                                </li>
                              )}
                            </ol>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Modal
            aria-labelledby='transition-modal-title'
            aria-describedby='transition-modal-description'
            open={acc}
            onClose={CloseAcc}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500
            }}
          >
            <Fade in={acc}>
              <Box sx={styleAddOns}>
                <div className='flex items-start justify-end'>
                  <button onClick={CloseAcc} className='hover:text-dark-3'>
                    <Close />
                  </button>
                </div>
                <div className='my-5 space-y-4'>
                  <div className='flex flex-col items-center justify-center space-y-4'>
                    <img src={IconChecklistPrimary} />
                    <div className='flex flex-col items-center justify-center'>
                      <h1 className='font-medium text-[18px]'>Setujui Open Tender</h1>
                      <p className='font-normal text-[14px] text-center'>
                        Anda yakin untuk menyetujui open tender ini? open tender yang disetujui akan terpublikasi{' '}
                      </p>
                    </div>
                  </div>
                  <div className='flex flex-row justify-center gap-3 mt-10'>
                    <button
                      className='px-5 py-2 ml-2 font-semibold bg-gray-300 border rounded-md text-cherry hover:text-white hover:bg-cherry/50'
                      onClick={CloseAcc}
                    >
                      Tidak, Batalkan
                    </button>
                    <button
                      className='px-5 py-2 ml-2 font-semibold text-white rounded-md bg-cherry hover:bg-cherry/50'
                      onClick={addOns}
                    >
                      Ya, Setujui
                    </button>
                  </div>
                </div>
              </Box>
            </Fade>
          </Modal>

          <Modal
            aria-labelledby='transition-modal-title'
            aria-describedby='transition-modal-description'
            open={detail}
            onClose={CloseDetail}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500
            }}
            sx={modalWrapper}
          >
            <Fade in={detail}>
              <Box sx={modalBlock}>
                <Box sx={modalContentStyle}>
                  <div className='flex items-start justify-between'>
                    <div>
                      <h2 className='font-semibold'>Detail Partner</h2>
                    </div>
                    <button onClick={CloseDetail} className='hover:text-dark-3'>
                      <Close />
                    </button>
                  </div>
                  <div className='my-5 space-y-2.5'>
                    <h1 className='font-semibold text-[28px]'>{detailCompany.name}</h1>
                    <p className='font-normal text-[16px]'>{detailCompany.description}</p>

                    <div className='border-b-2 pt-[20px]'></div>
                    <div className='grid lg:grid-cols-12 grid-cols-6 space-y-3 pt-[20px]'>
                      <div className='col-span-6 lg:col-span-6'>
                        <h1 className='text-[16px] font-normal text-[#64748B]'>Badan Usaha</h1>
                        <h1 className='text-[16px] font-normal'>{detailCompany.type}</h1>
                      </div>
                      <div className='col-span-6 lg:col-span-6'>
                        <h1 className='text-[16px] font-normal text-[#64748B]'>Jenis Badan Usaha</h1>
                        <h1 className='text-[16px] font-normal'>{detailCompany.type_business}</h1>
                      </div>
                      <div className='col-span-12 lg:col-span-12'>
                        <h1 className='text-[16px] font-normal text-[#64748B]'>Jenis SIUP</h1>
                        <div className='text-[14px] text-center font-normal px-2 py-2 border-black rounded-2xl border-2 w-full mt-2 mb-3'>
                          {detailCompany.type_siup}
                        </div>
                      </div>
                      <div className='col-span-6 lg:col-span-6'>
                        <h1 className='text-[16px] font-normal text-[#64748B]'>Email Aktif</h1>
                        <h1 className='text-[16px] font-normal'>{detailCompany.email}</h1>
                      </div>
                      <div className='col-span-6 lg:col-span-6'>
                        <h1 className='text-[16px] font-normal text-[#64748B]'>No. Telp</h1>
                        <h1 className='text-[16px] font-normal'>{detailCompany.phone}</h1>
                      </div>
                      <div className='col-span-6 lg:col-span-6'>
                        <h1 className='text-[16px] font-normal text-[#64748B]'>Kabupaten/Kota</h1>
                        <h1 className='text-[16px] font-normal'>{detailCompany.city}</h1>
                      </div>
                      <div className='col-span-6 lg:col-span-6'>
                        <h1 className='text-[16px] font-normal text-[#64748B]'>Provinsi</h1>
                        <h1 className='text-[16px] font-normal'>{detailCompany.province}</h1>
                      </div>
                      <div className='col-span-6 lg:col-span-12'>
                        <h1 className='text-[16px] font-normal text-[#64748B]'>Kode Pos</h1>
                        <h1 className='text-[16px] font-normal'>{detailCompany.postal_code}</h1>
                      </div>
                      <div className='col-span-6 lg:col-span-12'>
                        <h1 className='text-[16px] font-normal text-[#64748B]'>Alamat</h1>
                        <h1 className='text-[16px] font-normal'>{detailCompany.address}</h1>
                      </div>
                    </div>
                    <div className='border-b-2 pt-[20px]'></div>
                    <h1 className='text-[16px] font-normal text-[#64748B]'>Dokumen</h1>
                    <div className='grid lg:grid-cols-12 grid-cols-6 lg:space-y-0 space-y-3 lg:gap-3 gap-0 pt-[20px]'>
                      {Object.values(detailCompanyDoc).map((data, index) => {
                        return (
                          <div className='col-span-3 lg:col-span-3' key={index}>
                            <a
                              href={imageHandle(data.path)}
                              download
                              target='_blank'
                              className='bg-gray-200 rounded-[12px] px-5 py-2 flex justify-center'
                            >
                              <h1 className='text-[13px] font-medium text-primary'>
                                {!data.type ? 'File' : data.type}.pdf
                              </h1>
                            </a>
                          </div>
                        );
                      })}
                    </div>
                    <div className='border-b-2 pt-[20px]'></div>
                    <div className='pt-[20px]'>
                      <div className='flex flex-col space-y-3 '>
                        <h1 className='text-[14px] font-normal text-[#64748B]'>Website / Sosial Media</h1>
                        <div className='flex gap-10'>
                          <h1 className='text-[14px] font-normal'>{detailCompany.website_type}</h1>
                          <h1 className='text-[14px] font-normal'>: {detailCompany.website_url}</h1>
                        </div>
                        <h1 className='text-[14px] font-normal text-[#64748B]'>Marketplace /Toko Online</h1>
                        <div className='flex gap-10'>
                          <h1 className='text-[14px] font-normal'>{detailCompany.marketplace_type}</h1>
                          <h1 className='text-[14px] font-normal'>: {detailCompany.marketplace_url}</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </Box>
              </Box>
            </Fade>
          </Modal>
        </div>
      </div>
      <FooterTwo />
    </div>
  );
};

export default DetailTender;
