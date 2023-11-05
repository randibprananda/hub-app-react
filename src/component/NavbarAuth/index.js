import React from 'react'
import { Logo } from '../../assets'
import { BiLeftArrowAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const NavbarAuth = ({onClickBack, navigateBack}) => {
    return (
        <div className='px-[16px] py-[16px] bg-[#B8B2C7] lg:mb-[40px] mb-[20px] flex items-center gap-[19px]'>
            {navigateBack &&
                <button onClick={onClickBack}>
                    <BiLeftArrowAlt className='text-3xl text-[#2E3A44]'/>
                </button>
            }
            <Link to={'/'}>
                <img src={Logo} width={125}/>
            </Link>
        </div>
    )
}

export default NavbarAuth