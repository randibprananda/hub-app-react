import React, { useEffect, useState } from 'react'
import { FooterTwo, Navbar } from '../../../../component'
import { Brian, IconUploadImage, IconNext, Logo } from '../../../../assets'
import { BorderColor, PermMedia } from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Api from '../../../../Api';
import imageHandle from '../../../../utils/imageHandle';

function ProfileEventOrganizer() {
    const location = useLocation();
    const id = location.state.id
    const [users, setUsers] = useState('');
    const [user_details, setUserDetails] = useState('');
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');
    const [imageUpload, setImageUpload] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [postal_code, setPostalCode] = useState('');
    const [address, setAddress] = useState('');
    const [position, setPosition] = useState('');

    const handleChange = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
        setImageUpload(e.target.files[0])
    }

    const getFetchUser = async () => {
        try {
            const response = await Api.fetch(localStorage.getItem('token-hub'))
            console.log(response)
            setUsers(response.data)
            setUserDetails(response.data.users_detail)

            setFullname(response.data.fullname)
            setUsername(response.data.username)
            setEmail(response.data.email)
            setPhone(response.data.phone)
            setPassword(response.data.password)
            setImageUpload(response.data.image)
            setCity(response.data.users_detail.city)
            setProvince(response.data.users_detail.province)
            setPostalCode(response.data.users_detail.postal_code)
            setAddress(response.data.users_detail.address)
            setPosition(response.data.users_detail.position)

        } catch (error) {
            console.log(error)
        }
    }

    const updateUser = async() => {
        try {
            const datas = {
                fullname: fullname,
                username: username,
                email: email,
                phone: phone,
                password: password,
                image: imageUpload,
                city: city,
                province: province,
                postal_code: postal_code,
                address: address,
                position: position,
            }
            await Api.updateUser(localStorage.getItem('token-hub'), id, datas)
            navigate('/dashboard-event-organizer', {state: {id: id, role: users.role.name}})
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getFetchUser()
    }, [])

    const navigate = useNavigate();

    return (

        <div className='h-full bg-[#E3E8F1]'>
            <Navbar />
            <div className='md:px-[75px] px-[36px] pt-[120px] pb-[10px] md:pt-[140px] md:pb-[30px] mb-10'>
                <div className='flex flex-wrap items-center gap-3 mb-[30px]'>
                    <button onClick={() => navigate(-1)} className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>Beranda</button>
                    <img src={IconNext} />
                    <Link to={'/dashboard-sh'} className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>Profile</Link>
                    <img src={IconNext} />
                    <button className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>Edit Profile</button>
                </div>
                <div className='flex items-center mt-[30px]'>
                    <img src={!image ? imageHandle(imageUpload) : image} className="h-[170px] w-[170px] sm:h-[170px] rounded-[8px]" alt="Flowbite Logo" />
                    <div className='bg-[#2D014B] h-[130px] w-[1175px] rounded-r-[20px] m-30'>
                        <h1 className='text-white text-[32px] font-inter font-bold pl-[30px] pt-[28px]'>{users.fullname}</h1>
                        <p className='text-white text-[18px] font-inter pl-[30px]'>{users.email}</p>
                    </div>
                </div>
                <div className='mt-[50px]'>
                    <p className='tracking-wide underline font-inter text-[#2D014B] text-[16px] font-medium font-bold'>Informasi Personal</p>
                </div>
                <div className='mt-[30px]'>
                    <form className="w-full">
                        <div>
                            <label className="block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]" htmlFor="nama">
                                Foto Profile
                            </label>
                            <label for='upload-file' className='cursor-pointer'>
                                <div className='relative w-[150px] h-[150px] rounded-[10px] bg-white flex flex-col items-center justify-center bg-cover mb-[20px]' style={{ backgroundImage: `url(${image ? image : imageHandle(imageUpload)})` }}>
                                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.0368 30.7962H32.5924L25.8562 21.8147L20.4673 28.9999L16.4257 23.611L11.0368 30.7962ZM3.85156 37.9814V9.24055H13.1025L16.4257 5.64795H27.2035L30.5266 9.24055H39.7776V37.9814H3.85156Z" fill="#C0C6D4" />
                                    </svg>

                                    <div className='absolute bottom-0 right-0 -mr-3 -mb-3 shadow-md bg-white rounded-full p-3'>
                                        <svg width="24" height="24" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.0189 24.9815L22.5137 8.82326C23.1928 7.95191 23.4342 6.9445 23.2079 5.91875C23.0117 4.98625 22.4383 4.09961 21.5781 3.42699L19.4806 1.76072C17.6546 0.308466 15.3911 0.461335 14.0933 2.1276L12.6899 3.94827C12.5088 4.17605 12.5541 4.51236 12.7804 4.6958C12.7804 4.6958 16.3267 7.53916 16.4021 7.60031C16.6436 7.82961 16.8246 8.13535 16.8699 8.50223C16.9454 9.22072 16.4474 9.89334 15.7079 9.98506C15.3609 10.0309 15.0289 9.92391 14.7874 9.72518L11.0601 6.75953C10.879 6.62348 10.6074 6.65252 10.4565 6.83596L1.59841 18.3011C1.02498 19.0196 0.8288 19.9521 1.02498 20.854L2.15676 25.7611C2.21712 26.021 2.44347 26.2044 2.7151 26.2044L7.69494 26.1433C8.60036 26.128 9.44543 25.7153 10.0189 24.9815ZM16.9917 23.4533H25.1118C25.9041 23.4533 26.5484 24.106 26.5484 24.9086C26.5484 25.7127 25.9041 26.3639 25.1118 26.3639H16.9917C16.1994 26.3639 15.5551 25.7127 15.5551 24.9086C15.5551 24.106 16.1994 23.4533 16.9917 23.4533Z" fill="#130F26" />
                                        </svg>
                                    </div>
                                </div>
                                <input type='file' id='upload-file' onChange={handleChange} className='rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] hidden' required />
                            </label>
                        </div>
                        <div className="flex flex-wrap -mx-[55px]">
                            <div className="w-full md:w-1/2 px-[55px] mb-[10px] md:mb-[10px]">
                                <label className="block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]" htmlFor="nama">
                                    Nama User
                                </label>
                                <input class="appearance-none block w-full bg-[#F9FBFC] text-[#C0C6D4] border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white" id="nama" type="text" placeholder={fullname} onChange={(e) => setFullname(e.target.value)} />

                                <label className="block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]" htmlFor="grid-business-permit">
                                    Alamat
                                </label>
                                <textarea id="alamat" rows="4" class="block p-2.5 w-full mb-[20px] font-rubik font-normal text-[16px] text-[#C0C6D4] bg-[#F9FBFC] rounded-[12px] focus:outline-none focus:ring-white focus:border-white dark:bg-[#F9FBFC] dark:border-white dark:placeholder-gray-400 dark:text-[#C0C6D4] dark:focus:ring-white dark:focus:border-white" placeholder={address} onChange={(e) => setAddress(e.target.value)}></textarea>

                                <label className="block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]" htmlFor="kota">
                                    Kabupaten/Kota
                                </label>
                                <input class="appearance-none block w-full bg-[#F9FBFC] text-[#C0C6D4] border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white" id="kota" type="text" placeholder={city} onChange={(e) => setCity(e.target.value)} />

                                <label className="block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]" htmlFor="kota">
                                    Provinsi
                                </label>
                                <input class="appearance-none block w-full bg-[#F9FBFC] text-[#C0C6D4] border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white" id="kota" type="text" placeholder={province} onChange={(e) => setProvince(e.target.value)} />

                                <label className="block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]" htmlFor="kota">
                                    Kode Pos
                                </label>
                                <input class="appearance-none block w-full bg-[#F9FBFC] text-[#C0C6D4] border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white" id="kota" type="text" placeholder={postal_code} onChange={(e) => setPostalCode(e.target.value)} />
                            </div>
                            <div className="w-full md:w-1/2 px-[55px] mb-[10px] md:mb-[10px]">

                                <label className="block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]" htmlFor="telp">
                                    No. Telp
                                </label>
                                <input className="appearance-none block w-full bg-[#F9FBFC] text-[#C0C6D4] border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white" id="telp" type="number" placeholder={users.phone} onChange={(e) => setPhone(e.target.value)} />

                                <label className="block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]" htmlFor="email">
                                    Email Aktif
                                </label>
                                <input className="appearance-none block w-full bg-[#F9FBFC] text-[#C0C6D4] border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white" id="email" type="email" placeholder={users.email} onChange={(e) => setEmail(e.target.value)} />

                                <label className="block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]" htmlFor="password">
                                    Password
                                </label>
                                <input className="appearance-none block w-full bg-[#F9FBFC] text-[#C0C6D4] border rounded-[12px] py-3 px-4 mb-[5px] leading-tight focus:outline-none focus:bg-white" id="password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                <p className="mb-[10px] text-[#C0C6D4] text-[14px] font-normal font-rubik">Password ini akan digunakan untuk mengakses umkm portal exporthub.</p>
                                <div className='flex justify-end md:mt-48 mt-16'>
                                    <button onClick={updateUser} className="appearance-none block w-[135px] h-[46px] bg-[#00CDB4] hover:bg-[#2E3A66] text-[#F9FBFC] font-medium font-rubix text-[15px] py-3 px-4 mb-[5px] rounded-[8px]">Simpan</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <FooterTwo />
        </div>
    )
}

export default ProfileEventOrganizer