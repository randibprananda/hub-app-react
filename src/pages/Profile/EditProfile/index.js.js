/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Navbar } from '../../../component'

const EditProfile = () => {
    return (
        <div className='h-full bg-[#E3E8F1]'>
            <div className='pt-4'>
                <Navbar/>
            </div>
            <div className='mx-[70px] mt-[120px]'>
                <ul className="flex">
                    <li className="mr-[14px]">
                        <a className="font-inter text-black text-[16px] hover:text-[#00CDB4]" href="/">Beranda</a>
                    </li>
                    <li className="mr-[14px]">
                        <p><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 15" fill="currentColor" className="w-4 h-5"><path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" /></svg></p>
                    </li>
                    <li className="mr-[14px]">
                        <a className="font-inter text-black text-[16px] hover:text-black" href="/profile">Profile</a>
                    </li>
                </ul>
            </div>
            <div className='flex items-center ml-[70px] mr-[70px] mt-[30px]'>
                <img src={require("../../../assets/images/profile.png")} className="h-[170px] w-[170px] sm:h-[170px]" alt="Flowbite Logo" />
                <div className='bg-[#2D014B] h-[130px] w-[1175px] rounded-r-[20px] m-30'>
                    <h1 className='text-white text-[32px] font-inter font-bold pl-[30px] pt-[28px]'>Marley Korsgaard</h1>
                    <p className='text-white text-[18px] font-inter pl-[30px]'>Lorem ipsum</p>
                </div>
            </div>
            <div className='mt-[50px] mx-[70px]'>
                <p className='tracking-wide underline font-inter text-[#2D014B] text-[16px] font-medium font-bold'>Informasi Perusahaan</p>
            </div>
            <div className='mt-[30px] mx-[70px]'>
                <form className="w-full">
                    <div className="flex flex-wrap -mx-[55px]">
                        <div className="w-full md:w-1/2 px-[55px] mb-[10px] md:mb-[10px]">
                            <label className="block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]" htmlFor="nama">
                                Nama UMKM
                            </label>
                            <input className="appearance-none block w-full bg-[#F9FBFC] text-[#C0C6D4] border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white" id="nama" type="text" placeholder="Nama UMKM"/>

                            <label className="block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]" htmlFor="badanUsaha">
                                Badan Usaha
                            </label>
                            <div className='flex items-center mb-[20px]'>
                                <div className="flex items-center mr-[30px]">
                                    <input id="radio1" type="radio" name="radioBadanUsaha" value="PERORANGAN" className="hidden" />
                                    <label htmlFor="radio1" className="flex items-center cursor-pointer w-full py-4 ml-2 text-sm font-medium text-[#C0C6D4] dark:text-[#C0C6D4]">
                                    <span className="w-[16px] h-[16px] bg-white inline-block mr-2 rounded-full border border-white flex-no-shrink"></span>
                                    Perorangan</label>
                                </div>
                                <div className="flex items-center mr-[30px]">
                                    <input id="radio2" type="radio" name="radioBadanUsaha" value="UD" className="hidden" />
                                    <label htmlFor="radio2" className="flex items-center cursor-pointer w-full py-4 ml-2 text-sm font-medium text-[#C0C6D4] dark:text-[#C0C6D4]">
                                    <span className="w-[16px] h-[16px] bg-white inline-block mr-2 rounded-full border border-white flex-no-shrink"></span>
                                    UD</label>
                                </div>
                                <div className="flex items-center mr-[30px]">
                                    <input id="radio3" type="radio" name="radioBadanUsaha" value="CV" className="hidden" />
                                    <label htmlFor="radio3" className="flex items-center cursor-pointer w-full py-4 ml-2 text-sm font-medium text-[#C0C6D4] dark:text-[#C0C6D4]">
                                    <span className="w-[16px] h-[16px] bg-white inline-block mr-2 rounded-full border border-white flex-no-shrink"></span>
                                    CV</label>
                                </div>
                                <div className="flex items-center mr-[30px]">
                                    <input id="radio4" type="radio" name="radioBadanUsaha" value="PT" className="hidden" />
                                    <label htmlFor="radio4" className="flex items-center cursor-pointer w-full py-4 ml-2 text-sm font-medium text-[#C0C6D4] dark:text-[#C0C6D4]">
                                    <span className="w-[16px] h-[16px] bg-white inline-block mr-2 rounded-full border border-white flex-no-shrink"></span>
                                    PT</label>
                                </div>
                                <div className="flex items-center mr-[30px]">
                                    <input id="radio5" type="radio" name="radioBadanUsaha" value="Koperasi" className="hidden" />
                                    <label htmlFor="radio5" className="flex items-center cursor-pointer w-full py-4 ml-2 text-sm font-medium text-[#C0C6D4] dark:text-[#C0C6D4]">
                                    <span className="w-[16px] h-[16px] bg-white inline-block mr-2 rounded-full border border-white flex-no-shrink"></span>
                                    Koperasi</label>
                                </div>
                            </div>

                            <label className="block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]" htmlFor="jenisBadanUSaha">
                                Jenis Badan Usaha
                            </label>
                            <div className='flex items-center mb-[20px]'>
                                <div className="flex items-center mr-[30px]">
                                    <input id="checkbox1" type="checkbox" name="checkboxJenisBadanUsaha" value="PRODUSEN" className='hidden'  />
                                    <label htmlFor="checkbox1" className="flex items-center cursor-pointer w-full py-4 ml-2 text-sm font-medium text-[#C0C6D4] dark:text-[#C0C6D4]">
                                    <span className="w-[16px] h-[16px] bg-white inline-block mr-2 rounded border border-white flex-no-shrink"></span>
                                    Produsen</label>
                                </div>
                                <div className="flex items-center mr-[30px]">
                                    <input id="checkbox2" type="checkbox" name="checkboxJenisBadanUsaha" value="DISTRIBUTOR" className='hidden'  />
                                    <label htmlFor="checkbox2" className="flex items-center cursor-pointer w-full py-4 ml-2 text-sm font-medium text-[#C0C6D4] dark:text-[#C0C6D4]">
                                    <span className="w-[16px] h-[16px] bg-white inline-block mr-2 rounded border border-white flex-no-shrink"></span>
                                    Distributor</label>
                                </div>
                                <div className="flex items-center mr-[30px]">
                                    <input id="checkbox3" type="checkbox" name="checkboxJenisBadanUsaha" value="PERDAGANGAN" className='hidden'  />
                                    <label htmlFor="checkbox3" className="flex items-center cursor-pointer w-full py-4 ml-2 text-sm font-medium text-[#C0C6D4] dark:text-[#C0C6D4]">
                                    <span className="w-[16px] h-[16px] bg-white inline-block mr-2 rounded border border-white flex-no-shrink"></span>
                                    Perdagangan</label>
                                </div>
                                <div className="flex items-center mr-[30px]">
                                    <input id="checkbox4" type="checkbox" name="checkboxJenisBadanUsaha" value="RETAILER" className='hidden'  />
                                    <label htmlFor="checkbox4" className="flex items-center cursor-pointer w-full py-4 ml-2 text-sm font-medium text-[#C0C6D4] dark:text-[#C0C6D4]">
                                    <span className="w-[16px] h-[16px] bg-white inline-block mr-2 rounded border border-white flex-no-shrink"></span>
                                    Retailer</label>
                                </div>
                            </div>

                            <label className="block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]" htmlFor="grid-business-permit">
                                Alamat
                            </label>
                            <textarea id="alamat" rows="4" className="block p-2.5 w-full mb-[20px] font-rubik font-normal text-[16px] text-[#C0C6D4] bg-[#F9FBFC] rounded-[12px] focus:outline-none focus:ring-white focus:border-white dark:bg-[#F9FBFC] dark:border-white dark:placeholder-gray-400 dark:text-[#C0C6D4] dark:focus:ring-white dark:focus:border-white" placeholder="Alamat"></textarea>

                            <label className="block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]" htmlFor="kota">
                                Kota
                            </label>
                            <input className="appearance-none block w-full bg-[#F9FBFC] text-[#C0C6D4] border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white" id="kota" type="text" placeholder="Kota"/>

                            <label className="block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]" htmlFor="telp">
                                No. Telp
                            </label>
                            <input className="appearance-none block w-full bg-[#F9FBFC] text-[#C0C6D4] border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white" id="telp" type="number" placeholder="No.Telp"/>

                            <label className="block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]" htmlFor="email">
                                Email Aktif
                            </label>
                            <input className="appearance-none block w-full bg-[#F9FBFC] text-[#C0C6D4] border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white" id="email" type="email" placeholder="Email Aktif"/>

                            <label className="block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]" htmlFor="password">
                                Password
                            </label>
                            <input className="appearance-none block w-full bg-[#F9FBFC] text-[#C0C6D4] border rounded-[12px] py-3 px-4 mb-[5px] leading-tight focus:outline-none focus:bg-white" id="password" type="password" placeholder="Password"/>
                            <p className="mb-[10px] text-[#C0C6D4] text-[14px] font-normal font-rubik">Password ini akan digunakan untuk mengakses umkm portal exporthub.</p>
                        </div>
                        <div className="w-full md:w-1/2 px-[55px] mb-[10px] md:mb-[10px]">
                            <label className="block text-[#64748B] text-[16px] font-normal font-inter mb-2" htmlFor="grid-business-permit">
                                Apakah ada dokumen izin usaha (NIB/SIUP/IUMK/IUI)
                            </label>
                            <div className='flex items-center mb-[10px]'>
                                <div className="flex items-center mr-[30px]">
                                    <input id="radio6" type="radio" name="radioIzinUsaha" value="YES" className="hidden" />
                                    <label htmlFor="radio6" className="flex items-center cursor-pointer w-full py-4 ml-2 text-sm font-medium text-[#C0C6D4] dark:text-[#C0C6D4]">
                                    <span className="w-[16px] h-[16px] bg-white inline-block mr-2 rounded-full border border-white flex-no-shrink"></span>
                                    YA</label>
                                </div>
                                <div className="flex items-center mr-[30px]">
                                    <input id="radio7" type="radio" name="radioIzinUsaha" value="NO" className="hidden" />
                                    <label htmlFor="radio7" className="flex items-center cursor-pointer w-full py-4 ml-2 text-sm font-medium text-[#C0C6D4] dark:text-[#C0C6D4]">
                                    <span className="w-[16px] h-[16px] bg-white inline-block mr-2 rounded-full border border-white flex-no-shrink"></span>
                                    TIDAK</label>
                                </div>
                            </div>
                            {/* <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe"/> */}

                            <label className="block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]" htmlFor="dokumenIzinUsaha">
                                Dokumen Izin Usaha
                            </label>
                            <div className='flex items-center mb-[20px]'>
                                <div className="flex items-center mr-[30px]">
                                    <input id="checkbox5" type="checkbox" name="checkboxDokumenIzinUsaha" value="NIB" className='hidden'  />
                                    <label htmlFor="checkbox5" className="flex items-center cursor-pointer w-full py-4 ml-2 text-sm font-medium text-[#C0C6D4] dark:text-[#C0C6D4]">
                                    <span className="w-[16px] h-[16px] bg-white inline-block mr-2 rounded border border-white flex-no-shrink"></span>
                                    NIB</label>
                                </div>
                                <div className="flex items-center mr-[30px]">
                                    <input id="checkbox6" type="checkbox" name="checkboxDokumenIzinUsaha" value="SIUP" className='hidden'  />
                                    <label htmlFor="checkbox6" className="flex items-center cursor-pointer w-full py-4 ml-2 text-sm font-medium text-[#C0C6D4] dark:text-[#C0C6D4]">
                                    <span className="w-[16px] h-[16px] bg-white inline-block mr-2 rounded border border-white flex-no-shrink"></span>
                                    SIUP</label>
                                </div>
                                <div className="flex items-center mr-[30px]">
                                    <input id="checkbox7" type="checkbox" name="checkboxDokumenIzinUsaha" value="IUMK" className='hidden'  />
                                    <label htmlFor="checkbox7" className="flex items-center cursor-pointer w-full py-4 ml-2 text-sm font-medium text-[#C0C6D4] dark:text-[#C0C6D4]">
                                    <span className="w-[16px] h-[16px] bg-white inline-block mr-2 rounded border border-white flex-no-shrink"></span>
                                    IUMK</label>
                                </div>
                                <div className="flex items-center mr-[30px]">
                                    <input id="checkbox8" type="checkbox" name="checkboxDokumenIzinUsaha" value="IUI" className='hidden'  />
                                    <label htmlFor="checkbox8" className="flex items-center cursor-pointer w-full py-4 ml-2 text-sm font-medium text-[#C0C6D4] dark:text-[#C0C6D4]">
                                    <span className="w-[16px] h-[16px] bg-white inline-block mr-2 rounded border border-white flex-no-shrink"></span>
                                    IUI</label>
                                </div>
                            </div>
                            <form className='border bg-[#CBD5E1] rounded-[12px] w-[600px] h-[194px] mb-[20px]'>
                                <div className="flex items-center pt-[20px] mr-[20px]">
                                    <div className='pl-[20px]'>
                                        <label className='font-rubik font-normal text-[14px] text-[#64748B]'>Nama Pendaftar / PIC *</label>
                                        <input className="appearance-none block w-full bg-[#F9FBFC] text-[#C0C6D4] border rounded-[12px] py-3 px-4 mb-[5px] leading-tight focus:outline-none focus:bg-white" id="pic" type="text" placeholder=""/>
                                    </div>
                                    <div className='pl-[20px]'>
                                        <label className='font-rubik font-normal text-[14px] text-[#64748B]'>Posisi / Jabatan</label>
                                        <input className="appearance-none block w-full bg-[#F9FBFC] text-[#C0C6D4] border rounded-[12px] py-3 px-4 mb-[5px] leading-tight focus:outline-none focus:bg-white" id="jabatan" type="text" placeholder=""/>
                                    </div>
                                    <div className='pl-[20px]'>
                                        <label className='font-rubik font-normal text-[14px] text-[#64748B]'>Email *</label>
                                        <input className="appearance-none block w-full bg-[#F9FBFC] text-[#C0C6D4] border rounded-[12px] py-3 px-4 mb-[5px] leading-tight focus:outline-none focus:bg-white" id="email" type="email" placeholder=""/>
                                    </div>
                                </div>
                                <div className="flex items-center pt-[10px] mr-[20px]">
                                    <div className='pl-[20px]'>
                                        <label className='font-rubik font-normal text-[14px] text-[#64748B]'>Telepon *</label>
                                        <input className="appearance-none block w-[175px] bg-[#F9FBFC] text-[#C0C6D4] border rounded-[12px] py-3 px-4 mb-[5px] leading-tight focus:outline-none focus:bg-white" id="telp" type="number" placeholder=""/>
                                    </div>
                                    <div className='pt-[25px] pl-[20px]'>
                                        <button className="appearance-none block bg-[#2E3A44] hover:bg-[#2E3A66] text-[#F9FBFC] font-medium font-rubix text-[15px] py-3 px-4 mb-[5px] rounded-[8px]">Simpan</button>
                                    </div>
                                </div>
                            </form>
                            <form className='border bg-[#CBD5E1] rounded-[12px] w-[600px] h-[112px] mb-[20px]'>
                                <div className="flex items-center pt-[10px] mr-[20px]">
                                    <div className='pl-[20px]'>
                                        <label className='font-rubik font-normal text-[14px] text-[#64748B]'>Website / Sosial Media</label>
                                        <input className="appearance-none block w-full bg-[#F9FBFC] text-[#C0C6D4] border rounded-[12px] py-3 px-4 mb-[5px] leading-tight focus:outline-none focus:bg-white" id="website" type="text" placeholder=""/>
                                    </div>
                                    <div className='pl-[20px]'>
                                        <label className='font-rubik font-normal text-[14px] text-[#64748B]'>Link URL</label>
                                        <input className="appearance-none block w-full bg-[#F9FBFC] text-[#C0C6D4] border rounded-[12px] py-3 px-4 mb-[5px] leading-tight focus:outline-none focus:bg-white" id="link" type="text" placeholder=""/>
                                    </div>
                                    <div className='pt-[25px] pl-[20px]'>
                                        <button className="appearance-none block bg-[#2E3A44] hover:bg-[#2E3A66] text-[#F9FBFC] font-medium font-rubix text-[15px] py-3 px-4 mb-[5px] rounded-[8px]">Simpan</button>
                                    </div>
                                </div>
                            </form>
                            <form className='border bg-[#CBD5E1] rounded-[12px] w-[600px] h-[112px] mb-[20px]'>
                                <div className="flex items-center pt-[10px] mr-[20px]">
                                    <div className='pl-[20px]'>
                                        <label className='font-rubik font-normal text-[14px] text-[#64748B]'>Marketplace / Toko Online</label>
                                        <input className="appearance-none block w-full bg-[#F9FBFC] text-[#C0C6D4] border rounded-[12px] py-3 px-4 mb-[5px] leading-tight focus:outline-none focus:bg-white" id="marketPlace" type="text" placeholder=""/>
                                    </div>
                                    <div className='pl-[20px]'>
                                        <label className='font-rubik font-normal text-[14px] text-[#64748B]'>Nama</label>
                                        <input className="appearance-none block w-full bg-[#F9FBFC] text-[#C0C6D4] border rounded-[12px] py-3 px-4 mb-[5px] leading-tight focus:outline-none focus:bg-white" id="nama" type="text" placeholder=""/>
                                    </div>
                                    <div className='pt-[25px] pl-[20px]'>
                                        <button className="appearance-none block bg-[#2E3A44] hover:bg-[#2E3A66] text-[#F9FBFC] font-medium font-rubix text-[15px] py-3 px-4 mb-[5px] rounded-[8px]">Simpan</button>
                                    </div>
                                </div>
                            </form>
                            <div className='grid justify-items-end pt-[177px] pr-[10px] md:pr-[40px]'>
                                <button className="appearance-none block w-[135px] h-[46px] bg-[#00CDB4] hover:bg-[#2E3A66] text-[#F9FBFC] font-medium font-rubix text-[15px] py-3 px-4 mb-[5px] rounded-[8px]">Simpan</button>
                            </div>
                        </div>
                    </div>
                    {/* <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                            Password
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************"/>
                        <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                            City
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque"/>
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                            State
                        </label>
                        <div className="relative">
                            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                            <option>New Mexico</option>
                            <option>Missouri</option>
                            <option>Texas</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                            Zip
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210"/>
                        </div>
                    </div> */}
                </form>
            </div>
        </div>
    )
}

export default EditProfile