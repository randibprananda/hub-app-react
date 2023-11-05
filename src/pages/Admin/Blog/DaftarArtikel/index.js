import 'moment/locale/id';

import { Link, useNavigate } from 'react-router-dom';
import {
  IconAddTwo,
  IconBlogGradient,
  IconDelete,
  IconEditTwo,
  IconEkspor,
  IconEyeTwo,
  IconNext,
  IconPrev,
  IconSearch,
  NoData,
} from '../../../../assets';
import { FooterTwo, NavbarAdmin, Sidebar } from '../../../../component';

import moment from 'moment';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDeleteArticle } from '../../../../features/blog/useDeleteArticle';
import { useFetchArticles } from '../../../../features/blog/useFetchArticles';

const DaftarArtikel = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setlimit] = useState(10);
  const [isActive, setIsActive] = useState(true);
  const [sort, setSort] = useState('ASC');
  const [selectedId, setSelectedId] = useState(0);
  const [category, setCategory] = useState('');

  const { mutate: deleteArticle } = useDeleteArticle({
    onSuccess: () => {
      refetch();
    },
  });

  const {
    data: getArticles,
    isLoading: getArticlesIsLoading,
    refetch,
  } = useFetchArticles(category, search, isActive, sort, page, limit);

  return (
    <div>
      <div className='h-screen bg-outline '>
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
              to={'/admin'}
              className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>
              Dashboard
            </Link>
            <img
              src={IconNext}
              alt=''
            />
            <button className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>Blog</button>
          </div>
          <div className='flex flex-col'>
            <div className='-my-2'>
              <div className='inline-block w-full h-full py-2'>
                <div className='bg-white border-b border-gray-200 shadow sm:rounded-lg'>
                  <div className='w-full px-6 py-5'>
                    <div className='flex items-center justify-between'>
                      <div className=''>
                        <h1 className='text-2xl text-[#2E3A44] font-bold'>Daftar Blog</h1>
                        <h1 className='text-base text-[#A8A8A8] font-medium'>{getArticles?.total} Data</h1>
                      </div>
                      <div className='flex gap-3'>
                        <h1 className='text-base text-cherry'>Ekspor</h1>
                        <img
                          src={IconEkspor}
                          alt='Icon Ekspor'
                        />
                      </div>
                    </div>
                    <div className='flex flex-col mt-5 space-y-3 md:justify-between md:flex-row md:space-y-0'>
                      <div className='relative w-full md:w-max'>
                        <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                          <img
                            src={IconSearch}
                            alt='Icon Search'
                          />
                        </div>
                        <input
                          type='text'
                          id='simple-search'
                          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full pr-10 p-2.5'
                          placeholder='Cari ...'
                          required
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>
                      <div className='flex flex-col items-center gap-2 space-y-3 md:space-y-0 md:flex-row'>
                        <Link
                          to={'/admin/blog/tambah-artikel'}
                          className='flex w-full gap-3 px-4 py-3 text-sm text-white rounded-lg bg-cherry'>
                          <img
                            src={IconAddTwo}
                            alt='Icon Add'
                          />
                          <p>Tambah Blog</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className='overflow-x-auto scrollbar-hide'>
                    <table className='w-full divide-y divide-gray-200'>
                      <thead className='bg-gray-50'>
                        <tr>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-base font-bold text-[#2E3A44] uppercase tracking-wider truncate'>
                            Judul Artikel
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-base font-bold text-[#2E3A44] uppercase tracking-wider truncate'>
                            Tanggal Uploud
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-center text-base font-bold text-[#2E3A44] uppercase tracking-wider truncate w-[153px]'>
                            Action
                          </th>
                        </tr>
                      </thead>
                      {!getArticlesIsLoading ? (
                        getArticles.data.map((data) => (
                          <tbody
                            className='bg-white divide-y divide-gray-200 px-[20px] py-[16px]'
                            key={data.id}>
                            <tr>
                              <td className='text-black px-6 py-4 truncate w-[594px] font-semibold'>
                                {data.title_article}
                              </td>
                              <td className='text-black px-6 py-4 truncate w-[400px]'>
                                {moment(data.createdAt).locale('id').format('dddd, D MMMM YYYY')}
                              </td>
                              <td className='text-black px-6 py-4 truncate w-[253px]'>
                                <div className='flex justify-center w-full gap-5'>
                                  <div onClick={() => navigate('/admin/blog/detail-artikel', { state: data.id })}>
                                    <img
                                      src={IconEyeTwo}
                                      alt=''
                                      className='h-5'
                                    />
                                  </div>
                                  <div onClick={() => navigate('/admin/blog/edit-artikel', { state: data.id })}>
                                    <img
                                      src={IconEditTwo}
                                      alt=''
                                      className='h-5 '
                                    />
                                  </div>
                                  <button
                                    onClick={() => {
                                      setModal(true);
                                      setSelectedId(data.id);
                                    }}>
                                    <img
                                      src={IconDelete}
                                      alt=''
                                      className='h-5'
                                    />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        ))
                      ) : (
                        <tbody>
                          <div className='w-full h-[697px] flex flex-col justify-center items-center gap-[43px]'>
                            <img
                              src={NoData}
                              alt='NoData'
                            />
                            <h3 className='text-[#CACACA] font-normal'>Belum ada data artikel</h3>
                          </div>
                        </tbody>
                      )}
                    </table>
                    {!getArticlesIsLoading && (
                      <div className='flex justify-center'>
                        <ReactPaginate
                          breakLabel={<span className='mr-4'>...</span>}
                          nextLabel={
                            <button
                              className='flex items-center justify-center w-12 h-12 border-2 rounded-full hover:bg-cherry hover:text-white'
                              onClick={() => {
                                page < getArticles.totalPages && setPage(page + 1);
                                refetch();
                              }}
                              disabled={getArticlesIsLoading}>
                              <img
                                src={IconNext}
                                alt=''
                              />
                            </button>
                          }
                          pageRangeDisplayed={limit}
                          pageCount={getArticles.totalPages}
                          previousLabel={
                            <button
                              className='flex items-center justify-center w-12 h-12 border-2 rounded-full hover:bg-cherry hover:text-white'
                              onClick={() => {
                                if (1 < page && page < getArticles.totalPages) {
                                  setPage(page - 1);
                                  refetch();
                                }
                              }}
                              disabled={getArticlesIsLoading}>
                              <img
                                src={IconPrev}
                                alt=''
                              />
                            </button>
                          }
                          // renderOnZeroPageCount={null}
                          containerClassName='flex items-center justify center mt-8 mb-4 space-x-10'
                          disabledClassName='w-12 h-12 rounded-full border-2 flex items-center justify-center'
                          activeClassName='w-12 h-12 rounded-full border-2 bg-cherry text-white flex items-center justify-center'
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Modal */}
        {modal === true && (
          <div className='absolute top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-opacity-50 bg-slate-800'>
            <div class='bg-white px-16 py-14 rounded-md text-center'>
              <img
                src={IconDelete}
                alt='Icon Delete'
                className='w-[30px] mx-auto mb-[20px]'
              />
              <h1 class='text-8 md:text-[14px] mb-4 text-black'>
                Apakah anda yakin untuk menghapus artikel <br />
                <strong>“ Judul ”</strong> ?
              </h1>
              <button
                className='bg-[#C0C6D4] px-4 py-2 rounded-md text-md text-white'
                onClick={() => setModal(false)}>
                Tidak
              </button>
              <button
                className='bg-[#C1121F] px-7 py-2 ml-2 rounded-md text-md text-white'
                onClick={() => {
                  deleteArticle(selectedId);
                  setModal(false);
                }}>
                Ya
              </button>
              <h1 tw='text-red-500'></h1>
            </div>
          </div>
        )}
        <FooterTwo />
      </div>
    </div>
  );
};

export default DaftarArtikel;
