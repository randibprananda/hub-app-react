import 'cropperjs/dist/cropper.css';

import { useFormik } from 'formik';
import { Fragment, useRef, useState } from 'react';
import Cropper from 'react-cropper';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import tw from 'twin.macro';
import * as yup from 'yup';
import { shallow } from 'zustand/shallow';

import { Dialog, Transition } from '@headlessui/react';

import {
  ErrorIcon,
  IconArrowLeft,
  IconCheckWhite,
  IconChecklistPrimary,
  IconDelete,
  IconDrag,
  IconNext,
  IconStarYellow,
  IconSupplierCherry,
  Wedding,
} from '../../../../../../assets';
import { Card8 } from '../../../../../../component';
import { useDeleteBannerShopDecoration } from '../../../../../../features/partner/dekorasi-toko/useDeleteBannerShopDecoration';
import { useFetchBannersShopDecoration } from '../../../../../../features/partner/dekorasi-toko/useFetchBannersShopDecoration';
import { useShopDecorationStore } from '../../../../../../stores/useShopDecorationStore';
import { ToastSuccess } from '../../../../../../utils/toast';

const ErrorText = tw.p` text-red-500 text-sm font-[400]`;

const PengaturanBanner = ({ sendDataToParrent }) => {
  // State global
  const [
    leftMenuActive,
    rightMenuActive,
    isNewBanner,
    filterProduk,
    bannerType,
    setLeftMenuActive,
    setRightMenuActive,
    setIsNewBanner,
    setFilterProduk,
    setBannerType,
  ] = useShopDecorationStore(
    (state) => [
      state.leftMenuActive,
      state.rightMenuActive,
      state.isNewBanner,
      state.filterProduk,
      state.bannerType,
      state.setLeftMenuActive,
      state.setRightMenuActive,
      state.setIsNewBanner,
      state.setFilterProduk,
      state.setBannerType,
    ],
    shallow,
  );

  const [checked, setChecked] = useState(false);
  const [activeBanner2, setActiveBanner2] = useState(0);
  const [stepp, setStepp] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [cropData, setCropData] = useState('#');
  const [cropper, setCropper] = useState(null);
  const inputFileRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAccordionClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleOptionClick = () => {
    console.log('test');
  };

  const handleImageUpload = () => {
    console.log('aw');
  };

  const handleClose = () => {
    console.log('iw');
  };

  const handleCrop = () => {
    console.log('crop');
  };

  const bannerForm = useFormik({
    initialValues: {
      name: '',
      banner_type: '',
      banner_order: 0,
      banner_images: [],
    },
    onSubmit: () => {
      console.log('Submitted');
    },
    validationSchema: yup.object().shape({
      name: yup.string().required('Kolom ini wajib diisi'),
      banner_type: yup.string().required('Pilih salah satu opsi'),
    }),
  });

  const newBannerForm = useFormik({
    initialValues: {
      name: 'Banner baru',
      banner_type: '',
      banner_order: 0,
      banner_images: [],
    },
    onSubmit: () => {
      console.log('Submitted');
    },
    validationSchema: yup.object().shape({
      name: yup.string().required('Kolom ini wajib diisi'),
      banner_type: yup.string().required('Pilih salah satu opsi'),
    }),
  });

  // Fetch
  const {
    data: dataBanners,
    isLoading: isLoadingDataBanners,
    refetch: refetchDataBanners,
    isError: isErrorDataBanners,
  } = useFetchBannersShopDecoration();

  const { mutate: deleteBanner } = useDeleteBannerShopDecoration({
    onSuccess: () => {
      ToastSuccess('Banner terhapus');
      refetchDataBanners();
    },
  });

  return (
    <div className='bg-white min-h-[279px] md:min-h-[522px] w-full rounded-[12px]'>
      <div className='md:px-7 md:py-7 px-[18px] py-[14px] border-b-2 flex justify-between items-center'>
        <div className='flex items-center gap-[16px]'>
          <button
            onClick={() => {
              setLeftMenuActive(1);
            }}>
            <img
              src={IconArrowLeft}
              alt=''
            />
          </button>
          <h1 className='font-semibold font-inter text-[12px] md:text-[20px] text-black-k'>Pengaturan Banner </h1>
        </div>
        {!isLoadingDataBanners && !isErrorDataBanners && (
          <div>
            <div className='flex items-center gap-3'>
              <h1 className='md:text-[18px] text-[12px] font-semibold text-dark-4'>Edit</h1>
              <label className='relative inline-flex items-center mr-5 cursor-pointer'>
                <input
                  type='checkbox'
                  className='sr-only peer'
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cherry"></div>
              </label>
            </div>
          </div>
        )}
      </div>
      <div className='p-[28px] md:h-[300px] h-[200px] overflow-y-auto scrollbar-hide space-y-5'>
        {!isLoadingDataBanners &&
          !isErrorDataBanners &&
          dataBanners.map((banner) => {
            return (
              <div
                className='w-full space-y-[10px]'
                key={banner.id}>
                <div className='flex justify-between px-[24px] py-[10px] md:py-[19px] rounded-md border-2 hover:bg-gray-50'>
                  <h1 className='font-semibold font-inter md:text-[18px] text-[12px] text-black-k'>{banner.name}</h1>
                  {checked ? (
                    <div className='flex items-center gap-4'>
                      <button
                        onClick={() => {
                          deleteBanner(banner.id);
                          refetchDataBanners();
                        }}>
                        <img
                          src={IconDelete}
                          alt=''
                        />
                      </button>
                      <button>
                        <img
                          src={IconDrag}
                          alt=''
                        />
                      </button>
                    </div>
                  ) : (
                    <button onClick={handleAccordionClick}>
                      <img
                        src={IconNext}
                        className={`${isExpanded ? 'transform rotate-90' : ''} transition-transform duration-300`}
                        alt=''
                      />
                    </button>
                  )}
                </div>
                {isExpanded && (
                  <div className='space-y-5'>
                    <form onSubmit={bannerForm.handleSubmit}>
                      <div className='relative w-full'>
                        <h1 className='md:text-base text-xs text-[#2E3A44]/80 font-semibold mb-2'>Nama Banner</h1>
                        <input
                          type='text'
                          id=''
                          className='rounded-[12px] outline-none border border-outline-2 w-full md:px-4 md:py-4 bg-white px-[10px] py-[10px] text-fill md:text-sm text-xs font-[500]'
                          placeholder='Masukan nama banner..'
                          required
                        />
                        {bannerForm.errors.name && bannerForm.touched.name && (
                          <div className='flex items-center mt-2 gap-x-1'>
                            <img
                              src={ErrorIcon}
                              alt='Error'
                            />
                            <ErrorText>{bannerForm.errors.name}</ErrorText>
                          </div>
                        )}
                      </div>
                      <div className='relative w-full'>
                        <h1 className='md:text-base text-xs text-[#2E3A44]/80 font-semibold mb-2'>Ukuran Banner</h1>
                        <div className='relative'>
                          <div
                            className='flex justify-between w-full p-10 px-4 py-2 text-xs leading-tight text-gray-700 bg-white border rounded-[12px] border-outline-2 focus:outline-none focus:border-blue-500 md:text-sm md:p-4 cursor-pointer'
                            onClick={() => setIsOpen(!isOpen)}>
                            <span>
                              {bannerForm.values.banner_type === 'BESAR'
                                ? 'Banner Besar'
                                : bannerForm.values.banner_type === 'SLIDE'
                                ? 'Banner Slider'
                                : 'Pilih Ukuran Banner'}
                            </span>
                            <svg
                              className='w-4 h-4 mt-1 ml-2'
                              viewBox='0 0 20 20'
                              fill='currentColor'>
                              <path
                                fillRule='evenodd'
                                d='M5.293 7.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
                                clipRule='evenodd'
                              />
                            </svg>
                          </div>
                          <ul
                            className={`absolute left-0 w-full bg-white rounded-md md:text-sm text-xs shadow-md overflow-hidden transition-all duration-300 ease-in-out text-black ${
                              isOpen ? '' : 'hidden'
                            }`}>
                            <li
                              className='p-4 text-xs cursor-pointer hover:bg-gray-100 md:text-sm'
                              onClick={() => {
                                bannerForm.setFieldValue('banner_type', 'BESAR');
                                setIsOpen((prev) => !prev);
                              }}>
                              Banner Besar
                            </li>
                            <li
                              className='p-4 text-xs cursor-pointer hover:bg-gray-100 md:text-sm'
                              onClick={() => {
                                bannerForm.setFieldValue('banner_type', 'SLIDE');
                                setIsOpen((prev) => !prev);
                              }}>
                              Banner Slider
                            </li>
                          </ul>
                          {bannerForm.errors.banner_type && bannerForm.touched.banner_type && (
                            <div className='flex items-center mt-2 gap-x-1'>
                              <img
                                src={ErrorIcon}
                                alt='Error'
                              />
                              <ErrorText>{bannerForm.errors.banner_type}</ErrorText>
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <h1 className='md:text-base text-xs font-semibold text-[#2E3A44]/80 mb-2'>Ukuran Banner</h1>
                        <h1 className='md:text-sm text-[10px] font-[500] text-[#2E3A44]/40 mb-2 italic'>
                          **Ukuran optimal 1500 x 750 piksel dengan format JPG, JPEG, atau PNG. Ukuran file maks 2 MB.
                          Jumlah maks. 5 banner
                        </h1>
                      </div>

                      <div className='flex items-center justify-between'>
                        <h1 className='md:text-base text-xs font-semibold text-[#2E3A44]/80'>Banner 1</h1>
                        <button>
                          <svg
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path
                              d='M11 18C11 19.1 10.1 20 9 20C7.9 20 7 19.1 7 18C7 16.9 7.9 16 9 16C10.1 16 11 16.9 11 18ZM9 10C7.9 10 7 10.9 7 12C7 13.1 7.9 14 9 14C10.1 14 11 13.1 11 12C11 10.9 10.1 10 9 10ZM9 4C7.9 4 7 4.9 7 6C7 7.1 7.9 8 9 8C10.1 8 11 7.1 11 6C11 4.9 10.1 4 9 4ZM15 8C16.1 8 17 7.1 17 6C17 4.9 16.1 4 15 4C13.9 4 13 4.9 13 6C13 7.1 13.9 8 15 8ZM15 10C13.9 10 13 10.9 13 12C13 13.1 13.9 14 15 14C16.1 14 17 13.1 17 12C17 10.9 16.1 10 15 10ZM15 16C13.9 16 13 16.9 13 18C13 19.1 13.9 20 15 20C16.1 20 17 19.1 17 18C17 16.9 16.1 16 15 16Z'
                              fill='#2E3A44'
                            />
                          </svg>
                        </button>
                      </div>
                      <div className='flex justify-center'>
                        <div className='flex items-center justify-center w-full h-auto mt-4 shadow-lg rounded-xl'>
                          {cropData !== '#' ? (
                            <img
                              src={cropData}
                              alt='Crop Preview'
                              className='w-64 h-64 cursor-pointer'
                              onClick={() => inputFileRef.current.click()}
                            />
                          ) : (
                            <label
                              htmlFor='fileInput'
                              className='relative flex flex-col items-center w-full h-56 cursor-pointer'>
                              <div className='absolute inset-0 flex flex-col items-center justify-center'>
                                <svg
                                  width='48'
                                  height='49'
                                  viewBox='0 0 48 49'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'>
                                  <path
                                    d='M13 40.7448C9.96 40.7448 7.36667 39.6981 5.22 37.6048C3.07333 35.4981 2 32.9314 2 29.9048C2 27.3048 2.78 24.9848 4.34 22.9448C5.91333 20.9048 7.96667 19.6048 10.5 19.0448C11.34 15.9781 13.0067 13.4981 15.5 11.6048C18.0067 9.69808 20.84 8.74475 24 8.74475C27.9067 8.74475 31.2133 10.1048 33.92 12.8248C36.64 15.5314 38 18.8381 38 22.7448C40.3067 23.0114 42.2133 24.0114 43.72 25.7448C45.24 27.4514 46 29.4514 46 31.7448C46 34.2514 45.1267 36.3781 43.38 38.1248C41.6333 39.8714 39.5067 40.7448 37 40.7448H26C24.9067 40.7448 23.9667 40.3514 23.18 39.5648C22.3933 38.7914 22 37.8514 22 36.7448V26.4448L18.8 29.5448L16 26.7448L24 18.7448L32 26.7448L29.2 29.5448L26 26.4448V36.7448H37C38.4 36.7448 39.58 36.2581 40.54 35.2848C41.5133 34.3248 42 33.1448 42 31.7448C42 30.3448 41.5133 29.1647 40.54 28.2048C39.58 27.2314 38.4 26.7448 37 26.7448H34V22.7448C34 19.9848 33.0267 17.6248 31.08 15.6648C29.1333 13.7181 26.7733 12.7448 24 12.7448C21.24 12.7448 18.88 13.7181 16.92 15.6648C14.9733 17.6248 14 19.9848 14 22.7448H13C11.0667 22.7448 9.42 23.4314 8.06 24.8048C6.68667 26.1648 6 27.8114 6 29.7448C6 31.6781 6.68667 33.3448 8.06 34.7448C9.42 36.0781 11.0667 36.7448 13 36.7448H18V40.7448'
                                    fill='#A8A8A8'
                                  />
                                </svg>

                                <span className='mt-2 text-lg font-medium text-gray-600'>Unggah Banner</span>
                              </div>
                            </label>
                          )}
                          <input
                            ref={inputFileRef}
                            type='file'
                            accept='image/*'
                            className='hidden'
                            id='fileInput'
                            onChange={handleImageUpload}
                          />
                        </div>
                      </div>
                      <Transition
                        appear
                        show={isOpen3}
                        as={Fragment}>
                        <Dialog
                          as='div'
                          className='fixed inset-0 z-10 overflow-y-auto'
                          onClose={handleClose}>
                          <div className='min-h-screen px-4 text-center'>
                            <Transition.Child
                              as={Fragment}
                              enter='ease-out duration-300'
                              enterFrom='opacity-0'
                              enterTo='opacity-100'
                              leave='ease-in duration-200'
                              leaveFrom='opacity-100'
                              leaveTo='opacity-0'>
                              <Dialog.Overlay className='fixed inset-0 bg-black opacity-30' />
                            </Transition.Child>

                            <span
                              className='inline-block h-screen align-middle'
                              aria-hidden='true'>
                              &#8203;
                            </span>
                            <Transition.Child
                              as={Fragment}
                              enter='ease-out duration-300'
                              enterFrom='opacity-0 scale-95'
                              enterTo='opacity-100 scale-100'
                              leave='ease-in duration-200'
                              leaveFrom='opacity-100 scale-100'
                              leaveTo='opacity-0 scale-95'>
                              <div className='inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                                <div className='flex justify-between'>
                                  <h1 className='text-lg font-semibold text-[#2E3A44]'>Sesuaikan Banner</h1>
                                  <button onClick={handleClose}>
                                    <AiOutlineClose size='24' />
                                  </button>
                                </div>
                                <div className='flex items-center justify-center'>
                                  <div className='flex items-center gap-[20px] relative'>
                                    <div
                                      className={`h-[50px] w-[50px] flex justify-center items-center rounded-full ${
                                        stepp === 2 ? 'bg-[#00CDB4]' : 'bg-[#00CDB433]'
                                      }  `}>
                                      <h1 className='text-[#00CDB4] font-semibold text-[18px]'>
                                        {stepp === 2 ? (
                                          <span>
                                            <img
                                              src={IconCheckWhite}
                                              alt=''
                                            />
                                          </span>
                                        ) : (
                                          '1'
                                        )}
                                      </h1>
                                    </div>
                                  </div>
                                  <div className='h-0.5 w-24 bg-light-gray' />

                                  <div className='flex items-center gap-[20px] '>
                                    <div
                                      className={`h-[50px] w-[50px] flex justify-center items-center rounded-full ${
                                        stepp > 2 ? 'bg-[#00CDB4]' : 'bg-[#00CDB433]'
                                      }  `}>
                                      <h1 className='text-[#00CDB4] font-semibold text-[18px]'>2</h1>
                                    </div>
                                  </div>
                                </div>
                                {stepp === 1 && (
                                  <div>
                                    <div className='mt-4'>
                                      {imageSrc && (
                                        <Cropper
                                          src={imageSrc}
                                          style={{ height: 400, width: '100%' }}
                                          initialAspectRatio={1}
                                          aspectRatio={1}
                                          guides={false}
                                          onInitialized={(instance) => {
                                            setCropper(instance);
                                          }}
                                        />
                                      )}
                                    </div>
                                    <div className='flex justify-end mt-4'>
                                      <button
                                        type='button'
                                        className='px-4 py-2 text-white rounded-lg bg-cherry hover:bg-cherry/70'
                                        onClick={() => setStepp(stepp + 1)}>
                                        Selanjutnya
                                      </button>
                                    </div>
                                  </div>
                                )}
                                {stepp === 2 && (
                                  <div>
                                    <div className='overflow-y-auto h-[500px] scrollbar-hide mt-5'>
                                      <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
                                        <button
                                          key={1}
                                          onClick={(e) => {
                                            e.preventDefault();
                                            setActiveBanner2(1);
                                          }}
                                          className={
                                            activeBanner2 === 1
                                              ? 'rounded-[12px] border-2 w-full py-7 bg-light-primary border-primary space-y-2'
                                              : 'rounded-[12px] border-2 w-full py-7 space-y-2'
                                          }>
                                          <div className='flex justify-end mr-3'>
                                            <div className={activeBanner2 === 1 ? 'block' : 'hidden'}>
                                              <img
                                                className='w-[24px] h-[24px]'
                                                src={IconChecklistPrimary}
                                                alt=''
                                              />
                                            </div>
                                          </div>
                                          <div className='flex justify-center'>
                                            <Card8
                                              layanan={'eo'}
                                              image={Wedding}
                                              title={'Premium Wedding Package'}
                                              price={'40.000.000'}
                                              icon={IconSupplierCherry}
                                              bintang={IconStarYellow}
                                              jml_comment={'300'}
                                              rating={'4.9'}
                                            />
                                          </div>
                                        </button>
                                        <button
                                          key={2}
                                          onClick={(e) => {
                                            e.preventDefault();
                                            setActiveBanner2(2);
                                          }}
                                          className={
                                            activeBanner2 === 2
                                              ? 'rounded-[12px] border-2 w-full py-7 bg-light-primary border-primary space-y-2'
                                              : 'rounded-[12px] border-2 w-full py-7 space-y-2'
                                          }>
                                          <div className='flex justify-end mr-3'>
                                            <div className={activeBanner2 === 2 ? 'block' : 'hidden'}>
                                              <img
                                                className='w-[24px] h-[24px]'
                                                src={IconChecklistPrimary}
                                                alt=''
                                              />
                                            </div>
                                          </div>
                                          <div className='flex justify-center'>
                                            <Card8
                                              layanan={'eo'}
                                              image={Wedding}
                                              title={'Premium Wedding Package'}
                                              price={'40.000.000'}
                                              icon={IconSupplierCherry}
                                              bintang={IconStarYellow}
                                              jml_comment={'300'}
                                              rating={'4.9'}
                                            />
                                          </div>
                                        </button>
                                        <button
                                          key={3}
                                          onClick={(e) => {
                                            e.preventDefault();
                                            setActiveBanner2(3);
                                          }}
                                          className={
                                            activeBanner2 === 3
                                              ? 'rounded-[12px] border-2 w-full py-7 bg-light-primary border-primary space-y-2'
                                              : 'rounded-[12px] border-2 w-full py-7 space-y-2'
                                          }>
                                          <div className='flex justify-end mr-3'>
                                            <div className={activeBanner2 === 3 ? 'block' : 'hidden'}>
                                              <img
                                                className='w-[24px] h-[24px]'
                                                src={IconChecklistPrimary}
                                                alt=''
                                              />
                                            </div>
                                          </div>
                                          <div className='flex justify-center'>
                                            <Card8
                                              layanan={'eo'}
                                              image={Wedding}
                                              title={'Premium Wedding Package'}
                                              price={'40.000.000'}
                                              icon={IconSupplierCherry}
                                              bintang={IconStarYellow}
                                              jml_comment={'300'}
                                              rating={'4.9'}
                                            />
                                          </div>
                                        </button>
                                        <button
                                          key={4}
                                          onClick={(e) => {
                                            e.preventDefault();
                                            setActiveBanner2(4);
                                          }}
                                          className={
                                            activeBanner2 === 4
                                              ? 'rounded-[12px] border-2 w-full py-7 bg-light-primary border-primary space-y-2'
                                              : 'rounded-[12px] border-2 w-full py-7 space-y-2'
                                          }>
                                          <div className='flex justify-end mr-3'>
                                            <div className={activeBanner2 === 4 ? 'block' : 'hidden'}>
                                              <img
                                                className='w-[24px] h-[24px]'
                                                src={IconChecklistPrimary}
                                                alt=''
                                              />
                                            </div>
                                          </div>
                                          <div className='flex justify-center'>
                                            <Card8
                                              layanan={'eo'}
                                              image={Wedding}
                                              title={'Premium Wedding Package'}
                                              price={'40.000.000'}
                                              icon={IconSupplierCherry}
                                              bintang={IconStarYellow}
                                              jml_comment={'300'}
                                              rating={'4.9'}
                                            />
                                          </div>
                                        </button>
                                      </div>
                                      <div>
                                        <div className='flex items-center gap-2 mr-[30px] pb-1.5 mt-5'>
                                          <input
                                            id='checkbox2'
                                            type='checkbox'
                                            name='save'
                                            value='save'
                                            className=''
                                          />
                                          <label
                                            htmlFor='checkbox2'
                                            className='w-full text-sm font-medium cursor-pointer text-light-gray'>
                                            Simpan banner tanpa link
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <div className='flex justify-end mt-4'>
                                      <button
                                        type='button'
                                        className='px-4 py-2 text-white rounded-lg bg-cherry hover:bg-cherry/70'
                                        onClick={() => {
                                          handleCrop();
                                          setStepp(stepp - 1);
                                        }}>
                                        Simpan Banner
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </Transition.Child>
                          </div>
                        </Dialog>
                      </Transition>
                    </form>
                  </div>
                )}
              </div>
            );
          })}
        <button
          className='flex items-center justify-center py-[10px] gap-x-1 w-full hover:bg-[#00CDB4] border border-[#00CDB4] hover:text-white text-[#00CDB4] text-[13px] font-[500] rounded-[10px]'
          onClick={() => {
            sendDataToParrent(true);
            setIsNewBanner(true);
          }}>
          <AiOutlinePlus size={14} />
          <p>Tambah Banner</p>
        </button>
      </div>

      <div className='p-[28px] space-y-5'>
        <button
          className='block w-full bg-cherry hover:bg-[#2E3A66] text-[#F9FBFC] font-medium font-rubix text-[15px] py-3 text-center rounded-[8px]'
          onClick={() => {
            setLeftMenuActive(1);
            ToastSuccess('Pengaturan banner berhasil diperbarui');
          }}>
          Simpan
        </button>
      </div>
    </div>
  );
};

export default PengaturanBanner;
