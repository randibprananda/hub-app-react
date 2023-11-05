import 'moment/locale/id';

import * as XLSX from 'xlsx';

import { Backdrop, Box, Fade, Modal } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Brian,
  Calendar,
  IconDate,
  IconDropdown,
  IconNext,
  IconNotification,
  IconService,
  IconStakeholder,
  IconStatus,
  IconTransactionDark,
  IconTransactionGray,
  IconUploud,
  Logo2,
  LogoDefault,
} from '../../../../assets';
import { FooterTwo, NavbarAdmin, Pagination, Sidebar } from '../../../../component';

import { saveAs } from 'file-saver';
import { debounce } from 'lodash';
import moment from 'moment';
import DatePicker from 'react-multi-date-picker';
import ReactPaginate from 'react-paginate';
import { writeFile } from 'xlsx';
import Api from '../../../../Api';
import { UrlApi } from '../../../../constants';
import imageHandle from '../../../../utils/imageHandle';

const DaftarTransaction = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [date, setDate] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const handleClose2 = () => setShowModal2(false);
  const handleClose = () => setShowModal(false);
  const [file, setFile] = useState(null);
  const [transactionDetail, setTransactionDetail] = useState('');
  const [transactionDetailUser, setTransactionDetailUser] = useState('');
  const [transactionDetailClient, setTransactionDetailClient] = useState('');
  const [transactionDetailPackage, setTransactionDetailPackage] = useState('');
  const [transactionDetailCompany, setTransactionDetailCompany] = useState('');
  const [transactionDetailService, setTransactionDetailService] = useState('');

  const [statusUpdate, setStatusUpdate] = useState('');
  const [dateInvoice, setDateInvoice] = useState('');
  const [paymentFile, setPaymentFile] = useState('');
  const [cancelationReason, setCancelationReason] = useState('');
  const fileInputRef = useRef(null);

  const [selectedRange, setSelectedRange] = useState([]);

  const handleDateChange = (newRange) => {
    setSelectedRange(newRange);
    console.log('Selected Date Range:', newRange);
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
    maxWidth: '500px',
  };
  const modalContentStyle = {
    position: 'relative',
    background: 'white',
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
    maxWidth: '500px',
  };

  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
    }
  };

  const showDetail2 = async (id) => {
    setShowModal2(!showModal2);
    try {
      const response = await Api.TransactionDetail(localStorage.getItem('token-hub'), id);
      setTransactionDetail(response.data.transaction);
      setTransactionDetailUser(response.data.transaction.client.users_detail);
      setTransactionDetailClient(response.data.transaction.client);
      setTransactionDetailPackage(response.data.transaction.package_pricing);
      setTransactionDetailCompany(response.data.transaction.package_pricing.service.user.company);
      setTransactionDetailService(response.data.transaction.package_pricing.service);
      setStatusUpdate(response.data.transaction.status);
      setDateInvoice(response.data.transaction.createdAt);
      setPaymentFile(response.data.transaction.payment_file);
      setCancelationReason(response.data.transaction.cancelation_reason);
    } catch (error) {
      console.log(error);
    }
  };

  const showAccordion = async (id) => {
    try {
      const response = await Api.TransactionDetail(localStorage.getItem('token-hub'), id);
      setTransactionDetail(response.data.transaction);
      setTransactionDetailUser(response.data.transaction.client.users_detail);
      setTransactionDetailClient(response.data.transaction.client);
      setTransactionDetailPackage(response.data.transaction.package_pricing);
      setTransactionDetailCompany(response.data.transaction.package_pricing.service.user.company);
      setTransactionDetailService(response.data.transaction.package_pricing.service);
      setStatusUpdate(response.data.transaction.status);
      setDateInvoice(response.data.transaction.createdAt);
      setPaymentFile(response.data.transaction.payment_file);
      setCancelationReason(response.data.transaction.cancelation_reason);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTransaction = async (id) => {
    try {
      const data = {
        status: statusUpdate,
        date_invoice: dateInvoice,
        payment_file: paymentFile,
        cancelation_reason: cancelationReason,
      };
      await Api.UpdateTransactionAdmin(localStorage.getItem('token-hub'), id, data);
      setShowModal2(!showModal2);
      setRefreshApi(!refreshApi);
    } catch (error) {
      console.log(error);
    }
  };

  const showDetail = async (id) => {
    setShowModal(!showModal);
    try {
      const response = await Api.TransactionDetail(localStorage.getItem('token-hub'), id);
      setTransactionDetail(response.data.transaction);
      setTransactionDetailUser(response.data.transaction.client.users_detail);
      setTransactionDetailClient(response.data.transaction.client);
      setTransactionDetailPackage(response.data.transaction.package_pricing);
      setTransactionDetailCompany(response.data.transaction.package_pricing.service.user.company);
      setTransactionDetailService(response.data.transaction.package_pricing.service);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handlePageClick = () => {
    setPage(page + 1);
  };

  const [transactionData, setTransactionData] = useState('');
  const [error, setError] = useState('');
  const [limit, setlimit] = useState(10);
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(false)
  const [totalPages, setTotalPages] = useState();
  const [totalData, setTotalData] = useState();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [companyList, setCompanyList] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [refreshApi, setRefreshApi] = useState(false);

  console.log({ transactionDetail });

  const getData = async () => {
    try {
      const resCompany = await Api.TransactionGetCompany(localStorage.getItem('token-hub'));
      const companyList = resCompany.data.companies;

      // Menggunakan objek Set untuk menyaring nama perusahaan yang unik
      const uniqueNames = new Set();
      const filteredCompanies = companyList.filter((company) => {
        if (company.name && company.name !== '' && !uniqueNames.has(company.name)) {
          uniqueNames.add(company.name);
          return true;
        }
        return false;
      });

      setCompanyList(filteredCompanies);
      const response = await Api.TransactionListAdmin(
        localStorage.getItem('token-hub'),
        limit,
        page,
        search,
        status,
        selectedRange[0] === undefined ? '' : selectedRange[0],
        selectedRange[1] === undefined ? '' : selectedRange[1],
        serviceType,
        companyId,
      );
      setTransactionData(response.data.pagination.data);
      setTotalPages(response.data.pagination.totalPages);
      setTotalData(response.data.pagination.total);

      setError(false);
    } catch (error) {
      setError(true);
    }
  };

  const handleFileUploud = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      setPaymentFile(base64);
    };
  };

  //   const debouncedSearch = debounce(async (searchQuery) => {
  //     try {
  //       const response = await Api.TransactionListAdmin(
  //         localStorage.getItem('token-hub'),
  //         limit,
  //         page,
  //         searchQuery,
  //         status,
  //         minDate,
  //         maxDate,
  //         serviceType,
  //         companyId,
  //       );
  //       setTransactionData(response.data.pagination.data);
  //       setTotalPages(response.data.pagination.totalPages);
  //       setError(false);
  //     } catch (error) {
  //       setError(true);
  //     }
  //   }, 300);

  //   const handleSearch = (event) => {
  //     const searchQuery = event.target.value;
  //     debouncedSearch(searchQuery);
  //   };

  //   const debouncedMinDate = debounce(async (minDate) => {
  //     try {
  //       const response = await Api.TransactionListAdmin(
  //         localStorage.getItem('token-hub'),
  //         limit,
  //         page,
  //         search,
  //         status,
  //         minDate,
  //         maxDate,
  //         serviceType,
  //         companyId,
  //       );
  //       setTransactionData(response.data.pagination.data);
  //       setTotalPages(response.data.pagination.totalPages);
  //       setError(false);
  //     } catch (error) {
  //       setError(true);
  //     }
  //   }, 300);

  //   const handleMinDate = (event) => {
  //     const minDateQuery = event.target.value;
  //     debouncedMinDate(minDateQuery);
  //   };

  //   const debouncedMaxDate = debounce(async (maxDate) => {
  //     try {
  //       const response = await Api.TransactionListAdmin(
  //         localStorage.getItem('token-hub'),
  //         limit,
  //         page,
  //         search,
  //         status,
  //         minDate,
  //         maxDate,
  //         serviceType,
  //         companyId,
  //       );
  //       setTransactionData(response.data.pagination.data);
  //       setTotalPages(response.data.pagination.totalPages);
  //       setError(false);
  //     } catch (error) {
  //       setError(true);
  //     }
  //   }, 300);

  //   const handleMaxDate = (event) => {
  //     const maxdateQuery = event.target.value;
  //     console.log({maxdateQuery})
  //     debouncedMaxDate(maxdateQuery);
  //   };

  //   const debouncedStatus = debounce(async (status) => {
  //     try {
  //       const response = await Api.TransactionListAdmin(
  //         localStorage.getItem('token-hub'),
  //         limit,
  //         page,
  //         search,
  //         status,
  //         minDate,
  //         maxDate,
  //         serviceType,
  //         companyId,
  //       );
  //       setTransactionData(response.data.pagination.data);
  //       setTotalPages(response.data.pagination.totalPages);
  //       setError(false);
  //     } catch (error) {
  //       setError(true);
  //     }
  //   }, 300);

  //   const handleStatus = (event) => {
  //     const statusdateQuery = event.target.value;
  //     debouncedStatus(statusdateQuery);
  //   };

  //   const debouncedCompany = debounce(async (company) => {
  //     try {
  //       const response = await Api.TransactionListAdmin(
  //         localStorage.getItem('token-hub'),
  //         limit,
  //         page,
  //         search,
  //         status,
  //         minDate,
  //         maxDate,
  //         serviceType,
  //         company,
  //       );
  //       setTransactionData(response.data.pagination.data);
  //       setTotalPages(response.data.pagination.totalPages);
  //       setError(false);
  //     } catch (error) {
  //       setError(true);
  //     }
  //   }, 300);

  //   const handleCompany = (event) => {
  //     const companydateQuery = event.target.value;
  //     debouncedCompany(companydateQuery);
  //   };

  //   const debouncedServiceType = debounce(async (serviceType) => {
  //     try {
  //       const response = await Api.TransactionListAdmin(
  //         localStorage.getItem('token-hub'),
  //         limit,
  //         page,
  //         search,
  //         status,
  //         minDate,
  //         maxDate,
  //         serviceType,
  //         companyId,
  //       );
  //       setTransactionData(response.data.pagination.data);
  //       setTotalPages(response.data.pagination.totalPages);
  //       setError(false);
  //     } catch (error) {
  //       setError(true);
  //     }
  //   }, 300);

  //   const handleServiceType = (event) => {
  //     const serviceTypedateQuery = event.target.value;
  //     debouncedServiceType(serviceTypedateQuery);
  //   };

  const exportToExcel = () => {
    // Sample data array
    const data = transactionData;

    const updatedData = data.map(
      ({
        status,
        service_status,
        totalPayment,
        eventBrief,
        startDate,
        endDate,
        billingTo,
        servicePrice,
        adminFee,
        paymentMethod,
        numberInvoice,
        dateInvoice,
        qty,
        payment_file,
        cancelation_reason,
        timeInvoice,
        taxFee,
      }) => ({
        status,
        service_status,
        totalPayment,
        eventBrief,
        startDate,
        endDate,
        billingTo,
        servicePrice,
        adminFee,
        paymentMethod,
        numberInvoice,
        dateInvoice,
        qty,
        payment_file,
        cancelation_reason,
        timeInvoice,
        taxFee,
      }),
    );

    // Create a new worksheet
    const worksheet = XLSX.utils.json_to_sheet(updatedData);

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
    getData();
  }, [page, refreshApi, status, serviceType, search, companyId, selectedRange, refresh]);

  return (
    <div>
      <div className='h-screen bg-outline'>
        <Sidebar
          activeMenu={3}
          open={open}
          setOpen={setOpen}
        />

        <div
          className={`${open ? 'lg:ml-80 md:ml-28 ml-0' : 'lg:ml-24 md:ml-28 ml-0'} 
            h-full p-7`}>
          <NavbarAdmin
            title={'Transaction'}
            image={IconTransactionDark}
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
            <button className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>Transaction</button>
          </div>
          <div className='flex flex-col'>
            <div className='-my-2'>
              <div className='inline-block w-full py-2'>
                <div className='relative bg-white border-b border-gray-200 shadow sm:rounded-lg'>
                  <div className='w-full px-6 py-5'>
                    <div className='flex items-center justify-between'>
                      <div className=''>
                        <h1 className='text-2xl text-[#2E3A44] font-bold'>Daftar Transaksi</h1>
                        <h1 className='text-base text-[#A8A8A8] font-medium'>{totalData} Transaksi</h1>
                      </div>
                      <button
                        onClick={exportToExcel}
                        className='flex gap-1'>
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
                      </button>
                    </div>
                    <div className='flex flex-col mt-5 space-y-3 md:justify-between md:flex-row md:space-y-0'>
                      {/* Search */}
                      <div className='relative w-full md:w-max'>
                        <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
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
                          placeholder='Search Invoice'
                          required
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>
                      <div className='flex flex-col gap-2 space-y-3 md:space-y-0 md:flex-row'>
                        {/* Filter Status */}
                        <div className='relative'>
                          <select
                            onChange={(e) => setStatus(e.target.value)}
                            className='bg-gray-50 text-[#A8A8A8] border border-gray-300 text-sm rounded-lg  block pl-10 p-2.5 appearance-none'>
                            <option
                              value=''
                              disabled>
                              Filter Status
                            </option>
                            <option value={''}>Tampilkan Semua</option>
                            <option value={'UNPAID'}>Belum Bayar</option>
                            <option value={'PAID'}>Sudah Bayar</option>
                            <option value={'COMPLETE'}>Selesai</option>
                            <option value={'FAILED'}>Gagal</option>
                          </select>
                          <img
                            src={IconStatus}
                            className='absolute top-3 left-4'
                            alt=''
                          />
                        </div>
                        {/* //! Filter Tanggal Diganti Dengan DatePicker */}
                        {/* <div className='flex items-center gap-2'>
                          <input
                            onChange={handleMinDate}
                            id='min-date'
                            type='date'
                            className='bg-gray-50 text-[#A8A8A8] border border-gray-300 text-sm rounded-lg  block pl-3 p-2.5'
                          />
                          <h1>-</h1>
                          <input
                            onChange={handleMaxDate}
                            id='max-date'
                            type='date'
                            className='bg-gray-50 text-[#A8A8A8] border border-gray-300 text-sm rounded-lg  block pl-3 p-2.5'
                          />
                        </div> */}

                        <div className='relative mt-6'>
                          <img
                            src={Calendar}
                            className='absolute top-[14px] left-4'
                            alt=''
                          />
                          <DatePicker
                            range
                            placeholder='Filter Tanggal'
                            style={{
                              backgroundColor: '#FAFAFA',
                              width: '161px',
                              height: '100%',
                              padding: '8px',
                              borderRadius: '8px',
                              outlineColor: '#FAFAFA',
                              pointerEvents: 'auto',
                              paddingLeft: '40px',
                              fontSize: '14px',
                            }}
                            containerStyle={{
                              width: '100%',
                            }}
                            minDate={startDate}
                            maxDate={endDate}
                            onChange={handleDateChange}
                          />
                        </div>

                        <div className='relative'>
                          <select
                            onChange={(e) => setCompanyId(e.target.value)}
                            className='bg-gray-50 text-[#A8A8A8] border border-gray-300 text-sm rounded-lg  block pl-10 p-2.5 appearance-none'>
                            <option
                              value=''
                              disabled>
                              Filter Perusahaan
                            </option>
                            <option value={''}>Tampilkan Semua</option>
                            {Object.values(companyList).map((data, index) => {
                              return (
                                <option
                                  key={index}
                                  value={data.id}>
                                  {data.name}{' '}
                                </option>
                              );
                            })}
                          </select>
                          <img
                            src={IconStakeholder}
                            className='absolute top-3 left-4'
                            alt=''
                          />
                        </div>
                        <div className='relative'>
                          <select
                            onChange={(e) => setServiceType(e.target.value)}
                            className='bg-gray-50 text-[#A8A8A8] border border-gray-300 text-sm rounded-lg  block pl-10 p-2.5 appearance-none'>
                            <option
                              value=''
                              disabled>
                              Filter Layanan{' '}
                            </option>
                            <option value={''}>Tampilkan Semua</option>
                            <option value={'EO'}>Event Organnizer</option>
                            <option value={'VENUE'}>Venue</option>
                            <option value={'PRODUCT'}>Product</option>
                            <option value={'TALENT'}>Talent</option>
                          </select>
                          <img
                            src={IconService}
                            className='absolute top-3 left-4'
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
                            Invoice
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-base font-bold text-[#2E3A44] uppercase tracking-wider truncate'>
                            Layanan
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-base font-bold text-[#2E3A44] uppercase tracking-wider truncate'>
                            Total
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-base font-bold text-[#2E3A44] uppercase tracking-wider truncate'>
                            Status
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-base font-bold text-[#2E3A44] uppercase tracking-wider truncate'>
                            Aksi
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
                          Object.values(transactionData).map((data, index) => {
                            return (
                              <React.Fragment key={index}>
                                <tr className={`${activeIndex === index ? 'bg-[#F9FBFC]' : 'bg-[#F9FBFC]'}`}>
                                  <td className='px-6 py-4 truncate'>
                                    <button
                                      onClick={() => showDetail(data.id)}
                                      className='text-base font-semibold underline text-cherry'>
                                      {data.numberInvoice}
                                    </button>
                                    <Modal
                                      aria-labelledby='transition-modal-title'
                                      aria-describedby='transition-modal-description'
                                      open={showModal}
                                      onClose={handleClose}
                                      closeAfterTransition
                                      BackdropComponent={Backdrop}
                                      BackdropProps={{
                                        timeout: 500,
                                      }}
                                      sx={modalWrapper}>
                                      <Fade in={showModal}>
                                        <Box sx={modalBlock}>
                                          <Box sx={modalContentStyle}>
                                            <div className='space-y-5'>
                                              <div className='space-y-4'>
                                                <div className='flex items-center justify-between'>
                                                  <div className=''>
                                                    <h1 className='font-bold text-xl text-[#2E3A44] mb-1.5'>
                                                      Detail Invoice
                                                    </h1>
                                                    <h1 className='text-xs text-[#00CDB4] font-semibold'>
                                                      #{transactionDetail.numberInvoice}
                                                    </h1>
                                                  </div>
                                                  <div>
                                                    <img
                                                      src={Logo2}
                                                      alt=''
                                                    />
                                                  </div>
                                                </div>
                                                <hr className='my-10 bg-[#E3E8F1] border border-[#E3E8F1]'></hr>
                                                <div className='flex justify-between mb-5'>
                                                  <div className='flex items-center gap-3'>
                                                    <img
                                                      src={
                                                        !transactionDetailClient.image
                                                          ? LogoDefault
                                                          : imageHandle(transactionDetailClient.image)
                                                      }
                                                      className='w-[50px] h-[50px] rounded-full'
                                                      alt=''
                                                    />
                                                    <div className=''>
                                                      <h1 className='text-sm text-[#2E3A44] font-semibold mb-1'>
                                                        Pelanggan
                                                      </h1>
                                                      <h1 className='text-sm text-[#A8A8A8]'>
                                                        {transactionDetailClient.fullname}
                                                      </h1>
                                                    </div>
                                                  </div>
                                                  <h1 className='text-sm text-[#2E3A44]'>
                                                    {moment(transactionDetail.dateInvoice).format('DD MMMM YYYY')}
                                                  </h1>
                                                </div>
                                                <div>
                                                  <h1 className='text-sm text-[#2E3A44] font-semibold mb-1'>Alamat</h1>
                                                  <h1 className='text-sm text-[#A8A8A8]'>
                                                    {!transactionDetailUser.address
                                                      ? '-'
                                                      : transactionDetailUser.address}
                                                  </h1>
                                                </div>
                                                <div className='flex gap-8'>
                                                  <div>
                                                    <h1 className='text-sm text-[#2E3A44] font-semibold mb-1'>Email</h1>
                                                    <h1 className='text-sm text-[#A8A8A8]'>
                                                      {!transactionDetailClient.email
                                                        ? '-'
                                                        : transactionDetailClient.email}
                                                    </h1>
                                                  </div>
                                                  <div>
                                                    <h1 className='text-sm text-[#2E3A44] font-semibold mb-1'>
                                                      Telepon
                                                    </h1>
                                                    <h1 className='text-sm text-[#A8A8A8]'>
                                                      {!transactionDetailClient.phone
                                                        ? '-'
                                                        : transactionDetailClient.phone}
                                                    </h1>
                                                  </div>
                                                </div>
                                                <hr className='my-10 bg-[#E3E8F1] border border-[#E3E8F1]'></hr>
                                                <div className='p-3 bg-[#F9FBFC]'>
                                                  <h1 className='text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#2D014B] to-[#00CDB4] font-semibold mb-1'>
                                                    {transactionDetailService.name} [{transactionDetailPackage.name}]
                                                  </h1>
                                                  <h1 className='text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#2D014B] to-[#00CDB4]'>
                                                    {transactionDetailCompany.name}
                                                  </h1>
                                                </div>
                                                <div className='flex justify-between'>
                                                  <h1 className='text-sm text-[#2E3A44] font-semibold'>Pembayaran</h1>
                                                  <h1 className='text-sm text-[#2E3A44] capitalize'>
                                                    {transactionDetail.paymentMethod}
                                                  </h1>
                                                </div>
                                                <div className='flex justify-between'>
                                                  <h1 className='text-sm text-[#2E3A44] font-semibold'>Harga</h1>
                                                  <h1 className='text-sm text-[#2E3A44]'>
                                                    Rp{transactionDetail.servicePrice}
                                                  </h1>
                                                </div>
                                                <div className='flex justify-between'>
                                                  <h1 className='text-sm text-[#2E3A44] font-semibold'>Pajak</h1>
                                                  <h1 className='text-sm text-[#2E3A44]'>
                                                    Rp{transactionDetail.adminFee}
                                                  </h1>
                                                </div>
                                                <div className='flex justify-between'>
                                                  <h1 className='text-sm text-[#2E3A44] font-semibold'>
                                                    Biaya Layanan
                                                  </h1>
                                                  <h1 className='text-sm text-[#2E3A44]'>
                                                    {transactionDetail.adminFee}
                                                  </h1>
                                                </div>
                                                <hr className='my-10 bg-[#E3E8F1] border border-[#E3E8F1]'></hr>
                                                <div className='flex justify-between'>
                                                  <h1 className='text-sm text-[#2E3A44] font-semibold'>Total</h1>
                                                  <h1 className='text-sm text-[#2E3A44] font-bold'>
                                                    Rp{transactionDetail.totalPayment}
                                                  </h1>
                                                </div>
                                                <div className='flex items-end justify-end space-x-4'>
                                                  <button
                                                    onClick={() => showDetail()}
                                                    className='text-sm px-4 py-2 w-max rounded-md border-[#E3E8F1] border-2 text-[#454545] font-[500] flex justify-center items-center'>
                                                    Batal
                                                  </button>
                                                  {transactionDetail.payment_file && (
                                                    <a
                                                      href={UrlApi + transactionDetail.payment_file}
                                                      className='text-sm px-4 py-2 w-max rounded-md bg-[#00CDB4] text-white flex items-center justify-center font-[500] gap-1'>
                                                      <svg
                                                        width='16'
                                                        height='17'
                                                        viewBox='0 0 16 17'
                                                        fill='none'
                                                        xmlns='http://www.w3.org/2000/svg'>
                                                        <path
                                                          d='M3.99935 13.8346C3.63268 13.8346 3.3189 13.7042 3.05802 13.4433C2.79668 13.182 2.66602 12.868 2.66602 12.5013V10.5013H3.99935V12.5013H11.9993V10.5013H13.3327V12.5013C13.3327 12.868 13.2022 13.182 12.9413 13.4433C12.68 13.7042 12.366 13.8346 11.9993 13.8346H3.99935ZM7.99935 11.168L4.66602 7.83464L5.59935 6.86797L7.33268 8.6013V3.16797H8.66602V8.6013L10.3993 6.86797L11.3327 7.83464L7.99935 11.168Z'
                                                          fill='white'
                                                        />
                                                      </svg>
                                                      Unduh pdf
                                                    </a>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          </Box>
                                        </Box>
                                      </Fade>
                                    </Modal>
                                    <h1 className='text-[#2E3A44] text-base'>
                                      {moment(data.dateInvoice).format('DD MMMM YYYY')}
                                    </h1>
                                  </td>
                                  <td className='px-6 py-4 truncate'>
                                    <div className='flex items-center gap-1'>
                                      <h1 className='text-[#2E3A44] text-base font-semibold'>{data?.eventBrief}</h1>
                                      <h1 className='text-[#A8A8A8] text-base'>[{data?.package_pricing?.name}]</h1>
                                    </div>
                                    <h1 className='text-[#2E3A44] text-base'>{data?.package_pricing?.company.name}</h1>
                                  </td>
                                  <td className='px-6 py-4 truncate'>
                                    <h1 className='text-sm text-[#A8A8A8] line-through'>Rp. {data?.totalPayment}</h1>
                                    <h1 className='text-base text-[#2E3A44] font-semibold'>Rp. {data?.servicePrice}</h1>
                                  </td>
                                  <td className='px-6 py-4 truncate'>
                                    <div
                                      className={`rounded-lg px-[10px] py-[6px] ${
                                        data.status === 'FAILED' ? 'bg-[#FFEDED]' : 'bg-[#ECF8FF]'
                                      } border ${
                                        data.status === 'FAILED' ? 'border-[#F05454]' : 'border-[#54A5F0]'
                                      } w-max`}>
                                      <span
                                        className={`${
                                          data.status === 'FAILED' ? 'text-[#F05454]' : 'text-[#54A5F0]'
                                        } text-base`}>
                                        {data.status}
                                      </span>
                                    </div>
                                  </td>
                                  <td className='px-6 py-4 truncate'>
                                    <div className='flex items-center gap-4'>
                                      <button onClick={() => showDetail2(data.id)}>
                                        <svg
                                          width='26'
                                          height='26'
                                          viewBox='0 0 26 26'
                                          fill='none'
                                          xmlns='http://www.w3.org/2000/svg'>
                                          <path
                                            fill-rule='evenodd'
                                            clip-rule='evenodd'
                                            d='M23.2435 5.86662C23.3465 6.02284 23.3923 6.2098 23.3734 6.39592C23.3544 6.58204 23.2718 6.75592 23.1395 6.8882L13.1805 16.8462C13.0786 16.948 12.9514 17.0209 12.8121 17.0575L8.66403 18.1408C8.52692 18.1765 8.38283 18.1758 8.24608 18.1387C8.10932 18.1016 7.98466 18.0293 7.88446 17.9291C7.78426 17.8289 7.71201 17.7042 7.67488 17.5675C7.63774 17.4307 7.63702 17.2867 7.67278 17.1495L8.75612 13.0025C8.78774 12.8781 8.8474 12.7624 8.93053 12.6645L18.9264 2.67512C19.0788 2.52296 19.2853 2.4375 19.5006 2.4375C19.7159 2.4375 19.9224 2.52296 20.0748 2.67512L23.1395 5.73879C23.1784 5.77779 23.2133 5.82062 23.2435 5.86662ZM21.4159 6.31295L19.5006 4.3987L10.2728 13.6265L9.5957 16.219L12.1881 15.5419L21.4159 6.31295Z'
                                            fill='#00CDB4'
                                          />
                                          <path
                                            d='M21.278 18.59C21.5741 16.0592 21.6687 13.509 21.5608 10.9633C21.5584 10.9033 21.5685 10.8435 21.5903 10.7876C21.6121 10.7317 21.6452 10.6808 21.6875 10.6383L22.7535 9.57229C22.7826 9.543 22.8196 9.52274 22.86 9.51395C22.9003 9.50516 22.9424 9.50821 22.9811 9.52274C23.0197 9.53727 23.0534 9.56266 23.078 9.59586C23.1026 9.62906 23.117 9.66865 23.1197 9.70988C23.3203 12.7337 23.2442 15.7696 22.8922 18.7795C22.6365 20.97 20.8772 22.6871 18.6964 22.9309C14.9106 23.3501 11.09 23.3501 7.3041 22.9309C5.12443 22.6871 3.36401 20.97 3.10835 18.7795C2.6592 14.9396 2.6592 11.0603 3.10835 7.22037C3.36401 5.02987 5.12335 3.31279 7.3041 3.06904C10.1775 2.75041 13.0726 2.67323 15.9588 2.83829C16.0002 2.84126 16.0397 2.856 16.0729 2.88077C16.1061 2.90554 16.1315 2.93931 16.1461 2.97806C16.1607 3.01682 16.1639 3.05895 16.1553 3.09946C16.1466 3.13996 16.1266 3.17715 16.0975 3.20663L15.0218 4.28129C14.9796 4.32327 14.9293 4.35617 14.874 4.37797C14.8187 4.39977 14.7595 4.41 14.7 4.40804C12.2915 4.32617 9.88022 4.41849 7.48501 4.68429C6.78512 4.76176 6.13177 5.07291 5.63051 5.56748C5.12926 6.06205 4.80937 6.71116 4.72251 7.40996C4.28815 11.124 4.28815 14.8759 4.72251 18.59C4.80937 19.2888 5.12926 19.9379 5.63051 20.4324C6.13177 20.927 6.78512 21.2382 7.48501 21.3156C11.1196 21.7219 14.8809 21.7219 18.5166 21.3156C19.2165 21.2382 19.8698 20.927 20.3711 20.4324C20.8724 19.9379 21.1912 19.2888 21.278 18.59Z'
                                            fill='#00CDB4'
                                          />
                                        </svg>
                                      </button>
                                      <Modal
                                        aria-labelledby='transition-modal-title'
                                        aria-describedby='transition-modal-description'
                                        open={showModal2}
                                        onClose={handleClose2}
                                        closeAfterTransition
                                        BackdropComponent={Backdrop}
                                        BackdropProps={{
                                          timeout: 500,
                                        }}
                                        sx={modalWrapper}>
                                        <Fade in={showModal2}>
                                          <Box sx={modalBlock}>
                                            <Box sx={modalContentStyle}>
                                              <div className='space-y-5'>
                                                <div className='space-y-4'>
                                                  <div className='flex items-center justify-between'>
                                                    <div className=''>
                                                      <h1 className='font-bold text-xl text-[#2E3A44] mb-1.5'>
                                                        Ubah Pesanan
                                                      </h1>
                                                      <div className='flex gap-1'>
                                                        <h1 className='text-xs text-[#00CDB4] font-semibold'>
                                                          #{transactionDetail.numberInvoice}
                                                        </h1>
                                                        <h1 className='text-xs text-[#00CDB4]'>
                                                          ({moment(transactionDetail.dateInvoice).format('DD/MM/YYYY')})
                                                        </h1>
                                                      </div>
                                                    </div>
                                                    <div>
                                                      <img
                                                        src={Logo2}
                                                        alt=''
                                                      />
                                                    </div>
                                                  </div>
                                                  <hr className='my-10 bg-[#E3E8F1] border border-[#E3E8F1]'></hr>
                                                  <div className='flex justify-between mb-5'>
                                                    <div className='flex items-center gap-3'>
                                                      <img
                                                        src={
                                                          !transactionDetailClient.image
                                                            ? LogoDefault
                                                            : imageHandle(transactionDetailClient.image)
                                                        }
                                                        className='w-[50px] h-[50px] rounded-full'
                                                        alt=''
                                                      />
                                                      <div className=''>
                                                        <h1 className='text-sm text-[#2E3A44] font-semibold mb-1'>
                                                          Pelanggan
                                                        </h1>
                                                        <h1 className='text-sm text-[#A8A8A8]'>
                                                          {transactionDetailClient.fullname}
                                                        </h1>
                                                      </div>
                                                    </div>
                                                    <h1 className='text-sm text-[#2E3A44]'>
                                                      {moment(transactionDetail.dateInvoice).format('DD MMMM YYYY')}
                                                    </h1>
                                                  </div>
                                                  <div>
                                                    <h1 className='text-sm text-[#2E3A44] font-semibold mb-1'>
                                                      Alamat
                                                    </h1>
                                                    <h1 className='text-sm text-[#A8A8A8]'>
                                                      {!transactionDetailUser.address
                                                        ? '-'
                                                        : transactionDetailUser.address}
                                                    </h1>
                                                  </div>
                                                  <div className='flex gap-8'>
                                                    <div>
                                                      <h1 className='text-sm text-[#2E3A44] font-semibold mb-1'>
                                                        Email
                                                      </h1>
                                                      <h1 className='text-sm text-[#A8A8A8]'>
                                                        {!transactionDetailUser.email
                                                          ? '-'
                                                          : transactionDetailUser.email}
                                                      </h1>
                                                    </div>
                                                    <div>
                                                      <h1 className='text-sm text-[#2E3A44] font-semibold mb-1'>
                                                        Telepon
                                                      </h1>
                                                      <h1 className='text-sm text-[#A8A8A8]'>
                                                        {!transactionDetailUser.phone
                                                          ? '-'
                                                          : transactionDetailUser.phone}
                                                      </h1>
                                                    </div>
                                                  </div>
                                                  <div className='p-3 bg-[#F9FBFC]'>
                                                    <h1 className='text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#2D014B] to-[#00CDB4] font-semibold mb-1'>
                                                      {transactionDetailService.name} [{transactionDetailPackage.name}]
                                                    </h1>
                                                    <h1 className='text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#2D014B] to-[#00CDB4]'>
                                                      {transactionDetailCompany.name}
                                                    </h1>
                                                  </div>
                                                  <hr className='my-10 bg-[#E3E8F1] border border-[#E3E8F1]'></hr>
                                                  <div>
                                                    <h1 className='text-[#2E3A44] text-sm font-[500] mb-[10px]'>
                                                      Status
                                                    </h1>
                                                    <select
                                                      onChange={(e) => setStatusUpdate(e.target.value)}
                                                      value={statusUpdate}
                                                      className='rounded-[12px] bg-[#F9FBFC] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] text-[#A8A8A8] text-sm font-[500]'>
                                                      <option
                                                        value=''
                                                        disabled>
                                                        Status
                                                      </option>
                                                      <option value={'UNPAID'}>Belum Bayar</option>
                                                      <option value={'PAID'}>Sudah Bayar</option>
                                                      <option value={'COMPLETE'}>Selesai</option>
                                                      <option value={'FAILED'}>Gagal</option>
                                                    </select>
                                                  </div>
                                                  <div>
                                                    <h1 className='text-[#2E3A44] text-sm font-[500] mb-[10px]'>
                                                      Waktu Pembayaran
                                                    </h1>
                                                    <input
                                                      type='date'
                                                      value={moment(dateInvoice).format('YYYY-MM-DD')}
                                                      onChange={(e) => setDateInvoice(e.target.value)}
                                                      className='rounded-[12px] bg-[#F9FBFC] outline-none border border-[#E3E8F1] w-full pl-[20px] py-[15px] text-[#A8A8A8] text-sm font-[500]'
                                                    />
                                                  </div>
                                                  <div>
                                                    <label
                                                      className='text-[#2E3A44] text-sm font-[500] mb-[10px]'
                                                      htmlFor='BuktiPembayaran'>
                                                      Bukti Pembayaran
                                                    </label>

                                                    <div
                                                      className='flex gap-[10px] w-full p-[10px] bg-[#F9FBFC] border border-[#A8A8A8] rounded-lg cursor-pointer'
                                                      onClick={() => fileInputRef.current.click()}>
                                                      <input
                                                        type='file'
                                                        id='BuktiPembayaran'
                                                        ref={fileInputRef}
                                                        onChange={(e) => handleFileUploud(e)}
                                                        onClick={(e) => e.stopPropagation()}
                                                        style={{ display: 'none' }} // Hide the input element visually
                                                      />
                                                      <img
                                                        src={IconUploud}
                                                        alt='Icon Uploud'
                                                      />
                                                      <p>{!paymentFile ? 'Upload bukti pembayaran' : 'File terupload'}</p>
                                                    </div>
                                                  </div>

                                                  <div ClassName=''>
                                                    <h1 className='text-[#2E3A44] text-sm font-[500] mb-[10px]'>
                                                      Alasan Pembatalan
                                                    </h1>
                                                    <textarea
                                                      id='alamat'
                                                      rows='4'
                                                      onChange={(e) => setCancelationReason(e.target.value)}
                                                      value={cancelationReason}
                                                      className='block p-2.5 w-full mb-[20px] font-rubik font-normal text-[16px] text-[#C0C6D4] bg-[#F9FBFC] rounded-[12px] focus:outline-none focus:ring-white focus:border-white dark:bg-[#F9FBFC] dark:border-white dark:placeholder-gray-400 dark:text-[#C0C6D4] dark:focus:ring-white dark:focus:border-white'
                                                      placeholder='Tulis alasan pembatalan disini'></textarea>
                                                  </div>
                                                  <div className='flex items-end justify-end space-x-4'>
                                                    <button
                                                      onClick={() => showDetail2()}
                                                      className='text-sm px-4 py-2 w-max rounded-md border-[#E3E8F1] border-2 text-[#454545] font-[500] flex justify-center items-center'>
                                                      Batal
                                                    </button>
                                                    <button
                                                      onClick={() => updateTransaction(data.id)}
                                                      className='text-sm px-4 py-2 w-max rounded-md bg-[#00CDB4] text-white flex items-center justify-center font-[500]'>
                                                      Simpan
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            </Box>
                                          </Box>
                                        </Fade>
                                      </Modal>
                                      <button
                                        onClick={() => {
                                          toggleAccordion(index);
                                          showAccordion(data.id);
                                        }}>
                                        <svg
                                          width='20'
                                          height='20'
                                          viewBox='0 0 20 20'
                                          fill='none'
                                          xmlns='http://www.w3.org/2000/svg'>
                                          <path
                                            d='M16.6004 12.5742L11.1671 7.14088C10.5254 6.49922 9.47539 6.49922 8.83372 7.14088L3.40039 12.5742'
                                            stroke='#2E3A44'
                                            stroke-width='2'
                                            stroke-miterlimit='16'
                                            stroke-linecap='round'
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                                {activeIndex === index && (
                                  <tr className='bg-[#F9FBFC]'>
                                    <td className='px-6 py-4 truncate'>
                                      <h1 className='text-[#A8A8A8] text-base'>Pelanggan</h1>
                                      <h1 className='text-[#2E3A44] font-semibold text-base'>
                                        {!data.client.fullname ? '-' : data.client.fullname}
                                      </h1>
                                    </td>
                                    <td className='px-6 py-4 truncate'>
                                      <h1 className='text-[#A8A8A8] text-base'>Waktu Pembayaran</h1>

                                      <h1 className='text-[#2E3A44] font-semibold text-base'>
                                        {`${moment(transactionDetail.dateInvoice).format('DD/MM/YYYY')} ${
                                          transactionDetail.timeInvoice
                                        }`}
                                      </h1>
                                    </td>
                                    <td className='px-6 py-4 truncate'>
                                      <h1 className='text-[#A8A8A8] text-base'>Bukti Pembayaran</h1>
                                      <a
                                        href={UrlApi + data.payment_file}
                                        download
                                        className='text-base text-[#2D014B] underline underline-offset-2'>
                                        {data.payment_file?.split('/').pop()}
                                      </a>
                                    </td>
                                    <td className='px-6 py-4 truncate'>
                                      <h1 className='text-[#A8A8A8] text-base'>Alasan Pembatalan</h1>
                                      <h1 className='text-[#2E3A44] font-semibold text-base'>
                                        {!data.cancelation_reason ? '-' : data.cancelation_reason}
                                      </h1>
                                    </td>
                                    <td className='px-6 py-4 truncate'></td>
                                  </tr>
                                )}
                              </React.Fragment>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className='flex justify-center py-8'>
                  <Pagination
                      currentPage={page} 
                      totalPages={totalPages}
                      showingData={!transactionData.length < limit ? transactionData.length : limit}
                      onPageChange={handlePageChange}
                      onPrevChange={handlePrevChange}
                      onNextChange={handleNextChange}
                  />
                  </div>
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

export default DaftarTransaction;
