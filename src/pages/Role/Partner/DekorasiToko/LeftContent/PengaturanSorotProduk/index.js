import { shallow } from 'zustand/shallow';

import { IconArrowLeft, IconChecklistPrimary } from '../../../../../../assets';
import { Card7 } from '../../../../../../component';
import { useShopDecorationStore } from '../../../../../../stores/useShopDecorationStore';
import { ToastSuccess } from '../../../../../../utils/toast';

const PengaturanSorotProduk = ({ refetchDataServicesBeranda }) => {
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

  const scrollLeft = (i) => {
    document.getElementById(`product${i}`).scrollLeft -= 100;
  };
  const scrollRight = (i) => {
    document.getElementById(`product${i}`).scrollLeft += 100;
  };

  return (
    <div className='bg-white w-full rounded-[12px]'>
      <div className='md:px-7 md:py-7 px-[18px] py-[14px] border-b-2'>
        <div className='flex items-center gap-[16px]'>
          <button
            key={1}
            onClick={() => {
              setLeftMenuActive(1);
            }}>
            <img
              src={IconArrowLeft}
              alt=''
            />
          </button>
          <h1 className='font-semibold font-inter text-[12px] md:text-[20px] text-black-k'>Pengaturan Sorot Produk </h1>
        </div>
      </div>
      <div className='p-[28px] space-y-5 overflow-auto scrollbar-hide md:h-[380px] shadow-md h-[580px]'>
        <div>
          <label class='cursor-pointer w-full'>
            <input
              type='radio'
              class='peer sr-only'
              label='Populer'
              name='produk'
              value={'TERLARIS'}
              onChange={(e) => setFilterProduk(e.target.value)}
            />
            <div
              className={`rounded-[12px] border-2 w-full p-7 space-y-2 ${
                filterProduk === 'TERLARIS' && 'bg-light-primary border-primary'
              }`}>
              <div className='flex justify-between'>
                <h1 className='font-bold text-[12px] text-cherry-2 md:text-[22px]'>Produk Terlaris </h1>
                <div className={filterProduk === 'TERLARIS' ? 'block' : 'hidden'}>
                  <img
                    className='w-[24px] h-[24px]'
                    src={IconChecklistPrimary}
                    alt=''
                  />
                </div>
              </div>
              <div className='relative flex'>
                <div className='absolute inset-y-0 left-0 z-10 flex items-center justify-center'>
                  <button
                    onClick={() => scrollLeft(1)}
                    className='p-5 m-3 rounded-full shadow-lg bg-white/50 hover:bg-gray-100'>
                    <svg
                      width='14'
                      height='14'
                      viewBox='0 0 8 14'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M7.70711 0.959565C7.31658 0.569041 6.68342 0.569041 6.29289 0.959565L0.959559 6.2929C0.569035 6.68342 0.569035 7.31659 0.959559 7.70711L6.29289 13.0404C6.68342 13.431 7.31658 13.431 7.70711 13.0404C8.09763 12.6499 8.09763 12.0168 7.70711 11.6262L3.08088 7.00001L7.70711 2.37378C8.09763 1.98325 8.09763 1.35009 7.70711 0.959565Z'
                        fill='#2E3A44'
                      />
                    </svg>
                  </button>
                </div>
                <div
                  id='product1'
                  className='flex items-center justify-start space-x-4 overflow-x-auto pointer-events-none select-none scroll-smooth scrollbar-hide'>
                  <Card7
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
                  <Card7
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
                  <Card7
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
                <div className='absolute inset-y-0 right-0 z-10 flex items-center justify-center'>
                  <button
                    onClick={() => scrollRight(1)}
                    className='p-5 m-3 rounded-full shadow-lg bg-white/50 hover:bg-gray-100'>
                    <svg
                      width='14'
                      height='14'
                      viewBox='0 0 8 14'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M0.292893 0.95958C0.683418 0.569056 1.31658 0.569056 1.70711 0.95958L7.04044 6.29291C7.43097 6.68344 7.43097 7.3166 7.04044 7.70713L1.70711 13.0405C1.31658 13.431 0.683418 13.431 0.292893 13.0405C-0.0976311 12.6499 -0.0976311 12.0168 0.292893 11.6262L4.91912 7.00002L0.292893 2.37379C-0.0976311 1.98327 -0.0976311 1.3501 0.292893 0.95958Z'
                        fill='#2E3A44'
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </label>
        </div>
        <div>
          <label class='cursor-pointer w-full'>
            <input
              type='radio'
              class='peer sr-only'
              label='Populer'
              name='produk'
              value={'TERBARU'}
              onChange={(e) => setFilterProduk(e.target.value)}
            />
            <div
              className={`rounded-[12px] border-2 w-full p-7 space-y-2 ${
                filterProduk === 'TERBARU' && 'bg-light-primary border-primary'
              }`}>
              <div className='flex justify-between'>
                <h1 className='font-bold text-[12px] text-cherry-2 md:text-[22px]'>Produk Terbaru</h1>
                <div className={filterProduk === 'TERBARU' ? 'block' : 'hidden'}>
                  <img
                    className='w-[24px] h-[24px]'
                    src={IconChecklistPrimary}
                  />
                </div>
              </div>
              <div className='relative flex'>
                <div className='absolute inset-y-0 left-0 z-10 flex items-center justify-center'>
                  <button
                    onClick={() => scrollLeft(2)}
                    className='p-5 m-3 rounded-full shadow-lg bg-white/50 hover:bg-gray-100'>
                    <svg
                      width='14'
                      height='14'
                      viewBox='0 0 8 14'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M7.70711 0.959565C7.31658 0.569041 6.68342 0.569041 6.29289 0.959565L0.959559 6.2929C0.569035 6.68342 0.569035 7.31659 0.959559 7.70711L6.29289 13.0404C6.68342 13.431 7.31658 13.431 7.70711 13.0404C8.09763 12.6499 8.09763 12.0168 7.70711 11.6262L3.08088 7.00001L7.70711 2.37378C8.09763 1.98325 8.09763 1.35009 7.70711 0.959565Z'
                        fill='#2E3A44'
                      />
                    </svg>
                  </button>
                </div>
                <div
                  id='product2'
                  className='flex items-center justify-start space-x-4 overflow-x-auto pointer-events-none select-none scroll-smooth scrollbar-hide'>
                  <Card7
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
                  <Card7
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
                  <Card7
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
                <div className='absolute inset-y-0 right-0 z-10 flex items-center justify-center'>
                  <button
                    onClick={() => scrollRight(2)}
                    className='p-5 m-3 rounded-full shadow-lg bg-white/50 hover:bg-gray-100'>
                    <svg
                      width='14'
                      height='14'
                      viewBox='0 0 8 14'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M0.292893 0.95958C0.683418 0.569056 1.31658 0.569056 1.70711 0.95958L7.04044 6.29291C7.43097 6.68344 7.43097 7.3166 7.04044 7.70713L1.70711 13.0405C1.31658 13.431 0.683418 13.431 0.292893 13.0405C-0.0976311 12.6499 -0.0976311 12.0168 0.292893 11.6262L4.91912 7.00002L0.292893 2.37379C-0.0976311 1.98327 -0.0976311 1.3501 0.292893 0.95958Z'
                        fill='#2E3A44'
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>
      <div className='p-[28px] w-full'>
        <button
          className='bg-cherry hover:bg-[#2E3A66] text-white font-medium text-[13px] w-full py-4 rounded-lg'
          onClick={() => {
            refetchDataServicesBeranda();
            ToastSuccess('Sorot produk berhasil diperbarui');
            setLeftMenuActive(1);
          }}>
          Simpan
        </button>
      </div>
    </div>
  );
};

export default PengaturanSorotProduk;
