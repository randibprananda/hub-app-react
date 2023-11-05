/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Navbar } from '../../../component'
import { Footer } from '../../../component'
import profile from '../../../assets/images/profile.png'
import layanan1 from '../../../assets/images/layanan1.png'
import { ShoppingBag, BookingMark, ShieldDone, People, Calendar, Logo } from '../../../assets'
import { Link, useNavigate } from 'react-router-dom'
import Api from '../../../Api'

const MainProfile = () => {
    const navigate = useNavigate();

    const [token, setToken] = useState(localStorage.getItem('token-hub'))
    const [user, setUser] = useState('')
    const [role, setRole] = useState('')

    const data = async() => {
        try {
            const response = await Api.fetch(token)
            // console.log(response)
            setUser(response.data)
            setRole(response.data.role)
        } catch (error) {
            console.log(error)            
        }
    }

    useEffect(() => {
        data()
    }, [])

    console.log(role)

    return (
        <div className='h-full bg-[#E3E8F1]'>
            <div className='pt-4'>
                <Navbar/>
            </div>
            <div className='px-[40px] py-[37px] mx-[76px] mt-[147px] bg-white rounded-[12px]'>
                <div className="flex justify-between">
                    <div className="flex items-center space-x-4">
                        <img className="w-[96px] h-[96px] rounded-full object-cover" src={user.image == null ? Logo : user.image} alt=""/>
                        <div>
                            <div className='text-[#2E3A44] text-[24px] font-inter font-semibold'>{user.fullname}</div>
                            <div className="text-[16px] text-[#737373] font-inter font-medium dark:text-[#737373]">Partner - {role.name}</div>
                        </div>
                    </div>
                    <div>
                        <div className='grid justify-items-end'>
                            <button className="appearance-none block w-[123px] h-[39px] bg-[#2D014B] hover:bg-[#2E3A66] text-[#FFFFFF] font-medium font-inter text-[16px] rounded-[12px]" onClick={()=>navigate("/edit-profile")}>Edit Profile</button>
                        </div>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className='w-[385px] mt-[40px] border-2 border-[#EBEBEB] rounded-[16px]'>
                        <div className='flex pt-[23px] pb-[32px] px-[28px]'>
                            <img className="rounded-full w-[24px] h-[24px]" src={ShoppingBag} alt=""/>
                            <label className='pl-[10px] font-inter font-medium text-[#737373] text-[16px]'>Total Layanan</label>
                        </div>
                        <div className='flex flex-col px-[28px] pb-[32px]'>
                            <label className='text-[#454545] text-[26px] font-inter font-semibold'>25 Layanan</label>
                            <Link to={''} className='mt-[10px] py-[12px] text-[#2D014B] text-[14px] font-medium font-rubik'>Lihat Rincian</Link>
                        </div>
                    </div>
                    <div className='w-[385px] mt-[40px] border-2 border-[#EBEBEB] rounded-[16px]'>
                        <div className='flex pt-[23px] pb-[32px] px-[28px]'>
                            <img className="rounded-full w-[24px] h-[24px]" src={BookingMark} alt=""/>
                            <label className='pl-[10px] font-inter font-medium text-[#737373] text-[16px]'>Total Booking</label>
                        </div>
                        <div className='flex flex-col px-[28px] pb-[32px]'>
                            <label className='text-[#454545] text-[26px] font-inter font-semibold'>25 Booking</label>
                            <Link to={''} className='mt-[10px] py-[12px] text-[#2D014B] text-[14px] font-medium font-rubik'>Lihat Riwayat</Link>
                        </div>
                    </div>
                    <div className='w-[385px] mt-[40px] border-2 border-[#EBEBEB] rounded-[16px]'>
                        <div className='flex pt-[23px] pb-[32px] px-[28px]'>
                            <img className="rounded-full w-[24px] h-[24px]" src={ShieldDone} alt=""/>
                            <label className='pl-[10px] font-inter font-medium text-[#737373] text-[16px]'>Pekerjaan Selesai</label>
                        </div>
                        <div className='flex flex-col px-[28px] pb-[32px]'>
                            <label className='text-[#454545] text-[26px] font-inter font-semibold'>25 Pekerjaan</label>
                            <Link to={''} className='mt-[10px] py-[12px] text-[#2D014B] text-[14px] font-medium font-rubik'>Lihat Riwayat</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='px-[40px] py-[37px] mx-[76px] mt-[40px] bg-white rounded-[12px]'>
                <p className='font-medium font-inter text-[14px] text-[#737373]'>Tentang Perusahaan</p>
                <div className="flex items-center mt-[28px] space-x-4">
                    <img className="w-[61px] h-[61px] rounded-full" src={profile} alt=""/>
                    <div>
                        <div className='text-[#454545] text-[20px] font-inter font-semibold'>Xeno.Entertaiment</div>
                        <div className="text-[12px] text-[#A8A8A8] font-inter font-normal dark:text-[#A8A8A8]">Bergabung sejak 12/12/2022</div>
                    </div>
                </div>
                <div className='pt-[24px]'>
                    <p className='font-inter font-medium text-[14px] text-[#081C4F]'>Descripsi</p>
                    <p className='mt-[4px] font-inter font-medium text-[14px] text-[#475569]'>Lorem ipsum dolor sit amet consectetur. Tempor lectus tortor purus lorem consequat tortor aliquam. Dolor malesuada viverra a duis non. At amet vestibulum pharetra mattis nibh sed rhoncus. Maecenas urna mi commodo malesuada ut sit at lacus. Enim rutrum adipiscing condimentum dui.</p>
                </div>
                <div className='grid justify-items-start pt-[20px]'>
                    <button className="appearance-none block w-[124px] h-[44px] border-2 border-[#2D014B] bg-white hover:bg-[#2E3A66] text-[#2D014B] hover:text-[#FFFFFF] font-medium font-rubik text-[14px] rounded-[6px]" onClick={()=>navigate("/edit-profile")}>Lihat Detail</button>
                </div>
            </div>
            <div className='px-[40px] py-[37px] mx-[76px] mt-[40px] bg-white rounded-[12px]'>
                <div className="flex items-center justify-between">
                    <div>
                        <p className='mb-[10px] text-[#2E3A44] text-[24px] font-inter font-semibold'>Open Tender</p>
                        <p className="mb-[10px] text-[18px] text-[#737373] font-inter font-medium dark:text-[#737373]">Dapatkan modal untuk projectmu, buat info tender disini</p>
                        <p className='text-[14px] text-[#CACACA] font-inter font-medium'>30 Tender</p>
                    </div>
                    <div>
                        <button className="appearance-none block w-[177px] h-[43px] bg-[#2D014B] hover:bg-[#2E3A66] text-[#FFFFFF] font-medium font-inter text-[16px] rounded-[12px]" onClick={()=>navigate("/edit-profile")}>+ Tambah Tender</button>
                    </div>
                </div>
                <div className='mt-[34px] grid grid-cols-4 grid-flow-rows'>
                    <div className='w-[283px] my-[16px] px-[24px] py-[18px] border-2 border-[#EBEBEB] rounded-[16px]'>
                        <p className='font-inter font-semibold text-[16px] text-[#2E3A44]'>Event Ulang Tahun Perusahaan</p>
                        <div className='flex mt-[12px] mb-[8px]'>
                            <img className="rounded-full w-[18px] h-[18px]" src={profile} alt=""/>
                            <label className='pl-[10px] font-inter font-medium text-[#737373] text-[10px]'>Celiscar Santa</label>
                        </div>
                        <p className='font-inter font-normal text-[12px] text-[#1A1A1A]'>Kami adalah organisasi nirlaba membutuhkan seseorang yang dapat memimpin dan mengelola seluruh proyek</p>
                        <div className='flex justify-between my-[8px]'>
                            <div className='flex items-center px-[10px] py-[10px] bg-[#F6F6F6] rounded-[4px]'>
                                <img className="w-[16px] h-[16px] mr-[4px]" src={People} alt=""/>
                                <p className='font-inter font-medium text-[10px] text-[#6A6A6A]'>1000 - 5000</p>
                            </div>
                            <div className='flex items-center px-[10px] py-[10px] bg-[#F6F6F6] rounded-[4px]'>
                                <img className="w-[13px] h-[13px] mr-[4px]" src={Calendar} alt=""/>
                                <p className='font-inter font-medium text-[10px] text-[#6A6A6A]'>24 Februari 2023</p>
                            </div>
                        </div>
                        <p className='pt-[14px] pb-[6px] font-inter font-normal text-[12px] text-[#888888]'>Anggaran</p>
                        <p className='font-inter font-semibold text-[20px] text-[#1A1A1A]'>Rp 40.000.000</p>
                    </div>
                    <div className='w-[283px] my-[16px] px-[24px] py-[18px] border-2 border-[#EBEBEB] rounded-[16px]'>
                        <p className='font-inter font-semibold text-[16px] text-[#2E3A44]'>Event Ulang Tahun Perusahaan</p>
                        <div className='flex mt-[12px] mb-[8px]'>
                            <img className="rounded-full w-[18px] h-[18px]" src={profile} alt=""/>
                            <label className='pl-[10px] font-inter font-medium text-[#737373] text-[10px]'>Celiscar Santa</label>
                        </div>
                        <p className='font-inter font-normal text-[12px] text-[#1A1A1A]'>Kami adalah organisasi nirlaba membutuhkan seseorang yang dapat memimpin dan mengelola seluruh proyek</p>
                        <div className='flex justify-between my-[8px]'>
                            <div className='flex items-center px-[10px] py-[10px] bg-[#F6F6F6] rounded-[4px]'>
                                <img className="w-[16px] h-[16px] mr-[4px]" src={People} alt=""/>
                                <p className='font-inter font-medium text-[10px] text-[#6A6A6A]'>1000 - 5000</p>
                            </div>
                            <div className='flex items-center px-[10px] py-[10px] bg-[#F6F6F6] rounded-[4px]'>
                                <img className="w-[13px] h-[13px] mr-[4px]" src={Calendar} alt=""/>
                                <p className='font-inter font-medium text-[10px] text-[#6A6A6A]'>24 Februari 2023</p>
                            </div>
                        </div>
                        <p className='pt-[14px] pb-[6px] font-inter font-normal text-[12px] text-[#888888]'>Anggaran</p>
                        <p className='font-inter font-semibold text-[20px] text-[#1A1A1A]'>Rp 40.000.000</p>
                    </div>
                    <div className='w-[283px] my-[16px] px-[24px] py-[18px] border-2 border-[#EBEBEB] rounded-[16px]'>
                        <p className='font-inter font-semibold text-[16px] text-[#2E3A44]'>Event Ulang Tahun Perusahaan</p>
                        <div className='flex mt-[12px] mb-[8px]'>
                            <img className="rounded-full w-[18px] h-[18px]" src={profile} alt=""/>
                            <label className='pl-[10px] font-inter font-medium text-[#737373] text-[10px]'>Celiscar Santa</label>
                        </div>
                        <p className='font-inter font-normal text-[12px] text-[#1A1A1A]'>Kami adalah organisasi nirlaba membutuhkan seseorang yang dapat memimpin dan mengelola seluruh proyek</p>
                        <div className='flex justify-between my-[8px]'>
                            <div className='flex items-center px-[10px] py-[10px] bg-[#F6F6F6] rounded-[4px]'>
                                <img className="w-[16px] h-[16px] mr-[4px]" src={People} alt=""/>
                                <p className='font-inter font-medium text-[10px] text-[#6A6A6A]'>1000 - 5000</p>
                            </div>
                            <div className='flex items-center px-[10px] py-[10px] bg-[#F6F6F6] rounded-[4px]'>
                                <img className="w-[13px] h-[13px] mr-[4px]" src={Calendar} alt=""/>
                                <p className='font-inter font-medium text-[10px] text-[#6A6A6A]'>24 Februari 2023</p>
                            </div>
                        </div>
                        <p className='pt-[14px] pb-[6px] font-inter font-normal text-[12px] text-[#888888]'>Anggaran</p>
                        <p className='font-inter font-semibold text-[20px] text-[#1A1A1A]'>Rp 40.000.000</p>
                    </div>
                    <div className='w-[283px] my-[16px] px-[24px] py-[18px] border-2 border-[#EBEBEB] rounded-[16px]'>
                        <p className='font-inter font-semibold text-[16px] text-[#2E3A44]'>Event Ulang Tahun Perusahaan</p>
                        <div className='flex mt-[12px] mb-[8px]'>
                            <img className="rounded-full w-[18px] h-[18px]" src={profile} alt=""/>
                            <label className='pl-[10px] font-inter font-medium text-[#737373] text-[10px]'>Celiscar Santa</label>
                        </div>
                        <p className='font-inter font-normal text-[12px] text-[#1A1A1A]'>Kami adalah organisasi nirlaba membutuhkan seseorang yang dapat memimpin dan mengelola seluruh proyek</p>
                        <div className='flex justify-between my-[8px]'>
                            <div className='flex items-center px-[10px] py-[10px] bg-[#F6F6F6] rounded-[4px]'>
                                <img className="w-[16px] h-[16px] mr-[4px]" src={People} alt=""/>
                                <p className='font-inter font-medium text-[10px] text-[#6A6A6A]'>1000 - 5000</p>
                            </div>
                            <div className='flex items-center px-[10px] py-[10px] bg-[#F6F6F6] rounded-[4px]'>
                                <img className="w-[13px] h-[13px] mr-[4px]" src={Calendar} alt=""/>
                                <p className='font-inter font-medium text-[10px] text-[#6A6A6A]'>24 Februari 2023</p>
                            </div>
                        </div>
                        <p className='pt-[14px] pb-[6px] font-inter font-normal text-[12px] text-[#888888]'>Anggaran</p>
                        <p className='font-inter font-semibold text-[20px] text-[#1A1A1A]'>Rp 40.000.000</p>
                    </div>
                    <div className='w-[283px] my-[16px] px-[24px] py-[18px] border-2 border-[#EBEBEB] rounded-[16px]'>
                        <p className='font-inter font-semibold text-[16px] text-[#2E3A44]'>Event Ulang Tahun Perusahaan</p>
                        <div className='flex mt-[12px] mb-[8px]'>
                            <img className="rounded-full w-[18px] h-[18px]" src={profile} alt=""/>
                            <label className='pl-[10px] font-inter font-medium text-[#737373] text-[10px]'>Celiscar Santa</label>
                        </div>
                        <p className='font-inter font-normal text-[12px] text-[#1A1A1A]'>Kami adalah organisasi nirlaba membutuhkan seseorang yang dapat memimpin dan mengelola seluruh proyek</p>
                        <div className='flex justify-between my-[8px]'>
                            <div className='flex items-center px-[10px] py-[10px] bg-[#F6F6F6] rounded-[4px]'>
                                <img className="w-[16px] h-[16px] mr-[4px]" src={People} alt=""/>
                                <p className='font-inter font-medium text-[10px] text-[#6A6A6A]'>1000 - 5000</p>
                            </div>
                            <div className='flex items-center px-[10px] py-[10px] bg-[#F6F6F6] rounded-[4px]'>
                                <img className="w-[13px] h-[13px] mr-[4px]" src={Calendar} alt=""/>
                                <p className='font-inter font-medium text-[10px] text-[#6A6A6A]'>24 Februari 2023</p>
                            </div>
                        </div>
                        <p className='pt-[14px] pb-[6px] font-inter font-normal text-[12px] text-[#888888]'>Anggaran</p>
                        <p className='font-inter font-semibold text-[20px] text-[#1A1A1A]'>Rp 40.000.000</p>
                    </div>
                    <div className='w-[283px] my-[16px] px-[24px] py-[18px] border-2 border-[#EBEBEB] rounded-[16px]'>
                        <p className='font-inter font-semibold text-[16px] text-[#2E3A44]'>Event Ulang Tahun Perusahaan</p>
                        <div className='flex mt-[12px] mb-[8px]'>
                            <img className="rounded-full w-[18px] h-[18px]" src={profile} alt=""/>
                            <label className='pl-[10px] font-inter font-medium text-[#737373] text-[10px]'>Celiscar Santa</label>
                        </div>
                        <p className='font-inter font-normal text-[12px] text-[#1A1A1A]'>Kami adalah organisasi nirlaba membutuhkan seseorang yang dapat memimpin dan mengelola seluruh proyek</p>
                        <div className='flex justify-between my-[8px]'>
                            <div className='flex items-center px-[10px] py-[10px] bg-[#F6F6F6] rounded-[4px]'>
                                <img className="w-[16px] h-[16px] mr-[4px]" src={People} alt=""/>
                                <p className='font-inter font-medium text-[10px] text-[#6A6A6A]'>1000 - 5000</p>
                            </div>
                            <div className='flex items-center px-[10px] py-[10px] bg-[#F6F6F6] rounded-[4px]'>
                                <img className="w-[13px] h-[13px] mr-[4px]" src={Calendar} alt=""/>
                                <p className='font-inter font-medium text-[10px] text-[#6A6A6A]'>24 Februari 2023</p>
                            </div>
                        </div>
                        <p className='pt-[14px] pb-[6px] font-inter font-normal text-[12px] text-[#888888]'>Anggaran</p>
                        <p className='font-inter font-semibold text-[20px] text-[#1A1A1A]'>Rp 40.000.000</p>
                    </div>
                    <div className='w-[283px] my-[16px] px-[24px] py-[18px] border-2 border-[#EBEBEB] rounded-[16px]'>
                        <p className='font-inter font-semibold text-[16px] text-[#2E3A44]'>Event Ulang Tahun Perusahaan</p>
                        <div className='flex mt-[12px] mb-[8px]'>
                            <img className="rounded-full w-[18px] h-[18px]" src={profile} alt=""/>
                            <label className='pl-[10px] font-inter font-medium text-[#737373] text-[10px]'>Celiscar Santa</label>
                        </div>
                        <p className='font-inter font-normal text-[12px] text-[#1A1A1A]'>Kami adalah organisasi nirlaba membutuhkan seseorang yang dapat memimpin dan mengelola seluruh proyek</p>
                        <div className='flex justify-between my-[8px]'>
                            <div className='flex items-center px-[10px] py-[10px] bg-[#F6F6F6] rounded-[4px]'>
                                <img className="w-[16px] h-[16px] mr-[4px]" src={People} alt=""/>
                                <p className='font-inter font-medium text-[10px] text-[#6A6A6A]'>1000 - 5000</p>
                            </div>
                            <div className='flex items-center px-[10px] py-[10px] bg-[#F6F6F6] rounded-[4px]'>
                                <img className="w-[13px] h-[13px] mr-[4px]" src={Calendar} alt=""/>
                                <p className='font-inter font-medium text-[10px] text-[#6A6A6A]'>24 Februari 2023</p>
                            </div>
                        </div>
                        <p className='pt-[14px] pb-[6px] font-inter font-normal text-[12px] text-[#888888]'>Anggaran</p>
                        <p className='font-inter font-semibold text-[20px] text-[#1A1A1A]'>Rp 40.000.000</p>
                    </div>
                    <div className='w-[283px] my-[16px] px-[24px] py-[18px] border-2 border-[#EBEBEB] rounded-[16px]'>
                        <p className='font-inter font-semibold text-[16px] text-[#2E3A44]'>Event Ulang Tahun Perusahaan</p>
                        <div className='flex mt-[12px] mb-[8px]'>
                            <img className="rounded-full w-[18px] h-[18px]" src={profile} alt=""/>
                            <label className='pl-[10px] font-inter font-medium text-[#737373] text-[10px]'>Celiscar Santa</label>
                        </div>
                        <p className='font-inter font-normal text-[12px] text-[#1A1A1A]'>Kami adalah organisasi nirlaba membutuhkan seseorang yang dapat memimpin dan mengelola seluruh proyek</p>
                        <div className='flex justify-between my-[8px]'>
                            <div className='flex items-center px-[10px] py-[10px] bg-[#F6F6F6] rounded-[4px]'>
                                <img className="w-[16px] h-[16px] mr-[4px]" src={People} alt=""/>
                                <p className='font-inter font-medium text-[10px] text-[#6A6A6A]'>1000 - 5000</p>
                            </div>
                            <div className='flex items-center px-[10px] py-[10px] bg-[#F6F6F6] rounded-[4px]'>
                                <img className="w-[13px] h-[13px] mr-[4px]" src={Calendar} alt=""/>
                                <p className='font-inter font-medium text-[10px] text-[#6A6A6A]'>24 Februari 2023</p>
                            </div>
                        </div>
                        <p className='pt-[14px] pb-[6px] font-inter font-normal text-[12px] text-[#888888]'>Anggaran</p>
                        <p className='font-inter font-semibold text-[20px] text-[#1A1A1A]'>Rp 40.000.000</p>
                    </div>
                </div>
                <div className='items-center text-center mt-[50px]'>
                    <nav aria-label="Page navigation example">
                        <ul className="inline-flex items-center -space-x-px">
                            <li>
                                <a href="#" className="block px-[8px] py-[8px] ml-[5px] leading-tight text-black bg-white border-2 border-gray-300 rounded-[32px] hover:bg-gray-100 hover:text-gray-300 dark:bg-white dark:border-gray-300 dark:text-balck dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span className="sr-only">First</span>
                                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.7267 12L12.6667 11.06L9.61341 8L12.6667 4.94L11.7267 4L7.72675 8L11.7267 12Z" fill="currentColor"/><path d="M7.33344 12L8.27344 11.06L5.2201 8L8.27344 4.94L7.33344 4L3.33344 8L7.33344 12Z" fill="currentColor"/></svg>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="block px-[8px] py-[8px] ml-[5px] leading-tight text-black bg-white border-2 border-gray-300 rounded-[32px] hover:bg-gray-100 hover:text-gray-300 dark:bg-white dark:border-gray-300 dark:text-balck dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span className="sr-only">Previous</span>
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                </a>
                            </li>
                            <li>
                                <a href="#" aria-current="page" className="z-10 px-[12px] py-[7px] ml-[5px] leading-tight text-black border-2 border-blue-300 rounded-[32px] bg-blue-50 hover:bg-gray-700 hover:text-white dark:border-gray-700 dark:bg-gray-700 dark:text-white">1</a>
                            </li>
                            <li>
                                <a href="#" className="px-[12px] py-[7px] ml-[5px] leading-tight text-black bg-white border-2 border-gray-300 rounded-[32px] hover:bg-gray-100 hover:text-gray-300 dark:bg-white dark:border-gray-300 dark:text-balck dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                            </li>
                            <li>
                                <a href="#" className="px-[12px] py-[7px] ml-[5px] leading-tight text-black bg-white border-2 border-gray-300 rounded-[32px] hover:bg-gray-100 hover:text-gray-300 dark:bg-white dark:border-gray-300 dark:text-balck dark:hover:bg-gray-700 dark:hover:text-white">3</a>
                            </li>
                            <li>
                                <a className="px-[12px] py-[7px] ml-[5px] leading-tight text-black bg-white dark:bg-white dark:text-balck" aria-disabled='true'>...</a>
                            </li>
                            <li>
                                <a href="#" className="px-[12px] py-[7px] ml-[5px] leading-tight text-black bg-white border-2 border-gray-300 rounded-[32px] hover:bg-gray-100 hover:text-gray-300 dark:bg-white dark:border-gray-300 dark:text-balck dark:hover:bg-gray-700 dark:hover:text-white">10</a>
                            </li>
                            <li>
                                <a href="#" className="block px-[8px] py-[8px] ml-[5px] leading-tight text-black bg-white border-2 border-gray-300 rounded-[32px] hover:bg-gray-100 hover:text-gray-300 dark:bg-white dark:border-gray-300 dark:text-balck dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span className="sr-only">Next</span>
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="block px-[8px] py-[8px] ml-[5px] leading-tight text-black bg-white border-2 border-gray-300 rounded-[32px] hover:bg-gray-100 hover:text-gray-300 dark:bg-white dark:border-gray-300 dark:text-balck dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span className="sr-only">Last</span>
                                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.27325 4L3.33325 4.94L6.38659 8L3.33325 11.06L4.27325 12L8.27325 8L4.27325 4Z" fill="currentColor"/><path d="M8.66656 4L7.72656 4.94L10.7799 8L7.72656 11.06L8.66656 12L12.6666 8L8.66656 4Z" fill="currentColor"/></svg>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className='px-[40px] py-[37px] mx-[76px] mt-[50px] bg-white rounded-[12px]'>
                <div className="flex items-center justify-between">
                    <div>
                        <p className='mb-[10px] text-[#2E3A44] text-[24px] font-inter font-semibold'>Layanan</p>
                        <p className="mb-[10px] text-[15px] text-[#737373] font-inter font-medium dark:text-[#737373]">150 Total Layanan</p>
                    </div>
                    <div>
                        <button className="appearance-none block w-[177px] h-[43px] bg-[#2D014B] hover:bg-[#2E3A66] text-[#FFFFFF] font-medium font-inter text-[16px] rounded-[12px]" onClick={()=>navigate("/edit-profile")}>+ Tambah Layanan</button>
                    </div>
                </div>
                <div className='flex items-start my-[40px]'>
                    <button className='flex items-center mr-[28px] px-[20px] py-[10px] bg-[#00CDB4] rounded-[12px]'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M16.1583 8.23285C16.1583 10.5825 14.2851 12.4666 11.949 12.4666C9.61292 12.4666 7.73974 10.5825 7.73974 8.23285C7.73974 5.88227 9.61292 4 11.949 4C14.2851 4 16.1583 5.88227 16.1583 8.23285ZM11.949 20C8.51785 20 5.58809 19.456 5.58809 17.2802C5.58809 15.1034 8.49904 14.5396 11.949 14.5396C15.3802 14.5396 18.31 15.0836 18.31 17.2604C18.31 19.4362 15.399 20 11.949 20ZM17.9571 8.30922C17.9571 9.50703 17.5998 10.6229 16.973 11.5505C16.9086 11.646 16.9659 11.7748 17.0796 11.7946C17.2363 11.8216 17.3984 11.8369 17.5631 11.8414C19.2062 11.8846 20.6809 10.821 21.0883 9.21974C21.6918 6.84123 19.9198 4.7059 17.6634 4.7059C17.4181 4.7059 17.1835 4.73201 16.9551 4.77884C16.9238 4.78605 16.8907 4.80046 16.8728 4.82838C16.8513 4.8626 16.8674 4.90853 16.8889 4.93825C17.5667 5.8938 17.9571 7.05918 17.9571 8.30922ZM20.6782 13.5126C21.7823 13.7296 22.5084 14.1727 22.8093 14.8166C23.0636 15.3453 23.0636 15.9586 22.8093 16.4864C22.349 17.4851 20.8654 17.8058 20.2887 17.8886C20.1696 17.9066 20.0738 17.8031 20.0864 17.6833C20.3809 14.9157 18.0377 13.6035 17.4315 13.3018C17.4055 13.2883 17.4002 13.2676 17.4028 13.255C17.4046 13.246 17.4154 13.2316 17.4351 13.2289C18.7468 13.2046 20.1571 13.3847 20.6782 13.5126ZM6.43711 11.8413C6.60186 11.8368 6.76304 11.8224 6.92063 11.7945C7.03434 11.7747 7.09165 11.6459 7.02718 11.5504C6.4004 10.6228 6.04313 9.50694 6.04313 8.30913C6.04313 7.05909 6.43353 5.89371 7.11135 4.93816C7.13284 4.90844 7.14806 4.86251 7.12746 4.82829C7.10956 4.80127 7.07553 4.78596 7.04509 4.77875C6.81586 4.73192 6.58127 4.70581 6.33593 4.70581C4.07951 4.70581 2.30751 6.84114 2.91191 9.21965C3.31932 10.8209 4.79405 11.8845 6.43711 11.8413ZM6.59694 13.2545C6.59962 13.268 6.59425 13.2878 6.56918 13.3022C5.9621 13.6039 3.61883 14.9161 3.91342 17.6827C3.92595 17.8034 3.83104 17.9061 3.71195 17.889C3.13531 17.8061 1.65163 17.4855 1.19139 16.4867C0.936203 15.9581 0.936203 15.3457 1.19139 14.817C1.49225 14.1731 2.21752 13.73 3.32156 13.512C3.84358 13.385 5.25294 13.2049 6.5656 13.2292C6.5853 13.2319 6.59515 13.2464 6.59694 13.2545Z" fill="white"/></svg>
                        <p className='ml-[12px] font-inter font-semibold text-white text-[13px]'>Event Organizer</p>
                    </button>
                    <button className='flex items-center mr-[28px] px-[20px] py-[10px] bg-[#EDEDED] text-[#C0C6D4] hover:bg-[#00CDB4] hover:text-white rounded-[12px]'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.3196 3H5.08961C3.09961 3 2.09961 4.01 2.09961 6.02V22H7.49961V18.25C7.49961 17.84 7.83961 17.5 8.24961 17.5C8.65961 17.5 8.99961 17.83 8.99961 18.25V22H14.2996V6.02C14.2996 4.01 13.3096 3 11.3196 3ZM10.7496 12.75H5.79961C5.38961 12.75 5.04961 12.41 5.04961 12C5.04961 11.59 5.38961 11.25 5.79961 11.25H10.7496C11.1596 11.25 11.4996 11.59 11.4996 12C11.4996 12.41 11.1596 12.75 10.7496 12.75ZM10.7496 9H5.79961C5.38961 9 5.04961 8.66 5.04961 8.25C5.04961 7.84 5.38961 7.5 5.79961 7.5H10.7496C11.1596 7.5 11.4996 7.84 11.4996 8.25C11.4996 8.66 11.1596 9 10.7496 9Z" fill="currentColor"/><path d="M23 21.2501H20.73V18.2501C21.68 17.9401 22.37 17.0501 22.37 16.0001V14.0001C22.37 12.6901 21.3 11.6201 19.99 11.6201C18.68 11.6201 17.61 12.6901 17.61 14.0001V16.0001C17.61 17.0401 18.29 17.9201 19.22 18.2401V21.2501H1C0.59 21.2501 0.25 21.5901 0.25 22.0001C0.25 22.4101 0.59 22.7501 1 22.7501H19.93C19.95 22.7501 19.96 22.7601 19.98 22.7601C20 22.7601 20.01 22.7501 20.03 22.7501H23C23.41 22.7501 23.75 22.4101 23.75 22.0001C23.75 21.5901 23.41 21.2501 23 21.2501Z" fill="currentColor"/></svg>
                        <p className='ml-[12px] font-inter font-semibold text-[13px]'>Venue</p>
                    </button>
                    <button className='flex items-center mr-[28px] px-[20px] py-[10px] bg-[#EDEDED] text-[#C0C6D4] hover:bg-[#00CDB4] hover:text-white rounded-[12px]'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.0401 13.2799L20.1201 12.3799L12.3701 20.1199L13.3001 21.0499C14.0801 21.8299 14.8901 22.2199 15.6901 22.2199C16.4901 22.2199 17.3001 21.8299 18.0801 21.0499L21.0401 18.0899C22.6301 16.4899 22.6301 14.8799 21.0401 13.2799Z" fill="currentColor"/>
                            <path d="M10.6898 2.92994C9.11976 1.35994 7.46977 1.35994 5.89977 2.92994L2.92977 5.88994C1.36977 7.45994 1.36977 9.10994 2.92977 10.6799L3.84977 11.5999L11.5998 3.84994L10.6898 2.92994Z" fill="currentColor"/>
                            <path d="M21.8098 3.94009C20.4998 7.21009 17.5098 11.4801 14.6598 14.2701C14.2498 11.6901 12.1898 9.67009 9.58984 9.31009C12.3898 6.45009 16.6898 3.42009 19.9698 2.10009C20.5498 1.88009 21.1298 2.05009 21.4898 2.41009C21.8698 2.79009 22.0498 3.36009 21.8098 3.94009Z" fill="currentColor"/>
                            <path d="M13.7801 15.09C13.5801 15.26 13.3801 15.43 13.1801 15.59L11.3901 17.02C11.3901 16.99 11.3801 16.95 11.3801 16.91C11.2401 15.84 10.7401 14.85 9.93012 14.04C9.11012 13.22 8.09012 12.72 6.97012 12.58C6.94012 12.58 6.90012 12.57 6.87012 12.57L8.32012 10.74C8.46012 10.56 8.61012 10.39 8.77012 10.21L9.45012 10.3C11.6001 10.6 13.3301 12.29 13.6701 14.43L13.7801 15.09Z" fill="currentColor"/>
                            <path d="M10.4298 17.6198C10.4298 18.7198 10.0098 19.7698 9.20976 20.5598C8.59976 21.1798 7.77977 21.5998 6.77977 21.7198L4.32976 21.9898C2.98976 22.1398 1.83976 20.9898 1.98976 19.6398L2.25976 17.1798C2.49976 14.9898 4.32976 13.5898 6.26976 13.5498C6.45976 13.5398 6.66976 13.5498 6.86976 13.5698C7.71976 13.6798 8.53976 14.0698 9.22976 14.7498C9.89976 15.4198 10.2798 16.2098 10.3898 17.0398C10.4098 17.2398 10.4298 17.4298 10.4298 17.6198Z" fill="currentColor"/>
                        </svg>
                        <p className='ml-[12px] font-inter font-semibold text-[13px]'>Peralatan</p>
                    </button>
                    <button className='flex items-center mr-[28px] px-[20px] py-[10px] bg-[#EDEDED] text-[#C0C6D4] hover:bg-[#00CDB4] hover:text-white rounded-[12px]'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.5099 5.85L13.5699 2.42C12.5999 1.86 11.3999 1.86 10.4199 2.42L4.48992 5.85C3.51992 6.41 2.91992 7.45 2.91992 8.58V15.42C2.91992 16.54 3.51992 17.58 4.48992 18.15L10.4299 21.58C11.3999 22.14 12.5999 22.14 13.5799 21.58L19.5199 18.15C20.4899 17.59 21.0899 16.55 21.0899 15.42V8.58C21.0799 7.45 20.4799 6.42 19.5099 5.85ZM11.9999 7.34C13.2899 7.34 14.3299 8.38 14.3299 9.67C14.3299 10.96 13.2899 12 11.9999 12C10.7099 12 9.66992 10.96 9.66992 9.67C9.66992 8.39 10.7099 7.34 11.9999 7.34ZM14.6799 16.66H9.31992C8.50992 16.66 8.03992 15.76 8.48992 15.09C9.16992 14.08 10.4899 13.4 11.9999 13.4C13.5099 13.4 14.8299 14.08 15.5099 15.09C15.9599 15.75 15.4799 16.66 14.6799 16.66Z" fill="currentColor"/></svg>
                        <p className='ml-[12px] font-inter font-semibold text-[13px]'>Talent</p>
                    </button>
                </div>
                <div className='grid grid-cols-4 grid-flow-rows'>
                    <div className='w-[283px] my-[16px] px-[16px] py-[17px] border-2 border-[#EBEBEB] rounded-[16px]'>
                        <img className="rounded-[4px] w-[260px] h-[144px]" src={layanan1} alt=""/>
                        <p className='mt-[12px] text-[#475569] text-[18px] font-inter font-normal'>Premium Wedding Package</p>
                        <p className='mt-[20px] mb-[18px] font-inter font-semibold text-[#1A1A1A] text-[20px]'>Rp 40.000.000</p>
                        <button className='px-[84px] py-[6px] bg-[#FF601B] rounded-[8px] text-white text-[12px] font-rubik font-medium'>Lihat Layanan</button>
                        <div className='grid justify-items-end mt-[20px]'>
                            <div className='flex'>
                                <p className='mr-[12px] font-rubik font-normal text-[14px] text-[#64748B]'>Tampilkan Layanan</p>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer"/>
                                    <div className="w-[40px] h-[24px] bg-[#CBD5E1] peer-focus:outline-none rounded-full peer dark:bg-[#CBD5E1] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#00CDB4]"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='w-[283px] my-[16px] px-[16px] py-[17px] border-2 border-[#EBEBEB] rounded-[16px]'>
                        <img className="rounded-[4px] w-[260px] h-[144px]" src={layanan1} alt=""/>
                        <p className='mt-[12px] text-[#475569] text-[18px] font-inter font-normal'>Premium Wedding Package</p>
                        <p className='mt-[20px] mb-[18px] font-inter font-semibold text-[#1A1A1A] text-[20px]'>Rp 40.000.000</p>
                        <button className='px-[84px] py-[6px] bg-[#FF601B] rounded-[8px] text-white text-[12px] font-rubik font-medium'>Lihat Layanan</button>
                        <div className='grid justify-items-end mt-[20px]'>
                            <div className='flex'>
                                <p className='mr-[12px] font-rubik font-normal text-[14px] text-[#64748B]'>Tampilkan Layanan</p>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer"/>
                                    <div className="w-[40px] h-[24px] bg-[#CBD5E1] peer-focus:outline-none rounded-full peer dark:bg-[#CBD5E1] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#00CDB4]"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='w-[283px] my-[16px] px-[16px] py-[17px] border-2 border-[#EBEBEB] rounded-[16px]'>
                        <img className="rounded-[4px] w-[260px] h-[144px]" src={layanan1} alt=""/>
                        <p className='mt-[12px] text-[#475569] text-[18px] font-inter font-normal'>Premium Wedding Package</p>
                        <p className='mt-[20px] mb-[18px] font-inter font-semibold text-[#1A1A1A] text-[20px]'>Rp 40.000.000</p>
                        <button className='px-[84px] py-[6px] bg-[#FF601B] rounded-[8px] text-white text-[12px] font-rubik font-medium'>Lihat Layanan</button>
                        <div className='grid justify-items-end mt-[20px]'>
                            <div className='flex'>
                                <p className='mr-[12px] font-rubik font-normal text-[14px] text-[#64748B]'>Tampilkan Layanan</p>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer"/>
                                    <div className="w-[40px] h-[24px] bg-[#CBD5E1] peer-focus:outline-none rounded-full peer dark:bg-[#CBD5E1] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#00CDB4]"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='w-[283px] my-[16px] px-[16px] py-[17px] border-2 border-[#EBEBEB] rounded-[16px]'>
                        <img className="rounded-[4px] w-[260px] h-[144px]" src={layanan1} alt=""/>
                        <p className='mt-[12px] text-[#475569] text-[18px] font-inter font-normal'>Premium Wedding Package</p>
                        <p className='mt-[20px] mb-[18px] font-inter font-semibold text-[#1A1A1A] text-[20px]'>Rp 40.000.000</p>
                        <button className='px-[84px] py-[6px] bg-[#FF601B] rounded-[8px] text-white text-[12px] font-rubik font-medium'>Lihat Layanan</button>
                        <div className='grid justify-items-end mt-[20px]'>
                            <div className='flex'>
                                <p className='mr-[12px] font-rubik font-normal text-[14px] text-[#64748B]'>Tampilkan Layanan</p>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer"/>
                                    <div className="w-[40px] h-[24px] bg-[#CBD5E1] peer-focus:outline-none rounded-full peer dark:bg-[#CBD5E1] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#00CDB4]"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='w-[283px] my-[16px] px-[16px] py-[17px] border-2 border-[#EBEBEB] rounded-[16px]'>
                        <img className="rounded-[4px] w-[260px] h-[144px]" src={layanan1} alt=""/>
                        <p className='mt-[12px] text-[#475569] text-[18px] font-inter font-normal'>Premium Wedding Package</p>
                        <p className='mt-[20px] mb-[18px] font-inter font-semibold text-[#1A1A1A] text-[20px]'>Rp 40.000.000</p>
                        <button className='px-[84px] py-[6px] bg-[#FF601B] rounded-[8px] text-white text-[12px] font-rubik font-medium'>Lihat Layanan</button>
                        <div className='grid justify-items-end mt-[20px]'>
                            <div className='flex'>
                                <p className='mr-[12px] font-rubik font-normal text-[14px] text-[#64748B]'>Tampilkan Layanan</p>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer"/>
                                    <div className="w-[40px] h-[24px] bg-[#CBD5E1] peer-focus:outline-none rounded-full peer dark:bg-[#CBD5E1] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#00CDB4]"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='w-[283px] my-[16px] px-[16px] py-[17px] border-2 border-[#EBEBEB] rounded-[16px]'>
                        <img className="rounded-[4px] w-[260px] h-[144px]" src={layanan1} alt=""/>
                        <p className='mt-[12px] text-[#475569] text-[18px] font-inter font-normal'>Premium Wedding Package</p>
                        <p className='mt-[20px] mb-[18px] font-inter font-semibold text-[#1A1A1A] text-[20px]'>Rp 40.000.000</p>
                        <button className='px-[84px] py-[6px] bg-[#FF601B] rounded-[8px] text-white text-[12px] font-rubik font-medium'>Lihat Layanan</button>
                        <div className='grid justify-items-end mt-[20px]'>
                            <div className='flex'>
                                <p className='mr-[12px] font-rubik font-normal text-[14px] text-[#64748B]'>Tampilkan Layanan</p>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer"/>
                                    <div className="w-[40px] h-[24px] bg-[#CBD5E1] peer-focus:outline-none rounded-full peer dark:bg-[#CBD5E1] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#00CDB4]"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='w-[283px] my-[16px] px-[16px] py-[17px] border-2 border-[#EBEBEB] rounded-[16px]'>
                        <img className="rounded-[4px] w-[260px] h-[144px]" src={layanan1} alt=""/>
                        <p className='mt-[12px] text-[#475569] text-[18px] font-inter font-normal'>Premium Wedding Package</p>
                        <p className='mt-[20px] mb-[18px] font-inter font-semibold text-[#1A1A1A] text-[20px]'>Rp 40.000.000</p>
                        <button className='px-[84px] py-[6px] bg-[#FF601B] rounded-[8px] text-white text-[12px] font-rubik font-medium'>Lihat Layanan</button>
                        <div className='grid justify-items-end mt-[20px]'>
                            <div className='flex'>
                                <p className='mr-[12px] font-rubik font-normal text-[14px] text-[#64748B]'>Tampilkan Layanan</p>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer"/>
                                    <div className="w-[40px] h-[24px] bg-[#CBD5E1] peer-focus:outline-none rounded-full peer dark:bg-[#CBD5E1] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#00CDB4]"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='w-[283px] my-[16px] px-[16px] py-[17px] border-2 border-[#EBEBEB] rounded-[16px]'>
                        <img className="rounded-[4px] w-[260px] h-[144px]" src={layanan1} alt=""/>
                        <p className='mt-[12px] text-[#475569] text-[18px] font-inter font-normal'>Premium Wedding Package</p>
                        <p className='mt-[20px] mb-[18px] font-inter font-semibold text-[#1A1A1A] text-[20px]'>Rp 40.000.000</p>
                        <button className='px-[84px] py-[6px] bg-[#FF601B] rounded-[8px] text-white text-[12px] font-rubik font-medium'>Lihat Layanan</button>
                        <div className='grid justify-items-end mt-[20px]'>
                            <div className='flex'>
                                <p className='mr-[12px] font-rubik font-normal text-[14px] text-[#64748B]'>Tampilkan Layanan</p>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer"/>
                                    <div className="w-[40px] h-[24px] bg-[#CBD5E1] peer-focus:outline-none rounded-full peer dark:bg-[#CBD5E1] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#00CDB4]"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='items-center text-center mt-[50px]'>
                    <nav aria-label="Page navigation example">
                        <ul className="inline-flex items-center -space-x-px">
                            <li>
                                <a href="#" className="block px-[8px] py-[8px] ml-[5px] leading-tight text-black bg-white border-2 border-gray-300 rounded-[32px] hover:bg-gray-100 hover:text-gray-300 dark:bg-white dark:border-gray-300 dark:text-balck dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span className="sr-only">First</span>
                                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.7267 12L12.6667 11.06L9.61341 8L12.6667 4.94L11.7267 4L7.72675 8L11.7267 12Z" fill="currentColor"/><path d="M7.33344 12L8.27344 11.06L5.2201 8L8.27344 4.94L7.33344 4L3.33344 8L7.33344 12Z" fill="currentColor"/></svg>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="block px-[8px] py-[8px] ml-[5px] leading-tight text-black bg-white border-2 border-gray-300 rounded-[32px] hover:bg-gray-100 hover:text-gray-300 dark:bg-white dark:border-gray-300 dark:text-balck dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span className="sr-only">Previous</span>
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                </a>
                            </li>
                            <li>
                                <a href="#" aria-current="page" className="z-10 px-[12px] py-[7px] ml-[5px] leading-tight text-black border-2 border-blue-300 rounded-[32px] bg-blue-50 hover:bg-gray-700 hover:text-white dark:border-gray-700 dark:bg-gray-700 dark:text-white">1</a>
                            </li>
                            <li>
                                <a href="#" className="px-[12px] py-[7px] ml-[5px] leading-tight text-black bg-white border-2 border-gray-300 rounded-[32px] hover:bg-gray-100 hover:text-gray-300 dark:bg-white dark:border-gray-300 dark:text-balck dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                            </li>
                            <li>
                                <a href="#" className="px-[12px] py-[7px] ml-[5px] leading-tight text-black bg-white border-2 border-gray-300 rounded-[32px] hover:bg-gray-100 hover:text-gray-300 dark:bg-white dark:border-gray-300 dark:text-balck dark:hover:bg-gray-700 dark:hover:text-white">3</a>
                            </li>
                            <li>
                                <a className="px-[12px] py-[7px] ml-[5px] leading-tight text-black bg-white dark:bg-white dark:text-balck" aria-disabled='true'>...</a>
                            </li>
                            <li>
                                <a href="#" className="px-[12px] py-[7px] ml-[5px] leading-tight text-black bg-white border-2 border-gray-300 rounded-[32px] hover:bg-gray-100 hover:text-gray-300 dark:bg-white dark:border-gray-300 dark:text-balck dark:hover:bg-gray-700 dark:hover:text-white">10</a>
                            </li>
                            <li>
                                <a href="#" className="block px-[8px] py-[8px] ml-[5px] leading-tight text-black bg-white border-2 border-gray-300 rounded-[32px] hover:bg-gray-100 hover:text-gray-300 dark:bg-white dark:border-gray-300 dark:text-balck dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span className="sr-only">Next</span>
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="block px-[8px] py-[8px] ml-[5px] leading-tight text-black bg-white border-2 border-gray-300 rounded-[32px] hover:bg-gray-100 hover:text-gray-300 dark:bg-white dark:border-gray-300 dark:text-balck dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span className="sr-only">Last</span>
                                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.27325 4L3.33325 4.94L6.38659 8L3.33325 11.06L4.27325 12L8.27325 8L4.27325 4Z" fill="currentColor"/><path d="M8.66656 4L7.72656 4.94L10.7799 8L7.72656 11.06L8.66656 12L12.6666 8L8.66656 4Z" fill="currentColor"/></svg>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className='pt-[40px]'>
                <Footer/>
            </div>
        </div>
    )
}

export default MainProfile