import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Api from '../../../Api'
import { BackgroundAuth, IconEye, IconEyeSlash, IconFacebook, IconGoogle, IconPassword, IconUsername } from '../../../assets'
import { NavbarAuth } from '../../../component'
import { auth } from '../../../utils'

const Login = () => {
    const navigate = useNavigate()
    const googleProvider = new GoogleAuthProvider()
    const fbProvider = new FacebookAuthProvider()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [typePassword, setTypePassword] = useState('password')

    const changeType = () => {
        if(typePassword === 'password') {
            setTypePassword('text')
        }else {
            setTypePassword('password')
        }
    }

    const postLogin = async() => {
        try {
            const response = await Api.Login(username, password)
            localStorage.setItem("token-hub", response.data.refreshToken)
            navigate('/')
        } catch (error) {
            console.log(error)
            if(error.response.data.msg === 'Not Verified') {
                navigate('/register-auth', {state: {id: error.response.data.id ,username: username}})
            } else {
                toast.error('Username dan/atau kata sandi tidak valid !!!', {
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
    
    const GoogleLogin = async() => {
        const resLoginWithGoogle = await signInWithPopup(auth, googleProvider)
        try {
            const response = await Api.LoginWithFirebase(resLoginWithGoogle.user.email)
            localStorage.setItem("token-hub", response.data.refreshToken)
            navigate('/')
        } catch (error) {
            if(error.response.data.msg === 'Not Verified') {
                navigate('/register-auth', {state: {username: username}})
            } else {
                toast.error('Username dan/atau kata sandi tidak valid !!!', {
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
    
    const FacebookLogin = async() => {
        const resLoginFacebook  = await signInWithPopup(auth, fbProvider)
        try {
            const response = await Api.LoginWithFirebase(resLoginFacebook.user.email)
            localStorage.setItem("token-hub", response.data.refreshToken)
            navigate('/')
        } catch (error) {
            if(error.response.data.msg === 'Not Verified') {
                navigate('/register-auth', {state: {username: username}})
            } else {
                toast.error('Username dan/atau kata sandi tidak valid !!!', {
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

    useEffect(() => {
        if(localStorage.getItem('token-hub')) {
            navigate('/')
        }
    }, [])

    return (
        <div style={{ backgroundImage: `url(${BackgroundAuth})` }} className='min-h-screen bg-repeat-y bg-cover'>
            <NavbarAuth onClickBack={() => navigate(-1)} navigateBack/>
            <div className='flex justify-center items-center lg:px-0 px-5'>
                <div className='px-[22px] lg:px-[100px] py-[23px] lg:py-[40px] lg:w-[724px]' style={{ background: `linear-gradient(141.39deg, rgba(255, 255, 255, 0.66) 8.32%, rgba(255, 255, 255, 0.69) 89.97%)`, boxShadow: `0px 4px 24px -1px rgba(0, 0, 0, 0.2);`, backdropFilter: `blur(10px)`, borderRadius: 12 }}>
                    <div className='mb-7 lg:mb-9'>
                        <h1 className='text-base lg:text-[28px] text-cherry font-bold text-center mb-3'>Masuk ke Konect</h1>
                        <p className='lg:text-sm text-xs text-purple-2 text-center'>Masukan username dan password yang telah anda daftarkan sebelumnya</p>
                    </div>
                    <div className='mb-4'>
                        <div className='relative mb-5'>
                            <div className='absolute left-[10px] lg:left-[33px] lg:top-3 top-2'>
                                <img src={IconUsername} alt='Icon'/>
                            </div>
                            <input type='text' className='bg-white py-2.5 lg:text-sm text-xs text-fill lg:py-4 w-full px-10 lg:px-20 rounded-xl' placeholder='Username' value={username} onChange={ (value) => setUsername(value.target.value) } />
                        </div>
                        <div className='relative'>
                            <div className='absolute left-[10px] lg:left-[33px] lg:top-3 top-2'>
                                <img src={IconPassword} alt='Icon'/>
                            </div>
                            <input type={typePassword} className='bg-white py-2.5 lg:text-sm text-xs text-fill lg:py-4 w-full px-10 lg:px-20 rounded-xl' placeholder='Password' value={password} onChange={ (value) => setPassword(value.target.value) } />
                            <button className='absolute right-[10px] lg:right-[33px] lg:top-3 top-2' onClick={changeType}>
                                <img src={typePassword === 'password' ? IconEyeSlash : IconEye} alt='Icon'/>
                            </button>
                        </div>
                    </div>
                    <div className='mb-7'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <input type='checkbox'/>
                                <h1 className='text-black-k text-xs lg:text-base'>Simpan Kata Sandi</h1>
                            </div>
                            <Link to={'/forget-password-auth'} className='text-cherry text-xs lg:text-base'>Lupa Kata Sandi ?</Link>
                        </div>
                    </div>
                    <div className='mb-7'>
                        <button className='bg-cherry text-white font-bold py-2.5 lg:py-[14px] w-full text-center rounded-xl text-sm lg:text-base' onClick={postLogin}>Masuk</button>
                    </div>
                    <div className='mb-4 flex items-center justify-center gap-2'>
                        <div className='w-16 h-[1px] bg-black-k'/>
                        <h1 className='text-black-k text-sm lg:text-base truncate'>Atau masuk dengan</h1>
                        <div className='w-16 h-[1px] bg-black-k'/>
                    </div>
                    <div className='mb-4 flex items-center justify-center gap-4'>
                        <button className='w-12 h-12 rounded-full border border-black-k flex items-center justify-center' onClick={GoogleLogin}>
                            <img src={IconGoogle} alt='Icon'/>
                        </button>
                        <button className='w-12 h-12 rounded-full border border-black-k flex items-center justify-center' onClick={FacebookLogin}>
                            <img src={IconFacebook} alt='Icon'/>
                        </button>
                    </div>
                    <div className='flex items-center justify-center' onClick={ () => navigate('/register-role')}>
                        <button className='text-xs lg:text-base text-black-k font-light'>Belum punya akun? <span className='text-cherry font-bold underline underline-offset-2'>Daftar</span></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login