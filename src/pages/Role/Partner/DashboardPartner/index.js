import { Close } from '@mui/icons-material';
import { Backdrop, Box, Fade, Modal } from '@mui/material';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import ReactPaginate from 'react-paginate';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Api from '../../../../Api';
import {
  EventEmptyVector,
  IconBagCherry,
  IconBagPrimary,
  IconBagPurple,
  IconBagYellow,
  IconBidding,
  IconBiddingColor,
  IconDollar,
  IconDollarColor,
  IconEdit,
  IconEye,
  IconEyeSlash,
  IconLayananColor,
  IconNext,
  IconServiceEO,
  IconServiceEOWhite,
  IconServiceSupplier,
  IconServiceSupplierWhite,
  IconServiceTalent,
  IconServiceTalentCherry,
  IconServiceTalentWhite,
  IconServiceVenue,
  IconServiceVenueWhite,
  IconSupplierCherry,
  IconUploadImageGray,
  IconVenueCherry,
  LogoDefault,
  ServiceEmptyVector,
  TalentEmptyVector,
  VenueEmptyVector,
} from '../../../../assets';
import { CardHeaderPartner, CardLayanan, Navbar } from '../../../../component';
import imageHandle from '../../../../utils/imageHandle';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'white',
  boxShadow: 24,
  p: 3,
  borderRadius: '8px', // Updated property name to use camel case
  maxHeight: '80vh', // Added maximum height to allow for scrolling on smaller screens
  overflowY: 'auto', // Added overflow Y to allow for scrolling on smaller screens
};

const DashboardPartner = () => {
  const navigate = useNavigate();
  const [typePassword, setTypePassword] = useState('password');
  const [open, setOpen] = useState(false);
  const [refreshData, setRefreshData] = useState(false);

  const [serviceActive, setServiceActive] = useState('');
  const [service, setService] = useState('');
  const [subRole, setSubRole] = useState('');
  const [serviceRole, setserviceRole] = useState('');

  const [user, setUser] = useState('');
  const [userById, setUserById] = useState('');
  const [userByIdRole, setUserByIdRole] = useState('');
  const [subUser, setSubUser] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userCompany, setUserCompany] = useState('');

  const [staticPartner, setStaticPartner] = useState('');
  const [staticEo, setStaticEo] = useState('');
  const [staticVenue, setStaticVenue] = useState('');
  const [staticTalent, setStaticTalent] = useState('');
  const [staticSupplier, setStaticSupplier] = useState('');

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);

  const [dataTalent, setDataTalent] = useState('');
  const [dataTalentPage, setDataTalentPage] = useState('');
  const [dataEO, setDataEO] = useState('');
  const [dataEOPage, setDataEOPage] = useState('');
  const [dataVenue, setDataVenue] = useState('');
  const [dataVenuePage, setDataVenuePage] = useState('');

  const [dataSupplier, setDataSupplier] = useState([]);
  const [dataSupplierPage, setDataSupplierPage] = useState([]);

  const [image, setImage] = useState('');
  const [uploadImage, setUploadImage] = useState('');
  const [fullname, setFullname] = useState('');
  const [position, setPosition] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [activeChart, setActiveChart] = useState(1);
  const [selectedServiceRoles, setSelectedServiceRoles] = useState([]);
  const [isVerified, setIsVerified] = useState('');
  const [partnerId, setPartnerId] = useState('');

  const handleTypePassword = () => {
    if (typePassword === 'password') {
      setTypePassword('text');
    } else {
      setTypePassword('password');
    }
  };

  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  const handleChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setUploadImage(reader.result);
    };
  };

  const postLayanan = async () => {
    if (serviceRole === '') {
      toast.error(`Service role tidak boleh kosong`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        style: {
          fontSize: 12,
        },
      });
    }
    if (uploadImage === '') {
      toast.error(`Image tidak boleh kosong`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        style: {
          fontSize: 12,
        },
      });
    }
    if (fullname === '') {
      toast.error(`Nama Admin tidak boleh kosong`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        style: {
          fontSize: 12,
        },
      });
    }
    if (position === '') {
      toast.error(`Posisi Di Perusahaan tidak boleh kosong`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        style: {
          fontSize: 12,
        },
      });
    }
    if (username === '') {
      toast.error(`Username tidak boleh kosong`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        style: {
          fontSize: 12,
        },
      });
    }
    if (phone === '') {
      toast.error(`SerNomor Telepon tidak boleh kosong`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        style: {
          fontSize: 12,
        },
      });
    }
    if (email === '') {
      toast.error(`Email tidak boleh kosong`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        style: {
          fontSize: 12,
        },
      });
    }
    if (password === '') {
      toast.error(`Password tidak boleh kosong`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        style: {
          fontSize: 12,
        },
      });
    }
    if (!isValidEmail(email)) {
      toast.error(`Email tidak valid`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        style: {
          fontSize: 12,
        },
      });
    } else {
      try {
        const data = {
          roleId: serviceRole,
          image: uploadImage,
          fullname: fullname,
          position: position,
          username: username,
          phone: phone,
          email: email,
          password: password,
        };
        const response = await Api.postService(localStorage.getItem('token-hub'), data);
        handleClose();
        setserviceRole(null);
        setUploadImage(null);
        setFullname(null);
        setPosition(null);
        setUsername(null);
        setPhone(null);
        setEmail(null);
        setPassword(null);
        setRefreshData(true);
      } catch (error) {
        if (error.response.data.middleware_validation[0].msg === 'Length Phone must be 10 - 13 Number !') {
          toast.error(`Nomor Hp setidaknya memiliki 10 - 13 nomor`, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            style: {
              fontSize: 12,
            },
          });
        } else {
          toast.error(`Layanan sudah dibuat atau email sudah di gunakan`, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            style: {
              fontSize: 12,
            },
          });
        }
      }
    }
  };

  const [barDetail, setBarDetail] = useState('');
  const [card, setCard] = useState('');
  const getLayanan = async () => {
    try {
      const resDataService = await Api.getDataService(localStorage.getItem('token-hub'));
      const resSubRole = await Api.GetSubRole();
      const resUser = await Api.getUser(localStorage.getItem('token-hub'));
      const resStatistic = await Api.getStatistic(localStorage.getItem('token-hub'));
      const resBar = await Api.PartnerGetTransaction(localStorage.getItem('token-hub'));
      setBarDetail(resBar.data.selling_report_monthly);
      setCard(resBar.data.card_report);
      setStaticPartner(resStatistic.data.data);
      setUser(resUser.data.admin);
      setSubUser(resUser.data.notadmin);
      setUserRole(resUser.data.admin.role);
      setUserCompany(resUser.data.admin.company);
      setSubRole(resSubRole.data);
      setService(resDataService.data);
      setIsVerified(resUser.data.admin.company.is_verified_company);
      const selectedServiceRole = resDataService.data.map((data) => data.role.name);
      setSelectedServiceRoles(selectedServiceRole);
      setPartnerId(resUser.data.admin.id);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlePageClickVenue = () => {
    setPage(page + 1);
  };

  const handleService = async (e, id) => {
    if (e === 'Event Organizer') {
      setServiceActive(e);
      try {
        const response = await Api.getUserByID(localStorage.getItem('token-hub'), id);
        const resDataEo = await Api.getEoWithLogin(localStorage.getItem('token-hub'), page, limit);
        const resStaticEo = await Api.getStatisticEO(localStorage.getItem('token-hub'));
        setStaticEo(resStaticEo.data.data);
        setUserById(response.data);
        setUserByIdRole(response.data.role);
        setDataEO(resDataEo.data.data);
        setDataEOPage(resDataEo.data);
      } catch (error) {
        console.log(error.message);
      }
    } else if (e === 'Venue') {
      setServiceActive(e);
      try {
        const resDataVenue = await Api.getVenueWithLogin(localStorage.getItem('token-hub'), page, limit);
        const response = await Api.getUserByID(localStorage.getItem('token-hub'), id);
        const resStaticVenue = await Api.getStatisticVenue(localStorage.getItem('token-hub'));
        setStaticVenue(resStaticVenue.data.data);
        setUserById(response.data);
        setUserByIdRole(response.data.role);
        setDataVenue(resDataVenue.data.data);
        setDataVenuePage(resDataVenue.data);
      } catch (error) {
        console.log(error.message);
      }
    } else if (e === 'Talent') {
      setServiceActive(e);
      try {
        const response = await Api.getUserByID(localStorage.getItem('token-hub'), id);
        const resStaticTalent = await Api.getStatisticTalent(localStorage.getItem('token-hub'));
        const resDataTalent = await Api.getTalentWithLogin(localStorage.getItem('token-hub'));
        setDataTalent(resDataTalent.data.data);
        setDataTalentPage(resDataTalent.data);
        setStaticTalent(resStaticTalent.data.data);
        setUserById(response.data);
        setUserByIdRole(response.data.role);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      setServiceActive(e);
      try {
        const response = await Api.getUserByID(localStorage.getItem('token-hub'), id);
        const resStaticSupplier = await Api.getStatisticSupplier(localStorage.getItem('token-hub'));
        const resDataSupplier = await Api.getSupplier(localStorage.getItem('token-hub'), page, limit);
        setUserById(response.data);
        setUserByIdRole(response.data.role);
        setStaticSupplier(resStaticSupplier.data.data);
        setDataSupplier(resDataSupplier.data.data);
        setDataSupplierPage(resDataSupplier.data);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  // chart eo
  const omsetEo = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        fill: true,
        label: '',
        data: [
          barDetail.January?.countEventOrganizer,
          barDetail.February?.countEventOrganizer,
          barDetail.March?.countEventOrganizer,
          barDetail.April?.countEventOrganizer,
          barDetail.May?.countEventOrganizer,
          barDetail.June?.countEventOrganizer,
          barDetail.July?.countEventOrganizer,
          barDetail.August?.countEventOrganizer,
          barDetail.September?.countEventOrganizer,
          barDetail.October?.countEventOrganizer,
          barDetail.November?.countEventOrganizer,
          barDetail.December?.countEventOrganizer,
        ],
        borderColor: '#00CDB4',
        backgroundColor: '#00CDB4',
      },
    ],
  };

  // chart Venue
  const omsetVenue = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        fill: true,
        label: '',
        data: [
          barDetail.January?.countVenue,
          barDetail.February?.countVenue,
          barDetail.March?.countVenue,
          barDetail.April?.countVenue,
          barDetail.May?.countVenue,
          barDetail.June?.countVenue,
          barDetail.July?.countVenue,
          barDetail.August?.countVenue,
          barDetail.September?.countVenue,
          barDetail.October?.countVenue,
          barDetail.November?.countVenue,
          barDetail.December?.countVenue,
        ],
        borderColor: '#00CDB4',
        backgroundColor: '#00CDB4',
      },
    ],
  };

  // chart supplier
  const omsetSupplier = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        fill: true,
        label: '',
        data: [
          barDetail.January?.countSupplier,
          barDetail.February?.countSupplier,
          barDetail.March?.countSupplier,
          barDetail.April?.countSupplier,
          barDetail.May?.countSupplier,
          barDetail.June?.countSupplier,
          barDetail.July?.countSupplier,
          barDetail.August?.countSupplier,
          barDetail.September?.countSupplier,
          barDetail.October?.countSupplier,
          barDetail.November?.countSupplier,
          barDetail.December?.countSupplier,
        ],
        borderColor: '#00CDB4',
        backgroundColor: '#00CDB4',
      },
    ],
  };

  // chart talent
  const omsetTalent = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        fill: true,
        label: '',
        data: [
          barDetail.January?.countTalent,
          barDetail.February?.countTalent,
          barDetail.March?.countTalent,
          barDetail.April?.countTalent,
          barDetail.May?.countTalent,
          barDetail.June?.countTalent,
          barDetail.July?.countTalent,
          barDetail.August?.countTalent,
          barDetail.September?.countTalent,
          barDetail.October?.countTalent,
          barDetail.November?.countTalent,
          barDetail.December?.countTalent,
        ],
        borderColor: '#00CDB4',
        backgroundColor: '#00CDB4',
      },
    ],
  };

  console.log({ userById });

  const handleSelectChange = (value) => {
    setserviceRole(value);
  };

  useEffect(() => {
    getLayanan();
    setRefreshData(false);
  }, [refreshData]);

  return (
    <div className='bg-[#E3E8F1] min-h-screen'>
      <Navbar />
      <div className='md:px-[75px] px-[10px] pt-[120px] pb-[10px] md:pt-[140px] md:pb-[30px] mb-10'>
        <div className='flex items-center gap-3'>
          <Link
            to={''}
            className='text-black-k text-xs lg:text-sm font-[500] hover:text-primary'>
            Beranda
          </Link>
          <img
            src={IconNext}
            alt=''
          />
          <Link
            to={''}
            className='text-black-k text-xs lg:text-sm font-[500] hover:text-primary'>
            Profil
          </Link>
        </div>
        {/* Section 1 */}
        <div className='bg-white mt-[30px] px-[20px] md:px-[40px] md:py-[30px] py-4 rounded-xl'>
          <div className='flex flex-col justify-between mt-5 md:flex-row md:items-center md:gap-7'>
            <div className='flex items-center gap-7'>
              <img
                src={!user.image ? LogoDefault : imageHandle(user.image)}
                className='w-[61px] h-[61px] rounded-full object-cover'
                alt=''
              />
              <div>
                <h1 className='font-semibold text-black-k md:text-xl'>{user.fullname}</h1>
                <div className='flex items-center gap-5 mt-2'>
                  <h1 className='font-medium md:text-base text-[10px] text-dark-5'>{userRole.name}</h1>
                  {isVerified === true ? (
                    <div className='rounded-[4px] bg-green-2 py-[6px] px-[10px]'>
                      <h1 className='text-white text-[8px] md:text-[10px]'>Terverifikasi</h1>
                    </div>
                  ) : (
                    <div className='rounded-[4px] bg-light-gray py-[6px] px-[10px]'>
                      <h1 className='text-white text-[8px] md:text-[10px]'>Belum Terverifikasi</h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='mt-7 md:mt-0'>
              <Link
                to={'/dekorasi-toko'}
                className='px-[20px] py-[10px] border border-cherry rounded-[12px] text-xs font-semibold text-cherry'
                state={{ partnerId }}>
                Dekorasi Toko
              </Link>
            </div>
          </div>
          {isVerified === false && (
            <div>
              <h1 className='text-dark-4 font-[500] text-xs md:text-sm md:w-3/5 mt-[30px]'>
                Akun partner anda belum terverifikasi, anda belum dapat membuat tender ataupun melakukan bidding. Untuk
                memverifikasi akun partner anda,{' '}
                <span className='text-[#BE0000] underline underline-offset-4'>
                  <button onClick={() => navigate('/company-porifle-partner', { state: { id: userCompany.id } })}>
                    Lengkapi data akun.
                  </button>
                </span>
              </h1>
            </div>
          )}
          {/* Card Header */}
          <div className='mt-[30px] flex items-center  overflow-x-auto gap-8 scrollbar-hide'>
            <CardHeaderPartner
              icon={IconLayananColor}
              cardtTitle={'Total Layanan'}
              countItem={staticPartner.total_layanan + ' ' + 'Layanan'}
              colorItem={'#454545'}
            />
            <CardHeaderPartner
              icon={
                !userCompany.name ||
                !userCompany.decription ||
                !userCompany.email ||
                !userCompany.phone ||
                !userCompany.type ||  
                !userCompany.city ||
                !userCompany.province ||
                !userCompany.postal_code ||
                !userCompany.address ||
                !userCompany.pic_name ||
                !userCompany.website_url ||
                !userCompany.website_type ||
                !userCompany.marketplace_url ||
                !userCompany.marketplace_type
                  ? IconDollar
                  : IconDollarColor
              }
              cardtTitle={'Total Transaksi'}
              countItem={staticPartner.total_transaction + ' ' + 'Transaksi'}
              linkRiwayat={staticPartner.total_transaction > 0 ? '/riwayat-transaksi' : null}
              params={partnerId}
            />
            {/* <CardHeaderPartner
                            icon={
                                !userCompany.name || !userCompany.decription || !userCompany.email || !userCompany.phone || !userCompany.type || !userCompany.city || !userCompany.province || !userCompany.postal_code || !userCompany.address || !userCompany.pic_name || !userCompany.website_url || !userCompany.website_type || !userCompany.marketplace_url || !userCompany.marketplace_type ?
                                    IconOpenTender
                                    :
                                    IconOpenTenderColor
                            }
                            cardtTitle={'Open Tender'}
                            countItem={'0 Tender'}
                            linkRiwayat={'#'}
                        /> */}
            <CardHeaderPartner
              icon={
                !userCompany.name ||
                !userCompany.decription ||
                !userCompany.email ||
                !userCompany.phone ||
                !userCompany.type ||
                !userCompany.city ||
                !userCompany.province ||
                !userCompany.postal_code ||
                !userCompany.address ||
                !userCompany.pic_name ||
                !userCompany.website_url ||
                !userCompany.website_type ||
                !userCompany.marketplace_url ||
                !userCompany.marketplace_type
                  ? IconBidding
                  : IconBiddingColor
              }
              cardtTitle={'Bidding'}
              countItem={staticPartner.total_bid + ' ' + 'Bidder'}
              linkRiwayat={staticPartner.total_bid > 0 ? '/riwayat-bidding' : null}
            />
          </div>
        </div>

        {/* Chart Table */}
        <div className='w-full lg:h-[520px] md:h-full h-full bg-white rounded-xl lg:space-y-5 mt-[30px] '>
          <div className='lg:h-10 h-full w-full md:px-[46px] md:py-[48px] p-4 md:p-0 flex lg:flex-row flex-col lg:justify-between lg:items-center border-b-2'>
            <div>
              <h1 className='text-black font-semibold text-[13px] md:text-[20px]'>Repoting Penjualan</h1>
            </div>
            <div>
              <div className='flex overflow-x-auto items-center gap-3 md:gap-[28px] scrollbar-hide md:py-0 py-4'>
                <button
                  key={1}
                  className={`${
                    activeChart === 1 ? 'bg-primary text-white' : 'bg-dark-8 text-dark-6'
                  } py-[10px] px-[20px] rounded-[12px] flex items-center gap-[13px] text-xs md:text-base truncate flex-shrink-0 lg:w-auto w-max flex-shrink-0`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveChart(1);
                  }}>
                  <img
                    src={activeChart === 1 ? IconServiceEOWhite : IconServiceEO}
                    alt=''
                  />
                  Event Organizer
                </button>

                <button
                  key={2}
                  className={`${
                    activeChart === 2 ? 'bg-primary text-white' : 'bg-dark-8 text-dark-6'
                  } py-[10px] px-[20px] rounded-[12px] flex items-center gap-[13px] text-xs md:text-base truncate flex-shrink-0 lg:w-auto w-max flex-shrink-0`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveChart(2);
                  }}>
                  <img
                    src={activeChart === 2 ? IconServiceVenueWhite : IconServiceVenue}
                    alt=''
                  />
                  Venue
                </button>
                <button
                  key={3}
                  className={`${
                    activeChart === 3 ? 'bg-primary text-white' : 'bg-dark-8 text-dark-6'
                  } py-[10px] px-[20px] rounded-[12px] flex items-center gap-[13px] text-xs md:text-base truncate flex-shrink-0 lg:w-auto w-max flex-shrink-0`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveChart(3);
                  }}>
                  <img
                    src={activeChart === 3 ? IconServiceSupplierWhite : IconServiceSupplier}
                    alt=''
                  />
                  Supplier
                </button>
                <button
                  key={4}
                  className={`${
                    activeChart === 4 ? 'bg-primary text-white' : 'bg-dark-8 text-dark-6'
                  } py-[10px] px-[20px] rounded-[12px] flex items-center gap-[13px] text-xs md:text-base truncate flex-shrink-0 lg:w-auto w-max flex-shrink-0`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveChart(4);
                  }}>
                  <img
                    src={activeChart === 4 ? IconServiceTalentWhite : IconServiceTalent}
                    alt=''
                  />
                  Talent
                </button>
              </div>
            </div>
          </div>

          <div className={activeChart === 1 ? 'block' : 'hidden'}>
            <div className='h-[350px] py-[27px] md:px-[46px] px-[10px]'>
              <Bar
                options={{
                  plugins: {
                    title: {
                      display: false,
                    },
                  },
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      stacked: true,
                    },
                    y: {
                      stacked: true,
                      beginAtZero: true,
                      ticks: {
                        precision: 0,
                      },
                    },
                  },
                }}
                data={omsetEo}
              />
            </div>
          </div>
          <div className={activeChart === 2 ? 'block' : 'hidden'}>
            <div className='h-[350px] py-[27px] md:px-[46px] px-[10px]'>
              <Bar
                options={{
                  plugins: {
                    title: {
                      display: false,
                    },
                  },
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      stacked: true,
                    },
                    y: {
                      stacked: true,
                      beginAtZero: true,
                      ticks: {
                        precision: 0,
                      },
                    },
                  },
                }}
                data={omsetVenue}
              />
            </div>
          </div>
          <div className={activeChart === 3 ? 'block' : 'hidden'}>
            <div className='h-[350px] py-[27px] md:px-[46px] px-[10px]'>
              <Bar
                options={{
                  plugins: {
                    title: {
                      display: false,
                    },
                  },
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      stacked: true,
                    },
                    y: {
                      stacked: true,
                      beginAtZero: true,
                      ticks: {
                        precision: 0,
                      },
                    },
                  },
                }}
                data={omsetSupplier}
              />
            </div>
          </div>
          <div className={activeChart === 4 ? 'block' : 'hidden'}>
            <div className='h-[350px] py-[27px] md:px-[46px] px-[10px]'>
              <Bar
                options={{
                  plugins: {
                    title: {
                      display: false,
                    },
                  },
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      stacked: true,
                    },
                    y: {
                      stacked: true,
                      beginAtZero: true,
                      ticks: {
                        precision: 0,
                      },
                    },
                  },
                }}
                data={omsetTalent}
              />
            </div>
          </div>
        </div>

        <div className='bg-white mt-[30px] px-[20px] md:px-[40px] py-[30px] rounded-xl'>
          <h1 className='text-xs font-medium md:text-sm text-dark-5'>Tentang Perusahaan</h1>
          <div className='flex flex-col md:flex-row md:items-center justify-between md:gap-7 mt-[34px]'>
            <div className='flex items-center gap-7'>
              <img
                src={!userCompany.company_logo ? LogoDefault : imageHandle(userCompany.company_logo)}
                className='w-[61px] h-[61px] rounded-full object-cover'
                alt=''
              />
              <div>
                <h1 className='text-black-k font-semibold md:text-xl text-[13px] capitalize'>{userCompany.name}</h1>
                <div className='flex items-center gap-5 mt-2'>
                  <h1 className='text-xs text-dark-5'>
                    Bergabung sejak {moment(userCompany.createdAt).format('DD/MM/YYYY')}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-[24px]'>
            <h1 className='text-xs font-medium text-cherry-2 md:text-sm'>Deskripsi</h1>
            <h1 className='text-neutural text-xs md:text-sm font-[500] mt-[4px]'>{userCompany.description}</h1>
            <button
              className='text-[#2E3A44] bg-white md:py-3 md:px-6 px-[14px] py-2 rounded-[6px] md:rounded-md font-[500] text-sm mt-5 border border-cherry'
              onClick={() => navigate('/company-porifle-partner', { state: { id: userCompany.id } })}>
              Lihat Detail
            </button>
          </div>
        </div>

        <div className='flex flex-col md:flex-row items-start md:items-center md:justify-between md:mt-[60px] mt-[14px]'>
          <div>
            <h1 className='text-black-k font-[600] text-base md:text-[24px]'>Layanan</h1>
            <h1 className='text-dark-5 font-[500] text-xs md:text-sm'>{service.length} Jenis Layanan</h1>
          </div>
        </div>
        {service.length === 0 ? null : (
          <div className='flex flex-row items-center gap-3 md:gap-[28px] mt-[14px] md:mt-[30px] overflow-x-auto scrollbar-hide'>
            {Object.values(service).map((data, index) => {
              return (
                <button
                  key={index}
                  onClick={() => handleService(data.role.name, data.id)}
                  className={`${
                    serviceActive === data.role.name ? 'bg-primary text-white' : 'bg-dark-8 text-dark-6'
                  } py-[10px] px-[20px] rounded-[12px] flex items-center gap-[13px] text-xs md:text-base truncate flex-shrink-0`}>
                  <img
                    src={
                      data.role.name === 'Event Organizer'
                        ? serviceActive === data.role.name
                          ? IconServiceEOWhite
                          : IconServiceEO
                        : data.role.name === 'Supplier'
                        ? serviceActive === data.role.name
                          ? IconServiceSupplierWhite
                          : IconServiceSupplier
                        : data.role.name === 'Talent'
                        ? serviceActive === data.role.name
                          ? IconServiceTalentWhite
                          : IconServiceTalent
                        : data.role.name === 'Venue'
                        ? serviceActive === data.role.name
                          ? IconServiceVenueWhite
                          : IconServiceVenue
                        : null
                    }
                    className='w-[14px] h-[14px] md:w-6 md:h-6'
                    alt=''
                  />
                  {data.role.name}
                </button>
              );
            })}
            <button
              onClick={handleOpen}
              className={`flex items-center gap-2 flex-shrink-0 ${
                service.length >= 1 ? 'text-[#A8A8A8]' : 'text-cherry'
              }`}
              disabled={service.length >= 4 ? true : false}>
              + Tambah Jenis Layanan
            </button>
          </div>
        )}

        {/* Section 3 */}
        <div className='bg-white mt-[30px] px-1 md:px-[40px] py-4 rounded-xl'>
          {service.length === 0 ? (
            <div className='flex flex-col items-center justify-center w-full h-screen'>
              <img
                src={ServiceEmptyVector}
                alt=''
              />
              <button
                className='bg-[#00CDB4] rounded-[12px] p-[12px] text-white mt-[45px]'
                onClick={handleOpen}>
                + Tambah Jenis Layanan
              </button>
            </div>
          ) : !serviceActive ? (
            <h1 className='w-full text-center'>Pilih Service Layanan Yang Anda Mau Lihat</h1>
          ) : serviceActive === 'Event Organizer' ? (
            <div className='md:py-[30px] py-4'>
              <div className='flex flex-col items-start px-4 md:flex-row md:items-center md:justify-between md:px-0'>
                <div>
                  <h1 className='text-[#454545] font-[600] text-base md:text-2xl'>Event Organizer</h1>
                </div>
                <div className='flex w-full gap-5 mt-5 md:mt-0 md:flex-row md:w-auto'>
                  {/* <button onClick={handleOpen} className='w-full md:w-[160px] h-[39px] rounded-md border-cherry border-2 text-cherry font-[500]'>Tambah Massal</button> */}
                  <Link
                    to={'/add-layanan-eo'}
                    className='md:w-[229px] md:h-[39px] md:py-0 md:px-0 py-2 px-[14px] rounded-md bg-cherry text-white flex items-center justify-center font-[500] md:text-sm text-xs'>
                    <h1>+ Tambah Layanan EO</h1>
                  </Link>
                </div>
              </div>
              <div className='bg-background-3 rounded-[12px] lg:h-[216px] md:py-[20px] md:px-[31px] px-2 py-[11px] mt-[32px]'>
                <div>
                  <h1 className='text-[#737373] text-sm font-[500]'>Admin {userByIdRole.name}</h1>
                  <div className='flex flex-col mt-5 md:flex-row md:items-center md:gap-7'>
                    <div className='flex items-center gap-7'>
                      <img
                        src={!userById.image ? LogoDefault : imageHandle(userById.image)}
                        className='w-[61px] h-[61px] rounded-full object-cover'
                        alt=''
                      />
                      <div>
                        <h1 className='font-semibold text-black-k md:text-xl'>{userById.fullname}</h1>
                        <h1 className='text-[#A8A8A8] text-xs'>
                          Bergabung sejak {moment(userById.createdAt).format('DD/MM/YYYY')}
                        </h1>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate('/detail-admin-supplier', { state: userById })}
                      className='text-[#2E3A44] bg-white py-3 px-6 rounded-xl md:rounded-md font-[500] text-sm mt-5 md:mt-0'>
                      Lihat Detail
                    </button>
                  </div>
                  <div className='mt-[17px] grid lg:grid-cols-4 grid-cols-2 items-center gap-[9px]'>
                    <div className='w-full bg-white rounded-[12px] px-[10px] py-[10px] flex items-center gap-1 md:gap-[16px]'>
                      <img
                        src={IconBagCherry}
                        className='w-5 md:w-auto'
                        alt=''
                      />
                      <h1 className='text-[#454545] font-bold text-sm md:text-[18px]'>{staticEo.total_eo}</h1>
                      <p className='text-[9px] md:text-[15px] text-[#454545] font-[500]'>Total EO</p>
                    </div>
                    <div className='w-full bg-white rounded-[12px] px-[10px] py-[10px] flex items-center gap-1 md:gap-[16px]'>
                      <img
                        src={IconBagPrimary}
                        className='w-5 md:w-auto'
                        alt=''
                      />
                      <h1 className='text-[#454545] font-bold text-sm md:text-[18px]'>{staticEo.total_eo_aktif}</h1>
                      <p className='text-[9px] md:text-[15px] text-[#454545] font-[500]'>Total EO Aktif</p>
                    </div>
                    <div className='w-full bg-white rounded-[12px] px-[10px] py-[10px] flex items-center gap-1 md:gap-[16px]'>
                      <img
                        src={IconBagYellow}
                        className='w-5 md:w-auto'
                        alt=''
                      />
                      <h1 className='text-[#454545] font-bold text-sm md:text-[18px]'>{staticEo.total_klien}</h1>
                      <p className='text-[9px] md:text-[15px] text-[#454545] font-[500]'>Total Klien</p>
                    </div>
                    <div className='w-full bg-white rounded-[12px] px-[10px] py-[10px] flex items-center gap-1 md:gap-[16px]'>
                      <img
                        src={IconBagPurple}
                        className='w-5 md:w-auto'
                        alt=''
                      />
                      <h1 className='text-[#454545] font-bold text-sm md:text-[18px]'>{staticEo.total_klien_aktif}</h1>
                      <p className='text-[9px] md:text-[15px] text-[#454545] font-[500]'>Total Klien Aktif</p>
                    </div>
                  </div>
                </div>
              </div>
              {dataEO.length === 0 ? (
                <div className='flex items-center justify-center h-screen'>
                  <img
                    src={EventEmptyVector}
                    alt=''
                  />
                </div>
              ) : (
                <div>
                  <div className='mt-[30px] flex flex-row flex-wrap items-center md:gap-3 gap-1'>
                    {Object.values(dataEO).map((data, index) => {
                      const formattedPrice =
                        data.package.length > 0
                          ? data.package[0].total_price.toLocaleString('id-ID', {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            })
                          : '0';
                      const priceWithoutRp = `${formattedPrice.replace(/^(\D+)/, '')}`;
                      return (
                        <CardLayanan
                          layanan={'eo'}
                          key={index}
                          image={!data.eo_image ? LogoDefault : imageHandle(data.eo_image)}
                          title={data.eo_name}
                          price={priceWithoutRp}
                          id={data.id}
                          active={data.status_active}
                        />
                      );
                    })}
                  </div>
                  {/* Pagination */}
                  <div className='flex items-center justify-center mt-[30px] gap-[5px]'>
                    <ReactPaginate
                      breakLabel={<span className='mr-4'>...</span>}
                      nextLabel={
                        <span className='flex items-center justify-center w-12 h-12 border-2 rounded-full hover:bg-cherry hover:text-white'>
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
                      // onPageChange={handlePageClick}
                      // pageRangeDisplayed={5}
                      pageCount={2}
                      previousLabel={
                        <span className='flex items-center justify-center w-12 h-12 border-2 rounded-full hover:bg-cherry hover:text-white'>
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
              )}
            </div>
          ) : serviceActive === 'Talent' ? (
            <div className='md:py-[30px] py-4'>
              <div className='flex flex-col items-start px-4 md:flex-row md:items-center md:justify-between md:px-0'>
                <div>
                  <h1 className='text-[#454545] font-[600] text-base md:text-2xl'>Talent</h1>
                </div>
                <div className='flex w-full gap-5 mt-5 md:mt-0 md:flex-row md:w-auto'>
                  {/* <button onClick={handleOpen} className='w-full md:w-[160px] h-[39px] rounded-md border-cherry border-2 text-cherry font-[500]'>Tambah Massal</button> */}
                  <Link
                    to={'/add-layanan-talent'}
                    className='md:w-[229px] md:h-[39px] md:py-0 md:px-0 py-2 px-[14px] rounded-md bg-cherry text-white flex items-center justify-center font-[500] md:text-sm text-xs'>
                    <h1>+ Tambah Layanan Talent</h1>
                  </Link>
                </div>
              </div>
              <div className='bg-background-3 rounded-[12px] lg:h-[216px] md:py-[20px] md:px-[31px] px-2 py-[11px] mt-[32px]'>
                <div>
                  <h1 className='text-[#737373] text-sm font-[500]'>Admin {userByIdRole.name}</h1>
                  <div className='flex flex-col mt-5 md:flex-row md:items-center md:gap-7'>
                    <div className='flex items-center gap-7'>
                      <img
                        src={!userById.image ? LogoDefault : imageHandle(userById.image)}
                        className='w-[61px] h-[61px] rounded-full object-cover'
                        alt=''
                      />
                      <div>
                        <h1 className='font-semibold text-black-k md:text-xl'>{userById.fullname}</h1>
                        <h1 className='text-[#A8A8A8] text-xs'>
                          Bergabung sejak {moment(userById.createdAt).format('DD/MM/YYYY')}
                        </h1>
                      </div>
                    </div>
                    <button
                      className='text-[#2E3A44] bg-white py-3 px-6 rounded-xl md:rounded-md font-[500] text-sm mt-5 md:mt-0'
                      onClick={() => navigate('/detail-admin-supplier', { state: { adminData: userById } })}>
                      Lihat Detail
                    </button>
                  </div>
                  <div className='mt-[17px] grid lg:grid-cols-4 grid-cols-2 items-center gap-[9px]'>
                    <div className='w-full bg-white rounded-[12px] px-[10px] py-[10px] flex items-center gap-1 md:gap-[16px]'>
                      <img
                        src={IconBagCherry}
                        className='w-5 md:w-auto'
                        alt=''
                      />
                      <h1 className='text-[#454545] font-bold text-sm md:text-[18px]'>{staticTalent.total_talent}</h1>
                      <p className='text-[9px] md:text-[15px] text-[#454545] font-[500]'>Total Talent</p>
                    </div>
                    <div className='w-full bg-white rounded-[12px] px-[10px] py-[10px] flex items-center gap-1 md:gap-[16px]'>
                      <img
                        src={IconBagPrimary}
                        className='w-5 md:w-auto'
                        alt=''
                      />
                      <h1 className='text-[#454545] font-bold text-sm md:text-[18px]'>
                        {staticTalent.total_talent_aktif}
                      </h1>
                      <p className='text-[9px] md:text-[15px] text-[#454545] font-[500]'>Total Talent Aktif</p>
                    </div>
                    <div className='w-full bg-white rounded-[12px] px-[10px] py-[10px] flex items-center gap-1 md:gap-[16px]'>
                      <img
                        src={IconBagYellow}
                        className='w-5 md:w-auto'
                        alt=''
                      />
                      <h1 className='text-[#454545] font-bold text-sm md:text-[18px]'>{staticTalent.total_klien}</h1>
                      <p className='text-[9px] md:text-[15px] text-[#454545] font-[500]'>Total Klien</p>
                    </div>
                    <div className='w-full bg-white rounded-[12px] px-[10px] py-[10px] flex items-center gap-1 md:gap-[16px]'>
                      <img
                        src={IconBagPurple}
                        className='w-5 md:w-auto'
                        alt=''
                      />
                      <h1 className='text-[#454545] font-bold text-sm md:text-[18px]'>
                        {staticTalent.total_klien_aktif}
                      </h1>
                      <p className='text-[9px] md:text-[15px] text-[#454545] font-[500]'>Total Klien Aktif</p>
                    </div>
                  </div>
                </div>
              </div>
              {dataTalent.length === 0 ? (
                <div className='flex items-center justify-center h-screen'>
                  <img
                    src={TalentEmptyVector}
                    alt=''
                  />
                </div>
              ) : (
                <div>
                  <div className='mt-[30px] flex flex-row flex-wrap items-center md:gap-3 gap-1'>
                    {Object.values(dataTalent).map((data, index) => {
                      const formattedPrice =
                        data.package.length > 0
                          ? data.package[0].total_price.toLocaleString('id-ID', {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            })
                          : '0';
                      const priceWithoutRp = `${formattedPrice.replace(/^(\D+)/, '')}`;
                      return (
                        <div className=''>
                          <CardLayanan
                            layanan={'talent'}
                            icon={IconServiceTalentCherry}
                            key={index}
                            image={!data.talent_image ? LogoDefault : imageHandle(data.talent_image)}
                            title={data.talent_name}
                            price={priceWithoutRp}
                            id={data.id}
                            active={data.status_active}
                          />
                        </div>
                      );
                    })}
                  </div>
                  {/* Pagination */}
                  <div className='flex items-center justify-center mt-[30px] gap-[5px]'>
                    <ReactPaginate
                      breakLabel={<span className='mr-4'>...</span>}
                      nextLabel={
                        <span className='flex items-center justify-center w-12 h-12 border-2 rounded-full hover:bg-cherry hover:text-white'>
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
                      onPageChange={handlePageClickVenue}
                      pageRangeDisplayed={limit}
                      pageCount={dataTalentPage.totalPages}
                      previousLabel={
                        <span className='flex items-center justify-center w-12 h-12 border-2 rounded-full hover:bg-cherry hover:text-white'>
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
              )}
            </div>
          ) : serviceActive === 'Supplier' ? (
            <div className='md:py-[30px] py-4'>
              <div className='flex flex-col items-start px-4 md:flex-row md:items-center md:justify-between md:px-0'>
                <div>
                  <h1 className='text-[#454545] font-[600] text-base md:text-2xl'>Supplier</h1>
                </div>
                <div className='flex w-full gap-5 mt-5 md:mt-0 md:flex-row md:w-auto'>
                  {/* <button onClick={handleOpen} className='w-full md:w-[160px] h-[39px] rounded-md border-cherry border-2 text-cherry font-[500]'>Tambah Massal</button> */}
                  <Link
                    to={'/add-supplier'}
                    className='md:w-[229px] md:h-[39px] md:py-0 md:px-0 py-2 px-[14px] rounded-md bg-cherry text-white flex items-center justify-center font-[500] md:text-sm text-xs'>
                    <h1>+ Tambah Layanan Supplier</h1>
                  </Link>
                </div>
              </div>
              <div className='bg-background-3 rounded-[12px] lg:h-[216px] md:py-[20px] md:px-[31px] px-2 py-[11px] mt-[32px]'>
                <div>
                  <h1 className='text-[#737373] text-sm font-[500]'>Admin {userByIdRole.name}</h1>
                  <div className='flex flex-col mt-5 md:flex-row md:items-center md:gap-7'>
                    <div className='flex items-center gap-7'>
                      <img
                        src={!userById.image ? LogoDefault : imageHandle(userById.image)}
                        className='w-[61px] h-[61px] rounded-full object-cover'
                        alt=''
                      />
                      <div>
                        <h1 className='font-semibold text-black-k md:text-xl'>{userById.fullname}</h1>
                        <h1 className='text-[#A8A8A8] text-xs'>
                          Bergabung sejak {moment(userById.createdAt).format('DD/MM/YYYY')}
                        </h1>
                      </div>
                    </div>
                    <button className='text-[#2E3A44] bg-white py-3 px-6 rounded-xl md:rounded-md font-[500] text-sm mt-5 md:mt-0'>
                      Lihat Detail
                    </button>
                  </div>
                  <div className='mt-[17px] grid lg:grid-cols-4 grid-cols-2 items-center gap-[9px]'>
                    <div className='w-full bg-white rounded-[12px] px-[10px] py-[10px] flex items-center gap-1 md:gap-[16px]'>
                      <img
                        src={IconBagCherry}
                        className='w-5 md:w-auto'
                        alt=''
                      />
                      <h1 className='text-[#454545] font-bold text-sm md:text-[18px]'>
                        {staticSupplier.total_product}
                      </h1>
                      <p className='text-[9px] md:text-[15px] text-[#454545] font-[500]'>Total Peralatan</p>
                    </div>
                    <div className='w-full bg-white rounded-[12px] px-[10px] py-[10px] flex items-center gap-1 md:gap-[16px]'>
                      <img
                        src={IconBagPrimary}
                        className='w-5 md:w-auto'
                        alt=''
                      />
                      <h1 className='text-[#454545] font-bold text-sm md:text-[18px]'>
                        {staticSupplier.total_product_aktif}
                      </h1>
                      <p className='text-[9px] md:text-[15px] text-[#454545] font-[500]'>Total Supplier Aktif</p>
                    </div>
                    <div className='w-full bg-white rounded-[12px] px-[10px] py-[10px] flex items-center gap-1 md:gap-[16px]'>
                      <img
                        src={IconBagYellow}
                        className='w-5 md:w-auto'
                        alt=''
                      />
                      <h1 className='text-[#454545] font-bold text-sm md:text-[18px]'>{staticSupplier.total_klien}</h1>
                      <p className='text-[9px] md:text-[15px] text-[#454545] font-[500]'>Total Klien</p>
                    </div>
                    <div className='w-full bg-white rounded-[12px] px-[10px] py-[10px] flex items-center gap-1 md:gap-[16px]'>
                      <img
                        src={IconBagPurple}
                        className='w-5 md:w-auto'
                        alt=''
                      />
                      <h1 className='text-[#454545] font-bold text-sm md:text-[18px]'>
                        {staticSupplier.total_klien_aktif}
                      </h1>
                      <p className='text-[9px] md:text-[15px] text-[#454545] font-[500]'>Total Klien Aktif</p>
                    </div>
                  </div>
                </div>
              </div>
              {dataSupplier.length === 0 ? (
                <div className='flex items-center justify-center h-screen'>
                  <img
                    src={VenueEmptyVector}
                    alt=''
                  />
                </div>
              ) : (
                <div>
                  <div className='mt-[30px] flex flex-row flex-wrap items-center md:gap-3 gap-1'>
                    {Object.values(dataSupplier).map((data, index) => {
                      const formattedPrice =
                        data.package.length > 0
                          ? data.package[0].total_price.toLocaleString('id-ID', {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            })
                          : '0';
                      const priceWithoutRp = `${formattedPrice.replace(/^(\D+)/, '')}`;
                      return (
                        <CardLayanan
                          layanan={'supplier'}
                          key={index}
                          icon={IconSupplierCherry}
                          image={!data.product_image ? LogoDefault : imageHandle(data?.product_image)}
                          title={data?.product_name}
                          price={priceWithoutRp}
                          id={data?.id}
                          active={data.status_active}
                        />
                      );
                    })}
                  </div>

                  {/* Pagination */}
                  <div className='flex items-center justify-center mt-[30px] gap-[5px]'>
                    <ReactPaginate
                      breakLabel={<span className='mr-4'>...</span>}
                      nextLabel={
                        <span className='flex items-center justify-center w-12 h-12 border-2 rounded-full hover:bg-cherry hover:text-white'>
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
                      onPageChange={handlePageClickVenue}
                      pageRangeDisplayed={limit}
                      pageCount={dataSupplierPage.totalPages}
                      previousLabel={
                        <span className='flex items-center justify-center w-12 h-12 border-2 rounded-full hover:bg-cherry hover:text-white'>
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
              )}
            </div>
          ) : serviceActive === 'Venue' ? (
            <div className='md:py-[30px] py-4'>
              <div className='flex flex-col items-start px-4 md:flex-row md:items-center md:justify-between md:px-0'>
                <div>
                  <h1 className='text-[#454545] font-[600] text-base md:text-2xl'>Venue</h1>
                </div>
                <div className='flex w-full gap-5 mt-5 md:mt-0 md:flex-row md:w-auto'>
                  {/* <button onClick={handleOpen} className='w-full md:w-[160px] h-[39px] rounded-md border-cherry border-2 text-cherry font-[500]'>Tambah Massal</button> */}
                  <Link
                    to={'/add-venue'}
                    className='md:w-[229px] md:h-[39px] md:py-0 md:px-0 py-2 px-[14px] rounded-md bg-cherry text-white flex items-center justify-center font-[500] md:text-sm text-xs'>
                    <h1>+ Tambah Layanan Venue</h1>
                  </Link>
                </div>
              </div>
              <div className='bg-background-3 rounded-[12px] lg:h-[216px] md:py-[20px] md:px-[31px] px-2 py-[11px] mt-[32px]'>
                <div>
                  <h1 className='text-[#737373] text-sm font-[500]'>Admin {userByIdRole.name}</h1>
                  <div className='flex flex-col mt-5 md:flex-row md:items-center md:gap-7'>
                    <div className='flex items-center gap-7'>
                      <img
                        src={!userById.image ? LogoDefault : imageHandle(userById.image)}
                        className='w-[61px] h-[61px] rounded-full object-cover'
                        alt=''
                      />
                      <div>
                        <h1 className='font-semibold text-black-k md:text-xl'>{userById.fullname}</h1>
                        <h1 className='text-[#A8A8A8] text-xs'>
                          Bergabung sejak {moment(userById.createdAt).format('DD/MM/YYYY')}
                        </h1>
                      </div>
                    </div>
                    <button className='text-[#2E3A44] bg-white py-3 px-6 rounded-xl md:rounded-md font-[500] text-sm mt-5 md:mt-0'>
                      Lihat Detail
                    </button>
                  </div>
                  <div className='mt-[17px] grid lg:grid-cols-4 grid-cols-2 items-center gap-[9px]'>
                    <div className='w-full bg-white rounded-[12px] px-[10px] py-[10px] flex items-center gap-1 md:gap-[16px]'>
                      <img
                        src={IconBagCherry}
                        className='w-5 md:w-auto'
                        alt=''
                      />
                      <h1 className='text-[#454545] font-bold text-sm md:text-[18px]'>{staticVenue.total_venue}</h1>
                      <p className='text-[9px] md:text-[15px] text-[#454545] font-[500]'>Total Venue</p>
                    </div>
                    <div className='w-full bg-white rounded-[12px] px-[10px] py-[10px] flex items-center gap-1 md:gap-[16px]'>
                      <img
                        src={IconBagPrimary}
                        className='w-5 md:w-auto'
                        alt=''
                      />
                      <h1 className='text-[#454545] font-bold text-sm md:text-[18px]'>
                        {staticVenue.total_venue_aktif}
                      </h1>
                      <p className='text-[9px] md:text-[15px] text-[#454545] font-[500]'>Total Venue Aktif</p>
                    </div>
                    <div className='w-full bg-white rounded-[12px] px-[10px] py-[10px] flex items-center gap-1 md:gap-[16px]'>
                      <img
                        src={IconBagYellow}
                        className='w-5 md:w-auto'
                        alt=''
                      />
                      <h1 className='text-[#454545] font-bold text-sm md:text-[18px]'>{staticVenue.total_klien}</h1>
                      <p className='text-[9px] md:text-[15px] text-[#454545] font-[500]'>Total Klien</p>
                    </div>
                    <div className='w-full bg-white rounded-[12px] px-[10px] py-[10px] flex items-center gap-1 md:gap-[16px]'>
                      <img
                        src={IconBagPurple}
                        className='w-5 md:w-auto'
                        alt=''
                      />
                      <h1 className='text-[#454545] font-bold text-sm md:text-[18px]'>
                        {staticVenue.total_klien_aktif}
                      </h1>
                      <p className='text-[9px] md:text-[15px] text-[#454545] font-[500]'>Total Klien Aktif</p>
                    </div>
                  </div>
                </div>
              </div>
              {dataVenuePage.total === 0 ? (
                <div className='flex items-center justify-center h-screen'>
                  <img
                    src={VenueEmptyVector}
                    alt=''
                  />
                </div>
              ) : (
                <div>
                  <div className='mt-[30px] flex flex-row flex-wrap items-center md:gap-3 gap-1 '>
                    {Object.values(dataVenue).map((data, index) => {
                      return (
                        <div className=''>
                          <CardLayanan
                            layanan={'venue'}
                            icon={IconVenueCherry}
                            key={index}
                            image={!data.venue_image ? LogoDefault : imageHandle(data.venue_image)}
                            title={data.venue_name}
                            price={!data.package.length === 0 ? '0' : data.package[0].total_price}
                            id={data.id}
                            active={data.status_active}
                          />
                        </div>
                      );
                    })}
                  </div>
                  {/* Pagination */}
                  <div className='flex items-center justify-center mt-[30px] gap-[5px]'>
                    <ReactPaginate
                      breakLabel={<span className='mr-4'>...</span>}
                      nextLabel={
                        <span className='flex items-center justify-center w-12 h-12 border-2 rounded-full hover:bg-cherry hover:text-white'>
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
                      onPageChange={handlePageClickVenue}
                      pageRangeDisplayed={limit}
                      pageCount={dataVenuePage.totalPages}
                      previousLabel={
                        <span className='flex items-center justify-center w-12 h-12 border-2 rounded-full hover:bg-cherry hover:text-white'>
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
              )}
            </div>
          ) : null}
        </div>
      </div>
      {/* Modal */}
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <Box
            sx={style}
            className='scrollbar-hide md:w-[60%] w-[80%]'>
            <div className=''>
              <div className='flex items-start justify-between'>
                <div>
                  <h1 className='text-lg font-semibold'>Tambah Jenis Layanan</h1>
                </div>
                <button
                  onClick={handleClose}
                  className='hover:text-dark-3'>
                  <Close />
                </button>
              </div>
              <div className='space-y-[20px] mt-[20px]'>
                <div>
                  <h1 className='text-[#2E3A44] text-[11px] font-[500] mb-[10px]'>
                    Jenis Layanan<span className='text-[#C1121F] ml-[10px]'>*</span>
                  </h1>

                  {/* <select value={serviceRole} onChange={(e) => setserviceRole(e.target.value)} className='rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] text-[#A8A8A8] text-sm font-[500]'>
                                        <option value='' disabled>Pilih jenis layanan</option>
                                        {Object.values(subRole).map((data, index) => {
                                            return (
                                                <option value={data.id} key={index}>{data.name}</option>
                                            )
                                        })}
                                    </select> */}
                  <select
                    value={serviceRole}
                    onChange={(e) => setserviceRole(e.target.value)}
                    className='rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] text-[#A8A8A8] text-sm font-[500] bg-white'>
                    <option
                      value=''
                      disabled>
                      Pilih jenis layanan
                    </option>
                    {Object.values(subRole).map((data, index) => {
                      // if selected
                      if (!selectedServiceRoles.includes(data.name)) {
                        return (
                          <option
                            value={data.id}
                            key={index}>
                            {data.name}
                          </option>
                        );
                      }
                      return null; // not option layanan
                    })}
                  </select>
                </div>
                <h1 className='mb-10 text-[#454545] text-sm font-semibold'>Data Admin</h1>
                <div className='w-fit'>
                  <h1 className='text-[#2E3A44] text-[11px] font-[500] mb-[10px]'>
                    Foto Profile<span className='text-[#C1121F] ml-[10px]'>*</span>
                  </h1>
                  <label
                    htmlFor='upload-file'
                    className='cursor-pointer'>
                    <div
                      className='w-[105px] h-[105px] rounded-[12px] border-2 border-[#EBEBEB] flex flex-col items-center justify-center bg-cover relative'
                      style={{ backgroundImage: `url(${image})` }}>
                      <img
                        src={IconUploadImageGray}
                        alt=''
                      />
                      <div className='absolute bg-[#F9F9F9] border border-[#EBEBEB] w-[38px] h-[38px] rounded-full -bottom-3 -right-4 flex items-center justify-center'>
                        <img
                          src={IconEdit}
                          alt=''
                        />
                      </div>
                    </div>
                    <input
                      type='file'
                      id='upload-file'
                      onChange={(e) => handleChange(e)}
                      className='rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] hidden'
                      required
                    />
                  </label>
                </div>
                <div className='flex flex-col md:flex-row items-center gap-[20px] w-full'>
                  <div className='w-full'>
                    <h1 className='text-[#2E3A44] text-[11px] font-[500] mb-[10px]'>
                      Nama Admin<span className='text-[#C1121F] ml-[10px]'>*</span>
                    </h1>
                    <input
                      type='text'
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      className='bg-white rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] text-[#A8A8A8] text-sm font-[500]'
                      placeholder='Nama Admin..'
                      required
                    />
                  </div>
                  <div className='w-full'>
                    <h1 className='text-[#2E3A44] text-[11px] font-[500] mb-[10px]'>
                      Posisi Di Perusahaan<span className='text-[#C1121F] ml-[10px]'>*</span>
                    </h1>
                    <input
                      type='text'
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      className='bg-white rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] text-[#A8A8A8] text-sm font-[500]'
                      placeholder='Masukan posisi di perusahaan..'
                      required
                    />
                  </div>
                </div>
                <div className='flex flex-col md:flex-row items-center gap-[20px] w-full'>
                  <div className='w-full'>
                    <h1 className='text-[#2E3A44] text-[11px] font-[500] mb-[10px]'>
                      Username<span className='text-[#C1121F] ml-[10px]'>*</span>
                    </h1>
                    <input
                      type='text'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className='bg-white rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] text-[#A8A8A8] text-sm font-[500]'
                      placeholder='Masukkan Username..'
                      required
                    />
                  </div>
                  <div className='w-full'>
                    <h1 className='text-[#2E3A44] text-[11px] font-[500] mb-[10px]'>
                      Nomor Telepon<span className='text-[#C1121F] ml-[10px]'>*</span>
                    </h1>
                    <input
                      type='text'
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className='bg-white rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] text-[#A8A8A8] text-sm font-[500]'
                      placeholder='Masukan nomor telepon..'
                      required
                    />
                  </div>
                </div>
                <div className='flex flex-col md:flex-row items-center gap-[20px] w-full'>
                  <div className='w-full'>
                    <h1 className='text-[#2E3A44] text-[11px] font-[500] mb-[10px]'>
                      Email<span className='text-[#C1121F] ml-[10px]'>*</span>
                    </h1>
                    <input
                      type='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='bg-white rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] text-[#A8A8A8] text-sm font-[500]'
                      placeholder='Masukan email..'
                      required
                    />
                  </div>
                  <div className='w-full'>
                    <h1 className='text-[#2E3A44] text-[11px] font-[500] mb-[10px]'>
                      Password<span className='text-[#C1121F] ml-[10px]'>*</span>
                    </h1>
                    <div className='relative w-full '>
                      <input
                        type={typePassword}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-white rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] text-[#A8A8A8] text-sm font-[500]'
                        placeholder='Password..'
                        required
                      />
                      <button
                        onClick={handleTypePassword}
                        className='absolute right-[10px] lg:right-[10px] top-4'>
                        {typePassword === 'password' ? (
                          <img
                            src={IconEyeSlash}
                            alt=''
                          />
                        ) : (
                          <img
                            src={IconEye}
                            alt=''
                          />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className='flex items-center gap-[14px] justify-end'>
                  <button
                    className='bg-[#ECECEC] rounded-[6px] text-sm text-cherry w-[86px] h-[37px]'
                    onClick={handleClose}>
                    Batal
                  </button>
                  <button
                    className='bg-cherry rounded-[6px] text-sm text-white w-[86px] h-[37px]'
                    onClick={postLayanan}>
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default DashboardPartner;
