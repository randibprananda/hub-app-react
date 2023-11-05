import 'moment/locale/id';

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DummyAvatar, IconBlogGradient, IconNext } from '../../../../assets';
import { FooterTwo, NavbarAdmin, Sidebar } from '../../../../component';

import { CircularProgress } from '@mui/material';
import moment from 'moment';
import { useFetchArticle } from '../../../../features/blog/useFetchArticle';

const DetailArtikel = () => {
  const location = useLocation();
  const articleId = location.state;
  const [open, setOpen] = useState(true);

  const { data: article, isLoading: articleIsLoading } = useFetchArticle(articleId);

  return (
    <div className='h-full bg-outline'>
      <div className='h-full bg-outline'>
        <Sidebar
          activeMenu={5}
          open={open}
          setOpen={setOpen}
        />
        <div
          className={`${open ? 'lg:ml-80 md:ml-28 ml-0' : 'lg:ml-24 md:ml-28 ml-0'}
                h-full p-7`}>
          <NavbarAdmin
            title={'Blog'}
            image={IconBlogGradient}
            open={open}
            setOpen={setOpen}
          />
          <div className='flex flex-wrap items-center gap-3 mb-[30px] pt-[120px]'>
            <Link
              to={'/admin/blog/'}
              className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>
              Blog
            </Link>
            <img
              src={IconNext}
              alt=''
            />
            <button className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>Detail Artikel</button>
          </div>
          <div className='flex flex-col'>
            <div className='-my-2'>
              <div className='inline-block w-full h-full py-2'>
                {articleIsLoading ? (
                  <CircularProgress />
                ) : (
                  <div className='bg-white border-b border-gray-200 shadow sm:rounded-lg'>
                    <div className='w-full px-10 md:px-[89px] pt-[44px] pb-[70px]'>
                      <h1 className='md:text-4xl text-2xl font-bold md:leading-[58px] text-[#454545]'>
                        {article.title_article ?? '-'}
                      </h1>
                      <div className='flex gap-2 mt-[10px]'>
                        {!articleIsLoading &&
                          article.categories.map((category) => (
                            <span className='px-2 py-1 md:px-4 md:py-[10px] border rounded-xl border-[#A8A8A8] text-xs text-[#5C5C5C]'>
                              {category ?? '-'}
                            </span>
                          ))}
                      </div>
                      <div className='flex items-center gap-4 mt-6'>
                        <img
                          src={DummyAvatar}
                          className='w-6 h-6 rounded-full md:w-10 md:h-10'
                        />
                        <h3 className='text-[#5C5C5C] font-semibold text-[12px] md:text-[16px]'>
                          {article.writers_name ?? '-'}
                        </h3>
                        <span className='h-2 w-2 bg-[#28A99E] rounded-full' />
                        <h4 className='text-[12px] md:text-[16px] text-[#5C5C5C]'>
                          {moment(article.createdAt).locale('id').format('dddd, D MMMM YYYY') ?? '-'}
                        </h4>
                      </div>
                      <div>
                        <img
                          src={article.image}
                          className='w-full md:h-[372px] h-auto object-cover object-center my-[30px] rounded-[5px]'
                          alt='Banner'
                        />
                        <p>{article.contents_article ?? '-'}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <FooterTwo />
      </div>
    </div>
  );
};

export default DetailArtikel;
