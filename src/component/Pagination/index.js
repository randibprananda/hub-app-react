import React from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const Pagination = ({ currentPage, totalPages, onPageChange, onPrevChange, onNextChange }) => {

    const pageRange = Array.from({ length: totalPages }, (_, index) => index + 1);
    
    return (
        <div>
            <div className='flex items-center justify-between mt-[30px]'>
                <div className='flex items-center gap-[20px]'>
                    <button onClick={onPrevChange} className='border rounded-full p-2'>
                        <MdKeyboardArrowLeft className='text-[#A098AE]'/>
                    </button>
                    {pageRange.map((page) => (
                        <button key={page} className={currentPage === page ? 'bg-cherry rounded-full w-[32px] h-[32px] flex items-center justify-center' : 'bg-cherry rounded-full w-[32px] h-[32px] bg-opacity-10 flex items-center justify-center'} onClick={() => onPageChange(page)}>
                            <h1 className={currentPage === page ? 'text-white text-[14px]' : 'text-chbg-cherry text-[14px]'}>{page}</h1>
                        </button>
                    ))}
                    <button onClick={onNextChange} className='border rounded-full p-2'>
                        <MdKeyboardArrowRight className='text-[#A098AE]'/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;