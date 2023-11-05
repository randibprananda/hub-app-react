import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Api from '../../Api';
import { AltImage, IconNext, LogoDefault } from '../../assets';
import { Card1, Footer, Head, Navbar } from '../../component';
import handleLink from '../../utils/handleLink';
import imageHandle from '../../utils/imageHandle';

const DetailLayanan = () => {
  const { id, kategori } = useParams();
  const navigate = useNavigate();
  const [openTab, setOpenTab] = useState(0);
  const [data, setData] = useState([]);

  const [dropdown, setDropdown] = useState(false);

  const scrollLeft = (i) => {
    document.getElementById(`content${i}`).scrollLeft -= 300;
  };
  const scrollRight = (i) => {
    document.getElementById(`content${i}`).scrollLeft += 300;
  };

  const getDetail = async () => {
    await Api.getDetailLayanan(id, kategori).then(async (response) => {
      console.log('hasil', response.data);
      setData(response.data);
    });
  };

  useEffect(() => {
    getDetail();
  }, []);
  return (
    <Fragment>
      <Head
        title={`${kategori} - ${
          kategori == 'EO'
            ? data?.eoService?.name
            : kategori == 'VENUE'
            ? data?.venueService?.name
            : kategori == 'PRODUCT'
            ? data?.productSupply?.namaLayanan
            : kategori == 'TALENT'
            ? data?.talentService?.name
            : null
        } - Konect Hub`}
        description={
          kategori == 'EO'
            ? data?.eoService?.description
            : kategori == 'VENUE'
            ? data?.venueService?.description
            : kategori == 'PRODUCT'
            ? data?.productSupply?.note
            : kategori == 'TALENT'
            ? data?.talentService?.skill_description
            : null
        }
      />
      <div className='bg-[#E3E8F1] min-h-screen font-inter'>
        <Navbar />
        <div className='md:px-[75px] px-5 pt-[120px] pb-[10px] md:pt-[140px] md:pb-[30px]'>
          {/* Section 1 */}
          <div>
            <div className='flex items-center gap-3'>
              <Link
                to={'/'}
                className='text-black-k text-sm font-[500] hover:text-[#00CDB4]'>
                Beranda
              </Link>
              <img src={IconNext} />
              <Link
                to=''
                className='text-black-k text-sm font-[500] hover:text-[#00CDB4]'>
                Pencarian
              </Link>
              <img src={IconNext} />
              <button className='text-black-k text-sm font-[500] hover:text-[#00CDB4]'>Detail Layanan</button>
            </div>
            <div className='mt-[30px] w-full bg-[#ECEEF6] shadow-sm rounded-[12px] p-5'>
              <h1 className='lg:text-[30px] text-lg text-cherry font-medium'>
                {kategori == 'EO'
                  ? data?.eoService?.name
                  : kategori == 'VENUE'
                  ? data?.venueService?.name
                  : kategori == 'PRODUCT'
                  ? data?.productSupply?.namaLayanan
                  : kategori == 'TALENT'
                  ? data?.talentService?.name
                  : null}
              </h1>
              <div className='flex items-center space-x-[6px] mt-[11px] mb-[22px]'>
                <div>
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 16 16'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M8.57666 1.99712C8.31974 1.55435 7.68034 1.55435 7.42342 1.99712L5.61405 5.11532C5.48713 5.33404 5.26777 5.4833 5.01772 5.52107L1.62685 6.03322C1.05733 6.11924 0.857554 6.83831 1.30109 7.20578L3.82715 9.29859C4.06098 9.49232 4.17093 9.7979 4.11412 10.0962L3.45335 13.5663C3.34889 14.1148 3.92475 14.541 4.41885 14.2809L7.61179 12.5997C7.85481 12.4717 8.14527 12.4717 8.38829 12.5997L11.5812 14.2809C12.0753 14.541 12.6512 14.1148 12.5467 13.5663L11.886 10.0962C11.8292 9.7979 11.9391 9.49232 12.1729 9.29859L14.699 7.20578C15.1425 6.83832 14.9428 6.11924 14.3732 6.03322L10.9824 5.52107C10.7323 5.4833 10.5129 5.33404 10.386 5.11532L8.57666 1.99712Z'
                      fill='#FFC124'
                    />
                  </svg>
                </div>
                <h1 className='font-bold lg:text-xs text-[10px]'>4.5/5</h1>
                <h1 className='font-normal lg:text-xs text-[10px] text-black-6'>(80 Ulasan)</h1>
              </div>
              <div className='grid grid-cols-1 gap-5 md:grid-cols-12'>
                <div className='md:col-span-7'>
                  <div>
                    <img
                      src={
                        kategori == 'EO'
                          ? imageHandle(data?.eoService?.eo_images[0]?.image)
                          : kategori == 'VENUE'
                          ? imageHandle(data?.venueService?.venue_images[0]?.image)
                          : kategori == 'PRODUCT'
                          ? imageHandle(data?.productSupply?.product_images[0]?.image)
                          : kategori == 'TALENT'
                          ? imageHandle(data?.talentService?.talent_images[0]?.image)
                          : AltImage
                      }
                      className='w-full lg:h-[395px]  h-[207px] rounded-lg object-cover'
                      alt=''
                    />
                  </div>
                  <div className=''>
                    <div className='flex mt-[34px] relative'>
                      <div className='absolute inset-y-0 lg:left-0 left-[-40px] z-10 lg:px-[36px]  flex items-center justify-center'>
                        <button
                          onClick={() => scrollLeft('Galery')}
                          className='p-5 m-3 rounded-full shadow-lg lg:bg-white/50 lg:hover:bg-gray-100'>
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
                        id='contentGalery'
                        className='flex items-center justify-start gap-5 overflow-x-auto scroll-smooth scrollbar-hide'>
                        {kategori == 'EO'
                          ? data?.eoService?.eo_images.map((val, index) => (
                              <img
                                src={val ? imageHandle(val?.image) : AltImage}
                                className=' h-[105px] w-[105px] rounded-md'
                                alt=''
                              />
                            ))
                          : kategori == 'VENUE'
                          ? data?.venueService?.venue_images.map((val, index) => (
                              <img
                                src={val ? imageHandle(val?.image) : AltImage}
                                className=' h-[105px] w-[105px] rounded-md'
                                alt=''
                              />
                            ))
                          : kategori == 'PRODUCT'
                          ? data?.productSupply?.product_images.map((val, index) => (
                              <img
                                src={val ? imageHandle(val?.image) : AltImage}
                                className=' h-[105px] w-[105px] rounded-md'
                                alt=''
                              />
                            ))
                          : kategori == 'TALENT'
                          ? data?.talentService?.talent_images.map((val, index) => (
                              <img
                                src={val ? imageHandle(val?.image) : AltImage}
                                className=' h-[105px] w-[105px] rounded-md'
                                alt=''
                              />
                            ))
                          : null}
                        {/* <img src={kategori == "EO" ? imageHandle(data?.eoService?.eo_images[0]?.image) : kategori == "VENUE" ? imageHandle(data?.venueService?.venue_images[0]?.image) : kategori == "PRODUCT" ? imageHandle(data?.productSupply?.product_images[0]?.image) : kategori == "TALENT" ? imageHandle(data?.talentService?.talent_images[0]?.image) : AltImage} className=' h-[105px] w-[105px] rounded-md' alt='' /> */}
                      </div>
                      <div className='absolute inset-y-0 lg:right-0 right-[-40px] z-10 px-[36px]  flex items-center justify-center'>
                        <button
                          onClick={() => scrollRight('Galery')}
                          className='p-5 m-3 rounded-full shadow-lg lg:bg-white/50 lg:hover:bg-gray-100'>
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
                  <div className='mt-[24px]'>
                    <h1 className='text-xs font-semibold lg:text-lg text-cherry'>Deskripsi Layanan</h1>
                    <p className='text-xs lg:text-sm text-dark-4'>
                      {kategori == 'EO'
                        ? data?.eoService?.description
                        : kategori == 'VENUE'
                        ? data?.venueService?.description
                        : kategori == 'PRODUCT'
                        ? data?.productSupply?.note
                        : kategori == 'TALENT'
                        ? data?.talentService?.skill_description
                        : null}
                    </p>
                    <div>
                      <h1 className='text-xs lg:text-sm text-dark-4'>
                        Untuk Perbedaan pada setiap paket, berbeda dalam jumlah dan jenis fasilitas yang didukung.{' '}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className='md:col-span-5'>
                  <div className='flex flex-wrap bg-white rounded-[12px] lg:px-0 lg:py-0 px-5 py-4 lg:p-[30px]'>
                    <h1 className='w-full py-4 text-base font-medium text-center text-black md:text-xl md:py-6'>
                      Paket Layanan
                    </h1>
                    <div className='w-full'>
                      <ul
                        className='flex flex-row px-4 pt-3 pb-4 mb-0 overflow-x-auto list-none scroll-smooth scrollbar-hide'
                        role='tablist'>
                        {data?.packagePricing
                          ? data?.packagePricing?.map((val, index) => (
                              <li className='flex-auto mr-0 -mb-px text-center md:mr-2'>
                                <a
                                  className={
                                    'text-xs font-bold px-5 py-3 block leading-normal lg:text-base ' +
                                    (openTab === index
                                      ? 'text-cherry-2 bg-abu-tipis underline underline-offset-8 shadow-lg rounded-[12px]'
                                      : 'text-neutural bg-white')
                                  }
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setOpenTab(index);
                                  }}
                                  data-toggle='tab'
                                  href='#link1'
                                  role='tablist'>
                                  {val.name}
                                </a>
                              </li>
                            ))
                          : null}
                      </ul>
                      <div className='relative flex flex-col min-w-0 break-words mt-[24px] w-full mb-6 '>
                        <div className='flex-auto px-4 py-5'>
                          <div className='tab-content tab-space'>
                            {data?.packagePricing
                              ? data?.packagePricing?.map((val, index) => (
                                  <div
                                    className={openTab === index ? 'block' : 'hidden'}
                                    id='link1'>
                                    <div>
                                      <div className='mb-[41px]'>
                                        <p className='text-xs font-medium lg:text-sm text-neutural'>
                                          {val.description}
                                        </p>
                                      </div>
                                      <div>
                                        <div className='mb-5'>
                                          {val.portofolio ? (
                                            <a
                                              href={handleLink(val?.portofolio)}
                                              target='_blank'
                                              download
                                              className='flex justify-between items-center mt-6 rounded-[12px] text-start outline-none border bg-[#FAFAFA] text-[#5C5C5C] border-[#E3E8F1] '>
                                              <p
                                                name='diskon'
                                                className='w-full appearance-none px-[20px] py-[15px] relative text-sm font-[500]'>
                                                Unduh Portfolio
                                              </p>
                                              <div className=''>
                                                <svg
                                                  width='24'
                                                  height='24'
                                                  viewBox='0 0 24 24'
                                                  fill='none'
                                                  xmlns='http://www.w3.org/2000/svg'>
                                                  <path
                                                    fill-rule='evenodd'
                                                    clip-rule='evenodd'
                                                    d='M14.25 2.5C14.25 2.36193 14.1381 2.25 14 2.25H7C5.48122 2.25 4.25 3.48122 4.25 5V19C4.25 20.5188 5.48122 21.75 7 21.75H17C18.5188 21.75 19.75 20.5188 19.75 19V9.14706C19.75 9.00899 19.6381 8.89706 19.5 8.89706H15C14.5858 8.89706 14.25 8.56127 14.25 8.14706V2.5ZM14.0315 13.1643C14.355 12.9056 14.8269 12.958 15.0857 13.2815C15.3444 13.6049 15.292 14.0769 14.9685 14.3357L12.4746 16.3308C12.3459 16.4361 12.1816 16.4994 12.0025 16.5L12.0001 16.5L11.9937 16.5C11.8177 16.4985 11.6561 16.4364 11.5288 16.3335L9.03151 14.3357C8.70806 14.0769 8.65562 13.6049 8.91438 13.2815C9.17313 12.958 9.6451 12.9056 9.96855 13.1643L11.2501 14.1896V10.75C11.2501 10.3358 11.5858 10 12.0001 10C12.4143 10 12.7501 10.3358 12.7501 10.75V14.1895L14.0315 13.1643Z'
                                                    fill='black'
                                                  />
                                                  <path
                                                    d='M15.75 2.82414C15.75 2.63964 15.9426 2.5225 16.0862 2.63839C16.2071 2.736 16.3158 2.85036 16.4085 2.97955L19.4217 7.17745C19.4903 7.27302 19.416 7.39706 19.2983 7.39706H16C15.8619 7.39706 15.75 7.28513 15.75 7.14706V2.82414Z'
                                                    fill='black'
                                                  />
                                                </svg>
                                              </div>
                                            </a>
                                          ) : null}
                                        </div>
                                        <div className='flex items-center gap-2'>
                                          <p className='line-through text-dark-6'>
                                            Rp {parseInt(val.price).toLocaleString().replaceAll(',', '.')}
                                          </p>
                                          <div className='bg-[#FDE5D9] text-[#E6193B] p-2 font-medium text-[10px] rounded-lg'>
                                            {val.disc_percentage} %
                                          </div>
                                        </div>
                                        <h1 className='text-sm font-extrabold text-cherry lg:text-xl'>
                                          Rp {parseInt(val.total_price).toLocaleString().replaceAll(',', '.')}
                                        </h1>
                                        <div className='mt-[24px]'>
                                          <button
                                            onClick={() => {
                                              const params = {
                                                packagePricing: val,
                                              };
                                              navigate(`/form-pemesanan/${kategori}/${id}`, {
                                                state: params,
                                              });
                                            }}
                                            // onClick={()=>console.log(val.id)}
                                            className='bg-cherry hover:bg-orange-700  w-full rounded-lg h-[44px] text-[14px] font-semibold text-white'>
                                            Pesan Sekarang
                                          </button>
                                          {/* <button onClick={() => window.open('http://wa.me/6281210031211', '_blank', 'noreferrer')} className='bg-cherry hover:bg-orange-700  w-full rounded-lg h-[44px] text-[14px] font-light italic text-white'>Pesan Sekarang</button> */}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-1 gap-5 md:grid-cols-12'>
                <div className='md:col-span-7'>
                  <div className='py-[24px] border-t-2 border-b-2 border-gray-400 mt-[24px]'>
                    <div className='flex flex-wrap items-center justify-between gap-3'>
                      <div className='flex space-x-[16px]'>
                        <img
                          className='w-[54px] h-[54px] object-cover rounded-full'
                          src={
                            kategori == 'EO'
                              ? !data?.eoService?.user?.company?.company_logo
                                ? LogoDefault
                                : imageHandle(data?.eoService?.user?.company?.company_logo)
                              : kategori == 'VENUE'
                              ? !data?.venueService?.user?.company?.company_logo
                                ? LogoDefault
                                : imageHandle(data?.venueService?.user?.company?.company_logo)
                              : kategori == 'PRODUCT'
                              ? !data?.productSupply?.user?.company?.company_logo
                                ? LogoDefault
                                : imageHandle(data?.productSupply?.user?.company?.company_logo)
                              : kategori == 'TALENT'
                              ? !data?.talentService?.user?.company?.company_logo
                                ? LogoDefault
                                : imageHandle(data?.talentService?.user?.company?.company_logo)
                              : null
                          }
                          alt='img'
                        />
                        <div className='flex flex-col'>
                          <h1 className='text-black text-[18px] font-bold'>
                            {kategori == 'EO'
                              ? data?.eoService?.user?.company?.name
                              : kategori == 'VENUE'
                              ? data?.venueService?.user?.company?.name
                              : kategori == 'PRODUCT'
                              ? data?.productSupply?.user?.company?.name
                              : kategori == 'TALENT'
                              ? data?.talentService?.user?.company?.name
                              : null}
                          </h1>
                          <h1 className='text-gray-400 text-[12px]'>
                            {kategori == 'EO'
                              ? data?.eoService?.user?.company?.city
                              : kategori == 'VENUE'
                              ? data?.venueService?.user?.company?.city
                              : kategori == 'PRODUCT'
                              ? data?.productSupply?.user?.company?.city
                              : kategori == 'TALENT'
                              ? data?.talentService?.user?.company?.city
                              : null}
                          </h1>
                          <div className='flex items-center space-x-2'>
                            <div>
                              <svg
                                width='17'
                                height='16'
                                viewBox='0 0 17 16'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'>
                                <path
                                  d='M16.2133 5.63406L11.1905 4.90408L8.94521 0.352135C8.88388 0.227506 8.78299 0.126615 8.65836 0.0652895C8.3458 -0.0890138 7.96597 0.0395723 7.80969 0.352135L5.56438 4.90408L0.541613 5.63406C0.403136 5.65384 0.276528 5.71912 0.179594 5.81803C0.062406 5.93848 -0.00216996 6.10053 5.56796e-05 6.26856C0.00228131 6.4366 0.0711264 6.59688 0.191463 6.71418L3.8255 10.2572L2.96694 15.2602C2.94681 15.3766 2.95969 15.4963 3.00412 15.6057C3.04855 15.7151 3.12275 15.8099 3.21832 15.8793C3.31388 15.9488 3.42698 15.99 3.54479 15.9984C3.6626 16.0068 3.78041 15.982 3.88485 15.9269L8.37745 13.5648L12.87 15.9269C12.9927 15.9922 13.1351 16.0139 13.2716 15.9902C13.6158 15.9308 13.8473 15.6044 13.788 15.2602L12.9294 10.2572L16.5634 6.71418C16.6623 6.61724 16.7276 6.49064 16.7474 6.35216C16.8008 6.00597 16.5595 5.68549 16.2133 5.63406Z'
                                  fill='#FDBE0F'
                                />
                              </svg>
                            </div>
                            <h1 className='font-semibold text-[14px] text-[#FDBE0F]'>4.5</h1>
                            <h1 className='font-semibold text-[12px] text-gray-500'>(1000)</h1>
                          </div>
                        </div>
                      </div>
                      <a
                        href='/toko'
                        className='bg-white px-5 py-2.5 hover:bg-gray-400 hover:text-white rounded-lg shadow-sm font-bold text-[12px]'>
                        Kunjungi Profile{' '}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='pt-10'>
              <div>
                <h2 className='mb-3 text-lg font-bold text-cherry-2 lg:text-3xl'>Rekomendasi EO Terbaik </h2>
                <p className='text-xs text-neutural lg:text-sm'>
                  Butuh bantuan untuk urusan pengadaan acara? Cari di KonectHub ajaa
                </p>
              </div>
              <div className='flex  mt-7 lg:mt-[34px] relative'>
                <div className='absolute inset-y-0 lg:left-0 left-[-40px] z-10 flex items-center justify-center'>
                  <button
                    onClick={() => scrollLeft('BestEo')}
                    className='p-5 m-3 bg-white rounded-full shadow-lg hover:bg-gray-100'>
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
                  id='contentBestEo'
                  className='flex items-center justify-start overflow-x-auto lg:px-12 scroll-smooth scrollbar-hide'>
                  <div>
                    <Card1
                      price={40000000}
                      priceDisc={50000000}
                      disc={50}
                      pack={'pax'}
                      rating={'4.9'}
                      image={
                        'https://images.unsplash.com/photo-1638132704795-6bb223151bf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                      }
                      title={'Kolibree Enterprise- Event Organizer by Najla'}
                    />
                  </div>
                  <div>
                    <Card1
                      price={40000000}
                      priceDisc={50000000}
                      disc={50}
                      pack={'pax'}
                      rating={'4.9'}
                      image={
                        'https://images.unsplash.com/photo-1638132704795-6bb223151bf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                      }
                      title={'Kolibree Enterprise- Event Organizer by Najla'}
                    />
                  </div>
                  <div>
                    <Card1
                      price={40000000}
                      priceDisc={50000000}
                      disc={50}
                      pack={'pax'}
                      rating={'4.9'}
                      image={
                        'https://images.unsplash.com/photo-1638132704795-6bb223151bf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                      }
                      title={'Kolibree Enterprise- Event Organizer by Najla'}
                    />
                  </div>
                  <div>
                    <Card1
                      price={40000000}
                      priceDisc={50000000}
                      disc={50}
                      pack={'pax'}
                      rating={'4.9'}
                      image={
                        'https://images.unsplash.com/photo-1638132704795-6bb223151bf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                      }
                      title={'Kolibree Enterprise- Event Organizer by Najla'}
                    />
                  </div>
                  <div>
                    <Card1
                      price={40000000}
                      priceDisc={50000000}
                      disc={50}
                      pack={'pax'}
                      rating={'4.9'}
                      image={
                        'https://images.unsplash.com/photo-1638132704795-6bb223151bf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                      }
                      title={'Kolibree Enterprise- Event Organizer by Najla'}
                    />
                  </div>
                  <div>
                    <Card1
                      price={40000000}
                      priceDisc={50000000}
                      disc={50}
                      pack={'pax'}
                      rating={'4.9'}
                      image={
                        'https://images.unsplash.com/photo-1638132704795-6bb223151bf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                      }
                      title={'Kolibree Enterprise- Event Organizer by Najla'}
                    />
                  </div>
                  <div>
                    <Card1
                      price={40000000}
                      priceDisc={50000000}
                      disc={50}
                      pack={'pax'}
                      rating={'4.9'}
                      image={
                        'https://images.unsplash.com/photo-1638132704795-6bb223151bf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                      }
                      title={'Kolibree Enterprise- Event Organizer by Najla'}
                    />
                  </div>
                </div>
                <div className='absolute inset-y-0 lg:right-0 right-[-40px] z-10 flex items-center justify-center'>
                  <button
                    onClick={() => scrollRight('BestEo')}
                    className='p-5 m-3 bg-white rounded-full shadow-lg hover:bg-gray-100'>
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
          </div>
        </div>
        <Footer />
      </div>
    </Fragment>
  );
};

export default DetailLayanan;
