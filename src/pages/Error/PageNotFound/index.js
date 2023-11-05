import React from 'react';
import { Link } from 'react-router-dom';
import Background from '../../../assets/images/404Background.png';

const PageNotFound = () => {
  return (
    <div className='static w-screen'>
      <div className='absolute'>
        <img
          src={Background}
          className='h-[150px] w-screen lg:h-[350px] md:h-[200px]'
          alt='Flowbite Logo'
        />
      </div>
      <div className='absolute left-0 top-0 right-0 md:py-[80px] py-[50px] grid justify-items-center'>
        <img
          src={require('../../../assets/images/404.png')}
          className='h-[152px] w-[255px] md:h-[309px] md:w-[516px]'
          alt='Flowbite Logo'
        />
        <div className='pt-[40px] text-center'>
          <label className='font-semibold font-inter md:text-[50px] text-[20px] text-gray-300'>
            Oops! Page Not Found
          </label>
        </div>
        <div className='grid justify-items-center pt-[24px]'>
          <Link
            to={'/'}
            className='appearance-none block md:w-[200px] w-[100px] md:h-[76px] h-[38px] bg-[#2D014B] hover:bg-[#2E3A66] text-[#F9FBFC] font-semibold font-inter md:text-[30px] text-[15px] md:py-[20px] md:px-[40px] px-[20px] rounded-[40px]'>
            Go Back
          </Link>
        </div>
      </div>
      <div className='absolute md:pl-[96px] md:pt-[116px] pl-[20px] pt-[36px]'>
        <img
          src={require('../../../assets/images/planet1.png')}
          className='md:h-[70px] md:w-[118px] h-[18px] w-[30px]'
          alt='Flowbite Logo'
        />
      </div>
      <div className='absolute right-0 md:pr-[142px] md:pt-[305px] pr-[20px] pt-[56px]'>
        <img
          src={require('../../../assets/images/planet2.png')}
          className='md:h-[66px] md:w-[66px] h-[18px] w-[18px]'
          alt='Flowbite Logo'
        />
      </div>
      {/* <h1 className="text-[#2D014B] text-6xl font-inter font-bold border-r-4 border-[#2D014B] pr-5">
                404
            </h1>
            <div className="pl-5">
                <h1 className="text-[#00CDB4] text-4xl font-inter font-bold">
                    Page Not Found
                </h1>
                <p className="text-[#6A6A6A] text-xs font-inter">
                    Please check the URL in the address bar and try again.
                </p>
            </div> */}
    </div>
  );
};

export default PageNotFound;
