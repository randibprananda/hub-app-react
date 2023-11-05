import React from 'react';
import tw from 'twin.macro';

import { useNavigate } from 'react-router-dom';
import { IconTagGreen } from '../../assets';

const Tag = tw.button`
px-2 py-1 md:px-[16px] md:py-[10px] rounded-[8px] outline outline-1 outline-[#A8A8A8] text-[8px] md:text-[12px] text-[#5C5C5C] mt-2
`;

const BlogHorizontalCard = ({
  id = '',
  image = '',
  avatar = '',
  title_article = '',
  categories = [],
  createdAt = '',
  writers_name = '',
}) => {
  const navigate = useNavigate();

  const cleanTitle = (title) => {
    return title.replace(/[\s}]+/g, '-');
  };

  return (
    <div
      className='w-full md:max-w-[596px] flex my-4 cursor-pointer'
      onClick={() => navigate(`/blog/detail/${cleanTitle(title_article)}`, { state: { articleId: id } })}>
      <img
        className='w-[103px] md:w-[206px] object-cover'
        src={image}
        alt='image'
      />
      <div className='flex flex-col p-3 bg-white rounded-tr rounded-br md:p-4 gap-[10px] w-full'>
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
            className='w-3 h-3'
          />
          <p className='text-[8px] md:text-[12px]'>{createdAt}</p>
        </div>
        <h3 className='text-[12px] md:text-[24px] leading-3 md:leading-[24px] font-mulish font-semibold text-[#11142D]'>
          {title_article}
        </h3>
        <div className='flex flex-wrap gap-x-2'>
          {categories.map((category) => (
            <Tag key={category}>{category}</Tag>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogHorizontalCard;
