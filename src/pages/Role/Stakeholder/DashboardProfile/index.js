import { Add, Close } from '@mui/icons-material';
import { Backdrop, Fade, Modal } from '@mui/material';
import { Box } from '@mui/system';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link, useNavigate } from 'react-router-dom';
import Api from '../../../../Api';
import {
  Bidding2,
  IconNext,
  IconTaskSquare,
  IconUploadImageGray,
  LogoDefault
} from '../../../../assets';
import { CardTender, FooterTwo, Navbar } from '../../../../component';
import imageHandle from '../../../../utils/imageHandle';
import { UrlApi } from '../../../../constants';

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

const DashboardProfileSH = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [limit, setlimit] = useState(10);
  const [refreshApi, setRefreshApi] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [bidding, setBidding] = useState('');
  const [tender, setTender] = useState('');
  const [tenderListCount, setTenderListCount] = useState('');
  const [tenderList, setTenderList] = useState('');
  const [bidingDetailId, setBidingDetailId] = useState('');
  const [detailTender, setDetailTender] = useState('');
  const [dataStakeholder, setDataStakeholder] = useState('');
  const [dataImageTender, setDataImageTender] = useState('');
  const [openBiding, setOpenBiding] = useState(false);
  const [service, setService] = useState('');
  const [tenders, setTenders] = useState('');
  const [totalBidding, setTotalBidding] = useState('');
  const [isVerified, setIsVerified] = useState('');


  const handleOpenBiding = async (id) => {
    setOpenBiding(true);
    const detailBiding = await Api.getBiddingDetail(id, localStorage.getItem('token-hub'));
    setBidingDetailId(detailBiding.data.data);
  };

  const handleCloseBiding = () => setOpenBiding(false);

  // const id = state.id;
  const getData = async () => {
    try {
      const resUser = await Api.getUser(localStorage.getItem('token-hub'));
      const resStatistic = await Api.getStakeholdersStatistic(localStorage.getItem('token-hub'));
      const resTender = await Api.getTender(localStorage.getItem('token-hub'), limit, page);
      // const resDataService = await Api.getDataService(localStorage.getItem('token-hub'))
      // const resBidding = await Api.getBidding(localStorage.getItem('token-hub'))
      // const historyService = await Api.getHistoryService(localStorage.getItem('token-hub'))
  
      setTender(resTender.data.data);
      setUser(resUser.data.admin);
      setRole(resUser.data.admin.role);
      setCompany(resUser.data.admin.company);
      setTotalPage(resTender.data.totalPages);
      setService(resStatistic.data.booked_service_count);
      setTenders(resStatistic.data.tender_count);
      setTotalBidding(resStatistic.data.bidding_count);
      setIsVerified(resUser.data.admin.company.is_verified_company);
      // setService(historyService.data.data);
      setRefreshApi(true);
      // setBidding(resBidding.data.data)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getData();
    setRefreshApi(false);
  }, []);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget_minimum, setBudget_minimum] = useState('');
  const [budget_maximum, setBudget_maximum] = useState('');
  const [maximum_applicants, setMaximum_applicants] = useState('');
  const [expired_at, setExpired_at] = useState('');
  const [base64Image, setBase64Image] = useState('s');

  const [image, setImage] = useState('');
  const handleChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64Image(reader.result);
    };
    reader.readAsDataURL(file);
    setImage(URL.createObjectURL(file)); // tambahkan baris ini
  };

  const AddBiding = async () => {
    setIsLoading(true);
    try {
      const formData = {
        title: title,
        description: description,
        image: base64Image,
        budget_minimum: budget_minimum,
        budget_maximum: budget_maximum,
        maximum_applicants: maximum_applicants,
        expired_at: expired_at,
        status: 'success',
      };
      await Api.createBiding(localStorage.getItem('token-hub'), formData).then(async (response) => {
        setRefreshApi(true);
        handleClose();
        setIsLoading(true);
      });
      //   handleOpen()
    } catch (error) {
      console.log(error.message);
      //   navigate("/500");
    }
  };

  let currentDate = new Date();

  const days = (date_1, date_2) => {
    let difference = date_1.getTime() - date_2.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
  };

  const showDetail = async (id) => {
    setShowModal(!showModal);
    try {
      const response = await Api.getTenderById(localStorage.getItem('token-hub'), id);
      const getListTender = await Api.getTenderListPartner(localStorage.getItem('token-hub'), id);
      setTenderListCount(getListTender.data.count);
      setDetailTender(response.data.data);
      setDataStakeholder(response.data.data.stakeholder);
      setDataImageTender(response.data.data.tender_images[0]);
      setTenderList(getListTender.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlePageClickVenue = () => {
    setPage(page + 1);
  };

  return (
    <div className='bg-outline min-h-screen'>
      <Navbar />
      <div className='md:px-[75px] px-5 pt-[120px] pb-[10px] md:pt-[140px] md:pb-[30px] mb-10'>
        <div className='flex items-center gap-3 mb-[30px]'>
          <Link
            to={''}
            className='text-black-k text-xs lg:text-sm font-[500] hover:text-primary'
          >
            Beranda
          </Link>
          <img src={IconNext} alt='' />
          <Link
            to={''}
            className='text-black-k text-xs lg:text-sm font-[500] hover:text-primary'
          >
            Beranda Profile
          </Link>
        </div>
        <div className='space-y-8 md:space-y-10'>
          {/* Section 1 */}
          <div className='py-4 space-y-8 bg-white rounded-xl md:py-7 md:px-14 px-4'>
            <div className='flex items-center gap-3 md:gap-7 md:justify-start'>
              <div className=''>
                <div className='relative object-cover md:w-24 md:h-24 w-[69px] h-[69px] overflow-hidden bg-gray-100 border rounded-full'>
                  <img
                    src={
                      !image
                        ? imageHandle(user.image) === `${UrlApi}undefined`
                          ? LogoDefault
                          : imageHandle(user.image)
                        : image
                    }
                    className='absolute'
                    alt='Konnect Logo'
                  />
                </div>
              </div>
              <div>
                <p className='md:text-2xl text-[13px] font-semibold text-black-k'>
                  {user.fullname === null ? 'Konect-Hub' : user.fullname}
                </p>
                <div className='flex flex-wrap gap-2.5 items-center'>
                  <p className='font-medium md:text-base text-[10px] text-dark-5'>{role.name}</p>
                  {isVerified === false ? (
                    <div className='rounded-[4px] bg-light-gray py-[6px] px-[10px]'>
                      <h1 className='text-white text-[8px] md:text-[10px]'>Belum Terverifikasi</h1>
                    </div>
                  ) : (
                    <div className='rounded-[4px] bg-green-2 py-[6px] px-[10px]'>
                      <h1 className='text-white text-[8px] md:text-[10px]'>Terverifikasi</h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {isVerified === false && (
              <div>
                <h1 className='text-dark-4 font-[500] text-xs md:text-sm md:w-3/5 mt-[30px]'>
                  Akun partner anda belum terverifikasi, anda belum dapat membuat tender ataupun melakukan bidding.
                </h1>
                <h1 className='text-[#5C5C5C] font-[500] text-sm md:w-3/5'>
                  Untuk memverifikasi akun partner anda,{' '}
                  <span className='text-[#BE0000] underline underline-offset-4'>
                    <button onClick={() => navigate('/company-profile-sh', { state: { id: company.id } })}>
                      Lengkapi data akun.
                    </button>
                  </span>
                </h1>
              </div>
            )}
            <div className='flex overflow-x-auto gap-8 scrollbar-hide'>
              <div className='relative py-6 space-y-8 border rounded-2xl px-7 flex-shrink-0 md:w-[370px] w-[200px]'>
                <div className='flex gap-2.5 items-center'>
                  <div className='md:w-6 md:h-6 w-4 h-4'>
                    <img src={IconTaskSquare} alt='' />
                  </div>
                  <p className='font-medium text-dark-5 text-xs md:text-base'>Layanan Terbooking</p>
                </div>
                <p className='md:text-2xl text-sm font-semibold text-dark-3'>{service > 0 ? service : 0} Layanan</p>
                <div>
                  <Link
                    to={'/riwayat-layanan-sh'}
                    className='text-cherry font-medium text-xs md:text-sm hover:text-[#170026]'
                  >
                    Lihat Riwayat
                  </Link>
                </div>
              </div>


              <div className='py-6 space-y-8 border rounded-2xl px-7 flex-shrink-0 md:w-[370px] w-[200px]'>
                <div className='flex gap-2.5 items-center'>
                  <div className='md:w-6 md:h-6 w-4 h-4'>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z'
                        // jika terverifikasi
                        // fill="#00CDB4"
                        // jika belum teverifikasi
                        fill={
                          !company.name ||
                            !company.description ||
                            !company.email ||
                            !company.phone ||
                            !company.type ||
                            !company.city ||
                            !company.province ||
                            !company.postal_code ||
                            !company.address ||
                            !company.pic_name ||
                            !company.pic_position ||
                            !company.pic_phone ||
                            !company.pic_email ||
                            !company.website_url ||
                            !company.website_type ||
                            !company.marketplace_url ||
                            !company.marketplace_type
                            ? '#737373'
                            : '#00CDB4'
                        }
                      />
                    </svg>
                  </div>

                  <p className='font-medium text-dark-5 text-xs md:text-base'>Open Tender</p>
                </div>
                <p className='md:text-2xl text-sm font-semibold text-dark-3'>{tenders > 0 ? tenders : 0} Tender</p>
                {/* jika terverifikasi */}
                {/* <div>
      <Link to={'/riwayat-tender-sh'} className= text-xs'md:'>
        Lihat Riwayat
      </Link>
    </div> */}
                {/* jika belum terverifikasi */}
                {/* <div><p className="text-sm font-medium text-dark-5 hover:text-dark-4">Lihat Riwayat</p></div> */}
              </div>
              <div className='py-6 space-y-8 border rounded-2xl px-7 flex-shrink-0 md:w-[370px] w-[200px]'>
                <div className='flex gap-2.5 items-center'>
                  <div className='md:w-6 md:h-6 w-4 h-4'>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M22 10.75C22.41 10.75 22.75 10.41 22.75 10V9C22.75 4.59 21.41 3.25 17 3.25H10.75V5.5C10.75 5.91 10.41 6.25 10 6.25C9.59 6.25 9.25 5.91 9.25 5.5V3.25H7C2.59 3.25 1.25 4.59 1.25 9V9.5C1.25 9.91 1.59 10.25 2 10.25C2.96 10.25 3.75 11.04 3.75 12C3.75 12.96 2.96 13.75 2 13.75C1.59 13.75 1.25 14.09 1.25 14.5V15C1.25 19.41 2.59 20.75 7 20.75H9.25V18.5C9.25 18.09 9.59 17.75 10 17.75C10.41 17.75 10.75 18.09 10.75 18.5V20.75H17C21.41 20.75 22.75 19.41 22.75 15C22.75 14.59 22.41 14.25 22 14.25C21.04 14.25 20.25 13.46 20.25 12.5C20.25 11.54 21.04 10.75 22 10.75ZM10.75 14.17C10.75 14.58 10.41 14.92 10 14.92C9.59 14.92 9.25 14.58 9.25 14.17V9.83C9.25 9.42 9.59 9.08 10 9.08C10.41 9.08 10.75 9.42 10.75 9.83V14.17Z'
                        // jika terverifikasi
                        // fill="#00CDB4"
                        // jika belum teverifikasi
                        fill={
                          !company.name ||
                            !company.description ||
                            !company.email ||
                            !company.phone ||
                            !company.type ||
                            !company.city ||
                            !company.province ||
                            !company.postal_code ||
                            !company.address ||
                            !company.pic_name ||
                            !company.pic_position ||
                            !company.pic_phone ||
                            !company.pic_email ||
                            !company.website_url ||
                            !company.website_type ||
                            !company.marketplace_url ||
                            !company.marketplace_type
                            ? '#737373'
                            : '#00CDB4'
                        }
                      />
                    </svg>
                  </div>
                  <p className='font-medium text-dark-5 text-xs md:text-base'>Bidding</p>
                </div>
                <p className='md:text-2xl text-sm font-semibold text-dark-3'>
                  {totalBidding > 0 ? totalBidding : 0} Total Bidding
                </p>
              </div>
            </div>
          </div>
          {/* Section 2 */}
          <div className='py-4 md:space-y-8 bg-white rounded-xl md:py-7 md:px-14 px-7'>
            <p className='text-xs md:text-sm font-medium text-dark-5 mb-4 md:mb-7'>Tentang Perusahaan</p>
            <div className='flex flex-wrap items-start gap-3 mb-6 md:gap-7 md:items-center'>
              <div className=''>
                <div className='relative md:w-[60px] md:h-[60px] w-[69px] h-[69px] overflow-hidden object-cover rounded-full border bg-gray-100'>
                <img
                    src={
                      !image
                        ? imageHandle(user.image) === `${UrlApi}undefined`
                          ? LogoDefault
                          : imageHandle(user.image)
                        : image
                    }
                    className='absolute'
                    alt='Konnect Logo'
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <p className='md:text-xl tex-[13px] font-semibold text-dark-3'>{!company.name ? 'Konect-Hub' : company.name}</p>
                <p className='md:text-xs text-xxs font-medium text-dark-5'>Bergabung sejak {moment(company.createdAt).format('DD/MM/YYYY')}</p>
              </div>
            </div>
            <div className='mb-5'>
              <h4 className='text-cherry-2 font-medium text-sm'>Deskripsi</h4>
              <p className='text[#475569] font-medium text-sm'>
                {!company.description ? 'Empty' : company.description}
              </p>
            </div>
            <div>
              <button
                onClick={() => navigate('/company-profile-sh', { state: { id: company.id } })}
                className='text-cherry md:px-5 px-3 py-2 md:py-2.5 border-2 border-cherry rounded-lg hover:bg-cherry hover:text-white'
              >
                Lihat Detail
              </button>
            </div>
          </div>
          {/* Section 3 */}
          <div className='py-4 space-y-8 bg-white rounded-xl md:py-7 md:px-14 px-7'>
            <div className='flex flex-wrap items-center justify-between gap-5'>
              <div className='space-y-2.5'>
                <p className='md:text-2xl text-base font-semibold text-black-k'>Open Tender </p>
                <p className='md:text-lg text-xs font-medium text-dark-5'>Buka iklan tender, dan dapatkan modalnya</p>
                <p className='md:text-sm text-xxs font-medium text-dark-7'>{tender.length} Tender </p>
              </div>
              <Link
                to={'/tambah-tender'}
                className='items-center flex gap-2.5 text-white p-3 md:text-base text-xs bg-cherry rounded-lg hover:bg-cherry/75 hover:text-white'
              >
                <div className='w-[14px] h-[14px] flex items-center'>
                  <Add />
                </div>
                <span>Tambah Tender</span>
              </Link>
            </div>
            <div className='space-y-12'>
              <div className='grid grid-cols-1 gap-8 lg:grid-cols-2 md:grid-cols-1'>
                {Object.values(tender).map((data, index) => {
                  const startDate = moment(data.implementation_estimate);
                  const endDate = moment(data.deadline);
                  return (
                    <CardTender
                      key={index}
                      open={handleOpenBiding}
                      title={data.title}
                      imgProfile={!data.stakeholder.image ? LogoDefault : imageHandle(data.stakeholder.image)}
                      author={data.stakeholder.fullname}
                      desc={data.description}
                      people={data.participant_estimate}
                      date={data.implementation_estimate}
                      budget={data.budget_target}
                      image={!data.tender_images[0] ? LogoDefault : imageHandle(data.tender_images[0]?.image)}
                      textBudget='Anggaran'
                      satuan='Orang'
                      jml_tender={data.bidApplicantsCount}
                      jml_target={data.maksimal_partner}
                      sisa_hari={endDate.diff(startDate, 'days')}
                      batas_akhir={data.deadline}
                      verified={false}
                      openModal={() => showDetail(data.id)}
                      isAddons={data.add_on}
                    />
                  );
                })}
              </div>

              {tender.length >= 1 && (
                <div className='flex justify-center'>
                  <ReactPaginate
                    breakLabel={<span className='mr-4'>...</span>}
                    nextLabel={
                      <span className='flex items-center justify-center w-12 h-12 border-2 rounded-full hover:bg-cherry hover:text-white'>
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
                    onPageChange={handlePageClickVenue}
                    pageRangeDisplayed={limit}
                    pageCount={totalPage}
                    previousLabel={
                      <span className='flex items-center justify-center w-12 h-12 border-2 rounded-full hover:bg-cherry hover:text-white'>
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
                    containerClassName='flex items-center justify center mt-8 mb-4 space-x-5'
                    disabledClassName='w-12 h-12 rounded-full border-2 flex items-center justify-center'
                    activeClassName='w-12 h-12 rounded-full border-2 bg-cherry text-white flex items-center justify-center'
                  />
                </div>
              )}
            </div>

            {/* jika data kosong */}
            {/*<div className="flex flex-col items-center justify-center w-full mt-16 md:mt-32 space-y-11">
                            <img src={NoData} />
                            <p className='text-dark-7'>Belum ada layanan yang ditambah</p>
                            <div><button onClick={handleOpen} className=' flex gap-2.5 text-white p-3 bg-primary rounded-lg hover:bg-primary/75 hover:text-white'><Add /><span>Tambah Bidding</span></button></div>
                        </div> */}
          </div>
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
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className='flex items-start justify-between'>
              <h1 className='text-lg font-semibold'>Tambah Bidding</h1>
              <button
                onClick={handleClose}
                className='hover:text-dark-3'
              >
                <Close />
              </button>
            </div>
            <div className='my-5 space-y-2.5'>
              <div className='space-y-1.5'>
                <label className='text-sm font-medium text-dark-5'>
                  Nama Project<span className='text-[#C1121F] ml-[10px]'>*</span>
                </label>
                <input
                  type='text'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder='Masukan nama  project tender...'
                  className='rounded-[12px] outline-none border border-outline w-full py-2.5 px-3.5'
                />
              </div>
              <div className='grid grid-cols-2 gap-5'>
                <div className='space-y-1.5'>
                  <label className='text-sm font-medium text-dark-5'>
                    Estimasi Peserta<span className='text-[#C1121F] ml-[10px]'>*</span>
                  </label>
                  <input
                    type='number'
                    value={maximum_applicants}
                    onChange={(e) => setMaximum_applicants(e.target.value)}
                    placeholder=''
                    min={0}
                    className='rounded-[12px] outline-none border border-outline w-full py-2.5 px-3.5'
                  />
                </div>
                <div className='space-y-1.5'>
                  <label className='text-sm font-medium text-dark-5'>
                    Estimasi Waktu<span className='text-[#C1121F] ml-[10px]'>*</span>
                  </label>
                  <input
                    type='date'
                    value={expired_at}
                    onChange={(e) => setExpired_at(e.target.value)}
                    placeholder=''
                    className='rounded-[12px] outline-none border border-outline w-full py-2.5 px-3.5'
                  />
                </div>
              </div>
              <div className='grid grid-cols-2 gap-5'>
                <div className='space-y-1.5'>
                  <label className='text-sm font-medium text-dark-5'>
                    Estimasi Biaya<span className='text-[#C1121F] ml-[10px]'>*</span>
                  </label>
                  <input
                    type='number'
                    value={budget_minimum}
                    onChange={(e) => setBudget_minimum(e.target.value)}
                    placeholder=''
                    min={0}
                    className='rounded-[12px] outline-none border border-outline w-full py-2.5 px-3.5'
                  />
                </div>
                <div className='space-y-1.5'>
                  <label className='text-sm font-medium text-dark-5'>
                    Maksimal Partner<span className='text-[#C1121F] ml-[10px]'>*</span>
                  </label>
                  <input
                    type='number'
                    value={budget_maximum}
                    onChange={(e) => setBudget_maximum(e.target.value)}
                    placeholder=''
                    min={0}
                    className='rounded-[12px] outline-none border border-outline w-full py-2.5 px-3.5'
                  />
                </div>
              </div>
              <div className='space-y-1.5'>
                <label className='text-sm font-medium text-dark-5'>
                  Deskripsi Isi<span className='text-[#C1121F] ml-[10px]'>*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder='Tuliskan desktipsi project...'
                  className='rounded-[12px] outline-none border border-outline w-full py-2.5 px-3.5'
                ></textarea>
              </div>
              <div className='space-y-1.5'>
                <div>
                  <label
                    htmlFor='upload-file'
                    className='cursor-pointer'
                  >
                    <div
                      className='w-[105px] h-[105px] rounded-[12px] border-2 border-[#EBEBEB] flex flex-col items-center justify-center bg-cover relative'
                      style={{ backgroundImage: `url(${image})` }}
                    >
                      <img src={IconUploadImageGray} />
                      {/* <div className='absolute bg-[#F9F9F9] border border-[#EBEBEB] w-[38px] h-[38px] rounded-full -bottom-3 -right-4 flex items-center justify-center'>
                                                <img src={IconEdit}/>
                                            </div> */}
                    </div>
                    <input
                      type='file'
                      id='upload-file'
                      onChange={(e) => handleChange(e)}
                      className='rounded-[12px] outline-none border border-outline w-full px-[20px] py-[15px] hidden'
                      required
                    />
                  </label>
                </div>
                <h1 className='text-[#A8A8A8] font-[500] text-[10px] mt-[10px]'>Maks. 10 MB (JPG, JPEG, PNG )</h1>
              </div>
            </div>

            <div className='flex flex-row justify-end mt-9'>
              <button
                className='px-5 py-2 ml-2 font-semibold border rounded-md border-dark-5 text-dark-5 hover:text-white hover:bg-cherry/50'
                onClick={handleClose}
              >
                Batal
              </button>
              <button
                className='px-5 py-2 ml-2 font-semibold text-white rounded-md bg-cherry hover:bg-cherry/50'
                onClick={AddBiding}
              >
                Simpan
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={openBiding}
        onClose={handleCloseBiding}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openBiding}>
          <Box sx={style}>
            <div className='flex items-start justify-between'>
              <h1 className='text-lg font-semibold'>Detail Open tender</h1>
              <button
                onClick={handleCloseBiding}
                className='hover:text-dark-3'
              >
                <Close />
              </button>
            </div>
            <div className='my-5 space-y-2.5'>
              <div className='flex flex-col space-y-5'>
                <div>
                  <img
                    src={Bidding2}
                    className='object-cover w-full rounded-lg h-96'
                    alt='Konnect Logo'
                  />
                </div>
                <div>
                  <h1 className='text-[16px] font-semibold'>Big Event: Spektacular Ulang tahun Perusahaan </h1>
                </div>

                <div className='gap-5 lg:flex'>
                  <img
                    src={bidding}
                    alt='JoinTender'
                    className='h-[18px] w-[18px] rounded-full'
                  />
                  <p className='text-[10px] text-[#B0B0B0]'>Celiscar Santa</p>
                </div>
                <div>
                  <p className='text-[12px] text-[#1A1A1A] w-full'>
                    Kami adalah organisasi nirlaba membutuhkan seseorang yang dapat memimpin dan mengelola seluruh
                    proyek. Mulai dari proses perancangan proyek, pelaksanaan, proyek selesai , hingga proses evaluasi{' '}
                  </p>
                </div>
                <div className='lg:flex lg:items-center gap-9'>
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

                      <span className='text-[#6A6A6A] text-[10px]'>1000 - 5000</span>
                    </div>
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

                      <span className='text-[#6A6A6A] text-[10px]'>24 Februari 2023</span>
                    </div>
                  </div>
                </div>
                <div className=''>
                  <p className='text-[#888888] text-start text-xs'>Anggaran</p>
                  <p className='text-xl font-semibold'>Rp 4.000.000.000</p>
                </div>

                <div className='flex gap-2'>
                  <p className='text-[12px] text-[#5C5C5C]'>240 orang yang mendaftar dari target 240 orang</p>
                  <div className='w-[93px] h-[20px] bg-green-2 text-white flex justify-center items-center text-[10px] font-normal rounded-full'>
                    Tercapai
                  </div>
                </div>

                <div className='w-full h-[44px] border-2 border-gray-200 rounded-[12px] flex items-center justify-between px-[29px]'>
                  <h1 className='font-semibold text-[16px]'>240 partner</h1>
                  <div>
                    <svg
                      width='12'
                      height='8'
                      viewBox='0 0 12 8'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M11 1.0001C10.8167 0.816764 10.5833 0.725098 10.3 0.725098C10.0167 0.725098 9.78333 0.816764 9.6 1.0001L5.7 4.9001L1.8 1.0001C1.61667 0.816764 1.38333 0.725098 1.1 0.725098C0.816667 0.725098 0.583333 0.816764 0.4 1.0001C0.216666 1.18343 0.125 1.41676 0.125 1.7001C0.125 1.98343 0.216666 2.21676 0.4 2.4001L5 7.0001C5.1 7.1001 5.20833 7.1711 5.325 7.2131C5.44167 7.25443 5.56667 7.2751 5.7 7.2751C5.83333 7.2751 5.95833 7.25443 6.075 7.2131C6.19167 7.1711 6.3 7.1001 6.4 7.0001L11 2.4001C11.1833 2.21676 11.275 1.98343 11.275 1.7001C11.275 1.41676 11.1833 1.18343 11 1.0001Z'
                        fill='black'
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
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
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className='flex items-start justify-between'>
              <h1 className='text-lg font-semibold'>Tambah Bidding</h1>
              <button
                onClick={handleClose}
                className='hover:text-dark-3'
              >
                <Close />
              </button>
            </div>
            <div className='my-5 space-y-2.5'>
              <div className='space-y-1.5'>
                <label className='text-sm font-medium text-dark-5'>
                  Nama Project<span className='text-[#C1121F] ml-[10px]'>*</span>
                </label>
                <input
                  type='text'
                  placeholder='Masukan nama  project tender...'
                  required
                  className='rounded-[12px] outline-none border border-outline w-full py-2.5 px-3.5'
                />
              </div>
              <div className='grid grid-cols-2 gap-5'>
                <div className='space-y-1.5'>
                  <label className='text-sm font-medium text-dark-5'>
                    Estimasi Peserta<span className='text-[#C1121F] ml-[10px]'>*</span>
                  </label>
                  <input
                    type='number'
                    placeholder=''
                    min={0}
                    required
                    className='rounded-[12px] outline-none border border-outline w-full py-2.5 px-3.5'
                  />
                </div>
                <div className='space-y-1.5'>
                  <label className='text-sm font-medium text-dark-5'>
                    Estimasi Waktu<span className='text-[#C1121F] ml-[10px]'>*</span>
                  </label>
                  <input
                    type='date'
                    placeholder=''
                    required
                    className='rounded-[12px] outline-none border border-outline w-full py-2.5 px-3.5'
                  />
                </div>
              </div>
              <div className='grid grid-cols-2 gap-5'>
                <div className='space-y-1.5'>
                  <label className='text-sm font-medium text-dark-5'>
                    Estimasi Biaya<span className='text-[#C1121F] ml-[10px]'>*</span>
                  </label>
                  <input
                    type='number'
                    placeholder=''
                    min={0}
                    required
                    className='rounded-[12px] outline-none border border-outline w-full py-2.5 px-3.5'
                  />
                </div>
                <div className='space-y-1.5'>
                  <label className='text-sm font-medium text-dark-5'>
                    Maksimal Partner<span className='text-[#C1121F] ml-[10px]'>*</span>
                  </label>
                  <input
                    type='number'
                    placeholder=''
                    min={0}
                    required
                    className='rounded-[12px] outline-none border border-outline w-full py-2.5 px-3.5'
                  />
                </div>
              </div>
              <div className='space-y-1.5'>
                <label className='text-sm font-medium text-dark-5'>
                  Deskripsi Isi<span className='text-[#C1121F] ml-[10px]'>*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder='Tuliskan desktipsi project...'
                  required
                  className='rounded-[12px] outline-none border border-outline w-full py-2.5 px-3.5'
                ></textarea>
              </div>
            </div>

            <div className='flex flex-row justify-end mt-9'>
              <button
                className='px-5 py-2 ml-2 font-semibold border rounded-md border-dark-5 text-dark-5 hover:text-white hover:bg-cherry/50'
                onClick={handleClose}
              >
                Batal
              </button>
              <button className='px-5 py-2 ml-2 font-semibold text-white rounded-md bg-cherry hover:bg-cherry/50'>
                Simpan
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
      {showModal ? (
        <>
          <div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none px-5 md:px-10 focus:outline-none'>
            <div className='relative w-full max-w-xl'>
              {/*content*/}
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none lg:h-[650px] h-[646px] overflow-y-auto scrollbar-hide'>
                {/*header*/}
                <div className='flex items-start justify-between px-5 pt-5 rounded-t pb-7'>
                  <h1 className='text-lg font-semibold text-black-k'>Detail Open tender</h1>
                  <button
                    className='float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none'
                    onClick={() => setShowModal(false)}
                  >
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M13.4099 12.0002L17.7099 7.71019C17.8982 7.52188 18.004 7.26649 18.004 7.00019C18.004 6.73388 17.8982 6.47849 17.7099 6.29019C17.5216 6.10188 17.2662 5.99609 16.9999 5.99609C16.7336 5.99609 16.4782 6.10188 16.2899 6.29019L11.9999 10.5902L7.70994 6.29019C7.52164 6.10188 7.26624 5.99609 6.99994 5.99609C6.73364 5.99609 6.47824 6.10188 6.28994 6.29019C6.10164 6.47849 5.99585 6.73388 5.99585 7.00019C5.99585 7.26649 6.10164 7.52188 6.28994 7.71019L10.5899 12.0002L6.28994 16.2902C6.19621 16.3831 6.12182 16.4937 6.07105 16.6156C6.02028 16.7375 5.99414 16.8682 5.99414 17.0002C5.99414 17.1322 6.02028 17.2629 6.07105 17.3848C6.12182 17.5066 6.19621 17.6172 6.28994 17.7102C6.3829 17.8039 6.4935 17.8783 6.61536 17.9291C6.73722 17.9798 6.86793 18.006 6.99994 18.006C7.13195 18.006 7.26266 17.9798 7.38452 17.9291C7.50638 17.8783 7.61698 17.8039 7.70994 17.7102L11.9999 13.4102L16.2899 17.7102C16.3829 17.8039 16.4935 17.8783 16.6154 17.9291C16.7372 17.9798 16.8679 18.006 16.9999 18.006C17.132 18.006 17.2627 17.9798 17.3845 17.9291C17.5064 17.8783 17.617 17.8039 17.7099 17.7102C17.8037 17.6172 17.8781 17.5066 17.9288 17.3848C17.9796 17.2629 18.0057 17.1322 18.0057 17.0002C18.0057 16.8682 17.9796 16.7375 17.9288 16.6156C17.8781 16.4937 17.8037 16.3831 17.7099 16.2902L13.4099 12.0002Z'
                        fill='black'
                      />
                    </svg>
                  </button>
                </div>
                {/*body*/}
                <div className='px-6 pb-5'>
                  <div>
                    <img
                      src={!dataImageTender.image ? LogoDefault : imageHandle(dataImageTender.image)}
                      className='object-cover w-full h-64 rounded-lg'
                      alt='Konnect Logo'
                    />
                  </div>
                  <div>
                    <h1 className='md:text-base text-sm font-semibold text-black mt-2 md:mt-6 mb-3'>{detailTender.title}</h1>
                  </div>
                  <div className='gap-5 lg:flex'>
                    <img
                      src={!dataStakeholder.image ? LogoDefault : imageHandle(dataStakeholder.image)}
                      alt='JoinTender'
                      className='md:h-[18px] md:w-[18px] w-4 h-4 rounded-full'
                    />
                    <p className='text-[10px] text-[#B0B0B0]'>{dataStakeholder.fullname}</p>
                  </div>
                  <div>
                    <p className='text-[12px] text-black-k w-full mt-2 md:mt-3 mb-4 line-clamp-3'>
                      {detailTender.description}
                    </p>
                  </div>
                  <div className='overflow-x-auto scrollbar-hide flex w-full '>
                    <div className='flex overflow-x-auto scrollbar-hide items-center gap-9'>
                      <div className='flex-shrink-0'>
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
                      <div className='flex-shrink-0'>
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
                      <div className='flex-shrink-0'>
                        <h1 className='text-[10px] text-[#454545]'>Batas Akhir Tender</h1>
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
                              {moment(detailTender.deadline).format('DD MMMM YYYY')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='mt-5'>
                    <p className='text-[#5C5C5C] text-start text-xs'>Anggaran</p>
                    <p className='font-semibold text-base md:text-xl text-[#1A1A1A]'>{detailTender.budget_target}</p>
                  </div>

                  <div className='flex gap-2 mt-[35px]'>
                    <p className='md:text-[15px] text-xs text-cherry'>
                      {tenderListCount} orang yang mendaftar dari target {detailTender.maksimal_partner} orang
                    </p>
                    <div
                      className={`${tenderListCount >= detailTender.maksimal_partner ? 'bg-green-2' : 'bg-[#E37816]'
                        } py-1 px-2.5 text-white flex justify-center text-center items-center text-[10px] font-normal rounded-full`}
                    >
                      {tenderListCount >= detailTender.maksimal_partner ? 'Tercapai' : 'Belum Tercapai'}
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/detail-partner-open-Tender', { state: { tenderId: detailTender.id } })}
                    className='w-full'
                  >
                    <div className='w-full h-[44px] mt-4 border-2 border-gray-200 rounded-[12px] flex items-center justify-between px-[19px]'>
                      <h1 className='font-semibold text-[16px] text-black'>Lihat {tenderListCount} partner</h1>
                      <div>
                        <svg
                          width='12'
                          height='8'
                          viewBox='0 0 12 8'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M11 1.0001C10.8167 0.816764 10.5833 0.725098 10.3 0.725098C10.0167 0.725098 9.78333 0.816764 9.6 1.0001L5.7 4.9001L1.8 1.0001C1.61667 0.816764 1.38333 0.725098 1.1 0.725098C0.816667 0.725098 0.583333 0.816764 0.4 1.0001C0.216666 1.18343 0.125 1.41676 0.125 1.7001C0.125 1.98343 0.216666 2.21676 0.4 2.4001L5 7.0001C5.1 7.1001 5.20833 7.1711 5.325 7.2131C5.44167 7.25443 5.56667 7.2751 5.7 7.2751C5.83333 7.2751 5.95833 7.25443 6.075 7.2131C6.19167 7.1711 6.3 7.1001 6.4 7.0001L11 2.4001C11.1833 2.21676 11.275 1.98343 11.275 1.7001C11.275 1.41676 11.1833 1.18343 11 1.0001Z'
                            fill='black'
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className='fixed inset-0 z-40 bg-black opacity-25'></div>
        </>
      ) : null}
    </div>
  );
};

export default DashboardProfileSH;
