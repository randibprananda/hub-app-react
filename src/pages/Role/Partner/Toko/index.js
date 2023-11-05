import { ExpandMore } from '@mui/icons-material';
import React, { useEffect, useRef, useState } from 'react';
import { BackgroundAuth, BackgroundHome, BackgroundRole, IconSort, PremiumWedding, Wedding } from '../../../../assets';
import { Card1, Footer, Navbar } from '../../../../component';

import ReactPaginate from 'react-paginate';
import { useLocation } from 'react-router-dom';
import Api from '../../../../Api';
import imageHandle from '../../../../utils/imageHandle';

const Toko = () => {
  const params = useLocation();
  const [openTab, setOpenTab] = useState(1);
  const [openTab2, setOpenTab2] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [media, setMedia] = useState(false);
  const [rating, setRating] = useState(false);
  const [harga, setHarga] = useState(false);
  const [jadwal, setJadwal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const contentRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [companyData, setCompanyData] = useState('');
  const [serviceDataAll, setServiceDataAll] = useState('');

  // Data by Category
  const [allData, setAllData] = useState('');
  const [eoData, setEoData] = useState('');
  const [talentData, setTalentData] = useState('');
  const [venueData, setVenueData] = useState('');
  const [productData, setProductData] = useState('');

  const slides = [
    {
      src: Wedding,
    },
    {
      src: BackgroundAuth,
    },
    {
      src: BackgroundRole,
    },
    {
      src: PremiumWedding,
    },
    {
      src: BackgroundHome,
    },
  ];

  const getData = async () => {
    try {
      const response = await Api.getCompany(localStorage.getItem('token-hub'), params.state.companyId);

      setCompanyData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getServiceData = async (category) => {
    try {
      const response = await Api.PartnerGetServiceData(
        localStorage.getItem('token-hub'),
        params.state.partnerId,
        category,
      );
      if (category === 'EO') {
        setEoData(response.data.services.data);
      } else if (category === 'TALENT') {
        setTalentData(response.data.services.data);
      } else if (category === 'VENUE') {
        setVenueData(response.data.services.data);
      } else if (category === 'PRODUCT') {
        setProductData(response.data.services.data);
      } else {
        setAllData(response.data.services.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();
    getServiceData('');
    // const interval = setInterval(() => {
    //     const content = contentRef.current;
    //     const slideCount = content.children.length;
    //     if (currentSlide >= slideCount - 1) {
    //         setCurrentSlide(0);
    //         content.scrollTo({
    //             left: 0,
    //             behavior: "smooth",
    //         });
    //     } else {
    //         setCurrentSlide((prev) => prev + 1);
    //         content.scrollTo({
    //             left: content.offsetWidth * currentSlide,
    //             behavior: "smooth",
    //         });
    //     }
    // }, 3000);
    // return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      nextSlide();
    }, 3000);

    return () => clearTimeout(timeout);
  });

  return (
    <div className='bg-[#E3E8F1] min-h-screen'>
      <Navbar />
      <div className='md:px-[75px] px-3 pt-[120px] pb-[10px] md:pt-[140px] md:pb-[30px]'>
        <div className='p-4 bg-white rounded-2xl md:px-11 md:py-10 md:flex md:justify-between md:items-center'>
          <div className='flex md:gap-[30px] gap-5 md:items-center'>
            <img
              src={imageHandle(companyData.company_logo)}
              className='md:w-[110px] md:h-[110px] w-[72px] h-[72px] rounded-full'
              alt=''
            />
            <div className=''>
              <h1 className='font-bold text-[#2E3A44] text-sm md:text-base mb-1'>
                {companyData !== '' ? companyData.name : 'Konect Platform'}
              </h1>
              <h1 className='text-[#737373] text-xxs md:text-xs mb-1'>
                {companyData !== ''
                  ? `${companyData.address}, ${companyData.city}, ${companyData.province}`
                  : 'Jakarta Selatan, Indonesia'}
              </h1>
              <div className='flex items-center gap-2 mb-1'>
                <svg
                  width='25'
                  height='24'
                  viewBox='0 0 25 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M20.7133 9.63406L15.6905 8.90408L13.4452 4.35214C13.3839 4.22751 13.283 4.12662 13.1584 4.06529C12.8458 3.91099 12.466 4.03957 12.3097 4.35214L10.0644 8.90408L5.04161 9.63406C4.90314 9.65384 4.77653 9.71912 4.67959 9.81803C4.56241 9.93848 4.49783 10.1005 4.50006 10.2686C4.50228 10.4366 4.57113 10.5969 4.69146 10.7142L8.3255 14.2572L7.46694 19.2602C7.44681 19.3766 7.45969 19.4963 7.50412 19.6057C7.54855 19.7151 7.62275 19.8099 7.71832 19.8793C7.81388 19.9488 7.92698 19.99 8.04479 19.9984C8.1626 20.0068 8.28041 19.982 8.38485 19.9269L12.8774 17.5648L17.37 19.9269C17.4927 19.9922 17.6351 20.0139 17.7716 19.9902C18.1158 19.9308 18.3473 19.6044 18.288 19.2602L17.4294 14.2572L21.0634 10.7142C21.1623 10.6172 21.2276 10.4906 21.2474 10.3522C21.3008 10.006 21.0595 9.68549 20.7133 9.63406Z'
                    fill='#FDBE0F'
                  />
                </svg>
                <h1 className='text-sm font-semibold text-[#FDBE0F]'>4.5</h1>
                <h1 className='text-xs text-[#888888]'>(1000)</h1>
              </div>
              <div className='flex gap-1.5 items-center'>
                <button className='px-2 py-1.5 flex gap-1.5 border border-cherry  text-xxs md:text-sm font-semibold items-center rounded-xl text-cherry'>
                  <svg
                    width='11'
                    height='10'
                    viewBox='0 0 11 10'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <rect
                      x='0.5'
                      width='10'
                      height='10'
                      rx='5'
                      fill='#87CC62'
                    />
                  </svg>
                  Kirim Pesan
                </button>
                <button className='p-1.5 border border-cherry rounded-xl'>
                  <svg
                    width='19'
                    height='19'
                    viewBox='0 0 19 19'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M14.21 11.7473C13.864 11.7463 13.5227 11.8282 13.2148 11.9861C12.9068 12.1439 12.6412 12.3733 12.44 12.6548L7.42251 10.0073C7.39762 10.0106 7.3724 10.0106 7.34751 10.0073C7.45392 9.63105 7.44609 9.23164 7.32501 8.85983H7.39251L12.6425 6.45983C12.8392 6.69043 13.0827 6.87655 13.3568 7.00586C13.631 7.13516 13.9295 7.20469 14.2325 7.20983C14.6706 7.20228 15.0967 7.06481 15.4565 6.81483C15.8164 6.56486 16.094 6.21365 16.254 5.80573C16.4141 5.39782 16.4494 4.95156 16.3555 4.52355C16.2616 4.09554 16.0427 3.70505 15.7266 3.40159C15.4105 3.09813 15.0114 2.89536 14.5799 2.81901C14.1485 2.74265 13.704 2.79614 13.303 2.97269C12.9019 3.14924 12.5623 3.4409 12.3272 3.8107C12.0922 4.18049 11.9722 4.61176 11.9825 5.04983C11.9975 5.20208 12.0253 5.35208 12.065 5.49983L6.92751 7.81733C6.87835 7.84364 6.83294 7.87643 6.79251 7.91483C6.48259 7.59746 6.08442 7.38057 5.64969 7.29233C5.21496 7.20409 4.76374 7.24856 4.3546 7.41998C3.94546 7.5914 3.5973 7.88184 3.3553 8.25362C3.1133 8.62539 2.98865 9.06132 2.99751 9.50483C3.02077 10.0858 3.26805 10.6353 3.68752 11.038C4.10698 11.4406 4.66605 11.6653 5.24751 11.6648C5.5549 11.6597 5.85782 11.5903 6.13681 11.4611C6.41579 11.3319 6.66469 11.1459 6.86751 10.9148C6.88851 10.9343 6.91101 10.9523 6.93501 10.9673L12.065 13.6748C12.0575 13.7723 12.0575 13.8698 12.065 13.9673C12.0883 14.5483 12.3356 15.0978 12.755 15.5005C13.1745 15.9031 13.7335 16.1278 14.315 16.1273C14.7683 16.154 15.2189 16.0405 15.6055 15.8023C15.9921 15.564 16.296 15.2125 16.4759 14.7956C16.6558 14.3786 16.703 13.9164 16.611 13.4716C16.5191 13.0269 16.2925 12.6213 15.962 12.3098C15.7428 12.1029 15.4837 11.9429 15.2005 11.8398C14.9172 11.7366 14.6159 11.6924 14.315 11.7098L14.21 11.7473ZM14.21 3.87233C14.3599 3.85985 14.5108 3.8786 14.6531 3.9274C14.7953 3.9762 14.9259 4.05398 15.0366 4.15583C15.1473 4.25769 15.2357 4.38139 15.2961 4.51914C15.3565 4.65688 15.3877 4.80566 15.3877 4.95608C15.3877 5.1065 15.3565 5.25528 15.2961 5.39302C15.2357 5.53076 15.1473 5.65447 15.0366 5.75633C14.9259 5.85818 14.7953 5.93596 14.6531 5.98476C14.5108 6.03356 14.3599 6.05231 14.21 6.03983C13.9269 6.02716 13.6587 5.90952 13.4577 5.70986C13.2566 5.51019 13.1371 5.2428 13.1225 4.95983C13.1245 4.67201 13.2397 4.39654 13.4432 4.19302C13.6467 3.9895 13.9222 3.87429 14.21 3.87233ZM5.21001 10.5398C4.92694 10.5272 4.65874 10.4095 4.45768 10.2099C4.25663 10.0102 4.13714 9.74281 4.12251 9.45983C4.12103 9.24443 4.18354 9.03344 4.30213 8.85362C4.42072 8.67379 4.59004 8.53324 4.78862 8.44978C4.9872 8.36632 5.20609 8.34371 5.41754 8.38482C5.62898 8.42593 5.82346 8.52891 5.9763 8.68069C6.12914 8.83248 6.23346 9.02624 6.27604 9.2374C6.31861 9.44855 6.29751 9.6676 6.21543 9.86675C6.13334 10.0659 5.99396 10.2362 5.81497 10.356C5.63597 10.4759 5.42542 10.5398 5.21001 10.5398ZM14.21 15.0398C13.9269 15.0272 13.6587 14.9095 13.4577 14.7099C13.2566 14.5102 13.1371 14.2428 13.1225 13.9598C13.121 13.7444 13.1835 13.5334 13.3021 13.3536C13.4207 13.1738 13.59 13.0332 13.7886 12.9498C13.9872 12.8663 14.2061 12.8437 14.4175 12.8848C14.629 12.9259 14.8235 13.0289 14.9763 13.1807C15.1291 13.3325 15.2335 13.5262 15.276 13.7374C15.3186 13.9486 15.2975 14.1676 15.2154 14.3667C15.1333 14.5659 14.994 14.7362 14.815 14.856C14.636 14.9759 14.4254 15.0398 14.21 15.0398Z'
                      fill='#2D014B'
                      stroke='#2D014B'
                      stroke-width='0.3'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className='mt-4 space-y-4 md:space-y-6 md:mt-0'>
            <tr className='flex items-center justify-start gap-20 text-start'>
              <td className='flex items-center gap-2'>
                <svg
                  width='25'
                  height='24'
                  viewBox='0 0 25 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M16.994 3.58984C15.0592 3.58984 13.406 4.96892 12.4977 5.91969C11.5894 4.96892 9.93986 3.58984 8.00601 3.58984C4.67278 3.58984 2.3457 5.91323 2.3457 9.23907C2.3457 12.9037 5.23586 15.2723 8.03186 17.5634C9.35186 18.6462 10.718 19.7649 11.7657 21.0055C11.942 21.2132 12.2005 21.3332 12.4719 21.3332H12.5254C12.7977 21.3332 13.0552 21.2123 13.2306 21.0055C14.2802 19.7649 15.6454 18.6452 16.9663 17.5634C19.7614 15.2732 22.6534 12.9046 22.6534 9.23907C22.6534 5.91323 20.3263 3.58984 16.994 3.58984Z'
                    fill='#00CDB4'
                  />
                </svg>
                <h1 className='text-xs text-[#A8A8A8]'>Pembeli Puas</h1>
              </td>
              <td>
                <h1 className='font-medium text-xs text-[#2E3A44]'>98% Puas</h1>
              </td>
            </tr>
            <tr className='flex items-center justify-start gap-14 text-start'>
              <td className='flex items-center gap-2'>
                <svg
                  width='25'
                  height='24'
                  viewBox='0 0 25 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M2.90039 12.6004C2.90039 12.364 2.94695 12.1299 3.03741 11.9116C3.12787 11.6932 3.26045 11.4947 3.4276 11.3276C3.59474 11.1605 3.79317 11.0279 4.01156 10.9374C4.22995 10.8469 4.46401 10.8004 4.70039 10.8004C4.93677 10.8004 5.17083 10.8469 5.38922 10.9374C5.60761 11.0279 5.80604 11.1605 5.97318 11.3276C6.14033 11.4947 6.27292 11.6932 6.36337 11.9116C6.45383 12.1299 6.50039 12.364 6.50039 12.6004V19.8004C6.50039 20.2778 6.31075 20.7356 5.97318 21.0732C5.63562 21.4107 5.17778 21.6004 4.70039 21.6004C4.223 21.6004 3.76516 21.4107 3.4276 21.0732C3.09003 20.7356 2.90039 20.2778 2.90039 19.8004V12.6004ZM7.70039 12.4V18.916C7.70018 19.362 7.82425 19.7992 8.05869 20.1786C8.29312 20.558 8.62863 20.8646 9.02759 21.064L9.08759 21.094C9.75345 21.4268 10.4876 21.6002 11.232 21.6004H17.7312C18.2862 21.6006 18.8242 21.4084 19.2535 21.0566C19.6827 20.7048 19.9768 20.2151 20.0856 19.6708L21.5256 12.4708C21.5952 12.1226 21.5867 11.7634 21.5006 11.4189C21.4146 11.0745 21.2532 10.7534 21.0282 10.4788C20.8031 10.2042 20.5199 9.98303 20.1989 9.83113C19.878 9.67924 19.5274 9.60043 19.1724 9.60039H14.9004V4.80039C14.9004 4.16387 14.6475 3.55342 14.1974 3.10333C13.7474 2.65325 13.1369 2.40039 12.5004 2.40039C12.1821 2.40039 11.8769 2.52682 11.6519 2.75186C11.4268 2.97691 11.3004 3.28213 11.3004 3.60039V4.40079C11.3004 5.43937 10.9635 6.44993 10.3404 7.28079L8.66039 9.51999C8.03724 10.3509 7.70039 11.3614 7.70039 12.4Z'
                    fill='#00CDB4'
                  />
                </svg>
                <h1 className='text-xs text-[#A8A8A8]'>Jumlah Feedback</h1>
              </td>
              <td>
                <h1 className='font-medium text-xs text-[#2E3A44]'>6,364</h1>
              </td>
            </tr>
          </div>
          <div className='mt-4 space-y-4 md:space-y-6 md:mt-0'>
            <tr className='flex gap-[71px] md:gap-20 items-center text-start justify-start'>
              <td className='flex items-center gap-2'>
                <svg
                  width='25'
                  height='24'
                  viewBox='0 0 25 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M2.5 8.99401C2.49947 8.20621 2.65435 7.42605 2.95577 6.69819C3.25718 5.97034 3.69921 5.30909 4.25655 4.75231C4.81388 4.19553 5.47558 3.75416 6.20373 3.45348C6.93189 3.15279 7.71221 2.99869 8.5 3.00001H16.5C19.813 3.00001 22.5 5.69501 22.5 8.99401V21H8.5C5.187 21 2.5 18.305 2.5 15.006V8.99401ZM14.5 11V13H16.5V11H14.5ZM8.5 11V13H10.5V11H8.5Z'
                    fill='#00CDB4'
                  />
                </svg>

                <h1 className='text-xs text-[#A8A8A8]'>Terakhir Online</h1>
              </td>
              <td>
                <h1 className='font-medium text-xs text-[#2E3A44]'>Baru saja</h1>
              </td>
            </tr>
            <tr className='flex items-center justify-start gap-14 md:gap-16 text-start'>
              <td className='flex items-center gap-2'>
                <svg
                  width='25'
                  height='24'
                  viewBox='0 0 25 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M12.5 17.45C12.3667 17.45 12.2373 17.429 12.112 17.387C11.9867 17.345 11.8827 17.2827 11.8 17.2C11.1 16.5667 10.5417 15.779 10.125 14.837C9.70833 13.895 9.5 12.9493 9.5 12C9.5 11.05 9.70833 10.104 10.125 9.162C10.5417 8.22 11.1083 7.43267 11.825 6.8C11.925 6.71667 12.0293 6.65 12.138 6.6C12.2467 6.55 12.3673 6.525 12.5 6.525C12.6333 6.525 12.7583 6.55 12.875 6.6C12.9917 6.65 13.1 6.71667 13.2 6.8C13.9 7.43333 14.4583 8.22067 14.875 9.162C15.2917 10.1033 15.5 11.0493 15.5 12C15.5 12.95 15.2917 13.896 14.875 14.838C14.4583 15.78 13.8917 16.5673 13.175 17.2C13.075 17.2833 12.9707 17.346 12.862 17.388C12.7533 17.43 12.6327 17.4507 12.5 17.45ZM16.5 19C16.0333 19 15.5833 18.9583 15.15 18.875C14.7167 18.7917 14.3083 18.6667 13.925 18.5C14.2083 18.3 14.4793 18.05 14.738 17.75C14.9967 17.45 15.2257 17.1583 15.425 16.875C15.6083 16.9083 15.7873 16.9377 15.962 16.963C16.1367 16.9883 16.316 17.0007 16.5 17C17.8833 17 19.0627 16.5123 20.038 15.537C21.0133 14.5617 21.5007 13.3827 21.5 12C21.5 10.6 21.0123 9.41667 20.037 8.45C19.0617 7.48333 17.8827 7 16.5 7C16.3167 7 16.1377 7.00833 15.963 7.025C15.7883 7.04167 15.609 7.06667 15.425 7.1C15.225 6.81667 15 6.525 14.75 6.225C14.5 5.925 14.225 5.675 13.925 5.475C14.325 5.30833 14.7377 5.18767 15.163 5.113C15.5883 5.03833 16.034 5.00067 16.5 5C18.4333 5 20.0833 5.67933 21.45 7.038C22.8167 8.39667 23.5 10.0507 23.5 12C23.5 13.9333 22.8167 15.5833 21.45 16.95C20.0833 18.3167 18.4333 19 16.5 19ZM8.5 19C6.55 19 4.89567 18.3207 3.537 16.962C2.17833 15.6033 1.49933 13.9493 1.5 12C1.5 10.05 2.17933 8.39567 3.538 7.037C4.89667 5.67833 6.55067 4.99933 8.5 5C8.95 5 9.38767 5.04167 9.813 5.125C10.2383 5.20833 10.6507 5.33333 11.05 5.5C10.1167 6.11667 9.375 7.08333 8.825 8.4C8.275 9.71667 8 10.9167 8 12C8 13.0833 8.275 14.2833 8.825 15.6C9.375 16.9167 10.1167 17.8833 11.05 18.5C10.65 18.6667 10.2373 18.7917 9.812 18.875C9.38667 18.9583 8.94933 19 8.5 19Z'
                    fill='#00CDB4'
                  />
                </svg>

                <h1 className='text-xs text-[#A8A8A8]'>Jumlah Feedback</h1>
              </td>
              <td>
                <h1 className='font-medium text-xs text-[#2E3A44]'>3 April 2023</h1>
              </td>
            </tr>
          </div>
        </div>
        <div className='bg-white rounded-xl my-[30px] w-full overflow-x-auto scrollbar-hide'>
          <ul
            className='flex flex-row pt-3 pb-4 mb-0 list-none'
            role='tablist'
          >
            <li className='mr-2 -mb-px w-max last:mr-0'>
              <a
                className={
                  'text-xs font-bold px-5 py-3 block leading-normal truncate ' +
                  (openTab === 1 ? 'text-[#00CDB4]  underline underline-offset-8 rounded' : 'text-[#64748B] ')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle='tab'
                href='#link1'
                role='tablist'
              >
                Beranda
              </a>
            </li>
            <li className='mr-2 -mb-px w-max last:mr-0'>
              <a
                className={
                  'text-xs font-bold px-5 py-3 block leading-normal truncate ' +
                  (openTab === 2 ? 'text-[#00CDB4]  underline underline-offset-8 rounded' : 'text-[#64748B]')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle='tab'
                href='#link2'
                role='tablist'
              >
                Produk
              </a>
            </li>
            <li className='mr-2 -mb-px w-max last:mr-0'>
              <a
                className={
                  'text-xs font-bold px-5 py-3 block leading-normal truncate ' +
                  (openTab === 3 ? 'text-[#00CDB4]  underline underline-offset-8 rounded' : 'text-[#64748B]')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle='tab'
                href='#link3'
                role='tablist'
              >
                Ulasan
              </a>
            </li>
            <li className='mr-2 -mb-px w-max last:mr-0'>
              <a
                className={
                  'text-xs font-bold px-5 py-3 block leading-normal truncate ' +
                  (openTab === 4 ? 'text-[#00CDB4]  underline underline-offset-8 rounded' : 'text-[#64748B]')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(4);
                }}
                data-toggle='tab'
                href='#link4'
                role='tablist'
              >
                Tentang Kami
              </a>
            </li>
          </ul>
        </div>
        <div className='flex flex-wrap rounded-[12px]'>
          <div className='w-full'>
            <div className='relative flex flex-col w-full min-w-0 mb-6 break-words '>
              <div className='flex-auto '>
                <div className='tab-content tab-space'>
                  <div
                    className={openTab === 1 ? 'block' : 'hidden'}
                    id='link1'
                  >
                    <div className='max-w-[1400px] md:h-[631px] h-[351px] w-full m-auto relative group'>
                      <div
                        style={{ backgroundImage: `url(${slides[currentIndex].src})` }}
                        className='relative w-full h-full duration-500 bg-center bg-cover rounded-2xl'
                      >
                        <div className='absolute flex justify-center py-2 bottom-3 left-10'>
                          {slides.map((slide, slideIndex) => (
                            <div
                              key={slideIndex}
                              onClick={() => goToSlide(slideIndex)}
                              className={`text-2xl cursor-pointer ${slideIndex === currentIndex ? 'text-red-400' : ''}`}
                            >
                              {slideIndex === currentIndex ? (
                                <svg
                                  width='43'
                                  height='10'
                                  viewBox='0 0 43 10'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <rect
                                    width='42.1177'
                                    height='9.15603'
                                    rx='2'
                                    transform='matrix(1 0 0 -1 0.142578 9.62305)'
                                    fill='#C4C4C4'
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width='43'
                                  height='10'
                                  viewBox='0 0 43 10'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <rect
                                    width='42.1177'
                                    height='9.15603'
                                    rx='2'
                                    transform='matrix(1 0 0 -1 0.142578 9.62305)'
                                    fill='#FFFFFF'
                                  />
                                </svg>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Left Arrow */}
                      {/* <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                                                <BsChevronCompactLeft onClick={prevSlide} size={30} />
                                            </div> */}
                      {/* Right Arrow */}
                      {/* <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                                                <BsChevronCompactRight onClick={nextSlide} size={30} />
                                            </div> */}
                    </div>

                    <div className='relative'>
                      <div
                        ref={contentRef}
                        className='flex items-center justify-start gap-5 p-4 overflow-x-auto carousel scroll-smooth scrollbar-hide'
                      >
                        <img
                          src={Wedding}
                          className='md:w-[562px] md:h-64 w-[367px] h-28 rounded-xl'
                          alt=''
                        />
                        <img
                          src={Wedding}
                          className='md:w-[562px] md:h-64 w-[367px] h-28 rounded-xl'
                          alt=''
                        />
                        <img
                          src={Wedding}
                          className='md:w-[562px] md:h-64 w-[367px] h-28 rounded-xl'
                          alt=''
                        />
                      </div>
                    </div>
                    <div>
                      <h1 className='mt-[30px] mb-6 text-[28px] font-semibold text-[#2E3A44]'>Populer Produk</h1>
                      <div className='flex w-full overflow-x-auto md:grid md:grid-cols-4 md:flex-none md:gap-0 md:overflow-hidden scrollbar-hide'>
                        <div>
                          <Card1
                            rating={'4.9'}
                            price={40000000}
                            priceDisc={50000000}
                            disc={50}
                            pack={'pax'}
                            company='By SM Entertaiment - Music Entertaiment'
                            title={'Kolibree Enterprise- Event Organizer by Najla'}
                            image={
                              'https://images.unsplash.com/photo-1638132704795-6bb223151bf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                            }
                          />
                        </div>
                        <div>
                          <Card1
                            rating={'4.9'}
                            price={40000000}
                            priceDisc={50000000}
                            disc={50}
                            pack={'pax'}
                            company='By SM Entertaiment - Music Entertaiment'
                            title={'Kolibree Enterprise- Event Organizer by Najla'}
                            image={
                              'https://images.unsplash.com/photo-1638132704795-6bb223151bf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                            }
                          />
                        </div>
                        <div>
                          <Card1
                            rating={'4.9'}
                            price={40000000}
                            priceDisc={50000000}
                            disc={50}
                            pack={'pax'}
                            company='By SM Entertaiment - Music Entertaiment'
                            title={'Kolibree Enterprise- Event Organizer by Najla'}
                            image={
                              'https://images.unsplash.com/photo-1638132704795-6bb223151bf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                            }
                          />
                        </div>
                        <div>
                          <Card1
                            rating={'4.9'}
                            price={40000000}
                            priceDisc={50000000}
                            disc={50}
                            pack={'pax'}
                            company='By SM Entertaiment - Music Entertaiment'
                            title={'Kolibree Enterprise- Event Organizer by Najla'}
                            image={
                              'https://images.unsplash.com/photo-1638132704795-6bb223151bf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className='flex justify-between items-center mt-[30px] mb-6'>
                        <h1 className='md:text-[28px] text-[18px] font-semibold text-[#2E3A44]'>Semua Produk</h1>
                        <div className='relative w-max'>
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
                            placeholder='Cari Produk'
                            required
                          />
                        </div>
                      </div>
                      <div className='w-full overflow-x-auto md:overflow-hidden scrollbar-hide'>
                        <div className='grid w-full md:gap-x-0 gap-x-56 grid-cols-4'>
                          <Card1
                            rating={'4.9'}
                            price={40000000}
                            priceDisc={50000000}
                            disc={50}
                            pack={'pax'}
                            company='By SMc Entertaiment - Music Entertaiment'
                            title={'Kolibree Enterprise- Event Organizer by Najla'}
                            image={
                              'https://images.unsplash.com/photo-1638132704795-6bb223151bf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                            }
                          />
                          <Card1
                            rating={'4.9'}
                            price={40000000}
                            priceDisc={50000000}
                            disc={50}
                            pack={'pax'}
                            company='By SMc Entertaiment - Music Entertaiment'
                            title={'Kolibree Enterprise- Event Organizer by Najla'}
                            image={
                              'https://images.unsplash.com/photo-1638132704795-6bb223151bf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                            }
                          />
                          <Card1
                            rating={'4.9'}
                            price={40000000}
                            priceDisc={50000000}
                            disc={50}
                            pack={'pax'}
                            company='By SMc Entertaiment - Music Entertaiment'
                            title={'Kolibree Enterprise- Event Organizer by Najla'}
                            image={
                              'https://images.unsplash.com/photo-1638132704795-6bb223151bf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                            }
                          />
                          <Card1
                            rating={'4.9'}
                            price={40000000}
                            priceDisc={50000000}
                            disc={50}
                            pack={'pax'}
                            company='By SMc Entertaiment - Music Entertaiment'
                            title={'Kolibree Enterprise- Event Organizer by Najla'}
                            image={
                              'https://images.unsplash.com/photo-1638132704795-6bb223151bf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                            }
                          />
                          <Card1
                            rating={'4.9'}
                            price={40000000}
                            priceDisc={50000000}
                            disc={50}
                            pack={'pax'}
                            company='By SMc Entertaiment - Music Entertaiment'
                            title={'Kolibree Enterprise- Event Organizer by Najla'}
                            image={
                              'https://images.unsplash.com/photo-1638132704795-6bb223151bf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                            }
                          />
                          <Card1
                            rating={'4.9'}
                            price={40000000}
                            priceDisc={50000000}
                            disc={50}
                            pack={'pax'}
                            company='By SMc Entertaiment - Music Entertaiment'
                            title={'Kolibree Enterprise- Event Organizer by Najla'}
                            image={
                              'https://images.unsplash.com/photo-1638132704795-6bb223151bf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                            }
                          />
                          <Card1
                            rating={'4.9'}
                            price={40000000}
                            priceDisc={50000000}
                            disc={50}
                            pack={'pax'}
                            company='By SMc Entertaiment - Music Entertaiment'
                            title={'Kolibree Enterprise- Event Organizer by Najla'}
                            image={
                              'https://images.unsplash.com/photo-1638132704795-6bb223151bf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                            }
                          />
                          <Card1
                            rating={'4.9'}
                            price={40000000}
                            priceDisc={50000000}
                            disc={50}
                            pack={'pax'}
                            company='By SMc Entertaiment - Music Entertaiment'
                            title={'Kolibree Enterprise- Event Organizer by Najla'}
                            image={
                              'https://images.unsplash.com/photo-1638132704795-6bb223151bf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                            }
                          />
                          <Card1
                            rating={'4.9'}
                            price={40000000}
                            priceDisc={50000000}
                            disc={50}
                            pack={'pax'}
                            company='By SMc Entertaiment - Music Entertaiment'
                            title={'Kolibree Enterprise- Event Organizer by Najla'}
                            image={
                              'https://images.unsplash.com/photo-1638132704795-6bb223151bf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                            }
                          />
                          <Card1
                            rating={'4.9'}
                            price={40000000}
                            priceDisc={50000000}
                            disc={50}
                            pack={'pax'}
                            company='By SMc Entertaiment - Music Entertaiment'
                            title={'Kolibree Enterprise- Event Organizer by Najla'}
                            image={
                              'https://images.unsplash.com/photo-1638132704795-6bb223151bf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                            }
                          />
                          <Card1
                            rating={'4.9'}
                            price={40000000}
                            priceDisc={50000000}
                            disc={50}
                            pack={'pax'}
                            company='By SMc Entertaiment - Music Entertaiment'
                            title={'Kolibree Enterprise- Event Organizer by Najla'}
                            image={
                              'https://images.unsplash.com/photo-1638132704795-6bb223151bf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                            }
                          />
                          <Card1
                            rating={'4.9'}
                            price={40000000}
                            priceDisc={50000000}
                            disc={50}
                            pack={'pax'}
                            company='By SMc Entertaiment - Music Entertaiment'
                            title={'Kolibree Enterprise- Event Organizer by Najla'}
                            image={
                              'https://images.unsplash.com/photo-1638132704795-6bb223151bf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                            }
                          />
                        </div>
                      </div>
                      <div className='w-full overflow-x-auto md:overflow-hidden scrollbar-hide'>
                        <div className='flex w-full'>
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
                            // onPageChange={handlePageClick}
                            // pageRangeDisplayed={limit}
                            // pageCount={totalPages}
                            pageCount={100}
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
                            containerClassName='flex items-center justify center mt-8 mb-4 space-x-10'
                            disabledClassName='w-12 h-12 rounded-full border-2 flex items-center justify-center'
                            activeClassName='w-12 h-12 rounded-full border-2 bg-cherry text-white flex items-center justify-center'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={openTab === 2 ? 'block' : 'hidden'}
                    id='link2'
                  >
                    <div className='md:flex md:gap-5'>
                      <div className='md:block hidden bg-white rounded-xl w-[300px]'>
                        <h1 className='text-base text-[#2E2E2E] font-semibold px-5 pt-5'>Layanan </h1>
                        <ul
                          className='flex-row pt-3 pb-4 mb-0 list-none'
                          role='tablist'
                        >
                          <li className='w-full mr-2 -mb-px last:mr-0'>
                            <a
                              className={
                                'text-xs font-bold px-5 py-3 block leading-normal ' +
                                (openTab2 === 1 ? 'text-[#00CDB4]  border-l-2 border-[#00CDB4]' : 'text-[#64748B] ')
                              }
                              onClick={(e) => {
                                e.preventDefault();
                                setOpenTab2(1);
                                getServiceData('');
                              }}
                              data-toggle='tab'
                              href='#link1'
                              role='tablist'
                            >
                              Semua Layanan
                            </a>
                          </li>
                          <li className='w-full mr-2 -mb-px last:mr-0'>
                            <a
                              className={
                                'text-xs font-bold px-5 py-3 block leading-normal ' +
                                (openTab2 === 2 ? 'text-[#00CDB4]  border-l-2 border-[#00CDB4]' : 'text-[#64748B]')
                              }
                              onClick={(e) => {
                                e.preventDefault();
                                setOpenTab2(2);
                                getServiceData('EO');
                              }}
                              data-toggle='tab'
                              href='#link2'
                              role='tablist'
                            >
                              Event Organizer
                            </a>
                          </li>
                          <li className='w-full mr-2 -mb-px last:mr-0'>
                            <a
                              className={
                                'text-xs font-bold px-5 py-3 block leading-normal ' +
                                (openTab2 === 3 ? 'text-[#00CDB4]  border-l-2 border-[#00CDB4]' : 'text-[#64748B]')
                              }
                              onClick={(e) => {
                                e.preventDefault();
                                setOpenTab2(3);
                                getServiceData('VENUE');
                              }}
                              data-toggle='tab'
                              href='#link3'
                              role='tablist'
                            >
                              Venue
                            </a>
                          </li>
                          <li className='w-full mr-2 -mb-px last:mr-0'>
                            <a
                              className={
                                'text-xs font-bold px-5 py-3 block leading-normal ' +
                                (openTab2 === 4 ? 'text-[#00CDB4]  border-l-2 border-[#00CDB4]' : 'text-[#64748B]')
                              }
                              onClick={(e) => {
                                e.preventDefault();
                                setOpenTab2(4);
                                getServiceData('PRODUCT');
                              }}
                              data-toggle='tab'
                              href='#link4'
                              role='tablist'
                            >
                              Peralatan
                            </a>
                          </li>
                          <li className='w-full mr-2 -mb-px last:mr-0'>
                            <a
                              className={
                                'text-xs font-bold px-5 py-3 block leading-normal ' +
                                (openTab2 === 5 ? 'text-[#00CDB4]  border-l-2 border-[#00CDB4]' : 'text-[#64748B]')
                              }
                              onClick={(e) => {
                                e.preventDefault();
                                setOpenTab2(5);
                                getServiceData('TALENT');
                              }}
                              data-toggle='tab'
                              href='#link5'
                              role='tablist'
                            >
                              Talent
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className='relative block md:hidden'>
                        <button
                          className='bg-white text-sm justify-between w-full mb-3 text-[#454545] font-semibold py-3 px-5 rounded inline-flex items-center'
                          onClick={toggleDropdown}
                        >
                          <span className='mr-1'>Layanan </span>
                          <svg
                            className={`fill-current h-4 w-4 ${isOpen && 'transform rotate-180'}`}
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path d='M10 13l-5-5h10l-5 5z' />
                          </svg>
                        </button>
                        {isOpen && (
                          <div className='absolute right-0 z-10 w-full py-2 mt-2 bg-white rounded-md shadow-xl'>
                            <a
                              className={
                                'text-xs font-bold px-5 py-3 block leading-normal ' +
                                (openTab2 === 1 ? 'text-[#00CDB4]  border-l-2 border-[#00CDB4]' : 'text-[#64748B] ')
                              }
                              onClick={(e) => {
                                e.preventDefault();
                                setOpenTab2(1);
                              }}
                              data-toggle='tab'
                              href='#link1'
                              role='tablist'
                            >
                              Semua Layanan
                            </a>
                            <a
                              className={
                                'text-xs font-bold px-5 py-3 block leading-normal ' +
                                (openTab2 === 2 ? 'text-[#00CDB4]  border-l-2 border-[#00CDB4]' : 'text-[#64748B]')
                              }
                              onClick={(e) => {
                                e.preventDefault();
                                setOpenTab2(2);
                                getServiceData('EO');
                              }}
                              data-toggle='tab'
                              href='#link2'
                              role='tablist'
                            >
                              Event Organizer
                            </a>
                            <a
                              className={
                                'text-xs font-bold px-5 py-3 block leading-normal ' +
                                (openTab2 === 3 ? 'text-[#00CDB4]  border-l-2 border-[#00CDB4]' : 'text-[#64748B]')
                              }
                              onClick={(e) => {
                                e.preventDefault();
                                setOpenTab2(3);
                              }}
                              data-toggle='tab'
                              href='#link3'
                              role='tablist'
                            >
                              Venue
                            </a>
                            <a
                              className={
                                'text-xs font-bold px-5 py-3 block leading-normal ' +
                                (openTab2 === 4 ? 'text-[#00CDB4]  border-l-2 border-[#00CDB4]' : 'text-[#64748B]')
                              }
                              onClick={(e) => {
                                e.preventDefault();
                                setOpenTab2(4);
                              }}
                              data-toggle='tab'
                              href='#link4'
                              role='tablist'
                            >
                              Peralatan
                            </a>
                            <a
                              className={
                                'text-xs font-bold px-5 py-3 block leading-normal ' +
                                (openTab2 === 5 ? 'text-[#00CDB4]  border-l-2 border-[#00CDB4]' : 'text-[#64748B]')
                              }
                              onClick={(e) => {
                                e.preventDefault();
                                setOpenTab2(5);
                              }}
                              data-toggle='tab'
                              href='#link5'
                              role='tablist'
                            >
                              Talent
                            </a>
                          </div>
                        )}
                      </div>
                      <div className='relative flex flex-col w-full min-w-0 mb-6 break-words '>
                        <div className='flex-auto '>
                          <div className='tab-content tab-space'>
                            <div
                              className={openTab2 === 1 ? 'block' : 'hidden'}
                              id='link1'
                            >
                              <div className='bg-white px-6 py-[18px]'>
                                <div className='flex items-center gap-6'>
                                  <div className='relative w-full'>
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
                                      placeholder='Cari di konect platform...'
                                      required
                                    />
                                  </div>
                                  <div className='relative'>
                                    <select className='bg-gray-50 text-[#A8A8A8] border border-gray-300 text-sm rounded-lg  block w-36 pl-10 p-2.5 appearance-none'>
                                      <option disabled>Urutkan</option>
                                      <option value={''}>Terbaru</option>
                                      <option value={''}>Terlaris</option>
                                      <option value={''}>Popular</option>
                                    </select>
                                    <img
                                      src={IconSort}
                                      className='absolute top-2 left-4'
                                      alt=''
                                    />
                                  </div>
                                </div>
                                <div className='flex w-full overflow-x-auto md:grid md:grid-cols-3 mt-7 md:flex-none md:gap-0 md:overflow-hidden scrollbar-hide'>
                                  {/* //TODO: ALL DATA */}
                                  {Object.values(allData).map((data, index) => (
                                    <Card1
                                      key={index}
                                      rating={'4.9'}
                                      price={
                                        data.package_pricings[0].price[0] -
                                        data.package_pricings[0].price[0] *
                                        (data.package_pricings[0].disc_percentage / 100)
                                      }
                                      priceDisc={data.package_pricings[0].price[0]}
                                      disc={data.package_pricings[0].disc_percentage}
                                      pack={'pax'}
                                      company={companyData.name}
                                      title={data.name}
                                      image={imageHandle(data.images[0].image)}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div
                              className={openTab2 === 2 ? 'block' : 'hidden'}
                              id='link2'
                            >
                              <div className='bg-white px-6 py-[18px]'>
                                <div className='flex items-center gap-6'>
                                  <div className='relative w-full'>
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
                                      placeholder='Cari di konect platform...'
                                      required
                                    />
                                  </div>
                                  <div className='relative'>
                                    <select className='bg-gray-50 text-[#A8A8A8] border border-gray-300 text-sm rounded-lg  block w-36 pl-10 p-2.5 appearance-none'>
                                      <option disabled>Urutkan</option>
                                      <option value={''}>Terbaru</option>
                                      <option value={''}>Terlaris</option>
                                      <option value={''}>Popular</option>
                                    </select>
                                    <img
                                      src={IconSort}
                                      className='absolute top-2 left-4'
                                      alt=''
                                    />
                                  </div>
                                </div>
                                <div className='flex w-full overflow-x-auto md:grid md:grid-cols-3 mt-7 md:flex-none md:gap-0 md:overflow-hidden scrollbar-hide'>
                                  {/* //TODO: EO DATA */}
                                  {Object.values(eoData).map((data, index) => (
                                    <Card1
                                      key={index}
                                      rating={'4.9'}
                                      price={
                                        data.package_pricings[0].price[0] -
                                        data.package_pricings[0].price[0] *
                                        (data.package_pricings[0].disc_percentage / 100)
                                      }
                                      priceDisc={data.package_pricings[0].price[0]}
                                      disc={data.package_pricings[0].disc_percentage}
                                      pack={'pax'}
                                      company={companyData.name}
                                      title={data.name}
                                      image={imageHandle(data.images[0].image)}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div
                              className={openTab2 === 3 ? 'block' : 'hidden'}
                              id='link3'
                            >
                              <div className='bg-white px-6 py-[18px]'>
                                <div className='flex items-center gap-6'>
                                  <div className='relative w-full'>
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
                                      placeholder='Cari di konect platform...'
                                      required
                                    />
                                  </div>
                                  <div className='relative'>
                                    <select className='bg-gray-50 text-[#A8A8A8] border border-gray-300 text-sm rounded-lg  block w-36 pl-10 p-2.5 appearance-none'>
                                      <option disabled>Urutkan</option>
                                      <option value={''}>Terbaru</option>
                                      <option value={''}>Terlaris</option>
                                      <option value={''}>Popular</option>
                                    </select>
                                    <img
                                      src={IconSort}
                                      className='absolute top-2 left-4'
                                      alt=''
                                    />
                                  </div>
                                </div>
                                <div className='flex w-full overflow-x-auto md:grid md:grid-cols-3 mt-7 md:flex-none md:gap-0 md:overflow-hidden scrollbar-hide'>
                                  {/* //TODO: VENUE DATA */}
                                  {Object.values(venueData).map((data, index) => (
                                    <Card1
                                      key={index}
                                      rating={'4.9'}
                                      price={
                                        data.package_pricings[0].price[0] -
                                        data.package_pricings[0].price[0] *
                                        (data.package_pricings[0].disc_percentage / 100)
                                      }
                                      priceDisc={data.package_pricings[0].price[0]}
                                      disc={data.package_pricings[0].disc_percentage}
                                      pack={'pax'}
                                      company={companyData.name}
                                      title={data.name}
                                      image={imageHandle(data.images[0].image)}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div
                              className={openTab2 === 4 ? 'block' : 'hidden'}
                              id='link4'
                            >
                              <div className='bg-white px-6 py-[18px]'>
                                <div className='flex items-center gap-6'>
                                  <div className='relative w-full'>
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
                                      placeholder='Cari di konect platform...'
                                      required
                                    />
                                  </div>
                                  <div className='relative'>
                                    <select className='bg-gray-50 text-[#A8A8A8] border border-gray-300 text-sm rounded-lg  block w-36 pl-10 p-2.5 appearance-none'>
                                      <option disabled>Urutkan</option>
                                      <option value={''}>Terbaru</option>
                                      <option value={''}>Terlaris</option>
                                      <option value={''}>Popular</option>
                                    </select>
                                    <img
                                      src={IconSort}
                                      className='absolute top-2 left-4'
                                      alt=''
                                    />
                                  </div>
                                </div>
                                <div className='flex w-full overflow-x-auto md:grid md:grid-cols-3 mt-7 md:flex-none md:gap-0 md:overflow-hidden scrollbar-hide'>
                                  {/* //TODO: PRODUCT DATA */}
                                  {Object.values(productData).map((data, index) => (
                                    <Card1
                                      key={index}
                                      rating={'4.9'}
                                      price={
                                        data.package_pricings[0].price[0] -
                                        data.package_pricings[0].price[0] *
                                        (data.package_pricings[0].disc_percentage / 100)
                                      }
                                      priceDisc={data.package_pricings[0].price[0]}
                                      disc={data.package_pricings[0].disc_percentage}
                                      pack={'pax'}
                                      company={companyData.name}
                                      title={data.name}
                                      image={imageHandle(data.images[0].image)}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div
                              className={openTab2 === 5 ? 'block' : 'hidden'}
                              id='link4'
                            >
                              <div className='bg-white px-6 py-[18px]'>
                                <div className='flex items-center gap-6'>
                                  <div className='relative w-full'>
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
                                      placeholder='Cari di konect platform...'
                                      required
                                    />
                                  </div>
                                  <div className='relative'>
                                    <select className='bg-gray-50 text-[#A8A8A8] border border-gray-300 text-sm rounded-lg  block w-36 pl-10 p-2.5 appearance-none'>
                                      <option disabled>Urutkan</option>
                                      <option value={''}>Terbaru</option>
                                      <option value={''}>Terlaris</option>
                                      <option value={''}>Popular</option>
                                    </select>
                                    <img
                                      src={IconSort}
                                      className='absolute top-2 left-4'
                                      alt=''
                                    />
                                  </div>
                                </div>
                                <div className='flex w-full overflow-x-auto md:grid md:grid-cols-3 mt-7 md:flex-none md:gap-0 md:overflow-hidden scrollbar-hide'>
                                  {/* //TODO: TALENT DATA */}
                                  {Object.values(talentData).map((data, index) => (
                                    <Card1
                                      key={index}
                                      rating={'4.9'}
                                      price={
                                        data.package_pricings[0].price[0] -
                                        data.package_pricings[0].price[0] *
                                        (data.package_pricings[0].disc_percentage / 100)
                                      }
                                      priceDisc={data.package_pricings[0].price[0]}
                                      disc={data.package_pricings[0].disc_percentage}
                                      pack={'pax'}
                                      company={companyData.name}
                                      title={data.name}
                                      image={imageHandle(data.images[0].image)}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={openTab === 3 ? 'block' : 'hidden'}
                    id='link3'
                  >
                    <div className='md:grid md:grid-cols-12 bg-[#ECEEF6] rounded-xl h-screen'>
                      <div className='hidden h-screen bg-white md:col-span-3 md:block rounded-l-xl'>
                        <div className='flex justify-between items-center pb-2.5 border-b px-7 py-[22px]'>
                          <h1 className='text-xl font-semibold text-[#2E2E2E]'>Filter Ulasan </h1>
                        </div>
                        <div className='py-5 overflow-y-auto px-7 h-5/6 scroll-smooth scrollbar-hide'>
                          <div className='py-3 border-b'>
                            <button
                              onClick={() => {
                                setMedia(!media);
                              }}
                              className='flex items-center justify-between w-full'
                            >
                              <p>Media</p>
                              <ExpandMore />
                            </button>
                            {media ? (
                              <div className='py-1.5'>
                                <div class='flex items-center gap-2 mr-[30px] pb-1.5'>
                                  <input
                                    id='checkbox1'
                                    type='checkbox'
                                    name='media'
                                    value='Jawa Barat'
                                    className=''
                                  />
                                  <label
                                    for='checkbox1'
                                    class='cursor-pointer w-full text-sm font-medium text-[#2E3A44]'
                                  >
                                    Dengan Foto & Video
                                  </label>
                                </div>
                              </div>
                            ) : null}
                          </div>
                          <div className='py-3 border-b'>
                            <button
                              onClick={() => {
                                setRating(!rating);
                              }}
                              className='flex items-center justify-between w-full'
                            >
                              <p>Rating</p>
                              <ExpandMore />
                            </button>
                            {rating ? (
                              <div className='py-1.5'>
                                <div class='flex items-center gap-2 mr-[30px] pb-1.5'>
                                  <input
                                    id='checkbox2'
                                    type='checkbox'
                                    name='rating'
                                    value='5'
                                    className=''
                                  />
                                  <label
                                    for='checkbox2'
                                    class='cursor-pointer w-full text-sm font-medium text-[#2E3A44] flex items-center gap-1'
                                  >
                                    <svg
                                      width='18'
                                      height='18'
                                      viewBox='0 0 18 18'
                                      fill='none'
                                      xmlns='http://www.w3.org/2000/svg'
                                    >
                                      <path
                                        d='M16.2409 6.78193L11.5194 6.09758L9.40874 1.83013C9.3511 1.71329 9.25626 1.6187 9.1391 1.56121C8.84528 1.41655 8.48824 1.5371 8.34133 1.83013L6.23068 6.09758L1.50913 6.78193C1.37896 6.80047 1.25994 6.86167 1.16882 6.95441C1.05866 7.06733 0.99796 7.21924 1.00005 7.37678C1.00214 7.53431 1.06686 7.68457 1.17998 7.79454L4.59608 11.1161L3.78901 15.8064C3.77008 15.9156 3.78219 16.0278 3.82396 16.1304C3.86572 16.233 3.93548 16.3218 4.02531 16.3869C4.11514 16.452 4.22146 16.4906 4.3322 16.4985C4.44295 16.5064 4.55369 16.4831 4.65187 16.4314L8.87504 14.217L13.0982 16.4314C13.2135 16.4926 13.3474 16.513 13.4757 16.4908C13.7993 16.4352 14.0169 16.1291 13.9611 15.8064L13.154 11.1161L16.5701 7.79454C16.6631 7.70367 16.7244 7.58497 16.743 7.45515C16.7932 7.13059 16.5664 6.83015 16.2409 6.78193Z'
                                        fill='#FDBE0F'
                                      />
                                    </svg>
                                    5
                                  </label>
                                </div>
                                <div class='flex items-center gap-2 mr-[30px] pb-1.5'>
                                  <input
                                    id='checkbox3'
                                    type='checkbox'
                                    name='rating'
                                    value='4'
                                    className=''
                                  />
                                  <label
                                    for='checkbox3'
                                    class='cursor-pointer w-full text-sm font-medium text-[#2E3A44] flex items-center gap-1'
                                  >
                                    <svg
                                      width='18'
                                      height='18'
                                      viewBox='0 0 18 18'
                                      fill='none'
                                      xmlns='http://www.w3.org/2000/svg'
                                    >
                                      <path
                                        d='M16.2409 6.78193L11.5194 6.09758L9.40874 1.83013C9.3511 1.71329 9.25626 1.6187 9.1391 1.56121C8.84528 1.41655 8.48824 1.5371 8.34133 1.83013L6.23068 6.09758L1.50913 6.78193C1.37896 6.80047 1.25994 6.86167 1.16882 6.95441C1.05866 7.06733 0.99796 7.21924 1.00005 7.37678C1.00214 7.53431 1.06686 7.68457 1.17998 7.79454L4.59608 11.1161L3.78901 15.8064C3.77008 15.9156 3.78219 16.0278 3.82396 16.1304C3.86572 16.233 3.93548 16.3218 4.02531 16.3869C4.11514 16.452 4.22146 16.4906 4.3322 16.4985C4.44295 16.5064 4.55369 16.4831 4.65187 16.4314L8.87504 14.217L13.0982 16.4314C13.2135 16.4926 13.3474 16.513 13.4757 16.4908C13.7993 16.4352 14.0169 16.1291 13.9611 15.8064L13.154 11.1161L16.5701 7.79454C16.6631 7.70367 16.7244 7.58497 16.743 7.45515C16.7932 7.13059 16.5664 6.83015 16.2409 6.78193Z'
                                        fill='#FDBE0F'
                                      />
                                    </svg>
                                    4
                                  </label>
                                </div>
                                <div class='flex items-center gap-2 mr-[30px] pb-1.5'>
                                  <input
                                    id='checkbox4'
                                    type='checkbox'
                                    name='rating'
                                    value='3'
                                    className=''
                                  />
                                  <label
                                    for='checkbox4'
                                    class='cursor-pointer w-full text-sm font-medium text-[#2E3A44] flex items-center gap-1'
                                  >
                                    <svg
                                      width='18'
                                      height='18'
                                      viewBox='0 0 18 18'
                                      fill='none'
                                      xmlns='http://www.w3.org/2000/svg'
                                    >
                                      <path
                                        d='M16.2409 6.78193L11.5194 6.09758L9.40874 1.83013C9.3511 1.71329 9.25626 1.6187 9.1391 1.56121C8.84528 1.41655 8.48824 1.5371 8.34133 1.83013L6.23068 6.09758L1.50913 6.78193C1.37896 6.80047 1.25994 6.86167 1.16882 6.95441C1.05866 7.06733 0.99796 7.21924 1.00005 7.37678C1.00214 7.53431 1.06686 7.68457 1.17998 7.79454L4.59608 11.1161L3.78901 15.8064C3.77008 15.9156 3.78219 16.0278 3.82396 16.1304C3.86572 16.233 3.93548 16.3218 4.02531 16.3869C4.11514 16.452 4.22146 16.4906 4.3322 16.4985C4.44295 16.5064 4.55369 16.4831 4.65187 16.4314L8.87504 14.217L13.0982 16.4314C13.2135 16.4926 13.3474 16.513 13.4757 16.4908C13.7993 16.4352 14.0169 16.1291 13.9611 15.8064L13.154 11.1161L16.5701 7.79454C16.6631 7.70367 16.7244 7.58497 16.743 7.45515C16.7932 7.13059 16.5664 6.83015 16.2409 6.78193Z'
                                        fill='#FDBE0F'
                                      />
                                    </svg>
                                    3
                                  </label>
                                </div>
                                <div class='flex items-center gap-2 mr-[30px] pb-1.5'>
                                  <input
                                    id='checkbox5'
                                    type='checkbox'
                                    name='rating'
                                    value='2'
                                    className=''
                                  />
                                  <label
                                    for='checkbox5'
                                    class='cursor-pointer w-full text-sm font-medium text-[#2E3A44] flex items-center gap-1'
                                  >
                                    <svg
                                      width='18'
                                      height='18'
                                      viewBox='0 0 18 18'
                                      fill='none'
                                      xmlns='http://www.w3.org/2000/svg'
                                    >
                                      <path
                                        d='M16.2409 6.78193L11.5194 6.09758L9.40874 1.83013C9.3511 1.71329 9.25626 1.6187 9.1391 1.56121C8.84528 1.41655 8.48824 1.5371 8.34133 1.83013L6.23068 6.09758L1.50913 6.78193C1.37896 6.80047 1.25994 6.86167 1.16882 6.95441C1.05866 7.06733 0.99796 7.21924 1.00005 7.37678C1.00214 7.53431 1.06686 7.68457 1.17998 7.79454L4.59608 11.1161L3.78901 15.8064C3.77008 15.9156 3.78219 16.0278 3.82396 16.1304C3.86572 16.233 3.93548 16.3218 4.02531 16.3869C4.11514 16.452 4.22146 16.4906 4.3322 16.4985C4.44295 16.5064 4.55369 16.4831 4.65187 16.4314L8.87504 14.217L13.0982 16.4314C13.2135 16.4926 13.3474 16.513 13.4757 16.4908C13.7993 16.4352 14.0169 16.1291 13.9611 15.8064L13.154 11.1161L16.5701 7.79454C16.6631 7.70367 16.7244 7.58497 16.743 7.45515C16.7932 7.13059 16.5664 6.83015 16.2409 6.78193Z'
                                        fill='#FDBE0F'
                                      />
                                    </svg>
                                    2
                                  </label>
                                </div>
                                <div class='flex items-center gap-2 mr-[30px] pb-1.5'>
                                  <input
                                    id='checkbox6'
                                    type='checkbox'
                                    name='rating'
                                    value='1'
                                    className=''
                                  />
                                  <label
                                    for='checkbox6'
                                    class='cursor-pointer w-full text-sm font-medium text-[#2E3A44] flex items-center gap-1'
                                  >
                                    <svg
                                      width='18'
                                      height='18'
                                      viewBox='0 0 18 18'
                                      fill='none'
                                      xmlns='http://www.w3.org/2000/svg'
                                    >
                                      <path
                                        d='M16.2409 6.78193L11.5194 6.09758L9.40874 1.83013C9.3511 1.71329 9.25626 1.6187 9.1391 1.56121C8.84528 1.41655 8.48824 1.5371 8.34133 1.83013L6.23068 6.09758L1.50913 6.78193C1.37896 6.80047 1.25994 6.86167 1.16882 6.95441C1.05866 7.06733 0.99796 7.21924 1.00005 7.37678C1.00214 7.53431 1.06686 7.68457 1.17998 7.79454L4.59608 11.1161L3.78901 15.8064C3.77008 15.9156 3.78219 16.0278 3.82396 16.1304C3.86572 16.233 3.93548 16.3218 4.02531 16.3869C4.11514 16.452 4.22146 16.4906 4.3322 16.4985C4.44295 16.5064 4.55369 16.4831 4.65187 16.4314L8.87504 14.217L13.0982 16.4314C13.2135 16.4926 13.3474 16.513 13.4757 16.4908C13.7993 16.4352 14.0169 16.1291 13.9611 15.8064L13.154 11.1161L16.5701 7.79454C16.6631 7.70367 16.7244 7.58497 16.743 7.45515C16.7932 7.13059 16.5664 6.83015 16.2409 6.78193Z'
                                        fill='#FDBE0F'
                                      />
                                    </svg>
                                    1
                                  </label>
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className='relative block md:hidden'>
                        <button
                          className='bg-white text-sm justify-between w-full mb-3 text-[#454545] font-semibold py-3 px-5 rounded inline-flex items-center'
                          onClick={toggleDropdown2}
                        >
                          <span className='mr-1'>Filter Ulasan</span>
                          <svg
                            className={`fill-current h-4 w-4 ${isOpen2 && 'transform rotate-180'}`}
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path d='M10 13l-5-5h10l-5 5z' />
                          </svg>
                        </button>
                        {isOpen2 && (
                          <div className='absolute right-0 z-10 w-full py-2 mt-2 bg-white rounded-md shadow-xl'>
                            <div className='flex justify-between items-center pb-2.5 border-b px-7 py-[22px]'>
                              <h1 className='text-xl font-semibold text-[#2E2E2E]'>Filter Ulasan </h1>
                            </div>
                            <div className='py-5 overflow-y-auto px-7 h-5/6 scroll-smooth scrollbar-hide'>
                              <div className='py-3 border-b'>
                                <button
                                  onClick={() => {
                                    setMedia(!media);
                                  }}
                                  className='flex items-center justify-between w-full'
                                >
                                  <p>Media</p>
                                  <ExpandMore />
                                </button>
                                {media ? (
                                  <div className='py-1.5'>
                                    <div class='flex items-center gap-2 mr-[30px] pb-1.5'>
                                      <input
                                        id='checkbox1'
                                        type='checkbox'
                                        name='media'
                                        value='Jawa Barat'
                                        className=''
                                      />
                                      <label
                                        for='checkbox1'
                                        class='cursor-pointer w-full text-sm font-medium text-[#2E3A44]'
                                      >
                                        Dengan Foto & Video
                                      </label>
                                    </div>
                                  </div>
                                ) : null}
                              </div>
                              <div className='py-3 border-b'>
                                <button
                                  onClick={() => {
                                    setRating(!rating);
                                  }}
                                  className='flex items-center justify-between w-full'
                                >
                                  <p>Rating</p>
                                  <ExpandMore />
                                </button>
                                {rating ? (
                                  <div className='py-1.5'>
                                    <div class='flex items-center gap-2 mr-[30px] pb-1.5'>
                                      <input
                                        id='checkbox2'
                                        type='checkbox'
                                        name='rating'
                                        value='5'
                                        className=''
                                      />
                                      <label
                                        for='checkbox2'
                                        class='cursor-pointer w-full text-sm font-medium text-[#2E3A44] flex items-center gap-1'
                                      >
                                        <svg
                                          width='18'
                                          height='18'
                                          viewBox='0 0 18 18'
                                          fill='none'
                                          xmlns='http://www.w3.org/2000/svg'
                                        >
                                          <path
                                            d='M16.2409 6.78193L11.5194 6.09758L9.40874 1.83013C9.3511 1.71329 9.25626 1.6187 9.1391 1.56121C8.84528 1.41655 8.48824 1.5371 8.34133 1.83013L6.23068 6.09758L1.50913 6.78193C1.37896 6.80047 1.25994 6.86167 1.16882 6.95441C1.05866 7.06733 0.99796 7.21924 1.00005 7.37678C1.00214 7.53431 1.06686 7.68457 1.17998 7.79454L4.59608 11.1161L3.78901 15.8064C3.77008 15.9156 3.78219 16.0278 3.82396 16.1304C3.86572 16.233 3.93548 16.3218 4.02531 16.3869C4.11514 16.452 4.22146 16.4906 4.3322 16.4985C4.44295 16.5064 4.55369 16.4831 4.65187 16.4314L8.87504 14.217L13.0982 16.4314C13.2135 16.4926 13.3474 16.513 13.4757 16.4908C13.7993 16.4352 14.0169 16.1291 13.9611 15.8064L13.154 11.1161L16.5701 7.79454C16.6631 7.70367 16.7244 7.58497 16.743 7.45515C16.7932 7.13059 16.5664 6.83015 16.2409 6.78193Z'
                                            fill='#FDBE0F'
                                          />
                                        </svg>
                                        5
                                      </label>
                                    </div>
                                    <div class='flex items-center gap-2 mr-[30px] pb-1.5'>
                                      <input
                                        id='checkbox3'
                                        type='checkbox'
                                        name='rating'
                                        value='4'
                                        className=''
                                      />
                                      <label
                                        for='checkbox3'
                                        class='cursor-pointer w-full text-sm font-medium text-[#2E3A44] flex items-center gap-1'
                                      >
                                        <svg
                                          width='18'
                                          height='18'
                                          viewBox='0 0 18 18'
                                          fill='none'
                                          xmlns='http://www.w3.org/2000/svg'
                                        >
                                          <path
                                            d='M16.2409 6.78193L11.5194 6.09758L9.40874 1.83013C9.3511 1.71329 9.25626 1.6187 9.1391 1.56121C8.84528 1.41655 8.48824 1.5371 8.34133 1.83013L6.23068 6.09758L1.50913 6.78193C1.37896 6.80047 1.25994 6.86167 1.16882 6.95441C1.05866 7.06733 0.99796 7.21924 1.00005 7.37678C1.00214 7.53431 1.06686 7.68457 1.17998 7.79454L4.59608 11.1161L3.78901 15.8064C3.77008 15.9156 3.78219 16.0278 3.82396 16.1304C3.86572 16.233 3.93548 16.3218 4.02531 16.3869C4.11514 16.452 4.22146 16.4906 4.3322 16.4985C4.44295 16.5064 4.55369 16.4831 4.65187 16.4314L8.87504 14.217L13.0982 16.4314C13.2135 16.4926 13.3474 16.513 13.4757 16.4908C13.7993 16.4352 14.0169 16.1291 13.9611 15.8064L13.154 11.1161L16.5701 7.79454C16.6631 7.70367 16.7244 7.58497 16.743 7.45515C16.7932 7.13059 16.5664 6.83015 16.2409 6.78193Z'
                                            fill='#FDBE0F'
                                          />
                                        </svg>
                                        4
                                      </label>
                                    </div>
                                    <div class='flex items-center gap-2 mr-[30px] pb-1.5'>
                                      <input
                                        id='checkbox4'
                                        type='checkbox'
                                        name='rating'
                                        value='3'
                                        className=''
                                      />
                                      <label
                                        for='checkbox4'
                                        class='cursor-pointer w-full text-sm font-medium text-[#2E3A44] flex items-center gap-1'
                                      >
                                        <svg
                                          width='18'
                                          height='18'
                                          viewBox='0 0 18 18'
                                          fill='none'
                                          xmlns='http://www.w3.org/2000/svg'
                                        >
                                          <path
                                            d='M16.2409 6.78193L11.5194 6.09758L9.40874 1.83013C9.3511 1.71329 9.25626 1.6187 9.1391 1.56121C8.84528 1.41655 8.48824 1.5371 8.34133 1.83013L6.23068 6.09758L1.50913 6.78193C1.37896 6.80047 1.25994 6.86167 1.16882 6.95441C1.05866 7.06733 0.99796 7.21924 1.00005 7.37678C1.00214 7.53431 1.06686 7.68457 1.17998 7.79454L4.59608 11.1161L3.78901 15.8064C3.77008 15.9156 3.78219 16.0278 3.82396 16.1304C3.86572 16.233 3.93548 16.3218 4.02531 16.3869C4.11514 16.452 4.22146 16.4906 4.3322 16.4985C4.44295 16.5064 4.55369 16.4831 4.65187 16.4314L8.87504 14.217L13.0982 16.4314C13.2135 16.4926 13.3474 16.513 13.4757 16.4908C13.7993 16.4352 14.0169 16.1291 13.9611 15.8064L13.154 11.1161L16.5701 7.79454C16.6631 7.70367 16.7244 7.58497 16.743 7.45515C16.7932 7.13059 16.5664 6.83015 16.2409 6.78193Z'
                                            fill='#FDBE0F'
                                          />
                                        </svg>
                                        3
                                      </label>
                                    </div>
                                    <div class='flex items-center gap-2 mr-[30px] pb-1.5'>
                                      <input
                                        id='checkbox5'
                                        type='checkbox'
                                        name='rating'
                                        value='2'
                                        className=''
                                      />
                                      <label
                                        for='checkbox5'
                                        class='cursor-pointer w-full text-sm font-medium text-[#2E3A44] flex items-center gap-1'
                                      >
                                        <svg
                                          width='18'
                                          height='18'
                                          viewBox='0 0 18 18'
                                          fill='none'
                                          xmlns='http://www.w3.org/2000/svg'
                                        >
                                          <path
                                            d='M16.2409 6.78193L11.5194 6.09758L9.40874 1.83013C9.3511 1.71329 9.25626 1.6187 9.1391 1.56121C8.84528 1.41655 8.48824 1.5371 8.34133 1.83013L6.23068 6.09758L1.50913 6.78193C1.37896 6.80047 1.25994 6.86167 1.16882 6.95441C1.05866 7.06733 0.99796 7.21924 1.00005 7.37678C1.00214 7.53431 1.06686 7.68457 1.17998 7.79454L4.59608 11.1161L3.78901 15.8064C3.77008 15.9156 3.78219 16.0278 3.82396 16.1304C3.86572 16.233 3.93548 16.3218 4.02531 16.3869C4.11514 16.452 4.22146 16.4906 4.3322 16.4985C4.44295 16.5064 4.55369 16.4831 4.65187 16.4314L8.87504 14.217L13.0982 16.4314C13.2135 16.4926 13.3474 16.513 13.4757 16.4908C13.7993 16.4352 14.0169 16.1291 13.9611 15.8064L13.154 11.1161L16.5701 7.79454C16.6631 7.70367 16.7244 7.58497 16.743 7.45515C16.7932 7.13059 16.5664 6.83015 16.2409 6.78193Z'
                                            fill='#FDBE0F'
                                          />
                                        </svg>
                                        2
                                      </label>
                                    </div>
                                    <div class='flex items-center gap-2 mr-[30px] pb-1.5'>
                                      <input
                                        id='checkbox6'
                                        type='checkbox'
                                        name='rating'
                                        value='1'
                                        className=''
                                      />
                                      <label
                                        for='checkbox6'
                                        class='cursor-pointer w-full text-sm font-medium text-[#2E3A44] flex items-center gap-1'
                                      >
                                        <svg
                                          width='18'
                                          height='18'
                                          viewBox='0 0 18 18'
                                          fill='none'
                                          xmlns='http://www.w3.org/2000/svg'
                                        >
                                          <path
                                            d='M16.2409 6.78193L11.5194 6.09758L9.40874 1.83013C9.3511 1.71329 9.25626 1.6187 9.1391 1.56121C8.84528 1.41655 8.48824 1.5371 8.34133 1.83013L6.23068 6.09758L1.50913 6.78193C1.37896 6.80047 1.25994 6.86167 1.16882 6.95441C1.05866 7.06733 0.99796 7.21924 1.00005 7.37678C1.00214 7.53431 1.06686 7.68457 1.17998 7.79454L4.59608 11.1161L3.78901 15.8064C3.77008 15.9156 3.78219 16.0278 3.82396 16.1304C3.86572 16.233 3.93548 16.3218 4.02531 16.3869C4.11514 16.452 4.22146 16.4906 4.3322 16.4985C4.44295 16.5064 4.55369 16.4831 4.65187 16.4314L8.87504 14.217L13.0982 16.4314C13.2135 16.4926 13.3474 16.513 13.4757 16.4908C13.7993 16.4352 14.0169 16.1291 13.9611 15.8064L13.154 11.1161L16.5701 7.79454C16.6631 7.70367 16.7244 7.58497 16.743 7.45515C16.7932 7.13059 16.5664 6.83015 16.2409 6.78193Z'
                                            fill='#FDBE0F'
                                          />
                                        </svg>
                                        1
                                      </label>
                                    </div>
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className='flex flex-col h-screen px-4 overflow-y-auto bg-white md:col-span-9 pb-9 scroll-smooth scrollbar-hide'>
                        <div className='md:px-[30px] py-[22px] flex justify-between'>
                          <div className=''>
                            <div className='flex items-center gap-2'>
                              <svg
                                width='30'
                                height='30'
                                viewBox='0 0 30 30'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  d='M26.9426 11.8032L19.0733 10.6626L15.5556 3.55021C15.4595 3.35548 15.3014 3.19784 15.1062 3.10201C14.6165 2.86092 14.0214 3.06183 13.7766 3.55021L10.2588 10.6626L2.38957 11.8032C2.17261 11.8341 1.97426 11.9361 1.82239 12.0907C1.63879 12.2789 1.53762 12.5321 1.5411 12.7946C1.54459 13.0572 1.65245 13.3076 1.84098 13.4909L7.53448 19.0269L6.18937 26.8441C6.15782 27.0259 6.178 27.2129 6.24761 27.3839C6.31722 27.5549 6.43348 27.703 6.5832 27.8115C6.73292 27.9199 6.91011 27.9844 7.09468 27.9975C7.27926 28.0106 7.46383 27.9719 7.62746 27.8857L14.6661 24.1951L21.7047 27.8857C21.8969 27.9877 22.12 28.0217 22.3339 27.9847C22.8731 27.8919 23.2358 27.3819 23.1428 26.8441L21.7977 19.0269L27.4912 13.4909C27.6461 13.3394 27.7484 13.1416 27.7794 12.9252C27.8631 12.3843 27.485 11.8836 26.9426 11.8032Z'
                                  fill='#FDBE0F'
                                />
                              </svg>
                              <h1 className='text-[40px] text-[#212121]'>
                                4.8<label className='text-base text-[#6D7588]'>/5.0</label>
                              </h1>
                            </div>
                            <h1 className='text-black/[54%] text-xs'>2.155 rating • 788 ulasan</h1>
                          </div>
                          <div className='flex gap-[9px] items-center'>
                            <h1 className='text-[#212121] font-bold text-xs'>Urutkan</h1>
                            <div className='relative'>
                              <select className='bg-gray-50 text-[#A8A8A8] border border-gray-300 md:text-sm text-xs rounded-lg  block w-max p-2.5'>
                                <option
                                  value=''
                                  disabled
                                >
                                  Urutkan
                                </option>
                                <option>Terbaru</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className='border-b border-[#DDDDDD]'>
                          <div className='md:px-6 py-[22px] grid grid-cols-12'>
                            <div className='md:col-span-1 col-span-2 w-[45px] h-[45px]'>
                              <img
                                src={Wedding}
                                className='w-[45px] h-[45px] rounded-full'
                                alt=''
                              />
                            </div>
                            <div className='col-span-10 md:col-span-11'>
                              <div className=''>
                                <div className='flex items-center justify-between mb-2'>
                                  <h1 className='text-sm font-semibold text-cherry'>Syenny Magdalena</h1>
                                  <h1 className='text-[#848484] text-xs font-medium'>29 Maret 2023</h1>
                                </div>
                                <div className='flex gap-[6px] items-center mb-2'>
                                  <svg
                                    width='16'
                                    height='16'
                                    viewBox='0 0 16 16'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                  >
                                    <path
                                      d='M14.4342 6.02805L10.2373 5.41974L8.36116 1.62645C8.30992 1.5226 8.22561 1.43852 8.12148 1.38742C7.8603 1.25883 7.54293 1.36598 7.41235 1.62645L5.53621 5.41974L1.33928 6.02805C1.22357 6.04454 1.11778 6.09894 1.03678 6.18137C0.938864 6.28174 0.884906 6.41678 0.886765 6.55681C0.888625 6.69684 0.946151 6.8304 1.0467 6.92816L4.08323 9.88069L3.36584 14.0498C3.34902 14.1468 3.35978 14.2466 3.3969 14.3378C3.43403 14.429 3.49603 14.508 3.57588 14.5658C3.65573 14.6236 3.75024 14.658 3.84868 14.665C3.94712 14.672 4.04555 14.6514 4.13282 14.6054L7.88675 12.637L11.6407 14.6054C11.7432 14.6598 11.8622 14.6779 11.9762 14.6582C12.2639 14.6087 12.4573 14.3367 12.4077 14.0498L11.6903 9.88069L14.7268 6.92816C14.8095 6.84738 14.864 6.74187 14.8805 6.62647C14.9252 6.33798 14.7235 6.07092 14.4342 6.02805Z'
                                      fill='#FDBE0F'
                                    />
                                  </svg>
                                  <svg
                                    width='16'
                                    height='16'
                                    viewBox='0 0 16 16'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                  >
                                    <path
                                      d='M14.4342 6.02805L10.2373 5.41974L8.36116 1.62645C8.30992 1.5226 8.22561 1.43852 8.12148 1.38742C7.8603 1.25883 7.54293 1.36598 7.41235 1.62645L5.53621 5.41974L1.33928 6.02805C1.22357 6.04454 1.11778 6.09894 1.03678 6.18137C0.938864 6.28174 0.884906 6.41678 0.886765 6.55681C0.888625 6.69684 0.946151 6.8304 1.0467 6.92816L4.08323 9.88069L3.36584 14.0498C3.34902 14.1468 3.35978 14.2466 3.3969 14.3378C3.43403 14.429 3.49603 14.508 3.57588 14.5658C3.65573 14.6236 3.75024 14.658 3.84868 14.665C3.94712 14.672 4.04555 14.6514 4.13282 14.6054L7.88675 12.637L11.6407 14.6054C11.7432 14.6598 11.8622 14.6779 11.9762 14.6582C12.2639 14.6087 12.4573 14.3367 12.4077 14.0498L11.6903 9.88069L14.7268 6.92816C14.8095 6.84738 14.864 6.74187 14.8805 6.62647C14.9252 6.33798 14.7235 6.07092 14.4342 6.02805Z'
                                      fill='#FDBE0F'
                                    />
                                  </svg>
                                  <svg
                                    width='16'
                                    height='16'
                                    viewBox='0 0 16 16'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                  >
                                    <path
                                      d='M14.4342 6.02805L10.2373 5.41974L8.36116 1.62645C8.30992 1.5226 8.22561 1.43852 8.12148 1.38742C7.8603 1.25883 7.54293 1.36598 7.41235 1.62645L5.53621 5.41974L1.33928 6.02805C1.22357 6.04454 1.11778 6.09894 1.03678 6.18137C0.938864 6.28174 0.884906 6.41678 0.886765 6.55681C0.888625 6.69684 0.946151 6.8304 1.0467 6.92816L4.08323 9.88069L3.36584 14.0498C3.34902 14.1468 3.35978 14.2466 3.3969 14.3378C3.43403 14.429 3.49603 14.508 3.57588 14.5658C3.65573 14.6236 3.75024 14.658 3.84868 14.665C3.94712 14.672 4.04555 14.6514 4.13282 14.6054L7.88675 12.637L11.6407 14.6054C11.7432 14.6598 11.8622 14.6779 11.9762 14.6582C12.2639 14.6087 12.4573 14.3367 12.4077 14.0498L11.6903 9.88069L14.7268 6.92816C14.8095 6.84738 14.864 6.74187 14.8805 6.62647C14.9252 6.33798 14.7235 6.07092 14.4342 6.02805Z'
                                      fill='#FDBE0F'
                                    />
                                  </svg>
                                  <svg
                                    width='16'
                                    height='16'
                                    viewBox='0 0 16 16'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                  >
                                    <path
                                      d='M14.4342 6.02805L10.2373 5.41974L8.36116 1.62645C8.30992 1.5226 8.22561 1.43852 8.12148 1.38742C7.8603 1.25883 7.54293 1.36598 7.41235 1.62645L5.53621 5.41974L1.33928 6.02805C1.22357 6.04454 1.11778 6.09894 1.03678 6.18137C0.938864 6.28174 0.884906 6.41678 0.886765 6.55681C0.888625 6.69684 0.946151 6.8304 1.0467 6.92816L4.08323 9.88069L3.36584 14.0498C3.34902 14.1468 3.35978 14.2466 3.3969 14.3378C3.43403 14.429 3.49603 14.508 3.57588 14.5658C3.65573 14.6236 3.75024 14.658 3.84868 14.665C3.94712 14.672 4.04555 14.6514 4.13282 14.6054L7.88675 12.637L11.6407 14.6054C11.7432 14.6598 11.8622 14.6779 11.9762 14.6582C12.2639 14.6087 12.4573 14.3367 12.4077 14.0498L11.6903 9.88069L14.7268 6.92816C14.8095 6.84738 14.864 6.74187 14.8805 6.62647C14.9252 6.33798 14.7235 6.07092 14.4342 6.02805Z'
                                      fill='#FDBE0F'
                                    />
                                  </svg>
                                  <svg
                                    width='16'
                                    height='16'
                                    viewBox='0 0 16 16'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                  >
                                    <path
                                      d='M14.4342 6.02805L10.2373 5.41974L8.36116 1.62645C8.30992 1.5226 8.22561 1.43852 8.12148 1.38742C7.8603 1.25883 7.54293 1.36598 7.41235 1.62645L5.53621 5.41974L1.33928 6.02805C1.22357 6.04454 1.11778 6.09894 1.03678 6.18137C0.938864 6.28174 0.884906 6.41678 0.886765 6.55681C0.888625 6.69684 0.946151 6.8304 1.0467 6.92816L4.08323 9.88069L3.36584 14.0498C3.34902 14.1468 3.35978 14.2466 3.3969 14.3378C3.43403 14.429 3.49603 14.508 3.57588 14.5658C3.65573 14.6236 3.75024 14.658 3.84868 14.665C3.94712 14.672 4.04555 14.6514 4.13282 14.6054L7.88675 12.637L11.6407 14.6054C11.7432 14.6598 11.8622 14.6779 11.9762 14.6582C12.2639 14.6087 12.4573 14.3367 12.4077 14.0498L11.6903 9.88069L14.7268 6.92816C14.8095 6.84738 14.864 6.74187 14.8805 6.62647C14.9252 6.33798 14.7235 6.07092 14.4342 6.02805Z'
                                      fill='#FDBE0F'
                                    />
                                  </svg>
                                </div>
                                <div className='border-b border-[#DDDDDD] flex gap-2 items-center pb-4'>
                                  <img
                                    src={Wedding}
                                    className='w-[41px] h-[41px] rounded-sm'
                                    alt=''
                                  />
                                  <h1 className='text-xs text-[#848484] font-medium'>
                                    Outdoor Festival Kanaya Space Concept{' '}
                                  </h1>
                                </div>
                                <div className='mt-4'>
                                  <h1 className='text-xs text-[#555555] font-bold mb-1.5'>
                                    thankyouu mbak udah dibantu sampai hari H❤️
                                  </h1>
                                  <h1 className='text-[13px] text-[#848484] font-medium mb-1.5'>
                                    thankyouu mbak udah dibantu sampai hari H dan pastinya fast respon banget sih meski
                                    chat malem” pun tetap di respon sama mbak dama, thankyou juga buat ci sasa & team
                                    make up. Thankyou juga untuk mas simon & team yang bisa bawa suasana jadi gak kaku”
                                    amat hahaha, thankyouu alissha bride meski sempet maju mundur mau pakai alissha
                                    ujung”nya tetap ambil paket di allisha❤️
                                  </h1>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='border-b border-[#DDDDDD]'>
                          <div className='md:px-6 py-[22px] grid grid-cols-12'>
                            <div className='md:col-span-1 col-span-2 w-[45px] h-[45px]'>
                              <img
                                src={Wedding}
                                className='w-[45px] h-[45px] rounded-full'
                                alt=''
                              />
                            </div>
                            <div className='col-span-10 md:col-span-11'>
                              <div className=''>
                                <div className='flex items-center justify-between mb-2'>
                                  <h1 className='text-sm font-semibold text-cherry'>Syenny Magdalena</h1>
                                  <h1 className='text-[#848484] text-xs font-medium'>29 Maret 2023</h1>
                                </div>
                                <div className='flex gap-[6px] items-center mb-2'>
                                  <svg
                                    width='16'
                                    height='16'
                                    viewBox='0 0 16 16'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                  >
                                    <path
                                      d='M14.4342 6.02805L10.2373 5.41974L8.36116 1.62645C8.30992 1.5226 8.22561 1.43852 8.12148 1.38742C7.8603 1.25883 7.54293 1.36598 7.41235 1.62645L5.53621 5.41974L1.33928 6.02805C1.22357 6.04454 1.11778 6.09894 1.03678 6.18137C0.938864 6.28174 0.884906 6.41678 0.886765 6.55681C0.888625 6.69684 0.946151 6.8304 1.0467 6.92816L4.08323 9.88069L3.36584 14.0498C3.34902 14.1468 3.35978 14.2466 3.3969 14.3378C3.43403 14.429 3.49603 14.508 3.57588 14.5658C3.65573 14.6236 3.75024 14.658 3.84868 14.665C3.94712 14.672 4.04555 14.6514 4.13282 14.6054L7.88675 12.637L11.6407 14.6054C11.7432 14.6598 11.8622 14.6779 11.9762 14.6582C12.2639 14.6087 12.4573 14.3367 12.4077 14.0498L11.6903 9.88069L14.7268 6.92816C14.8095 6.84738 14.864 6.74187 14.8805 6.62647C14.9252 6.33798 14.7235 6.07092 14.4342 6.02805Z'
                                      fill='#FDBE0F'
                                    />
                                  </svg>
                                  <svg
                                    width='16'
                                    height='16'
                                    viewBox='0 0 16 16'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                  >
                                    <path
                                      d='M14.4342 6.02805L10.2373 5.41974L8.36116 1.62645C8.30992 1.5226 8.22561 1.43852 8.12148 1.38742C7.8603 1.25883 7.54293 1.36598 7.41235 1.62645L5.53621 5.41974L1.33928 6.02805C1.22357 6.04454 1.11778 6.09894 1.03678 6.18137C0.938864 6.28174 0.884906 6.41678 0.886765 6.55681C0.888625 6.69684 0.946151 6.8304 1.0467 6.92816L4.08323 9.88069L3.36584 14.0498C3.34902 14.1468 3.35978 14.2466 3.3969 14.3378C3.43403 14.429 3.49603 14.508 3.57588 14.5658C3.65573 14.6236 3.75024 14.658 3.84868 14.665C3.94712 14.672 4.04555 14.6514 4.13282 14.6054L7.88675 12.637L11.6407 14.6054C11.7432 14.6598 11.8622 14.6779 11.9762 14.6582C12.2639 14.6087 12.4573 14.3367 12.4077 14.0498L11.6903 9.88069L14.7268 6.92816C14.8095 6.84738 14.864 6.74187 14.8805 6.62647C14.9252 6.33798 14.7235 6.07092 14.4342 6.02805Z'
                                      fill='#FDBE0F'
                                    />
                                  </svg>
                                  <svg
                                    width='16'
                                    height='16'
                                    viewBox='0 0 16 16'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                  >
                                    <path
                                      d='M14.4342 6.02805L10.2373 5.41974L8.36116 1.62645C8.30992 1.5226 8.22561 1.43852 8.12148 1.38742C7.8603 1.25883 7.54293 1.36598 7.41235 1.62645L5.53621 5.41974L1.33928 6.02805C1.22357 6.04454 1.11778 6.09894 1.03678 6.18137C0.938864 6.28174 0.884906 6.41678 0.886765 6.55681C0.888625 6.69684 0.946151 6.8304 1.0467 6.92816L4.08323 9.88069L3.36584 14.0498C3.34902 14.1468 3.35978 14.2466 3.3969 14.3378C3.43403 14.429 3.49603 14.508 3.57588 14.5658C3.65573 14.6236 3.75024 14.658 3.84868 14.665C3.94712 14.672 4.04555 14.6514 4.13282 14.6054L7.88675 12.637L11.6407 14.6054C11.7432 14.6598 11.8622 14.6779 11.9762 14.6582C12.2639 14.6087 12.4573 14.3367 12.4077 14.0498L11.6903 9.88069L14.7268 6.92816C14.8095 6.84738 14.864 6.74187 14.8805 6.62647C14.9252 6.33798 14.7235 6.07092 14.4342 6.02805Z'
                                      fill='#FDBE0F'
                                    />
                                  </svg>
                                  <svg
                                    width='16'
                                    height='16'
                                    viewBox='0 0 16 16'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                  >
                                    <path
                                      d='M14.4342 6.02805L10.2373 5.41974L8.36116 1.62645C8.30992 1.5226 8.22561 1.43852 8.12148 1.38742C7.8603 1.25883 7.54293 1.36598 7.41235 1.62645L5.53621 5.41974L1.33928 6.02805C1.22357 6.04454 1.11778 6.09894 1.03678 6.18137C0.938864 6.28174 0.884906 6.41678 0.886765 6.55681C0.888625 6.69684 0.946151 6.8304 1.0467 6.92816L4.08323 9.88069L3.36584 14.0498C3.34902 14.1468 3.35978 14.2466 3.3969 14.3378C3.43403 14.429 3.49603 14.508 3.57588 14.5658C3.65573 14.6236 3.75024 14.658 3.84868 14.665C3.94712 14.672 4.04555 14.6514 4.13282 14.6054L7.88675 12.637L11.6407 14.6054C11.7432 14.6598 11.8622 14.6779 11.9762 14.6582C12.2639 14.6087 12.4573 14.3367 12.4077 14.0498L11.6903 9.88069L14.7268 6.92816C14.8095 6.84738 14.864 6.74187 14.8805 6.62647C14.9252 6.33798 14.7235 6.07092 14.4342 6.02805Z'
                                      fill='#FDBE0F'
                                    />
                                  </svg>
                                  <svg
                                    width='16'
                                    height='16'
                                    viewBox='0 0 16 16'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                  >
                                    <path
                                      d='M14.4342 6.02805L10.2373 5.41974L8.36116 1.62645C8.30992 1.5226 8.22561 1.43852 8.12148 1.38742C7.8603 1.25883 7.54293 1.36598 7.41235 1.62645L5.53621 5.41974L1.33928 6.02805C1.22357 6.04454 1.11778 6.09894 1.03678 6.18137C0.938864 6.28174 0.884906 6.41678 0.886765 6.55681C0.888625 6.69684 0.946151 6.8304 1.0467 6.92816L4.08323 9.88069L3.36584 14.0498C3.34902 14.1468 3.35978 14.2466 3.3969 14.3378C3.43403 14.429 3.49603 14.508 3.57588 14.5658C3.65573 14.6236 3.75024 14.658 3.84868 14.665C3.94712 14.672 4.04555 14.6514 4.13282 14.6054L7.88675 12.637L11.6407 14.6054C11.7432 14.6598 11.8622 14.6779 11.9762 14.6582C12.2639 14.6087 12.4573 14.3367 12.4077 14.0498L11.6903 9.88069L14.7268 6.92816C14.8095 6.84738 14.864 6.74187 14.8805 6.62647C14.9252 6.33798 14.7235 6.07092 14.4342 6.02805Z'
                                      fill='#FDBE0F'
                                    />
                                  </svg>
                                </div>
                                <div className='border-b border-[#DDDDDD] flex gap-2 items-center pb-4'>
                                  <img
                                    src={Wedding}
                                    className='w-[41px] h-[41px] rounded-sm'
                                    alt=''
                                  />
                                  <h1 className='text-xs text-[#848484] font-medium'>
                                    Outdoor Festival Kanaya Space Concept{' '}
                                  </h1>
                                </div>
                                <div className='mt-4'>
                                  <h1 className='text-xs text-[#555555] font-bold mb-1.5'>
                                    thankyouu mbak udah dibantu sampai hari H❤️
                                  </h1>
                                  <h1 className='text-[13px] text-[#848484] font-medium mb-1.5'>
                                    thankyouu mbak udah dibantu sampai hari H dan pastinya fast respon banget sih meski
                                    chat malem” pun tetap di respon sama mbak dama, thankyou juga buat ci sasa & team
                                    make up. Thankyou juga untuk mas simon & team yang bisa bawa suasana jadi gak kaku”
                                    amat hahaha, thankyouu alissha bride meski sempet maju mundur mau pakai alissha
                                    ujung”nya tetap ambil paket di allisha❤️
                                  </h1>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='border-b border-[#DDDDDD]'>
                          <div className='md:px-6 py-[22px] grid grid-cols-12'>
                            <div className='md:col-span-1 col-span-2 w-[45px] h-[45px]'>
                              <img
                                src={Wedding}
                                className='w-[45px] h-[45px] rounded-full'
                                alt=''
                              />
                            </div>
                            <div className='col-span-10 md:col-span-11'>
                              <div className=''>
                                <div className='flex items-center justify-between mb-2'>
                                  <h1 className='text-sm font-semibold text-cherry'>Syenny Magdalena</h1>
                                  <h1 className='text-[#848484] text-xs font-medium'>29 Maret 2023</h1>
                                </div>
                                <div className='flex gap-[6px] items-center mb-2'>
                                  <svg
                                    width='16'
                                    height='16'
                                    viewBox='0 0 16 16'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                  >
                                    <path
                                      d='M14.4342 6.02805L10.2373 5.41974L8.36116 1.62645C8.30992 1.5226 8.22561 1.43852 8.12148 1.38742C7.8603 1.25883 7.54293 1.36598 7.41235 1.62645L5.53621 5.41974L1.33928 6.02805C1.22357 6.04454 1.11778 6.09894 1.03678 6.18137C0.938864 6.28174 0.884906 6.41678 0.886765 6.55681C0.888625 6.69684 0.946151 6.8304 1.0467 6.92816L4.08323 9.88069L3.36584 14.0498C3.34902 14.1468 3.35978 14.2466 3.3969 14.3378C3.43403 14.429 3.49603 14.508 3.57588 14.5658C3.65573 14.6236 3.75024 14.658 3.84868 14.665C3.94712 14.672 4.04555 14.6514 4.13282 14.6054L7.88675 12.637L11.6407 14.6054C11.7432 14.6598 11.8622 14.6779 11.9762 14.6582C12.2639 14.6087 12.4573 14.3367 12.4077 14.0498L11.6903 9.88069L14.7268 6.92816C14.8095 6.84738 14.864 6.74187 14.8805 6.62647C14.9252 6.33798 14.7235 6.07092 14.4342 6.02805Z'
                                      fill='#FDBE0F'
                                    />
                                  </svg>
                                  <svg
                                    width='16'
                                    height='16'
                                    viewBox='0 0 16 16'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                  >
                                    <path
                                      d='M14.4342 6.02805L10.2373 5.41974L8.36116 1.62645C8.30992 1.5226 8.22561 1.43852 8.12148 1.38742C7.8603 1.25883 7.54293 1.36598 7.41235 1.62645L5.53621 5.41974L1.33928 6.02805C1.22357 6.04454 1.11778 6.09894 1.03678 6.18137C0.938864 6.28174 0.884906 6.41678 0.886765 6.55681C0.888625 6.69684 0.946151 6.8304 1.0467 6.92816L4.08323 9.88069L3.36584 14.0498C3.34902 14.1468 3.35978 14.2466 3.3969 14.3378C3.43403 14.429 3.49603 14.508 3.57588 14.5658C3.65573 14.6236 3.75024 14.658 3.84868 14.665C3.94712 14.672 4.04555 14.6514 4.13282 14.6054L7.88675 12.637L11.6407 14.6054C11.7432 14.6598 11.8622 14.6779 11.9762 14.6582C12.2639 14.6087 12.4573 14.3367 12.4077 14.0498L11.6903 9.88069L14.7268 6.92816C14.8095 6.84738 14.864 6.74187 14.8805 6.62647C14.9252 6.33798 14.7235 6.07092 14.4342 6.02805Z'
                                      fill='#FDBE0F'
                                    />
                                  </svg>
                                  <svg
                                    width='16'
                                    height='16'
                                    viewBox='0 0 16 16'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                  >
                                    <path
                                      d='M14.4342 6.02805L10.2373 5.41974L8.36116 1.62645C8.30992 1.5226 8.22561 1.43852 8.12148 1.38742C7.8603 1.25883 7.54293 1.36598 7.41235 1.62645L5.53621 5.41974L1.33928 6.02805C1.22357 6.04454 1.11778 6.09894 1.03678 6.18137C0.938864 6.28174 0.884906 6.41678 0.886765 6.55681C0.888625 6.69684 0.946151 6.8304 1.0467 6.92816L4.08323 9.88069L3.36584 14.0498C3.34902 14.1468 3.35978 14.2466 3.3969 14.3378C3.43403 14.429 3.49603 14.508 3.57588 14.5658C3.65573 14.6236 3.75024 14.658 3.84868 14.665C3.94712 14.672 4.04555 14.6514 4.13282 14.6054L7.88675 12.637L11.6407 14.6054C11.7432 14.6598 11.8622 14.6779 11.9762 14.6582C12.2639 14.6087 12.4573 14.3367 12.4077 14.0498L11.6903 9.88069L14.7268 6.92816C14.8095 6.84738 14.864 6.74187 14.8805 6.62647C14.9252 6.33798 14.7235 6.07092 14.4342 6.02805Z'
                                      fill='#FDBE0F'
                                    />
                                  </svg>
                                  <svg
                                    width='16'
                                    height='16'
                                    viewBox='0 0 16 16'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                  >
                                    <path
                                      d='M14.4342 6.02805L10.2373 5.41974L8.36116 1.62645C8.30992 1.5226 8.22561 1.43852 8.12148 1.38742C7.8603 1.25883 7.54293 1.36598 7.41235 1.62645L5.53621 5.41974L1.33928 6.02805C1.22357 6.04454 1.11778 6.09894 1.03678 6.18137C0.938864 6.28174 0.884906 6.41678 0.886765 6.55681C0.888625 6.69684 0.946151 6.8304 1.0467 6.92816L4.08323 9.88069L3.36584 14.0498C3.34902 14.1468 3.35978 14.2466 3.3969 14.3378C3.43403 14.429 3.49603 14.508 3.57588 14.5658C3.65573 14.6236 3.75024 14.658 3.84868 14.665C3.94712 14.672 4.04555 14.6514 4.13282 14.6054L7.88675 12.637L11.6407 14.6054C11.7432 14.6598 11.8622 14.6779 11.9762 14.6582C12.2639 14.6087 12.4573 14.3367 12.4077 14.0498L11.6903 9.88069L14.7268 6.92816C14.8095 6.84738 14.864 6.74187 14.8805 6.62647C14.9252 6.33798 14.7235 6.07092 14.4342 6.02805Z'
                                      fill='#FDBE0F'
                                    />
                                  </svg>
                                  <svg
                                    width='16'
                                    height='16'
                                    viewBox='0 0 16 16'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                  >
                                    <path
                                      d='M14.4342 6.02805L10.2373 5.41974L8.36116 1.62645C8.30992 1.5226 8.22561 1.43852 8.12148 1.38742C7.8603 1.25883 7.54293 1.36598 7.41235 1.62645L5.53621 5.41974L1.33928 6.02805C1.22357 6.04454 1.11778 6.09894 1.03678 6.18137C0.938864 6.28174 0.884906 6.41678 0.886765 6.55681C0.888625 6.69684 0.946151 6.8304 1.0467 6.92816L4.08323 9.88069L3.36584 14.0498C3.34902 14.1468 3.35978 14.2466 3.3969 14.3378C3.43403 14.429 3.49603 14.508 3.57588 14.5658C3.65573 14.6236 3.75024 14.658 3.84868 14.665C3.94712 14.672 4.04555 14.6514 4.13282 14.6054L7.88675 12.637L11.6407 14.6054C11.7432 14.6598 11.8622 14.6779 11.9762 14.6582C12.2639 14.6087 12.4573 14.3367 12.4077 14.0498L11.6903 9.88069L14.7268 6.92816C14.8095 6.84738 14.864 6.74187 14.8805 6.62647C14.9252 6.33798 14.7235 6.07092 14.4342 6.02805Z'
                                      fill='#FDBE0F'
                                    />
                                  </svg>
                                </div>
                                <div className='border-b border-[#DDDDDD] flex gap-2 items-center pb-4'>
                                  <img
                                    src={Wedding}
                                    className='w-[41px] h-[41px] rounded-sm'
                                    alt=''
                                  />
                                  <h1 className='text-xs text-[#848484] font-medium'>
                                    Outdoor Festival Kanaya Space Concept{' '}
                                  </h1>
                                </div>
                                <div className='mt-4'>
                                  <h1 className='text-xs text-[#555555] font-bold mb-1.5'>
                                    thankyouu mbak udah dibantu sampai hari H❤️
                                  </h1>
                                  <h1 className='text-[13px] text-[#848484] font-medium mb-1.5'>
                                    thankyouu mbak udah dibantu sampai hari H dan pastinya fast respon banget sih meski
                                    chat malem” pun tetap di respon sama mbak dama, thankyou juga buat ci sasa & team
                                    make up. Thankyou juga untuk mas simon & team yang bisa bawa suasana jadi gak kaku”
                                    amat hahaha, thankyouu alissha bride meski sempet maju mundur mau pakai alissha
                                    ujung”nya tetap ambil paket di allisha❤️
                                  </h1>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={openTab === 4 ? 'block' : 'hidden'}
                    id='link4'
                  >
                    <div className='bg-white rounded-xl md:py-[38px] md:px-[47px] px-7 py-6'>
                      <div className='mb-6'>
                        <h1 className='text-[#555555] text-xl font-semibold mb-6'>Layanan</h1>
                        <h1 className='text-base font-semibold text-primary'>{companyData.website_type}</h1>
                      </div>
                      <div className='mb-6'>
                        <h1 className='text-[#555555] text-xl font-semibold mb-6'>Lokasi</h1>
                        <h1 className='text-base font-semibold text-primary'>{companyData.city}, {companyData.province}</h1>
                      </div>
                      <div className='mb-6'>
                        <h1 className='text-[#555555] text-xl font-semibold mb-6'>Alamat</h1>
                        <h1 className='text-base font-semibold text-primary'>{companyData.address}</h1>
                      </div>
                      <div className='mb-6'>
                        <h1 className='text-[#555555] text-xl font-semibold mb-6'>Deskripsi </h1>
                        <h1 className='text-base font-semibold text-primary'>{companyData.description}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Toko;
