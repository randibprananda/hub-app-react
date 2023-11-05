import { Dashboard, ExpandMore, HorizontalRule } from '@mui/icons-material';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Api from '../../Api';
import { AltImage, IconNext } from '../../assets';
import { Card1, Footer, Head, Navbar } from '../../component';
import imageHandle from '../../utils/imageHandle';

function Search() {
  const location = useLocation();
  const [searchResult, setSearchResult] = useState(location.state);
  const [refreshApi, setRefreshApi] = useState(false);
  const [lokasi, setLokasi] = useState(false);
  const [peserta, setPeserta] = useState(false);
  const [harga, setHarga] = useState(false);
  const [jadwal, setJadwal] = useState(false);

  const [kategori, setKategori] = useState('');
  const [minPriceFilter, setMinPriceFilter] = useState([]);
  const [maxPriceFilter, setMaxPriceFilter] = useState([]);
  const [locFilter, setLocFilter] = useState({
    response: [],
  });

  const [dataEo, setDataEo] = useState([]);
  const [dataVenue, setDataVenue] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [dataTalent, setDataTalent] = useState([]);

  const inAwait = async () => {
    await Api.postAllServices().then(async (response) => {
      console.log('hasil', response.data.services[0].eoServices);
      // setData(response.data.services[0].eoServices)
    });
  };
  const onFinishedRefresh = () => {
    setSearchResult(location);
  };

  const filter = async (e) => {
    const path = `services?minPriceFilter=${minPriceFilter}&maxPriceFilter=${maxPriceFilter}&category=${kategori}&locFilter=${locFilter.response.toString()}&search=${
      searchResult ? searchResult : ''
    }`;
    console.log(path);
    await Api.postFilter(path).then(async (response) => {
      console.log('hasil Filter', response.data);
      setDataEo(response.data.services[0].eoServices);
      setDataVenue(response.data.services[1].venueServices);
      setDataProduct(response.data.services[2].productSupplies);
      setDataTalent(response.data.services[3].talentServices);
      // setRefreshApi(true)
      // location = null
    });
  };

  useEffect(() => {
    console.log(searchResult?.service);
    if (searchResult?.state != null) {
      console.log('hasil search', searchResult?.state);
      setDataEo(searchResult?.state?.services[0].eoServices);
      setDataVenue(searchResult?.state?.services[1].venueServices);
      setDataProduct(searchResult?.state?.services[2].productSupplies);
      setDataTalent(searchResult?.state?.services[3].talentServices);
      setSearchResult(null);
    } else if (searchResult != null) {
      console.log('hasil search', searchResult);
      setDataEo(searchResult?.services[0].eoServices);
      setDataVenue(searchResult?.services[1].venueServices);
      setDataProduct(searchResult?.services[2].productSupplies);
      setDataTalent(searchResult?.services[3].talentServices);
      setSearchResult(null);
    } else {
      // inAwait()
      filter();
      // console.log("filter")
    }
    setRefreshApi(false);
  }, [location, refreshApi]);

  const handleChange = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { response } = locFilter;

    // Case 1 : The user checks the box
    if (checked) {
      setLocFilter({
        response: [...response, value],
      });
      // filter()
      setRefreshApi(true);
    }

    // Case 2  : The user unchecks the box
    else {
      setLocFilter({
        response: response.filter((e) => e !== value),
      });
      // filter()
      setRefreshApi(true);
    }
  };

  return (
    <Fragment>
      <Head
        title={`${kategori === '' ? 'SEMUA' : kategori} - Konect Hub`}
        description='Pencarian jasa berdasarkan kategori di Konect Hub'
      />
      <div className='bg-[#E3E8F1] min-h-screen'>
        <Navbar onFinish={onFinishedRefresh} />
        <div className='md:px-[75px] px-[36px] pt-[120px] pb-[10px] md:pt-[140px] md:pb-[30px] mb-10'>
          <div className='flex flex-wrap items-center gap-3 mb-[30px]'>
            <Link
              to={'/'}
              className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>
              Beranda
            </Link>
            <img
              src={IconNext}
              alt='Icon Next'
            />
            <Link
              to={'/search'}
              className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>
              Pencarian
            </Link>
          </div>
          <div className='grid lg:grid-cols-12 md:grid-cols-12 grid-cols-1 bg-[#ECEEF6] rounded-xl lg:h-screen md:h-screen'>
            <div className='bg-white lg:col-span-3 md:col-span-3 rounded-l-xl lg:h-screen md:h-screen'>
              <div className='flex justify-between items-center pb-2.5 border-b px-7 py-10'>
                <div className='flex items-center gap-6'>
                  <svg
                    width='26'
                    height='22'
                    viewBox='0 0 26 22'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      opacity='0.7'
                      d='M16.1348 2.5C14.3763 2.5 2.2402 2.5 2.2402 2.5C0.481661 2.5 0.1875 2.94805 0.1875 3.5C0.1875 4.05122 0.481661 4.5 2.2402 4.5H16.1348C17.8933 4.5 18.1875 4.16667 18.1875 3.5C18.1875 2.94805 17.8933 2.5 16.1348 2.5Z'
                      fill='black'
                    />
                    <path
                      d='M25.8125 3.0004C25.8125 4.38063 24.6938 5.5 23.3125 5.5C21.932 5.5 20.8125 4.38063 20.8125 3.0004C20.8125 1.61937 21.932 0.5 23.3125 0.5C24.6938 0.5 25.8125 1.61937 25.8125 3.0004Z'
                      fill='#5C5C5C'
                    />
                    <path
                      opacity='0.7'
                      d='M9.22305 10.5H23.1321C24.8925 10.5 25.1875 10.948 25.1875 11.5C25.1875 12.0512 24.8925 12.5 23.1321 12.5H9.22305C7.46268 12.5 7.1875 12.0512 7.1875 11.5C7.1875 10.948 7.46268 10.5 9.22305 10.5Z'
                      fill='black'
                    />
                    <path
                      d='M0.1875 11.0004C0.1875 12.3806 1.30624 13.5 2.6875 13.5C4.06795 13.5 5.1875 12.3806 5.1875 11.0004C5.1875 9.61937 4.06795 8.5 2.6875 8.5C1.30624 8.5 0.1875 9.61937 0.1875 11.0004Z'
                      fill='#5C5C5C'
                    />
                    <path
                      opacity='0.7'
                      d='M16.1348 18.5H2.2402C0.481661 18.5 0.1875 18.948 0.1875 19.5C0.1875 20.0512 0.481661 20.5 2.2402 20.5H16.1348C17.8933 20.5 18.1875 20.0512 18.1875 19.5C18.1875 18.948 17.8933 18.5 16.1348 18.5Z'
                      fill='black'
                    />
                    <path
                      d='M25.8125 19.0004C25.8125 20.3806 24.6938 21.5 23.3125 21.5C21.932 21.5 20.8125 20.3806 20.8125 19.0004C20.8125 17.6194 21.932 16.5 23.3125 16.5C24.6938 16.5 25.8125 17.6194 25.8125 19.0004Z'
                      fill='#5C5C5C'
                    />
                  </svg>
                  <p>Filter</p>
                </div>
                <svg
                  width='29'
                  height='24'
                  viewBox='0 0 29 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M5.0625 12.2744L20.0625 12.2744'
                    stroke='#454545'
                    stroke-width='1.5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M11.1123 18.299L5.0623 12.275L11.1123 6.25'
                    stroke='#454545'
                    stroke-width='1.5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <rect
                    x='26.8125'
                    width='2'
                    height='24'
                    rx='1'
                    fill='#454545'
                  />
                </svg>
              </div>
              <div className='py-5 overflow-y-auto px-7 h-5/6 scroll-smooth scrollbar-hide'>
                <div className='py-3 border-b'>
                  <button
                    onClick={() => {
                      setLokasi(!lokasi);
                    }}
                    className='flex items-center justify-between w-full'>
                    <p>Lokasi</p>
                    <ExpandMore />
                  </button>
                  {lokasi ? (
                    <div className='py-1.5'>
                      <div className='flex items-center gap-2 mr-[30px] pb-1.5'>
                        <input
                          onChange={handleChange}
                          id='checkbox1'
                          type='checkbox'
                          name='lokasi'
                          value='Jawa Barat'
                          className=''
                        />
                        <label
                          htmlFor='checkbox1'
                          className='cursor-pointer w-full text-sm font-medium text-[#C0C6D4] dark:text-[#C0C6D4]'>
                          Jawa Barat
                        </label>
                      </div>
                      <div className='flex items-center gap-2 mr-[30px] pb-1.5'>
                        <input
                          onChange={handleChange}
                          id='checkbox2'
                          type='checkbox'
                          name='lokasi'
                          value='Jawa Tengah'
                          className=''
                        />
                        <label
                          htmlFor='checkbox2'
                          className='cursor-pointer w-full text-sm font-medium text-[#C0C6D4] dark:text-[#C0C6D4]'>
                          Jawa Tengah
                        </label>
                      </div>
                      <div className='flex items-center gap-2 mr-[30px] pb-1.5'>
                        <input
                          onChange={handleChange}
                          id='checkbox3'
                          type='checkbox'
                          name='lokasi'
                          value='Jawa Timur'
                          className=''
                        />
                        <label
                          htmlFor='checkbox3'
                          className='cursor-pointer w-full text-sm font-medium text-[#C0C6D4] dark:text-[#C0C6D4]'>
                          Jawa Timur
                        </label>
                      </div>
                      <div className='flex items-center gap-2 mr-[30px] pb-1.5'>
                        <input
                          onChange={handleChange}
                          id='checkbox4'
                          type='checkbox'
                          name='lokasi'
                          value='DKI Jakarta'
                          className=''
                        />
                        <label
                          htmlFor='checkbox4'
                          className='cursor-pointer w-full text-sm font-medium text-[#C0C6D4] dark:text-[#C0C6D4]'>
                          DKI Jakarta
                        </label>
                      </div>
                      <div className='flex items-center gap-2 mr-[30px] pb-1.5'>
                        <input
                          onChange={handleChange}
                          id='checkbox5'
                          type='checkbox'
                          name='lokasi'
                          value='DI Yogyakarta'
                          className=''
                        />
                        <label
                          htmlFor='checkbox5'
                          className='cursor-pointer w-full text-sm font-medium text-[#C0C6D4] dark:text-[#C0C6D4]'>
                          DI Yogyakarta
                        </label>
                      </div>
                      <div className='flex items-center gap-2 mr-[30px] pb-1.5'>
                        <input
                          onChange={handleChange}
                          id='checkbox6'
                          type='checkbox'
                          name='lokasi'
                          value='Riau'
                          className=''
                        />
                        <label
                          htmlFor='checkbox6'
                          className='cursor-pointer w-full text-sm font-medium text-[#C0C6D4] dark:text-[#C0C6D4]'>
                          Riau
                        </label>
                      </div>
                      <div className='flex items-center gap-2 mr-[30px] pb-1.5'>
                        <input
                          onChange={handleChange}
                          id='checkbox7'
                          type='checkbox'
                          name='lokasi'
                          value='Banter'
                          className=''
                        />
                        <label
                          htmlFor='checkbox7'
                          className='cursor-pointer w-full text-sm font-medium text-[#C0C6D4] dark:text-[#C0C6D4]'>
                          Banter
                        </label>
                      </div>
                      <div className='flex items-center gap-2 mr-[30px] pb-1.5'>
                        <input
                          onChange={handleChange}
                          id='checkbox8'
                          type='checkbox'
                          name='lokasi'
                          value='Bali'
                          className=''
                        />
                        <label
                          htmlFor='checkbox8'
                          className='cursor-pointer w-full text-sm font-medium text-[#C0C6D4] dark:text-[#C0C6D4]'>
                          Bali
                        </label>
                      </div>
                      <div className='flex items-center gap-2 mr-[30px] pb-1.5'>
                        <input
                          onChange={handleChange}
                          id='checkbox9'
                          type='checkbox'
                          name='lokasi'
                          value='Lampung'
                          className=''
                        />
                        <label
                          htmlFor='checkbox9'
                          className='cursor-pointer w-full text-sm font-medium text-[#C0C6D4] dark:text-[#C0C6D4]'>
                          Lampung
                        </label>
                      </div>
                      <div className='flex items-center gap-2 mr-[30px] pb-1.5'>
                        <input
                          onChange={handleChange}
                          id='checkbox10'
                          type='checkbox'
                          name='lokasi'
                          value='Jambi'
                          className=''
                        />
                        <label
                          htmlFor='checkbox10'
                          className='cursor-pointer w-full text-sm font-medium text-[#C0C6D4] dark:text-[#C0C6D4]'>
                          Jambi
                        </label>
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className='py-3 border-b'>
                  <button
                    onClick={() => {
                      setPeserta(!peserta);
                    }}
                    className='flex items-center justify-between w-full'>
                    <p>Peserta</p>
                    <ExpandMore />
                  </button>
                  {peserta ? (
                    <div className='py-1.5'>
                      <div className='flex items-center gap-2'>
                        <div className='flex items-center gap-3 border rounded py-1 px-2.5 '>
                          <input
                            className='w-full text-xs leading-tight bg-white rounded appearance-none text-dark-4 focus:outline-none focus:bg-white'
                            type='number'
                            placeholder='0'
                          />
                          <span className='text-xs text-dark-4'>Pax</span>
                        </div>
                        <HorizontalRule />
                        <div className='flex items-center gap-3 border rounded py-1 px-2.5 '>
                          <input
                            className='w-full text-xs leading-tight bg-white rounded appearance-none text-dark-4 focus:outline-none focus:bg-white'
                            type='number'
                            placeholder='0'
                          />
                          <span className='text-xs text-dark-4'>Pax</span>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className='py-3 border-b'>
                  <button
                    onClick={() => {
                      setHarga(!harga);
                    }}
                    className='flex items-center justify-between w-full'>
                    <p>Harga</p>
                    <ExpandMore />
                  </button>
                  {harga ? (
                    <div className='py-1.5'>
                      <div className='flex items-center gap-2'>
                        <div className='flex items-center gap-3 border rounded py-1 px-2.5 '>
                          <input
                            onChange={(e) => {
                              setMinPriceFilter(e.target.value);
                              // filter()
                              setRefreshApi(true);
                            }}
                            className='w-full text-xs leading-tight bg-white rounded appearance-none text-dark-4 focus:outline-none focus:bg-white'
                            type='number'
                            placeholder='0'
                          />
                          <span className='text-xs text-dark-4'>Pax</span>
                        </div>
                        <HorizontalRule />
                        <div className='flex items-center gap-3 border rounded py-1 px-2.5 '>
                          <input
                            onChange={(e) => {
                              setMaxPriceFilter(e.target.value);
                              // filter()
                              setRefreshApi(true);
                            }}
                            className='w-full text-xs leading-tight bg-white rounded appearance-none text-dark-4 focus:outline-none focus:bg-white'
                            type='number'
                            placeholder='0'
                          />
                          <span className='text-xs text-dark-4'>Pax</span>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className='py-3 border-b'>
                  <button
                    onClick={() => {
                      setJadwal(!jadwal);
                    }}
                    className='flex items-center justify-between w-full'>
                    <p>Ganti Jadwal</p>
                    <ExpandMore />
                  </button>
                  {jadwal ? (
                    <div className='flex justify-between py-1.5'>
                      <div className='flex items-center justify-between w-full'>
                        <p className='text-dark-3'>Flexible ganti jadwal</p>
                        <label className='relative inline-flex items-center cursor-pointer'>
                          <input
                            type='checkbox'
                            value=''
                            className='sr-only peer'
                          />
                          <div className="w-11 h-6 bg-[#CBD5E1] peer-focus:outline-none peer-focus:ring-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className='flex flex-col overflow-y-auto lg:col-span-9 md:col-span-9 pb-9 lg:h-screen md:h-screen scroll-smooth scrollbar-hide'>
              <div className='sticky top-0 z-10 pt-5 pb-3 space-y-5 bg-[#ECEEF6] px-4'>
                <div className='flex justify-between gap-3'>
                  <button className=''>
                    <svg
                      width='14'
                      height='14'
                      viewBox='0 0 8 14'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M7.70711 0.959565C7.31658 0.569041 6.68342 0.569041 6.29289 0.959565L0.959559 6.2929C0.569035 6.68342 0.569035 7.31659 0.959559 7.70711L6.29289 13.0404C6.68342 13.431 7.31658 13.431 7.70711 13.0404C8.09763 12.6499 8.09763 12.0168 7.70711 11.6262L3.08088 7.00001L7.70711 2.37378C8.09763 1.98325 8.09763 1.35009 7.70711 0.959565Z'
                        fill='#2E3A44'
                      />
                    </svg>
                  </button>
                  <div className='flex items-center justify-start gap-5 overflow-x-auto scroll-smooth scrollbar-hide'>
                    <button
                      onClick={() => {
                        // filter()
                        setRefreshApi(true);
                        setKategori('');
                      }}
                      className='flex items-center gap-2.5 text-black-k text-sm bg-white rounded-xl px-2.5 py-3'>
                      <Dashboard />
                      <p className='truncate'>Semua Kategori</p>
                    </button>
                    <button
                      onClick={() => {
                        // filter()
                        setRefreshApi(true);
                        setKategori('EO');
                      }}
                      className='flex items-center gap-2.5 text-black-k text-sm bg-white rounded-xl px-2.5 py-3'>
                      <Dashboard />
                      <p className='truncate'>Event Organizer</p>
                    </button>
                    <button
                      onClick={() => {
                        // filter()
                        setRefreshApi(true);
                        setKategori('VENUE');
                      }}
                      className='flex items-center gap-2.5 text-black-k text-sm bg-white rounded-xl px-2.5 py-3'>
                      <Dashboard />
                      <p className='truncate'>Venue</p>
                    </button>
                    <button
                      onClick={() => {
                        // filter()
                        setRefreshApi(true);
                        setKategori('PRODUCT');
                      }}
                      className='flex items-center gap-2.5 text-black-k text-sm bg-white rounded-xl px-2.5 py-3'>
                      <Dashboard />
                      <p className='truncate'>Supplier</p>
                    </button>
                    <button
                      onClick={() => {
                        // filter()
                        setRefreshApi(true);
                        setKategori('TALENT');
                      }}
                      className='flex items-center gap-2.5 text-black-k text-sm bg-white rounded-xl px-2.5 py-3'>
                      <Dashboard />
                      <p className='truncate'>Talent</p>
                    </button>
                    <button
                      onClick={() => {
                        // filter()
                        setRefreshApi(true);
                        setKategori('ON DEMAND');
                      }}
                      className='flex items-center gap-2.5 text-black-k text-sm bg-white rounded-xl px-2.5 py-3'>
                      <Dashboard />
                      <p className='truncate'>On Demand</p>
                    </button>
                  </div>
                  <button className=''>
                    <svg
                      width='14'
                      height='14'
                      viewBox='0 0 8 14'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M0.292893 0.95958C0.683418 0.569056 1.31658 0.569056 1.70711 0.95958L7.04044 6.29291C7.43097 6.68344 7.43097 7.3166 7.04044 7.70713L1.70711 13.0405C1.31658 13.431 0.683418 13.431 0.292893 13.0405C-0.0976311 12.6499 -0.0976311 12.0168 0.292893 11.6262L4.91912 7.00002L0.292893 2.37379C-0.0976311 1.98327 -0.0976311 1.3501 0.292893 0.95958Z'
                        fill='#2E3A44'
                      />
                    </svg>
                  </button>
                </div>
                <div className='flex items-center justify-between px-2'>
                  <p className='text-sm text-dark-3'>
                    Menampilkan{' '}
                    {kategori === 'EO'
                      ? dataEo?.length
                      : kategori === 'VENUE'
                      ? dataVenue?.length
                      : kategori === 'PRODUCT'
                      ? dataProduct?.length
                      : kategori === 'TALENT'
                      ? dataTalent?.length
                      : kategori === 'ON DEMAND'
                      ? 0
                      : dataEo?.length + dataProduct?.length + dataVenue?.length + dataTalent?.length}{' '}
                    Layanan Jasa
                  </p>
                  <p className='text-sm text-dark-3'>Urutkan Berdasarkan</p>
                </div>
              </div>
              {dataEo || dataVenue || dataProduct || dataTalent ? (
                <div className='grid px-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
                  {dataEo.map((val, index) => (
                    <div key={index}>
                      <Card1
                        link={`/detail-layanan/EO/${val?.id}`}
                        rating={'4.9'}
                        price={val?.package_pricings[0].total_price}
                        priceDisc={val?.package_pricings[0].price}
                        disc={val?.package_pricings[0].disc_percentage}
                        pack={'pax'}
                        company={`by ${val?.user?.company?.name}`}
                        title={val?.name}
                        image={val?.eo_images[0] ? imageHandle(val?.eo_images[0]?.image) : AltImage}
                        discPercentage={val?.package_pricings[0].disc_percentage}
                      />
                      {/* {console.log(val?.eo_images[0]?.image)} */}
                    </div>
                  ))}
                  {dataVenue.map((val, index) => (
                    <div key={index}>
                      <Card1
                        link={`/detail-layanan/VENUE/${val?.id}`}
                        rating={'4.9'}
                        price={val?.package_pricings[0].total_price}
                        priceDisc={val?.package_pricings[0].price}
                        disc={val?.package_pricings[0].disc_percentage}
                        pack={'pax'}
                        company={`by ${val?.user?.company?.name}`}
                        title={val?.name}
                        image={val?.venue_images[0] ? imageHandle(val?.venue_images[0]?.image) : AltImage}
                        discPercentage={val?.package_pricings[0].disc_percentage}
                      />
                    </div>
                  ))}
                  {dataProduct.map((val, index) => (
                    <div key={index}>
                      <Card1
                        link={`/detail-layanan/PRODUCT/${val?.id}`}
                        rating={'4.9'}
                        price={val?.package_pricings[0].total_price}
                        priceDisc={val?.package_pricings[0].price}
                        disc={val?.package_pricings[0].disc_percentage}
                        pack={'pax'}
                        company={`by ${val?.user?.company?.name}`}
                        title={val?.tool_type}
                        image={val?.product_images[0] ? imageHandle(val?.product_images[0]?.image) : AltImage}
                        discPercentage={val?.package_pricings[0].disc_percentage}
                      />
                    </div>
                  ))}
                  {dataTalent.map((val, index) => (
                    <div key={index}>
                      <Card1
                        link={`/detail-layanan/TALENT/${val?.id}`}
                        rating={'4.9'}
                        price={val?.package_pricings[0].total_price}
                        priceDisc={val?.package_pricings[0].price}
                        disc={val?.package_pricings[0].disc_percentage}
                        pack={'pax'}
                        company={`by ${val?.user?.company?.name}`}
                        title={val?.name}
                        image={val?.talent_images[0] ? imageHandle(val?.talent_images[0]?.image) : AltImage}
                        discPercentage={val?.package_pricings[0].disc_percentage}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className='h-full mx-4 text-center bg-gray-200 pt-28'>Data Not Found</div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Fragment>
  );
}

export default Search;
