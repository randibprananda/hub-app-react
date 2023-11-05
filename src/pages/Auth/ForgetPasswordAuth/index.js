import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import Api from '../../../Api'
import { BackgroundAuth, IconEmail } from '../../../assets'
import { NavbarAuth } from '../../../component'

const ForgetPasswordAuth = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')

    console.log(email)

    const SendEmail = async() => {
        try {
            if (!email) {
                toast('📧 Email harus diisi', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return; 
                
            } else if (!isValidEmail(email)) {
                toast('📧 Format Email Tidak Valid', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return; 
            }

            const data = {
                email: email
            } 
            const response = await Api.SendVerificationEmailLink(data)
            toast('📧 Cek Email Kamu Untuk Mendapatkan Link Reset Password', {
                position: "top-center",
                autoClose: 6000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            
        } catch (error) {
            // console.log(error)
            toast('📧 Email Tidak Terdaftar', {
                position: "top-center",
                autoClose: 6000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    return (
      <div
        style={{ backgroundImage: `url(${BackgroundAuth})` }}
        className='min-h-screen bg-repeat-y bg-cover'
      >
        <ToastContainer />
        <NavbarAuth
          onClickBack={() => navigate(-1)}
          navigateBack
        />
        <div className='flex items-center justify-center'>
          <div
            className='px-[30px] lg:px-[100px] py-[23px] lg:py-[40px] lg:w-[724px] mt-32'
            style={{
              background: `linear-gradient(141.39deg, rgba(255, 255, 255, 0.66) 8.32%, rgba(255, 255, 255, 0.69) 89.97%)`,
              boxShadow: `0px 4px 24px -1px rgba(0, 0, 0, 0.2);`,
              backdropFilter: `blur(10px)`,
              borderRadius: 12,
            }}
          >
            <div className='mb-7 lg:mb-9'>
              <h1 className='text-base lg:text-[28px] text-cherry font-bold text-center mb-2'>Lupa Kata Sandi</h1>
              <p className='text-xs lg:text-sm text-purple-2 text-center'>
                Lupa kata sandi Anda? Jangan khawatir, kami akan segera mengirimkan tautan untuk mereset kata sandi Anda
                ke alamat email Anda.
              </p>
            </div>
            <div className='mb-4'>
              <div className='relative mb-5'>
                <div className='absolute left-[10px] lg:left-[33px] lg:top-3 top-2'>
                  <img src={IconEmail} alt='icon'/>
                </div>
                <input
                  type='text'
                  className='bg-white py-2.5 lg:text-sm text-xs text-fill lg:py-4 w-full px-10 lg:px-20 rounded-xl'
                  placeholder='Email'
                  value={email}
                  onChange={(value) => setEmail(value.target.value)}
                />
              </div>
            </div>
            <div className='mb-7'>
              <button
                className='bg-cherry text-white font-bold py-2.5 lg:py-[14px] w-full text-center rounded-xl text-sm lg:text-base'
                onClick={SendEmail}
              >
                Kirim
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ForgetPasswordAuth