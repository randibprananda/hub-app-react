import { Link } from 'react-router-dom'
import React from 'react'
import moment from 'moment/moment'
import LazyLoad from 'react-lazy-load';

function Card2({ title, imgProfile, author, desc, people, date, textBudget, budget, link, color, buttonText, click, isAddon }) {
    return (
      <div className='bg-white md:w-[267px] w-auto rounded-lg p-4 flex flex-col gap-4 border border-[#EBEBEB]'>
        <h3 className='font-semibold text-black-k'>{title}</h3>
        <div className='flex items-center gap-2'>
          <div className='relative w-5 h-5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600'>
            <LazyLoad offset={400}>
              <img src={imgProfile} className='absolute' alt='Konnect Logo' />
            </LazyLoad>
          </div>
          <p className='text-[10px] text-[#B0B0B0]'>{author}</p>
        </div>
        <p className='text-xs lg:h-[64px] h-auto text-ellipsis overflow-hidden'>{desc}</p>
        <div className='flex gap-2'>
          <div className='flex gap-1 bg-[#F6F6F6] rounded-[4px] p-2'>
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
          <div className='flex gap-1 bg-[#F6F6F6] rounded-[4px] p-2'>
            <svg width='13' height='13' viewBox='0 0 13 13' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M3.68745 0C3.80812 0 3.92385 0.0479374 4.00918 0.133266C4.09451 0.218595 4.14245 0.334327 4.14245 0.455V1.30585H9.0285V0.46085C9.0285 0.340176 9.07644 0.224445 9.16177 0.139116C9.2471 0.0537874 9.36283 0.00585 9.4835 0.00585C9.60417 0.00585 9.7199 0.0537874 9.80523 0.139116C9.89056 0.224445 9.9385 0.340176 9.9385 0.46085V1.30585H11.7C12.0447 1.30585 12.3752 1.44272 12.619 1.68638C12.8628 1.93004 12.9998 2.26053 13 2.6052V11.7007C12.9998 12.0453 12.8628 12.3758 12.619 12.6195C12.3752 12.8631 12.0447 13 11.7 13H1.3C0.955331 13 0.62477 12.8631 0.380991 12.6195C0.137212 12.3758 0.000172334 12.0453 0 11.7007L0 2.6052C0.000172334 2.26053 0.137212 1.93004 0.380991 1.68638C0.62477 1.44272 0.955331 1.30585 1.3 1.30585H3.23245V0.45435C3.23262 0.333789 3.28064 0.218225 3.36595 0.133037C3.45126 0.047848 3.56689 -1.23021e-07 3.68745 0ZM0.91 5.0323V11.7007C0.91 11.7519 0.920088 11.8026 0.939687 11.8499C0.959286 11.8972 0.988014 11.9402 1.02423 11.9764C1.06044 12.0126 1.10344 12.0414 1.15075 12.061C1.19807 12.0806 1.24878 12.0907 1.3 12.0907H11.7C11.7512 12.0907 11.8019 12.0806 11.8492 12.061C11.8966 12.0414 11.9396 12.0126 11.9758 11.9764C12.012 11.9402 12.0407 11.8972 12.0603 11.8499C12.0799 11.8026 12.09 11.7519 12.09 11.7007V5.0414L0.91 5.0323ZM4.33355 9.50235V10.5852H3.25V9.50235H4.33355ZM7.04145 9.50235V10.5852H5.95855V9.50235H7.04145ZM9.75 9.50235V10.5852H8.66645V9.50235H9.75ZM4.33355 6.9173V8.0002H3.25V6.9173H4.33355ZM7.04145 6.9173V8.0002H5.95855V6.9173H7.04145ZM9.75 6.9173V8.0002H8.66645V6.9173H9.75ZM3.23245 2.2152H1.3C1.24878 2.2152 1.19807 2.22529 1.15075 2.24489C1.10344 2.26449 1.06044 2.29321 1.02423 2.32943C0.988014 2.36564 0.959286 2.40864 0.939687 2.45595C0.920088 2.50327 0.91 2.55398 0.91 2.6052V4.12295L12.09 4.13205V2.6052C12.09 2.55398 12.0799 2.50327 12.0603 2.45595C12.0407 2.40864 12.012 2.36564 11.9758 2.32943C11.9396 2.29321 11.8966 2.26449 11.8492 2.24489C11.8019 2.22529 11.7512 2.2152 11.7 2.2152H9.9385V2.81905C9.9385 2.93972 9.89056 3.05545 9.80523 3.14078C9.7199 3.22611 9.60417 3.27405 9.4835 3.27405C9.36283 3.27405 9.2471 3.22611 9.16177 3.14078C9.07644 3.05545 9.0285 2.93972 9.0285 2.81905V2.2152H4.14245V2.8132C4.14245 2.93387 4.09451 3.0496 4.00918 3.13493C3.92385 3.22026 3.80812 3.2682 3.68745 3.2682C3.56678 3.2682 3.45105 3.22026 3.36572 3.13493C3.28039 3.0496 3.23245 2.93387 3.23245 2.8132V2.2152Z'
                fill='#6A6A6A'
              />
            </svg>

            <span className='text-[#6A6A6A] text-[10px]'>{moment(date).format('LL')}</span>
          </div>
        </div>
        {isAddon !== null && (
          <div className='flex items-center gap-2'>
            <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M9.12467 10.5837L7.97884 9.41699C7.81217 9.25033 7.6144 9.16699 7.38551 9.16699C7.15662 9.16699 6.95856 9.25033 6.79134 9.41699C6.62467 9.58366 6.53773 9.78171 6.53051 10.0112C6.52329 10.2406 6.60329 10.4384 6.77051 10.6045L8.54134 12.3753C8.70801 12.542 8.90245 12.6253 9.12467 12.6253C9.3469 12.6253 9.54134 12.542 9.70801 12.3753L13.2497 8.83366C13.4163 8.66699 13.4997 8.46921 13.4997 8.24032C13.4997 8.01144 13.4163 7.81338 13.2497 7.64616C13.083 7.47949 12.885 7.39616 12.6555 7.39616C12.4261 7.39616 12.2283 7.47949 12.0622 7.64616L9.12467 10.5837ZM9.99967 18.2712H9.79134C9.7219 18.2712 9.6594 18.2573 9.60384 18.2295C7.7844 17.66 6.2844 16.5314 5.10384 14.8437C3.92329 13.1559 3.33301 11.2914 3.33301 9.25033V5.31283C3.33301 4.9656 3.43384 4.6531 3.63551 4.37533C3.83717 4.09755 4.09745 3.89616 4.41634 3.77116L9.41634 1.89616C9.61079 1.82671 9.80523 1.79199 9.99967 1.79199C10.1941 1.79199 10.3886 1.82671 10.583 1.89616L15.583 3.77116C15.9025 3.89616 16.163 4.09755 16.3647 4.37533C16.5663 4.6531 16.6669 4.9656 16.6663 5.31283V9.25033C16.6663 11.292 16.0761 13.1567 14.8955 14.8445C13.715 16.5323 12.215 17.6606 10.3955 18.2295C10.3261 18.2573 10.1941 18.2712 9.99967 18.2712Z'
                fill='url(#paint0_linear_794_39575)'
              />
              <defs>
                <linearGradient
                  id='paint0_linear_794_39575'
                  x1='9.99902'
                  y1='2.00024'
                  x2='9.99967'
                  y2='18.2712'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stop-color='#00CDB4' />
                  <stop offset='1' stop-color='#028878' />
                </linearGradient>
              </defs>
            </svg>
            <h1 className='text-xs font-semibold text-cherry'>Pendampingan Konect</h1>
          </div>
        )}
        <div className={`space-y-1 ${isAddon === null && 'mt-9'}`}>
          <p className='text-[#888888] text-xs'>{textBudget}</p>
          <p className='text-xl font-semibold text-black'>
            Rp {budget ? parseInt(budget).toLocaleString().replaceAll(',', '.') : null}
          </p>
        </div>
        <div className='flex justify-end'>
          {click ? (
            <button
              onClick={click ? click : ''}
              className={`bg-${
                color ? color : 'primary'
              } me-auto px-6 py-1.5 font-semibold text-xs text-white w-max rounded-[4px] `}
            >
              {buttonText ? buttonText : 'Button'}
            </button>
          ) : (
            <Link
              to={link ? link : ''}
              className={`self-end justify-self-end bg-${
                color ? color : 'primary'
              } me-auto px-6 py-1.5 font-semibold text-xs text-white rounded-[4px] w-fit`}
            >
              {buttonText ? buttonText : 'Button'}
            </Link>
          )}
        </div>
      </div>
    );
}

export default Card2
