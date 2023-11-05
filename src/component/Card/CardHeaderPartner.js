import { IconBidding, IconBiddingColor, IconOpenTender, IconOpenTenderColor, IconVanue } from '../../assets';

import { Link } from 'react-router-dom';
import React from 'react';

const CardHeaderPartner = ({ cardtTitle, countItem, linkRiwayat, colorTitle, colorItem, icon, params }) => {
  return (
    <div
      className={`bg-white border border-[#EBEBEB] relative py-6 md:space-y-8 space-y-3 rounded-2xl px-7 flex-shrink-0 md:w-[370px] w-[200px] md:min-h-[197px] min-h-[130px] ${
        linkRiwayat ? 'justify-between' : ''
      }`}
    >
      <div className='flex items-center gap-[14px]'>
        <img src={icon} />
        <h1 className={`text-[${!colorTitle ? '#737373' : colorTitle}] font-medium text-dark-5 text-xs md:text-base`}>{cardtTitle}</h1>
      </div>
      <h1
        className={`text-[${!colorItem ? '#737373' : colorItem}] md:text-2xl text-sm font-semibold text-dark-3 ${
          !linkRiwayat ? 'md:mt-5 mt-3' : ''
        }`}
      >
        {countItem}
      </h1>
      {linkRiwayat && (
        <Link
          to={!linkRiwayat ? '' : linkRiwayat}
          state={{ partnerId: params }}
          className='text-[#737373] text-[14px] font-[500]'
        >
          Lihat Riwayat
        </Link>
      )}
    </div>
  );
};

export default CardHeaderPartner;
