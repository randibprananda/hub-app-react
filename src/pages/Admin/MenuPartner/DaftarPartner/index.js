import * as XLSX from 'xlsx';

import {
  ActivePartner,
  BgBanner,
  BgDashboard,
  Brian,
  IconAction,
  IconAddon,
  IconFilterAscending,
  IconFilterDescending,
  IconNext,
  IconPartnerDark,
  IconPartnerGradient,
  IconPartnerGray,
  IconStakeholder,
  IconStatus,
  LogoDefault,
  NotActivePartner,
} from '../../../../assets';
import { Backdrop, Box, Fade, Modal } from '@mui/material';
import { FooterTwo, NavbarAdmin, Pagination, Sidebar } from '../../../../component';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';

import Api from '../../../../Api';
import { Close } from '@mui/icons-material';
import ReactPaginate from 'react-paginate';
import imageHandle from '../../../../utils/imageHandle';
import moment from 'moment';
import { saveAs } from 'file-saver';
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

const EditPartner = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [tender, setTender] = useState('');
  const [stakeholderList, setStakeholderList] = useState('');
  const [limit, setlimit] = useState(10);
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(false)
  const [totalPages, setTotalPages] = useState();
  const [totalData, setTotalData] = useState('');
  const [search, setSearch] = useState('');
  const [isActive, setIsActive] = useState('');
  const [addons, setAddOns] = useState('');
  const [stakeholderId, setStakeholderId] = useState('');
  const [error, setError] = useState(false);

  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [notActive, setNotActive] = useState(false);
  const [sorting, setSorting] = useState('ASC');
  const [addPartner, setAddPartner] = useState([]);
  const [id, setId] = useState('');
  const [activePartner, setActivePartner] = useState([]);
  const [companyDetail, setCompanyDetail] = useState('');
  const [partner, setPartner] = useState('');
  const handleOpenActive = (id) => {
    setActive(true);
    setPartnerId(id);
  };
  const handleCloseActive = () => setActive(false);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleNotActive = (id) => {
    setNotActive(true);
    setPartnerId(id);
  };
  const handleCloseNotActive = () => setNotActive(false);

  const [partnerId, setPartnerId] = useState('');

  const submitActive = async () => {
    try {
      const data = {
        status: true,
      };
      await Api.UpdateActivationPartnerStatus(localStorage.getItem('token-hub'), partnerId, data);
      setEnabled(false);
      setNotActive(false);
    } catch (error) {}
    setEnabled(!enabled);
    setActive(false);
  };

  const submitNotActive = async () => {
    try {
      const data = {
        status: false,
      };
      Api.UpdateActivationPartnerStatus(localStorage.getItem('token-hub'), partnerId, data);
      setEnabled(false);
      setNotActive(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataPartner = async () => {
    try {
      const response = await Api.PartnerListFilterAdmin(
        localStorage.getItem('token-hub'),
        limit,
        page,
        search,
        isActive,
        sorting,
      );
      setPartner(response.data.pagination.data);
      setTotalPages(response.data.pagination.totalPages);
      setTotalData(response.data.pagination.total);
      setError(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const exportToExcel = () => {
    const datas = partner.map((row) => ({
      fullName: row.fullname,
      isActive: row.is_active,
      role: row.role.name,
      company_name: row.company.name,
      company_email: row.company.email,
      company_phone: row.company.phone,
      company_city: row.company.city,
      company_province: row.company.province,
      company_badan_usaha: row.company.badan_usaha,
    }));

    // Create a new worksheet
    const worksheet = XLSX.utils.json_to_sheet(datas);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

    // Generate Excel file buffer
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    // Convert buffer to Blob
    const excelBlob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    // Save the Excel file using FileSaver.js
    saveAs(excelBlob, 'data.xlsx');
  };

  const handlePageChange = (page) => {
    setPage(page);
    setRefresh(true)
  };

  const handlePrevChange = () => {
      if(page === 1) {
          setPage(1)
      } else {
          setPage(page - 1);
      }
      setRefresh(true)
  };

  const handleNextChange = () => {
      if(page === totalPages) {
          setPage(totalPages)
      } else {
          setPage(page + 1);
      }
      setRefresh(true)
  };

  useEffect(() => {
    getDataPartner();
    setRefresh(false)
  }, [page, search, sorting, isActive, refresh]);

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
                h-full p-7`}>
          <NavbarAdmin
            title={'Partner'}
            image={IconPartnerGradient}
            open={open}
            setOpen={setOpen}
          />
          <div className='flex flex-wrap items-center gap-3 mb-[30px] pt-[120px]'>
            <Link
              to={'/admin'}
              className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>
              Dashboard
            </Link>
            <img
              src={IconNext}
              alt=''
            />
            <button className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>Partner</button>
          </div>
          <div className='flex flex-col'>
            <div className='-my-2'>
              <div className='inline-block w-full h-screen py-2'>
                <div className='bg-white border-b border-gray-200 shadow sm:rounded-lg'>
                  <div className='w-full px-6 py-5'>
                    <div className='flex items-center justify-between'>
                      <div className=''>
                        <h1 className='text-2xl text-[#2E3A44] font-bold'>Daftar Partner</h1>
                        <h1 className='text-base text-[#A8A8A8] font-medium'>{totalData} Partner</h1>
                      </div>
                      <div
                        className='flex gap-1 cursor-pointer'
                        onClick={exportToExcel}>
                        <h1 className='text-base text-cherry'>Ekspor</h1>
                        <svg
                          width='20'
                          height='20'
                          viewBox='0 0 20 20'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M18.8568 13.1091L15.165 10.4807C15.1272 10.4536 15.0827 10.4375 15.0364 10.4342C14.9901 10.4309 14.9437 10.4406 14.9026 10.4621C14.8178 10.5057 14.7658 10.6009 14.7656 10.6967L14.7674 11.9409H11.4462C11.305 11.9409 11.168 12.0403 11.168 12.1817V14.4701C11.168 14.6115 11.305 14.7089 11.4462 14.7089H14.801V15.9629C14.801 16.0585 14.8378 16.1463 14.9228 16.1901C15.0078 16.2339 15.0934 16.2265 15.1712 16.1707L18.8576 13.5251C18.9246 13.4773 18.953 13.3999 18.953 13.3175V13.3171C18.953 13.2343 18.9242 13.1571 18.8568 13.1091Z'
                            fill='#2D014B'
                          />
                          <path
                            d='M12.8119 15.7122H11.5139C11.4221 15.7122 11.3341 15.7486 11.2692 15.8135C11.2043 15.8784 11.1679 15.9664 11.1679 16.0582H11.1665V16.6602H3.03807V7.23356H6.58267C6.67444 7.23356 6.76245 7.19711 6.82733 7.13222C6.89222 7.06733 6.92867 6.97933 6.92867 6.88756V3.34296H11.1663V10.6142H11.1685C11.1704 10.7045 11.2076 10.7904 11.2721 10.8536C11.3367 10.9168 11.4234 10.9523 11.5137 10.9524H12.8117C13.0003 10.9524 13.1527 10.8016 13.1569 10.6142H13.1577V2.50156H13.1567V1.69756C13.1567 1.6058 13.1202 1.51779 13.0553 1.4529C12.9904 1.38802 12.9024 1.35156 12.8107 1.35156H6.23667L1.04688 6.54156V18.3054C1.04688 18.4966 1.20167 18.6514 1.39287 18.6514H12.8107C12.9024 18.6514 12.9904 18.6149 13.0553 18.55C13.1202 18.4851 13.1567 18.3971 13.1567 18.3054V17.8158H13.1577V16.0578C13.1576 15.9661 13.1212 15.8782 13.0563 15.8134C12.9915 15.7486 12.9036 15.7122 12.8119 15.7122Z'
                            fill='#2D014B'
                          />
                          <path
                            d='M5.2363 12.8365C5.4025 12.8365 5.5463 12.9611 5.5935 13.1049L6.0751 12.8807C5.9645 12.6261 5.7209 12.3438 5.2365 12.3438C4.6579 12.3438 4.2207 12.7286 4.2207 13.2988C4.2207 13.8662 4.6581 14.2536 5.2365 14.2536C5.7209 14.2536 5.9673 13.9601 6.0751 13.7137L5.5935 13.4924C5.5465 13.6362 5.4025 13.7607 5.2363 13.7607C4.9679 13.7607 4.7879 13.556 4.7879 13.2986C4.7879 13.0412 4.9677 12.8365 5.2363 12.8365ZM7.1315 13.7833C6.90986 13.7836 6.69666 13.6984 6.5363 13.5454L6.2457 13.9605C6.4421 14.1377 6.7107 14.254 7.1039 14.254C7.5993 14.254 7.9011 14.0188 7.9011 13.6118C7.9011 12.9254 6.8741 13.0747 6.8741 12.9003C6.8741 12.8533 6.9045 12.8174 7.0153 12.8174C7.1897 12.8174 7.3973 12.8781 7.5577 12.9999L7.8567 12.6042C7.6463 12.4326 7.3751 12.3467 7.0733 12.3467C6.5667 12.3467 6.3067 12.6457 6.3067 12.9585C6.3067 13.6865 7.3363 13.5065 7.3363 13.6837C7.3363 13.7555 7.2367 13.7833 7.1315 13.7833ZM8.6545 12.3743H8.0207L8.7015 14.2206H9.4047L10.0855 12.3743H9.4517L9.0531 13.6171L8.6545 12.3743Z'
                            fill='#2D014B'
                          />
                        </svg>
                      </div>
                    </div>
                    <div className='flex flex-col mt-5 space-y-3 md:justify-between md:flex-row md:space-y-0'>
                      <div className='relative w-full md:w-max'>
                        <div className='absolute top-2 right-0 flex items-center pr-3 pointer-events-none'>
                          <svg
                            width='20'
                            height='20'
                            viewBox='0 0 20 20'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
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
                      <div className='flex flex-col gap-2 space-y-3 md:space-y-0 md:flex-rowTampilkan Semua'>
                        <div className='relative'>
                          <select
                            onChange={(e) => setIsActive(e.target.value)}
                            className='bg-gray-50 text-[#A8A8A8] border border-gray-300 text-sm rounded-lg  block w-full pl-10 p-2.5 appearance-none'>
                            {/* <option value="" disabled>Filter Status</option> */}
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
                        <div className='relative'>
                          <select
                            onChange={(e) => setSorting(e.target.value)}
                            className='bg-gray-50 text-[#A8A8A8] border border-gray-300 text-sm rounded-lg  block w-full pl-10 p-2.5 appearance-none'>
                            <option disabled>Filter Partner</option>
                            <option value={'ASC'}> A - Z </option>
                            <option value={'DESC'}> Z - A</option>
                          </select>
                          <img
                            src={IconStakeholder}
                            className='absolute top-3 left-4'
                            alt=''
                          />
                          <img
                            src={sorting === 'ASC' ? IconFilterAscending : IconFilterDescending}
                            className='absolute right-4 top-3'
                            alt=''
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='overflow-x-auto scrollbar-hide'>
                    <table className='w-full divide-y divide-gray-200'>
                      <thead className='bg-gray-50'>
                        <tr>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-base font-bold text-[#2E3A44] uppercase tracking-wider truncate'>
                            Nama
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-base font-bold text-[#2E3A44] uppercase tracking-wider truncate'>
                            Badan Usaha
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-base font-bold text-[#2E3A44] uppercase tracking-wider truncate'>
                            Lokasi
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-base font-bold text-[#2E3A44] uppercase tracking-wider truncate'>
                            Kontak
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-base font-bold text-[#2E3A44] uppercase tracking-wider truncate'>
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className='bg-white divide-y divide-gray-200'>
                        {error ? (
                          <tr>
                            <td className='px-6 py-4 text-black truncate'>-</td>
                            <td className='px-6 py-4 text-black truncate'>-</td>
                            <td className='px-6 py-4 text-black truncate'>-</td>
                            <td className='px-6 py-4 text-black truncate'>-</td>
                            <td className='px-6 py-4 text-black truncate'>-</td>
                          </tr>
                        ) : (
                          Object.values(partner).map((partner) => (
                            <tr className='bg-[#F8FAFC]'>
                              <td className='px-6 py-4 truncate'>
                                <div className='flex items-center'>
                                  <div className=' h-[60px] w-[60px]'>
                                    <img
                                      className='h-[60px] w-[60px] rounded'
                                      src={
                                        !partner.company.company_logo
                                          ? LogoDefault
                                          : imageHandle(partner.company.company_logo)
                                      }
                                      alt=''
                                    />
                                  </div>
                                  <div className='flex flex-col ml-4 space-y-2'>
                                    <h1 className='text-base font-inter font-medium text-[#1E293B]'>
                                      {partner.company.name}
                                    </h1>
                                    <h1 className='text-base font-inter font-normal text-[#1E293B]'>
                                      {moment(partner.company.created).format('DD MMMM YYYY')}
                                    </h1>
                                  </div>
                                </div>
                              </td>
                              <td className='px-6 py-4 truncate'>
                                <div className='flex flex-col space-y-2'>
                                  <h1 className='text-base font-inter font-medium text-[#1E293B]'>
                                    {!partner.company.badan_usaha ? '-' : partner.company.badan_usaha}{' '}
                                  </h1>
                                  <h1 className='text-base font-inter font-normal text-[#1E293B]'>
                                    {!partner.company['jenis usaha']
                                      ? '-'
                                      : JSON.parse(partner.company['jenis usaha'])[0]}
                                  </h1>
                                </div>
                              </td>
                              <td className='px-6 py-4 truncate'>
                                <div className='flex flex-col space-y-2'>
                                  <h1 className='text-base font-inter font-medium text-[#1E293B]'>
                                    {!partner.company.city ? '-' : partner.company.city}{' '}
                                  </h1>
                                  <h1 className='text-base font-inter font-normal text-[#1E293B]'>
                                    {!partner.company.province ? '-' : partner.company.province}
                                  </h1>
                                </div>
                              </td>
                              <td className='px-6 py-4 truncate'>
                                <div className='flex flex-col space-y-2'>
                                  <h1 className='text-base font-inter font-medium text-[#1E293B]'>
                                    {!partner.company.email ? '-' : partner.company.email}
                                  </h1>
                                  <h1 className='text-base font-inter font-normal text-[#1E293B]'>
                                    {!partner.company.phone ? '-' : partner.company.phone}
                                  </h1>
                                </div>
                              </td>
                              <td className='px-6 py-4 truncate'>
                                <div className='flex items-center gap-2'>
                                  <button
                                    onClick={() => {
                                      partner.is_active ? handleNotActive(partner.id) : handleOpenActive(partner.id);
                                    }}>
                                    <div
                                      className={`${
                                        partner.is_active
                                          ? 'bg-[#EDFFF5]  border-[#54F0A5] '
                                          : 'bg-[#FFEDED]  border-[#F05454]'
                                      } px-4 py-3 flex justify-center border-2 rounded-xl`}>
                                      <div className='flex gap-3'>
                                        <span
                                          className={`${
                                            partner.is_active
                                              ? 'text-base font-medium text-[#54F0A5]'
                                              : 'text-base font-medium text-[#F05454]'
                                          }`}>
                                          {`${partner.is_active ? 'Aktif' : 'Non Aktif'}`}
                                        </span>
                                        <label class='inline-flex relative items-center cursor-pointer'>
                                          <input
                                            type='checkbox'
                                            className='sr-only peer'
                                            checked={partner.is_active}
                                            readOnly
                                          />
                                          <div className="w-11 h-6 bg-[#F05454] rounded-full peer  peer-focus:ring-[#54F0A5]  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#54F0A5]"></div>
                                        </label>
                                      </div>
                                    </div>
                                  </button>
                                  <div className=''>
                                    <Menu>
                                      <div>
                                        <Menu.Button className='inline-flex justify-center w-full px-4 py-2 text-sm font-medium hover:bg-outline-2 rounded-xl focus-visible:ring-white focus-visible:ring-opacity-75'>
                                          <svg
                                            width='18'
                                            height='34'
                                            viewBox='0 0 18 34'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'>
                                            <rect
                                              y='15'
                                              width='4'
                                              height='4'
                                              rx='1'
                                              fill='#8F8F8F'
                                            />
                                            <rect
                                              x='7'
                                              y='15'
                                              width='4'
                                              height='4'
                                              rx='1'
                                              fill='#737373'
                                            />
                                            <rect
                                              x='14'
                                              y='15'
                                              width='4'
                                              height='4'
                                              rx='1'
                                              fill='#515151'
                                            />
                                          </svg>
                                        </Menu.Button>
                                      </div>
                                      <Transition
                                        as={Fragment}
                                        enter='transition ease-out duration-100'
                                        enterFrom='transform opacity-0 scale-95'
                                        enterTo='transform opacity-100 scale-100'
                                        leave='transition ease-in duration-75'
                                        leaveFrom='transform opacity-100 scale-100'
                                        leaveTo='transform opacity-0 scale-95'>
                                        <Menu.Items className='absolute z-40 w-40 mt-2 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg right-6 ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                          <div className='px-1 py-1 '>
                                            {/* <Menu.Item>
                                                                {({ active }) => (
                                                                    <button
                                                                    onClick={navigate('/admin/detail-partner', {state: {id : partner.company.id}})}
                                                                    className={classNames(
                                                                        active
                                                                        ? "bg-gray-100 text-gray-900"
                                                                        : "text-gray-700",
                                                                        "block px-4 py-2 text-sm"
                                                                    )}
                                                                    >
                                                                    Detail Partner
                                                                    </button>

                                                                )}
                                                                </Menu.Item> */}
                                            <Menu.Item>
                                              {({ active }) => (
                                                <button
                                                  onClick={() =>
                                                    navigate('/admin/detail-partner', {
                                                      state: { companyId: partner.company.id, partnerId: partner.id },
                                                    })
                                                  }
                                                  className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm',
                                                  )}>
                                                  Detail Partner
                                                </button>
                                              )}
                                            </Menu.Item>

                                            <Menu.Item>
                                              {({ active }) => (
                                                <button
                                                  onClick={() =>
                                                    navigate('/admin/edit-partner', {
                                                      state: { id: partner.company.id },
                                                    })
                                                  }
                                                  className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm',
                                                  )}>
                                                  Edit Partner
                                                </button>
                                              )}
                                            </Menu.Item>
                                          </div>
                                        </Menu.Items>
                                      </Transition>
                                    </Menu>
                                  </div>
                                  <Modal
                                    aria-labelledby='transition-modal-title'
                                    aria-describedby='transition-modal-description'
                                    open={active}
                                    onClose={handleCloseActive}
                                    closeAfterTransition
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{
                                      timeout: 500,
                                    }}>
                                    <Fade in={active}>
                                      <Box sx={stylePatner}>
                                        <div className='flex items-start justify-end'>
                                          <button
                                            onClick={handleCloseActive}
                                            className='hover:text-dark-3'>
                                            <Close />
                                          </button>
                                        </div>
                                        <div className='my-5 space-y-6'>
                                          <div className='flex flex-col items-center justify-center'>
                                            <img src={ActivePartner} />
                                            <h1 className='font-medium text-[18px]'>
                                              Anda yakin untuk{' '}
                                              <span className='font-bold text-primary'>mengaktikan</span> partner{' '}
                                              {companyDetail.company}{' '}
                                            </h1>
                                            <p className='font-normal text-[14px]'>
                                              Partner yang anda aktifkan, akan dapat melakukan kuasanya kembali sebagai
                                              partner{' '}
                                            </p>
                                          </div>
                                          <div className='flex flex-row justify-center gap-3 mt-10'>
                                            <button
                                              className='px-5 py-2 ml-2 font-semibold bg-gray-300 border rounded-md text-cherry hover:text-white hover:bg-cherry/50'
                                              onClick={handleCloseActive}>
                                              Batalkan
                                            </button>
                                            <button
                                              className='px-5 py-2 ml-2 font-semibold text-white rounded-md bg-cherry hover:bg-cherry/50'
                                              onClick={() => submitActive(partner.id)}>
                                              Aktifkan
                                            </button>
                                          </div>
                                        </div>
                                      </Box>
                                    </Fade>
                                  </Modal>
                                  <Modal
                                    aria-labelledby='transition-modal-title'
                                    aria-describedby='transition-modal-description'
                                    open={notActive}
                                    onClose={handleCloseNotActive}
                                    closeAfterTransition
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{
                                      timeout: 500,
                                    }}>
                                    <Fade in={notActive}>
                                      <Box sx={stylePatner}>
                                        <div className='flex items-start justify-end'>
                                          <button
                                            onClick={handleCloseNotActive}
                                            className='hover:text-dark-3'>
                                            <Close />
                                          </button>
                                        </div>
                                        <div className='my-5 space-y-6'>
                                          <div className='flex flex-col items-center justify-center'>
                                            <img src={NotActivePartner} />
                                            <h1 className='font-medium text-[18px]'>
                                              Anda yakin untuk{' '}
                                              <span className='text-[#C1121F] font-bold'>Non Aktikan</span> partner{' '}
                                              {companyDetail.company}{' '}
                                            </h1>
                                            <p className='font-normal text-[14px]'>
                                              Partner yang anda non aktifkan, tidak akan dapat melakukan kuasanya
                                              sebagai partner{' '}
                                            </p>
                                          </div>
                                          <div className='flex flex-row justify-center gap-3 mt-10'>
                                            <button
                                              className='px-5 py-2 ml-2 font-semibold bg-gray-300 border rounded-md text-cherry hover:text-white hover:bg-cherry/50'
                                              onClick={handleCloseNotActive}>
                                              Batalkan
                                            </button>
                                            <button
                                              className='px-5 py-2 ml-2 font-semibold text-white rounded-md bg-cherry hover:bg-cherry/50'
                                              onClick={() => submitNotActive(partner.id)}>
                                              Non Aktifkan
                                            </button>
                                          </div>
                                        </div>
                                      </Box>
                                    </Fade>
                                  </Modal>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className='flex justify-center py-8'>
                  <Pagination
                      currentPage={page} 
                      totalPages={totalPages}
                      showingData={!partner.length < limit ? partner.length : limit}
                      onPageChange={handlePageChange}
                      onPrevChange={handlePrevChange}
                      onNextChange={handleNextChange}
                  />
                  </div>
                  <div></div>
                  {/* <Modal
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    open={active}
                                    onClose={handleCloseActive}
                                    closeAfterTransition
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{
                                        timeout: 500,
                                    }}
                                >
                                    <Fade in={active}>
                                        <Box sx={stylePatner}>
                                            <div className='flex items-start justify-end'>

                                                <button onClick={handleCloseActive} className='hover:text-dark-3'>
                                                    <Close />
                                                </button>
                                            </div>
                                            <div className='my-5 space-y-6'>
                                                <div className='flex flex-col items-center justify-center'>
                                                    <img src={ActivePartner} />
                                                    <h1 className='font-medium text-[18px]'>Anda yakin untuk <span className='font-bold text-primary'>mengaktikan</span> partner Xeno.entertaiment?  </h1>
                                                    <p className='font-normal text-[14px]'>Partner yang anda aktifkan, akan dapat melakukan kuasanya kembali sebagai partner </p>
                                                </div>
                                                <div className="flex flex-row justify-center gap-3 mt-10">
                                                    <button
                                                        className="px-5 py-2 ml-2 font-semibold bg-gray-300 border rounded-md text-cherry hover:text-white hover:bg-cherry/50"
                                                        onClick={handleCloseActive}
                                                    >
                                                        Batalkan
                                                    </button>
                                                    <button
                                                        className="px-5 py-2 ml-2 font-semibold text-white rounded-md bg-cherry hover:bg-cherry/50"
                                                        onClick={submitActive}
                                                    >
                                                        Aktifkan
                                                    </button>
                                                </div>

                                            </div>
                                        </Box>
                                    </Fade>
                                </Modal>

                                <Modal
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    open={notActive}
                                    onClose={handleCloseNotActive}
                                    closeAfterTransition
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{
                                        timeout: 500,
                                    }}
                                >
                                    <Fade in={notActive}>
                                        <Box sx={stylePatner}>
                                            <div className='flex items-start justify-end'>

                                                <button onClick={handleCloseNotActive} className='hover:text-dark-3'>
                                                    <Close />
                                                </button>
                                            </div>
                                            <div className='my-5 space-y-6'>
                                                <div className='flex flex-col items-center justify-center'>
                                                    <img src={NotActivePartner} />
                                                    <h1 className='font-medium text-[18px]'>Anda yakin untuk <span className='text-[#C1121F] font-bold'>Non Aktikan</span> partner Xeno.entertaiment?  </h1>
                                                    <p className='font-normal text-[14px]'>Partner yang anda non aktifkan, tidak akan dapat melakukan kuasanya  sebagai partner </p>
                                                </div>
                                                <div className="flex flex-row justify-center gap-3 mt-10">
                                                    <button
                                                        className="px-5 py-2 ml-2 font-semibold bg-gray-300 border rounded-md text-cherry hover:text-white hover:bg-cherry/50"
                                                        onClick={handleCloseNotActive}
                                                    >
                                                        Batalkan
                                                    </button>
                                                    <button
                                                        className="px-5 py-2 ml-2 font-semibold text-white rounded-md bg-cherry hover:bg-cherry/50"
                                                        onClick={submitNotActive}
                                                    >
                                                        Non Aktifkan
                                                    </button>
                                                </div>

                                            </div>
                                        </Box>
                                    </Fade>
                                </Modal> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterTwo />
      </div>
    </div>
  );
};

export default EditPartner;
