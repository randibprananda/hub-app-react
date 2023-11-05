import { Calendar, IconNext, IconPrev, IconSort } from '../../../../assets';
import { FooterTwo, ListRiwayatTransaksi, Navbar, Pagination } from '../../../../component';
import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import Api from '../../../../Api';
import DatePicker from 'react-multi-date-picker';
import ReactPaginate from 'react-paginate';
import imageHandle from '../../../../utils/imageHandle';
import moment from 'moment/moment';
import handleLink from '../../../../utils/handleLink';

const RiwayatTransaksi = () => {
  const { state } = useLocation();
  const [limit] = useState(10);
  const [refresh, setRefresh] = useState(false)
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [usersData, setUsersData] = useState([]);
  const [totalData, setTotalData] = useState('');
  const [sortType, setSortType] = useState('ASC');
  const [column, setColumn] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [selectedRange, setSelectedRange] = useState([]);

  const handleDateChange = (newRange) => {
    setSelectedRange(newRange);
    console.log('Selected Date Range:', newRange);
  };

  console.log(usersData)

  const getData = async () => {
    try {
      const response = await Api.GetTransactionListByPartnerId(
        localStorage.getItem('token-hub'),
        state.partnerId,
        limit,
        page,
        selectedRange[0] === undefined ? '' : selectedRange[0],
        selectedRange[1] === undefined ? '' : selectedRange[1],
        column,
        sortType, 
      );
      setUsersData(response.data.pagination.data);
      setTotalPages(response.data?.pagination.totalPages);
      setTotalData(response.data?.pagination.total);
    } catch (error) {
      console.log(error);
      setUsersData('')
    }
  };

  const _renderCurrency = (value) => {
    let number = Number(value);
    return number?.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
  };

  const toggleSortType = () => {
    sortType === 'ASC' ? setSortType('DESC') : setSortType('ASC');
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
  };;

  useEffect(() => {
    getData();
    setRefresh(false)
  }, [page, selectedRange, column, sortType, refresh]);

  return (
    <>
      <div className='w-screen min-h-screen bg-outline text-[#464E5F]'>
        <Navbar />
        <div className='md:px-[75px] px-[36px] pt-[120px] pb-[10px] md:pt-[140px] md:pb-[30px] mb-10'>
          <div className='flex flex-wrap items-center gap-3 mb-[30px]'>
            <Link
              to={''}
              className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'
            >
              Beranda
            </Link>
            <img
              src={IconNext}
              alt=''
            />
            <Link
              to={'/dashboard-partner'}
              className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'
            >
              Profil
            </Link>
            <img
              src={IconNext}
              alt=''
            />
            <Link
              to={''}
              className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'
            >
              Riwayat Transaksi
            </Link>
          </div>
          <div className='py-4 space-y-8 bg-[#F6F6F6] rounded-xl md:py-7 md:px-14 px-7'>
            <div className='flex flex-wrap items-center justify-between gap-5'>
              <div className='space-y-2.5'>
                <p className='text-2xl font-semibold text-black-k'>Transaksi Layanan</p>
                <p className='text-sm font-medium text-dark-7'>{totalData} Transaksi</p>
              </div>
              {/* //! Date Picker belum bisa mengisi state start date dan end date */}
              <div className='relative'>
                <img
                  src={Calendar}
                  alt='Calendar'
                  className='h-[16px] absolute top-[14px] left-3'
                />
                <DatePicker
                  range
                  placeholder='dd/mm/yyyy - dd/mm/yyyy'
                  style={{
                    backgroundColor: 'white',
                    width: '250px',
                    height: '42px',
                    pointerEvents: 'auto',
                    outline: 'none',
                    boxShadow: 'none',
                    borderRadius: '8px',
                    paddingLeft: '40px',
                    fontSize: '14px'
                  }}
                  containerStyle={{
                    width: '100%',
                    outline: 'none',
                    boxShadow: 'none',
                  }}
                  onChange={handleDateChange}
                  minDate={selectedRange[0] === undefined ? '' : selectedRange[0]}
                  maxDate={selectedRange[1] === undefined ? '' : selectedRange[1]}
                  format='YYYY-MM-DD'
                />
              </div>
            </div>
            <div className='w-full overflow-x-auto scrollbar-hide'>
              <div className='space-y-3 min-w-max'>
                <div className='bg-white rounded-[8px] h-[39px] items-center py-2 px-3 text-[#64748B] text-[12px] font-semibold grid grid-cols-8'>
                  <div className='flex col-span-2 gap-4'>
                    <input
                      type='checkbox'
                      name=''
                      id=''
                      className='inline-block w-4 h-4 outline-[#CBD5E1] bg-white'
                    />
                    <div
                      className='flex items-center gap-2 cursor-pointer'
                      onClick={() => {
                        setColumn('client_name');
                        toggleSortType();
                      }}
                    >
                      <p>Pelanggan</p>
                      <img
                        src={IconSort}
                        alt='Sort'
                        className='h-4'
                      />
                    </div>
                  </div>
                  <div
                    className='flex items-center gap-2 cursor-pointer'
                    onClick={() => {
                      setColumn('invoice_number');
                      toggleSortType();
                    }}
                  >
                    <p>Nomor Invoice</p>
                    <img
                      src={IconSort}
                      alt='Sort'
                      className='h-4'
                    />
                  </div>
                  <div
                    className='flex items-center gap-2 cursor-pointer'
                    onClick={() => {
                      setColumn('invoice_date');
                      toggleSortType();
                    }}
                  >
                    <p>Tanggal Invoice</p>
                    <img
                      src={IconSort}
                      alt='Sort'
                      className='h-4'
                    />
                  </div>
                  <div
                    className='flex items-center gap-2 cursor-pointer'
                    onClick={() => {
                      setColumn('phone');
                      toggleSortType();
                    }}
                  >
                    <p>No HP</p>
                    <img
                      src={IconSort}
                      alt='Sort'
                      className='h-4'
                    />
                  </div>
                  <div
                    className='flex items-center gap-2 cursor-pointer'
                    onClick={() => {
                      setColumn('email');
                      toggleSortType();
                    }}
                  >
                    <p>Email</p>
                    <img
                      src={IconSort}
                      alt='Sort'
                      className='h-4'
                    />
                  </div>
                  <div
                    className='flex items-center gap-2 ml-10 cursor-pointer'
                    onClick={() => {
                      setColumn('invoice_status');
                      toggleSortType();
                    }}
                  >
                    <p>Status Invoice</p>
                    <img
                      src={IconSort}
                      alt='Sort'
                      className='h-4'
                    />
                  </div>
                  <div className='flex items-center'>
                    <p>Action</p>
                  </div>
                </div>
                {Object.values(usersData).map(( data ) => {
                  return (
                    <ListRiwayatTransaksi
                    key={data.id}
                    name={data.client.fullname}
                    image={
                      data.client.image !== null
                        ? imageHandle(data.client.image)
                        : 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//100/MTA-11378971/oila_kacamata_hitam_wanita_square_retro_female_sunglasses_jgl160_full03_r6kg458o.jpg'
                    }
                    role={data.client.role.name}
                    noInvoice={data.number_invoice}
                    invoiceDate={moment(data.created_at).format('DD/MM/YYYY')}
                    phone={data.client.phone !== '' ? data.client.phone : '-'}
                    email={data.client.email}
                    statusInvoice={data.status}
                    serviceName={data.service.name}
                    quantity={data.quantity}
                    paymentDate={moment(data.payment_date).format('DD/MM/YYYY')}
                    totalPayment={_renderCurrency(data.total_payment)}
                    cancelationReason={data.cancelation_reason}
                    paymentFile={data.payment_file !== null ? handleLink(data.payment_file) : null}
                    packet={data.service.package_pricing.name}
                    clientId={data.client.id}
                    companyName={data.client.company.name}
                    transactionId={data.id}
                  />
                  )
                })}
              </div>
            </div>
            <div className='flex justify-center'>
              <Pagination
                  currentPage={page} 
                  totalPages={totalPages}
                  showingData={!usersData.length < limit ? usersData.length : limit}
                  onPageChange={handlePageChange}
                  onPrevChange={handlePrevChange}
                  onNextChange={handleNextChange}
              />
            </div>
          </div>
        </div>
        <FooterTwo />
      </div>
    </>
  );
};

export default RiwayatTransaksi;
