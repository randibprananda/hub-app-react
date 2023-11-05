import moment from 'moment';
import { useMediaQuery } from 'react-responsive';
import { Link, useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

import { ArrowRightGreen, IconNext, IconTagGreen } from '../../../assets';
import { Footer, Head, Navbar } from '../../../component';
import BlogCard from '../../../component/Card/BlogCard';
import BlogHorizontalCard from '../../../component/Card/BlogHorizontalCard';
import { CategoryArticleLists } from '../../../constants';
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

const TopSectionWrapper = tw.div`
 bg-[#ECEEF6] rounded-[8px] grid grid-cols-1 lg:grid-cols-2 lg:gap-x-[50px] md:gap-x-[30px] gap-y-[15px] justify-center items-center p-[14px] md:py-[40px] md:px-[26px]
`;

const TopSectionContent = tw.div`
w-fit flex flex-col space-y-[15px] md:space-y-[10px] xl:justify-around h-full
`;

const Profile = tw.div`
flex items-center gap-[14px] text-[#5C5C5C] text-center
`;

const Tag = tw.button`
px-[8px] py-[5px] md:px-[16px] md:py-[10px] xl:px-[22px] xl:py-[14px] rounded-[8px] outline outline-1 outline-[#A8A8A8] text-[10px] md:text-[12px] text-[#5C5C5C] cursor-text
`;

const TagLarge = tw.button`
px-[20px] py-[5px] md:py-[8px] lg:py-[10px] rounded-[8px] outline outline-1 md:outline-2 outline-[#00CDB4] hover:bg-[#00CDB4] hover:text-white font-semibold text-[14px] md:text-[20px] lg:text-[24px] text-[#5C5C5C]
`;

const CardSectionWrapper = tw.div`
grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-[10px] md:gap-[20px]
`;

const PopularSectionWrapper = tw.div`
grid grid-cols-1 lg:grid-cols-2 lg:justify-between gap-y-[27px] pt-[49px] md:pt-[40px] px-[28px] md:px-0 pb-[83px] md:pb-[72px]
`;

const MainBlog = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isTab = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1279px)' });
  const isLargeDesktop = useMediaQuery({ query: '(min-width: 1280px)' });

  const { data: dataArtikelTerbaru, isLoading: isLoadingDataArtikelTerbaru } = useFetchArticles(
    '',
    '',
    true,
    'ASC',
    1,
    isMobile ? 2 : isTab ? 3 : isLargeDesktop ? 4 : 5,
  );

  const { data: dataArtikelHero, isLoading: isLoadingDataArtikelHero } = useFetchArticles('', '', true, 'ASC', 1, 1);

  const { data: dataPilihanUntukmu, isLoading: isLoadingPilihanUntukmu } = useFetchArticles(
    '',
    '',
    true,
    'ASC',
    1,
    isMobile ? 2 : isTab ? 3 : isLargeDesktop ? 4 : 5,
  );

  const { data: dataRekomendasiUntukmu, isLoading: isLoadingDataRekomendasiUntukmu } = useFetchArticles(
    '',
    '',
    true,
    'ASC',
    1,
    isMobile ? 2 : isTab ? 3 : isLargeDesktop ? 4 : 5,
  );

  const { data: dataTerpopulerAkhirPekanIni, isLoading: isLoadingDataTerpopulerAkhirPekanIni } = useFetchArticles(
    '',
    '',
    true,
    'ASC',
    1,
    isMobile ? 2 : isTab ? 2 : isLargeDesktop ? 3 : 3,
  );

  return (
    <Container>
      <Head
        title='Blog - Konect Hub'
        description='Artikel terbaru dari Konect Hub'
      />
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
            Blog
          </Link>
        </LinkSectionWrapper>
      </SectionContainer>
      <SectionContainer className='mt-4 md:mt-[70px]'>
        {!isLoadingDataArtikelHero && dataArtikelHero.data.length > 0 && (
          <TopSectionWrapper>
            <img
              src={dataArtikelHero.data[0].image}
              alt=''
              className='self-center object-contain w-full max-h-[393px] lg:w-1/2'
            />
            <TopSectionContent>
              <Profile>
                <img
                  src={dataArtikelHero.data[0].avatar}
                  alt=''
                  className='object-contain w-[32px] h-[32px] md:w-10 md:h-10 rounded-full'
                />
                <h3 className='text-[12px] md:text-[16px] font-semibold lg:text-[20px]'>
                  {dataArtikelHero.data[0].writers_name}
                </h3>
                <img
                  src={IconTagGreen}
                  alt=''
                />
                <h4 className='text-[10px] md:text-[14px] font-normal -ml-1'>
                  {moment(dataArtikelHero.data[0].createdAt).format('MMM, HH YYYY')}
                </h4>
              </Profile>
              <h1 className='text-[#454545] font-bold text-[20px] md:text-[28px] lg:text-[38px] xl:text-[46px] 2xl:text-[54px] leading-[24px] md:leading-[38px] lg:leading-[46px] xl:leading-[58px] 2xl:leading-[64px] font-mulish'>
                {dataArtikelHero.data[0].title_article}
              </h1>
              <p className='text-[12px] md:text-[16px] lg:text-[20px] xl:text-[22px] text-[#454545] line-clamp-5 md:line-clamp-4'>
                <div
                  dangerouslySetInnerHTML={{ __html: dataArtikelHero.data[0].contents_article }}
                  className='text-[#454545] text-base leading-snug font-normal 2xl:max-w-[70%] max-w-full'
                />
              </p>
              <div className='flex gap-2'>
                {dataArtikelHero.data[0].hashtags.map((data) => {
                  return <Tag key={data}>{data}</Tag>;
                })}
              </div>
            </TopSectionContent>
          </TopSectionWrapper>
        )}
      </SectionContainer>
      <SectionContainer className='mt-[14px] md:mt-[40px] gap-y-[11px] md:gap-y-[30px] flex flex-col'>
        <h2 className='font-bold font-mulish text-[18px] md:text-[24px] lg:text-[36px] text-[#11142D]'>
          Kategori Artikel
        </h2>
        <div className='flex p-2 overflow-x-scroll gap-x-3 scrollbar-hide'>
          {CategoryArticleLists.map((category) => {
            return (
              <TagLarge
                onClick={() => navigate('/blog/kategori', { state: { category } })}
                key={category}>
                {category}
              </TagLarge>
            );
          })}
        </div>
      </SectionContainer>
      <SectionContainer className='mt-[14px] md:mt-[40px]'>
        <div className='flex items-center justify-between mr-3 mb-[14px] md:mb-[20px]'>
          <h2 className='font-bold font-mulish text-[18px] md:text-[24px] lg:text-[36px] text-[#11142D]'>
            Artikel Terbaru
          </h2>
          <button
            className='flex text-[#00CDB4] font-[500px] text-[12px] md:text-[20px] gap-3 items-center hover:bg-slate-700/20 px-3 py-2 rounded-lg'
            onClick={() => navigate('/blog/terbaru')}>
            <p>Lihat Semua</p>
            <img
              src={ArrowRightGreen}
              alt=''
              className='h-[9.15px] md:h-[17px]'
            />
          </button>
        </div>
        <CardSectionWrapper>
          {!isLoadingDataArtikelTerbaru &&
            dataArtikelTerbaru.data.length > 0 &&
            dataArtikelTerbaru.data.map((data) => (
              <BlogCard
                key={data.id}
                id={data.id}
                title_article={data.title_article}
                writers_name={data.writers_name}
                createdAt={moment(data.createdAt).format('MMM, DD YYYY')}
                categories={data.categories}
                avatar={data.avatar}
                image={data.image}
              />
            ))}
        </CardSectionWrapper>
      </SectionContainer>
      <SectionContainer className='mt-[14px] md:mt-[40px]'>
        <div className='flex items-center justify-between mr-3 mb-[14px] md:mb-[20px]'>
          <h2 className='font-bold font-mulish text-[18px] md:text-[24px] lg:text-[36px] text-[#11142D]'>
            Pilihan Untukmu
          </h2>
          <button
            className='flex text-[#00CDB4] font-[500px] text-[12px] md:text-[20px] gap-3 items-center hover:bg-slate-700/20 px-3 py-2 rounded-lg'
            onClick={() => navigate('/blog/kategori', { state: { category: '' } })}>
            <p>Lihat Semua</p>
            <img
              src={ArrowRightGreen}
              alt=''
              className='h-[9.15px] md:h-[17px]'
            />
          </button>
        </div>
        <CardSectionWrapper>
          {!isLoadingPilihanUntukmu &&
            dataPilihanUntukmu !== null &&
            dataPilihanUntukmu !== undefined &&
            dataPilihanUntukmu.data.map((data) => (
              <BlogCard
                key={data.id}
                title_article={data.title_article}
                writers_name={data.writers_name}
                createdAt={moment(data.createdAt).format('MMM, DD YYYY')}
                categories={data.categories}
                avatar={data.avatar}
                image={data.image}
                id={data.id}
              />
            ))}
        </CardSectionWrapper>
      </SectionContainer>
      <SectionContainer className='bg-[#2D014B] mt-[60px] md:mt-[40px]'>
        <PopularSectionWrapper>
          <div className='space-y-[6px] md:space-y-[8px] items-center self-center'>
            <h1 className='font-mulish text-[24px] md:text-[36px] lg:text-[48px] leading-[28px] md:leading-[42px] lg:leading-[57px] text-white font-bold'>
              Terpopular Akhir Pekan Ini
            </h1>
            <p className='text-white font-mulish font-[400px] text-[12px] md:text-[14px] lg:text-[16px]'>
              Lihat berita terpopular akhir pekan ini dan jangan lewatkan berbagai informasi menarik yang bisa Anda
              dapatkan. Jadilah pembaca yang cerdas dan terinformasi. Anda bisa mengikuti perkembangan terbaru di
              sekitar kita dan menambah pengetahuan Anda tentang dunia di sekitar kita.
            </p>
            <button
              className='px-[18px] py-[10px] md:px-[20px] lg:px-[24px] md:py-[14px] lg:py-[18px] bg-[#FF7A00] text-[12px] md:text-[14px] lg:text-[16px] font-bold rounded-[8px] text-white hover:bg-[#FFAF66]'
              onClick={() => navigate('/blog/kategori', { state: { category: '' } })}>
              Lihat Semua Artikel
            </button>
          </div>
          <div className='lg:ml-auto'>
            {!isLoadingDataTerpopulerAkhirPekanIni &&
              dataTerpopulerAkhirPekanIni !== null &&
              dataTerpopulerAkhirPekanIni !== undefined &&
              dataTerpopulerAkhirPekanIni.data.map((data) => (
                <BlogHorizontalCard
                  key={data.id}
                  id={data.id}
                  avatar={data.avatar}
                  image={data.image}
                  title_article={data.title_article}
                  categories={data.categories}
                  writers_name={data.writers_name}
                  createdAt={moment(data.createdAt).format('MMM, DD YYYY')}
                />
              ))}
          </div>
        </PopularSectionWrapper>
      </SectionContainer>
      <SectionContainer className='mt-[14px] md:mt-[40px]'>
        <div className='flex items-center justify-between mr-3 mb-[14px] md:mb-[20px]'>
          <h2 className='font-bold font-mulish text-[18px] md:text-[24px] lg:text-[36px] text-[#11142D]'>
            Rekomendasi Untukmu
          </h2>
          <button
            className='flex text-[#00CDB4] font-[500px] text-[12px] md:text-[20px] gap-3 items-center hover:bg-slate-700/20 px-3 py-2 rounded-lg'
            onClick={() => navigate('/blog/kategori', { state: { category: '' } })}>
            <p>Lihat Semua</p>
            <img
              src={ArrowRightGreen}
              alt=''
              className='h-[9.15px] md:h-[17px]'
            />
          </button>
        </div>
        <CardSectionWrapper>
          {!isLoadingDataRekomendasiUntukmu &&
            dataRekomendasiUntukmu !== null &&
            dataRekomendasiUntukmu !== undefined &&
            dataRekomendasiUntukmu.data.map((data) => (
              <BlogCard
                key={data.id}
                title_article={data.title_article}
                writers_name={data.writers_name}
                createdAt={moment(data.createdAt).format('MMM, DD YYYY')}
                categories={data.categories}
                avatar={data.avatar}
                image={data.image}
                id={data.id}
              />
            ))}
        </CardSectionWrapper>
      </SectionContainer>
      <div className='mt-[77px] md:mt-[101px]'>
        <Footer />
      </div>
    </Container>
  );
};

export default MainBlog;
