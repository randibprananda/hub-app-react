import { Add, Close } from '@mui/icons-material'
import { Backdrop, Box, Fade, Modal } from '@mui/material'
import moment from 'moment/moment'
import React from 'react'
import { useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'
import { IconBuilding, IconDesignTools, IconNext, IconUser, IconUserGroup, Shop, Wedding } from '../../../../assets'
import { Card2, FooterTwo, Navbar } from '../../../../component'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    'border-radius': "8px",
};

const modalWrapper = {
    overflow: "auto",
    maxHeight: "100vh",
    display: "flex",
};

const modalBlock = {
    position: "relative",
    zIndex: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
}
const modalContentStyle = {
    position: "relative",
    background: "white",
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    borderRadius: "8px",
};

function HistoryOfJoinTender() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className='bg-[#E3E8F1] min-h-screen'>
            <Navbar />
            <div className='md:px-[75px] px-[36px] pt-[120px] pb-[10px] md:pt-[140px] md:pb-[30px] mb-10'>
                <div className='flex flex-wrap items-center gap-3 mb-[30px]'>
                    <Link to={''} className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>Beranda</Link>
                    <img src={IconNext} />
                    <Link to={'/dashboard-sh'} className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>Beranda Profile</Link>
                    <img src={IconNext} />
                    <Link to={''} className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>Riwayat Join Tender</Link>
                </div>
                <div className='bg-white rounded-xl md:py-7 py-4 md:px-14 px-7 space-y-8'>
                    <div className='flex flex-wrap gap-5 justify-between items-center'>
                        <div className='space-y-2.5'>
                            <p className='text-2xl text-black-k font-semibold'>Join Tender </p>
                            <p className='text-sm text-dark-5 font-medium'>30 Tender</p>
                        </div>
                    </div>
                    <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1'>
                        <Card2 click={handleOpen} title="Spectacular Extravaganza Music Jabar Show" imgProfile="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" author="Celiscar Santa" desc="Sebagai rangka peringatan ulang tahun provinsi jawab barat yang ke 70 tahun, akan diselenggaran mega event yang bertepat di Bandung" people="1000 - 5000" date="2023/01/24" textBudget="Modal yang dibutuhkan" budget={40000000} link="" color="cherry" buttonText="Lihat Detail" />
                        <Card2 click={handleOpen} title="Spectacular Extravaganza Music Jabar Show" imgProfile="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" author="Celiscar Santa" desc="Sebagai rangka peringatan ulang tahun provinsi jawab barat yang ke 70 tahun, akan diselenggaran mega event yang bertepat di Bandung" people="1000 - 5000" date="2023/01/24" textBudget="Modal yang dibutuhkan" budget={40000000} link="" color="cherry" buttonText="Lihat Detail" />
                        <Card2 click={handleOpen} title="Spectacular Extravaganza Music Jabar Show" imgProfile="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" author="Celiscar Santa" desc="Sebagai rangka peringatan ulang tahun provinsi jawab barat yang ke 70 tahun, akan diselenggaran mega event yang bertepat di Bandung" people="1000 - 5000" date="2023/01/24" textBudget="Modal yang dibutuhkan" budget={40000000} link="" color="cherry" buttonText="Lihat Detail" />
                        <Card2 click={handleOpen} title="Spectacular Extravaganza Music Jabar Show" imgProfile="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" author="Celiscar Santa" desc="Sebagai rangka peringatan ulang tahun provinsi jawab barat yang ke 70 tahun, akan diselenggaran mega event yang bertepat di Bandung" people="1000 - 5000" date="2023/01/24" textBudget="Modal yang dibutuhkan" budget={40000000} link="" color="cherry" buttonText="Lihat Detail" />
                    </div>
                    <div className='flex justify-center'>
                        <ReactPaginate
                            breakLabel={<span className="mr-4">...</span>}
                            nextLabel={
                                <span className="flex items-center justify-center md:w-12 w-6 md:h-12 h-6 rounded-full border-2 hover:bg-cherry hover:text-white">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.94 4L6 4.94L9.05333 8L6 11.06L6.94 12L10.94 8L6.94 4Z" fill="currentColor" />
                                    </svg>

                                </span>
                            }
                            // onPageChange={handlePageClick}
                            // pageRangeDisplayed={5}
                            pageCount={100}
                            previousLabel={
                                <span className="flex items-center justify-center md:w-12 w-6 md:h-12 h-6 rounded-full border-2 hover:bg-cherry hover:text-white">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.06 12L11 11.06L7.94667 8L11 4.94L10.06 4L6.06 8L10.06 12Z" fill="currentColor" />
                                    </svg>

                                </span>
                            }
                            // renderOnZeroPageCount={null}
                            containerClassName="flex flex-wrap items-center justify-center md:space-x-10 space-x-2"
                            disabledClassName="md:w-12 w-6 md:h-12 h-6 rounded-full border-2 flex items-center justify-center"
                            activeClassName="md:w-12 w-7 md:h-12 h-7 rounded-full border-2 bg-cherry text-white flex items-center justify-center"
                        />
                    </div>
                </div>
            </div>
            <FooterTwo />
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                sx={modalWrapper}
            >
                <Fade in={open}>
                    <Box sx={modalBlock}>
                        <Box sx={modalContentStyle}>
                            <div className='space-y-5'>
                                <div className='flex justify-between items-start'>
                                    <h1 className='text-lg font-semibold'>Detail Join Tender</h1>
                                    <button onClick={handleClose} className='hover:text-dark-3'>
                                        <Close />
                                    </button>
                                </div>
                                <div className='space-y-4'>
                                    <h3>Spectacular Extravaganza Music Jabar Show</h3>
                                    <div className='flex gap-2 items-center'>
                                        <div className="relative w-5 h-5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                            <img src={"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"} className="absolute" alt="Konnect Logo" />
                                        </div>
                                        <p className='text-[10px] text-[#B0B0B0]'>Celiscar Santa</p>
                                    </div>
                                    <p className='text-xs lg:h-[64px] h-auto text-ellipsis overflow-hidden'>Kami adalah organisasi nirlaba membutuhkan partner yang dapat memimpin dan mengelola seluruh perencanaan acara hingga acara selesai terlaksana</p>
                                    <div className='flex gap-2'>
                                        <div className='flex gap-1 bg-[#F6F6F6] rounded-[4px] p-2'>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 4.77338C11.96 4.76671 11.9133 4.76671 11.8733 4.77338C10.9533 4.74004 10.22 3.98671 10.22 3.05338C10.22 2.10004 10.9866 1.33337 11.94 1.33337C12.8933 1.33337 13.66 2.10671 13.66 3.05338C13.6533 3.98671 12.92 4.74004 12 4.77338Z" stroke="#6A6A6A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M11.3133 9.62669C12.2267 9.78003 13.2333 9.62003 13.94 9.14669C14.88 8.52003 14.88 7.49336 13.94 6.86669C13.2267 6.39336 12.2067 6.23336 11.2933 6.39336" stroke="#6A6A6A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M3.97995 4.77338C4.01995 4.76671 4.06661 4.76671 4.10661 4.77338C5.02661 4.74004 5.75995 3.98671 5.75995 3.05338C5.75995 2.10004 4.99328 1.33337 4.03995 1.33337C3.08661 1.33337 2.31995 2.10671 2.31995 3.05338C2.32661 3.98671 3.05995 4.74004 3.97995 4.77338Z" stroke="#6A6A6A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M4.66663 9.62669C3.75329 9.78003 2.74663 9.62003 2.03996 9.14669C1.09996 8.52003 1.09996 7.49336 2.03996 6.86669C2.75329 6.39336 3.77329 6.23336 4.68663 6.39336" stroke="#6A6A6A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M7.99997 9.75336C7.95997 9.74669 7.9133 9.74669 7.8733 9.75336C6.9533 9.72002 6.21997 8.96669 6.21997 8.03336C6.21997 7.08002 6.98664 6.31335 7.93997 6.31335C8.8933 6.31335 9.65997 7.08669 9.65997 8.03336C9.6533 8.96669 8.91997 9.72669 7.99997 9.75336Z" stroke="#6A6A6A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M6.05998 11.8534C5.11998 12.48 5.11998 13.5067 6.05998 14.1334C7.12665 14.8467 8.87331 14.8467 9.93998 14.1334C10.88 13.5067 10.88 12.48 9.93998 11.8534C8.87998 11.1467 7.12665 11.1467 6.05998 11.8534Z" stroke="#6A6A6A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>

                                            <span className='text-[#6A6A6A] text-[10px]'>1000 - 5000</span>
                                        </div>
                                        <div className='flex gap-1 bg-[#F6F6F6] rounded-[4px] p-2'>
                                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3.68745 0C3.80812 0 3.92385 0.0479374 4.00918 0.133266C4.09451 0.218595 4.14245 0.334327 4.14245 0.455V1.30585H9.0285V0.46085C9.0285 0.340176 9.07644 0.224445 9.16177 0.139116C9.2471 0.0537874 9.36283 0.00585 9.4835 0.00585C9.60417 0.00585 9.7199 0.0537874 9.80523 0.139116C9.89056 0.224445 9.9385 0.340176 9.9385 0.46085V1.30585H11.7C12.0447 1.30585 12.3752 1.44272 12.619 1.68638C12.8628 1.93004 12.9998 2.26053 13 2.6052V11.7007C12.9998 12.0453 12.8628 12.3758 12.619 12.6195C12.3752 12.8631 12.0447 13 11.7 13H1.3C0.955331 13 0.62477 12.8631 0.380991 12.6195C0.137212 12.3758 0.000172334 12.0453 0 11.7007L0 2.6052C0.000172334 2.26053 0.137212 1.93004 0.380991 1.68638C0.62477 1.44272 0.955331 1.30585 1.3 1.30585H3.23245V0.45435C3.23262 0.333789 3.28064 0.218225 3.36595 0.133037C3.45126 0.047848 3.56689 -1.23021e-07 3.68745 0ZM0.91 5.0323V11.7007C0.91 11.7519 0.920088 11.8026 0.939687 11.8499C0.959286 11.8972 0.988014 11.9402 1.02423 11.9764C1.06044 12.0126 1.10344 12.0414 1.15075 12.061C1.19807 12.0806 1.24878 12.0907 1.3 12.0907H11.7C11.7512 12.0907 11.8019 12.0806 11.8492 12.061C11.8966 12.0414 11.9396 12.0126 11.9758 11.9764C12.012 11.9402 12.0407 11.8972 12.0603 11.8499C12.0799 11.8026 12.09 11.7519 12.09 11.7007V5.0414L0.91 5.0323ZM4.33355 9.50235V10.5852H3.25V9.50235H4.33355ZM7.04145 9.50235V10.5852H5.95855V9.50235H7.04145ZM9.75 9.50235V10.5852H8.66645V9.50235H9.75ZM4.33355 6.9173V8.0002H3.25V6.9173H4.33355ZM7.04145 6.9173V8.0002H5.95855V6.9173H7.04145ZM9.75 6.9173V8.0002H8.66645V6.9173H9.75ZM3.23245 2.2152H1.3C1.24878 2.2152 1.19807 2.22529 1.15075 2.24489C1.10344 2.26449 1.06044 2.29321 1.02423 2.32943C0.988014 2.36564 0.959286 2.40864 0.939687 2.45595C0.920088 2.50327 0.91 2.55398 0.91 2.6052V4.12295L12.09 4.13205V2.6052C12.09 2.55398 12.0799 2.50327 12.0603 2.45595C12.0407 2.40864 12.012 2.36564 11.9758 2.32943C11.9396 2.29321 11.8966 2.26449 11.8492 2.24489C11.8019 2.22529 11.7512 2.2152 11.7 2.2152H9.9385V2.81905C9.9385 2.93972 9.89056 3.05545 9.80523 3.14078C9.7199 3.22611 9.60417 3.27405 9.4835 3.27405C9.36283 3.27405 9.2471 3.22611 9.16177 3.14078C9.07644 3.05545 9.0285 2.93972 9.0285 2.81905V2.2152H4.14245V2.8132C4.14245 2.93387 4.09451 3.0496 4.00918 3.13493C3.92385 3.22026 3.80812 3.2682 3.68745 3.2682C3.56678 3.2682 3.45105 3.22026 3.36572 3.13493C3.28039 3.0496 3.23245 2.93387 3.23245 2.8132V2.2152Z" fill="#6A6A6A" />
                                            </svg>

                                            <span className='text-[#6A6A6A] text-[10px]'>{moment("2023/01/24").format('LL')}</span>
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap items-end gap-3'>
                                        <div className='space-y-1 mr-10'>
                                            <p className='text-[#888888] text-xs'>Anggaran</p>
                                            <p className='font-semibold text-xl'>Rp {(parseInt(40000000).toLocaleString()).replaceAll(',', ".")}</p>
                                        </div>
                                        <div className='space-y-1'>
                                            <p className='text-[#888888] text-xs'>Anggaran Terkumpul</p>
                                            <p className='font-semibold text-xl'>Rp {(parseInt(20000000).toLocaleString()).replaceAll(',', ".")}</p>
                                        </div>
                                        <div>
                                            <p className='text-[10px] text-white bg-[#E37816] rounded-[20px] py-1 px-2.5 w-fit'>Belum Tercapai</p>
                                            {/* ketika sudah tercapai */}
                                            {/* <p className='text-[10px] text-white bg-[#30DF3F] rounded-[20px] py-1 px-2.5 w-fit'>Tercapai</p> */}
                                        </div>
                                    </div>
                                    <div className='bg-[#F1F1F1] px-7 py-6 rounded-xl space-y-2.5'>
                                        <div className='flex justify-between'>
                                            <p className='text-xs text-[#888888] font-semibold'>Riwayat Join Tender</p>
                                        </div>
                                        <div className='flex justify-between'>
                                            <p className='text-xs text-primary font-semibold'>Xeno.Entertaiment</p>
                                            <p className='text-primary font-semibold text-end'>Rp 10.000.000</p>
                                        </div>
                                        <div className='flex justify-between'>
                                            <p className='text-xs text-[#888888] font-semibold'>Maju Jaya</p>
                                            <p className='text-[#1A1A1A] font-semibold text-end'>Rp 10.000.000</p>
                                        </div>
                                        <div className='flex justify-between'>
                                            <p className='text-xs text-[#888888] font-semibold'>Harapan Bersama</p>
                                            <p className='text-[#1A1A1A] font-semibold text-end'>Rp 10.000.000</p>
                                        </div>
                                    </div>
                                    <h3 className='font-semibold text-sm text-dark-5'>Berikan Modal Lagi </h3>
                                    <p className='font-semibold text-xs text-dark-6'>Masukkan Jumlah Anggaran (Min. Rp 5.000.000)</p>
                                    <div className='flex gap-9'>
                                        <CurrencyFormat
                                            thousandSeparator={true}
                                            prefix={"Rp "}
                                            placeholder="Rp. 50.000.000"
                                            className='rounded-[12px] outline-none border border-[#E3E8F1] w-3/4 px-[20px] py-[15px]'
                                        />
                                        {/* jika sudah tercapai */}
                                        {/* <input type='text' value="Anggaran telah terkumpul" required className='rounded-[12px] outline-none border border-[#E3E8F1] w-3/4 py-2.5 px-3.5' readOnly /> */}
                                        <button
                                            className="py-2 px-5 rounded-md text-white bg-cherry hover:bg-cherry/50 font-semibold ml-2"
                                        >
                                            Berikan Modal
                                        </button>
                                        {/* jika sudah tercapai */}
                                        {/* <button
                                            className="py-2 px-5 rounded-md text-white bg-dark-6 hover:bg-dark-6/50 font-semibold ml-2"
                                        >
                                            Berikan Modal
                                        </button> */}
                                    </div>
                                </div>
                            </div>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default HistoryOfJoinTender