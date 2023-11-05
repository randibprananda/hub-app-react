import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../Api";
import { IconMessage, IconNotification, IconProfile, IconMessage2, IconNotification2, IconProfile2, Logo, Logo3 } from "../../assets";
import logo from "../../assets/images/Logo.png"
import imageHandle from "../../utils/imageHandle";

const Navbar = ({ LinkToDashboard, onFinish }) => {
  const token = window.localStorage.getItem("token-hub")
  const navigate = useNavigate()
  const [profile, setProfile] = useState(false)
  const [menu, setMenu] = useState(false)
  const [data, setData] = useState(false)
  const [role, setRole] = useState(false)

  const [msg, setMsg] = useState()

  const [kategori, setKategori] = useState("")
  const [keyword, setKeyword] = useState("")
  const [scroll, setScroll] = useState(false);

  const checkScroll = () => {
    setScroll(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScroll);

    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);

  const getUserRole = async () => {
    try {
      const response = await Api.getUserRole(localStorage.getItem('token-hub'))
      setData(response.data)
      setRole(response.data.role.name)
    } catch (error) {
      console.log(error)
      localStorage.removeItem('token-hub')
    }
  }

  useEffect(() => {
    getUserRole()
  }, [])

  const search = async () => {
    const err = [];
    // if (keyword == "") {
    //   err.push("Name");
    // }
    // // if (kategori == "") {
    // //   setKategori("Tampilkan Semua");
    // // }
    // if (err.length > 0) {
    //   setMsg(err);
    // } else {
    await Api.postSearch(kategori, keyword)
      .then(async (response) => {
        console.log(response.data)
        if (onFinish) { onFinish() }
        const params = (response.data)
        navigate('/search', {
          state: params,
        })
      })
    console.log("search", keyword, kategori);
    // }
  };

  const updateUser = (id) => {
    const params = { id: id };
    navigate("/profile", {
      state: params,
    });
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <nav className={`border-gray-200 px-[10px] py-2.5 shadow-lg ${scroll ? 'bg-cherry' : 'bg-white'}`}>
        <div className="flex items-center justify-between mx-auto">
          <Link to="/" className="flex items-center">
            <img src={scroll ? Logo3 : Logo} className="h-auto w-[143px] md:mx-[30px] mx-[15px]" alt="Konnect Logo" />
            {/* <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span> */}
          </Link>
          <div className="flex justify-end w-full mx-5 md:mx-10 md:justify-start md:order-1">
            <div className="relative hidden w-full md:block">
              {/* <form onSubmit={search}> */}
              <div className="flex">
                <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
                <select
                  id="search-dropdown"
                  className="apperace-none flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-start text-inter text-primary bg-[#EAFFFB] border border-l-[#E3E8F1] rounded-l-full hover:bg-[#EAFFFB] focus:ring-none focus:outline-none focus:ring-[#00CDB4] dark:bg-[#EAFFFB] dark:hover:bg-[#EAFFFB] dark:focus:ring-[#00CDB4] dark:text-[#00CDB4] dark:border-[#E3E8F1]"
                  onChange={(e) => setKategori(e.target.value)}>
                  <option selected value="">Tampilkan Semua</option>
                  <option value="EO">Event Organizer</option>
                  <option value="VENUE">Venue</option>
                  <option value="PRODUCT">Supplier</option>
                  <option value="TALENT">Talent</option>
                  <option value="ON DEMAND">On Demand</option>
                </select>
                <div className="relative w-full">
                  <input
                    type="search"
                    id="search-dropdown"
                    className="block p-2.5 w-full z-20 text-inter text-sm text-[#5A5A5A] bg-white rounded-r-full border-l-[#E3E8F1] border-l border border-[#E3E8F1] focus:border-[#E3E8F1] dark:bg-white dark:border-l-[#E3E8F1] focus:outline-none focus:ring-[#00CDB4]" placeholder="Cari yang anda butuhkan"
                    onChange={(e) => setKeyword(e.target.value)}
                    required
                  />
                  <button onClick={search} type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium text-[#C0C6D4] bg-white rounded-r-full border border-[#E3E8F1] hover:bg-white focus:ring-1 focus:outline-none focus:ring-[#E3E8F1] dark:bg-white dark:hover:bg-white dark:focus:ring-[#E3E8F1]">
                    <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <span className="sr-only">Search</span>
                  </button>
                </div>
              </div>
              {/* </form> */}
            </div>
            <button onClick={() => setMenu(!menu)} data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
              <span className="sr-only">Open menu</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
            </button>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-2" id="navbar-search">
            <div className="relative mt-3 md:hidden">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
              </div>
              <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
            </div>
            <ul className="flex flex-col items-center p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
              {token ?
                <>
                  <li>
                    <Link to="#" className="block py-2 pl-3 pr-4 text-[#00CDB4] rounded hover:text-[#00CDB4] md:p-0" aria-current="page">
                      {scroll ? (<div class="group rounded-full inline-flex">
                        <svg
                          class="w-6 h-6"
                          width="24"
                          height="24"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            class="group-hover:fill-current group-hover:text-primary transition-colors duration-200"
                            d="M24.1749 18.1125L22.9249 16.0375C22.6624 15.575 22.4249 14.7 22.4249 14.1875V11.025C22.4249 8.0875 20.6999 5.55 18.2124 4.3625C17.5624 3.2125 16.3624 2.5 14.9874 2.5C13.6249 2.5 12.3999 3.2375 11.7499 4.4C9.31243 5.6125 7.62493 8.125 7.62493 11.025V14.1875C7.62493 14.7 7.38743 15.575 7.12493 16.025L5.86243 18.1125C5.36243 18.95 5.24993 19.875 5.56243 20.725C5.86243 21.5625 6.57493 22.2125 7.49993 22.525C9.92493 23.35 12.4749 23.75 15.0249 23.75C17.5749 23.75 20.1249 23.35 22.5499 22.5375C23.4249 22.25 24.0999 21.5875 24.4249 20.725C24.7499 19.8625 24.6624 18.9125 24.1749 18.1125Z"
                            fill="#F9FBFC"
                          />
                          <path
                            class="group-hover:fill-current group-hover:text-primary transition-colors duration-200"
                            d="M18.5376 25.0125C18.0126 26.4625 16.6251 27.5 15.0001 27.5C14.0126 27.5 13.0376 27.1 12.3501 26.3875C11.9501 26.0125 11.6501 25.5125 11.4751 25C11.6376 25.025 11.8001 25.0375 11.9751 25.0625C12.2626 25.1 12.5626 25.1375 12.8626 25.1625C13.5751 25.225 14.3001 25.2625 15.0251 25.2625C15.7376 25.2625 16.4501 25.225 17.1501 25.1625C17.4126 25.1375 17.6751 25.125 17.9251 25.0875C18.1251 25.0625 18.3251 25.0375 18.5376 25.0125Z"
                            fill="#F9FBFC"
                          />
                        </svg>
                      </div>
                      ) : (<div class="group rounded-full inline-flex">
                        <svg
                          class="w-6 h-6"
                          width="24"
                          height="24"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            class="group-hover:fill-current group-hover:text-primary transition-colors duration-200"
                            d="M24.1749 18.1125L22.9249 16.0375C22.6624 15.575 22.4249 14.7 22.4249 14.1875V11.025C22.4249 8.0875 20.6999 5.55 18.2124 4.3625C17.5624 3.2125 16.3624 2.5 14.9874 2.5C13.6249 2.5 12.3999 3.2375 11.7499 4.4C9.31243 5.6125 7.62493 8.125 7.62493 11.025V14.1875C7.62493 14.7 7.38743 15.575 7.12493 16.025L5.86243 18.1125C5.36243 18.95 5.24993 19.875 5.56243 20.725C5.86243 21.5625 6.57493 22.2125 7.49993 22.525C9.92493 23.35 12.4749 23.75 15.0249 23.75C17.5749 23.75 20.1249 23.35 22.5499 22.5375C23.4249 22.25 24.0999 21.5875 24.4249 20.725C24.7499 19.8625 24.6624 18.9125 24.1749 18.1125Z"
                            fill="#2E3A44"
                          />
                          <path
                            class="group-hover:fill-current group-hover:text-primary transition-colors duration-200"
                            d="M18.5376 25.0125C18.0126 26.4625 16.6251 27.5 15.0001 27.5C14.0126 27.5 13.0376 27.1 12.3501 26.3875C11.9501 26.0125 11.6501 25.5125 11.4751 25C11.6376 25.025 11.8001 25.0375 11.9751 25.0625C12.2626 25.1 12.5626 25.1375 12.8626 25.1625C13.5751 25.225 14.3001 25.2625 15.0251 25.2625C15.7376 25.2625 16.4501 25.225 17.1501 25.1625C17.4126 25.1375 17.6751 25.125 17.9251 25.0875C18.1251 25.0625 18.3251 25.0375 18.5376 25.0125Z"
                            fill="#2E3A44"
                          />
                        </svg>
                      </div>
                      )}
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="block py-2 pl-3 pr-4 text-[#00CDB4] rounded hover:text-[#00CDB4] md:p-0">
                      {scroll ? (<div class="group rounded-full inline-flex">
                        <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path class="group-hover:fill-current group-hover:text-primary transition-colors duration-200" d="M21.25 2.5H8.75C5.3 2.5 2.5 5.2875 2.5 8.725V16.2V17.45C2.5 20.8875 5.3 23.675 8.75 23.675H10.625C10.9625 23.675 11.4125 23.9 11.625 24.175L13.5 26.6625C14.325 27.7625 15.675 27.7625 16.5 26.6625L18.375 24.175C18.6125 23.8625 18.9875 23.675 19.375 23.675H21.25C24.7 23.675 27.5 20.8875 27.5 17.45V8.725C27.5 5.2875 24.7 2.5 21.25 2.5ZM10 15C9.3 15 8.75 14.4375 8.75 13.75C8.75 13.0625 9.3125 12.5 10 12.5C10.6875 12.5 11.25 13.0625 11.25 13.75C11.25 14.4375 10.7 15 10 15ZM15 15C14.3 15 13.75 14.4375 13.75 13.75C13.75 13.0625 14.3125 12.5 15 12.5C15.6875 12.5 16.25 13.0625 16.25 13.75C16.25 14.4375 15.7 15 15 15ZM20 15C19.3 15 18.75 14.4375 18.75 13.75C18.75 13.0625 19.3125 12.5 20 12.5C20.6875 12.5 21.25 13.0625 21.25 13.75C21.25 14.4375 20.7 15 20 15Z" fill="#F9FBFC" />
                        </svg>
                      </div>
                      ) : (<div class="group rounded-full inline-flex">
                        <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path class="group-hover:fill-current group-hover:text-primary transition-colors duration-200" d="M21.25 2.5H8.75C5.3 2.5 2.5 5.2875 2.5 8.725V16.2V17.45C2.5 20.8875 5.3 23.675 8.75 23.675H10.625C10.9625 23.675 11.4125 23.9 11.625 24.175L13.5 26.6625C14.325 27.7625 15.675 27.7625 16.5 26.6625L18.375 24.175C18.6125 23.8625 18.9875 23.675 19.375 23.675H21.25C24.7 23.675 27.5 20.8875 27.5 17.45V8.725C27.5 5.2875 24.7 2.5 21.25 2.5ZM10 15C9.3 15 8.75 14.4375 8.75 13.75C8.75 13.0625 9.3125 12.5 10 12.5C10.6875 12.5 11.25 13.0625 11.25 13.75C11.25 14.4375 10.7 15 10 15ZM15 15C14.3 15 13.75 14.4375 13.75 13.75C13.75 13.0625 14.3125 12.5 15 12.5C15.6875 12.5 16.25 13.0625 16.25 13.75C16.25 14.4375 15.7 15 15 15ZM20 15C19.3 15 18.75 14.4375 18.75 13.75C18.75 13.0625 19.3125 12.5 20 12.5C20.6875 12.5 21.25 13.0625 21.25 13.75C21.25 14.4375 20.7 15 20 15Z" fill="#2E3A44" />
                        </svg>
                      </div>
                      )}
                    </Link>
                  </li>
                  <li>
                    <button onClick={() => setProfile(!profile)} className="block py-2 pl-3 pr-4 text-[#00CDB4] rounded hover:text-[#00CDB4] md:p-0">
                      {scroll ? (<div class="group rounded-full inline-flex">
                        <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path class="group-hover:fill-current group-hover:text-primary transition-colors duration-200" d="M27.5 15C27.5 8.1125 21.8875 2.5 15 2.5C8.1125 2.5 2.5 8.1125 2.5 15C2.5 18.625 4.0625 21.8875 6.5375 24.175C6.5375 24.1875 6.5375 24.1875 6.525 24.2C6.65 24.325 6.8 24.425 6.925 24.5375C7 24.6 7.0625 24.6625 7.1375 24.7125C7.3625 24.9 7.6125 25.075 7.85 25.25C7.9375 25.3125 8.0125 25.3625 8.1 25.425C8.3375 25.5875 8.5875 25.7375 8.85 25.875C8.9375 25.925 9.0375 25.9875 9.125 26.0375C9.375 26.175 9.6375 26.3 9.9125 26.4125C10.0125 26.4625 10.1125 26.5125 10.2125 26.55C10.4875 26.6625 10.7625 26.7625 11.0375 26.85C11.1375 26.8875 11.2375 26.925 11.3375 26.95C11.6375 27.0375 11.9375 27.1125 12.2375 27.1875C12.325 27.2125 12.4125 27.2375 12.5125 27.25C12.8625 27.325 13.2125 27.375 13.575 27.4125C13.625 27.4125 13.675 27.425 13.725 27.4375C14.15 27.475 14.575 27.5 15 27.5C15.425 27.5 15.85 27.475 16.2625 27.4375C16.3125 27.4375 16.3625 27.425 16.4125 27.4125C16.775 27.375 17.125 27.325 17.475 27.25C17.5625 27.2375 17.65 27.2 17.75 27.1875C18.05 27.1125 18.3625 27.05 18.65 26.95C18.75 26.9125 18.85 26.875 18.95 26.85C19.225 26.75 19.5125 26.6625 19.775 26.55C19.875 26.5125 19.975 26.4625 20.075 26.4125C20.3375 26.3 20.6 26.175 20.8625 26.0375C20.9625 25.9875 21.05 25.925 21.1375 25.875C21.3875 25.725 21.6375 25.5875 21.8875 25.425C21.975 25.375 22.05 25.3125 22.1375 25.25C22.3875 25.075 22.625 24.9 22.85 24.7125C22.925 24.65 22.9875 24.5875 23.0625 24.5375C23.2 24.425 23.3375 24.3125 23.4625 24.2C23.4625 24.1875 23.4625 24.1875 23.45 24.175C25.9375 21.8875 27.5 18.625 27.5 15ZM21.175 21.2125C17.7875 18.9375 12.2375 18.9375 8.825 21.2125C8.275 21.575 7.825 22 7.45 22.4625C5.55 20.5375 4.375 17.9 4.375 15C4.375 9.1375 9.1375 4.375 15 4.375C20.8625 4.375 25.625 9.1375 25.625 15C25.625 17.9 24.45 20.5375 22.55 22.4625C22.1875 22 21.725 21.575 21.175 21.2125Z" fill="#F9FBFC" />
                          <path class="group-hover:fill-current group-hover:text-primary transition-colors duration-200" d="M15 8.66211C12.4125 8.66211 10.3125 10.7621 10.3125 13.3496C10.3125 15.8871 12.3 17.9496 14.9375 18.0246C14.975 18.0246 15.025 18.0246 15.05 18.0246C15.075 18.0246 15.1125 18.0246 15.1375 18.0246C15.15 18.0246 15.1625 18.0246 15.1625 18.0246C17.6875 17.9371 19.675 15.8871 19.6875 13.3496C19.6875 10.7621 17.5875 8.66211 15 8.66211Z" fill="#F9FBFC" />
                        </svg>

                      </div>
                      ) : (<div class="group rounded-full inline-flex">
                         <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path class="group-hover:fill-current group-hover:text-primary transition-colors duration-200" d="M27.5 15C27.5 8.1125 21.8875 2.5 15 2.5C8.1125 2.5 2.5 8.1125 2.5 15C2.5 18.625 4.0625 21.8875 6.5375 24.175C6.5375 24.1875 6.5375 24.1875 6.525 24.2C6.65 24.325 6.8 24.425 6.925 24.5375C7 24.6 7.0625 24.6625 7.1375 24.7125C7.3625 24.9 7.6125 25.075 7.85 25.25C7.9375 25.3125 8.0125 25.3625 8.1 25.425C8.3375 25.5875 8.5875 25.7375 8.85 25.875C8.9375 25.925 9.0375 25.9875 9.125 26.0375C9.375 26.175 9.6375 26.3 9.9125 26.4125C10.0125 26.4625 10.1125 26.5125 10.2125 26.55C10.4875 26.6625 10.7625 26.7625 11.0375 26.85C11.1375 26.8875 11.2375 26.925 11.3375 26.95C11.6375 27.0375 11.9375 27.1125 12.2375 27.1875C12.325 27.2125 12.4125 27.2375 12.5125 27.25C12.8625 27.325 13.2125 27.375 13.575 27.4125C13.625 27.4125 13.675 27.425 13.725 27.4375C14.15 27.475 14.575 27.5 15 27.5C15.425 27.5 15.85 27.475 16.2625 27.4375C16.3125 27.4375 16.3625 27.425 16.4125 27.4125C16.775 27.375 17.125 27.325 17.475 27.25C17.5625 27.2375 17.65 27.2 17.75 27.1875C18.05 27.1125 18.3625 27.05 18.65 26.95C18.75 26.9125 18.85 26.875 18.95 26.85C19.225 26.75 19.5125 26.6625 19.775 26.55C19.875 26.5125 19.975 26.4625 20.075 26.4125C20.3375 26.3 20.6 26.175 20.8625 26.0375C20.9625 25.9875 21.05 25.925 21.1375 25.875C21.3875 25.725 21.6375 25.5875 21.8875 25.425C21.975 25.375 22.05 25.3125 22.1375 25.25C22.3875 25.075 22.625 24.9 22.85 24.7125C22.925 24.65 22.9875 24.5875 23.0625 24.5375C23.2 24.425 23.3375 24.3125 23.4625 24.2C23.4625 24.1875 23.4625 24.1875 23.45 24.175C25.9375 21.8875 27.5 18.625 27.5 15ZM21.175 21.2125C17.7875 18.9375 12.2375 18.9375 8.825 21.2125C8.275 21.575 7.825 22 7.45 22.4625C5.55 20.5375 4.375 17.9 4.375 15C4.375 9.1375 9.1375 4.375 15 4.375C20.8625 4.375 25.625 9.1375 25.625 15C25.625 17.9 24.45 20.5375 22.55 22.4625C22.1875 22 21.725 21.575 21.175 21.2125Z" fill="#2E3A44" />
                          <path class="group-hover:fill-current group-hover:text-primary transition-colors duration-200" d="M15 8.66211C12.4125 8.66211 10.3125 10.7621 10.3125 13.3496C10.3125 15.8871 12.3 17.9496 14.9375 18.0246C14.975 18.0246 15.025 18.0246 15.05 18.0246C15.075 18.0246 15.1125 18.0246 15.1375 18.0246C15.15 18.0246 15.1625 18.0246 15.1625 18.0246C17.6875 17.9371 19.675 15.8871 19.6875 13.3496C19.6875 10.7621 17.5875 8.66211 15 8.66211Z" fill="#2E3A44" />
                        </svg>

                      </div>
                      )}
                    </button>
                    <div className={`relative ${profile ? "" : "hidden"}`}>
                      <div className="absolute p-5 bg-white rounded-lg shadow top-0 right-0 z-50 w-[281px]">
                        <div className='grid items-center grid-cols-4'>
                          <img src={!data.image ? Logo : imageHandle(data.image)} className="w-[50px] h-[50px] rounded-full border object-cover" alt="Konnect Logo" />
                          <div className="col-span-3">
                            <p className='text-xs font-semibold'>{!data.fullname ? 'Konect-Hub' : data.fullname}</p>
                            <p className='text-[10px] text-dark-5'>{!role ? '' : role}</p>
                          </div>
                        </div>
                        <div className="py-4 my-4 border-y border-dark-8">
                          <Link
                            to={
                              role === 'Partner' ?
                                '/dashboard-partner'
                                :
                                role === 'Event Hunter' ?
                                  '/dashboard-eh'
                                  :
                                  role === 'Stakeholder' ?
                                    '/dashboard-stakeholder'
                                    :
                                    role === 'Event Organizer' ?
                                      '/dashboard-event-organizer'
                                      :
                                      role === 'Venue' ?
                                        '/dashboard-venue'
                                        :
                                        role === 'Supplier' ?
                                          '/dashboard-supplier'
                                          :
                                          role === 'Talent' ?
                                            '/dashboard-talent'
                                            :
                                            role === 'Admin' ?
                                              '/admin'
                                              :
                                              ''
                            }
                            className="grid grid-cols-6 items-center hover:bg-dark-8 py-2 px-1.5 rounded-md"
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="7.27273" height="7.27273" rx="2" fill="#003049" />
                              <rect y="8.72742" width="7.27273" height="7.27273" rx="2" fill="#003049" />
                              <rect x="8.72656" width="7.27273" height="7.27273" rx="2" fill="#003049" />
                              <rect x="8.72656" y="8.72742" width="7.27273" height="7.27273" rx="2" fill="#9091A0" />
                            </svg>
                            <p className="col-span-5 text-sm font-medium text-dark-3">Dashboard Profile</p>
                          </Link>
                          <button onClick={() => updateUser(data.id)} className="grid grid-cols-6 items-center hover:bg-dark-8 py-2 px-1.5 rounded-md w-full">
                            <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5.99775 10.3811C2.763 10.3811 0 10.8911 0 12.9311C0 14.9719 2.74575 15.4999 5.99775 15.4999C9.2325 15.4999 11.9955 14.9906 11.9955 12.9499C11.9955 10.9091 9.2505 10.3811 5.99775 10.3811" fill="#003049" />
                              <path opacity="0.4" d="M5.9983 8.43788C8.2018 8.43788 9.9673 6.67163 9.9673 4.46888C9.9673 2.26613 8.2018 0.499878 5.9983 0.499878C3.79555 0.499878 2.0293 2.26613 2.0293 4.46888C2.0293 6.67163 3.79555 8.43788 5.9983 8.43788" fill="#130F26" />
                            </svg>
                            <p className="col-span-5 text-sm font-medium text-start text-dark-3">Profile Pengguna</p>
                          </button>
                        </div>
                        <div>
                          <button
                            onClick={() => {
                              localStorage.removeItem('token-hub')
                              navigate('/')
                            }}
                            className='flex justify-center items-center gap-2.5 text-white text-xs font-semibold p-3 bg-cherry rounded-lg hover:bg-cherry/75 hover:text-white w-full'>
                            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd" d="M0.666016 6.00008C0.666016 2.77842 3.27769 0.166748 6.49935 0.166748C9.72101 0.166748 12.3327 2.77842 12.3327 6.00008C12.3327 9.22174 9.72101 11.8334 6.49935 11.8334C3.27769 11.8334 0.666016 9.22174 0.666016 6.00008ZM6.49935 2.16675C6.77549 2.16675 6.99935 2.39061 6.99935 2.66675V6.00008C6.99935 6.27622 6.77549 6.50008 6.49935 6.50008C6.22321 6.50008 5.99935 6.27622 5.99935 6.00008V2.66675C5.99935 2.39061 6.22321 2.16675 6.49935 2.16675ZM5.16602 3.38823C5.16602 3.2664 5.03974 3.18648 4.93389 3.2468C3.97752 3.79174 3.33268 4.8206 3.33268 6.00008C3.33268 7.74898 4.75045 9.16675 6.49935 9.16675C8.24825 9.16675 9.66602 7.74898 9.66602 6.00008C9.66602 4.8206 9.02118 3.79174 8.06481 3.2468C7.95896 3.18648 7.83268 3.2664 7.83268 3.38823V4.21088C7.83268 4.26216 7.85656 4.31029 7.89575 4.34337C8.36681 4.74081 8.66602 5.33551 8.66602 6.00008C8.66602 7.1967 7.69597 8.16675 6.49935 8.16675C5.30273 8.16675 4.33268 7.1967 4.33268 6.00008C4.33268 5.33551 4.63189 4.74081 5.10294 4.34337C5.14214 4.31029 5.16602 4.26216 5.16602 4.21088V3.38823Z" fill="white" />
                            </svg>
                            <span>Logout</span></button>
                        </div>
                      </div>
                    </div>
                  </li>
                </> :
                <>
                  <li className="flex gap-1">
                    <Link
                      to={"/login"}
                      className={`self-end justify-self-end me-auto px-6 py-1.5 font-semibold text-xs text-primary w-fit ${scroll ? 'hover:text-white' : 'hover:text-cherry'}`}
                    >
                      Masuk
                    </Link>
                    <Link to={"/register-role"} className='bg-primary self-end justify-self-end me-auto px-6 py-1.5 font-semibold text-xs text-white rounded-xl w-fit border border-primary hover:bg-[#018C7B]'>
                      Daftar
                    </Link>
                  </li>
                </>
              }
            </ul>
          </div>
        </div>
      </nav>
      {menu ?
        <div className="md:hidden mx-[25px] bg-white rounded-[40px] px-[40px] sm:px-[10px] py-5 space-y-5">
          <div className="flex flex-col gap-5">
            <select
              id="search-dropdown"
              className="apperace-none flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-start text-inter text-[#00CDB4] bg-gray-100 border border-[#E3E8F1] rounded-full hover:bg-[#EAFFFB] focus:ring-none focus:outline-none focus:ring-[#00CDB4] dark:bg-[#EAFFFB] dark:hover:bg-[#EAFFFB] dark:focus:ring-[#00CDB4] dark:text-[#00CDB4] dark:border-[#E3E8F1]"
              onChange={(e) => setKategori(e.target.value)}>
              <option selected value="">Tampilkan Semua</option>
              <option value="Event Organizer">Event Organizer</option>
              <option value="Venue">Venue</option>
              <option value="Supplier">Supplier</option>
              <option value="On Demand">On Demand</option>
            </select>
            <div className="relative w-full">
              <input onChange={(e) => setKeyword(e.target.value)} type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-inter text-sm text-[#5A5A5A] bg-white rounded-full border-l-[#E3E8F1] border-l-2 border border-[#E3E8F1] focus:border-[#E3E8F1] dark:bg-white dark:border-l-[#E3E8F1] focus:outline-none focus:ring-[#00CDB4]" placeholder="Cari yang anda butuhkan" required />
              <button onClick={search} className="absolute top-0 right-0 p-2.5 text-sm font-medium text-[#C0C6D4] bg-white rounded-r-full border border-[#E3E8F1] hover:bg-white focus:ring-1 focus:outline-none focus:ring-[#E3E8F1] dark:bg-white dark:hover:bg-white dark:focus:ring-[#E3E8F1]">
                <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
          <div>
            {token ?
              <div className="">
                <div className='grid items-center grid-cols-4'>
                  <div className="relative w-[50px] h-[50px] overflow-hidden bg-gray-100 rounded-full">
                    <img src={!data.image ? Logo : imageHandle(data.image)} className="w-[50px] h-[50px] rounded-full border object-cover" alt="Konnect Logo" />
                  </div>
                  <div className="col-span-3">
                    <p className='text-xs font-semibold'>{!data.fullname ? 'Konect-Hub' : data.fullname}</p>
                    <p className='text-[10px] text-dark-5'>{!role ? '' : role}</p>
                  </div>
                </div>
                <div className="py-4 my-4 border-y border-dark-8">
                  <Link
                    to={
                      role === 'Partner' ?
                        '/dashboard-partner'
                        :
                        role === 'Event Hunter' ?
                          '/dashboard-eh'
                          :
                          role === 'Stakeholder' ?
                            '/dashboard-stakeholder'
                            :
                            role === 'Event Organizer' ?
                              '/dashboard-event-organizer'
                              :
                              role === 'Venue' ?
                                '/dashboard-venue'
                                :
                                role === 'Supplier' ?
                                  '/dashboard-supplier'
                                  :
                                  role === 'Talent' ?
                                    '/dashboard-talent'
                                    :
                                    ''
                    }
                    className="grid grid-cols-6 items-center hover:bg-dark-8 py-2 px-1.5 rounded-md w-full">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="7.27273" height="7.27273" rx="2" fill="#003049" />
                      <rect y="8.72742" width="7.27273" height="7.27273" rx="2" fill="#003049" />
                      <rect x="8.72656" width="7.27273" height="7.27273" rx="2" fill="#003049" />
                      <rect x="8.72656" y="8.72742" width="7.27273" height="7.27273" rx="2" fill="#9091A0" />
                    </svg>
                    <p className="col-span-5 text-sm font-medium text-dark-3">Dashboard Profile</p>
                  </Link>
                  <button onClick={() => updateUser(data.id)} className="grid grid-cols-6 items-center hover:bg-dark-8 py-2 px-1.5 rounded-md w-full">
                    <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.99775 10.3811C2.763 10.3811 0 10.8911 0 12.9311C0 14.9719 2.74575 15.4999 5.99775 15.4999C9.2325 15.4999 11.9955 14.9906 11.9955 12.9499C11.9955 10.9091 9.2505 10.3811 5.99775 10.3811" fill="#003049" />
                      <path opacity="0.4" d="M5.9983 8.43788C8.2018 8.43788 9.9673 6.67163 9.9673 4.46888C9.9673 2.26613 8.2018 0.499878 5.9983 0.499878C3.79555 0.499878 2.0293 2.26613 2.0293 4.46888C2.0293 6.67163 3.79555 8.43788 5.9983 8.43788" fill="#130F26" />
                    </svg>
                    <p className="col-span-5 text-sm font-medium text-dark-3 text-start">Profile Pengguna</p>
                  </button>
                </div>
                <div className="flex py-1 py-4 my-4 border-y border-dark-8">
                  <Link to="#" className="block py-2 pl-3 pr-4 text-[#00CDB4] rounded " aria-current="page">
                    <img src={IconNotification} className='w-5' alt='' />
                  </Link>
                  <Link to="#" className="block py-2 pl-3 pr-4 text-[#00CDB4] rounded ">
                    <img src={IconMessage} className='w-5' alt='' />
                  </Link>
                </div>
                <div>
                  <button className='flex justify-center items-center gap-2.5 text-white text-xs font-semibold p-3 bg-cherry rounded-lg hover:bg-cherry/75 hover:text-white w-full'>
                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M0.666016 6.00008C0.666016 2.77842 3.27769 0.166748 6.49935 0.166748C9.72101 0.166748 12.3327 2.77842 12.3327 6.00008C12.3327 9.22174 9.72101 11.8334 6.49935 11.8334C3.27769 11.8334 0.666016 9.22174 0.666016 6.00008ZM6.49935 2.16675C6.77549 2.16675 6.99935 2.39061 6.99935 2.66675V6.00008C6.99935 6.27622 6.77549 6.50008 6.49935 6.50008C6.22321 6.50008 5.99935 6.27622 5.99935 6.00008V2.66675C5.99935 2.39061 6.22321 2.16675 6.49935 2.16675ZM5.16602 3.38823C5.16602 3.2664 5.03974 3.18648 4.93389 3.2468C3.97752 3.79174 3.33268 4.8206 3.33268 6.00008C3.33268 7.74898 4.75045 9.16675 6.49935 9.16675C8.24825 9.16675 9.66602 7.74898 9.66602 6.00008C9.66602 4.8206 9.02118 3.79174 8.06481 3.2468C7.95896 3.18648 7.83268 3.2664 7.83268 3.38823V4.21088C7.83268 4.26216 7.85656 4.31029 7.89575 4.34337C8.36681 4.74081 8.66602 5.33551 8.66602 6.00008C8.66602 7.1967 7.69597 8.16675 6.49935 8.16675C5.30273 8.16675 4.33268 7.1967 4.33268 6.00008C4.33268 5.33551 4.63189 4.74081 5.10294 4.34337C5.14214 4.31029 5.16602 4.26216 5.16602 4.21088V3.38823Z" fill="white" />
                    </svg>
                    <span>Logout</span></button>
                </div>
              </div>
              : <div className="grid grid-cols-2 gap-3">

                <Link to={"/login"} className='w-full py-1.5 font-semibold text-xs text-center text-primary rounded-[4px] border border-primary hover:bg-primary hover:text-white'>
                  Masuk
                </Link>

                <Link to={"/register-role"} className='bg-primary w-full py-1.5 font-semibold text-xs text-center text-white rounded-[4px] border border-primary hover:bg-white hover:text-primary'>
                  Daftar
                </Link>
              </div>
            }
          </div>
        </div>
        : null
      }
    </div>
  )
}

export default Navbar
