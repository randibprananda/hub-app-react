import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BgDashboard, IconBagCherry, IconBagPrimary, IconBagPurple, IconBagYellow, IconNext, IconNexts, IconPrev, IconPrevs, IconServiceVenueWhite, IconVanue, Logo, LogoDefault, VenueEmptyVector } from '../../../../assets'
import { CardHeaderVenue, CardLayanan, CardVenue, Navbar } from '../../../../component'
import {Backdrop, Box, Fade, Modal} from '@mui/material'
import { Close } from '@mui/icons-material'
import Api from '../../../../Api'
import ReactPaginate from 'react-paginate'
import imageHandle from '../../../../utils/imageHandle'

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

const DashboardVenue = () => {

    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState('');
    const [items, setItems] = useState('');
    const [pages, setPages] = useState(1);
    const [limit, setLimit] = useState(12);
    const [totalItem, setTotalItem] = useState('');
    const [totalPage, setTotalPage] = useState('');
    const [statistic, setStatistic] = useState('')

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
            const response = await Api.getVenueWithLogin(localStorage.getItem('token-hub'), pages, limit)
            const responseStat = await Api.getStatisticVenue(localStorage.getItem('token-hub'))
            setTotalItem(response.data.total)
            setTotalPage(response.data.totalPages)
            setItems(response.data.data)
            setStatistic(responseStat.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handlePageClickVenue = () => {
        setPages(pages + 1)
    }

    useEffect(() => {
        getFetchUser()
        getItem()
    }, [])


    return (
        <div className='bg-[#E3E8F1] min-h-screen'>
            <Navbar/>
            <div className='md:px-[75px] px-[36px] pt-[120px] pb-[10px] md:pt-[140px] md:pb-[30px]'>
                {/* Section 1 */}
                <div>
                    <h1 className='text-[#737373] text-sm font-[500]'>Admin Vanue</h1>
                    <div className='flex flex-col md:flex-row md:items-center md:gap-7 mt-5'>
                        <div className='flex items-center gap-7'>
                            <img src={users.image == null ? Logo : imageHandle(users.image)} className='w-[61px] h-[61px] rounded-full object-cover'/>
                            <div>
                                <h1 className='text-[#454545] font-semibold text-xl'>{users.fullname}</h1>
                                <h1 className='text-[#A8A8A8] text-xs'>Bergabung sejak {new Date(users.createdAt).toLocaleDateString(["ban", "id"])}</h1>
                            </div>
                        </div>
                        <button className='text-[#2E3A44] bg-white py-3 px-6 rounded-xl md:rounded-md font-[500] text-sm mt-5 md:mt-0'>Lihat Detail</button>
                    </div>
                </div>

                {/* Section 2 */}
                <div className='mt-5 flex flex-col md:flex-row items-center justify-between gap-[20px] md:gap-[30px]'>
                    <CardHeaderVenue image={IconBagCherry} value={statistic.total_venue} title={'Total Layanan'}/>
                    <CardHeaderVenue image={IconBagPrimary} value={statistic.total_venue_aktif} title={'Total Layanan Aktif'}/>
                    <CardHeaderVenue image={IconBagYellow} value={statistic.total_klien} title={'Total Klien'}/>
                    <CardHeaderVenue image={IconBagPurple} value={statistic.total_klien_aktif} title={'Total Klien Aktif'}/>
                </div>

                {/* Section 3 */}
                <div className='bg-white mt-[30px] px-[20px] md:px-[40px] py-[30px] rounded-xl'>
                    <div className='flex flex-col md:flex-row items-start md:items-center md:justify-between'>
                        <div>
                            <h1 className='text-[#454545] font-[600] text-[24px]'>Venue</h1>
                            <h1 className='text-[#A8A8A8] font-[500] text-sm'>{items.length} Venue</h1>
                        </div>
                        <div className='flex flex-col mt-5 md:mt-0 md:flex-row items-center gap-5 w-full md:w-auto'>
                            <button onClick={handleOpen} className='w-full md:w-[160px] h-[39px] rounded-md border-[#2D014B] border-2 text-[#2D014B] font-[500]'>Tambah Massal</button>
                            <Link to={'/add-venue'} className='w-full md:w-[160px] h-[39px] rounded-md bg-[#2D014B] text-white flex items-center justify-center font-[500]'>
                                <h1>Tambah Venue</h1>
                            </Link>
                        </div>
                    </div>
                    <div className='py-[30px]'>
                        <div className='mt-[30px] flex flex-col md:grid grid-cols-12 items-center gap-[17px]'>
                            {items.length === 0 ?
                                <div className='col-span-12 flex items-center justify-center h-screen '>
                                    <img src={VenueEmptyVector}/>
                                </div>
                                :
                                Object.values(items).map((data, index) => {
                                    return (
                                        <CardLayanan
                                            layanan={'venue'}
                                            icon={IconServiceVenueWhite}
                                            key={index}
                                            image={!data.venue_image ? LogoDefault : imageHandle(data.venue_image)}
                                            title={data.venue_name} 
                                            price={!data.package.length === 0 ? '0' : data.package[0].total_price}
                                            id={data.id}
                                            active={data.active}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>

                    {/* Pagination */}
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
                                onPageChange={handlePageClickVenue}
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
                                containerClassName="flex items-center justify center mt-8 mb-4 space-x-5"
                                disabledClassName="w-12 h-12 rounded-full border-2 flex items-center justify-center"
                                activeClassName="w-12 h-12 rounded-full border-2 bg-cherry text-white flex items-center justify-center"
                            />
                        </div>
                    }
                </div>
            </div>
            {/* Modal */}
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
                                <h1 className='text-lg font-semibold'>Tambah Persediaan Secara massal</h1>
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
                                        <p className="text-sm text-light-gray px-5">Tidak ada file yang dipilih</p>
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
    )
}

export default DashboardVenue