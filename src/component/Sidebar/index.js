import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  IconBlog,
  IconBlogGradient,
  IconDashboardGradient,
  IconDashboardGray,
  IconLeftArrow,
  IconLogout,
  IconPartnerGradient,
  IconPartnerGray,
  IconStakeholderGradient,
  IconStakeholderGray,
  IconTenderGray,
  IconTransactionGradient,
  IconTransactionGray,
  Logo,
  LogoDefault,
} from '../../assets';

const Sidebar = ({ activeMenu, open, setOpen }) => {
  // const [open, setOpen] = useState(true);
  const token = window.localStorage.getItem('token-hub');
  const navigate = useNavigate();
  const menus = [
    {
      title: 'Dashboard',
      src: IconDashboardGray,
      activeSrc: IconDashboardGradient,
      link: '/admin',
      active: activeMenu === 0,
    },
    {
      title: 'Stakeholder',
      src: IconStakeholderGray,
      activeSrc: IconStakeholderGradient,
      link: '/admin/stakeholder',
      active: activeMenu === 1,
    },
    {
      title: 'Partner',
      src: IconPartnerGray,
      activeSrc: IconPartnerGradient,
      link: '/admin/partner',
      active: activeMenu === 2,
    },
    {
      title: 'Transaction',
      src: IconTransactionGray,
      activeSrc: IconTransactionGradient,
      link: '/admin/transaction',
      active: activeMenu === 3,
    },
    {
      title: 'Open Tender',
      src: IconTenderGray,
      activeSrc: IconTenderGray,
      link: '/admin/open-tender',
      active: activeMenu === 4,
    },
    { title: 'Blog', src: IconBlog, activeSrc: IconBlogGradient, link: '/admin/blog', active: activeMenu === 5 },
  ];

  const handleLinkClick = () => {
    if (open) {
      setOpen(false);
    }
  };

  return (
    <div>
      <aside className='fixed top-0 left-0 z-40 transition-transform -translate-x-full sm:translate-x-0'>
        <div className='hidden overflow-auto lg:block'>
          <div
            className={`${open ? 'w-72 rounded-none' : 'w-20 rounded-none'}
                        bg-dark-purple h-screen pt-8 duration-300 bg-white`}>
            <div className='relative'>
              <div className='flex items-center px-5 py-3 gap-x-4'>
                <img
                  src={open ? Logo : LogoDefault}
                  className={`cursor-pointer duration-500
                                ${open && 'rotate-[360deg]'}`}
                />
              </div>
              <div className={`${open ? 'absolute top-12 bottom-12 right-0' : 'absolute top-6 bottom-6 right-0'}`}>
                <button
                  onClick={() => setOpen(!open)}
                  className='bg-cherry hover:bg-indigo-900 w-[16px] h-[27px] rounded-tl-md rounded-bl-md flex items-center justify-center'>
                  <img src={IconLeftArrow} />
                </button>
              </div>
            </div>
            <div className='flex flex-col p-5 space-y-10 bg-white'>
              <div>
                <div className='h-1 mt-3 border-b-2'></div>
                <ul className='pt-6'>
                  {menus.map((menu, index) => (
                    <li
                      key={index}
                      className={`flex px-2 py-5 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center justify-between
                                            ${menu.gap ? 'mt-9' : 'mt-2'}
                                            ${!open && 'gap-1 px-2'}
                                            ${menu.active ? 'bg-light-white' : ''} `}>
                      <Link
                        to={menu.link}
                        className='flex gap-x-4'
                        onClick={handleLinkClick}>
                        <img
                          src={menu.active ? menu.activeSrc : menu.src}
                          className='w-5 h-5'
                        />
                        <span
                          className={`${!open && 'hidden'}
                                                origin-left duration-200
                                                ${
                                                  menu.active
                                                    ? 'font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2D014B] to-[#00CDB4] text-[14px]'
                                                    : 'text-gray-300 font-medium text-[14px]'
                                                }`}>
                          {menu.title}
                        </span>
                      </Link>
                      <div
                        className={`${!open && 'h-4 w-1'}
                                                h-6 w-1
                                                ${
                                                  menu.active
                                                    ? 'rounded-lg bg-gradient-to-b from-[#2D014B] to-[#00CDB4]'
                                                    : ' rounded-lg bg-white'
                                                }`}></div>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className='pb-10'
                // {`${open ? "mt-20" : 'mt-20'}`}
              >
                <button
                  onClick={() => {
                    localStorage.removeItem('token-hub');
                    navigate('/');
                  }}
                  className='w-full bg-outline hover:bg-outline-2 h-[44px] font-semibold text-base rounded-lg flex items-center gap-4 justify-center'>
                  <img
                    src={IconLogout}
                    className={`${open ? 'w-[22px] h-[20px]' : 'w-[16px] h-[14px'}`}
                  />
                  {`${open ? 'Sign Out' : ''}`}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='block lg:hidden'>
          <div className='w-20 h-screen pt-8 duration-300 bg-white bg-dark-purple'>
            <div className='flex items-center px-5 py-3 gap-x-4'>
              <img src={LogoDefault} />
            </div>
            <div className='flex flex-col p-5 space-y-20'>
              <div>
                <div className='h-1 mt-3 border-b-2'></div>
                <ul className='pt-6'>
                  {menus.map((menu, index) => (
                    <li
                      key={index}
                      className={`flex px-2 py-5 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center justify-between
                                            ${menu.gap ? 'mt-9' : 'mt-2'}
                                        `}>
                      <Link
                        to={menu.link}
                        className='flex gap-x-4'
                        onClick={handleLinkClick}>
                        <img src={menu.active ? menu.activeSrc : menu.src} />
                      </Link>
                      <div
                        className={`${!open && 'h-4 w-1'}
                                                h-6 w-1
                                                ${
                                                  menu.active
                                                    ? 'rounded-lg bg-gradient-to-b from-[#2D014B] to-[#00CDB4]'
                                                    : ' rounded-lg bg-white'
                                                }`}></div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className=''>
                <button
                  onClick={() => {
                    localStorage.removeItem('token-hub');
                    navigate('/');
                  }}
                  className='w-full bg-outline hover:bg-outline-2 h-[44px] font-semibold text-base rounded-lg flex items-center gap-4 justify-center'>
                  <img
                    src={IconLogout}
                    className='w-[16px] h-[14px'
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { DashboardGray, DashboardGra, LogoDefault } from '../../assets'
// import { IconMessage, IconNotification, IconProfile, Logo } from "../../assets";

// const Sidebar = ({ activeMenu, menus }) => {
//   const [open, setOpen] = useState(true);

//   return (
//     <div className="rounded-xl bg-outline">
//         <div
//           className={`${open ? "w-72 rounded-none" : "w-20 rounded-xl"}
//           bg-dark-purple h-[1012px] p-5  pt-8 relative duration-300 bg-white`}
//         >

//           <div className="flex items-center gap-x-4">
//             <img
//                src={open ? Logo : LogoDefault}
//               className={`cursor-pointer duration-500
//               ${open && "rotate-[360deg]"}`}
//               onClick={() => setOpen(!open)}
//             />

//           </div>
//           <div className='h-1 mt-3 border-b-2'></div>
//           <ul className="pt-6">
//             {menus.map((menu, index) => (
//                 <li
//                     key={index}
//                     className={
//                     `flex py-5 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center justify-between
//                     ${menu.gap ? "mt-9" : "mt-2"}
//                     ${!open && "gap-1 px-2"}
//                     ${activeMenu === index ? "bg-light-white" : ""} `}
//                 >
//                     <Link to={menu.link} className="flex gap-x-4">
//                     <img src={activeMenu === index ? menu.activeSrc : menu.src} />
//                     <span className={`${!open && "hidden"}
//                         origin-left duration-200
//                         ${activeMenu === index ? "font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2D014B] to-[#00CDB4] text-[14px]" : "text-gray-300 font-bold text-[14px]"}`}
//                     >
//                         {menu.title}
//                     </span>
//                     </Link>
//                     <div
//                     className={
//                         `${!open && "h-4 w-1"}
//                         h-6 w-1
//                         ${activeMenu === index ? "rounded-lg bg-gradient-to-b from-[#2D014B] to-[#00CDB4]" : " rounded-lg bg-white"}`}
//                     >
//                     </div>
//                 </li>
//             ))}

//           </ul>
//         </div>
//     </div>
//   );
// };

// export default Sidebar;
