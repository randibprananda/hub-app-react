import React, { useState, useRef, useEffect } from 'react'
import { Card1, Card2, Footer, Navbar, FooterTwo, CardTalent, CardLayanan } from '../../../../component'
import { IconBagCherry, IconBagPurple, IconBagYellow, IconBag, Talent, Wedding, IconServiceTalentCherry, LogoDefault, TalentEmptyVector } from '../../../../assets'
import { useNavigate, Link } from "react-router-dom";
import Api from '../../../../Api';
import ReactPaginate from 'react-paginate';
import imageHandle from '../../../../utils/imageHandle';

const DashboardTalent = () => {
    const [index, setIndex] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [users, setUsers] = useState('');
    const [items, setItems] = useState('');
    const [statistic, setStatistic] = useState([]);
    const [pages, setPages] = useState(1);
    const [limit, setLimit] = useState(12);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPage, setTotalPage] = useState('');

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
            const response = await Api.getTalentWithLogin(localStorage.getItem('token-hub', 1, 10))
            const resStatistic = await Api.getStatisticTalent(localStorage.getItem('token-hub'))
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
        <div className='bg-light h-full'>
            <div className=''>
                <Navbar />
                <div className='pt-40 space-y-2'>
                    <div className='px-10 flex flex-col space-y-5'>
                        <h1>Admin Talent </h1>
                        <div className='flex items-center space-x-10'>
                            <img
                                className="w-20 h-20 object-cover rounded-full"
                                src={"https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"}
                                alt="img"
                            />
                            <div className='flex flex-col'>
                                <h1 className='text-black text-xl font-bold'>Leo George</h1>
                                <h1 className='text-gray-400 text-sm'>Bergabung sejak 12/12/2022</h1>

                            </div>

                            <button className='bg-white px-5 py-2.5 hover:bg-gray-400 hover:text-white rounded-lg shadow-sm font-bold'>Lihat Detail</button>

                        </div>
                        <div className='grid lg:grid-cols-12 grid-cols-6 lg:space-x-10 space-x-0 lg:space-y-0 space-y-10'>
                            <CardTalent Icon={IconBagCherry} Value={statistic?.total_talent} Title={'Total Layanan'} />
                            <CardTalent Icon={IconBag} Value={statistic?.total_talent_aktif} Title={'Total Layanan Aktif'} />
                            <CardTalent Icon={IconBagYellow} Value={statistic?.total_klien} Title={'Total Klien'} />
                            <CardTalent Icon={IconBagPurple} Value={statistic?.total_klien_aktif} Title={'Total Klien Aktif'} />


                        </div>
                    </div>
                </div>
                <div className='pt-10 space-y-3 pb-10'>
                    <div className='px-10 flex flex-col space-y-5'>
                        <div className='w-full bg-white rounded-xl p-7'>
                            <div className='pb-20'>
                                <div className='flex justify-between'>
                                    <div className='flex flex-col'>
                                        <h1 className='text-xl text-black font-bold'>Talent</h1>
                                        <h1 className='text-base text-gray-500'>{statistic?.total_talent} Talent</h1>

                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <button className='text-cherry px-5 py-2.5 text-lg border-2 border-cherry rounded-lg hover:bg-cherry hover:text-white'
                                            type="button"
                                            onClick={() => setShowModal(true)}
                                        >Tambah Massal</button>
                                        <Link to={'/add-layanan-talent'} className='text-white px-5 py-2.5 text-lg rounded-lg border-2 border-cherry bg-cherry hover:bg-violet-900'>Tambah Talent</Link>

                                    </div>

                                </div>
                                <div className='flex flex-col md:flex-row items-center flex-wrap gap-5 py-[30px]'>
                                    {items.length === 0 ?
                                        <div className='flex items-center justify-center w-full h-screen col-span-12'>
                                            <img src={TalentEmptyVector} />
                                        </div>
                                        :
                                        Object.values(items).map((data, index) => {
                                            const formattedPrice = data.package.length > 0 ? data.package[0].total_price.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 2 }) : '0';
                                            const priceWithoutRp = `${formattedPrice.replace(/^(\D+)/, '')}`;
                                            return (
                                                <div className='col-span-3'>
                                                    <CardLayanan
                                                        layanan={'talent'}
                                                        icon={IconServiceTalentCherry}
                                                        key={index}
                                                        image={!data.talent_image ? LogoDefault : imageHandle(data.talent_image)}
                                                        title={data.talent_name}
                                                        price={priceWithoutRp}
                                                        id={data.id}
                                                        active={data.active}
                                                    />
                                                </div>
                                            )
                                        })}
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

                            {showModal ? (
                                <>
                                    <div
                                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                    >
                                        <div className="relative w-full max-w-3xl">
                                            {/*content*/}
                                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                {/*header*/}
                                                <div className="flex items-start justify-between p-5 rounded-t">
                                                    <div>
                                                        <h1 className="text-lg font-Bold">
                                                            Tambah layanan Talent secara massal
                                                        </h1>
                                                        <h1 className="text-sm font-semibold text-gray-400">
                                                            Memungkinkan Anda untuk menambah beberapa layanan sekaligus.
                                                        </h1>

                                                    </div>
                                                    <button
                                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                        onClick={() => setShowModal(false)}
                                                    >
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M15.5899 2.39005C16.1367 1.84329 16.1367 0.956825 15.5899 0.410068C15.0432 -0.136689 14.1567 -0.136689 13.6099 0.410068L8 6.0Master of CeremonyL2.39007 0.410068C1.84331 -0.136688 0.956841 -0.136689 0.410085 0.410068C-0.136672 0.956825 -0.136671 1.84329 0.410085 2.39005L6.02002 7.99999L0.410067 13.6099C-0.136689 14.1567 -0.136689 15.0432 0.410067 15.5899C0.956824 16.1367 1.84329 16.1367 2.39005 15.5899L8 9.97997L13.61 15.5899C14.1567 16.1367 15.0432 16.1367 15.5899 15.5899C16.1367 15.0432 16.1367 14.1567 15.5899 13.61L9.97998 7.99999L15.5899 2.39005Z" fill="black" />
                                                        </svg>

                                                    </button>
                                                </div>
                                                {/*body*/}
                                                <div className="p-6">

                                                    <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Upload file</label>


                                                    <div className='text-gray-400 text-base'>
                                                        Unduh template <button className='text-[#00CDB4] font-bold'>disini</button>
                                                    </div>


                                                </div>
                                                {/*footer*/}
                                                <div className="flex gap-4 items-center justify-end p-6 rounded-b">
                                                    <button
                                                        className="text-cherry px-5 py-2 text-base border-2 border-cherry rounded-lg hover:bg-cherry hover:text-white"
                                                        type="button"
                                                        onClick={() => setShowModal(false)}
                                                    >
                                                        Batal
                                                    </button>
                                                    <button
                                                        className="text-white px-5 py-2 text-base rounded-lg border-2 border-cherry bg-cherry hover:bg-violet-900"
                                                        type="button"
                                                    // onClick={() => setShowModal(false)}
                                                    >
                                                        Upload
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                </>
                            ) : null}



                        </div>

                    </div>
                </div>
            </div>
            <FooterTwo />
        </div>
    )
}

export default DashboardTalent