import { Link } from "react-router-dom";
import { Star } from "@mui/icons-material";
import LazyLoad from 'react-lazy-load';

function Card1({ link, title, rating, price, disc, priceDisc, image, minOrder, pack, last, company, minPrice, maxPrice, discPercentage }) {
  return (
    <>
      {last ? (
        <div className='absolute top-[180px] left-[55px] z-10'>
          <p className='text-4xl text-white'>See All</p>
        </div>
      ) : null}
      <div
        className={
          last
            ? 'brightness-[0.35] transition-all duration-500 ease-in-out hover:brightness-[0.25] bg-white w-[280px] m-2 rounded-lg shadow-lg'
            : 'bg-white lg:w-[280px] w-[182px] m-2 rounded-lg shadow-lg'
        }
      >
        <Link
          to={link ? link : ''}
          className='relative'
        >
          <div className='top'>
            <LazyLoad offset={400} threshold={0.95}>
              <img
                className='lg:w-[280px] lg:h-[175px] w-[182px] h-[131px] object-cover rounded-t-lg'
                src={image}
                alt='Konnect Logo'
              // alt="img"
              />
            </LazyLoad>
          </div>
          <div className='flex flex-col items-start justify-center p-3 bottom space-y-7'>
            <div className='space-y-3'>
              <div className='space-y-1.5'>
                <p className='lg:text-base text-xs text-black-k line-clamp-1'>{title}</p>
                <p className='text-xs text-dark-4'>{company ? company : null}</p>
                <div className='flex items-center gap-1 lg:text-sm text-xs my-1 text-kuning'>
                  <Star />
                  <span>{rating}</span>
                  <span className='text-xs text-placeholder'>(300)</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
        <div className='flex flex-col items-start justify-center p-3 bottom space-y-7'>
          <div className='space-y-1.5 pb-5 w-full flex justify-between items-center'>
            {/* ketika menggunakan range harga */}
            {/* <div>
              <h1 className="text-lg font-semibold text-[#282828]">Rp {minPrice}-</h1>
              <div className="flex items-center gap-1">
                <h1 className="text-lg font-semibold text-[#282828]">Rp {maxPrice}</h1>
                <h className="text-xs text-dark-6">/{pack}</h>
              </div>
            </div>
            <button className="w-max">
              <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.9375 8.76949V19.3751C14.9375 20.7288 13.9666 21.2983 12.7809 20.6448L9.11188 18.6002C8.71977 18.3855 8.08491 18.3855 7.6928 18.6002L4.02379 20.6448C2.83812 21.2983 1.86719 20.7288 1.86719 19.3751V8.76949C1.86719 7.17305 3.17421 5.86603 4.77065 5.86603H12.034C13.6305 5.86603 14.9375 7.17305 14.9375 8.76949Z" stroke="#454545" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M20.5391 5.14712V15.7528C20.5391 17.1065 19.5681 17.6759 18.3825 17.0224L14.9375 15.0992V8.76946C14.9375 7.17302 13.6305 5.866 12.034 5.866H7.46875V5.14712C7.46875 3.55067 8.77577 2.24365 10.3722 2.24365H17.6356C19.232 2.24365 20.5391 3.55067 20.5391 5.14712Z" stroke="#454545" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M6.53516 11.5796H10.2695" stroke="#454545" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M8.40234 13.4468V9.7124" stroke="#454545" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button> */}
            <div className='flex items-center justify-between w-full'>
              <div>
                {discPercentage !== 0 && (
                  <div className='flex items-center gap-3 h-[23px]'>
                    {priceDisc ? (
                      <p className='line-through text-[#64748B] text-[10px]'>
                        Rp. {parseInt(priceDisc).toLocaleString().replaceAll(',', '.')}
                      </p>
                    ) : null}
                    {disc ? (
                      <p className='bg-[#FDE5D9] font-[500] p-1 text-[10px] text-[#E6193B] rounded-md'>{disc} %</p>
                    ) : null}
                  </div>
                )}
                <div className='flex items-center gap-1'>
                  <p className='lg:text-xl text-xs font-semibold text-black'>
                    Rp {price ? parseInt(price).toLocaleString().replaceAll(',', '.') : null}
                  </p>
                  {pack ? <p className='text-xs text-dark-6'>/{pack}</p> : null}
                </div>
                {/* {minOrder ? <p className="text-[#888888] text-xs">Min. Order {minOrder} pax</p> : null} */}
              </div>
              {/* button Save */}
              {/* <button className="w-max">
                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.9375 8.76949V19.3751C14.9375 20.7288 13.9666 21.2983 12.7809 20.6448L9.11188 18.6002C8.71977 18.3855 8.08491 18.3855 7.6928 18.6002L4.02379 20.6448C2.83812 21.2983 1.86719 20.7288 1.86719 19.3751V8.76949C1.86719 7.17305 3.17421 5.86603 4.77065 5.86603H12.034C13.6305 5.86603 14.9375 7.17305 14.9375 8.76949Z" stroke="#454545" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M20.5391 5.14712V15.7528C20.5391 17.1065 19.5681 17.6759 18.3825 17.0224L14.9375 15.0992V8.76946C14.9375 7.17302 13.6305 5.866 12.034 5.866H7.46875V5.14712C7.46875 3.55067 8.77577 2.24365 10.3722 2.24365H17.6356C19.232 2.24365 20.5391 3.55067 20.5391 5.14712Z" stroke="#454545" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M6.53516 11.5796H10.2695" stroke="#454545" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M8.40234 13.4468V9.7124" stroke="#454545" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Card1;
