import { useRef, useState } from 'react';
import { shallow } from 'zustand/shallow';

import { BgSale } from '../../../../../../assets';
import { Card1 } from '../../../../../../component';
import { UrlApi } from '../../../../../../constants';
import { useFetchBannerImages } from '../../../../../../features/partner/dekorasi-toko/useFetchBannerImages';
import { useShopDecorationStore } from '../../../../../../stores/useShopDecorationStore';

const Beranda = ({ dataServicesBeranda, isLoadingDataServicesBeranda, dataSemuaProduk, isLoadingDataSemuaProduk }) => {
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

  const [currentIndex, setCurrentIndex] = useState(0);
  const contentRef = useRef(null);

  // const slides = [
  //   {
  //     src: BgBlank,
  //   },
  //   {
  //     src: BgSale,
  //   },
  // ];

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // Fetch Data
  const { data: dataBannerImages, isLoading: isLoadingDataBannerImages } = useFetchBannerImages();
  console.log('data banner', dataBannerImages);

  return (
    <div className='w-full'>
      {!isLoadingDataBannerImages && (
        <div className={`${bannerType === 'BESAR' ? '' : 'hidden'}`}>
          <div className='max-w-[1400px] md:h-[631px] h-[351px] w-full m-auto relative group'>
            <div
              style={{ backgroundImage: `url(${dataBannerImages[currentIndex].image})` }}
              className='relative w-full h-full duration-500 bg-center bg-cover rounded-2xl'>
              <div className='absolute flex justify-center py-2 bottom-3 left-10'>
                {dataBannerImages.map((slide, slideIndex) => (
                  <div
                    key={slide.id}
                    onClick={() => goToSlide(slideIndex)}
                    className={`text-2xl cursor-pointer ${slideIndex === currentIndex ? 'text-red-400' : ''}`}>
                    {slideIndex === currentIndex ? (
                      <svg
                        width='43'
                        height='10'
                        viewBox='0 0 43 10'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
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
                        xmlns='http://www.w3.org/2000/svg'>
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

            {/* <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
              <BsChevronCompactLeft
                onClick={prevSlide}
                size={30}
              />
            </div> */}

            {/* <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
              <BsChevronCompactRight
                onClick={nextSlide}
                size={30}
              />
            </div> */}
          </div>
        </div>
      )}

      <div className={`${bannerType === 'SLIDE' ? '' : 'hidden'}`}>
        <div
          ref={contentRef}
          className='flex items-center justify-start gap-5 p-4 overflow-x-auto carousel scroll-smooth scrollbar-hide'>
          <img
            src={BgSale}
            className='md:w-[562px] md:h-64 w-[367px] h-28 rounded-xl'
            alt=''
          />
          <img
            src={BgSale}
            className='md:w-[562px] md:h-64 w-[367px] h-28 rounded-xl'
            alt=''
          />
          <img
            src={BgSale}
            className='md:w-[562px] md:h-64 w-[367px] h-28 rounded-xl'
            alt=''
          />
        </div>
      </div>

      <div>
        <h1 className='mt-[30px] mb-6 md:text-[28px] text-xs font-semibold text-[#081C4F]'>
          {filterProduk === 'TERLARIS' ? 'Produk Terlaris' : 'Produk Terbaru'}
        </h1>
        <div className='flex w-full gap-3 overflow-x-auto scrollbar-hide'>
          {!isLoadingDataServicesBeranda &&
            dataServicesBeranda.map((data) => {
              return (
                <Card1
                  key={data.id}
                  rating={'4.9'}
                  price={40000000} //dummy
                  priceDisc={50000000} //dummy
                  disc={data?.package_pricings[0]?.disc_percentage}
                  pack={'pax'}
                  company='By SM Entertaiment - Music Entertaiment'
                  title={data?.package_pricings[0]?.name}
                  image={UrlApi + data?.images[0]?.image}
                />
              );
            })}
        </div>
      </div>
      <div>
        <div className='flex justify-between items-center mt-[30px] mb-6'>
          <h1 className='mt-[30px] mb-6 md:text-[28px] text-xs font-semibold text-[#081C4F]'>Semua Produk</h1>
          <div className='relative w-max'>
            <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
              <svg
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
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
              className='bg-gray-50 border border-gray-300 text-gray-900 md:text-sm text-xs rounded-lg  block w-full pr-10 p-2.5'
              placeholder='Cari Produk'
              required
            />
          </div>
        </div>
        <div className='flex w-full gap-3 overflow-x-auto scrollbar-hide'>
          {!isLoadingDataSemuaProduk &&
            dataSemuaProduk.map((data) => {
              return (
                <Card1
                  key={data.id}
                  rating={'4.9'}
                  price={40000000} //dummy
                  priceDisc={50000000} //dummy
                  disc={data?.package_pricings[0]?.disc_percentage}
                  pack={'pax'}
                  company='By SM Entertaiment - Music Entertaiment'
                  title={data?.package_pricings[0]?.name}
                  image={UrlApi + data?.images[0]?.image}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Beranda;
