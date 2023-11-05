import moment from 'moment/moment';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Progress } from '@material-tailwind/react';
import { PendampinganKonect } from '../../assets';

function CardTender({
  title,
  verified,
  imgProfile,
  author,
  desc,
  people,
  date,
  textBudget,
  budget,
  openModal,
  image,
  batas_akhir,
  satuan,
  jml_tender,
  jml_target,
  sisa_hari,
  isAddons
}) {

  return (
    <button
      onClick={openModal}
      className='bg-white md:w-full w-auto rounded-lg p-4 flex flex-col gap-4 border border-[#EBEBEB]'
    >
      <div className='flex justify-between'>
        {/* ketika verifed maka muncul svg dibawah */}
        <h1 className='text-sm md:text-base font-semibold text-black-k text-start'>{title}</h1>
        {verified && (
          <svg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M10.1875 27.1871L8.375 24.1246L4.9375 23.3746C4.625 23.3121 4.375 23.1504 4.1875 22.8896C4 22.6287 3.92708 22.3425 3.96875 22.0308L4.3125 18.4996L1.96875 15.8121C1.76042 15.5829 1.65625 15.3121 1.65625 14.9996C1.65625 14.6871 1.76042 14.4162 1.96875 14.1871L4.3125 11.4996L3.96875 7.96831C3.92708 7.65581 4 7.36914 4.1875 7.10831C4.375 6.84748 4.625 6.68623 4.9375 6.62456L8.375 5.87456L10.1875 2.81206C10.3542 2.54123 10.5833 2.35873 10.875 2.26456C11.1667 2.17039 11.4583 2.18623 11.75 2.31206L15 3.68706L18.25 2.31206C18.5417 2.18706 18.8333 2.17123 19.125 2.26456C19.4167 2.35789 19.6458 2.54039 19.8125 2.81206L21.625 5.87456L25.0625 6.62456C25.375 6.68706 25.625 6.84873 25.8125 7.10956C26 7.37039 26.0729 7.65664 26.0312 7.96831L25.6875 11.4996L28.0312 14.1871C28.2396 14.4162 28.3437 14.6871 28.3437 14.9996C28.3437 15.3121 28.2396 15.5829 28.0312 15.8121L25.6875 18.4996L26.0312 22.0308C26.0729 22.3433 26 22.63 25.8125 22.8908C25.625 23.1516 25.375 23.3129 25.0625 23.3746L21.625 24.1246L19.8125 27.1871C19.6458 27.4579 19.4167 27.6404 19.125 27.7346C18.8333 27.8287 18.5417 27.8129 18.25 27.6871L15 26.3121L11.75 27.6871C11.4583 27.8121 11.1667 27.8279 10.875 27.7346C10.5833 27.6412 10.3542 27.4587 10.1875 27.1871ZM13.6875 15.8746L11.875 14.0933C11.6458 13.8641 11.3592 13.7496 11.015 13.7496C10.6708 13.7496 10.3742 13.8746 10.125 14.1246C9.89583 14.3537 9.78125 14.6454 9.78125 14.9996C9.78125 15.3537 9.89583 15.6454 10.125 15.8746L12.8125 18.5621C13.0625 18.8121 13.3542 18.9371 13.6875 18.9371C14.0208 18.9371 14.3125 18.8121 14.5625 18.5621L19.875 13.2496C20.125 12.9996 20.2446 12.7079 20.2338 12.3746C20.2229 12.0412 20.1033 11.7496 19.875 11.4996C19.625 11.2496 19.3279 11.1196 18.9838 11.1096C18.6396 11.0996 18.3429 11.2191 18.0938 11.4683L13.6875 15.8746Z'
              fill='#30DF3F'
            />
          </svg>
        )}
      </div>
      <div className='flex items-center gap-2'>
        <div className='relative md:w-5 md:h-5 w-[18px] h-[18px] overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600'>
          <img src={imgProfile} className='absolute' alt='Konnect Logo' />
        </div>
        <p className='text-[10px] text-[#B0B0B0]'>{author}</p>
      </div>
      <div className='gap-5 lg:flex'>
        <img src={image} alt='JoinTender' className='w-full rounded-[12px]' />
        <p className='text-[12px] text-start text-[#1A1A1A] w-full lg:mt-0 md:mt-5 mt-5'>{desc}</p>
      </div>
      <div className='mt-5 lg:flex lg:items-center gap-9 lg:mt-0 md:mt-0 w-full'>
        <div className='flex gap-2 h-max'>
          <div className='flex h-max gap-1 bg-[#F6F6F6] rounded-[4px] p-2'>
            <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M12 4.77338C11.96 4.76671 11.9133 4.76671 11.8733 4.77338C10.9533 4.74004 10.22 3.98671 10.22 3.05338C10.22 2.10004 10.9866 1.33337 11.94 1.33337C12.8933 1.33337 13.66 2.10671 13.66 3.05338C13.6533 3.98671 12.92 4.74004 12 4.77338Z'
                stroke='#6A6A6A'
                strokeWidth='1.2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M11.3133 9.62669C12.2267 9.78003 13.2333 9.62003 13.94 9.14669C14.88 8.52003 14.88 7.49336 13.94 6.86669C13.2267 6.39336 12.2067 6.23336 11.2933 6.39336'
                stroke='#6A6A6A'
                strokeWidth='1.2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M3.97995 4.77338C4.01995 4.76671 4.06661 4.76671 4.10661 4.77338C5.02661 4.74004 5.75995 3.98671 5.75995 3.05338C5.75995 2.10004 4.99328 1.33337 4.03995 1.33337C3.08661 1.33337 2.31995 2.10671 2.31995 3.05338C2.32661 3.98671 3.05995 4.74004 3.97995 4.77338Z'
                stroke='#6A6A6A'
                strokeWidth='1.2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M4.66663 9.62669C3.75329 9.78003 2.74663 9.62003 2.03996 9.14669C1.09996 8.52003 1.09996 7.49336 2.03996 6.86669C2.75329 6.39336 3.77329 6.23336 4.68663 6.39336'
                stroke='#6A6A6A'
                strokeWidth='1.2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M7.99997 9.75336C7.95997 9.74669 7.9133 9.74669 7.8733 9.75336C6.9533 9.72002 6.21997 8.96669 6.21997 8.03336C6.21997 7.08002 6.98664 6.31335 7.93997 6.31335C8.8933 6.31335 9.65997 7.08669 9.65997 8.03336C9.6533 8.96669 8.91997 9.72669 7.99997 9.75336Z'
                stroke='#6A6A6A'
                strokeWidth='1.2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M6.05998 11.8534C5.11998 12.48 5.11998 13.5067 6.05998 14.1334C7.12665 14.8467 8.87331 14.8467 9.93998 14.1334C10.88 13.5067 10.88 12.48 9.93998 11.8534C8.87998 11.1467 7.12665 11.1467 6.05998 11.8534Z'
                stroke='#6A6A6A'
                strokeWidth='1.2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>

            <span className='text-[#6A6A6A] text-[10px]'>{people}</span>
          </div>
          <div className='flex h-max gap-1 bg-[#F6F6F6] rounded-[4px] p-2'>
            <svg width='13' height='13' viewBox='0 0 13 13' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M3.68745 0C3.80812 0 3.92385 0.0479374 4.00918 0.133266C4.09451 0.218595 4.14245 0.334327 4.14245 0.455V1.30585H9.0285V0.46085C9.0285 0.340176 9.07644 0.224445 9.16177 0.139116C9.2471 0.0537874 9.36283 0.00585 9.4835 0.00585C9.60417 0.00585 9.7199 0.0537874 9.80523 0.139116C9.89056 0.224445 9.9385 0.340176 9.9385 0.46085V1.30585H11.7C12.0447 1.30585 12.3752 1.44272 12.619 1.68638C12.8628 1.93004 12.9998 2.26053 13 2.6052V11.7007C12.9998 12.0453 12.8628 12.3758 12.619 12.6195C12.3752 12.8631 12.0447 13 11.7 13H1.3C0.955331 13 0.62477 12.8631 0.380991 12.6195C0.137212 12.3758 0.000172334 12.0453 0 11.7007L0 2.6052C0.000172334 2.26053 0.137212 1.93004 0.380991 1.68638C0.62477 1.44272 0.955331 1.30585 1.3 1.30585H3.23245V0.45435C3.23262 0.333789 3.28064 0.218225 3.36595 0.133037C3.45126 0.047848 3.56689 -1.23021e-07 3.68745 0ZM0.91 5.0323V11.7007C0.91 11.7519 0.920088 11.8026 0.939687 11.8499C0.959286 11.8972 0.988014 11.9402 1.02423 11.9764C1.06044 12.0126 1.10344 12.0414 1.15075 12.061C1.19807 12.0806 1.24878 12.0907 1.3 12.0907H11.7C11.7512 12.0907 11.8019 12.0806 11.8492 12.061C11.8966 12.0414 11.9396 12.0126 11.9758 11.9764C12.012 11.9402 12.0407 11.8972 12.0603 11.8499C12.0799 11.8026 12.09 11.7519 12.09 11.7007V5.0414L0.91 5.0323ZM4.33355 9.50235V10.5852H3.25V9.50235H4.33355ZM7.04145 9.50235V10.5852H5.95855V9.50235H7.04145ZM9.75 9.50235V10.5852H8.66645V9.50235H9.75ZM4.33355 6.9173V8.0002H3.25V6.9173H4.33355ZM7.04145 6.9173V8.0002H5.95855V6.9173H7.04145ZM9.75 6.9173V8.0002H8.66645V6.9173H9.75ZM3.23245 2.2152H1.3C1.24878 2.2152 1.19807 2.22529 1.15075 2.24489C1.10344 2.26449 1.06044 2.29321 1.02423 2.32943C0.988014 2.36564 0.959286 2.40864 0.939687 2.45595C0.920088 2.50327 0.91 2.55398 0.91 2.6052V4.12295L12.09 4.13205V2.6052C12.09 2.55398 12.0799 2.50327 12.0603 2.45595C12.0407 2.40864 12.012 2.36564 11.9758 2.32943C11.9396 2.29321 11.8966 2.26449 11.8492 2.24489C11.8019 2.22529 11.7512 2.2152 11.7 2.2152H9.9385V2.81905C9.9385 2.93972 9.89056 3.05545 9.80523 3.14078C9.7199 3.22611 9.60417 3.27405 9.4835 3.27405C9.36283 3.27405 9.2471 3.22611 9.16177 3.14078C9.07644 3.05545 9.0285 2.93972 9.0285 2.81905V2.2152H4.14245V2.8132C4.14245 2.93387 4.09451 3.0496 4.00918 3.13493C3.92385 3.22026 3.80812 3.2682 3.68745 3.2682C3.56678 3.2682 3.45105 3.22026 3.36572 3.13493C3.28039 3.0496 3.23245 2.93387 3.23245 2.8132V2.2152Z'
                fill='#6A6A6A'
              />
            </svg>

            <span className='text-[#6A6A6A] text-[10px]'>{moment(date).format('LL')}</span>
          </div>
        </div>
        <div className='flex md:flex-none lg:justify-start justify-end'>
          <div className='mt-5 md:mt-0'>
            <p className='text-placeholder text-start text-xs'>{textBudget}</p>
            <p className='md:text-xl font-semibold text-title-active'>Rp {budget ? parseInt(budget).toLocaleString().replaceAll(',', '.') : null}
            </p>
          </div>
        </div>
      </div>
      {isAddons !== null && (
        <div className='flex w-full gap-3 text-[10px] items-center'>
          <img src={PendampinganKonect} alt='Pendampingan Konect' />
          <p className='font-medium text-cherry'>Pendampingan Konect</p>
        </div>
      )}
      <div className='w-full'>
        <div className='flex items-center justify-between w-full'>
          <div className='flex items-center gap-1'>
            <p className='md:text-base text-[sm] font-medium text-black'>{people}</p>
            <p className='md:text-sm text-[8px] text-black'>{satuan}</p>
          </div>
          <p className='md:text-sm text-[8px] text-dark-5 '>
            Target {jml_target} {satuan}
          </p>
        </div>
        <progress className='w-full progress progress-accent' value={jml_tender} max={jml_target}></progress>
      </div>
      <div className='flex justify-between w-full gap-1'>
        <p className='text-[#C1121F] md:text-xxs text-[8px]'>{moment(batas_akhir).format('DD-MM-YYYY')}</p>
        <div className='flex items-center gap-2'>
          <svg width='15' height='14' viewBox='0 0 15 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M7.49352 0.999512C4.27352 0.999512 1.66602 3.61285 1.66602 6.83285C1.66602 10.0528 4.27352 12.6662 7.49352 12.6662C10.7193 12.6662 13.3327 10.0528 13.3327 6.83285C13.3327 3.61285 10.7193 0.999512 7.49352 0.999512ZM7.49935 11.4995C4.92102 11.4995 2.83268 9.41118 2.83268 6.83285C2.83268 4.25451 4.92102 2.16618 7.49935 2.16618C10.0777 2.16618 12.166 4.25451 12.166 6.83285C12.166 9.41118 10.0777 11.4995 7.49935 11.4995ZM7.79102 3.91618H6.91602V7.41618L9.97852 9.25368L10.416 8.53618L7.79102 6.97868V3.91618Z'
              fill='#C1121F'
            />
          </svg>
          <p className='text-[#C1121F] md:text-xxs text-[8px]'>{sisa_hari} hari lagi</p>
        </div>
      </div>
    </button>
  );
}

export default CardTender;
