import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Api from '../../../Api'
import { BackgroundAuth, IconEmail, IconEye, IconEyeSlash, IconFacebook, IconGoogle, IconPassword, IconUsername, IconCompany, IconKota, IconAlamat, IconTelepon, } from '../../../assets'
import { NavbarAuth } from '../../../component'
import { auth } from '../../../utils'

const Register = () => {
    const params = useLocation()
    const navigate = useNavigate()
    const googleProvider = new GoogleAuthProvider()
    const fbProvider = new FacebookAuthProvider()
    const [fullname, setFullname] = useState(params?.state?.fullname)
    const [image, setImage] = useState(params?.state?.image)
    const [email, setEmail] = useState(params?.state?.email)
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [phone, setPhone] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const [typePassword, setTypePassword] = useState('password')
    const [checked, setChecked] = useState(false)

    const changeType = () => {
        if(typePassword === 'password') {
            setTypePassword('text')
        }else {
            setTypePassword('password')
        }
    }

    const postRegister = async() => {
        setIsLoading(true)
        const error = [];

        if (params?.state?.roleName === 'Partner'){
            if (!fullname) {
                error.push("Nama harus diisi");
            }
            if (!username) {
                error.push("Username harus diisi");
            }
            if (!password) {
                error.push("Password harus diisi");
            } else if(password.length < 8){
                error.push("Password harus terdiri dari minimal 8 karakter");
            }
            if (!email) {
                error.push("Email harus diisi");
            } else if (!isValidEmail(email)) {
                error.push("Format email tidak valid");
            }
            if (!city) {
                error.push("City harus diisi");
            }
            if (!address) {
                error.push("Address harus diisi");
            }
            if (!phone) {
                error.push("Phone harus diisi");
            } else if (isNaN(phone)) {
                error.push("Phone harus berupa angka");
            }
            if (!companyName) {
                error.push("Company Name harus diisi");
            }

        }else {
            if (!fullname) {
                error.push("Nama harus diisi");
            }
            if (!password) {
                error.push("Password harus diisi");
            } else if(password.length < 8){
                error.push("Password harus terdiri dari minimal 8 karakter");
            }
            if (!email) {
                error.push("Email harus diisi");
            } else if (!isValidEmail(email)) {
                error.push("Format email tidak valid");
            }
            if (!username) {
                error.push("username harus diisi");
            }

        }
        if (error.length > 0) {
            error.forEach((error) => {
                toast.error(error, {
                    position: "top-center",
                    autoClose: 8000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            });
            setIsLoading(false);

        }else{
            try {
                const datas = {
                    fullname: fullname,
                    username: username,
                    name: companyName,
                    city: city,
                    address: address,
                    phone: phone,
                    image: image,
                    email: email,
                    password: password,
                    roleId: params?.state?.roleId
                }
                const response = await Api.Register(datas)
                navigate('/register-auth', {state: {id: response.data.response.id, username: username, email: email} } )
                setIsLoading(false)
            } catch (error) {
                if(error.response.data.msg === 'Email already exist') {
                    toast.error('Email telah digunakan, silahkan coba menggunakan email lainnya !!!', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else {
                    toast.error('Username telah digunakan, silahkan coba menggunakan username lainnya !!!', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
    
                }
            }

        }
    }

    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    useEffect(() => {
        if(localStorage.getItem('token-hub')) {
            navigate('/')
        }
    })

    const GoogleLogin = async() => {
        const resLoginWithGoogle = await signInWithPopup(auth, googleProvider)
        setImage(resLoginWithGoogle.user.photoURL)
        setFullname(resLoginWithGoogle.user.displayName)
        setEmail(resLoginWithGoogle.user.email)
    }

    const FacebookLogin = async() => {
        const resLoginFacebook  = await signInWithPopup(auth, fbProvider)
        setImage(resLoginFacebook.user.photoURL)
        setFullname(resLoginFacebook.user.displayName)
        setEmail(resLoginFacebook.user.email)
    }

    useEffect(() => {
        if(!params.state) {
            navigate('/register-role')
        }
    }, [])

    return (
        <div style={{ backgroundImage: `url(${BackgroundAuth})` }} className='min-h-screen bg-repeat-y bg-cover'>
            <NavbarAuth onClickBack={()=>navigate(-1)} navigateBack/>
            <div className='flex lg:px-0 px-5 justify-center items-center'>
                <div className='px-5 lg:px-[100px] py-[23px] lg:py-[40px] lg:w-[724px] mb-10' style={{ background: `linear-gradient(141.39deg, rgba(255, 255, 255, 0.66) 8.32%, rgba(255, 255, 255, 0.69) 89.97%)`, boxShadow: `0px 4px 24px -1px rgba(0, 0, 0, 0.2);`, backdropFilter: `blur(10px)`, borderRadius: 12 }}>
                    <div className='mb-3 lg:mb-9'>
                        <h1 className='text-base lg:text-[28px] text-[#2D014B] font-bold text-center mb-2'>Buat Akun Konect</h1>
                    </div>
                    {params?.state?.roleName === 'Partner' ? 
                        <div className='mb-4'>
                            <div className='relative mb-5'>
                                <div className='absolute left-[10px] lg:left-[33px] top-4'>
                                    <img src={IconUsername} alt='icon'/>
                                </div>
                                <input type='text' className='bg-white h-14 w-full px-10 lg:px-20 rounded-xl text-fill' placeholder='Fullname' value={fullname} onChange={ (value) => setFullname(value.target.value) } />
                            </div>
                            <div className='relative mb-5'>
                                <div className='absolute left-[10px] lg:left-[33px] top-4'>
                                    <img src={IconUsername} alt='icon'/>
                                </div>
                                <input type='text' className='bg-white h-14 w-full px-10 lg:px-20 rounded-xl text-fill' placeholder='Username' value={username} onChange={ (value) => setUsername(value.target.value) } />
                            </div>
                            <div className='relative mb-5'>
                                <div className='absolute left-[10px] lg:left-[33px] top-4'>
                                    <img src={IconCompany} alt='icon'/>
                                </div>
                                <input type='text' className='bg-white h-14 w-full px-10 lg:px-20 rounded-xl text-fill' placeholder='Nama Perusahaan' value={companyName} onChange={ (value) => setCompanyName(value.target.value) } />
                            </div>
                            <div className='relative mb-5'>
                                <div className='absolute left-[10px] lg:left-[33px] top-4'>
                                    <img src={IconAlamat} alt='icon'/>
                                </div>
                                <input type='text' className='bg-white h-14 w-full px-10 lg:px-20 rounded-xl text-fill' placeholder='Alamat' value={address} onChange={ (value) => setAddress(value.target.value) } />
                            </div>
                            <div className='relative mb-5'>
                                <div className='absolute left-[10px] lg:left-[33px] top-4'>
                                    <img src={IconKota} alt='icon'/>
                                </div>
                                <input type='text' className='bg-white h-14 w-full px-10 lg:px-20 rounded-xl text-fill' placeholder='Kota' value={city} onChange={ (value) => setCity(value.target.value) } />
                            </div>
                            <div className='relative mb-5'>
                                <div className='absolute left-[10px] lg:left-[33px] top-4'>
                                    <img src={IconTelepon} alt='icon'/>
                                </div>
                                <input type='text' className='bg-white h-14 w-full px-10 lg:px-20 rounded-xl text-fill' placeholder='No. Telp' value={phone} onChange={ (value) => setPhone(value.target.value) } />
                            </div>
                            <div className='relative mb-5'>
                                <div className='absolute left-[10px] lg:left-[33px] top-4'>
                                    <img src={IconEmail} alt='icon'/>
                                </div>
                                <input type='email' className='bg-white h-14 w-full px-10 lg:px-20 rounded-xl text-fill' placeholder='Email Aktif' value={email} onChange={ (value) => setEmail(value.target.value) } />
                            </div>
                            <div className='relative'>
                                <div className='absolute left-[10px] lg:left-[33px] top-4'>
                                    <img src={IconPassword} alt='icon'/>
                                </div>
                                <input type={typePassword} className='bg-white h-14 w-full px-10 lg:px-20 rounded-xl text-fill' placeholder='Password' value={password} onChange={ (value) => setPassword(value.target.value) } />
                                <button className='absolute right-[10px] lg:right-[33px] top-3' onClick={changeType}>
                                    <img src={typePassword === 'password' ? IconEyeSlash : IconEye} alt='icon'/>
                                </button>
                            </div>
                        </div>
                    :
                        <div className='mb-4'>
                            <div className='relative mb-5'>
                                <div className='absolute left-[10px] lg:left-[33px] top-4'>
                                    <img src={IconUsername} alt='icon'/>
                                </div>
                                <input type='text' className='bg-white h-14 w-full px-10 lg:px-20 rounded-xl text-fill' placeholder='Fullname' value={fullname} onChange={ (value) => setFullname(value.target.value) } />
                            </div>

                            <div className='relative mb-5'>
                                <div className='absolute left-[10px] lg:left-[33px] top-4'>
                                    <img src={IconUsername} alt='icon'/>
                                </div>
                                <input type='text' className='bg-white h-14 w-full px-10 lg:px-20 rounded-xl text-fill' placeholder='Username' value={username} onChange={ (value) => setUsername(value.target.value) } />
                            </div>

                            <div className='relative mb-5'>
                                <div className='absolute left-[10px] lg:left-[33px] top-4'>
                                    <img src={IconEmail} alt='icon'/>
                                </div>
                                <input type='email' className='bg-white h-14 w-full px-10 lg:px-20 rounded-xl text-fill' placeholder='Email' value={email} onChange={ (value) => setEmail(value.target.value) } />
                            </div>

                            <div className='relative'>
                                <div className='absolute left-[10px] lg:left-[33px] top-4'>
                                    <img src={IconPassword} alt='icon'/>
                                </div>
                                <input type={typePassword} className='bg-white h-14 w-full px-10 lg:px-20 rounded-xl text-fill' placeholder='Password' value={password} onChange={ (value) => setPassword(value.target.value) } />
                                <button className='absolute right-[10px] lg:right-[33px] top-3' onClick={changeType}>
                                    <img src={typePassword === 'password' ? IconEyeSlash : IconEye} alt='icon'/>
                                </button>
                            </div>
                        </div>
                    }
                    <div className='mb-7'>
                        <div className='flex items-center gap-2'>
                            <input type='checkbox' value={checked} onChange={(e) => setChecked(e.target.checked)}/>
                            <h1 className='text-[#2E3A44] text-xxs lg:text-sm font-thin'>Saya setuju dengan <span className='font-bold underline underline-offset-2'>Syarat Ketentuan</span> yang berlaku</h1>
                        </div>
                    </div>
                    <div className='mb-7'>
                        <button className={`${ checked ? 'bg-cherry' : 'bg-dark-5'} text-white font-bold py-2.5 lg:py-4 w-full text-center flex items-center justify-center rounded-xl`} onClick={postRegister} disabled={ checked ? false : true }>
                            {isLoading ?
                                <svg className='animate-spin text-center' width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                    <path opacity='0.1' fillRule='evenodd' clipRule='evenodd' d='M15 5.625C12.5136 5.625 10.129 6.61272 8.37087 8.37087C6.61272 10.129 5.625 12.5136 5.625 15C5.625 17.4864 6.61272 19.871 8.37087 21.6291C10.129 23.3873 12.5136 24.375 15 24.375C17.4864 24.375 19.871 23.3873 21.6291 21.6291C23.3873 19.871 24.375 17.4864 24.375 15C24.375 12.5136 23.3873 10.129 21.6291 8.37087C19.871 6.61272 17.4864 5.625 15 5.625ZM1.875 15C1.875 7.75125 7.75125 1.875 15 1.875C22.2487 1.875 28.125 7.75125 28.125 15C28.125 22.2487 22.2487 28.125 15 28.125C7.75125 28.125 1.875 22.2487 1.875 15Z' fill='black'/>
                                    <path fillRule='evenodd' clipRule='evenodd' d='M15.0001 5.62502C12.583 5.61958 10.2583 6.55314 8.51632 8.22877C8.15542 8.56246 7.67791 8.74109 7.1866 8.7262C6.69529 8.71131 6.22948 8.50408 5.88945 8.14914C5.54942 7.7942 5.36236 7.31992 5.36856 6.82843C5.37475 6.33693 5.5737 5.86752 5.92257 5.52127C8.36247 3.17684 11.6164 1.86981 15.0001 1.87502C15.4974 1.87502 15.9743 2.07256 16.3259 2.42419C16.6775 2.77582 16.8751 3.25273 16.8751 3.75002C16.8751 4.2473 16.6775 4.72421 16.3259 5.07584C15.9743 5.42747 15.4974 5.62502 15.0001 5.62502Z' fill='white'/>
                                </svg>                                
                                :
                                'Daftar'
                            }
                        </button>
                    </div>
                    <div className='mb-4 flex items-center justify-center gap-2'>
                        <div className='w-16 h-[1px] bg-[#7D7D7D]'/>
                        <h1 className='text-[#7D7D7D] text-sm lg:text-base truncate'>Atau masuk dengan</h1>
                        <div className='w-16 h-[1px] bg-[#7D7D7D]'/>
                    </div>
                    <div className='mb-4 flex items-center justify-center gap-4'>
                        <button onClick={GoogleLogin} className='w-12 h-12 rounded-full border border-[#7D7D7D] flex items-center justify-center'>
                            <img src={IconGoogle} alt='icon'/>
                        </button>
                        <button onClick={FacebookLogin} className='w-12 h-12 rounded-full border border-[#7D7D7D] flex items-center justify-center'>
                            <img src={IconFacebook} alt='icon'/>
                        </button>
                    </div>
                    <div className='flex items-center justify-center'>
                        <button className='text-[#2E3A44] font-light' onClick={() => navigate('/login')}>Sudah punya akun? <span className='text-[#2D014B] font-bold underline underline-offset-2'>Masuk</span></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register