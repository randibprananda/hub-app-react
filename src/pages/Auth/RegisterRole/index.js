import React, { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Api from '../../../Api';
import { BackgroundAuth } from '../../../assets';
import { CardRole, Head, NavbarAuth } from '../../../component';

const RegisterRole = () => {
  const params = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState('');

  const GetData = async () => {
    try {
      const response = await Api.GetMainRole();
      setRole(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token-hub')) {
      navigate('/');
    } else {
      GetData();
    }
  }, []);

  return (
    <Fragment>
      <Head
        title='Register - Konect Hub'
        description='Register Konect Hub'
      />
      <div
        style={{ backgroundImage: `url(${BackgroundAuth})` }}
        className='min-h-screen pb-10 bg-repeat-y bg-cover'>
        <NavbarAuth
          onClickBack={() => navigate(-1)}
          navigateBack
        />
        <div className='px-[72px] lg:px-0'>
          <h1 className='text-white font-semibold text-[24px] lg:text-[28px] text-center mt-20'>
            Selamat Datang di Konect Hub
          </h1>
          <p className='text-xs text-center text-dark-6 lg:text-base'>Apa tujuanmu menggunakan konect Hub?</p>
          <div className='flex lg:flex-row flex-col justify-center items-center gap-[47px] lg:my-20 my-10'>
            {Object.values(role).map((data, index) => {
              return (
                <CardRole
                  key={index}
                  title={data.name}
                  buttonText={`Daftar sebagai ${data.name} `}
                  role={data.name}
                  onClickButton={() =>
                    navigate(
                      '/register',
                      params.state === null
                        ? { state: { roleId: data.id, roleName: data.name } }
                        : {
                            state: {
                              fullname: params.state.fullname,
                              email: params.state.email,
                              image: params.state.image,
                              roleId: data.id,
                              roleName: data.name,
                            },
                          },
                    )
                  }
                />
              );
            })}
          </div>
          <div
            className='flex items-center justify-center'
            onClick={() => navigate('/login')}>
            <button className='text-sm text-center text-light-gray lg:text-base'>
              Belum punya akun? <span className='text-[#00CDB4] font-bold'>Masuk</span>
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RegisterRole;
