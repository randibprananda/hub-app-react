import React,{useState, useRef, useEffect} from 'react'
import { Card1, Card2, Footer, Navbar, FooterTwo, CardEo, CardHeaderEo, CardVenue, CardLayanan, CardHeaderVenue } from '../../../../component'
import { IconBag, Wedding, VenueEmptyVector, LogoDefault, IconBagCherry, IconBagPrimary, IconBagYellow, IconBagPurple, IconServiceEOWhite, EoEmptyVector } from '../../../../assets'
import { useNavigate, Link } from "react-router-dom";
import {Backdrop, Box, Fade, Modal} from '@mui/material'
import { Close } from '@mui/icons-material'
import Api from '../../../../Api';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import imageHandle from '../../../../utils/imageHandle';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    'border-radius': "8px",
};

const DashboardEventOrganizer = () => {
    const [enabled, setEnabled] = useState(false);
    const [index, setIndex] = useState(1);
    const [showModal, setShowModal] = useState(false);

    const [layananFile, setLayananFile] = useState();
    const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState(1);
    const navigate = useNavigate();
    const [data, setData]=useState('');
    const [statistic, setStatistic] = useState('');
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState('');
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(12);
    const [totalItem, setTotalItem] = useState('');
    const [totalPage, setTotalPage] = useState('');

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

    const getData = async () => {
        try {
            const response = await Api.getEoWithLogin(localStorage.getItem('token-hub'), page, limit)
            const responseStat = await Api.getStatisticEO(localStorage.getItem('token-hub'))
            setStatistic(responseStat.data.data)
            setTotalItem(response.data.total)
            setTotalPage(response.data.totalPages)
            setData(response.data.data)

            // console.log(responseStat.data.data, 'data')
        } catch (error) {
            console.log(error)
        }
    }

    const updateUser = (id) => {
        const params = { id: id };
        navigate("/profile", {
            state: params,
        });
    };

    const handlePageClickEo = () => {
        setPages(pages + 1)
    }

    useEffect(() => {
        getFetchUser()
        getData()
    }, [])

    return (
        <div className='bg-[#E3E8F1] h-full font-inter'>
            <div className=''>
                <Navbar />
                <div className='pt-40 space-y-2'>
                    <div className='px-10 flex flex-col space-y-5'>
                        {/* Section 1 */}
                        <div>
                            <h1>Admin Event Organizer </h1>
                            <div className='flex items-center space-x-10'>
                                <img
                                    className="w-20 h-20 object-cover rounded-full"
                                    src={imageHandle(users.image)}
                                    alt="img"
                                />
                                <div className='flex flex-col'>
                                    <h1 className='text-black text-xl font-bold'>{users.fullname}</h1>
                                    <h1 className='text-gray-400 text-sm'>Bergabung sejak {new Date(users.createdAt).toLocaleDateString(["ban", "id"])}</h1>

                                </div>

                                <button onClick={() => updateUser(users.id)} className='bg-white px-5 py-2.5 hover:bg-gray-400 hover:text-white rounded-lg shadow-sm font-bold'>Lihat Detail</button>

                            </div>

                        </div>
                        {/* Section 2 */}
                        <div className='mt-5 flex flex-col md:flex-row items-center justify-between gap-[20px] md:gap-[30px]'>
                            <CardHeaderVenue image={IconBagCherry} value={statistic.total_eo} title={'Total Layanan'}/>
                            <CardHeaderVenue image={IconBagPrimary} value={statistic.total_eo_aktif} title={'Total Layanan Aktif'}/>
                            <CardHeaderVenue image={IconBagYellow} value={statistic.total_klien} title={'Total Klien'}/>
                            <CardHeaderVenue image={IconBagPurple} value={statistic.total_klien_aktif} title={'Total Klien Aktif'}/>
                        </div>

                    </div>
                </div>
                <div className='pt-10 space-y-3 pb-10'>
                    <div className='px-10 flex flex-col space-y-5'>
                        <div className='w-full bg-white rounded-xl p-7'>
                            <div className='pb-20'>
                                <div className='flex justify-between'>
                                    <div className='flex flex-col'>
                                        <h1 className='text-xl text-black font-bold'>Event Organizer</h1>
                                        <h1 className='text-base text-gray-500'>{statistic.total_eo} Event Organizer</h1>

                                    </div>
                                    <div className='flex items-center gap-3'>

                                        <button className='text-cherry px-5 py-2.5 text-lg border-2 border-cherry rounded-lg hover:bg-cherry hover:text-white'
                                            type="button"
                                            onClick={handleOpen}
                                        >
                                            Tambah Massal
                                        </button>

                                        <Link to={'/add-layanan-eo'} className='text-white px-5 py-2.5 text-lg rounded-lg border-2 border-cherry bg-cherry hover:bg-violet-900'>Tambah Layanan EO</Link>

                                    </div>
                                </div>
                                <div className='py-[30px]'>
                                    <div className='flex flex-col md:flex-row items-center flex-wrap gap-5'>
                                        {data.length === 0 ?
                                            <div className='flex items-center justify-center w-full h-screen col-span-12'>
                                                <img src={EoEmptyVector}/>
                                            </div>
                                            :
                                            Object.values(data).map((data, index) => {
                                                const formattedPrice = data.package.length > 0 ? data.package[0].total_price.toLocaleString('id-ID', {minimumFractionDigits: 0, maximumFractionDigits: 2}) : '0';
                                                const priceWithoutRp = `${formattedPrice.replace(/^(\D+)/, '')}`;

                                                

                                                return (
                                                    <CardLayanan
                                                        key={index}
                                                        icon={IconServiceEOWhite}
                                                        image={!data.eo_image ? LogoDefault : imageHandle(data.eo_image)}
                                                        title={data.eo_name} 
                                                        // price={!data.package.length === 0 ? '0' : data.package[0].total_price}
                                                        price={priceWithoutRp}
                                                        id={data.id}
                                                        active={data.active}
                                                        // /edit-layanan-eo/:id
                                                        layanan={'eo'}
                                                    />
                                                );
                                            })
                                            
                                        }
                                    </div>
                                </div>
                            </div>
                            {/* Pagination */}
                            {data.length !== 0 && 
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
                                        onPageChange={handlePageClickEo}
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
                                                <h1 className='text-lg font-semibold'>Tambah layanan EO secara massal</h1>
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

                    </div>
                </div>
            </div>
           <FooterTwo/>
        </div>
    )
}

export default DashboardEventOrganizer