import React, { useEffect, useState } from 'react'
import { Card1, Card2, Footer, Navbar, FooterTwo, CardDashboard, CardSupplier, CardHeaderVenue, CardLayanan } from '../../../../component'
import { AltImage, IconBag, IconBagCherry, IconBagPrimary, IconBagPurple, IconBagYellow, IconServiceEOWhite, IconServiceSupplierWhite, IconSupplierCherry, Logo, LogoDefault, NoData, SupplierEmptyVector, VenueEmptyVector, Wedding } from '../../../../assets'
import ReactPaginate from 'react-paginate';
import { Backdrop, Fade, Modal } from '@mui/material';
import { Box } from '@mui/system';
import { Close } from '@mui/icons-material';
import Api from '../../../../Api';
import { Link } from "react-router-dom";
import imageHandle from '../../../../utils/imageHandle';

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

const DashboardSupplier = () => {
    const [enabled, setEnabled] = useState(false);


    const [users, setUsers] = useState('');
    const [items, setItems] = useState('');
    const [statistic, setStatistic] = useState([]);
    const [pages, setPages] = useState(1);
    const [limit, setLimit] = useState(12);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPage, setTotalPage] = useState('');

    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const getFetchUser = async () => {
        try {
            const response = await Api.fetch(localStorage.getItem('token-hub'))
            setUsers(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getItem = async () => {
        try {
            const response = await Api.getSupplier(localStorage.getItem('token-hub', 1, 10))
            const resStatistic = await Api.getStatisticSupplier(localStorage.getItem('token-hub'))
            console.log(resStatistic.data.data)
            console.log(response.data.data)
            setItems(response.data.data)
            // setTotalItem(response.data.total)
            setTotalPage(response.data.totalPages)
            setStatistic(resStatistic.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    const handlePageClick = () => {
        setPages(pages + 1)
    }

    useEffect(() => {
        getFetchUser()
        getItem()
    }, [])

    return (
        <>
            <div className='bg-[#E3E8F1] h-full'>
                <div className=''>
                    <Navbar />
                    <div className='pt-40 space-y-2'>
                        <div className='px-10 flex flex-col space-y-5'>
                            <h1>Admin Supplier </h1>
                            <div className='flex md:gap-7 gap-3 md:items-center items-start'>
                                <div className=''>
                                    <div className="relative w-20 h-20 overflow-hidden object-cover rounded-full border bg-gray-100">
                                        <img src={users.image == null ? AltImage : imageHandle(users.image)} className="absolute" alt="Konnect Logo" />
                                    </div>
                                </div>
                                <div className='flex flex-wrap md:gap-11 gap-5'>
                                    <div>
                                        <p className='text-xl font-bold text-dark-3'>{users.fullname ? users.fullname : "Unknow"}</p>
                                        <p className='text-xs text-dark-6'>Bergabung sejak {new Date(users.createdAt).toLocaleDateString(["ban", "id"])}</p>
                                    </div>
                                    <div>
                                        <button className='bg-white text-black-k text-sm font-medium py-3 px-6 rounded-md hover:bg-dark-6 hover:text-white'>Lihat Detail</button>
                                    </div>
                                </div>
                            </div>
                            {/* <div className='grid lg:grid-cols-12 grid-cols-6 lg:space-x-10 space-x-0 lg:space-y-0 space-y-10'>
                                <CardDashboard image={IconBag} value={items.length} label={'Total Persediaan'} />
                                <CardDashboard image={IconBag} value={0} label={'Clients'} />
                                <CardDashboard image={IconBag} value={0} label={'Lorem Ipsum'} />
                                <CardDashboard image={IconBag} value={0} label={'Lorem Ipsum'} />
                            </div> */}
                            {/* Section 2 */}
                            <div className='mt-5 flex flex-col md:flex-row items-center justify-between gap-[20px] md:gap-[30px]'>
                                <CardHeaderVenue image={IconBagCherry} value={statistic?.total_product} title={'Total Layanan'} />
                                <CardHeaderVenue image={IconBagPrimary} value={statistic?.total_product_aktif} title={'Total Layanan Aktif'} />
                                <CardHeaderVenue image={IconBagYellow} value={statistic?.total_klien} title={'Total Klien'} />
                                <CardHeaderVenue image={IconBagPurple} value={statistic?.total_klien_aktif} title={'Total Klien Aktif'} />
                            </div>
                        </div>
                    </div>
                    <div className='pt-10 space-y-3 pb-10'>
                        <div className='px-10 flex flex-col space-y-5'>
                            <div className='w-full bg-white rounded-xl p-7'>
                                <div className='pb-20'>
                                    <div className='flex flex-wrap justify-between gap-5'>
                                        <div className='flex flex-col'>
                                            <h1 className='text-xl text-black font-bold'>Persediaan</h1>
                                            <h1 className='text-base text-gray-500'>{items.length} Persediaan</h1>

                                        </div>
                                        <div className='flex flex-wrap items-center gap-3'>
                                            <button className='text-cherry px-5 py-2.5 border-2 border-cherry rounded-lg hover:bg-cherry hover:text-white' onClick={handleOpen}>Tambah Massal</button>
                                            <Link to="/add-supplier" className='text-white px-5 py-2.5 rounded-lg border-2 border-cherry bg-cherry hover:bg-violet-900'>Tambah Persediaan</Link>
                                        </div>

                                    </div>
                                    <div className='py-[30px]'>
                                        <div className='flex flex-col md:flex-row items-center flex-wrap gap-5'>
                                            {items.length === 0 ?
                                                <div className='flex items-center justify-center w-full h-screen col-span-12'>
                                                    <img src={VenueEmptyVector} />
                                                </div>
                                                :
                                                Object.values(items).map((data, index) => {
                                                    return (
                                                        <CardLayanan
                                                            layanan={'supplier'}
                                                            key={index}
                                                            icon={IconSupplierCherry}
                                                            image={!data.product_image ? LogoDefault : imageHandle(data?.product_image)}
                                                            title={data?.product_name} price={data?.package[0]?.total_price}
                                                            id={data?.id}
                                                            active={data.status_active}
                                                        />
                                                    )
                                                })

                                            }
                                        </div>
                                    </div>
                                    <div>
                                        {items.length !== 0 &&
                                            <div className='flex items-center justify-center mt-[30px] gap-[5px]'>
                                                <ReactPaginate
                                                    breakLabel={<span className="mr-4">...</span>}
                                                    nextLabel={
                                                        <span className="flex items-center justify-center w-12 h-12 rounded-full border-2 hover:bg-cherry hover:text-white">
                                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M6.94 4L6 4.94L9.05333 8L6 11.06L6.94 12L10.94 8L6.94 4Z" fill="currentColor" />
                                                            </svg>

                                                        </span>
                                                    }
                                                    // onPageChange={handlePageClick}
                                                    onPageChange={handlePageClick}
                                                    pageRangeDisplayed={limit}
                                                    pageCount={totalPage}
                                                    previousLabel={
                                                        <span className="flex items-center justify-center w-12 h-12 rounded-full border-2 hover:bg-cherry hover:text-white">
                                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M10.06 12L11 11.06L7.94667 8L11 4.94L10.06 4L6.06 8L10.06 12Z" fill="currentColor" />
                                                            </svg>

                                                        </span>
                                                    }
                                                    // renderOnZeroPageCount={null}
                                                    containerClassName="flex items-center justify center mt-8 mb-4 space-x-10"
                                                    disabledClassName="w-12 h-12 rounded-full border-2 flex items-center justify-center"
                                                    activeClassName="w-12 h-12 rounded-full border-2 bg-cherry text-white flex items-center justify-center"
                                                />
                                            </div>
                                        }
                                    </div>

                                </div>

                            </div>

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
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            <div className='flex justify-between items-start'>
                                <div>
                                    <h1 className='text-lg font-semibold'>Tambah Persediaan Secara masal</h1>
                                    <p className='text-xs text-dark-6'>Memungkinkan Anda untuk menambah beberapa layanan sekaligus.</p>
                                </div>
                                <button onClick={handleClose} className='hover:text-dark-3'>
                                    <Close />
                                </button>
                            </div>
                            <div className='my-5 space-y-2.5'>
                                <label className="text-sm font-medium text-[#64748B]">Upload File</label>
                                <div>
                                    <label htmlFor="file-input" className="flex w-full border-2 rounded-xl cursor-pointer hover:bg-gray-100">
                                        <div className="flex items-center p-2">
                                            <p className="text-sm border rounded-xl px-5 py-2.5 bg-outline">Pilih File</p>
                                            <p className="text-sm text-light-gray">Tidak ada file yang dipilih</p>
                                        </div>
                                        <input id="file-input" type="file" className="hidden" />
                                    </label>
                                </div>
                                <p className="text-xs text-black-k">Unduh template <a href="#" className="font-bold text-primary">disini</a></p>
                                <div className="mt-10 flex flex-row justify-end">
                                    <button
                                        className="py-2 px-5 rounded-md border border-dark-5 text-dark-5 hover:text-white hover:bg-cherry/50 font-semibold ml-2"
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="py-2 px-5 rounded-md text-white bg-cherry hover:bg-cherry/50 font-semibold ml-2"
                                    >
                                        Upload
                                    </button>
                                </div>
                            </div>
                        </Box>
                    </Fade>
                </Modal>
            </div>
        </>
    )
}

export default DashboardSupplier