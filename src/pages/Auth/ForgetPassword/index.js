import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Api from "../../../Api"
import { BackgroundAuth, IconEye, IconEyeSlash, IconPassword } from "../../../assets"
import { NavbarAuth } from "../../../component"
import { toast } from "react-toastify"

const ForgetPassword = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [token, setToken] = useState([])
    const [typePassword, setTypePassword] = useState('password')
    const [typeConfirmPassword, setTypeConfirmPassword] = useState('password')
    
    const changeTypePassword = () => {
        if(typePassword === 'password') {
            setTypePassword('text')
        }else {
            setTypePassword('password')
        }
    }
    const changeTypeConfirmPassword = () => {
        if(typeConfirmPassword === 'password') {
            setTypeConfirmPassword('text')
        }else {
            setTypeConfirmPassword('password')
        }
    }

    const ResetPassword = async() => {
        try {
            const data = {
                password: newPassword,
                confirmPassword: confirmPassword
            }
            const response = await Api.ResetPassword(data, params.id)
            toast.success('Password anda telah berhasil di reset !!!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setTimeout(() => {
                navigate('/login')
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div style={{ backgroundImage: `url(${BackgroundAuth})` }} className='min-h-screen bg-repeat-y bg-cover'>
            <NavbarAuth/>
            <div className='flex justify-center items-center'>
                <div className='px-[30px] lg:px-[100px] py-[23px] lg:py-[40px] lg:w-[724px]' style={{ background: `linear-gradient(141.39deg, rgba(255, 255, 255, 0.66) 8.32%, rgba(255, 255, 255, 0.69) 89.97%)`, boxShadow: `0px 4px 24px -1px rgba(0, 0, 0, 0.2);`, backdropFilter: `blur(10px)`, borderRadius: 12 }}>
                    <div className='mb-7 lg:mb-9'>
                        <h1 className='text-xl lg:text-[28px] text-[#2D014B] font-bold text-center mb-2'>Reset Kata Sandi</h1>
                        <p className='text-[8px] lg:text-xs lg:text-[#8A6F9C] text-center'>Silahkan buat  ulang kata sandi Anda</p>
                    </div>
                    <div className='mb-4'>
                        <div className='relative mb-5'>
                            <div className='absolute left-[10px] lg:left-[33px] top-4'>
                                <img src={IconPassword} alt="Icon"/>
                            </div>
                            <input type={typePassword} className='bg-white py-2.5 lg:text-sm text-xs text-fill lg:py-4 w-full px-10 lg:px-20 rounded-xl' placeholder='Kata Sandi Baru' value={newPassword} onChange={ (value) => setNewPassword(value.target.value) } />
                            <button className='absolute right-[10px] lg:right-[33px] lg:top-3 top-2' onClick={changeTypePassword}>
                                <img src={typePassword === 'password' ? IconEyeSlash : IconEye} alt="Icon"/>
                            </button>
                        </div>
                        <div className='relative'>
                            <div className='absolute left-[10px] lg:left-[33px] top-4'>
                                <img src={IconPassword} alt="Icon"/>
                            </div>
                            <input type={typeConfirmPassword} className='bg-white py-2.5 lg:text-sm text-xs text-fill lg:py-4 w-full px-10 lg:px-20 rounded-xl' placeholder='Konfirmasi Kata Sandi Baru' value={confirmPassword} onChange={ (value) => setConfirmPassword(value.target.value) } />
                            <button className='absolute right-[10px] lg:right-[33px] lg:top-3 top-2' onClick={changeTypeConfirmPassword}>
                                <img src={typeConfirmPassword === 'password' ? IconEyeSlash : IconEye} alt="Icon"/>
                            </button>
                        </div>
                    </div>
                    <div className='mb-7'>
                        <button className='bg-cherry text-white font-bold py-2.5 lg:py-[14px] w-full text-center rounded-xl text-sm lg:text-base' onClick={ResetPassword}>Simpan</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword