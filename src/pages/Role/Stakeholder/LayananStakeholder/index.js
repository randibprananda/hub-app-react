import React, { useState } from 'react';
import { Navbar, Stepper } from '../../../../component'
import { Button, Box } from '@mui/material'
import { steps } from '../../../../component/data/stepperContent'
import '../../../../App.css';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';



const LayananStakeholder = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [iseBlueBoxShown, setIsBlueBoxShown] = useState(true);
    const [isYellowBoxShown, setIsYellowBoxShown] = useState(true);
    const [count, setCount] = React.useState(0);
    const [count2, setCount2] = React.useState(0);
    const [count3, setCount3] = React.useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    const checkboxHandler = () => {
        setIsYellowBoxShown(!isYellowBoxShown);
    };

    return (
        <div className='bg-[#E3E8F1]'>
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
            <div className='grid grid-cols-12 bg-[#E3E8F1]'>
                <div className='col-span-4 p-20 bg-[#E3E8F1] h-max'>
                    <div className='bg-white rounded-lg py-10 px-4'>
                        <Stepper activeStep={activeStep} steps={steps} handleReset={handleReset} />
                    </div>
                </div>

                <div className='col-span-8 h-max p-20 bg-[#E3E8F1]'>
                    <style></style>
                    <div className='bg-white rounded-lg p-8'>
                        {activeStep === 0 ? (
                            <div>
                                <h1 className='text-[#2D014B] text-3xl font-bold mb-9'>Buat Layanan Jasa</h1>
                                <div className='flex gap-1'>
                                    <label className="block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]" htmlFor="nama">
                                        Upload Foto Layanan
                                    </label>
                                    <label className='block text-[#C1121F] text-[14px] font-normal font-inter'>*</label>
                                </div>
                                <div className='flex'>
                                    <div className="wrapper">
                                        <div className="border cursor-pointer rounded-lg w-[136px] h-[136px] mb-[10px]">
                                            <div className='flex flex-col cursor-pointer py-5 justfy-center items-center'>
                                                <AddPhotoAlternateOutlinedIcon sx={{ color: "#00CDB4", width: "50px", height: "50px" }} />
                                                <h1 className="text-sm text-[#00CDB4] text-center">Tambah Foto <br></br>(0/10)</h1>
                                            </div>
                                        </div>
                                        <input type="file" multiple accept="image/*" />
                                    </div>
                                    <div className='ml-10'>
                                        <div className='flex items-center gap-2 mb-3'>
                                            <div className='rounded-full w-2 h-2 bg-[#D9D9D9]'></div>
                                            <h1 className='text-[13px] text-[#A8A8A8]'>Ukuran: Maks. 10 MB</h1>
                                        </div>
                                        <div className='flex items-center gap-2 mb-3'>
                                            <div className='rounded-full w-2 h-2 bg-[#D9D9D9]'></div>
                                            <h1 className='text-[13px] text-[#A8A8A8]'>Format: JPG, JPEG, PNG</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex gap-1'>
                                    <label className="block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]" htmlFor="nama">
                                        Upload Foto Layanan
                                    </label>
                                    <label className='block text-[#C1121F] text-[14px] font-normal font-inter'>*</label>
                                </div>
                                <div className='flex'>
                                    <div className="wrapper">
                                        <div className="border cursor-pointer rounded-lg w-[136px] h-[136px] mb-[10px]">
                                            <div className='flex flex-col cursor-pointer py-8 justfy-center items-center'>
                                                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M17.9688 35.3516H12.3047V29.6875C12.3047 29.4727 12.1289 29.2969 11.9141 29.2969H9.57031C9.35547 29.2969 9.17969 29.4727 9.17969 29.6875V35.3516H3.51562C3.30078 35.3516 3.125 35.5273 3.125 35.7422V38.0859C3.125 38.3008 3.30078 38.4766 3.51562 38.4766H9.17969V44.1406C9.17969 44.3555 9.35547 44.5312 9.57031 44.5312H11.9141C12.1289 44.5312 12.3047 44.3555 12.3047 44.1406V38.4766H17.9688C18.1836 38.4766 18.3594 38.3008 18.3594 38.0859V35.7422C18.3594 35.5273 18.1836 35.3516 17.9688 35.3516Z" fill="#00CDB4" />
                                                    <path d="M44.5312 14.7607L38.2812 18.3594V10.9375C38.2812 9.21387 36.8799 7.8125 35.1562 7.8125H6.25C4.52637 7.8125 3.125 9.21387 3.125 10.9375V28.125H6.64062V11.3281H34.7656V38.6719H21.875V42.1875H35.1562C36.8799 42.1875 38.2812 40.7861 38.2812 39.0625V31.6406L44.5312 35.2393C45.5713 35.8398 46.875 35.0879 46.875 33.8916V16.1133C46.875 14.9121 45.5713 14.1602 44.5312 14.7607ZM43.3594 30.5176L38.2812 27.5977V22.4072L43.3594 19.4824V30.5176Z" fill="#00CDB4" />
                                                    <path d="M15.625 17.5781C15.8398 17.5781 16.0156 17.4023 16.0156 17.1875V14.8438C16.0156 14.6289 15.8398 14.4531 15.625 14.4531H10.1562C9.94141 14.4531 9.76562 14.6289 9.76562 14.8438V17.1875C9.76562 17.4023 9.94141 17.5781 10.1562 17.5781H15.625Z" fill="#00CDB4" />
                                                </svg>
                                                <h1 className="text-sm text-[#00CDB4] text-center">Tambah <br></br>Video</h1>
                                            </div>
                                        </div>
                                        <input type="file" multiple accept="video/*" />
                                    </div>
                                    <div className='ml-10'>
                                        <div className='flex items-center gap-2 mb-3'>
                                            <div className='rounded-full w-2 h-2 bg-[#D9D9D9]'></div>
                                            <h1 className='text-[13px] text-[#A8A8A8]'>Ukuran: Maks. 30MB dan resclusi maks 1280x1.280px</h1>
                                        </div>
                                        <div className='flex items-center gap-2 mb-3'>
                                            <div className='rounded-full w-2 h-2 bg-[#D9D9D9]'></div>
                                            <h1 className='text-[13px] text-[#A8A8A8]'>Format: MP4</h1>
                                        </div>
                                        <div className='flex items-center gap-2 mb-3'>
                                            <div className='rounded-full w-2 h-2 bg-[#D9D9D9]'></div>
                                            <h1 className='text-[13px] text-[#A8A8A8]'>Durasi: 10-60 detik</h1>
                                        </div>
                                        <div className='flex items-center gap-2 mb-3'>
                                            <div className='rounded-full w-2 h-2 bg-[#D9D9D9]'></div>
                                            <h1 className='text-[13px] text-[#A8A8A8] w-3/4'>Catatan: Kamu dapat menampilkan produk saat video sedang diproses. Video akan muncul setelah berhasil diproses.</h1>
                                        </div>
                                    </div>
                                </div>
                                <label className="block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]" htmlFor="nama">
                                    Nama Layanan
                                </label>
                                <input className="appearance-none block w-full bg-[#F9FBFC] text-[#C0C6D4] border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white" id="nama" type="text" placeholder="Nama Layanan" />
                                <label htmlFor="service" className="block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]">Pilih Layanan</label>
                                <select id="service" className="appearance-none block w-full bg-[#F9FBFC] text-[#C0C6D4] border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white">
                                    <option selected>Pilih layanan</option>
                                    <option value="wedding">Wedding</option>
                                    <option value="graduation">Graduation</option>

                                </select>
                                <label className="block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]" htmlFor="grid-business-permit">
                                    Deskripsi Layanan
                                </label>
                                <textarea id="alamat" rows="4" className="block p-2.5 w-full mb-[20px] font-rubik font-normal text-[16px] text-[#C0C6D4] bg-[#F9FBFC] rounded-[12px] focus:outline-none focus:ring-white focus:border-white dark:bg-[#F9FBFC] dark:border-white dark:placeholder-gray-400 dark:text-[#C0C6D4] dark:focus:ring-white dark:focus:border-white" placeholder="Jelaskan apa yang akan client dapat pada paket ini"></textarea>
                            </div>
                        ) : (<div>
                            <h1 className='text-[#2D014B] text-3xl font-bold mb-9 '>Pengaturan Paket</h1>
                            <label className="block text-[#64748B] w-1/2 text-[14px] font-normal font-inter mb-[10px]" htmlFor="grid-business-permit">
                                Buat paket tambahan untuk menjangkau lebih banyak client
                            </label>
                            <div className='flex items-center'>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" checked={isYellowBoxShown}
                                        onChange={checkboxHandler} />
                                    <div className="w-[60px] h-[36px] bg-[#CBD5E1] peer-focus:outline-none rounded-full peer dark:bg-[#CBD5E1] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-8 after:w-8 after:transition-all dark:border-gray-600 peer-checked:bg-[#00CDB4]"></div>
                                </label>
                                <label className='ml-2 text-[14px] text-[#334155] font-semibold'>Nonaktif</label>
                            </div>
                            <div className='flex flex-row gap-5'>
                                <div>
                                    <div className='flex gap-1'>
                                        <label className="block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]" htmlFor="level">
                                            Level Paket
                                        </label>
                                        <label className='block text-[#C1121F] text-[14px] font-normal font-inter'>*</label>
                                    </div>
                                    <input className="appearance-none block w-[358px] bg-[#F9FBFC] text-[#C0C6D4] border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white" id="level" type="text" placeholder="Ex : Starter" />
                                    <div className='flex gap-1'>
                                        <label className="block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]" htmlFor="nama">
                                            Nama Paket
                                        </label>
                                        <label className='block text-[#C1121F] text-[14px] font-normal font-inter'>*</label>
                                    </div>

                                    <input className="appearance-none block w-[358px] bg-[#F9FBFC] text-[#C0C6D4] border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white" id="nama" type="text" placeholder="Ex : Starter" />
                                    <div className='flex gap-1'>
                                        <label className="block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]" htmlFor="Deskripsi">
                                            Deskripsi Paket
                                        </label>
                                        <label className='block text-[#C1121F] text-[14px] font-normal font-inter'>*</label>
                                    </div>
                                    <textarea id="deskripsi" rows="4" className="block p-2.5 w-full mb-[10px] font-rubik font-normal text-[16px] text-[#C0C6D4] bg-[#F9FBFC] rounded-[12px] focus:outline-none focus:ring-white focus:border-white dark:bg-[#F9FBFC] dark:border-white dark:placeholder-gray-400 dark:text-[#C0C6D4] dark:focus:ring-white dark:focus:border-white" maxlength="1200" placeholder="Jelaskan apa yang akan client dapat pada paket ini" onChange={e => setCount(e.target.value.length)}></textarea>
                                    <div className='flex justify-between mb-[20px]'>
                                        <h1 className='text-xs text-[#5B6785] font-semibold'>Minimal 1200 karakter</h1>
                                        <p className='text-xs text-[#5B6785] font-semibold'>{count}/1200</p>
                                    </div>
                                    <div className='flex gap-1'>
                                        <label className="block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]" htmlFor="nama">
                                            Harga Paket
                                        </label>
                                        <label className='block text-[#C1121F] text-[14px] font-normal font-inter'>*</label>
                                    </div>
                                    <div className="relative ">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <label className='text-[14px] text-[#334155]'>
                                                Rp
                                            </label>
                                        </div>
                                        <input type="text" className="appearance-none block w-[358px] bg-[#F9FBFC] text-[#C0C6D4] border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none  p-4 pl-10" placeholder="Tarif Layanan" required />

                                    </div>
                                </div>
                                {isYellowBoxShown &&
                                    <div className="w-[600px] overflow-x-auto ">
                                        <div className='flex flex-row gap-5'>
                                            <div>
                                                <div className='flex gap-1'>
                                                    <label className="block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]" htmlFor="nama">
                                                        Level Paket
                                                    </label>
                                                    <label className='block text-[#C1121F] text-[14px] font-normal font-inter'>*</label>
                                                </div>
                                                <input className="appearance-none block w-[358px] bg-[#F9FBFC] text-[#C0C6D4] border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white" id="nama" type="text" placeholder="Ex : Starter" />
                                                <div className='flex gap-1'>
                                                    <label className="block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]" htmlFor="nama">
                                                        Nama Paket
                                                    </label>
                                                    <label className='block text-[#C1121F] text-[14px] font-normal font-inter'>*</label>
                                                </div>
                                                <input className="appearance-none block w-[358px] bg-[#F9FBFC] text-[#C0C6D4] border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white" id="nama" type="text" placeholder="Ex : Starter" />
                                                <div className='flex gap-1'>
                                                    <label className="block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]" htmlFor="Deskripsi">
                                                        Deskripsi Paket
                                                    </label>
                                                    <label className='block text-[#C1121F] text-[14px] font-normal font-inter'>*</label>
                                                </div>
                                                <textarea id="deskripsi" rows="4" className="block p-2.5 w-full mb-[10px] font-rubik font-normal text-[16px] text-[#C0C6D4] bg-[#F9FBFC] rounded-[12px] focus:outline-none focus:ring-white focus:border-white dark:bg-[#F9FBFC] dark:border-white dark:placeholder-gray-400 dark:text-[#C0C6D4] dark:focus:ring-white dark:focus:border-white" maxlength="1200" placeholder="Jelaskan apa yang akan client dapat pada paket ini" onChange={e => setCount2(e.target.value.length)}></textarea>
                                                <div className='flex justify-between mb-[20px]'>
                                                    <h1 className='text-xs text-[#5B6785] font-semibold'>Minimal 1200 karakter</h1>
                                                    <p className='text-xs text-[#5B6785] font-semibold'>{count2}/1200</p>
                                                </div>

                                                <div className='flex gap-1'>
                                                    <label className="block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]" htmlFor="nama">
                                                        Harga Paket
                                                    </label>
                                                    <label className='block text-[#C1121F] text-[14px] font-normal font-inter'>*</label>
                                                </div>
                                                <div className="relative ">
                                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                        <label className='text-[14px] text-[#334155]'>
                                                            Rp
                                                        </label>
                                                    </div>
                                                    <input type="text" className="appearance-none block w-[358px] bg-[#F9FBFC] text-[#C0C6D4] border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none  p-4 pl-10" placeholder="Tarif Layanan" required />

                                                </div>
                                            </div>
                                            <div>
                                                <div className='flex gap-1'>
                                                    <label className="block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]" htmlFor="nama">
                                                        Level Paket
                                                    </label>
                                                    <label className='block text-[#C1121F] text-[14px] font-normal font-inter'>*</label>
                                                </div>
                                                <input className="appearance-none block w-[358px] bg-[#F9FBFC] text-[#C0C6D4] border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white" id="nama" type="text" placeholder="Ex : Starter" />
                                                <div className='flex gap-1'>
                                                    <label className="block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]" htmlFor="nama">
                                                        Nama Paket
                                                    </label>
                                                    <label className='block text-[#C1121F] text-[14px] font-normal font-inter'>*</label>
                                                </div>
                                                <input className="appearance-none block w-[358px] bg-[#F9FBFC] text-[#C0C6D4] border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white" id="nama" type="text" placeholder="Ex : Starter" />
                                                <div className='flex gap-1'>
                                                    <label className="block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]" htmlFor="Deskripsi">
                                                        Deskripsi Paket
                                                    </label>
                                                    <label className='block text-[#C1121F] text-[14px] font-normal font-inter'>*</label>
                                                </div>
                                                <textarea id="deskripsi" rows="4" className="block p-2.5 w-full mb-[10px] font-rubik font-normal text-[16px] text-[#C0C6D4] bg-[#F9FBFC] rounded-[12px] focus:outline-none focus:ring-white focus:border-white dark:bg-[#F9FBFC] dark:border-white dark:placeholder-gray-400 dark:text-[#C0C6D4] dark:focus:ring-white dark:focus:border-white" maxlength="1200" placeholder="Jelaskan apa yang akan client dapat pada paket ini" onChange={e => setCount3(e.target.value.length)}></textarea>
                                                <div className='flex justify-between mb-[20px]'>
                                                    <h1 className='text-xs text-[#5B6785] font-semibold'>Minimal 1200 karakter</h1>
                                                    <p className='text-xs text-[#5B6785] font-semibold'>{count3}/1200</p>
                                                </div>
                                                <div className='flex gap-1'>
                                                    <label className="block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]" htmlFor="nama">
                                                        Harga Paket
                                                    </label>
                                                    <label className='block text-[#C1121F] text-[14px] font-normal font-inter'>*</label>
                                                </div>
                                                <div className="relative ">
                                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                        <label className='text-[14px] text-[#334155]'>
                                                            Rp
                                                        </label>
                                                    </div>
                                                    <input type="text" className="appearance-none block w-[358px] bg-[#F9FBFC] text-[#C0C6D4] border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none  p-4 pl-10" placeholder="Tarif Layanan" required />

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }

                            </div>
                        </div>)}
                        <Box sx={{ mb: 2 }}>
                            <div className='flex justify-end'>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mt: 1, mr: 1, border: 1, borderRadius: 2, color: '#2D014B', borderColor: '#DADADA' }}
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 1, mr: 1, borderRadius: 2, backgroundColor: '#2D014B' }}
                                >
                                    {activeStep === steps.length - 1 ? 'Publish Layanan' : 'Lanjutkan'}
                                </Button>
                            </div>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LayananStakeholder