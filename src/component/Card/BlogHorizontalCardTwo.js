import React from 'react';
import tw from 'twin.macro';

import { IconTagGreen } from '../../assets';

const Tag = tw.button`
px-2 py-1 md:px-[12px] lg:px-[16px] md:py-[8px] lg:py-[10px] rounded-[8px] outline outline-1 outline-[#A8A8A8] text-[8px] md:text-[12px] text-[#5C5C5C]
`;

const BlogHorizontalCardTwo = ({
  title_article = '',
  writers_name = '',
  image = '',
  categories = [],
  createdAt = '',
  id,
  avatar = '',
}) => {
  return (
    <div className='cursor-pointer w-full max-h-[112px] md:max-h-[206px] flex shadow-lg p-3 md:p-[25px] items-center rounded-lg my-[10px]'>
      <img
        className='w-[113px] h-[120px] md:w-[255px] md:h-[172px] object-contain rounded-lg'
        src={image}
        alt=''
      />
      <div className='flex flex-col p-3 bg-white rounded-tr rounded-br md:p-4 gap-[10px]'>
        <div className='flex items-center w-full gap-x-3'>
          <div className='flex items-center gap-2'>
            <img
              className='object-contain w-4 h-4 rounded-full md:w-8 md:h-8'
              src={avatar}
              alt='Avatar'
            />
            <p className='text-[8px] md:text-[12px] text-black'>{writers_name}</p>
          </div>
          <img
            src={IconTagGreen}
            alt=''
            className='w-4 h-4'
          />
          <p className='text-[8px] md:text-[12px] self-center'>{createdAt}</p>
        </div>
        <h3 className='text-[12px] md:text-[18px] lg:text-[24px] leading-3 md:leading-[24px] font-mulish font-semibold text-[#11142D]'>
          {title_article}
        </h3>
        <div className='flex gap-x-2'>
          {categories.map((data, index) => (
            <Tag key={index}>{data}</Tag>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogHorizontalCardTwo;
