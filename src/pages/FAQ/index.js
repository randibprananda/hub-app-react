import { ExpandMore } from '@mui/icons-material';
import React, { Fragment, useState } from 'react';
import { faq } from '../../assets';
import { Footer, Head, Navbar } from '../../component';

function FAQ() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const scrollLeft = (i) => {
    document.getElementById(`content${i}`).scrollLeft -= 300;
  };
  const scrollRight = (i) => {
    document.getElementById(`content${i}`).scrollLeft += 300;
  };
  return (
    <Fragment>
      <Head
        title='FAQ - Konect Hub'
        description='Pertanyaan yang sering ditanyakan di Konect Hub'
      />
      <Navbar />
      <div className='flex flex-col justify-around pt-[187px] pb-14 md:px-[76px] px-[36px] space-y-[35px] bg-[#E3E8F1]'>
        <div className='flex flex-col justify-start items-center bg-white w-full h-full rounded-xl lg:p-14 md:p-7 p-3.5'>
          <div className='space-y-5 text-center'>
            <h1 className='text-3xl font-medium'>Frequently Asked Question (FAQ)</h1>
            <p className='text-dark-5'>Pertanyaan yang sering ditanyakan dapat dilihat disini</p>
          </div>
          <div className='flex flex-col-reverse items-center justify-between w-full md:flex-row'>
            <div className='w-full p-5 md:w-1/2'>
              <div>
                <div className='py-3 border-b'>
                  <button
                    onClick={() => {
                      setOpen(!open);
                      setOpen2(false);
                      setOpen3(false);
                    }}
                    className='flex items-center justify-between w-full'>
                    <p className='text-start'>Apa Itu Konect Hub</p>
                    <ExpandMore />
                  </button>
                </div>
                {open ? (
                  <div className='p-1.5'>
                    <p className='text-sm text-start text-dark-3'>
                      Konect Hub adalah platform on demand bagi para pelaku event organizer yang inign meningkatkan
                      capacity businness melalui halaman pendaftaran
                    </p>
                  </div>
                ) : null}
              </div>
              <div className='mt-7'>
                <div className='py-3 border-b'>
                  <button
                    onClick={() => {
                      setOpen2(!open2);
                      setOpen(false);
                      setOpen3(false);
                    }}
                    className='flex items-center justify-between w-full'>
                    <p className='text-start'>Bagaimana cara bergabung di Konect Hub</p>
                    <ExpandMore />
                  </button>
                </div>
                {open2 ? (
                  <div className='p-1.5'>
                    <p className='text-sm text-start text-dark-3'>
                      Lakukan pendaftaran melalui halaman pendaftaran, melengkapi informasi pengguna yang diperlukan,
                      selanjutnya anda bisa login dan menggunakan seluruh layanan konect hub yang tersedia
                    </p>
                  </div>
                ) : null}
              </div>
              <div className='mt-7'>
                <div className='py-3 border-b'>
                  <button
                    onClick={() => {
                      setOpen3(!open3);
                      setOpen2(false);
                      setOpen(false);
                    }}
                    className='flex items-center justify-between w-full'>
                    <p className='text-start'>Bagaimana saya melakukan posting produk/service saya di Konect Hub?</p>
                    <ExpandMore />
                  </button>
                </div>
                {open3 ? (
                  <div className='p-1.5'>
                    <p className='text-sm text-start text-dark-3'>
                      Konect Hub adalah platform on demand bagi para pelaku event organizer yang inign meningkatkan
                      capacity businness melalui halaman pendaftaran
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
            <div className='w-full p-5 md:w-1/2'>
              <img
                src={faq}
                className='h-auto'
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}

export default FAQ;
