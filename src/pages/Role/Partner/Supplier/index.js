import { Fragment, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import tw from 'twin.macro';
import { IconNext, IconPrevBold, Trash } from '../../../../assets';
import { Footer, Navbar } from '../../../../component';

const Container = tw.div`
bg-[#E3E8F1] min-h-screen flex flex-col pt-[80px] md:pt-[115px] overflow-hidden select-none
`;

const SectionContainer = tw.div`
w-full px-2 md:px-[56px] lg:px-[76px]
`;

const LinkSectionWrapper = tw.div`
flex gap-1 md:gap-[10px] text-[#2E3A44] font-medium text-xs md:text-sm
`;

const MainSectionWrapper = tw.div`
flex flex-col md:flex-col
`;

const DropdownMobile = tw.select`
inline-flex items-center py-2.5 px-4 text-sm font-medium text-start text-primary bg-white rounded-[8px] w-full mb-3
`;

const Supplier = () => {
  // Pagination
  const [page, setPage] = useState(1);
  const [limit, setlimit] = useState(10);

  const [kategori, setKategori] = useState('Supplier');

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isTab = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1279px)' });
  const isDekstop = useMediaQuery({ query: '(min-width: 1280px)' });

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
            to={-1}
            className=' hover:text-[#00CDB4]'>
            Detail Admin Supplier
          </Link>
          <img
            src={IconNext}
            alt='Icon Next'
          />
          <Link
            to='#'
            className=' hover:text-[#00CDB4]'>
            Supplier
          </Link>
        </LinkSectionWrapper>
      </SectionContainer>
      <SectionContainer>
        <h1 className='text-[14px] md:text-[24px] lg:text-[32px] text-cherry font-[700] my-[18px] md:my-[24px] lg:my-[36px]'>
          Supplier
        </h1>
        {(isMobile || isTab) && (
          <Fragment>
            <DropdownMobile onChange={(e) => setKategori(e.target.value)}>
              <option value='Supplier'>Supplier</option>
              <option value='Supplier Aktif'>Supplier Aktif</option>
              <option value='Klien'>Klien</option>
              <option value='Klien Aktif'>Klien Aktif</option>
            </DropdownMobile>
            <div className='flex flex-col bg-white text-[#A8A8A8] rounded-[8px] font-[400px]'>
              <div className='h-fit'>
                <div className='h-full px-[28px] py-[12px] flex flex-col'>
                  {/* Card Content */}
                  <div className='flex justify-between w-full h-full border-b border-[background: #C0C6D4] py-[13px]'>
                    <div className='w-[80%]'>
                      <h1 className='text-[12px]'>Camera Canon Package</h1>
                      <h4 className='text-[8px] mb-[13px]'>13 Maret 2023</h4>
                      <p className='text-[12px] mb-[8px]'>
                        Lorem ipsum dolor sit amet consectetur. Lacus leo pulvinar eget interdum. Sapien viverra proin
                        non consequat sit.
                      </p>
                      <div className='flex justify-between text-[12px]'>
                        <h3>YG Entertainment</h3>
                        <h3>Rp 40.000.000</h3>
                      </div>
                    </div>
                    <div className='flex items-center justify-center'>
                      <img
                        src={Trash}
                        alt='Trash'
                        className='cursor-pointer hover:opacity-80'
                      />
                    </div>
                  </div>
                  <div className='flex justify-between w-full h-full border-b border-[background: #C0C6D4] py-[13px]'>
                    <div className='w-[80%]'>
                      <h1 className='text-[12px]'>Camera Canon Package</h1>
                      <h4 className='text-[8px] mb-[13px]'>13 Maret 2023</h4>
                      <p className='text-[12px] mb-[8px]'>
                        Lorem ipsum dolor sit amet consectetur. Lacus leo pulvinar eget interdum. Sapien viverra proin
                        non consequat sit.
                      </p>
                      <div className='flex justify-between text-[12px]'>
                        <h3>YG Entertainment</h3>
                        <h3>Rp 40.000.000</h3>
                      </div>
                    </div>
                    <div className='flex items-center justify-center'>
                      <img
                        src={Trash}
                        alt='Trash'
                        className='cursor-pointer hover:opacity-80'
                      />
                    </div>
                  </div>
                  <div className='flex justify-between w-full h-full border-b border-[background: #C0C6D4] py-[13px]'>
                    <div className='w-[80%]'>
                      <h1 className='text-[12px]'>Camera Canon Package</h1>
                      <h4 className='text-[8px] mb-[13px]'>13 Maret 2023</h4>
                      <p className='text-[12px] mb-[8px]'>
                        Lorem ipsum dolor sit amet consectetur. Lacus leo pulvinar eget interdum. Sapien viverra proin
                        non consequat sit.
                      </p>
                      <div className='flex justify-between text-[12px]'>
                        <h3>YG Entertainment</h3>
                        <h3>Rp 40.000.000</h3>
                      </div>
                    </div>
                    <div className='flex items-center justify-center'>
                      <img
                        src={Trash}
                        alt='Trash'
                        className='cursor-pointer hover:opacity-80'
                      />
                    </div>
                  </div>
                  <div className='flex justify-between w-full h-full border-b border-[background: #C0C6D4] py-[13px]'>
                    <div className='w-[80%]'>
                      <h1 className='text-[12px]'>Camera Canon Package</h1>
                      <h4 className='text-[8px] mb-[13px]'>13 Maret 2023</h4>
                      <p className='text-[12px] mb-[8px]'>
                        Lorem ipsum dolor sit amet consectetur. Lacus leo pulvinar eget interdum. Sapien viverra proin
                        non consequat sit.
                      </p>
                      <div className='flex justify-between text-[12px]'>
                        <h3>YG Entertainment</h3>
                        <h3>Rp 40.000.000</h3>
                      </div>
                    </div>
                    <div className='flex items-center justify-center'>
                      <img
                        src={Trash}
                        alt='Trash'
                        className='cursor-pointer hover:opacity-80'
                      />
                    </div>
                  </div>
                  <div className='flex justify-between w-full h-full border-b border-[background: #C0C6D4] py-[13px]'>
                    <div className='w-[80%]'>
                      <h1 className='text-[12px]'>Camera Canon Package</h1>
                      <h4 className='text-[8px] mb-[13px]'>13 Maret 2023</h4>
                      <p className='text-[12px] mb-[8px]'>
                        Lorem ipsum dolor sit amet consectetur. Lacus leo pulvinar eget interdum. Sapien viverra proin
                        non consequat sit.
                      </p>
                      <div className='flex justify-between text-[12px]'>
                        <h3>YG Entertainment</h3>
                        <h3>Rp 40.000.000</h3>
                      </div>
                    </div>
                    <div className='flex items-center justify-center'>
                      <img
                        src={Trash}
                        alt='Trash'
                        className='cursor-pointer hover:opacity-80'
                      />
                    </div>
                  </div>
                  {/* Akhir Pengulangan */}
                  <div className='flex justify-center w-full bg-white'>
                    <ReactPaginate
                      breakLabel={<span className='mr-4'>...</span>}
                      nextLabel={
                        <button
                          className='flex items-center justify-center w-[32px] h-[32px] border-2 rounded-full hover:bg-cherry hover:text-white'
                          // onClick={() => {
                          //   page < cardData.totalPages && setPage(page + 1);
                          // }}
                          // disabled={isLoading}
                        >
                          <img
                            src={IconNext}
                            alt=''
                          />
                        </button>
                      }
                      pageRangeDisplayed={limit}
                      // pageCount={cardData.totalPages}
                      previousLabel={
                        <button
                          className='flex items-center justify-center w-[32px] h-[32px] border-2 rounded-full hover:bg-cherry hover:text-white'
                          // onClick={() => {
                          //   page > 1 && setPage(page - 1);
                          // }}
                          // disabled={isLoading}
                        >
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
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        )}

        {isDekstop && (
          <Fragment>
            <div className='flex w-full gap-x-4'>
              <div className='h-full w-[206px] lg:w-[266px] bg-white text-[14px] font-[400] text-[#CACACA] p-[22px] rounded-[12px]'>
                <h3
                  className={`w-full p-[14px] rounded-[12px] cursor-pointer ${
                    kategori === 'Supplier' && 'text-primary bg-[#F9FBFC]'
                  }`}
                  onClick={() => setKategori('Supplier')}>
                  Supplier
                </h3>
                <h3
                  className={`w-full p-[14px] rounded-[12px] cursor-pointer ${
                    kategori === 'Supplier Aktif' && 'text-primary bg-[#F9FBFC]'
                  }`}
                  onClick={() => setKategori('Supplier Aktif')}>
                  Supplier Aktif
                </h3>
                <h3
                  className={`w-full p-[14px] rounded-[12px] cursor-pointer ${
                    kategori === 'Klien' && 'text-primary bg-[#F9FBFC]'
                  }`}
                  onClick={() => setKategori('Klien')}>
                  Klien
                </h3>
                <h3
                  className={`w-full p-[14px] rounded-[12px] cursor-pointer ${
                    kategori === 'Klien Aktif' && 'text-primary bg-[#F9FBFC]'
                  }`}
                  onClick={() => setKategori('Klien Aktif')}>
                  Klien Aktif
                </h3>
              </div>
              <div className='w-full h-full font-[400px] text-primary text-[14px] rounded-[12px] overflow-hidden'>
                <div className='grid grid-cols-6 text-center items-center bg-[#F9FBFC] border-b border-[#C0C6D4]'>
                  <h3 className='p-[24px]'>Nama Barang</h3>
                  <h3 className='p-[24px]'>Nama Perusahaan</h3>
                  <h3 className='p-[24px]'>Tanggal Bergabung</h3>
                  <h3 className='p-[24px]'>Deskripsi</h3>
                  <h3 className='p-[24px]'>Harga</h3>
                  <h3 className='p-[24px]'>Action</h3>
                </div>
                <div className='border-b bg-white border-[#C0C6D4] grid grid-cols-6 text-[#A8A8A8] justify-items-center items-center py-3'>
                  <h4>Camera Canon Package</h4>
                  <h4>YG Entertainment</h4>
                  <h4>13 Maret 2023</h4>
                  <h4 className='line-clamp-3'>
                    Lorem ipsum dolor sit amet consectetur. Lacus leo pulvinar eget interdum. Sapien viverra proin non
                    consequat sit.
                  </h4>
                  <h4>Rp 40.000.000</h4>
                  <img
                    src={Trash}
                    alt='Trash'
                    className='cursor-pointer'
                  />
                </div>
                {/* Pengulangan */}
                <div className='border-b bg-white border-[#C0C6D4] grid grid-cols-6 text-[#A8A8A8] justify-items-center items-center py-3'>
                  <h4>Camera Canon Package</h4>
                  <h4>YG Entertainment</h4>
                  <h4>13 Maret 2023</h4>
                  <h4 className='line-clamp-3'>
                    Lorem ipsum dolor sit amet consectetur. Lacus leo pulvinar eget interdum. Sapien viverra proin non
                    consequat sit.
                  </h4>
                  <h4>Rp 40.000.000</h4>
                  <img
                    src={Trash}
                    alt='Trash'
                    className='cursor-pointer'
                  />
                </div>
                <div className='border-b bg-white border-[#C0C6D4] grid grid-cols-6 text-[#A8A8A8] justify-items-center items-center py-3'>
                  <h4>Camera Canon Package</h4>
                  <h4>YG Entertainment</h4>
                  <h4>13 Maret 2023</h4>
                  <h4 className='line-clamp-3'>
                    Lorem ipsum dolor sit amet consectetur. Lacus leo pulvinar eget interdum. Sapien viverra proin non
                    consequat sit.
                  </h4>
                  <h4>Rp 40.000.000</h4>
                  <img
                    src={Trash}
                    alt='Trash'
                    className='cursor-pointer'
                  />
                </div>
                <div className='border-b bg-white border-[#C0C6D4] grid grid-cols-6 text-[#A8A8A8] justify-items-center items-center py-3'>
                  <h4>Camera Canon Package</h4>
                  <h4>YG Entertainment</h4>
                  <h4>13 Maret 2023</h4>
                  <h4 className='line-clamp-3'>
                    Lorem ipsum dolor sit amet consectetur. Lacus leo pulvinar eget interdum. Sapien viverra proin non
                    consequat sit.
                  </h4>
                  <h4>Rp 40.000.000</h4>
                  <img
                    src={Trash}
                    alt='Trash'
                    className='cursor-pointer'
                  />
                </div>
                <div className='border-b bg-white border-[#C0C6D4] grid grid-cols-6 text-[#A8A8A8] justify-items-center items-center py-3'>
                  <h4>Camera Canon Package</h4>
                  <h4>YG Entertainment</h4>
                  <h4>13 Maret 2023</h4>
                  <h4 className='line-clamp-3'>
                    Lorem ipsum dolor sit amet consectetur. Lacus leo pulvinar eget interdum. Sapien viverra proin non
                    consequat sit.
                  </h4>
                  <h4>Rp 40.000.000</h4>
                  <img
                    src={Trash}
                    alt='Trash'
                    className='cursor-pointer'
                  />
                </div>
                <div className='border-b bg-white border-[#C0C6D4] grid grid-cols-6 text-[#A8A8A8] justify-items-center items-center py-3'>
                  <h4>Camera Canon Package</h4>
                  <h4>YG Entertainment</h4>
                  <h4>13 Maret 2023</h4>
                  <h4 className='line-clamp-3'>
                    Lorem ipsum dolor sit amet consectetur. Lacus leo pulvinar eget interdum. Sapien viverra proin non
                    consequat sit.
                  </h4>
                  <h4>Rp 40.000.000</h4>
                  <img
                    src={Trash}
                    alt='Trash'
                    className='cursor-pointer'
                  />
                </div>
                <div className='border-b bg-white border-[#C0C6D4] grid grid-cols-6 text-[#A8A8A8] justify-items-center items-center py-3'>
                  <h4>Camera Canon Package</h4>
                  <h4>YG Entertainment</h4>
                  <h4>13 Maret 2023</h4>
                  <h4 className='line-clamp-3'>
                    Lorem ipsum dolor sit amet consectetur. Lacus leo pulvinar eget interdum. Sapien viverra proin non
                    consequat sit.
                  </h4>
                  <h4>Rp 40.000.000</h4>
                  <img
                    src={Trash}
                    alt='Trash'
                    className='cursor-pointer'
                  />
                </div>
                <div className='flex items-center justify-center w-full bg-white'>
                  <ReactPaginate
                    breakLabel={<span className='mr-4'>...</span>}
                    nextLabel={
                      <button
                        className='flex items-center justify-center w-[32px] h-[32px] border-2 rounded-full hover:bg-cherry hover:text-white'
                        // onClick={() => {
                        //   page < cardData.totalPages && setPage(page + 1);
                        // }}
                        // disabled={isLoading}
                      >
                        <img
                          src={IconNext}
                          alt=''
                        />
                      </button>
                    }
                    pageRangeDisplayed={limit}
                    // pageCount={cardData.totalPages}
                    previousLabel={
                      <button
                        className='flex items-center justify-center w-[32px] h-[32px] border-2 rounded-full hover:bg-cherry hover:text-white'
                        // onClick={() => {
                        //   page > 1 && setPage(page - 1);
                        // }}
                        // disabled={isLoading}
                      >
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
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </SectionContainer>
      <div className='mt-[77px] md:mt-[101px]'>
        <Footer />
      </div>
    </Container>
  );
};

export default Supplier;
