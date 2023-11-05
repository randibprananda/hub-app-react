import React, { useState } from 'react';
import { IconBlog, IconDashboardDark, IconMessageDark, IconNotificationDark, IconPartnerDark, IconPartnerGradient, IconPartnerGray, IconProfileDark, IconRekomendasi, IconStakeholderDark, IconStakeholderGradient, IconStakeholderGray, IconTenderGray, IconTransactionDark, IconTransactionGradient, IconTransactionGray, Logo, LogoDefault } from '../../assets'
import { Link } from 'react-router-dom';
import { Backdrop, Box, Fade, Modal } from '@mui/material'

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '83%',
//     transform: 'translate(-50%, -50%)',
//     width: '30%',
//     bgcolor: 'white',
//     boxShadow: 24,
   
//     'border-radius': "12px",


// };

const NavbarAdmin = ({title, open, setOpen, image, title2}) => {

  const [main, setMain] = useState(true);
  const [message, setMessage] = useState(false);

  const openMessage = () => setMessage(true);
  const closeMessage = () => setMessage(false);

  return (
    <div
      className={`${
        open
          ? 'fixed top-[25px] lg:left-[350px] md:left-[137px] left-7 right-7 z-50'
          : 'fixed top-[25px] lg:left-32 md:left-[137px] left-7 right-7 z-50'
      }`}
    >
      <div className='w-full h-[64px]'>
        <nav className='bg-white border-gray-200  rounded-[26px] shadow-lg'>
          <div className='flex flex-wrap items-center justify-between mx-auto py-4 px-[24px]'>
            <div className='flex items-center'>
              <img src={image} className='h-8 mr-3' />
              <span className='self-center font-semibold whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-[#2D014B] to-[#00CDB4] lg:text-[20px] md:text-[18px] text-[14px]'>
                {title}
              </span>
              <span className='self-center font-semibold whitespace-nowrap text-black lg:text-[20px] md:text-[18px] text-[14px]'>
                {title2}
              </span>
            </div>
            <button
              onClick={() => setMain(!main)}
              type='button'
              class='inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 
                    '
            >
              <span class='sr-only'>Open main menu</span>
              <svg
                class='w-6 h-6'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill-rule='evenodd'
                  d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                  clip-rule='evenodd'
                ></path>
              </svg>
            </button>

            <div className='hidden w-full md:block md:w-auto' id='navbar-default'>
              <ul className='font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white '>
                <li>
                  <button onClick={openMessage} className='block py-2 pl-3 pr-4 text-white ' aria-current='page'>
                    <img src={IconNotificationDark} alt='' />
                  </button>
                </li>
                <li>
                  <button className='block py-2 pl-3 pr-4 text-white ' aria-current='page'>
                    <img src={IconMessageDark} alt='' />
                  </button>
                </li>
                <li>
                  <button className='block py-2 pl-3 pr-4 text-white ' aria-current='page'>
                    <img src={IconProfileDark} alt='' />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          open={message}
          onClose={closeMessage}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={message}>
            <div className='absolute top-[140px] lg:left-[1250px] md:left-80 left-5 lg:right-0 md:right-0 right-5 lg:w-[420px] md:w-[420px] w-[320px]'>
              <div className='bg-white rounded-2xl shadow-md'>
                <div className='flex justify-between items-start p-6 border-b-2'>
                  <div>
                    <h2 className='font-semibold'>Notifikasi</h2>
                  </div>
                </div>
                <div className='overflow-y-auto h-[550px] scrollbar-hide pb-10'>
                  <div className='flex flex-col space-y-3 justify-center p-6 border-b-2 bg-[#EBEDFF]'>
                    <div className='flex items-center space-x-3'>
                      <img className='w-[12px] h-[12px]' src={IconRekomendasi} />
                      <h1 className='text-gray-500 font-normal text-[12px]'>Rekomendasi</h1>
                      <h1 className='text-gray-500 font-normal text-[12px]'>.</h1>
                      <h1 className='text-gray-500 font-normal text-[12px]'>14:14</h1>
                    </div>
                    <div>
                      <h1 className='font-semibold text-[14px]'>Stake Holder mengirimkan rekomendasi partner</h1>
                      <p className='font-medium text-[12px]'>
                        <span className='font-bold'>PT Nomura</span> telah memilih 3 rekomendasi partner dari open
                        tender yang telah mereka adakan. Pastikan ulang data partner terpilih, hubungi stakeholder dan
                        beri 1 rekomendasi partner terbaik{' '}
                      </p>
                    </div>
                  </div>
                  <div className='flex flex-col space-y-3 justify-center p-6 border-b-2 bg-[#EBEDFF]'>
                    <div className='flex items-center space-x-3'>
                      <img className='w-[12px] h-[12px]' src={IconRekomendasi} />
                      <h1 className='text-gray-500 font-normal text-[12px]'>Rekomendasi</h1>
                      <h1 className='text-gray-500 font-normal text-[12px]'>.</h1>
                      <h1 className='text-gray-500 font-normal text-[12px]'>14:14</h1>
                    </div>
                    <div>
                      <h1 className='font-semibold text-[14px]'>Stake Holder mengirimkan rekomendasi partner</h1>
                      <p className='font-medium text-[12px]'>
                        <span className='font-bold'>PT Nomura</span> telah memilih 3 rekomendasi partner dari open
                        tender yang telah mereka adakan. Pastikan ulang data partner terpilih, hubungi stakeholder dan
                        beri 1 rekomendasi partner terbaik{' '}
                      </p>
                    </div>
                  </div>
                  <div className='flex flex-col space-y-3 justify-center p-6 border-b-2 bg-[#EBEDFF]'>
                    <div className='flex items-center space-x-3'>
                      <img className='w-[12px] h-[12px]' src={IconRekomendasi} />
                      <h1 className='text-gray-500 font-normal text-[12px]'>Rekomendasi</h1>
                      <h1 className='text-gray-500 font-normal text-[12px]'>.</h1>
                      <h1 className='text-gray-500 font-normal text-[12px]'>14:14</h1>
                    </div>
                    <div>
                      <h1 className='font-semibold text-[14px]'>Stake Holder mengirimkan rekomendasi partner</h1>
                      <p className='font-medium text-[12px]'>
                        <span className='font-bold'>PT Nomura</span> telah memilih 3 rekomendasi partner dari open
                        tender yang telah mereka adakan. Pastikan ulang data partner terpilih, hubungi stakeholder dan
                        beri 1 rekomendasi partner terbaik{' '}
                      </p>
                    </div>
                  </div>
                  <div className='flex flex-col space-y-3 justify-center p-6 border-b-2'>
                    <div className='flex items-center space-x-3'>
                      <img className='w-[12px] h-[12px]' src={IconRekomendasi} />
                      <h1 className='text-gray-500 font-normal text-[12px]'>Rekomendasi</h1>
                      <h1 className='text-gray-500 font-normal text-[12px]'>.</h1>
                      <h1 className='text-gray-500 font-normal text-[12px]'>14:14</h1>
                    </div>
                    <div>
                      <h1 className='font-semibold text-[14px]'>Stake Holder mengirimkan rekomendasi partner</h1>
                      <p className='font-medium text-[12px]'>
                        <span className='font-bold'>PT Nomura</span> telah memilih 3 rekomendasi partner dari open
                        tender yang telah mereka adakan. Pastikan ulang data partner terpilih, hubungi stakeholder dan
                        beri 1 rekomendasi partner terbaik{' '}
                      </p>
                    </div>
                  </div>
                  <div className='flex flex-col space-y-3 justify-center p-6 border-b-2'>
                    <div className='flex items-center space-x-3'>
                      <img className='w-[12px] h-[12px]' src={IconRekomendasi} />
                      <h1 className='text-gray-500 font-normal text-[12px]'>Rekomendasi</h1>
                      <h1 className='text-gray-500 font-normal text-[12px]'>.</h1>
                      <h1 className='text-gray-500 font-normal text-[12px]'>14:14</h1>
                    </div>
                    <div>
                      <h1 className='font-semibold text-[14px]'>Stake Holder mengirimkan rekomendasi partner</h1>
                      <p className='font-medium text-[12px]'>
                        <span className='font-bold'>PT Nomura</span> telah memilih 3 rekomendasi partner dari open
                        tender yang telah mereka adakan. Pastikan ulang data partner terpilih, hubungi stakeholder dan
                        beri 1 rekomendasi partner terbaik{' '}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>

        <div className={`w-full h-96 bg-white flex flex-col p-4 md:hidden rounded-md   ${main ? 'hidden' : ''}`}>
          <button onClick={openMessage} className='py-2 pl-3 pr-4 text-black gap-4 flex items-center hover:bg-outline'>
            {' '}
            <img className='w-6 h-6' src={IconNotificationDark} /> Notification
          </button>
          <button className='py-2 pl-3 pr-4 text-black gap-4 flex items-center hover:bg-outline'>
            {' '}
            <img className='w-6 h-6' src={IconMessageDark} /> Message
          </button>
          <button className='py-2 pl-3 pr-4 text-black gap-4 flex items-center hover:bg-outline'>
            {' '}
            <img className='w-6 h-6' src={IconProfileDark} /> Profile
          </button>
          <Link to={'/admin'} className='py-2 pl-3 pr-4 text-black gap-4 flex items-center hover:bg-outline'>
            {' '}
            <img className='w-6 h-6' src={IconDashboardDark} /> Dashboard
          </Link>
          <Link
            to={'/admin/stakeholder'}
            className='py-2 pl-3 pr-4 text-black gap-4 flex items-center hover:bg-outline'
          >
            {' '}
            <img className='w-6 h-6' src={IconStakeholderDark} /> Stakeholder
          </Link>
          <Link to={'/admin/partner'} className='py-2 pl-3 pr-4 text-black gap-4 flex items-center hover:bg-outline'>
            {' '}
            <img className='w-6 h-6' src={IconPartnerDark} /> Partner
          </Link>
          <Link
            to={'/admin/transaction'}
            className='py-2 pl-3 pr-4 text-black gap-4 flex items-center hover:bg-outline'
          >
            {' '}
            <img className='w-6 h-6' src={IconTransactionDark} /> Transaction
          </Link>
          <Link
            to={'/admin/open-tender'}
            className='py-2 pl-3 pr-4 text-black gap-4 flex items-center hover:bg-outline'
          >
            {' '}
            <img className='w-6 h-6' src={IconTenderGray} /> Open Tender
          </Link>
          <Link to={'/admin/blog'} className='py-2 pl-3 pr-4 text-black gap-4 flex items-center hover:bg-outline'>
            <img className='w-6 h-6' src={IconBlog} alt="" />
            Blog
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NavbarAdmin;
