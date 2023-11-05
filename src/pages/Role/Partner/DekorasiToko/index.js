import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
import * as yup from 'yup';
import { shallow } from 'zustand/shallow';

import { IconNext } from '../../../../assets';
import { FooterTwo, Navbar } from '../../../../component';
import { useFetchPartnerShopDecorationInfo } from '../../../../features/partner/dekorasi-toko/useFetchPartnerInfo';
import { useFetchShopDecoration } from '../../../../features/partner/dekorasi-toko/useFetchShopDecoration';
import { usePutShopDecoration } from '../../../../features/partner/dekorasi-toko/usePutShopDecoration';
import { useFetchProductServices } from '../../../../features/partner/useFetchProductServices';
import { useShopDecorationStore } from '../../../../stores/useShopDecorationStore';
import { ToastSuccess } from '../../../../utils/toast';
import LeftContent from './LeftContent';
import RightContent from './RightContent';

const SectionContainer = tw.div`lg:px-[75px] px-2 space-y-[30px]`;

const ErrorText = tw.p` text-red-500 text-sm font-[400]`;

const DekorasiToko = () => {
  // State Global
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

  const navigate = useNavigate();
  const location = useLocation();
  const partnerId = location.state.partnerId;
  const [isTerapkanDekorasi, setIsTerapkanDekorasi] = useState(false);

  // Handle Page Not Found
  useEffect(() => {
    if (partnerId === null || partnerId === undefined) navigate('/404');
  }, [partnerId]);

  //   Fetch Data
  const { data: dataPartnerInfo } = useFetchPartnerShopDecorationInfo(partnerId);
  const { data: dataShopDecoration, refetch: refetchDataShopDecoration } = useFetchShopDecoration();
  const {
    data: dataServicesBeranda,
    refetch: refetchDataServicesBeranda,
    isLoading: isLoadingDataServicesBeranda,
  } = useFetchProductServices(partnerId, filterProduk, '');
  const { data: dataSemuaProduk, isLoading: isLoadingDataSemuaProduk } = useFetchProductServices(partnerId, '', '');
  const { mutate: PutShopDecoration } = usePutShopDecoration({
    onSuccess: () => {
      refetchDataShopDecoration();
      ToastSuccess('Data berhasil diupdate');
    },
  });

  // Form Pengaturan Tentang Kami
  const tentangKami = useFormik({
    initialValues: {
      service_name: '',
      location: '',
      address: '',
      description: '',
    },
    onSubmit: () => {
      PutShopDecoration(tentangKami.values);
    },
    validationSchema: yup.object().shape({
      service_name: yup.string().required('Nama layanan harus diisi'),
      location: yup.string().required('Lokasi harus diisi'),
      address: yup.string().required('Alamat harus diisi'),
      description: yup.string().required('Deskripsi harus diisi'),
    }),
  });

  const handleChangeTentangKami = (event) => {
    const { target } = event;
    const { name, value } = target;

    tentangKami.setFieldValue(name, value);
  };

  return (
    <div className='h-full bg-[#E3E8F1]'>
      <Navbar />
      {/* Link */}
      <div className='lg:px-[75px] px-2 pt-[120px] pb-[10px] md:pt-[140px] md:pb-[30px]'>
        <div className='flex items-center gap-3 md:mb-0 mb-9'>
          <Link
            to={-2}
            className='text-black-k text-xs md:text-sm font-[500] hover:text-primary'>
            Beranda
          </Link>
          <img
            src={IconNext}
            className=''
            alt=''
          />
          <Link
            to={-1}
            className='text-black-k text-xs md:text-sm font-[500] hover:text-primary'>
            Dashboard Profil
          </Link>
          <img
            src={IconNext}
            className=''
            alt=''
          />
          <Link
            to={'#'}
            className='text-black-k text-xs md:text-sm font-[500] hover:text-primary'>
            Dekorasi Toko
          </Link>
        </div>
      </div>

      <SectionContainer>
        <div className='flex items-center justify-between w-full'>
          <h1 className='font-inter text-[24px] font-[600] text-black-k'>Pengaturan Dekorasi Toko</h1>
          <button
            className={`px-2 py-2 text-xs font-semibold text-white rounded-md font-inter md:text-base md:px-3 ${
              isTerapkanDekorasi ? 'bg-cherry' : 'bg-light-gray'
            } hover:bg-gray-500`}>
            Terapkan Dekorasi
          </button>
        </div>

        {/* Left and Right Content */}
        <div className='w-full flex gap-x-[73px]'>
          <LeftContent
            dataSemuaProduk={dataSemuaProduk}
            refetchDataServicesBeranda={refetchDataServicesBeranda}
            refetchDataShopDecoration={refetchDataShopDecoration}
            tentangKami={tentangKami}
            handleChangeTentangKami={handleChangeTentangKami}
          />
          <RightContent
            dataSemuaProduk={dataSemuaProduk}
            isLoadingDataSemuaProduk={isLoadingDataSemuaProduk}
            PartnerInfo={dataPartnerInfo}
            tentangKami={tentangKami}
            handleChangeTentangKami={handleChangeTentangKami}
            dataShopDecoration={dataShopDecoration}
            isLoadingDataServicesBeranda={isLoadingDataServicesBeranda}
            dataServicesBeranda={dataServicesBeranda}
          />
        </div>
      </SectionContainer>
      <div className='mt-[83px]'>
        <FooterTwo />
      </div>
    </div>
  );
};

export default DekorasiToko;
