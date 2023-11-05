import { shallow } from 'zustand/shallow';

import { IconNext } from '../../../../../assets';
import { useShopDecorationStore } from '../../../../../stores/useShopDecorationStore';
import BannerBaru from './BannerBaru';
import PengaturanBanner from './PengaturanBanner';
import PengaturanSorotProduk from './PengaturanSorotProduk';
import PengaturanTentangKami from './PengaturanTentangKami';

const LeftContent = ({
  dataSemuaProduk,
  refetchDataShopDecoration,
  tentangKami,
  handleChangeTentangKami,
  refetchDataServicesBeranda,
}) => {
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

  const handleDataFromPengaturanBanner = (data) => {
    setIsNewBanner(data);
  };

  return (
    <div>
      <div className='w-[498px]'>
        {leftMenuActive === 1 && (
          <div className='bg-white min-h-[279px] md:min-h-[522px] w-full rounded-[12px]'>
            <div className='md:px-7 md:py-7 px-[18px] py-[14px] border-b-2'>
              <h1 className='font-semibold font-inter text-[12px] md:text-[20px] text-black-k'>Atur Tampilan Toko </h1>
            </div>
            <div className='md:px-7 md:py-7 px-[18px] py-5 space-y-5'>
              <button
                onClick={() => {
                  setLeftMenuActive(2);
                }}
                className='w-full hover:bg-gray-50'>
                <div className='flex justify-between px-[24px] py-[10px] md:py-[19px] rounded-md border-2'>
                  <h1 className='font-semibold font-inter md:text-[18px] text-[12px] text-black-k'>
                    Pengaturan Banner{' '}
                  </h1>
                  <img
                    src={IconNext}
                    className=''
                    alt=''
                  />
                </div>
              </button>
              <button
                onClick={() => {
                  setLeftMenuActive(3);
                }}
                className='w-full hover:bg-gray-50'>
                <div className='flex justify-between px-[24px] py-[10px] md:py-[19px] rounded-md border-2'>
                  <h1 className='font-semibold font-inter md:text-[18px] text-[12px] text-black-k'>
                    Pengaturan Sorot Produk{' '}
                  </h1>
                  <img
                    src={IconNext}
                    className=''
                    alt=''
                  />
                </div>
              </button>
              <button
                onClick={() => {
                  setLeftMenuActive(4);
                  setRightMenuActive('Tentang Kami');
                }}
                className='w-full hover:bg-gray-50'>
                <div className='flex justify-between px-[24px] py-[10px] md:py-[19px] rounded-md border-2'>
                  <h1 className='font-semibold font-inter md:text-[18px] text-[12px] text-black-k'>
                    Pengaturan Tentang Kami
                  </h1>
                  <img
                    src={IconNext}
                    className=''
                    alt=''
                  />
                </div>
              </button>
            </div>
          </div>
        )}

        {leftMenuActive === 2 && isNewBanner === false && (
          <PengaturanBanner sendDataToParrent={handleDataFromPengaturanBanner} />
        )}

        {leftMenuActive === 2 && isNewBanner === true && <BannerBaru dataSemuaProduk={dataSemuaProduk} />}

        {leftMenuActive === 3 && <PengaturanSorotProduk refetchDataServicesBeranda={refetchDataServicesBeranda} />}

        {leftMenuActive === 4 && (
          <PengaturanTentangKami
            refetchDataShopDecoration={refetchDataShopDecoration}
            tentangKami={tentangKami}
            handleChangeTentangKami={handleChangeTentangKami}
          />
        )}
      </div>
    </div>
  );
};

export default LeftContent;
