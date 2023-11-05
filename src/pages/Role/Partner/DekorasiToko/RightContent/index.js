import { shallow } from 'zustand/shallow';

import { Star } from '@mui/icons-material';

import {
  Brian,
  IconPrimaryJoin,
  IconPrimaryLike,
  IconPrimaryMessage,
  IconPrimaryYes,
  IconTagGreen,
} from '../../../../../assets';
import { useShopDecorationStore } from '../../../../../stores/useShopDecorationStore';
import Beranda from './Beranda';
import TentangKami from './TentangKami';

const RightContent = ({
  dataSemuaProduk,
  isLoadingDataSemuaProduk,
  dataServicesBeranda,
  PartnerInfo: dataPartnerInfo,
  tentangKami,
  handleChangeTentangKami,
  dataShopDecoration,
  isLoadingDataServicesBeranda,
}) => {
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

  return (
    <div className='w-full'>
      <div className=''>
        <div className='space-y-5'>
          <div className='w-full px-4 py-3 bg-white md:flex md:items-center md:justify-between lg:py-8 lg:px-8 rounded-xl'>
            <div className='flex gap-3'>
              <img
                src={Brian}
                className='rounded-full md:w-[110px] md:h-[110px] h-[76px] w-[76px]'
                alt=''
              />
              <div>
                <h1 className='md:text-[16px] text-sm font-bold font-inter text-black-k'>
                  {dataPartnerInfo?.fullname ?? '-'}
                </h1>
                <h1 className='text-[11px] md:text-xs font-inter text-[#737373]'>
                  {dataPartnerInfo?.city ?? '-'} ,{dataPartnerInfo?.province ?? '-'}
                </h1>
                <div className='flex items-center gap-1 text-[14px] my-1 text-[#FDBE0F]'>
                  <Star />
                  <span>{dataPartnerInfo?.rating ?? '0'}</span>
                  <span className='text-[12px] text-[#888888]'>(1000 Dummy)</span>
                </div>
                <div className='flex space-x-3'>
                  <button className='text-cherry border-cherry border-2 hover:bg-cherry hover:text-white rounded-[8px] flex items-center px-1.5 md:px-3.5 md:py-3 text-[10px] md:text-base'>
                    <img
                      src={IconTagGreen}
                      alt=''
                      className=''
                    />
                    Kirim Pesan
                  </button>
                  <button className='text-cherry border-cherry border-2 hover:bg-cherry hover:text-white rounded-[8px] flex items-center md:px-3.5 md:py-3 px-1.5'>
                    <svg
                      width='19'
                      height='20'
                      viewBox='0 0 18 19'
                      fill='currentColo'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M13.71 11.7468C13.364 11.7458 13.0227 11.8277 12.7148 11.9856C12.4068 12.1434 12.1412 12.3728 11.94 12.6543L6.92251 10.0068C6.89762 10.0101 6.8724 10.0101 6.84751 10.0068C6.95392 9.63057 6.94609 9.23116 6.82501 8.85934H6.89251L12.1425 6.45934C12.3392 6.68994 12.5827 6.87606 12.8568 7.00537C13.131 7.13468 13.4295 7.20421 13.7325 7.20934C14.1706 7.20179 14.5967 7.06432 14.9565 6.81435C15.3164 6.56437 15.594 6.21316 15.754 5.80525C15.9141 5.39733 15.9494 4.95107 15.8555 4.52306C15.7616 4.09505 15.5427 3.70456 15.2266 3.4011C14.9105 3.09764 14.5114 2.89488 14.0799 2.81852C13.6485 2.74216 13.204 2.79565 12.803 2.9722C12.4019 3.14875 12.0623 3.44041 11.8272 3.81021C11.5922 4.18 11.4722 4.61127 11.4825 5.04934C11.4975 5.20159 11.5253 5.35159 11.565 5.49934L6.42751 7.81684C6.37835 7.84315 6.33294 7.87594 6.29251 7.91434C5.98259 7.59697 5.58442 7.38009 5.14969 7.29184C4.71496 7.2036 4.26374 7.24808 3.8546 7.41949C3.44546 7.59091 3.0973 7.88136 2.8553 8.25313C2.6133 8.6249 2.48865 9.06083 2.49751 9.50434C2.52077 10.0853 2.76805 10.6348 3.18752 11.0375C3.60698 11.4401 4.16605 11.6648 4.74751 11.6643C5.0549 11.6592 5.35782 11.5898 5.63681 11.4606C5.91579 11.3315 6.16469 11.1454 6.36751 10.9143C6.38851 10.9338 6.41101 10.9518 6.43501 10.9668L11.565 13.6743C11.5575 13.7718 11.5575 13.8693 11.565 13.9668C11.5883 14.5478 11.8356 15.0973 12.255 15.5C12.6745 15.9026 13.2335 16.1273 13.815 16.1268C14.2683 16.1535 14.7189 16.0401 15.1055 15.8018C15.4921 15.5635 15.796 15.212 15.9759 14.7951C16.1558 14.3781 16.203 13.9159 16.111 13.4712C16.0191 13.0264 15.7925 12.6208 15.462 12.3093C15.2428 12.1024 14.9837 11.9425 14.7005 11.8393C14.4172 11.7361 14.1159 11.6919 13.815 11.7093L13.71 11.7468ZM13.71 3.87184C13.8599 3.85936 14.0108 3.87811 14.1531 3.92691C14.2953 3.97571 14.4259 4.05349 14.5366 4.15535C14.6473 4.2572 14.7357 4.38091 14.7961 4.51865C14.8565 4.65639 14.8877 4.80517 14.8877 4.95559C14.8877 5.10601 14.8565 5.25479 14.7961 5.39253C14.7357 5.53028 14.6473 5.65398 14.5366 5.75584C14.4259 5.85769 14.2953 5.93547 14.1531 5.98427C14.0108 6.03307 13.8599 6.05182 13.71 6.03934C13.4269 6.02667 13.1587 5.90903 12.9577 5.70937C12.7566 5.5097 12.6371 5.24232 12.6225 4.95934C12.6245 4.67153 12.7397 4.39606 12.9432 4.19253C13.1467 3.98901 13.4222 3.87381 13.71 3.87184ZM4.71001 10.5393C4.42694 10.5267 4.15874 10.409 3.95768 10.2094C3.75663 10.0097 3.63714 9.74232 3.62251 9.45934C3.62103 9.24394 3.68354 9.03295 3.80213 8.85313C3.92072 8.67331 4.09004 8.53275 4.28862 8.44929C4.4872 8.36583 4.70609 8.34322 4.91754 8.38433C5.12898 8.42544 5.32346 8.52842 5.4763 8.68021C5.62914 8.83199 5.73346 9.02575 5.77604 9.23691C5.81861 9.44806 5.79751 9.66711 5.71543 9.86626C5.63334 10.0654 5.49396 10.2357 5.31497 10.3555C5.13597 10.4754 4.92542 10.5393 4.71001 10.5393ZM13.71 15.0393C13.4269 15.0267 13.1587 14.909 12.9577 14.7094C12.7566 14.5097 12.6371 14.2423 12.6225 13.9593C12.621 13.7439 12.6835 13.533 12.8021 13.3531C12.9207 13.1733 13.09 13.0328 13.2886 12.9493C13.4872 12.8658 13.7061 12.8432 13.9175 12.8843C14.129 12.9254 14.3235 13.0284 14.4763 13.1802C14.6291 13.332 14.7335 13.5258 14.776 13.7369C14.8186 13.9481 14.7975 14.1671 14.7154 14.3663C14.6333 14.5654 14.494 14.7357 14.315 14.8555C14.136 14.9754 13.9254 15.0393 13.71 15.0393Z'
                        fill='currentColor'
                        stroke='#2D014B'
                        stroke-width='0.3'
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className='flex flex-col mt-4 space-y-4 md:space-y-3 md:mt-0'>
              <div className='flex justify-between gap-2'>
                <div className='flex space-x-2'>
                  <img
                    src={IconPrimaryLike}
                    alt=''
                  />
                  <h1 className='text-[12px] font-normal text-gray-600'>Pembeli Puas</h1>
                </div>
                <h1 className='text-[12px] font-medium text-black'>
                  98% persenanya dummy {dataPartnerInfo?.satisfied ?? '-'}
                </h1>
              </div>
              <div className='flex justify-between gap-2'>
                <div className='flex space-x-2'>
                  <img
                    src={IconPrimaryYes}
                    alt=''
                  />
                  <h1 className='text-[12px] font-normal text-gray-600'>Jumlah Feedback</h1>
                </div>
                <h1 className='text-[12px] font-medium text-black'>{dataPartnerInfo?.feddbeck ?? '0'}</h1>
              </div>
            </div>
            <div className='flex flex-col mt-4 space-y-4 md:space-y-3 md:mt-0'>
              <div className='flex justify-between gap-2'>
                <div className='flex space-x-2'>
                  <img src={IconPrimaryMessage} />
                  <h1 className='text-[12px] font-normal text-gray-600'>Terakhir Online</h1>
                </div>
                <h1 className='text-[12px] font-medium text-black'>{dataPartnerInfo?.lastOnline ?? '-'}</h1>
              </div>
              <div className='flex justify-between gap-2'>
                <div className='flex space-x-2'>
                  <img src={IconPrimaryJoin} />
                  <h1 className='text-[12px] font-normal text-gray-600'>Bergabung </h1>
                </div>
                <h1 className='text-[12px] font-medium text-black'>{dataPartnerInfo?.createdAt ?? '-'}</h1>
              </div>
            </div>
          </div>
          <div
            className='flex flex-row items-center w-full h-full p-4 space-x-4 overflow-x-auto bg-white rounded-lg scrollbar-hide'
            style={{ whiteSpace: 'nowrap' }}>
            <button
              onClick={() => setRightMenuActive('Beranda')}
              className={
                rightMenuActive === 'Beranda'
                  ? 'text-primary border-b-2 border-b-primary font-extrabold text-[12px] py-3 px-4'
                  : 'text-gray-500 font-extrabold text-[12px] py-3 px-4'
              }>
              Beranda
            </button>
            <button
              className={
                rightMenuActive === 'Produk'
                  ? 'text-primary border-b-2 border-b-primary font-extrabold text-[12px] py-3 px-4'
                  : 'text-gray-500 font-extrabold text-[12px] py-3 px-4'
              }
              onClick={() => setRightMenuActive('Produk')}>
              Produk
            </button>
            <button
              className={
                rightMenuActive === 'Ulasan'
                  ? 'text-primary border-b-2 border-b-primary font-extrabold text-[12px] py-3 px-4'
                  : 'text-gray-500 font-extrabold text-[12px] py-3 px-4'
              }
              onClick={() => setRightMenuActive('Ulasan')}>
              Ulasan
            </button>
            <button
              className={
                rightMenuActive === 'Tentang Kami'
                  ? 'text-primary border-b-2 border-b-primary font-extrabold text-[12px] py-3 px-4'
                  : 'text-gray-500 font-extrabold text-[12px] py-3 px-4'
              }
              onClick={() => setRightMenuActive('Tentang Kami')}>
              Tentang Kami
            </button>
          </div>

          {/* Menu */}
          {rightMenuActive === 'Beranda' && (
            <Beranda
              dataSemuaProduk={dataSemuaProduk}
              isLoadingDataSemuaProduk={isLoadingDataSemuaProduk}
              dataServicesBeranda={dataServicesBeranda}
              isLoadingDataServicesBeranda={isLoadingDataServicesBeranda}
            />
          )}
          {rightMenuActive === 'Tentang Kami' && (
            <TentangKami
              tentangKami={tentangKami}
              handleChangeTentangKami={handleChangeTentangKami}
              dataShopDecoration={dataShopDecoration}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RightContent;
