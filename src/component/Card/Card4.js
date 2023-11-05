import React, { useState } from 'react'
import imageHandle from '../../utils/imageHandle';



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


function Card4({ title, company, price, image, color, buttonText, click }) {
    return (
        <>
            <div className="bg-white m-2 rounded-lg shadow-lg p-4">
                <div className="top">
                    <img
                        className="w-[260px] h-[144px] object-cover"
                        src={imageHandle(image)}
                        alt="img" />
                </div>
                <div className="bottom flex flex-col justify-center items-start p-2 space-y-5">
                    <div className='space-y-1'>
                        <h2 className="text-lg">{title}</h2>
                        <p className="text-light-gray text-lg font-semibold">{company}</p>
                    </div>
                    <p className="font-semibold text-xl">Rp {price ? (parseInt(price).toLocaleString()).replaceAll(',', ".") : null}</p>
                    <button
                        onClick={click}
                        className={`text-center bg-${color} me-auto py-2.5 font-semibold text-xs text-white rounded-[4px] w-full`}>
                        {buttonText}
                    </button>
                </div>
            </div>
        </>
    )
}

export default Card4
