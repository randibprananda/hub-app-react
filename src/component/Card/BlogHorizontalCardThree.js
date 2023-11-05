import React from 'react';
import tw from 'twin.macro';

import { useNavigate } from 'react-router-dom';
import { IconTagGreen } from '../../assets';

const Tag = tw.button`
px-2 py-1 md:px-[8px] lg:px-[12px] md:py-[4px] lg:py-[6px] rounded-[8px] outline outline-1 outline-[#A8A8A8] text-[6px] md:text-[10px] text-[#5C5C5C]
`;

const BlogHorizontalCardThree = ({
  title_article = '',
  writers_name = '',
  image = '',
  categories = [],
  createdAt = '',
  id,
  avatar = '',
}) => {
  const navigate = useNavigate();

  const cleanTitle = (title) => {
    return title.replace(/[\s}]+/g, '-');
  };

  return (
    <div
      className='cursor-pointer w-fit h-fit flex shadow-lg p-3 items-center rounded-lg mt-[18px]'
      onClick={() => navigate(`/blog/detail/${cleanTitle(title_article)}`, { state: { articleId: id } })}>
      <img
        className='w-[138px] h-[138px] object-contain rounded-lg'
        src={image}
        alt=''
      />
      <div className='flex flex-col p-3 h-full bg-white rounded-tr rounded-br md:p-4 gap-[10px]'>
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
        <h3 className='text-[12px] md:text-[14px] lg:text-[20px] leading-3 md:leading-[24px] font-mulish font-semibold text-[#11142D]'>
          {title_article}
        </h3>
        <div className='flex gap-x-2'>
          {categories.map((data) => (
            <Tag key={data}>{data}</Tag>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogHorizontalCardThree;
