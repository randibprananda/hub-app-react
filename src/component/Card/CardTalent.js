import React from 'react'


function CardEo({Icon, Value, Title}) {
    return (
        <div className='lg:col-span-3 col-span-6'>
            <div className='bg-white w-full h-24 rounded-xl shadow-sm p-7 flex items-center space-x-6'>
                <img src={Icon} alt=''/>
                <h1 className='text-black text-3xl font-bold'>{Value}</h1>
                <h1 className='text-gray-400 text-xl'>{Title}</h1>
            </div>

        </div>
    )
}

export default CardEo
