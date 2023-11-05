import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Api from '../../../Api'
import { BackgroundAuth, IconCheck } from '../../../assets'
import { NavbarAuth } from '../../../component'

const RegisterAuth = () => {
    const navigate = useNavigate()
    const params = useLocation()
    const [verificationCode, setVerificationCode] = useState('')
    const email = params.state.email;

    const sendCodeAgain = async() => {
        try {
            const response = await Api.resendCodeVerification(params.state.id)
            console.log(response)
            toast.success('Kode Autentikasi telah dikirim', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            console.log(error)
        }
    }

    const verifiCode = async() => {
        try {
            const data = {
                username: params.state.username,
                verification_code: verificationCode
            }
            const response = await Api.VerifiCodeRegister(data)
            navigate('/register-success')
        } catch (error) {
            toast.error('Kode Autentikasi tidak valid', {
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

    useEffect(() => {
        if(localStorage.getItem('token-hub')) {
            navigate('/')
        }
    }, [])

    return (
        <div style={{ backgroundImage: `url(${BackgroundAuth})` }} className='min-h-screen bg-repeat-y bg-cover'>
            <NavbarAuth/>
            <div className='flex lg:px-0 px-5 justify-center items-center'>
                <div className='px-5 lg:px-[100px] py-[23px] lg:py-[40px] lg:w-[724px] mt-32' style={{ background: `linear-gradient(141.39deg, rgba(255, 255, 255, 0.66) 8.32%, rgba(255, 255, 255, 0.69) 89.97%)`, boxShadow: `0px 4px 24px -1px rgba(0, 0, 0, 0.2);`, backdropFilter: `blur(10px)`, borderRadius: 12 }}>
                    <div className='mb-7 lg:mb-9'>
                        <h1 className='text-xl lg:text-[28px] text-cherry font-bold text-center mb-2'>Verifikasi Akun Anda</h1>
                        <p className='text-xs lg:text-base text-purple-2 text-center'>Kami sudah mengirimkan kode verifikasi ke email <span className="font-semibold text-[13px]">[{email}]</span>. Silakan masukkan kode tersebut pada halaman verifikasi akun.</p>
                    </div>
                    <div className='mb-4'>
                        <div className='relative mb-5'>
                            <div className='absolute left-[10px] lg:left-2 lg:top-[18px] top-2'>
                                <img src={IconCheck} alt='Icon'/>
                            </div>
                            <input type='text' className='bg-white lg:py-[18px] py-3 lg:text-base text-xs w-full px-10 text-fill lg:px-10 rounded-xl' placeholder='Masukkan Kode Verifikasi' value={verificationCode} onChange={ (value) => setVerificationCode(value.target.value) } />
                        </div>
                    </div>
                    <div className='mb-7 space-y-3'>
                        <button className='bg-cherry text-white font-bold h-[52px] w-full text-center rounded-xl' onClick={verifiCode}>Verifikasi Akun</button>
                        <div className='flex items-center gap-1'>
                            <h1 className='text-black-k'>Belum menerima email?</h1>
                            <button onClick={sendCodeAgain} className='text-cherry font-semibold'>Kirim ulang kode</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterAuth