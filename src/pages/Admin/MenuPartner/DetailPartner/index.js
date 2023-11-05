import React, { Fragment, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ActivePartner,
  BannerAdminPartner,
  BgBanner,
  Brian,
  IconAction,
  IconAddon,
  IconArrowRight,
  IconBagCherry,
  IconBagPrimary,
  IconBagYellow,
  IconBidding,
  IconBiddingColor,
  IconBiddingYellow,
  IconEmail,
  IconEmailOutline,
  IconNext,
  IconPartnerDark,
  IconPartnerGradient,
  IconPartnerGray,
  IconPhoneOutline,
  IconStakeholder,
  IconStatus,
  LogoDefault,
  NotActivePartner,
} from '../../../../assets';
import { FooterTwo, NavbarAdmin, Sidebar } from '../../../../component';

import { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Api from '../../../../Api';
import { UrlApi } from '../../../../constants';
import imageHandle from '../../../../utils/imageHandle';

const DetailPartner = () => {
  const params = useLocation();
  const navigate = useNavigate();
  const partnerId = params.state.partnerId;
  const [open, setOpen] = useState(true);
  const [cardStatics, setCardStatics] = useState('');
  const [detail, setDetail] = useState('');
  const [detailCompany, setDetailCompany] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [documentCompany, setDocumentCompany] = useState('');

  const getData = async () => {
    try {
      const response = await Api.PartnerDetailAdmin(localStorage.getItem('token-hub'), params.state.companyId);
      setCardStatics(response.data);
      setDetail(response.data);
      setDetailCompany(response.data.data.company);
      setBusinessType(response.data.data.company.type_business);
      setDocumentCompany(response.data.data.company.legal_documents);
      console.log(`id ${params.state.id}`);
    } catch (error) {
      console.log(error);
    }
  };
  console.log({ partnerId });

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className='h-full bg-outline'>
        <Sidebar
          activeMenu={2}
          open={open}
          setOpen={setOpen}
        />
        <div
          className={`${open ? 'lg:ml-80 md:ml-28 ml-0' : 'lg:ml-24 md:ml-28 ml-0'} 
              h-full p-7`}>
          <NavbarAdmin
            title={'Partner'}
            image={IconPartnerGradient}
            open={open}
            setOpen={setOpen}
          />
          <div className='flex flex-wrap items-center gap-3 mb-[30px] pt-[120px]'>
            <Link
              to={'/admin/partner'}
              className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>
              Partner{' '}
            </Link>
            <img
              src={IconNext}
              alt=''
            />
            <button className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>Detail Partner </button>
          </div>
          <div className='flex flex-col'>
            <div className='-my-2'>
              <div className='w-full py-2 space-y-7'>
                <div className='w-full h-[420px] bg-white rounded-[10px]'>
                  <div className='relative'>
                    <div className='w-full'>
                      <img
                        src={BannerAdminPartner}
                        alt='Banner'
                        className='h-[115px] rounded-t-[10px] w-full'
                      />
                    </div>
                    <div className='absolute top-10 left-5'>
                      <img
                        className='rounded-full w-[135px] h-[135px] object-cover'
                        src={!detailCompany.company_logo ? LogoDefault : imageHandle(detailCompany.company_logo)}
                      />
                    </div>
                  </div>
                  <div className='p-6 mt-16 space-y-5'>
                    <h1 className='font-semibold text-[24px] text-black'>
                      {!detailCompany.name ? '-' : detailCompany.name}
                    </h1>
                    <div className='flex gap-5'>
                      <div className='flex items-center gap-2'>
                        <img src={IconEmailOutline} />
                        <h1 className='text-[16px] text-black'>{!detailCompany.email ? '-' : detailCompany.email}</h1>
                      </div>
                      <div className='flex items-center gap-2'>
                        <img src={IconPhoneOutline} />
                        <h1 className='text-[16px] text-black'>{!detailCompany.phone ? '-' : detailCompany.phone}</h1>
                      </div>
                    </div>
                    <div className='grid grid-cols-12 gap-5'>
                      <div className='col-span-4'>
                        <div className='w-full border rounded-xl h-[72px] flex items-center justify-between  px-5'>
                          <div className='flex items-center gap-4'>
                            <img src={IconBagCherry} />
                            <h1 className='text-dark-3 font-bold text-[18px]'>
                              {!detail.countJenisLayanan ? '0' : detail.countJenisLayanan}
                            </h1>
                            <h1 className='text-dark-3 font-medium text-[15px]'>Jenis Layanan </h1>
                          </div>
                          <img
                            src={IconArrowRight}
                            onClick={() =>
                              navigate('/admin/detail-partner/list-layanan-partner', {
                                state: { partnerId: partnerId },
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className='col-span-4'>
                        <div className='w-full border rounded-xl h-[72px] flex items-center justify-between  px-5'>
                          <div className='flex items-center gap-4'>
                            <img src={IconBagPrimary} />
                            <h1 className='text-dark-3 font-bold text-[18px]'>
                              {!detail.countTotalLayanan ? '0' : detail.countTotalLayanan}
                            </h1>
                            <h1 className='text-dark-3 font-medium text-[15px]'>Total Layanan </h1>
                          </div>
                        </div>
                      </div>
                      <div className='col-span-4'>
                        <div className='w-full border rounded-xl h-[72px] flex items-center justify-between  px-5'>
                          <div className='flex items-center gap-4'>
                            <img src={IconBiddingYellow} />
                            <h1 className='text-dark-3 font-bold text-[18px]'>
                              {!detail.countBidding ? '0' : detail.countBidding}
                            </h1>
                            <h1 className='text-dark-3 font-medium text-[15px]'>Join Bidding</h1>
                          </div>
                          <Link to={'/admin/detail-partner/list-bidding'}>
                            <img src={IconArrowRight} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='w-full bg-white rounded-[10px] p-10'>
                  <div className='my-5 space-y-2.5'>
                    {/* <h1 className='font-semibold text-[28px]'>Xeno. Entertaiment</h1> */}
                    <p className='font-normal text-[16px]'>
                      {!detailCompany.description ? '-' : detailCompany.description}
                    </p>
                    <div className='border-b-2 pt-[20px]'></div>
                    <div className='grid lg:grid-cols-12 grid-cols-6 space-y-3 pt-[20px]'>
                      <div className='col-span-6 lg:col-span-6'>
                        <h1 className='text-[16px] font-normal text-[#64748B]'>Badan Usaha</h1>
                        <h1 className='text-[16px] font-normal'>{!detailCompany.type ? '-' : detailCompany.type}</h1>
                      </div>
                      <div className='col-span-6 lg:col-span-6'>
                        <h1 className='text-[16px] font-normal text-[#64748B]'>Jenis Badan Usaha</h1>
                        {!businessType
                          ? '-'
                          : Object.values(businessType).map((x, i) => {
                              return <h1 className='text-[16px] font-normal'>{x}</h1>;
                            })}
                      </div>
                      {/* <div className='col-span-6 lg:col-span-12'>
                                      <h1 className='text-[16px] font-normal text-[#64748B]'>Jenis SIUP</h1>
                                      <div className='text-[14px] text-center font-normal px-2 py-2 border-black rounded-2xl border-2 w-24'>SIUP Kecil </div>
                                  </div>
                                  <div className='col-span-6 lg:col-span-6'>
                                      <h1 className='text-[16px] font-normal text-[#64748B]'>Email Aktif</h1>
                                      <h1 className='text-[16px] font-normal'>konect@gmail.com</h1>
                                  </div>
                                  <div className='col-span-6 lg:col-span-6'>
                                      <h1 className='text-[16px] font-normal text-[#64748B]'>No. Telp</h1>
                                      <h1 className='text-[16px] font-normal'>081223221345</h1>
                                  </div> */}
                      <div className='col-span-6 lg:col-span-6'>
                        <h1 className='text-[16px] font-normal text-[#64748B]'>Kabupaten/Kota</h1>
                        <h1 className='text-[16px] font-normal'>{!detailCompany.city ? '-' : detailCompany.city}</h1>
                      </div>
                      <div className='col-span-6 lg:col-span-6'>
                        <h1 className='text-[16px] font-normal text-[#64748B]'>Provinsi</h1>
                        <h1 className='text-[16px] font-normal'>
                          {!detailCompany.province ? '-' : detailCompany.province}
                        </h1>
                      </div>
                      <div className='col-span-6 lg:col-span-12'>
                        <h1 className='text-[16px] font-normal text-[#64748B]'>Kode Pos</h1>
                        <h1 className='text-[16px] font-normal'>
                          {!detailCompany.postal_code ? '-' : detailCompany.postal_code}
                        </h1>
                      </div>
                      <div className='col-span-6 lg:col-span-12'>
                        <h1 className='text-[16px] font-normal text-[#64748B]'>Alamat</h1>
                        <h1 className='text-[16px] font-normal'>
                          {!detailCompany.address ? '-' : detailCompany.address}
                        </h1>
                      </div>
                    </div>
                    <div className='border-b-2 pt-[20px]'></div>
                    <h1 className='text-[16px] font-normal text-[#64748B]'>Dokumen</h1>
                    <div className='grid lg:grid-cols-12 grid-cols-6 lg:space-y-0 space-y-3 lg:gap-3 gap-0 pt-[20px]'>
                      {Object.values(documentCompany).map((data, index) => {
                        return (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.preventDefault();
                              const downloadLink = document.createElement('a');
                              const fileName = data.path.substring(data.path.lastIndexOf('/') + 1);
                              downloadLink.href = `${UrlApi}${data.path}`;
                              downloadLink.download = fileName;
                              downloadLink.style.display = 'none';
                              document.body.appendChild(downloadLink);
                              downloadLink.click();
                            }}
                            className='bg-gray-200 rounded-[12px] px-5 py-2 flex justify-center'>
                            <h1 className='text-[13px] font-medium text-primary'>{!data.type ? '-' : data.type}</h1>
                          </button>
                        );
                      })}
                    </div>
                    <div className='border-b-2 pt-[20px]'></div>
                    <div className='pt-[20px]'>
                      <div className='flex flex-col space-y-3 '>
                        <h1 className='text-[14px] font-normal text-[#64748B]'>Website / Sosial Media</h1>
                        <div className='flex gap-10'>
                          <h1 className='text-[14px] font-normal text-[#2E3A44]'>
                            {!detailCompany.website_type ? '-' : detailCompany.website_type}
                          </h1>
                          {detailCompany.website_type && (
                            <h1 className='text-[14px] font-normal text-[#2E3A44]'>
                              : {!detailCompany.website_url ? '-' : detailCompany.website_url}
                            </h1>
                          )}
                        </div>
                        <h1 className='text-[14px] font-normal text-[#64748B]'>Marketplace /Toko Online</h1>
                        <div className='flex gap-10'>
                          <h1 className='text-[14px] font-normal text-[#2E3A44]'>
                            {!detailCompany.marketplace_url ? '-' : detailCompany.marketplace_url}
                          </h1>
                          {detailCompany.marketplace_type && (
                            <h1 className='text-[14px] font-normal text-[#2E3A44]'>
                              : {!detailCompany.marketplace_type ? '-' : detailCompany.marketplace_type}
                            </h1>
                          )}
                        </div>
                      </div>
                    </div>
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

export default DetailPartner;
