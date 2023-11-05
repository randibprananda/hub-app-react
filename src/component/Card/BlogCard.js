import tw from 'twin.macro';

import { useNavigate } from 'react-router-dom';
import { IconTagGreen } from '../../assets';

const Profile = tw.div`
flex items-center text-[#5C5C5C] gap-[14px]
`;

const BlogCard = ({
  title_article = '',
  writers_name = '',
  createdAt = '',
  categories = [],
  avatar = '',
  image = '',
  id = '',
}) => {
  const navigate = useNavigate();

  const cleanTitle = (title) => {
    return title.replace(/[\s}]+/g, '-');
  };

  return (
    <div
      className='max-w-sm bg-white border border-gray-200 rounded-lg shadow cursor-pointer'
      onClick={() => navigate(`/blog/detail/${cleanTitle(title_article)}`, { state: { articleId: id } })}>
      <img
        className='w-full h-[131px] lg:h-[274px] object-contain rounded-t-lg'
        src={image}
        alt=''
      />
      <div className='p-5'>
        <a href='#'>
          <Profile>
            <img
              src={avatar}
              alt=''
              className='object-contain w-[32px] h-[32px] rounded-full'
            />
            <div className='flex flex-col lg:flex-row gap-x-[14px]'>
              <h3 className='text-[10px] md:text-[12px] lg:text-[16px] font-semibold font-merriweather'>
                {writers_name}
              </h3>
              <div className='flex items-center'>
                <img
                  src={IconTagGreen}
                  alt=''
                  className='w-4 h-4'
                />
                <h4 className='text-[8px] lg:text-[10px] font-normal'>{createdAt}</h4>
              </div>
            </div>
          </Profile>
        </a>
        <h3 className='mb-3 text-[12px] leadig-[14px] lg:leading-[28px] lg:text-[24px] font-mulish font-bold text-[#11142D] line-clamp-3 mt-3'>
          {title_article}
        </h3>
        <div className='flex flex-wrap gap-2'>
          {categories.map((data) => (
            <div
              key={data}
              className='border-1 border border-[#A8A8A8] rounded-[12px] px-2 py-1 md:px-2 lg:px-4 md:py-[6px] lg:py-[10px] text-[8px] md:text-[12px] text-[#5C5C5C]'>
              {data}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
