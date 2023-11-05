import { Backdrop, Box, Fade, Modal } from '@mui/material';
import {
  BackgroundAuth,
  BgDashboard,
  IconBag,
  IconBagCherry,
  IconBagLight,
  IconBagPrimary,
  IconBagPurple,
  IconBagTwo,
  IconBagYellow,
  IconCancel,
  IconCheck,
  IconCheckDark,
  IconCheckGreen,
  IconCheckPrimary,
  IconDollar,
  IconLocation,
  IconMoney,
  IconNext,
  IconNexts,
  IconPrev,
  IconPrevs,
  IconServiceVenueWhite,
  IconSucces,
  IconVanue,
  Logo,
  LogoDefault,
  VenueEmptyVector,
  vectorSubmitPartner,
} from '../../../../assets';
import { CardHeaderVenue, CardLayanan, CardOpenTender, CardVenue, Navbar } from '../../../../component';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import Api from '../../../../Api';
import { Close } from '@mui/icons-material';
import { CurrencyIDR } from '../../../../utils/CurrencyIDR';
import ReactPaginate from 'react-paginate';
import { async } from 'q';
import imageHandle from '../../../../utils/imageHandle';
import moment from 'moment';
import { toast } from 'react-toastify';

const style = {
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
  // Responsif pada tampilan ponsel
  '@media (max-width: 600px)': {
    width: '90%',
  },
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
  width: '60%',
};
const modalContentStyle = {
  position: 'relative',
  background: 'white',
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
};

const DetailPartnerOpenTender = () => {
  const params = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [addPartner, setAddPartner] = useState(false);
  const [pilihPartner, setPilihPartner] = useState(false);
  const [submitPartner, setSubmitPartner] = useState(false);

  const [users, setUsers] = useState('');
  const [items, setItems] = useState('');
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(12);
  const [totalItem, setTotalItem] = useState('');
  const [totalPage, setTotalPage] = useState('');
  const [statistic, setStatistic] = useState('');

  const [companyDetail, setCompanyDetail] = useState('');
  const [companyDetailDoc, setCompanyDetailDoc] = useState('');
  const [typeSiup, setTypeSiup] = useState('');
  const [typeBusiness, setTypeBusiness] = useState('');

  const handleOpen = async (id) => {
    setOpen(!open);
    try {
      const response = await Api.getTenderCompany(localStorage.getItem('token-hub'), id);
      setCompanyDetail(response.data.data);
      setTypeBusiness(response.data.data.type_business.join(', '));
      setTypeSiup(response.data.data.type_siup.split(' ')[0]);
      setCompanyDetailDoc(response.data.data.legal_documents);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => setOpen(false);

  const handleOpenPilih = async (id) => {
    setPilihPartner(!pilihPartner);
    try {
      const response = await Api.getTenderCompany(localStorage.getItem('token-hub'), id);
      setCompanyDetail(response.data.data);
      setCompanyDetailDoc(response.data.data.legal_documents);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClosePilih = () => setPilihPartner(false);
  const handleOpenPartner = async (id) => {
    setAddPartner(!addPartner);
    try {
      const response = await Api.getTenderCompany(localStorage.getItem('token-hub'), id);
      setCompanyDetail(response.data.data);
      setCompanyDetailDoc(response.data.data.legal_documents);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClosePartner = () => setAddPartner(false);

  const handlesCloseSubmit = () => setSubmitPartner(false);

  const [id, setId] = useState('');
  const [isTenderOpen, setIsTenderOpen] = useState(true);
  const [partnerCount, setPartnerCount] = useState(0);
  const [dataPartner, setDataPartner] = useState([]);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  const handleSubmit = () => {
    setIsSubmitSuccessful(true);
    setSubmitPartner(false);

    if (partnerCount === 3) {
      setIsTenderOpen(false);
    }
  };

  const submitOpenPartner = (id) => {
    setPartnerCount(partnerCount + 1);
    setDataPartner((prevArray) => [...prevArray, id]);
    setAddPartner(false);
  };

  const batalkanPartner = async (id) => {
    const data = {
      idBidApp: [id],
      status: false,
    };
    await Api.submitTender(localStorage.getItem('token-hub'), data, params.state.tenderId);
    setPartnerCount(partnerCount - 1);
    setDataPartner(dataPartner.filter((item) => item !== id));
    setPilihPartner(false);
  };

  const [tenderList, setTenderList] = useState('');
  const [tenderListCount, setTenderListCount] = useState('');
  const [detailTender, setDetailTender] = useState('');
  const [dataStakeholder, setDataStakeholder] = useState('');
  const [dataImageTender, setDataImageTender] = useState('');

  const getData = async () => {
    try {
      const response = await Api.getTenderById(localStorage.getItem('token-hub'), params.state.tenderId);
      const getListTender = await Api.getTenderListPartner(localStorage.getItem('token-hub'), params.state.tenderId);
      setTenderListCount(getListTender.data.count);
      setTenderList(getListTender.data.data);
      setDetailTender(response.data.data);
      setDataStakeholder(response.data.data.stakeholder);
      setDataImageTender(response.data.data.tender_images[0]);
      getListTender.data.data.forEach((company) => {
        if (company.status === true) {
          dataPartner.push(company.idBidApp);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const postDataTender = async () => {
    const data = {
      idBidApp: dataPartner,
      status: true,
    };
    try {
      const response = await Api.submitTender(localStorage.getItem('token-hub'), data, params.state.tenderId);
      // toast.success('Data telah berhasil dikirim !!!', {
      //     position: "top-center",
      //     autoClose: 3000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      // });
      // console.log('Berhasil submit partner')
      setTimeout(() => {
        navigate(-1);
      }, 3500);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [dataPartner]);

  return (
    <div className='bg-[#E3E8F1] min-h-screen'>
      <Navbar />
      <div className='md:px-[75px] px-5 pt-[120px] pb-[10px] md:pt-[140px] md:pb-[30px] mb-10'>
        <div className='flex items-center gap-3'>
          <Link
            to={-1}
            className='text-black-k text-xs lg:text-sm font-[500] hover:text-primary'>
            Dashboard Profile
          </Link>
          <img
            src={IconNext}
            alt=''
          />
          <button className='text-black-k text-xs lg:text-sm font-[500] hover:text-primary'>
            Detail Partner Open Tender
          </button>
        </div>
        <div className='bg-white mt-[30px] px-[20px] md:px-[40px] py-[30px] rounded-xl'>
          <div className='flex flex-col items-start'>
            <div>
              <h1 className='text-base font-semibold text-cherry md:text-2xl'>{detailTender.title} </h1>
              <h1 className='text-xs font-medium text-neutural md:text-sm'>
                {tenderListCount} orang yang mendaftar dari target {detailTender.maksimal_partner} orang
              </h1>
            </div>

            {/* card submit */}

            {isTenderOpen && partnerCount > 0 ? (
              <div className='pt-[30px] w-full'>
                <div className='w-full bg-[#F1F5F9] rounded-[16px] md:px-[26px] md:py-[36px] px-[14px] py-[14px] space-y-5'>
                  <h1 className='text-sm font-semibold text-kuning-3 md:text-lg'>Open Tender Ditutup </h1>
                  <div className='mt-[10px]'>
                    <div className='flex flex-col gap-3 mb-3 md:flex-row'>
                      <div className='flex gap-3'>
                        <img
                          src={IconCheckPrimary}
                          className='md:w-[30px] md:h-[30px] w-4 h-4'
                          alt=''
                        />
                        <div className='space-y-3'>
                          <p className='text-xs font-normal md:text-lg text-dark-4'>
                            Pilih 3 Rekomendasi Partner yang menurut anda memiliki kridebilitas yang baik dan memiliki
                            potensi sebagai pemenang tender. Pihak Konect akan membantu anda melakukan cross check
                            terkait data dan profile partner.{' '}
                          </p>
                          <p className='text-xs font-normal md:text-lg text-dark-4'>
                            Submit 3 pilihan anda setelah anda pastikan bahwa pilihan anda sesuai. Setelah melakukan
                            submit, anda tidak dapat menganti pilihan anda.{' '}
                          </p>
                        </div>
                      </div>
                      <div className='flex justify-end md:flex-none'>
                        <h1 className='text-xs font-bold text-dark-4 md:text-lg'>{`${partnerCount}/3`}</h1>
                      </div>
                    </div>
                    {partnerCount === 1 && (
                      <button className='px-4 py-2 ml-2 text-xs font-semibold text-white border rounded-md md:text-base bg-dark-7 hover:text-white hover:bg-dark-4'>
                        Submit
                      </button>
                    )}
                    {partnerCount === 2 && (
                      <button className='px-4 py-2 ml-2 text-xs font-semibold text-white border rounded-md md:text-base bg-dark-7 hover:text-white hover:bg-dark-4'>
                        Submit
                      </button>
                    )}
                    {partnerCount === 3 && (
                      <button
                        className='px-4 py-2 ml-2 text-xs font-semibold text-white border rounded-md md:text-base bg-primary hover:text-white hover:bg-teal-400'
                        onClick={() => {
                          setSubmitPartner(!submitPartner);
                        }}>
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
            {isSubmitSuccessful ? (
              <div className='pt-[30px] w-full'>
                <div className='w-full bg-[#F1F5F9] rounded-[16px] px-[26px] py-[36px] space-y-5'>
                  <h1 className='text-[#04DE00] font-semibold md:text-lg text-sm'>Rekomendasi Partner Tersubmit</h1>
                  <div className='mt-[10px]'>
                    <p className='text-xs font-normal md:text-lg text-dark-4'>
                      Rekomendasi partner berhasil tersubmit, dalam kurun waktu 3 hari kedepan pihak konect akan
                      menghubungi anda.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}

            {/* card submit */}

            <div className='py-[30px] w-full'>
              <div className='w-full bg-[#F1F5F9] rounded-[16px] px-[18px] py-[34px] space-y-5'>
                {/* Item Product */}
                {Object.values(tenderList).map((item, index) => (
                  <div key={index}>
                    <div className='w-full bg-white h-full rounded-[12px] p-[24px]'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-[14px]'>
                          <img
                            className='md:w-[46px] md:h-[46px] w-9 h-9 rounded-[12px] md:rounded-[16px]'
                            src={!item.company_logo ? LogoDefault : imageHandle(item.company_logo)}
                            alt=''
                          />
                          <div className='flex flex-col'>
                            <h1 className='text-xs font-semibold md:text-lg text-cherry-2'>{item.company_name}</h1>
                            <div className='flex items-center gap-2'>
                              <img
                                src={IconLocation}
                                className='md:w-[16px] md:h-[16px] h-2.5 w-2.5'
                                alt=''
                              />
                              <h2 className='font-normal text-[8px] md:text-[12px] text-neutural'>
                                {item.company_address !== null ? item.company_address : '-'}
                              </h2>
                            </div>
                          </div>
                        </div>
                        <h1 className='font-medium text-[8px] md:text-[14px] text-[neutural'>{item.date}</h1>
                      </div>
                      {/* Detail Layanan */}
                      <div className='flex pt-[15px] justify-between'>
                        <div className='flex flex-col space-y-5 lg:flex-row lg:space-x-24 lg:space-y-0'>
                          <div className='flex items-center gap-2'>
                            <img
                              src={IconBagTwo}
                              className='w-3 h-3 md:w-4 md:h-4'
                              alt=''
                            />
                            <div>
                              <h1 className='font-normal md:text-xs text-[8px]'>Badan Usaha</h1>
                              <h2 className='text-xs font-medium md:text-sm'>
                                {item.company_type !== null ? item.company_type : '-'}
                              </h2>
                            </div>
                          </div>
                          <div className='flex items-center gap-2'>
                            <img
                              src={IconBagLight}
                              className='w-3 h-3 md:w-4 md:h-4'
                              alt=''
                            />
                            <div>
                              <h1 className='font-normal md:text-xs text-[8px]'>Layanan</h1>
                              <div className='flex items-center gap-2'>
                                {item.company_service.length === 0
                                  ? 'Tidak Memiliki Service'
                                  : item.company_service.map((d, i) => {
                                      return (
                                        <h2
                                          className='gap-2 text-xs font-medium md:text-sm'
                                          key={i}>
                                          {d},
                                        </h2>
                                      );
                                    })}
                              </div>
                            </div>
                          </div>
                          <div className='flex items-center gap-2'>
                            <img
                              src={IconMoney}
                              className='w-3 h-3 md:w-4 md:h-4'
                              alt=''
                            />
                            <div>
                              <h1 className='font-normal md:text-xs text-[8px]'>Nominal Bidding</h1>
                              <h2 className='text-xs font-bold md:text-sm'>{CurrencyIDR(item.bidding_value)}</h2>
                            </div>
                          </div>
                        </div>

                        {/* {partnerCount === 0 && (
                                                <div className='flex items-center'>
                                                        <button
                                                            onClick={handleOpenPartner}
                                                            className='text-white px-5 w-[128px] py-2.5 rounded-lg border-2 border-cherry bg-cherry hover:bg-violet-900 lg:text-[16px] text-sm font-semibold'
                                                            type="button"
                                                        >
                                                            Pilih Partner
                                                        </button>
                                                </div>
                                                )}
                                                {partnerCount === 1 && (
                                                <div className='flex items-center space-y-2'>
                                                        <div className='flex flex-col items-start'>
                                                            <div className='flex gap-2'>
                                                                <img src={IconCheckGreen}/>
                                                                <h1 className='font-semibold text-[14px]'>Partner Terpilih</h1>
                                                            </div>
                                                            <button
                                                                onClick={handleOpenPilih}
                                                                className='text-white px-5 py-2.5 w-[128px] rounded-lg border-2 bg-primary hover:bg-teal-300 lg:text-[16px] text-sm font-semibold'
                                                                type="button"      
                                                            >
                                                                Batalkan
                                                            </button>
                                                        </div>
                                                </div>
                                                )} */}
                        {dataPartner.find((obj) => obj === item.idBidApp) ? (
                          <div className='flex items-center space-y-2'>
                            <div className='flex flex-col items-start'>
                              <div className='flex gap-2 items-center mb-2.5'>
                                <img
                                  src={IconCheckGreen}
                                  alt=''
                                  className='w-4 h-4 md:w-6 md:h-6'
                                />
                                <h1 className='font-semibold text-dark-3 text-[8px] md:text-sm'>Partner Terpilih</h1>
                              </div>
                              <button
                                // onClick={handleOpenPilih}
                                onClick={() => {
                                  handleOpenPilih(item.idBidApp);
                                  setId(item.idBidApp);
                                }}
                                // onClick={() => batalkanPartner(item.id)}
                                className='text-white md:px-4 px-2.5 py-0.5 md:py-2 rounded-lg border-2 bg-primary hover:bg-teal-300 md:text-base text-xxs font-semibold'
                                type='button'>
                                Batalkan
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className='flex items-center'>
                            <button
                              onClick={() => {
                                handleOpenPartner(item.idBidApp);
                                setId(item.idBidApp);
                              }}
                              className='text-white md:px-4 px-2.5 py-0.5 md:py-2 rounded-lg border-2 border-cherry bg-cherry hover:bg-violet-900 md:text-base text-xxs font-semibold'
                              type='button'>
                              Pilih Partner
                            </button>
                          </div>
                        )}
                      </div>
                      {/* Detail Layanan */}
                      <div className='pt-[15px]'>
                        <button
                          onClick={() => handleOpen(item.company_id)}
                          className='font-medium border-b-2 text-primary hover:text-teal-300 md:text-sm text-xxs border-b-primary'>
                          Lihat Detail Partner
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          open={addPartner}
          onClose={handleClosePartner}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}>
          <Fade in={addPartner}>
            <Box sx={stylePatner}>
              <div className='flex items-start justify-end'>
                <button
                  onClick={handleClosePartner}
                  className='hover:text-dark-3'>
                  <Close />
                </button>
              </div>
              <div className='my-5 space-y-4'>
                <div className='flex flex-col items-center justify-center'>
                  <img
                    src={IconSucces}
                    alt=''
                    className='md:w-[95px] md:h-[95px] w-[62px] h-[62px]'
                  />
                  <h1 className='text-sm font-medium text-center text-black md:text-base'>
                    Anda yakin memilih <span className='font-bold'>{companyDetail.name}</span> sebagai Partner
                    Rekomendasi?
                  </h1>
                  <p className='text-sm font-normal text-dark-4'>Pastikan dahulu partner yang akan anda pilih </p>
                </div>
                <div className='flex flex-row justify-center gap-3 mt-10'>
                  <button
                    className='px-2 py-1 ml-2 text-xs font-semibold bg-gray-300 border rounded-md md:px-4 md:py-2 md:text-base text-cherry hover:text-white hover:bg-cherry/50'
                    onClick={handleClosePartner}>
                    Tidak, Periksa ulang partner
                  </button>
                  <button
                    className='px-2 py-1 ml-2 text-xs font-semibold text-white rounded-md md:px-4 md:py-2 md:text-base bg-cherry hover:bg-cherry/50'
                    onClick={() => submitOpenPartner(id)}>
                    Ya, Pilih partner
                  </button>
                </div>
              </div>
            </Box>
          </Fade>
        </Modal>

        <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          open={pilihPartner}
          onClose={handleClosePilih}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}>
          <Fade in={pilihPartner}>
            <Box sx={stylePatner}>
              <div className='flex items-start justify-end'>
                <button
                  onClick={handleClosePilih}
                  className='hover:text-dark-3'>
                  <Close />
                </button>
              </div>
              <div className='my-5 space-y-4'>
                <div className='flex flex-col items-center justify-center'>
                  <img
                    src={IconCancel}
                    className='md:w-[95px] md:h-[95px] w-[62px] h-[62px]'
                    alt=''
                  />
                  <h1 className='text-sm font-medium text-center text-black md:text-base'>
                    Batalkan memilih <label className='font-bold'>{companyDetail.name}</label> sebagai Partner
                    Rekomendasi?
                  </h1>
                </div>
                <div className='flex flex-row justify-center gap-3 mt-10'>
                  <button
                    className='px-2 py-1 ml-2 text-xs font-semibold bg-gray-300 border rounded-md md:px-4 md:py-2 md:text-base text-cherry hover:text-white hover:bg-cherry/50'
                    onClick={handleClosePilih}>
                    Tidak, Periksa ulang partner
                  </button>
                  <button
                    className='px-2 py-1 ml-2 text-xs font-semibold text-white rounded-md md:px-4 md:py-2 md:text-base bg-cherry hover:bg-cherry/50'
                    // onClick={batalkanPartner}
                    onClick={() => batalkanPartner(id)}>
                    Ya, Batalkan
                  </button>
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
          sx={modalWrapper}>
          {/* Start */}
          <Fade in={open}>
            <Box sx={modalBlock}>
              <Box sx={modalContentStyle}>
                <div className='flex items-start justify-between'>
                  <div>
                    <h2 className='font-semibold text-black'>Detail Partner</h2>
                  </div>
                  <button
                    onClick={handleClose}
                    className='hover:text-dark-3'>
                    <Close />
                  </button>
                </div>
                <div className='my-5 space-y-2.5'>
                  <h1 className='font-semibold text-[28px]'>{companyDetail.name}</h1>
                  <p className='font-normal text-[16px]'>{companyDetail.description}</p>
                  <div className='grid lg:grid-cols-12 grid-cols-6 space-y-3 pt-[20px]'>
                    <div className='col-span-6 lg:col-span-6'>
                      <h1 className='text-[16px] font-normal text-[#64748B]'>Badan Usaha</h1>
                      <h1 className='text-[16px] font-normal'>
                        {companyDetail.type !== null ? companyDetail.type : '-'}
                      </h1>
                    </div>
                    <div className='col-span-6 lg:col-span-6'>
                      <h1 className='text-[16px] font-normal text-[#64748B]'>Jenis Badan Usaha</h1>
                      <h1 className='text-[16px] font-normal'>{typeBusiness !== '' ? typeBusiness : '-'}</h1>
                    </div>
                    <div className='col-span-6 lg:col-span-12'>
                      <h1 className='text-[16px] font-normal text-[#64748B]'>Jenis SIUP</h1>
                      <div className='text-[14px] text-center font-normal px-2 py-2 border-black rounded-2xl border-2 w-24'>
                        {typeSiup !== '' ? typeSiup : '-'}
                      </div>
                    </div>
                    <div className='col-span-6 lg:col-span-6'>
                      <h1 className='text-[16px] font-normal text-[#64748B]'>Email Aktif</h1>
                      <h1 className='text-[16px] font-normal'>{companyDetail.email}</h1>
                    </div>
                    <div className='col-span-6 lg:col-span-6'>
                      <h1 className='text-[16px] font-normal text-[#64748B]'>No. Telp</h1>
                      <h1 className='text-[16px] font-normal'>{companyDetail.phone}</h1>
                    </div>
                    <div className='col-span-6 lg:col-span-6'>
                      <h1 className='text-[16px] font-normal text-[#64748B]'>Kabupaten/Kota</h1>
                      <h1 className='text-[16px] font-normal'>{companyDetail.city}</h1>
                    </div>
                    <div className='col-span-6 lg:col-span-6'>
                      <h1 className='text-[16px] font-normal text-[#64748B]'>Provinsi</h1>
                      <h1 className='text-[16px] font-normal'>
                        {companyDetail.province !== null ? companyDetail.province : '-'}
                      </h1>
                    </div>
                    <div className='col-span-6 lg:col-span-12'>
                      <h1 className='text-[16px] font-normal text-[#64748B]'>Kode Pos</h1>
                      <h1 className='text-[16px] font-normal'>
                        {companyDetail.postal_code !== null ? companyDetail.postal_code : '-'}
                      </h1>
                    </div>
                    <div className='col-span-6 lg:col-span-12'>
                      <h1 className='text-[16px] font-normal text-[#64748B]'>Alamat</h1>
                      <h1 className='text-[16px] font-normal'>{companyDetail.address}</h1>
                    </div>
                  </div>
                  <div className='border-b-2 pt-[20px]'></div>
                  <h1 className='text-[16px] font-normal text-[#64748B]'>Dokumen</h1>
                  <div className='grid lg:grid-cols-12 grid-cols-6 lg:space-y-0 space-y-3 lg:gap-3 gap-0 pt-[20px]'>
                    {Object.values(companyDetailDoc).map((data, index) => {
                      return (
                        <div
                          className='col-span-3 lg:col-span-3'
                          key={index}>
                          <a
                            href={imageHandle(data.path)}
                            download
                            target='_blank'
                            className='bg-gray-200 rounded-[12px] px-5 py-2 flex justify-center'>
                            <h1 className='text-[13px] font-medium text-primary'>{data.type}</h1>
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
                        <h1 className='text-[14px] font-normal'>
                          {companyDetail.website_type !== null ? companyDetail.website_type : 'Website'}
                        </h1>
                        <h1 className='text-[14px] font-normal'>
                          : {companyDetail.website_url !== null ? companyDetail.website_url : '-'}
                        </h1>
                      </div>
                      <h1 className='text-[14px] font-normal text-[#64748B]'>Marketplace /Toko Online</h1>
                      <div className='flex gap-10'>
                        <h1 className='text-[14px] font-normal'>
                          {companyDetail.marketplace_type !== null ? companyDetail.marketplace_type : 'Marketplace'}
                        </h1>
                        <h1 className='text-[14px] font-normal'>
                          : {companyDetail.marketplace_url !== null ? companyDetail.marketplace_url : '-'}
                        </h1>
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
          open={submitPartner}
          onClose={handlesCloseSubmit}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}>
          <Fade in={submitPartner}>
            <Box sx={stylePatner}>
              <div className='flex items-start justify-end'>
                <button
                  onClick={handlesCloseSubmit}
                  className='hover:text-dark-3'>
                  <Close />
                </button>
              </div>
              <div className='my-5 space-y-5'>
                <div className='flex flex-col items-center justify-center'>
                  <img
                    src={vectorSubmitPartner}
                    className='md:w-[262px] md:h-[180px] w-[92px] h-16 mb-6 md:mb-0'
                    alt=''
                  />
                  <h1 className='text-sm font-medium text-center text-black md:text-base'>
                    Anda yakin untuk submit rekomendasi partner ?
                  </h1>
                  <p className='text-sm font-normal text-center text-dark-4'>
                    Setelah submit rekomendasi partner, anda tidak dapat mengganti partner yang anda pilih.
                  </p>
                </div>
                <div className='flex flex-row justify-center gap-3 mt-10'>
                  <button
                    className='px-2 py-1 ml-2 text-xs font-semibold bg-gray-300 border rounded-md md:px-4 md:py-2 md:text-base text-cherry hover:text-white hover:bg-cherry/50'
                    onClick={handlesCloseSubmit}>
                    Periksa ulang partner
                  </button>
                  <button
                    className='px-2 py-1 ml-2 text-xs font-semibold text-white rounded-md md:px-4 md:py-2 md:text-base bg-cherry hover:bg-cherry/50'
                    onClick={() => {
                      postDataTender();
                      handleSubmit();
                    }}>
                    Submit
                  </button>
                </div>
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default DetailPartnerOpenTender;
