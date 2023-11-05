import React from 'react';

function CardAdmin({count, total, symbol}) {
  return (
    <div className='lg:col-span-3 md:col-span-4 col-span-6'>
        <div className='bg-white rounded-[14px] border w-full h-28 p-[22px] flex items-center space-x-5'>
            <div className='h-[50px] w-[50px] bg-light-primary rounded-[10px] flex items-center justify-center'>
                <img className='lg:w-[30px] w-[25px] lg:h-[30px] h-[25px]' src={symbol}/>
            </div>
            <div className='space-y-2'> 
                <h1 className='text-primary font-bold lg:text-[36px] text-lg'>{count}</h1>
                <h2 className='text-primary lg:text-[16px] text-sm font-light'>{total}</h2>

            </div>
            
        </div>
    </div>
   
  );
}

export default CardAdmin;
