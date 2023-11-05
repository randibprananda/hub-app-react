import * as XLSX from 'xlsx';

import { FooterTwo, NavbarAdmin, Pagination, Sidebar } from '../../../../component';
import {
  IconAddon,
  IconDashboardGradient,
  IconMessage,
  IconNext,
  IconNotification,
  IconOpenTenderColor,
  IconProfile,
  IconStakeholder,
  IconStatus,
  Logo,
  LogoDefault,
  PendampinganKonect
} from '../../../../assets';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

import Api from '../../../../Api';
import ReactPaginate from 'react-paginate';
import imageHandle from '../../../../utils/imageHandle';
import { saveAs } from 'file-saver';
import { useEffect } from 'react';

const DaftarTender = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [tender, setTender] = useState('');
  const [stakeholderList, setStakeholderList] = useState('');
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(false)
  const [totalPages, setTotalPages] = useState('');
  const [search, setSearch] = useState('');
  const [isActive, setIsActive] = useState('');
  const [addons, setAddOns] = useState('all');
  const [stakeholderId, setStakeholderId] = useState('');
  const [error, setError] = useState(false);

  const getDataTender = async () => {
    try {
      const resTender = await Api.TenderListAdmin(
        localStorage.getItem('token-hub'),
        limit,
        page,
        search,
        isActive,
        addons,
        stakeholderId
      );
      const resStakeholder = await Api.StakeholderListAdmin(localStorage.getItem('token-hub'));
      // const resStakeholder  = await Api.StakeholderListAdmin(localStorage.getItem('token-hub'))
      // setStakeholderList(resStakeholder.data.stakeholder.rows)
      setTender(resTender.data.pagination.data);
      setTotalPages(resTender.data.pagination.totalPages);
      setStakeholderList(resStakeholder.data.stakeholder.rows);
      setError(false);
    } catch (error) {
      console.log(error.message);
      setError(true);
    }
  };

  console.log({tender})

  const exportToExcel = () => {
    const datas = tender.map((row) => ({
      title: row.title,
      isActive: row.is_active,
      isAsissted: row.is_assisted,
      stakeholder_name: row.stakeholder.fullname,
    }));

    // Create a new worksheet
    const worksheet = XLSX.utils.json_to_sheet(datas);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

    // Generate Excel file buffer
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });

    // Convert buffer to Blob
    const excelBlob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    // Save the Excel file using FileSaver.js
    saveAs(excelBlob, 'data.xlsx');
  };

  const handlePageChange = (page) => {
    setPage(page);
    setRefresh(true)
  };

  const handlePrevChange = () => {
      if(page === 1) {
          setPage(1)
      } else {
          setPage(page - 1);
      }
      setRefresh(true)
  };

  const handleNextChange = () => {
      if(page === totalPages) {
          setPage(totalPages)
      } else {
          setPage(page + 1);
      }
      setRefresh(true)
  };

  useEffect(() => {
    getDataTender();
  },[page, refresh]);

  return (
    <div>
      <div className='h-full bg-outline'>
        <Sidebar
          activeMenu={4}
          open={open}
          setOpen={setOpen}
        />
        <div
          className={`${open ? 'lg:ml-80 md:ml-28 ml-0' : 'lg:ml-24 md:ml-28 ml-0'} 
                    h-full p-7`}
        >
          <NavbarAdmin
            title={'Open Tender'}
            open={open}
            setOpen={setOpen}
          />
          <div className='flex flex-wrap items-center gap-3 mb-[30px] pt-[120px]'>
            <Link
              to={'/admin'}
              className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'
            >
              Dashboard
            </Link>
            <img
              src={IconNext}
              alt=''
            />
            <button className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>Open Tender</button>
          </div>
          <div className='flex flex-col'>
            <div className='-my-2'>
              <div className='inline-block w-full h-screen py-2'>
                <div className='bg-white border-b border-gray-200 shadow sm:rounded-lg'>
                  <div className='w-full px-6 py-5'>
                    <div className='flex items-center justify-between'>
                      <div className=''>
                        <h1 className='text-2xl text-[#2E3A44] font-bold'>Daftar Tender</h1>
                        <h1 className='text-base text-[#A8A8A8] font-medium'>{tender.length} Tender</h1>
                      </div>
                      <div
                        className='flex gap-1 cursor-pointer'
                        onClick={exportToExcel}
                      >
                        <h1 className='text-base text-cherry'>Ekspor</h1>
                        <svg
                          width='20'
                          height='20'
                          viewBox='0 0 20 20'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M18.8568 13.1091L15.165 10.4807C15.1272 10.4536 15.0827 10.4375 15.0364 10.4342C14.9901 10.4309 14.9437 10.4406 14.9026 10.4621C14.8178 10.5057 14.7658 10.6009 14.7656 10.6967L14.7674 11.9409H11.4462C11.305 11.9409 11.168 12.0403 11.168 12.1817V14.4701C11.168 14.6115 11.305 14.7089 11.4462 14.7089H14.801V15.9629C14.801 16.0585 14.8378 16.1463 14.9228 16.1901C15.0078 16.2339 15.0934 16.2265 15.1712 16.1707L18.8576 13.5251C18.9246 13.4773 18.953 13.3999 18.953 13.3175V13.3171C18.953 13.2343 18.9242 13.1571 18.8568 13.1091Z'
                            fill='#2D014B'
                          />
                          <path
                            d='M12.8119 15.7122H11.5139C11.4221 15.7122 11.3341 15.7486 11.2692 15.8135C11.2043 15.8784 11.1679 15.9664 11.1679 16.0582H11.1665V16.6602H3.03807V7.23356H6.58267C6.67444 7.23356 6.76245 7.19711 6.82733 7.13222C6.89222 7.06733 6.92867 6.97933 6.92867 6.88756V3.34296H11.1663V10.6142H11.1685C11.1704 10.7045 11.2076 10.7904 11.2721 10.8536C11.3367 10.9168 11.4234 10.9523 11.5137 10.9524H12.8117C13.0003 10.9524 13.1527 10.8016 13.1569 10.6142H13.1577V2.50156H13.1567V1.69756C13.1567 1.6058 13.1202 1.51779 13.0553 1.4529C12.9904 1.38802 12.9024 1.35156 12.8107 1.35156H6.23667L1.04688 6.54156V18.3054C1.04688 18.4966 1.20167 18.6514 1.39287 18.6514H12.8107C12.9024 18.6514 12.9904 18.6149 13.0553 18.55C13.1202 18.4851 13.1567 18.3971 13.1567 18.3054V17.8158H13.1577V16.0578C13.1576 15.9661 13.1212 15.8782 13.0563 15.8134C12.9915 15.7486 12.9036 15.7122 12.8119 15.7122Z'
                            fill='#2D014B'
                          />
                          <path
                            d='M5.2363 12.8365C5.4025 12.8365 5.5463 12.9611 5.5935 13.1049L6.0751 12.8807C5.9645 12.6261 5.7209 12.3438 5.2365 12.3438C4.6579 12.3438 4.2207 12.7286 4.2207 13.2988C4.2207 13.8662 4.6581 14.2536 5.2365 14.2536C5.7209 14.2536 5.9673 13.9601 6.0751 13.7137L5.5935 13.4924C5.5465 13.6362 5.4025 13.7607 5.2363 13.7607C4.9679 13.7607 4.7879 13.556 4.7879 13.2986C4.7879 13.0412 4.9677 12.8365 5.2363 12.8365ZM7.1315 13.7833C6.90986 13.7836 6.69666 13.6984 6.5363 13.5454L6.2457 13.9605C6.4421 14.1377 6.7107 14.254 7.1039 14.254C7.5993 14.254 7.9011 14.0188 7.9011 13.6118C7.9011 12.9254 6.8741 13.0747 6.8741 12.9003C6.8741 12.8533 6.9045 12.8174 7.0153 12.8174C7.1897 12.8174 7.3973 12.8781 7.5577 12.9999L7.8567 12.6042C7.6463 12.4326 7.3751 12.3467 7.0733 12.3467C6.5667 12.3467 6.3067 12.6457 6.3067 12.9585C6.3067 13.6865 7.3363 13.5065 7.3363 13.6837C7.3363 13.7555 7.2367 13.7833 7.1315 13.7833ZM8.6545 12.3743H8.0207L8.7015 14.2206H9.4047L10.0855 12.3743H9.4517L9.0531 13.6171L8.6545 12.3743Z'
                            fill='#2D014B'
                          />
                        </svg>
                      </div>
                    </div>
                    <div className='flex flex-col mt-5 space-y-3 md:justify-between md:flex-row md:space-y-0'>
                      <div className='relative w-full md:w-max'>
                        <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                          <svg
                            width='20'
                            height='20'
                            viewBox='0 0 20 20'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <g clip-path='url(#clip0_979_102668)'>
                              <path
                                d='M14.6786 12.9277C15.889 11.276 16.4311 9.2283 16.1965 7.19412C15.9619 5.15994 14.9679 3.28936 13.4133 1.9566C11.8588 0.623835 9.85831 -0.0728113 7.81217 0.0060301C5.76603 0.0848715 3.8251 0.933387 2.37771 2.38182C0.930312 3.83025 0.0831854 5.77178 0.00580817 7.81798C-0.0715691 9.86417 0.626509 11.8641 1.96038 13.4177C3.29426 14.9713 5.16555 15.964 7.1999 16.1972C9.23424 16.4303 11.2816 15.8867 12.9324 14.6752H12.9311C12.9686 14.7252 13.0086 14.7727 13.0536 14.8189L17.8661 19.6314C18.1005 19.866 18.4185 19.9978 18.7501 19.9979C19.0816 19.9981 19.3997 19.8664 19.6342 19.6321C19.8688 19.3977 20.0006 19.0797 20.0008 18.7481C20.0009 18.4165 19.8693 18.0985 19.6349 17.8639L14.8224 13.0514C14.7777 13.0062 14.7296 12.9657 14.6786 12.9277ZM15.0011 8.12268C15.0011 9.02552 14.8233 9.91952 14.4778 10.7536C14.1323 11.5877 13.6259 12.3456 12.9875 12.984C12.3491 13.6224 11.5912 14.1289 10.7571 14.4744C9.92296 14.8199 9.02896 14.9977 8.12612 14.9977C7.22329 14.9977 6.32929 14.8199 5.49517 14.4744C4.66106 14.1289 3.90317 13.6224 3.26476 12.984C2.62636 12.3456 2.11995 11.5877 1.77445 10.7536C1.42895 9.91952 1.25112 9.02552 1.25112 8.12268C1.25112 6.29932 1.97545 4.55064 3.26476 3.26133C4.55408 1.97201 6.30276 1.24768 8.12612 1.24768C9.94949 1.24768 11.6982 1.97201 12.9875 3.26133C14.2768 4.55064 15.0011 6.29932 15.0011 8.12268Z'
                                fill='#A8A8A8'
                              />
                            </g>
                            <defs>
                              <clipPath id='clip0_979_102668'>
                                <rect
                                  width='20'
                                  height='20'
                                  fill='white'
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <input
                          type='text'
                          id='simple-search'
                          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full pr-10 p-2.5'
                          placeholder='Search'
                          required
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>
                      <div className='flex flex-col gap-2 space-y-3 md:space-y-0 md:flex-row'>
                        <div className='relative'>
                          <select
                            onChange={(e) => setIsActive(e.target.value)}
                            className='bg-gray-50 text-[#A8A8A8] border border-gray-300 text-sm rounded-lg  block w-full pl-10 p-2.5 appearance-none'
                          >
                            <option
                              value=''
                              disabled
                            >
                              Filter Status
                            </option>
                            <option value={true}>Tender Aktif</option>
                            <option value={false}>Tender Non Aktif</option>
                            <option value={''}>Tampilkan Semua</option>
                          </select>
                          <img
                            src={IconStatus}
                            className='absolute top-3 left-4'
                            alt=''
                          />
                        </div>
                        <div className='relative'>
                          <select
                            onChange={(e) => setStakeholderId(e.target.value)}
                            className='bg-gray-50 text-[#A8A8A8] border border-gray-300 text-sm rounded-lg  block w-full pl-10 p-2.5 appearance-none'
                          >
                            <option disabled>Filter Stakeholder</option>
                            <option value='all'>Tampilkan Semua</option>
                            {Object.values(stakeholderList).map((data, index) => {
                              return (
                                <option
                                  value={data.id}
                                  key={index}
                                >
                                  {data.fullname}
                                </option>
                              );
                            })}
                          </select>
                          <img
                            src={IconStakeholder}
                            className='absolute top-3 left-4'
                            alt=''
                          />
                        </div>
                        <div className='relative'>
                          <select
                            onChange={(e) => setAddOns(e.target.value)}
                            className='bg-gray-50 text-[#A8A8A8] border border-gray-300 text-sm rounded-lg  block w-full pl-10 p-2.5 appearance-none'
                          >
                            <option
                              value=''
                              disabled
                            >
                              Filter Add Ons{' '}
                            </option>
                            <option value={'all'}>Tampilkan Semua</option>
                            <option value={false}>Tanpa Add Ons</option>
                            <option value={true}>Menggunakan Add Ons</option>
                          </select>
                          <img
                            src={IconAddon}
                            className='absolute top-3 left-4'
                            alt=''
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='overflow-x-auto scrollbar-hide'>
                    <table className='w-full divide-y divide-gray-200'>
                      <thead className='bg-gray-50'>
                        <tr>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-base font-bold text-[#2E3A44] uppercase tracking-wider truncate'
                          >
                            Nama Tender
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-base font-bold text-[#2E3A44] uppercase tracking-wider truncate'
                          >
                            Stakeholder
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-base font-bold text-[#2E3A44] uppercase tracking-wider truncate'
                          >
                            Status
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-base font-bold text-[#2E3A44] uppercase tracking-wider truncate'
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className='bg-white divide-y divide-gray-200'>
                        {error ? (
                          <tr>
                            <td className='px-6 py-4 text-black truncate'>-</td>
                            <td className='px-6 py-4 text-black truncate'>-</td>
                            <td className='px-6 py-4 text-black truncate'>-</td>
                            <td className='px-6 py-4 text-black truncate'>-</td>
                          </tr>
                        ) : (
                          Object.values(tender).map((tender) => (
                            <tr
                              key={tender.email}
                              className='bg-[#F8FAFC]'
                            >
                              <td className='px-6 py-4 truncate'>
                                <div className='flex items-center'>
                                  <div className=' h-[60px] w-[60px]'>
                                    <img
                                      className='h-[60px] w-[60px] rounded'
                                      src={imageHandle(tender.tender_images[0].image)}
                                      alt=''
                                    />
                                  </div>
                                  <div className='ml-4 space-y-[10px]'>
                                    <h1 className='text-sm font-inter font-medium text-[#1E293B]'>{tender.title} </h1>
                                    <div className='flex items-center gap-3'>
                                      <img
                                        src={PendampinganKonect}
                                        alt='Pendampingan Konect'
                                        className='w-[12px] h-[14.83px]'
                                      />
                                      <h3 className='text-xs font-semibold text-cherry'>Pendampingan Konect</h3>
                                    </div>
                                  </div>
                                </div>
                                {tender.is_assisted && (
                                  <div className='flex items-center gap-1 ml-[75px]'>
                                    <svg
                                      width='18'
                                      height='18'
                                      viewBox='0 0 18 18'
                                      fill='none'
                                      xmlns='http://www.w3.org/2000/svg'
                                    >
                                      <path
                                        d='M8.2125 9.52578L7.18125 8.47578C7.03125 8.32578 6.85325 8.25078 6.64725 8.25078C6.44125 8.25078 6.263 8.32578 6.1125 8.47578C5.9625 8.62578 5.88425 8.80403 5.87775 9.01053C5.87125 9.21703 5.94325 9.39503 6.09375 9.54453L7.6875 11.1383C7.8375 11.2883 8.0125 11.3633 8.2125 11.3633C8.4125 11.3633 8.5875 11.2883 8.7375 11.1383L11.925 7.95078C12.075 7.80078 12.15 7.62278 12.15 7.41678C12.15 7.21078 12.075 7.03253 11.925 6.88203C11.775 6.73203 11.5968 6.65703 11.3903 6.65703C11.1838 6.65703 11.0058 6.73203 10.8563 6.88203L8.2125 9.52578ZM9 16.4445H8.8125C8.75 16.4445 8.69375 16.432 8.64375 16.407C7.00625 15.8945 5.65625 14.8788 4.59375 13.3598C3.53125 11.8408 3 10.1628 3 8.32578V4.78203C3 4.46953 3.09075 4.18828 3.27225 3.93828C3.45375 3.68828 3.688 3.50703 3.975 3.39453L8.475 1.70703C8.65 1.64453 8.825 1.61328 9 1.61328C9.175 1.61328 9.35 1.64453 9.525 1.70703L14.025 3.39453C14.3125 3.50703 14.547 3.68828 14.7285 3.93828C14.91 4.18828 15.0005 4.46953 15 4.78203V8.32578C15 10.1633 14.4688 11.8415 13.4062 13.3605C12.3438 14.8795 10.9938 15.895 9.35625 16.407C9.29375 16.432 9.175 16.4445 9 16.4445Z'
                                        fill='url(#paint0_linear_979_102607)'
                                      />
                                      <defs>
                                        <linearGradient
                                          id='paint0_linear_979_102607'
                                          x1='8.99941'
                                          y1='1.80071'
                                          x2='9'
                                          y2='16.4445'
                                          gradientUnits='userSpaceOnUse'
                                        >
                                          <stop stop-color='#00CDB4' />
                                          <stop
                                            offset='1'
                                            stop-color='#028878'
                                          />
                                        </linearGradient>
                                      </defs>
                                    </svg>
                                    <h1 className='font-semibold text-xxs text-cherry'>Pendampingan Konect</h1>
                                  </div>
                                )}
                              </td>
                              <td className='px-6 py-4 truncate'>
                                <div className='flex items-center gap-2'>
                                  <img
                                    className='h-[18px] w-[18px] rounded-full'
                                    src={
                                      !tender.stakeholder.image ? LogoDefault : imageHandle(tender.stakeholder.image)
                                    }
                                    alt=''
                                  />
                                  <div className='text-sm text-gray-900'>{tender.stakeholder.fullname}</div>
                                </div>
                              </td>
                              <td className='px-6 py-4 truncate'>
                                {tender.is_active ? (
                                  <span className='rounded-lg text-xs text-[#30DF3F] border border-[#30DF3F] font-medium bg-[#E8FFF3] px-4 py-[6px]'>
                                    Tender Aktif
                                  </span>
                                ) : (
                                  <span className='rounded-lg text-xs text-[#C1121F] border border-[#C1121F] font-medium bg-[#FFDDE0] px-4 py-[6px]'>
                                    Tender Selesai
                                  </span>
                                )}
                              </td>
                              <td className='px-6 py-4 truncate'>
                                <button
                                  onClick={() =>
                                    navigate('/admin/detail-open-tender', { state: { tenderId: tender.id } })
                                  }
                                >
                                  <button className='text-[#00CDB4] bg-white border text-sm border-[#00CDB4] px-5 py-2 rounded-lg'>
                                    Lihat Detail
                                  </button>
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className='flex justify-center py-8'>
                  <Pagination
                      currentPage={page} 
                      totalPages={totalPages}
                      showingData={!tender.length < limit ? tender.length : limit}
                      onPageChange={handlePageChange}
                      onPrevChange={handlePrevChange}
                      onNextChange={handleNextChange}
                  />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterTwo />
    </div>
  );
};

export default DaftarTender;
