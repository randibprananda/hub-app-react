import {
  ActivePartner,
  BgBanner,
  Brian,
  IconAction,
  IconAddon,
  IconArrowRight,
  IconBagCherry,
  IconBagPrimary,
  IconBagYellow,
  IconBidding,
  IconBiddingColor,
  IconBiddingYellow,
  IconEmail,
  IconEmailOutline,
  IconNext,
  IconPartnerDark,
  IconPartnerGradient,
  IconPartnerGray,
  IconPhoneOutline,
  IconStakeholder,
  IconStar,
  IconStarYellow,
  IconStatus,
  IconTagGreen,
  IconTagRed,
  NotActivePartner,
} from '../../../../assets';
import { Backdrop, Box, Fade, Modal } from '@mui/material';
import { CurrencyIDR, _renderCurrency } from '../../../../utils/CurrencyIDR';
import { FooterTwo, NavbarAdmin, Sidebar } from '../../../../component';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';

import Api from '../../../../Api';
import { Close } from '@mui/icons-material';
import ReactPaginate from 'react-paginate';
import imageHandle from '../../../../utils/imageHandle';
import { useEffect } from 'react';

const stylePatner = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
  'border-radius': '8px',
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ListLayananPartner = () => {
  const params = useLocation();
  const [open, setOpen] = useState(true);
  const [tender, setTender] = useState('');
  const [stakeholderList, setStakeholderList] = useState('');
  const [limit, setLimit] = useState(1);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState('');
  const [totalData, setTotalData] = useState('');
  const [search, setSearch] = useState('');
  const [isActive, setIsActive] = useState('');
  const [addons, setAddOns] = useState('');
  const [stakeholderId, setStakeholderId] = useState('');
  const [error, setError] = useState(false);
  const [category, setCategory] = useState('');
  const [dataLayanan, setDataLayanan] = useState([]);

  const [enabled, setEnabled] = useState(false);
  const [layanan, setLayanan] = useState(1);

  const getData = async () => {
    try {
      const response = await Api.GetLayananPartner(
        localStorage.getItem('token-hub'),
        params.state.partnerId,
        page,
        limit,
        category,
        search,
      );
      // ! KURANG SET DATA LAYANAN SELAIN ALL DATA
      if (category === '') {
        setDataLayanan(response.data.dataAll.data);
        setTotalPages(response.data.dataAll.totalPages);
        setTotalData(response.data.dataAll.total);
      } else if (category === 'EO') {
        setDataLayanan(response.data.eoServices.data);
        setTotalPages(response.data.eoServices.totalPages);
        setTotalData(response.data.eoServices.total)
      } else if (category === 'PRODUCT') {
        setDataLayanan(response.data.product.data)
        setTotalPages(response.data.product.totalPages)
        setTotalData(response.data.product.total)
      } else if (category === 'TALENT') {
        setDataLayanan(response.data.talent.data)
        setTotalPages(response.data.talent.totalPages)
        setTotalData(response.data.talent.total)
      } else if (category === 'VENUE') {
        setDataLayanan(response.data.venue.data)
        setTotalPages(response.data.venue.totalPages)
        setTotalData(response.data.venue.total)
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [page, category, search, isActive]);

  return (
    <div>
      <div className='h-full bg-outline'>
        <Sidebar
          activeMenu={2}
          open={open}
          setOpen={setOpen}
        />
        <div
          className={`${open ? 'lg:ml-80 md:ml-28 ml-0' : 'lg:ml-24 md:ml-28 ml-0'}
              h-full p-7`}
        >
          <NavbarAdmin
            title={'Partner'}
            image={IconPartnerGradient}
            open={open}
            setOpen={setOpen}
          />
          <div className='flex flex-wrap items-center gap-3 mb-[30px] pt-[120px]'>
            <Link
              to={'/admin/partner'}
              className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'
            >
              Partner{' '}
            </Link>
            <img
              src={IconNext}
              alt=''
            />
            <Link
              to={'/admin/detail-partner'}
              className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'
            >
              Detail Partner{' '}
            </Link>
            <img
              src={IconNext}
              alt=''
            />
            <button className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>Layanan Partner </button>
          </div>
          <div className='flex flex-col'>
            <div className='-my-2'>
              <div className='inline-block w-full py-2'>
                <div className='bg-white border-b border-gray-200 shadow sm:rounded-lg'>
                  <div className='w-full px-6 py-5 space-y-4'>
                    <div className='flex items-center'>
                      <div className=''>
                        <h1 className='text-2xl text-[#2E3A44] font-bold'>Daftar Layanan</h1>
                      </div>
                    </div>
                    <div className='flex flex-col mt-5 space-y-3 md:justify-between md:flex-row md:space-y-0'>
                      <div>
                        <div className='flex lg:flex-row flex-col items-center gap-3 md:gap-[28px] flex-wrap '>
                          <button
                            key={1}
                            className={`${
                              layanan === 1
                                ? 'bg-white text-[#081C4F] border-b-2 border-b-[#081C4F]'
                                : 'bg-white text-gray-300'
                            } py-[8px] px-[5px] flex items-center text-xs md:text-base truncate lg:w-auto w-full`}
                            onClick={(e) => {
                              e.preventDefault();
                              setCategory('');
                              setLayanan(1);
                            }}
                          >
                            Semua
                          </button>
                          <button
                            key={2}
                            className={`${
                              layanan === 2
                                ? 'bg-white text-[#081C4F] border-b-2 border-b-[#081C4F]'
                                : 'bg-white text-gray-300'
                            } py-[10px] px-[20px] flex items-center text-xs md:text-base truncate lg:w-auto w-full`}
                            onClick={(e) => {
                              e.preventDefault();
                              setCategory('EO');
                              setLayanan(2);
                            }}
                          >
                            Event Organizer
                          </button>
                          <button
                            key={3}
                            className={`${
                              layanan === 3
                                ? 'bg-white text-[#081C4F] border-b-2 border-b-[#081C4F]'
                                : 'bg-white text-gray-300'
                            } py-[10px] px-[20px] flex items-center text-xs md:text-base truncate lg:w-auto w-full`}
                            onClick={(e) => {
                              e.preventDefault();
                              setCategory('VENUE');
                              setLayanan(3);
                            }}
                          >
                            Venue
                          </button>
                          <button
                            key={4}
                            className={`${
                              layanan === 4
                                ? 'bg-white text-[#081C4F] border-b-2 border-b-[#081C4F]'
                                : 'bg-white text-gray-300'
                            } py-[10px] px-[20px] flex items-center text-xs md:text-base truncate lg:w-auto w-full`}
                            onClick={(e) => {
                              e.preventDefault();
                              setCategory('PRODUCT');
                              setLayanan(4);
                            }}
                          >
                            Supplier
                          </button>
                          <button
                            key={5}
                            className={`${
                              layanan === 5
                                ? 'bg-white text-[#081C4F] border-b-2 border-b-[#081C4F]'
                                : 'bg-white text-gray-300'
                            } py-[10px] px-[20px] flex items-center text-xs md:text-base truncate lg:w-auto w-full`}
                            onClick={(e) => {
                              e.preventDefault();
                              setCategory('TALENT');
                              setLayanan(5);
                            }}
                          >
                            Talent
                          </button>
                        </div>
                      </div>
                      <div className='flex gap-3'>
                        <div className='relative w-full md:w-max'>
                          <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                            <svg
                              width='20'
                              height='20'
                              viewBox='0 0 20 20'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <g clip-path='url(#clip0_979_102668)'>
                                <path
                                  d='M14.6786 12.9277C15.889 11.276 16.4311 9.2283 16.1965 7.19412C15.9619 5.15994 14.9679 3.28936 13.4133 1.9566C11.8588 0.623835 9.85831 -0.0728113 7.81217 0.0060301C5.76603 0.0848715 3.8251 0.933387 2.37771 2.38182C0.930312 3.83025 0.0831854 5.77178 0.00580817 7.81798C-0.0715691 9.86417 0.626509 11.8641 1.96038 13.4177C3.29426 14.9713 5.16555 15.964 7.1999 16.1972C9.23424 16.4303 11.2816 15.8867 12.9324 14.6752H12.9311C12.9686 14.7252 13.0086 14.7727 13.0536 14.8189L17.8661 19.6314C18.1005 19.866 18.4185 19.9978 18.7501 19.9979C19.0816 19.9981 19.3997 19.8664 19.6342 19.6321C19.8688 19.3977 20.0006 19.0797 20.0008 18.7481C20.0009 18.4165 19.8693 18.0985 19.6349 17.8639L14.8224 13.0514C14.7777 13.0062 14.7296 12.9657 14.6786 12.9277ZM15.0011 8.12268C15.0011 9.02552 14.8233 9.91952 14.4778 10.7536C14.1323 11.5877 13.6259 12.3456 12.9875 12.984C12.3491 13.6224 11.5912 14.1289 10.7571 14.4744C9.92296 14.8199 9.02896 14.9977 8.12612 14.9977C7.22329 14.9977 6.32929 14.8199 5.49517 14.4744C4.66106 14.1289 3.90317 13.6224 3.26476 12.984C2.62636 12.3456 2.11995 11.5877 1.77445 10.7536C1.42895 9.91952 1.25112 9.02552 1.25112 8.12268C1.25112 6.29932 1.97545 4.55064 3.26476 3.26133C4.55408 1.97201 6.30276 1.24768 8.12612 1.24768C9.94949 1.24768 11.6982 1.97201 12.9875 3.26133C14.2768 4.55064 15.0011 6.29932 15.0011 8.12268Z'
                                  fill='#A8A8A8'
                                />
                              </g>
                              <defs>
                                <clipPath id='clip0_979_102668'>
                                  <rect
                                    width='20'
                                    height='20'
                                    fill='white'
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                          <input
                            type='text'
                            id='simple-search'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full pr-10 p-2.5'
                            placeholder='Search'
                            required
                            onChange={(e) => setSearch(e.target.value)}
                          />
                        </div>
                        <div className='flex flex-col gap-2 space-y-3 md:space-y-0 md:flex-row'>
                          <div className='relative'>
                            <select
                              onChange={(e) => setIsActive(e.target.value)}
                              className='bg-gray-50 text-[#A8A8A8] border border-gray-300 text-sm rounded-lg  block w-full pl-10 p-2.5 appearance-none'
                            >
                              <option
                                value=''
                                disabled
                              >
                                Filter Status
                              </option>
                              <option value={true}>Partner Aktif</option>
                              <option value={false}>Partner Non Aktif</option>
                              <option value={''}>Tampilkan Semua</option>
                            </select>
                            <img
                              src={IconStatus}
                              className='absolute top-3 left-4'
                              alt=''
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <h1 className='font-normal text-black text-[12px]'>
                      Menampilkan <span className='font-bold'>{totalData}</span> Layanan Jasa
                    </h1>
                  </div>
                  <div className={layanan === 1 ? 'block' : 'hidden'}>
                    <div className='p-5 space-y-4 overflow-x-auto scrollbar-hide'>
                      {/* //* All layanan */}
                      {dataLayanan.map((data, index) => (
                        <div
                          className='grid w-full grid-cols-12 p-5 rounded-lg bg-gray-50'
                          key={index}
                        >
                          <div className='col-span-4'>
                            <div className='flex items-center'>
                              <div className=' h-[60px] w-[60px]'>
                                <img
                                  className='h-[60px] w-[60px] rounded'
                                  src={Brian}
                                  alt=''
                                />
                              </div>
                              <div className='flex flex-col ml-4 space-y-2'>
                                <h1 className='text-base font-inter font-medium text-[#1E293B]'>{data.name} </h1>
                                <h1 className='text-base font-inter font-medium text-[#1E293B]'>
                                  {data.package_pricings.name} Package
                                </h1>
                              </div>
                            </div>
                          </div>
                          <div className='col-span-2'>
                            <div className='flex flex-col space-y-2'>
                              <h1 className='text-base font-inter font-medium text-[#1E293B]'>Event Organizer </h1>
                              <div className='flex items-center gap-2'>
                                <img
                                  src={data.active ? IconTagGreen : IconTagRed}
                                  alt='Tag Icon'
                                />
                                <h1
                                  className={`text-sm font-inter font-normal ${
                                    data.active ? 'text-[#67C11D]' : 'text-red-500'
                                  }`}
                                >
                                  {data.active ? 'Ditampilkan' : 'Tidak Ditampilkan'}
                                </h1>
                              </div>
                            </div>
                          </div>
                          <div className='col-span-2'>
                            <div className='flex flex-col space-y-2'>
                              {data.package_pricings.disc_percentage !== 0 && (
                                <h1 className='text-sm font-inter font-medium text-[#1E293B] line-through'>
                                  {CurrencyIDR(
                                    data.package_pricings.total_price /
                                      (1 - data.package_pricings.disc_percentage / 100),
                                  )}
                                </h1>
                              )}
                              <h1 className='text-base font-inter font-medium text-[#1E293B]'>
                                {CurrencyIDR(data.package_pricings.total_price)}
                              </h1>
                            </div>
                          </div>
                          <div className='col-span-2'>
                            <div className='flex space-x-3'>
                              <img src={IconStarYellow} />
                              <h1 className='text-base font-inter font-medium text-[#FDBE0F]'>4.9 </h1>
                              <h1 className='text-base font-normal text-gray-800 font-inter'>(300)</h1>
                            </div>
                          </div>
                          <div className='col-span-2'>
                            <div className='flex items-center'>
                              <Link
                                to={'/admin/detail-partner/detai-list-layanan-partner'}
                                className='px-3 py-2 text-base bg-white border-2 hover:bg-primary hover:text-white text-primary border-primary rounded-xl'
                              >
                                Lihat Layanan
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className='flex justify-center'>
                      <ReactPaginate
                        breakLabel={<span className='mr-4'>...</span>}
                        nextLabel={
                          <span
                            className='flex items-center justify-center w-12 h-12 border-2 rounded-full hover:bg-cherry hover:text-white'
                            onClick={() => page < totalPages && setPage(page + 1)}
                          >
                            <svg
                              width='16'
                              height='16'
                              viewBox='0 0 16 16'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
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
                            className='flex items-center justify-center w-12 h-12 border-2 rounded-full hover:bg-cherry hover:text-white'
                            onClick={() => {
                              page > 1 && setPage(page - 1);
                            }}
                          >
                            <svg
                              width='16'
                              height='16'
                              viewBox='0 0 16 16'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M10.06 12L11 11.06L7.94667 8L11 4.94L10.06 4L6.06 8L10.06 12Z'
                                fill='currentColor'
                              />
                            </svg>
                          </span>
                        }
                        // renderOnZeroPageCount={null}
                        containerClassName='flex items-center justify center mt-8 mb-4 space-x-10'
                        disabledClassName='w-12 h-12 rounded-full border-2 flex items-center justify-center'
                        activeClassName='w-12 h-12 rounded-full border-2 bg-cherry text-white flex items-center justify-center'
                      />
                    </div>
                  </div>
                  <div className={layanan === 2 ? 'block' : 'hidden'}>
                    <div className='p-5 space-y-4 overflow-x-auto scrollbar-hide'>
                      {dataLayanan.map((data, index) => (
                        <div
                          className='grid w-full grid-cols-12 p-5 rounded-lg bg-gray-50'
                          key={index}
                        >
                          <div className='col-span-4'>
                            <div className='flex items-center'>
                              <div className=' h-[60px] w-[60px]'>
                                <img
                                  className='h-[60px] w-[60px] rounded'
                                  src={Brian}
                                  alt=''
                                />
                              </div>
                              <div className='flex flex-col ml-4 space-y-2'>
                                <h1 className='text-base font-inter font-medium text-[#1E293B]'>{data.name} </h1>
                                <h1 className='text-base font-inter font-medium text-[#1E293B]'>
                                  {data.package_pricings[0]?.name} Package
                                </h1>
                              </div>
                            </div>
                          </div>
                          <div className='col-span-2'>
                            <div className='flex flex-col space-y-2'>
                              <h1 className='text-base font-inter font-medium text-[#1E293B]'>Event Organizer </h1>
                              <div className='flex items-center gap-2'>
                                <img
                                  src={data.active ? IconTagGreen : IconTagRed}
                                  alt='Tag Icon'
                                />
                                <h1
                                  className={`text-sm font-inter font-normal ${
                                    data.active ? 'text-[#67C11D]' : 'text-red-500'
                                  }`}
                                >
                                  {data.active ? 'Ditampilkan' : 'Tidak Ditampilkan'}
                                </h1>
                              </div>
                            </div>
                          </div>
                          <div className='col-span-2'>
                            <div className='flex flex-col space-y-2'>
                              {data.package_pricings[0]?.disc_percentage !== 0 && (
                                <h1 className='text-sm font-inter font-medium text-[#1E293B] line-through'>
                                  {CurrencyIDR(
                                    data.package_pricings[0]?.total_price /
                                      (1 - data.package_pricings[0]?.disc_percentage / 100),
                                  )}
                                </h1>
                              )}
                              <h1 className='text-base font-inter font-medium text-[#1E293B]'>
                                {CurrencyIDR(data.package_pricings[0]?.total_price)}
                              </h1>
                            </div>
                          </div>
                          <div className='col-span-2'>
                            <div className='flex space-x-3'>
                              <img src={IconStarYellow} />
                              <h1 className='text-base font-inter font-medium text-[#FDBE0F]'>4.9 </h1>
                              <h1 className='text-base font-normal text-gray-800 font-inter'>(300)</h1>
                            </div>
                          </div>
                          <div className='col-span-2'>
                            <div className='flex items-center'>
                              <Link
                                to={'/admin/detail-partner/detai-list-layanan-partner'}
                                className='px-3 py-2 text-base bg-white border-2 hover:bg-primary hover:text-white text-primary border-primary rounded-xl'
                              >
                                Lihat Layanan
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className='flex justify-center'>
                      <ReactPaginate
                        breakLabel={<span className='mr-4'>...</span>}
                        nextLabel={
                          <span
                            className='flex items-center justify-center w-12 h-12 border-2 rounded-full hover:bg-cherry hover:text-white'
                            onClick={() => page < totalPages && setPage(page + 1)}
                          >
                            <svg
                              width='16'
                              height='16'
                              viewBox='0 0 16 16'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
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
                            className='flex items-center justify-center w-12 h-12 border-2 rounded-full hover:bg-cherry hover:text-white'
                            onClick={() => {
                              page > 1 && setPage(page - 1);
                            }}
                          >
                            <svg
                              width='16'
                              height='16'
                              viewBox='0 0 16 16'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M10.06 12L11 11.06L7.94667 8L11 4.94L10.06 4L6.06 8L10.06 12Z'
                                fill='currentColor'
                              />
                            </svg>
                          </span>
                        }
                        // renderOnZeroPageCount={null}
                        containerClassName='flex items-center justify center mt-8 mb-4 space-x-10'
                        disabledClassName='w-12 h-12 rounded-full border-2 flex items-center justify-center'
                        activeClassName='w-12 h-12 rounded-full border-2 bg-cherry text-white flex items-center justify-center'
                      />
                    </div>
                  </div>
                  <div className={layanan === 3 ? 'block' : 'hidden'}>
                    <div className='p-5 space-y-4 overflow-x-auto scrollbar-hide'>
                      {dataLayanan.map((data, index) => (
                        <div
                          className='grid w-full grid-cols-12 p-5 rounded-lg bg-gray-50'
                          key={index}
                        >
                          <div className='col-span-4'>
                            <div className='flex items-center'>
                              <div className=' h-[60px] w-[60px]'>
                                <img
                                  className='h-[60px] w-[60px] rounded'
                                  src={Brian}
                                  alt=''
                                />
                              </div>
                              <div className='flex flex-col ml-4 space-y-2'>
                                <h1 className='text-base font-inter font-medium text-[#1E293B]'>{data.name} </h1>
                                <h1 className='text-base font-inter font-medium text-[#1E293B]'>
                                  {data.package_pricings[0]?.name} Package
                                </h1>
                              </div>
                            </div>
                          </div>
                          <div className='col-span-2'>
                            <div className='flex flex-col space-y-2'>
                              <h1 className='text-base font-inter font-medium text-[#1E293B]'>Event Organizer </h1>
                              <div className='flex items-center gap-2'>
                                <img
                                  src={data.active ? IconTagGreen : IconTagRed}
                                  alt='Tag Icon'
                                />
                                <h1
                                  className={`text-sm font-inter font-normal ${
                                    data.active ? 'text-[#67C11D]' : 'text-red-500'
                                  }`}
                                >
                                  {data.active ? 'Ditampilkan' : 'Tidak Ditampilkan'}
                                </h1>
                              </div>
                            </div>
                          </div>
                          <div className='col-span-2'>
                            <div className='flex flex-col space-y-2'>
                              {data.package_pricings[0]?.disc_percentage !== 0 && (
                                <h1 className='text-sm font-inter font-medium text-[#1E293B] line-through'>
                                  {CurrencyIDR(
                                    data.package_pricings[0]?.total_price /
                                      (1 - data.package_pricings[0]?.disc_percentage / 100),
                                  )}
                                </h1>
                              )}
                              <h1 className='text-base font-inter font-medium text-[#1E293B]'>
                                {CurrencyIDR(data.package_pricings[0]?.total_price)}
                              </h1>
                            </div>
                          </div>
                          <div className='col-span-2'>
                            <div className='flex space-x-3'>
                              <img src={IconStarYellow} />
                              <h1 className='text-base font-inter font-medium text-[#FDBE0F]'>4.9 </h1>
                              <h1 className='text-base font-normal text-gray-800 font-inter'>(300)</h1>
                            </div>
                          </div>
                          <div className='col-span-2'>
                            <div className='flex items-center'>
                              <Link
                                to={'/admin/detail-partner/detai-list-layanan-partner'}
                                className='px-3 py-2 text-base bg-white border-2 hover:bg-primary hover:text-white text-primary border-primary rounded-xl'
                              >
                                Lihat Layanan
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className='flex justify-center'>
                      <ReactPaginate
                        breakLabel={<span className='mr-4'>...</span>}
                        nextLabel={
                          <span
                            className='flex items-center justify-center w-12 h-12 border-2 rounded-full hover:bg-cherry hover:text-white'
                            onClick={() => page < totalPages && setPage(page + 1)}
                          >
                            <svg
                              width='16'
                              height='16'
                              viewBox='0 0 16 16'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
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
                            className='flex items-center justify-center w-12 h-12 border-2 rounded-full hover:bg-cherry hover:text-white'
                            onClick={() => {
                              page > 1 && setPage(page - 1);
                            }}
                          >
                            <svg
                              width='16'
                              height='16'
                              viewBox='0 0 16 16'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M10.06 12L11 11.06L7.94667 8L11 4.94L10.06 4L6.06 8L10.06 12Z'
                                fill='currentColor'
                              />
                            </svg>
                          </span>
                        }
                        // renderOnZeroPageCount={null}
                        containerClassName='flex items-center justify center mt-8 mb-4 space-x-10'
                        disabledClassName='w-12 h-12 rounded-full border-2 flex items-center justify-center'
                        activeClassName='w-12 h-12 rounded-full border-2 bg-cherry text-white flex items-center justify-center'
                      />
                    </div>
                  </div>
                  <div className={layanan === 4 ? 'block' : 'hidden'}>
                    <div className='p-5 space-y-4 overflow-x-auto scrollbar-hide'>
                      {dataLayanan.map((data, index) => (
                        <div
                          className='grid w-full grid-cols-12 p-5 rounded-lg bg-gray-50'
                          key={index}
                        >
                          <div className='col-span-4'>
                            <div className='flex items-center'>
                              <div className=' h-[60px] w-[60px]'>
                                <img
                                  className='h-[60px] w-[60px] rounded'
                                  src={Brian}
                                  alt=''
                                />
                              </div>
                              <div className='flex flex-col ml-4 space-y-2'>
                                <h1 className='text-base font-inter font-medium text-[#1E293B]'>{data.name} </h1>
                                <h1 className='text-base font-inter font-medium text-[#1E293B]'>
                                  {data.package_pricings[0]?.name} Package
                                </h1>
                              </div>
                            </div>
                          </div>
                          <div className='col-span-2'>
                            <div className='flex flex-col space-y-2'>
                              <h1 className='text-base font-inter font-medium text-[#1E293B]'>Event Organizer </h1>
                              <div className='flex items-center gap-2'>
                                <img
                                  src={data.active ? IconTagGreen : IconTagRed}
                                  alt='Tag Icon'
                                />
                                <h1
                                  className={`text-sm font-inter font-normal ${
                                    data.active ? 'text-[#67C11D]' : 'text-red-500'
                                  }`}
                                >
                                  {data.active ? 'Ditampilkan' : 'Tidak Ditampilkan'}
                                </h1>
                              </div>
                            </div>
                          </div>
                          <div className='col-span-2'>
                            <div className='flex flex-col space-y-2'>
                              {data.package_pricings[0]?.disc_percentage !== 0 && (
                                <h1 className='text-sm font-inter font-medium text-[#1E293B] line-through'>
                                  {CurrencyIDR(
                                    data.package_pricings[0]?.total_price /
                                      (1 - data.package_pricings[0]?.disc_percentage / 100),
                                  )}
                                </h1>
                              )}
                              <h1 className='text-base font-inter font-medium text-[#1E293B]'>
                                {CurrencyIDR(data.package_pricings[0]?.total_price)}
                              </h1>
                            </div>
                          </div>
                          <div className='col-span-2'>
                            <div className='flex space-x-3'>
                              <img src={IconStarYellow} />
                              <h1 className='text-base font-inter font-medium text-[#FDBE0F]'>4.9 </h1>
                              <h1 className='text-base font-normal text-gray-800 font-inter'>(300)</h1>
                            </div>
                          </div>
                          <div className='col-span-2'>
                            <div className='flex items-center'>
                              <Link
                                to={'/admin/detail-partner/detai-list-layanan-partner'}
                                className='px-3 py-2 text-base bg-white border-2 hover:bg-primary hover:text-white text-primary border-primary rounded-xl'
                              >
                                Lihat Layanan
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className='flex justify-center'>
                      <ReactPaginate
                        breakLabel={<span className='mr-4'>...</span>}
                        nextLabel={
                          <span
                            className='flex items-center justify-center w-12 h-12 border-2 rounded-full hover:bg-cherry hover:text-white'
                            onClick={() => page < totalPages && setPage(page + 1)}
                          >
                            <svg
                              width='16'
                              height='16'
                              viewBox='0 0 16 16'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
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
                            className='flex items-center justify-center w-12 h-12 border-2 rounded-full hover:bg-cherry hover:text-white'
                            onClick={() => {
                              page > 1 && setPage(page - 1);
                            }}
                          >
                            <svg
                              width='16'
                              height='16'
                              viewBox='0 0 16 16'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M10.06 12L11 11.06L7.94667 8L11 4.94L10.06 4L6.06 8L10.06 12Z'
                                fill='currentColor'
                              />
                            </svg>
                          </span>
                        }
                        // renderOnZeroPageCount={null}
                        containerClassName='flex items-center justify center mt-8 mb-4 space-x-10'
                        disabledClassName='w-12 h-12 rounded-full border-2 flex items-center justify-center'
                        activeClassName='w-12 h-12 rounded-full border-2 bg-cherry text-white flex items-center justify-center'
                      />
                    </div>
                  </div>
                  <div className={layanan === 5 ? 'block' : 'hidden'}>
                    <div className='p-5 space-y-4 overflow-x-auto scrollbar-hide'>
                      {dataLayanan.map((data, index) => (
                        <div
                          className='grid w-full grid-cols-12 p-5 rounded-lg bg-gray-50'
                          key={index}
                        >
                          <div className='col-span-4'>
                            <div className='flex items-center'>
                              <div className=' h-[60px] w-[60px]'>
                                <img
                                  className='h-[60px] w-[60px] rounded'
                                  src={Brian}
                                  alt=''
                                />
                              </div>
                              <div className='flex flex-col ml-4 space-y-2'>
                                <h1 className='text-base font-inter font-medium text-[#1E293B]'>{data.name} </h1>
                                <h1 className='text-base font-inter font-medium text-[#1E293B]'>
                                  {data.package_pricings[0]?.name} Package
                                </h1>
                              </div>
                            </div>
                          </div>
                          <div className='col-span-2'>
                            <div className='flex flex-col space-y-2'>
                              <h1 className='text-base font-inter font-medium text-[#1E293B]'>Event Organizer </h1>
                              <div className='flex items-center gap-2'>
                                <img
                                  src={data.active ? IconTagGreen : IconTagRed}
                                  alt='Tag Icon'
                                />
                                <h1
                                  className={`text-sm font-inter font-normal ${
                                    data.active ? 'text-[#67C11D]' : 'text-red-500'
                                  }`}
                                >
                                  {data.active ? 'Ditampilkan' : 'Tidak Ditampilkan'}
                                </h1>
                              </div>
                            </div>
                          </div>
                          <div className='col-span-2'>
                            <div className='flex flex-col space-y-2'>
                              {data.package_pricings[0]?.disc_percentage !== 0 && (
                                <h1 className='text-sm font-inter font-medium text-[#1E293B] line-through'>
                                  {CurrencyIDR(
                                    data.package_pricings[0]?.total_price /
                                      (1 - data.package_pricings[0]?.disc_percentage / 100),
                                  )}
                                </h1>
                              )}
                              <h1 className='text-base font-inter font-medium text-[#1E293B]'>
                                {CurrencyIDR(data.package_pricings[0]?.total_price)}
                              </h1>
                            </div>
                          </div>
                          <div className='col-span-2'>
                            <div className='flex space-x-3'>
                              <img src={IconStarYellow} />
                              <h1 className='text-base font-inter font-medium text-[#FDBE0F]'>4.9 </h1>
                              <h1 className='text-base font-normal text-gray-800 font-inter'>(300)</h1>
                            </div>
                          </div>
                          <div className='col-span-2'>
                            <div className='flex items-center'>
                              <Link
                                to={'/admin/detail-partner/detai-list-layanan-partner'}
                                className='px-3 py-2 text-base bg-white border-2 hover:bg-primary hover:text-white text-primary border-primary rounded-xl'
                              >
                                Lihat Layanan
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className='flex justify-center'>
                      <ReactPaginate
                        breakLabel={<span className='mr-4'>...</span>}
                        nextLabel={
                          <span
                            className='flex items-center justify-center w-12 h-12 border-2 rounded-full hover:bg-cherry hover:text-white'
                            onClick={() => page < totalPages && setPage(page + 1)}
                          >
                            <svg
                              width='16'
                              height='16'
                              viewBox='0 0 16 16'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
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
                            className='flex items-center justify-center w-12 h-12 border-2 rounded-full hover:bg-cherry hover:text-white'
                            onClick={() => {
                              page > 1 && setPage(page - 1);
                            }}
                          >
                            <svg
                              width='16'
                              height='16'
                              viewBox='0 0 16 16'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M10.06 12L11 11.06L7.94667 8L11 4.94L10.06 4L6.06 8L10.06 12Z'
                                fill='currentColor'
                              />
                            </svg>
                          </span>
                        }
                        // renderOnZeroPageCount={null}
                        containerClassName='flex items-center justify center mt-8 mb-4 space-x-10'
                        disabledClassName='w-12 h-12 rounded-full border-2 flex items-center justify-center'
                        activeClassName='w-12 h-12 rounded-full border-2 bg-cherry text-white flex items-center justify-center'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterTwo />
    </div>
  );
};

export default ListLayananPartner;
