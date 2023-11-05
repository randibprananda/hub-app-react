import React, { Fragment } from 'react';
import { about1, about2, about3, about4, about5, about6, about7, about8, about9, BackgroundAbout } from '../../assets';
import { Footer, Head, Navbar } from '../../component';
import CardAbout from '../../component/Card/CardAbout';

function About() {
  const scrollLeft = (i) => {
    document.getElementById(`content${i}`).scrollLeft -= 300;
  };
  const scrollRight = (i) => {
    document.getElementById(`content${i}`).scrollLeft += 300;
  };
  return (
    <Fragment>
      <Head
        title='About - Konect Hub'
        description='
Konect Hub adalah paltform on demand bagi pelaku event organizer dalam meningkatkan business capacity secara digital melalui sistem terintegrasi yang dikembangkan oleh Konect. Konect mengusung sistem business matching yang memungkinkan pelaku Event Organizer mendapatkan potensial partner dan klien dalam satu platform.'
      />
      <Navbar />
      <div
        className='h-screen flex flex-col justify-around pt-[160px] pb-14 md:px-[76px] px-[36px] space-y-[35px] bg-no-repeat bg-cover'
        style={{ backgroundImage: `url(${BackgroundAbout})` }}>
        <h1 className='text-2xl font-semibold text-white lg:text-5xl md:text-3xl'>Tentang Konect Hub</h1>
        <div className='grid grid-cols-1 gap-3 lg:grid-cols-12 md:grid-cols-12'>
          <div className='lg:col-span-4 md:col-span-3'>
            <h3 className='text-2xl font-semibold text-white lg:text-5xl md:text-3xl'>Apa itu Konect Hub? </h3>
            <div className='p-0.5 bg-gradient-to-r from-[#2D014B] to-[#00CDB4] w-[140px] md:h-[13px] h-[5px]'></div>
          </div>
          <div className='lg:col-span-8 md:col-span-9'>
            <p className='text-xs text-white lg:text-xl md:text-lg'>
              Konect Hub adalah paltform on demand bagi pelaku event organizer dalam meningkatkan business capacity
              secara digital melalui sistem terintegrasi yang dikembangkan oleh Konect. Konect mengusung sistem business
              matching yang memungkinkan pelaku Event Organizer mendapatkan potensial partner dan klien dalam satu
              platform.
            </p>
          </div>
        </div>
      </div>
      <div className='pt-[160px] pb-14 space-y-[35px] bg-no-repeat bg-cover'>
        <div className='flex flex-col items-center justify-center w-full space-y-3 md:px-[76px] px-[36px]'>
          <h1 className='text-2xl font-semibold lg:text-5xl md:text-3xl'>Fitur Utama</h1>
          <div className='p-0.5 bg-gradient-to-r from-[#2D014B] to-[#00CDB4] w-[140px] md:h-[13px] h-[5px]'></div>
        </div>
        <div className='flex justify-between items-center mt-[34px] relative'>
          <div className='absolute inset-y-0 left-0 z-10 flex items-center justify-center md:pl-[76px] pl-[36px] '>
            <button
              onClick={() => scrollLeft(1)}
              className='p-5 rounded-full shadow-lg bg-cherry/50 hover:bg-cherry'>
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
            id='content1'
            className='flex items-center justify-start overflow-x-auto scroll-smooth scrollbar-hide'>
            <div>
              <CardAbout
                img={about1}
                title={'Product Directory and Services Event Organizer'}
                desc={
                  'Konect Hub memungkinkan Anda untuk mencari direktori produk dan layanan penyelenggara acara karena Konect Hub bekerja dengan banyak partner pelaku event dari berbagai wilayah di Indonesia'
                }
              />
            </div>
            <div>
              <CardAbout
                img={about2}
                title={'Business Matching'}
                desc={
                  'Konnect Hub mempertemukan para pelaku event organizer, supplier, venue owner, talent dengan stakeholder dan potensial klien yang telah terdaftar di Konect Hub'
                }
              />
            </div>
            <div>
              <CardAbout
                img={about2}
                title={'Business Matching'}
                desc={
                  'Konnect Hub mempertemukan para pelaku event organizer, supplier, venue owner, talent dengan stakeholder dan potensial klien yang telah terdaftar di Konect Hub'
                }
              />
            </div>
            <div>
              <CardAbout
                img={about3}
                title={'Open Bidding System'}
                desc={
                  'Stakeholder dapat melakukan open bidding untuk mendapatkan penawaran menarik dari supplier atau vendor berdasarkan kebutuhan atau Request for Quotation (RFQ) yang Anda buat'
                }
              />
            </div>
            <div>
              <CardAbout
                img={about4}
                title={'Booking System'}
                desc={
                  'Konect Hub memudahkan untuk melakukan pemesanan layanan mulai dari event organizer, peralatan, hingga talent event dalam satu platform, sehingga lebih efektif dan efisien'
                }
              />
            </div>
            <div>
              <CardAbout
                img={about5}
                title={'On Demand Services'}
                desc={
                  'Konect Hub mengimplementasikan layanan berlangganan atau layanan berdasarkan pesanan pelanggan. Konect Hub sangat memudahkan pelanggan karena prosesnya sederhana dan waktu pemesanannya singkat'
                }
              />
            </div>
          </div>
          <div className='absolute inset-y-0 right-0 z-10 flex items-center justify-center md:pr-[76px] pr-[36px]'>
            <button
              onClick={() => scrollRight(1)}
              className='p-5 rounded-full shadow-lg bg-cherry/50 hover:bg-cherry'>
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
      <div className='pt-[160px] pb-14 space-y-[35px] md:px-[76px] px-[36px]'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-y-5'>
          <div className='flex flex-col items-center text-center md:items-start md:text-start'>
            <h1 className='text-2xl font-semibold lg:text-5xl md:text-3xl'>Benefit</h1>
            <div className='mt-3 mb-9 p-0.5 bg-gradient-to-r from-[#2D014B] to-[#00CDB4] w-[64px] md:h-[13px] h-[5px]'></div>
            <p className='text-dark-4'>
              Dengan bergabung dengan Konect Hub, anda mendapatkan banyak keuntungan termasuk 4 keuntungan berikut
            </p>
          </div>
          <div className='grid grid-cols-1 gap-10 md:grid-cols-2'>
            <div className='flex flex-col items-center justify-center'>
              <img src={about6} />
              <p className='text-center'>Meningkatkan potensial market</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <img src={about7} />
              <p className='text-center'>Mendapatkan akses pengguna jasa</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <img src={about8} />
              <p className='text-center'>Profiling dan standarisasi perusahaan Event Organizer</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <img src={about9} />
              <p className='text-center'>Memperkaya produk dan services melalui direktori dan optimalisasi dashboard</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}

export default About;
