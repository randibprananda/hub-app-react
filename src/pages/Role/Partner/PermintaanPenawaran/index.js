import { Backdrop, Box, Fade, Modal } from '@mui/material';
import React, { Fragment, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bidding, IconNext, LogoDefault } from '../../../../assets';
import { CardPenawaran, Head, Navbar } from '../../../../component';

import { Close } from '@mui/icons-material';
import moment from 'moment';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import Api from '../../../../Api';
import imageHandle from '../../../../utils/imageHandle';

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
function PermintaanPenawaran() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleClose2 = () => setShowModal2(false);

  const [detailTender, setDetailTender] = useState('');
  const [detailTenderPartnerCategory, setDetailTenderPartnerCategory] = useState('');
  const [detailTenderBid, setDetailTenderBid] = useState('');
  const [detailTenderImage, setDetailTenderImage] = useState('');
  const [detailTenderStakeholder, setDetailTenderStakeholder] = useState('');
  const startDate = moment(detailTender.implementation_estimate).format('DD-MM-YYYY');
  const endDate = moment(detailTender.deadline).format('DD-MM-YYYY');
  const showDetail = async (id) => {
    try {
      const response = await Api.getTenderDetailById(id);
      setDetailTender(response.data.tenderData);
      setDetailTenderPartnerCategory(response.data.tenderData.partner_category);
      setDetailTenderBid(response.data.tenderData.bid_applicants);
      setDetailTenderImage(response.data.tenderData.tender_images[0].image);
      setDetailTenderStakeholder(response.data.tenderData.stakeholder);
      setShowModal(!showModal);
    } catch (error) {
      console.log(error.message);
    }
  };
  const showDetail2 = () => {
    setShowModal2(!showModal2);
  };

  const [dataTender, setDataTender] = useState('');
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const getData = async () => {
    try {
      const resTender = await Api.getTenderWithoutLogin(limit, page);
      setTotalPages(resTender.data.totalPages);
      setDataTender(resTender.data.data);
      setTotalData(resTender.data.total);
    } catch (error) {
      console.log(error.message);
    }
  };

  const [bid, setBid] = useState('');
  const [offeringLetter, setOfferingLetter] = useState('');
  const [conceptPresentation, setConceptPresentation] = useState('');
  const [budgetPlan, setBudgetPlan] = useState('');
  const postData = async () => {
    const data = {
      bidding: bid,
      offering_letter: offeringLetter,
      concept_presentation: conceptPresentation,
      budget_plan: budgetPlan,
      tenderRequestId: detailTender.id,
    };
    try {
      const response = await Api.biddingApplication(localStorage.getItem('token-hub'), data);
      toast.success('Anda telah berhasil melakukan bidding!!!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setShowModal2(!showModal2);
      setShowModal(!showModal);
    } catch (error) {
      console.log(error);
      toast.error('Harap Login sebagai partner untuk melakukan pengajuan penawaran!!!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setShowModal2(!showModal2);
      setShowModal(!showModal);
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

  useEffect(() => {
    getData();
  }, [page]);

  return (
    <Fragment>
      <Head
        title='Permintaan Penawaran - Konect Hub'
        description='Permintaan Penawaran di Konect Hub'
      />
      <div className='bg-[#E3E8F1] min-h-screen'>
        <Navbar />
        <div className='md:px-[75px] px-[36px] pt-[120px] pb-[10px] md:pt-[140px] md:pb-[30px] mb-10'>
          <div className='flex flex-wrap items-center gap-3 mb-[30px]'>
            <Link
              to={''}
              className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>
              Beranda
            </Link>
            <img
              src={IconNext}
              alt=''
            />
            <Link
              to={'/dashboard-partner'}
              className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>
              Beranda Profile
            </Link>
            <img
              src={IconNext}
              alt=''
            />
            <Link
              to={''}
              className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>
              Riwayat Layanan
            </Link>
          </div>
          <div className='bg-[#ECEEF6] rounded-xl shadow p-9'>
            <h1 className='text-2xl text-[#2E3A44] font-semibold'>Permintaan Penawaran</h1>
            <div className='flex justify-between md:mt-[45px]'>
              <h1 className='text-[#454545] text-[15px] font-medium'>
                Menampilkan <b>{totalData}</b> Layanan Jasa
              </h1>
              <div className='flex items-center gap-7'>
                <select className='bg-[#ECEEF6] text-[#454545] font-semibold text-sm'>
                  <option selected>Urutkan Berdasarkan</option>
                  <option>Terbaru</option>
                  <option>Terpopular</option>
                </select>
              </div>
            </div>
            <div className='grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 mt-[30px] gap-8'>
              {Object.values(dataTender).map((data, index) => {
                const startDate = moment(data.implementation_estimate).format('DD/MM/YYYY');
                const endDate = moment(data.deadline).format('DD/MM/YYYY');
                return (
                  <CardPenawaran
                    key={index}
                    title={data.title}
                    imgProfile={!data.stakeholder.image ? LogoDefault : imageHandle(data.stakeholder.image)}
                    author={data.stakeholder.fullname}
                    desc={data.description}
                    people={data.participant_estimate}
                    date={startDate}
                    budget={data.budget_target}
                    image={data.tender_images.length === 0 ? Bidding : imageHandle(data.tender_images[0].image)}
                    textBudget='Anggaran'
                    satuan='Orang'
                    jml_tender={30}
                    jml_target={100}
                    sisa_hari={data.daysLeft}
                    join={data.bidApplicantsCount}
                    openModal={() => showDetail(data.id)}
                    addOn={data.add_on}
                  />
                );
              })}
            </div>
            {/* Pagination */}
            <div className='flex items-center justify-center mt-[30px] gap-[5px]'>
              <ReactPaginate
                breakLabel={<span className='mr-4'>...</span>}
                nextLabel={
                  <span
                    className='flex items-center justify-center w-12 h-12 border-2 rounded-full hover:bg-cherry hover:text-white'
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
                    className='flex items-center justify-center w-12 h-12 border-2 rounded-full hover:bg-cherry hover:text-white'
                    onClick={() => page > 1 && setPage(page - 1)}>
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
                containerClassName='flex items-center justify center mt-8 mb-4 space-x-5'
                disabledClassName='w-12 h-12 rounded-full border-2 flex items-center justify-center'
                activeClassName='w-12 h-12 rounded-full border-2 bg-cherry text-white flex items-center justify-center'
              />
            </div>
          </div>
        </div>

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
                  <div className='flex items-start justify-between'>
                    <h1 className='text-lg font-semibold text-black'>Detail Bidding</h1>
                    <button
                      onClick={handleClose}
                      className='hover:text-dark-3'>
                      <Close />
                    </button>
                  </div>
                  <div className='space-y-4'>
                    <div>
                      <img
                        src={!detailTenderImage ? LogoDefault : imageHandle(detailTenderImage)}
                        className='object-cover w-full h-64 rounded-lg'
                        alt='Konnect Logo'
                      />
                    </div>
                    <div>
                      <h1 className='text-[16px] font-semibold text-[#2E3A44] mt-6 mb-3'>{detailTender.title}</h1>
                    </div>
                    <div className='gap-5 lg:flex'>
                      <img
                        src={!detailTenderImage ? LogoDefault : imageHandle(detailTender.stakeholder.image)}
                        alt='JoinTender'
                        className='h-[18px] w-[18px] rounded-full'
                      />
                      <p className='text-[10px] text-[#B0B0B0]'>{detailTenderStakeholder.fullname}</p>
                    </div>
                    <div>
                      <p className='text-[12px] text-[#1A1A1A] w-full mt-3 mb-4 line-clamp-3'>
                        {detailTender.description}
                      </p>
                    </div>
                    <div className='flex items-end gap-4'>
                      <div className='lg:flex lg:items-center gap-9'>
                        <div>
                          <h1 className='text-[10px] text-[#454545]'>Estimasi Peserta</h1>
                          <div className='flex gap-2 h-max'>
                            <div className='flex h-max gap-1 bg-[#F6F6F6] rounded-[4px] p-2'>
                              <svg
                                width='16'
                                height='16'
                                viewBox='0 0 16 16'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'>
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
                                xmlns='http://www.w3.org/2000/svg'>
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
                      <div className='flex items-center gap-1'>
                        <svg
                          width='15'
                          height='14'
                          viewBox='0 0 15 14'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M7.49352 0.999512C4.27352 0.999512 1.66602 3.61285 1.66602 6.83285C1.66602 10.0528 4.27352 12.6662 7.49352 12.6662C10.7193 12.6662 13.3327 10.0528 13.3327 6.83285C13.3327 3.61285 10.7193 0.999512 7.49352 0.999512ZM7.49935 11.4995C4.92102 11.4995 2.83268 9.41118 2.83268 6.83285C2.83268 4.25451 4.92102 2.16618 7.49935 2.16618C10.0777 2.16618 12.166 4.25451 12.166 6.83285C12.166 9.41118 10.0777 11.4995 7.49935 11.4995ZM7.79102 3.91618H6.91602V7.41618L9.97852 9.25368L10.416 8.53618L7.79102 6.97868V3.91618Z'
                            fill='#C1121F'
                          />
                        </svg>
                        {detailTender.daysLeft < 0 ? (
                          <p className='text-[#C1121F] text-[10px]'>telah berakhir</p>
                        ) : (
                          <p className='text-[#C1121F] text-[10px]'>{detailTender.daysLeft} hari lagi</p>
                        )}
                      </div>
                    </div>
                    <div className='mt-[30px]'>
                      <h1 className='text-[10px] text-[#5C5C5C] mb-2'>Kategori Partner</h1>
                      <div className='flex flex-col gap-3'>
                        {detailTenderPartnerCategory.length === 2 ||
                        detailTenderPartnerCategory.length === 3 ||
                        detailTenderPartnerCategory.length === 4 ? (
                          Object.values(detailTenderPartnerCategory).map((data, index) => {
                            return (
                              <div className='border-[#2D014B] border rounded-full py-[6px] px-[10px] w-max'>
                                <h1 className='text-sm font-medium text-[#2D014B]'>{data}</h1>
                              </div>
                            );
                          })
                        ) : (
                          <div className='border-[#2D014B] border rounded-full py-[6px] px-[10px] w-max'>
                            <h1 className='text-sm font-medium text-[#2D014B]'>{detailTenderPartnerCategory}</h1>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='mt-5'>
                      <p className='text-[#5C5C5C] text-start text-xs'>Anggaran</p>
                      <p className='font-semibold text-xl text-[#1A1A1A]'>Rp {detailTender.budget_target}</p>
                    </div>
                    <div className='bg-[#F1F1F1] p-5 rounded-lg my-[30px]'>
                      <h1 className='text-base font-semibold text-[#888888] mb-3'>Daftar Bidding</h1>
                      {Object.values(detailTenderBid).map((data, index) => {
                        return (
                          <div className='flex items-center justify-between mb-3'>
                            <h1 className='text-sm select-none text-primary blur-sm'>
                              {data.partner.company.company_name}
                            </h1>
                            <h1 className='text-sm font-semibold text-primary'>{data.nominal_bidding}</h1>
                          </div>
                        );
                      })}
                    </div>
                    <div className=''>
                      <h1 className='text-[#737373] text-sm font-semibold mb-4'>Berikan Penawaran</h1>
                      <h1 className='text-[#A8A8A8] text-xs font-semibold mb-2'>
                        Masukkan Jumlah Anggaran (Min. Rp 5.000.000)
                      </h1>
                      {/* <NumericFormat onChange={ (e) => setBid(e.target.value) } thousandSeparator={true} prefix={'Rp '} className="rounded-[12px] outline-none border border-[#CACACA] w-full px-[10px] py-[11px] text-[#A8A8A8]  font-[500] bg-white text-xs" placeholder='Rp 20.000.000' inputMode="numeric" /> */}
                      <input
                        onChange={(e) => setBid(e.target.value)}
                        type='number'
                        className='rounded-[12px] outline-none border border-[#CACACA] w-full px-[10px] py-[11px] text-[#A8A8A8]  font-[500] bg-white text-xs'
                        placeholder='Rp 20.000.000'
                      />
                    </div>
                    <div className='py-4'>
                      <p className='text-[#2E3A44] font-semibold text-xs'>Upload File</p>
                      <div className='py-3'>
                        <h1 className='text-[#2E3A44CC]/80 text-xs italic font-[500] mb-[10px]'>
                          Surat Penawaran<span className='text-[#C1121F] ml-[10px]'>*</span>
                        </h1>
                        <button className='text-xs underline text-primary'>Unduh Template</button>
                        <div className='flex lg:flex-row flex-col space-x-10 mt-[10px] '>
                          <div className=''>
                            <div className='flex items-center justify-center w-full gap-3'>
                              <label
                                htmlFor={'offering-letter'}
                                className='cursor-pointer'>
                                <div className='flex p-2 gap-2 items-center rounded-lg bg-[#F9FBFC] border-[#E3E8F1] border w-56'>
                                  <svg
                                    width='20'
                                    height='20'
                                    viewBox='0 0 20 20'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path
                                      d='M5.41634 16.6663C4.14967 16.6663 3.06912 16.2302 2.17467 15.358C1.28023 14.4802 0.833008 13.4108 0.833008 12.1497C0.833008 11.0663 1.15801 10.0997 1.80801 9.24967C2.46356 8.39967 3.31912 7.85801 4.37467 7.62467C4.72467 6.3469 5.41912 5.31356 6.45801 4.52467C7.50245 3.73023 8.68301 3.33301 9.99967 3.33301C11.6275 3.33301 13.0052 3.89967 14.133 5.03301C15.2663 6.16079 15.833 7.53856 15.833 9.16634C16.7941 9.27745 17.5886 9.69412 18.2163 10.4163C18.8497 11.1275 19.1663 11.9608 19.1663 12.9163C19.1663 13.9608 18.8025 14.8469 18.0747 15.5747C17.3469 16.3025 16.4608 16.6663 15.4163 16.6663H10.833C10.3775 16.6663 9.98579 16.5025 9.65801 16.1747C9.33023 15.8525 9.16634 15.4608 9.16634 14.9997V10.708L7.83301 11.9997L6.66634 10.833L9.99967 7.49967L13.333 10.833L12.1663 11.9997L10.833 10.708V14.9997H15.4163C15.9997 14.9997 16.4913 14.7969 16.8913 14.3913C17.2969 13.9913 17.4997 13.4997 17.4997 12.9163C17.4997 12.333 17.2969 11.8413 16.8913 11.4413C16.4913 11.0358 15.9997 10.833 15.4163 10.833H14.1663V9.16634C14.1663 8.01634 13.7608 7.03301 12.9497 6.21634C12.1386 5.40523 11.1552 4.99967 9.99967 4.99967C8.84968 4.99967 7.86634 5.40523 7.04967 6.21634C6.23856 7.03301 5.83301 8.01634 5.83301 9.16634H5.41634C4.61079 9.16634 3.92467 9.45245 3.35801 10.0247C2.78579 10.5913 2.49967 11.2775 2.49967 12.083C2.49967 12.8886 2.78579 13.583 3.35801 14.1663C3.92467 14.7219 4.61079 14.9997 5.41634 14.9997H7.49967V16.6663'
                                      fill='#A8A8A8'
                                    />
                                  </svg>
                                  <h1 className='text-sm text-[#A8A8A8] '>Unggah surat penawaran</h1>
                                </div>
                                <input
                                  type='file'
                                  onChange={(e) => setOfferingLetter(e.target.files[0])}
                                  name='offering-letter'
                                  id='offering-letter'
                                  className='rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] hidden'
                                />
                              </label>
                              {offeringLetter && (
                                <div className='flex items-center gap-1 p-2 border rounded-full border-primary'>
                                  <h1 className='text-sm text-[#2E3A44CC]/80 line-clamp-1'>{offeringLetter.name}</h1>
                                  <button onClick={() => setOfferingLetter(null)}>
                                    <svg
                                      width='15'
                                      height='16'
                                      viewBox='0 0 15 16'
                                      fill='none'
                                      xmlns='http://www.w3.org/2000/svg'>
                                      <path
                                        d='M12.2437 4.49378C12.5854 4.15206 12.5854 3.59802 12.2437 3.25629C11.902 2.91457 11.3479 2.91457 11.0062 3.25629L7.5 6.76251L3.99379 3.25629C3.65207 2.91457 3.09803 2.91457 2.7563 3.25629C2.41458 3.59802 2.41458 4.15206 2.7563 4.49378L6.26251 7.99999L2.75629 11.5062C2.41457 11.8479 2.41457 12.402 2.75629 12.7437C3.09801 13.0854 3.65206 13.0854 3.99378 12.7437L7.5 9.23748L11.0062 12.7437C11.3479 13.0854 11.902 13.0854 12.2437 12.7437C12.5854 12.402 12.5854 11.8479 12.2437 11.5062L8.73749 7.99999L12.2437 4.49378Z'
                                        fill='#2E3A44'
                                        fill-opacity='0.8'
                                      />
                                    </svg>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <h1 className='text-[#2E3A44CC]/80 text-xs italic font-[500] my-[10px]'>
                          Presentasi Konsep<span className='text-[#C1121F] ml-[10px]'>*</span>
                        </h1>
                        <button className='text-xs underline text-primary'>Unduh Template</button>
                        <div className='flex lg:flex-row flex-col space-x-10 mt-[10px] '>
                          <div className=''>
                            <div className='flex items-center justify-center w-full gap-3'>
                              <label
                                htmlFor={'conceptPresentation'}
                                className='cursor-pointer'>
                                <div className='flex p-2 gap-2 items-center rounded-lg bg-[#F9FBFC] border-[#E3E8F1] border w-56'>
                                  <svg
                                    width='20'
                                    height='20'
                                    viewBox='0 0 20 20'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path
                                      d='M5.41634 16.6663C4.14967 16.6663 3.06912 16.2302 2.17467 15.358C1.28023 14.4802 0.833008 13.4108 0.833008 12.1497C0.833008 11.0663 1.15801 10.0997 1.80801 9.24967C2.46356 8.39967 3.31912 7.85801 4.37467 7.62467C4.72467 6.3469 5.41912 5.31356 6.45801 4.52467C7.50245 3.73023 8.68301 3.33301 9.99967 3.33301C11.6275 3.33301 13.0052 3.89967 14.133 5.03301C15.2663 6.16079 15.833 7.53856 15.833 9.16634C16.7941 9.27745 17.5886 9.69412 18.2163 10.4163C18.8497 11.1275 19.1663 11.9608 19.1663 12.9163C19.1663 13.9608 18.8025 14.8469 18.0747 15.5747C17.3469 16.3025 16.4608 16.6663 15.4163 16.6663H10.833C10.3775 16.6663 9.98579 16.5025 9.65801 16.1747C9.33023 15.8525 9.16634 15.4608 9.16634 14.9997V10.708L7.83301 11.9997L6.66634 10.833L9.99967 7.49967L13.333 10.833L12.1663 11.9997L10.833 10.708V14.9997H15.4163C15.9997 14.9997 16.4913 14.7969 16.8913 14.3913C17.2969 13.9913 17.4997 13.4997 17.4997 12.9163C17.4997 12.333 17.2969 11.8413 16.8913 11.4413C16.4913 11.0358 15.9997 10.833 15.4163 10.833H14.1663V9.16634C14.1663 8.01634 13.7608 7.03301 12.9497 6.21634C12.1386 5.40523 11.1552 4.99967 9.99967 4.99967C8.84968 4.99967 7.86634 5.40523 7.04967 6.21634C6.23856 7.03301 5.83301 8.01634 5.83301 9.16634H5.41634C4.61079 9.16634 3.92467 9.45245 3.35801 10.0247C2.78579 10.5913 2.49967 11.2775 2.49967 12.083C2.49967 12.8886 2.78579 13.583 3.35801 14.1663C3.92467 14.7219 4.61079 14.9997 5.41634 14.9997H7.49967V16.6663'
                                      fill='#A8A8A8'
                                    />
                                  </svg>
                                  <h1 className='text-sm text-[#A8A8A8] '>Unggah presentasi konsep</h1>
                                </div>
                                <input
                                  type='file'
                                  onChange={(e) => setConceptPresentation(e.target.files[0])}
                                  name='conceptPresentation'
                                  id='conceptPresentation'
                                  className='rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] hidden'
                                />
                              </label>
                              {conceptPresentation && (
                                <div className='flex items-center gap-1 p-2 border rounded-full border-primary'>
                                  <h1 className='text-sm text-[#2E3A44CC]/80 line-clamp-1'>
                                    {conceptPresentation.name}
                                  </h1>
                                  <button onClick={() => setConceptPresentation(null)}>
                                    <svg
                                      width='15'
                                      height='16'
                                      viewBox='0 0 15 16'
                                      fill='none'
                                      xmlns='http://www.w3.org/2000/svg'>
                                      <path
                                        d='M12.2437 4.49378C12.5854 4.15206 12.5854 3.59802 12.2437 3.25629C11.902 2.91457 11.3479 2.91457 11.0062 3.25629L7.5 6.76251L3.99379 3.25629C3.65207 2.91457 3.09803 2.91457 2.7563 3.25629C2.41458 3.59802 2.41458 4.15206 2.7563 4.49378L6.26251 7.99999L2.75629 11.5062C2.41457 11.8479 2.41457 12.402 2.75629 12.7437C3.09801 13.0854 3.65206 13.0854 3.99378 12.7437L7.5 9.23748L11.0062 12.7437C11.3479 13.0854 11.902 13.0854 12.2437 12.7437C12.5854 12.402 12.5854 11.8479 12.2437 11.5062L8.73749 7.99999L12.2437 4.49378Z'
                                        fill='#2E3A44'
                                        fill-opacity='0.8'
                                      />
                                    </svg>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <h1 className='text-[#2E3A44CC]/80 text-xs italic font-[500] my-[10px]'>
                          Anggaran (RAB)<span className='text-[#C1121F] ml-[10px]'>*</span>
                        </h1>
                        <button className='text-xs underline text-primary'>Unduh Template</button>
                        <div className='flex lg:flex-row flex-col space-x-10 mt-[10px] '>
                          <div className=''>
                            <div className='flex items-center justify-center w-full gap-3'>
                              <label
                                htmlFor={'budgetPlan'}
                                className='cursor-pointer'>
                                <div className='flex p-2 gap-2 items-center rounded-lg bg-[#F9FBFC] border-[#E3E8F1] border w-56'>
                                  <svg
                                    width='20'
                                    height='20'
                                    viewBox='0 0 20 20'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path
                                      d='M5.41634 16.6663C4.14967 16.6663 3.06912 16.2302 2.17467 15.358C1.28023 14.4802 0.833008 13.4108 0.833008 12.1497C0.833008 11.0663 1.15801 10.0997 1.80801 9.24967C2.46356 8.39967 3.31912 7.85801 4.37467 7.62467C4.72467 6.3469 5.41912 5.31356 6.45801 4.52467C7.50245 3.73023 8.68301 3.33301 9.99967 3.33301C11.6275 3.33301 13.0052 3.89967 14.133 5.03301C15.2663 6.16079 15.833 7.53856 15.833 9.16634C16.7941 9.27745 17.5886 9.69412 18.2163 10.4163C18.8497 11.1275 19.1663 11.9608 19.1663 12.9163C19.1663 13.9608 18.8025 14.8469 18.0747 15.5747C17.3469 16.3025 16.4608 16.6663 15.4163 16.6663H10.833C10.3775 16.6663 9.98579 16.5025 9.65801 16.1747C9.33023 15.8525 9.16634 15.4608 9.16634 14.9997V10.708L7.83301 11.9997L6.66634 10.833L9.99967 7.49967L13.333 10.833L12.1663 11.9997L10.833 10.708V14.9997H15.4163C15.9997 14.9997 16.4913 14.7969 16.8913 14.3913C17.2969 13.9913 17.4997 13.4997 17.4997 12.9163C17.4997 12.333 17.2969 11.8413 16.8913 11.4413C16.4913 11.0358 15.9997 10.833 15.4163 10.833H14.1663V9.16634C14.1663 8.01634 13.7608 7.03301 12.9497 6.21634C12.1386 5.40523 11.1552 4.99967 9.99967 4.99967C8.84968 4.99967 7.86634 5.40523 7.04967 6.21634C6.23856 7.03301 5.83301 8.01634 5.83301 9.16634H5.41634C4.61079 9.16634 3.92467 9.45245 3.35801 10.0247C2.78579 10.5913 2.49967 11.2775 2.49967 12.083C2.49967 12.8886 2.78579 13.583 3.35801 14.1663C3.92467 14.7219 4.61079 14.9997 5.41634 14.9997H7.49967V16.6663'
                                      fill='#A8A8A8'
                                    />
                                  </svg>
                                  <h1 className='text-sm text-[#A8A8A8] '>Unggah anggaran (RAB)</h1>
                                </div>
                                <input
                                  type='file'
                                  onChange={(e) => setBudgetPlan(e.target.files[0])}
                                  name='budgetPlan'
                                  id='budgetPlan'
                                  className='rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] hidden'
                                />
                              </label>
                              {budgetPlan && (
                                <div className='flex items-center gap-1 p-2 border rounded-full border-primary'>
                                  <h1 className='text-sm text-[#2E3A44CC]/80 line-clamp-1'>{budgetPlan.name}</h1>
                                  <button onClick={() => setBudgetPlan(null)}>
                                    <svg
                                      width='15'
                                      height='16'
                                      viewBox='0 0 15 16'
                                      fill='none'
                                      xmlns='http://www.w3.org/2000/svg'>
                                      <path
                                        d='M12.2437 4.49378C12.5854 4.15206 12.5854 3.59802 12.2437 3.25629C11.902 2.91457 11.3479 2.91457 11.0062 3.25629L7.5 6.76251L3.99379 3.25629C3.65207 2.91457 3.09803 2.91457 2.7563 3.25629C2.41458 3.59802 2.41458 4.15206 2.7563 4.49378L6.26251 7.99999L2.75629 11.5062C2.41457 11.8479 2.41457 12.402 2.75629 12.7437C3.09801 13.0854 3.65206 13.0854 3.99378 12.7437L7.5 9.23748L11.0062 12.7437C11.3479 13.0854 11.902 13.0854 12.2437 12.7437C12.5854 12.402 12.5854 11.8479 12.2437 11.5062L8.73749 7.99999L12.2437 4.49378Z'
                                        fill='#2E3A44'
                                        fill-opacity='0.8'
                                      />
                                    </svg>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className='flex justify-end mt-11'>
                          {detailTender.daysLeft < 0 ? null : (
                            <button
                              onClick={() => showDetail2()}
                              className='px-[10px] py-[14px] bg-cherry rounded-lg text-white text-xs'>
                              Ajukan Penawaran
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Box>
            </Box>
          </Fade>
        </Modal>
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
                    <div className='flex justify-center'>
                      <svg
                        width='95'
                        height='95'
                        viewBox='0 0 95 95'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          fill-rule='evenodd'
                          clip-rule='evenodd'
                          d='M47.5794 11.875C38.6395 11.875 30.4932 14.8279 25.6739 17.2405C25.2385 17.4582 24.8328 17.672 24.4548 17.8778C23.7066 18.2855 23.0694 18.6655 22.5627 19L28.045 27.071L30.6258 28.0982C40.7116 33.1867 54.2373 33.1867 64.3251 28.0982L67.2542 26.5782L72.4397 19C71.3654 18.2994 70.2483 17.6668 69.0949 17.1059C64.3013 14.7191 56.351 11.875 47.5794 11.875ZM34.8276 21.0108C32.8863 20.6476 30.9688 20.1664 29.086 19.57C33.6005 17.5651 40.3297 15.4375 47.5774 15.4375C52.5985 15.4375 57.3465 16.4588 61.2732 17.7531C56.6716 18.4003 51.7613 19.4987 47.0826 20.8505C43.4013 21.9153 39.0986 21.8005 34.8276 21.0108ZM66.4151 31.0333L65.9302 31.2787C54.833 36.8758 40.1159 36.8758 29.0187 31.2787L28.5596 31.0452C11.891 49.3347 -0.835022 83.1191 47.5794 83.1191C95.9898 83.1191 82.953 48.7033 66.4151 31.0333ZM45.521 47.5C44.4712 47.5 43.4644 47.917 42.7221 48.6594C41.9797 49.4017 41.5627 50.4085 41.5627 51.4583C41.5627 52.5081 41.9797 53.515 42.7221 54.2573C43.4644 54.9996 44.4712 55.4167 45.521 55.4167V47.5ZM49.4794 43.5417V41.5625H45.521V43.5417C43.4214 43.5417 41.4078 44.3757 39.9231 45.8604C38.4384 47.3451 37.6044 49.3587 37.6044 51.4583C37.6044 53.558 38.4384 55.5716 39.9231 57.0563C41.4078 58.5409 43.4214 59.375 45.521 59.375V67.2917C44.7024 67.2919 43.9039 67.0383 43.2354 66.5658C42.5669 66.0933 42.0613 65.4252 41.7883 64.6534C41.6135 64.1584 41.2492 63.7532 40.7756 63.5268C40.302 63.3004 39.7579 63.2714 39.2629 63.4461C38.7679 63.6209 38.3626 63.9852 38.1362 64.4588C37.9098 64.9324 37.8808 65.4766 38.0556 65.9716C38.6015 67.5153 39.6126 68.8518 40.9495 69.7971C42.2865 70.7424 43.8836 71.25 45.521 71.25V73.2292H49.4794V71.25C51.579 71.25 53.5926 70.4159 55.0773 68.9313C56.5619 67.4466 57.396 65.433 57.396 63.3333C57.396 61.2337 56.5619 59.2201 55.0773 57.7354C53.5926 56.2507 51.579 55.4167 49.4794 55.4167V47.5C51.2012 47.5 52.6678 48.5984 53.214 50.1382C53.2951 50.3901 53.4258 50.6233 53.5985 50.8238C53.7712 51.0243 53.9824 51.1881 54.2195 51.3056C54.4567 51.4231 54.7149 51.4918 54.9791 51.5077C55.2433 51.5236 55.5079 51.4864 55.7574 51.3982C56.007 51.3101 56.2363 51.1728 56.4318 50.9944C56.6273 50.8161 56.7851 50.6004 56.8958 50.36C57.0065 50.1196 57.0679 49.8595 57.0763 49.595C57.0847 49.3305 57.04 49.067 56.9448 48.8201C56.3988 47.2764 55.3878 45.9399 54.0508 44.9946C52.7139 44.0493 51.1167 43.5417 49.4794 43.5417ZM49.4794 59.375V67.2917C50.5292 67.2917 51.536 66.8746 52.2783 66.1323C53.0206 65.39 53.4377 64.3831 53.4377 63.3333C53.4377 62.2835 53.0206 61.2767 52.2783 60.5344C51.536 59.792 50.5292 59.375 49.4794 59.375Z'
                          fill='#00CDB4'
                        />
                      </svg>
                    </div>
                    <h1 className='text-lg text-black font-[500] text-center mb-3'>
                      Anda yakin untuk memberikan penawaran kepada
                      <b>“{detailTender.title}”</b>
                      sebesar <b>“{_renderCurrency(bid)}”</b>
                    </h1>
                    <h1 className='text-[#5C5C5C] text-sm text-center mb-7'>
                      Dengan mengajukan penawaran, anda akan berpartisipasi pada tender “{detailTender.title}”.{' '}
                    </h1>
                    <div className='flex justify-center gap-2'>
                      <button
                        onClick={handleClose2}
                        className='px-4 py-2 rounded-lg text-cherry bg-[#EDEDED]'>
                        Tidak, Periksa ulang
                      </button>
                      <button
                        onClick={postData}
                        className='px-4 py-2 text-white rounded-lg bg-cherry'>
                        Ya, Ajukan penawaran{' '}
                      </button>
                    </div>
                  </div>
                </div>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </div>
    </Fragment>
  );
}

export default PermintaanPenawaran;
