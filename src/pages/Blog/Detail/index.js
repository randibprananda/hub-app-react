import moment from 'moment';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import tw from 'twin.macro';

import { useEffect } from 'react';
import { IconNext, IconTagGreen } from '../../../assets';
import { BlogHorizontalCardThree, Footer, Head, Navbar } from '../../../component';
import BlogCard from '../../../component/Card/BlogCard';
import { useFetchArticle, useFetchArticleSlug } from '../../../features/blog/useFetchArticle';
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
 bg-white rounded-[8px] flex flex-col px-[17px] py-[42px] md:py-[27px] md:px-[16px]
`;

const TagCategory = tw.button`
px-[8px] py-[5px] md:px-[12px] lg:px-[16px] md:py-[10px] rounded-[8px] outline outline-1 bg-white outline-[#A8A8A8] text-[10px] md:text-[12px] text-[#5C5C5C] mr-[8px] cursor-text
`;

const Profile = tw.div`
flex items-center gap-[14px] text-[#5C5C5C] text-center mt-[18px] md:mt-[24px]
`;

const CardSectionWrapper = tw.div`
grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-[10px] md:gap-[20px]
`;

const DetailArtikelHome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {path} = useParams();
  console.log("slug", path)
  // const articleId = location.state.articleId;
  const { data: articleData, isLoading: isLoadingArticleData } = useFetchArticleSlug(path);
  console.log('slug',useFetchArticleSlug(path))
  const { data: cardData, isLoading: isLoadingCardData } = useFetchArticles(
    articleData?.categories[0],
    '',
    true,
    'ASC',
    1,
    3,
  );

  useEffect(() => {
    if (path === null) navigate('/404');
  }, []);

  return (
    <Container>
      <Head
        title={`${articleData?.title_article} - Konect Hub`}
        description={articleData?.contents_article}
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
            Kategori Artikel
          </Link>
        </LinkSectionWrapper>
      </SectionContainer>
      <SectionContainer className='mt-5 md:mt-[40px] lg:mt-[70px]'>
        <MainSectionWrapper>
          <h1 className='font-bold text-[16px] md:text-[28px] lg:text-[36px] text-[#454545] leading-[18px] md:leading-[28px] lg:leading-[36px] font-mulish'>
            {!isLoadingArticleData && articleData?.title_article}
          </h1>
          <div className='mt-[10px]'>
            {!isLoadingArticleData &&
              articleData.categories.map((data) => <TagCategory key={data}>{data}</TagCategory>)}
          </div>
          <Profile>
            <img
              src={!isLoadingArticleData && articleData?.avatar}
              alt=''
              className='object-contain w-[22px] h-[22px] md:w-[40px] md:h-[40px] rounded-full'
            />
            <h3 className='text-[12px] md:text-[16px] font-semibold'>
              {!isLoadingArticleData && articleData?.writers_name}
            </h3>
            <img
              src={IconTagGreen}
              alt=''
            />
            <h4 className='text-[10px] md:text-[14px] font-normal -ml-1'>
              {!isLoadingArticleData && moment(articleData?.createdAt).format('MMM, DD YYYY')}
            </h4>
          </Profile>
          <img
            src={!isLoadingArticleData && articleData?.image}
            alt=''
            className='w-full h-auto rounded-lg md:rounded-[5px] md:max-h-[523px] object-cover mt-5'
          />
          <div className='flex flex-col 2xl:flex-row justify-between mt-[62px] md:mt-[24px]'>
            <div
              dangerouslySetInnerHTML={{ __html: !isLoadingArticleData && articleData?.contents_article }}
              className='text-[#454545] text-base leading-snug font-normal 2xl:max-w-[70%] max-w-full'
            />
            <div className='mt-2'>
              <div className='w-full'>
                <h3 className='font-bold text-[#454545] text-[18px] md:text-[24px]'>Artikel Terbaru Untukmu</h3>
                <div className='w-[180px] border-b-8 rounded-lg border-[#00CDB4]' />
              </div>
              {!isLoadingCardData &&
                cardData.data.map((data) => (
                  <BlogHorizontalCardThree
                    avatar={data?.avatar}
                    id={data.id}
                    key={data?.id}
                    title_article={data?.title_article}
                    writers_name={data?.writers_name}
                    image={data?.image}
                    categories={data?.categories}
                    createdAt={moment(data?.createdAt).format('MMM, D YYYY')}
                  />
                ))}
            </div>
          </div>
          <div className='w-full my-4'>
            <h3 className='font-bold text-[#454545] text-[18px] md:text-[24px]'>Artikel Terkait</h3>
            <div className='w-[80px] border-b-8 rounded-lg border-[#00CDB4]' />
          </div>
          <CardSectionWrapper>
            {!isLoadingCardData &&
              cardData.data.map((data) => (
                <BlogCard
                  key={data?.id}
                  title_article={data?.title_article}
                  writers_name={data?.writers_name}
                  createdAt={moment(data?.createdAt).format('MMM, DD YYYY')}
                  categories={data?.categories}
                  avatar={data?.avatar}
                  image={data?.image}
                  id={data?.id}
                />
              ))}
          </CardSectionWrapper>
        </MainSectionWrapper>
      </SectionContainer>
      <div className='mt-[32px] md:mt-[69px]'>
        <Footer />
      </div>
    </Container>
  );
};

export default DetailArtikelHome;
