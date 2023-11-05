import moment from 'moment';
import { useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import tw from 'twin.macro';

import DatePicker from 'react-multi-date-picker';
import { Calendar, IconNext, IconPrevBold } from '../../../assets';
import { BlogHorizontalCardTwo, Footer, Navbar } from '../../../component';
import { useFetchArticles } from '../../../features/blog/useFetchArticles';

const Container = tw.div`
bg-[#E3E8F1] min-h-screen flex flex-col pt-[110px] md:pt-[145px] overflow-hidden
`;

const SectionContainer = tw.div`
w-full px-2 md:px-[56px] lg:px-[76px]
`;

const LinkSectionWrapper = tw.div`
flex gap-1 md:gap-[10px] text-[#2E3A44] font-medium text-xs md:text-sm
`;

const MainSectionWrapper = tw.div`
 bg-white rounded-[8px] flex flex-col p-[12px] md:py-[20px] md:px-[13px] lg:py-[40px] lg:px-[26px]
`;

const TagCategory = tw.button`
px-[8px] py-[5px] md:px-[12px] lg:px-[16px] md:py-[10px] rounded-[8px] outline outline-1 outline-[#A8A8A8] text-[10px] md:text-[12px] hover:bg-cherry hover:text-white mx-[7.5px]
`;

const ArtikelTerbaru = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [limit, setlimit] = useState(10);
  const [sort, setSort] = useState('ASC');
  const startDate = useRef('');
  const endDate = useRef('');

  const { data: cardData, isLoading, refetch } = useFetchArticles(category, search, isActive, sort, page, limit);

  return (
    <Container>
      <Navbar />
      <SectionContainer>
        <LinkSectionWrapper>
          <Link
            to='/'
            className=' hover:text-[#00CDB4]'>
            Beranda
          </Link>
          <img
            src={IconNext}
            alt='Icon Next'
          />
          <Link
            to='#'
            className=' hover:text-[#00CDB4]'>
            Artikel Terbaru
          </Link>
        </LinkSectionWrapper>
      </SectionContainer>
      <SectionContainer className='mt-5 md:mt-[40px] lg:mt-[70px]'>
        <MainSectionWrapper>
          <h2 className='font-bold font-mulish text-[18px] md:text-[24px] lg:text-[36px] text-[#11142D]'>
            Artikel Terbaru
          </h2>
          <div className='flex jusitfy between mt-[13px] md:mt-[20px] lg:mt-[38px] gap-x-[5px] md:gap-x-[15px]'>
            <input
              value={search}
              onInput={(e) => setSearch(e.target.value)}
              type='text'
              className='px-[14px] py-2 md:py-[11px] text-[#A8A8A8] font-[400px] text-[12px] md:text-[14px] lg:text-[18px] w-full rounded-[10px] bg-white border-1 border border-[#E3E8F1]'
              placeholder='Cari Artikel...'
            />
            <div className='relative'>
              <img
                src={Calendar}
                className='absolute top-[18px] left-4'
                alt=''
              />
              <DatePicker
                range
                placeholder='Filter Tanggal'
                style={{
                  backgroundColor: '#FAFAFA',
                  width: '161px',
                  height: '100%',
                  padding: '12px',
                  paddingLeft: '40px',
                  borderRadius: '8px',
                  outlineColor: '#FAFAFA',
                  pointerEvents: 'auto',
                  fontSize: '14px',
                }}
                containerStyle={{
                  width: '100%',
                }}
                minDate={startDate}
                maxDate={endDate}
              />
            </div>
          </div>
          <div className='flex mt-[22px] flex-col gap-y-[14px] md:gap-y-5'>
            {isLoading ? (
              <h1>Loading...</h1>
            ) : (
              cardData.data.map((data) => {
                return (
                  <Link to={`/blog/detail/${data.id}`}>
                    <BlogHorizontalCardTwo
                      avatar={data.avatar}
                      id={data.id}
                      key={data.id}
                      title_article={data.title_article}
                      writers_name={data.writers_name}
                      image={data.image}
                      categories={data.categories}
                      createdAt={moment(data.createdAt).format('MMM, D YYYY')}
                    />
                  </Link>
                );
              })
            )}
          </div>
          <div className='flex justify-center w-full'>
            {!isLoading && (
              <ReactPaginate
                breakLabel={<span className='mr-4'>...</span>}
                nextLabel={
                  <button
                    className='flex items-center justify-center w-[32px] h-[32px] border-2 rounded-full hover:bg-cherry hover:text-white'
                    onClick={() => {
                      page < cardData.totalPages && setPage(page + 1);
                    }}
                    disabled={isLoading}>
                    <img
                      src={IconNext}
                      alt=''
                    />
                  </button>
                }
                pageRangeDisplayed={limit}
                pageCount={cardData.totalPages}
                previousLabel={
                  <button
                    className='flex items-center justify-center w-[32px] h-[32px] border-2 rounded-full hover:bg-cherry hover:text-white'
                    onClick={() => {
                      page > 1 && setPage(page - 1);
                    }}
                    disabled={isLoading}>
                    <img
                      src={IconPrevBold}
                      alt=''
                    />
                  </button>
                }
                // renderOnZeroPageCount={null}
                containerClassName='flex items-center justify center mt-8 mb-4 space-x-10'
                disabledClassName='w-[32px] h-[32px] rounded-full border-2 flex items-center justify-center'
                activeClassName='w-[32px] h-[32px] rounded-full border-2 bg-cherry text-white flex items-center justify-center'
              />
            )}
          </div>
        </MainSectionWrapper>
      </SectionContainer>
      <div className='mt-[77px] md:mt-[101px]'>
        <Footer />
      </div>
    </Container>
  );
};

export default ArtikelTerbaru;
