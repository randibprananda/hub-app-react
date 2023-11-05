import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Api from '../../../Api';
import { IconNext, LogoDefault } from '../../../assets';
import { FooterTwo, Navbar } from '../../../component';
import imageHandle from '../../../utils/imageHandle';
import { UrlApi } from '../../../constants';

function ProfilePengguna() {
  const token = window.localStorage.getItem('token-hub');
  const navigate = useNavigate();
  const [users, setUsers] = useState('');
  const [user_details, setUserDetails] = useState('');
  const [userId, setUserId] = useState('');
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
  const [editPassword, setEditPassword] = useState(false);
  const [role, setRole] = useState(false);
  const [data, setData] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confNewPassword, setConfNewPassword] = useState('');

  const handleChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageUpload(reader.result);
    };
  };

  const getFetchUser = async () => {
    try {
      const response = await Api.fetch(localStorage.getItem('token-hub'));
      setUsers(response.data);
      setUserDetails(response.data.users_detail);
      setUserId(response.data.users_detail.userId);

      setFullname(response.data.fullname);
      setUsername(response.data.username);
      setEmail(response.data.email);
      setPhone(response.data.phone);
      setPassword(response.data.password);
      setImageUpload(response.data.image);
      setCity(response.data.users_detail.city);
      setProvince(response.data.users_detail.province);
      setPostalCode(response.data.users_detail.postal_code);
      setAddress(response.data.users_detail.address);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();

    try {
      const datas = {
        fullname: fullname,
        username: username,
        email: email,
        phone: phone,
        image: imageUpload,
        city: city,
        province: province,
        postal_code: postal_code,
        address: address
      };

      const anyValueEmptyOrNull = Object.values(datas).some((value) => value === null || value === '');

      if (anyValueEmptyOrNull) {
        toast.error('Data tidak boleh kosong', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        });
        return;
      }

      const response = await Api.updateUser(localStorage.getItem('token-hub'), userId, datas);

      toast.success('Profil pengguna berhasil diperbarui', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });
      navigate(-1)
    } catch (error) {
      console.log(error);
    }
  };

  const getUserRole = async () => {
    try {
      const response = await Api.getUserRole(localStorage.getItem('token-hub'));
      setData(response.data);
      setRole(response.data.role.name);
    } catch (error) {
      console.log(error);
      localStorage.removeItem('token-hub');
    }
  };

  const updatePassword = async () => {
    if (newPassword !== confNewPassword) {
      toast.error('Data tidak cocok!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });
      return;
    } else if (newPassword === '' || confNewPassword === '') {
      toast.error('Data tidak boleh kosong!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });
      return;
    } else if (newPassword.length < 8 || confNewPassword.lenth < 8) {
      toast.error('Jumlah karakter minimal harus 8 karakter!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });
      return;
    }

    const data = {
      password: newPassword,
      confirmPassword: confNewPassword
    };

    await Api.ResetPassword(data, userId);
    
    toast.success('Password Berhasil Diganti', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
    setEditPassword(false);
  };

  useEffect(() => {
    getFetchUser();
    getUserRole();
  }, []);

  return (
    <div className='bg-[#E3E8F1] min-h-screen'>
      <Navbar />
      <div className='lg:px-[75px] px-[10px] pt-[120px] pb-[10px] md:pt-[140px] md:pb-[30px]'>
        <div className='flex flex-wrap items-center gap-3 mb-[30px]'>
          <button onClick={() => navigate(-1)} className='text-black-k text-xs lg:text-sm font-[500] hover:text-primary'>
            Beranda
          </button>
          <img src={IconNext} alt='' />
          <Link to={'/dashboard-sh'} className='text-black-k text-xs lg:text-sm font-[500] hover:text-primary'>
            Profile
          </Link>
          <img src={IconNext} alt='' />
          <button className='text-black-k text-xs lg:text-sm font-[500] hover:text-primary'>Edit Profile</button>
        </div>
        <div className='flex items-center mt-[30px]'>
          <div className='flex flex-shrink-0'>
            <img
              src={
                !image
                  ? imageHandle(imageUpload) === `${UrlApi}null`
                    ? LogoDefault
                    : imageHandle(imageUpload)
                  : image
              }
              className='md:h-[170px] md:w-[170px] w-[116px] h-[116px] bg-white rounded-[8px]' alt=''
            />
          </div>

          <div className='bg-cherry h-auto w-full rounded-r-[20px]'>
            <div className='md:flex md:items-center md:justify-between md:px-[32px] md:py-[28px] px-[14px] py-[14px]'>
              <div className='flex flex-col justify-center'>
                <h1 className='text-white md:text-[32px] text-[16px] font-inter font-bold'>{users.fullname}</h1>
                <p className='text-white md:text-[14px] text-[10px] font-inter'>{users.email}</p>
              </div>
              <div className='mt-2 md:mt-0'>
                <button
                  className='px-4 py-2 md:px-5 md:py-3 border border-primary text-primary rounded-[10px] hover:bg-primary hover:text-white flex items-center justify-center gap-[10px] font-medium md:text-[15px] text-[10px]'
                  onClick={() => setEditPassword(true)}
                >
                  <svg width='24' height='24' className='md:w-6 md:h-6 w-[14px] h-[14px]' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M18 8H20C20.2652 8 20.5196 8.10536 20.7071 8.29289C20.8946 8.48043 21 8.73478 21 9V21C21 21.2652 20.8946 21.5196 20.7071 21.7071C20.5196 21.8946 20.2652 22 20 22H4C3.73478 22 3.48043 21.8946 3.29289 21.7071C3.10536 21.5196 3 21.2652 3 21V9C3 8.73478 3.10536 8.48043 3.29289 8.29289C3.48043 8.10536 3.73478 8 4 8H6V7C6 5.4087 6.63214 3.88258 7.75736 2.75736C8.88258 1.63214 10.4087 1 12 1C13.5913 1 15.1174 1.63214 16.2426 2.75736C17.3679 3.88258 18 5.4087 18 7V8ZM5 10V20H19V10H5ZM11 14H13V16H11V14ZM7 14H9V16H7V14ZM15 14H17V16H15V14ZM16 8V7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7V8H16Z'
                      fill='currentColor'
                    />
                  </svg>
                  Ubah Kata Sandi
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-[50px]'>
          <p className='tracking-wide underline font-inter text-cherry text-[16px] font-medium'>
            Informasi Personal
          </p>
        </div>
        <div className='mt-[30px]'>
          <form className='w-full'>
            <div className='flex flex-col md:flex-row gap-x-20'>
              <div className='w-full mb-[10px] md:mb-[10px]'>
                <div>
                  <label className='block text-neutural text-[12px] md:text-[16px] font-normal font-inter mb-[10px]' htmlFor='nama'>
                    Foto Profile
                  </label>
                  <label htmlFor='upload-file' className='cursor-pointer'>
                    <div
                      className='relative w-[150px] h-[150px] rounded-[10px] bg-white flex flex-col items-center justify-center bg-cover mb-[20px]'
                      style={{ backgroundImage: `url(${image ? image : imageHandle(imageUpload)})` }}
                    >
                      <svg width='44' height='44' viewBox='0 0 44 44' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M11.0368 30.7962H32.5924L25.8562 21.8147L20.4673 28.9999L16.4257 23.611L11.0368 30.7962ZM3.85156 37.9814V9.24055H13.1025L16.4257 5.64795H27.2035L30.5266 9.24055H39.7776V37.9814H3.85156Z'
                          fill='#C0C6D4'
                        />
                      </svg>

                      <div className='absolute bottom-0 right-0 p-3 -mb-3 -mr-3 bg-white rounded-full shadow-md'>
                        <svg width='24' height='24' viewBox='0 0 27 27' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M10.0189 24.9815L22.5137 8.82326C23.1928 7.95191 23.4342 6.9445 23.2079 5.91875C23.0117 4.98625 22.4383 4.09961 21.5781 3.42699L19.4806 1.76072C17.6546 0.308466 15.3911 0.461335 14.0933 2.1276L12.6899 3.94827C12.5088 4.17605 12.5541 4.51236 12.7804 4.6958C12.7804 4.6958 16.3267 7.53916 16.4021 7.60031C16.6436 7.82961 16.8246 8.13535 16.8699 8.50223C16.9454 9.22072 16.4474 9.89334 15.7079 9.98506C15.3609 10.0309 15.0289 9.92391 14.7874 9.72518L11.0601 6.75953C10.879 6.62348 10.6074 6.65252 10.4565 6.83596L1.59841 18.3011C1.02498 19.0196 0.8288 19.9521 1.02498 20.854L2.15676 25.7611C2.21712 26.021 2.44347 26.2044 2.7151 26.2044L7.69494 26.1433C8.60036 26.128 9.44543 25.7153 10.0189 24.9815ZM16.9917 23.4533H25.1118C25.9041 23.4533 26.5484 24.106 26.5484 24.9086C26.5484 25.7127 25.9041 26.3639 25.1118 26.3639H16.9917C16.1994 26.3639 15.5551 25.7127 15.5551 24.9086C15.5551 24.106 16.1994 23.4533 16.9917 23.4533Z'
                            fill='#130F26'
                          />
                        </svg>
                      </div>
                    </div>
                    <input
                      type='file'
                      id='upload-file'
                      onChange={(e) => handleChange(e)}
                      className='rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] hidden'
                      required
                    />
                  </label>
                </div>
                <label className='block text-neutural text-[12px] md:text-[16px] font-normal font-inter mb-[10px]' htmlFor='nama'>
                  Nama User
                </label>
                <input
                  className='appearance-none block w-full bg-light text-black-k border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white md:text-[16px] text-xs'
                  id='nama'
                  type='text'
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />

                <label className='block text-neutural text-[12px] md:text-[16px] font-normal font-inter mb-[10px]' htmlFor='telp'>
                  No. Telp
                </label>
                <input
                  className='appearance-none block w-full bg-light text-black-k border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white md:text-[16px] text-xs'
                  id='telp'
                  type='tel'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <label className='block text-neutural text-[12px] md:text-[16px] font-normal font-inter mb-[10px]' htmlFor='email'>
                  Email Aktif
                </label>
                <input
                  className='appearance-none block w-full bg-light text-black-k border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white md:text-[16px] text-xs'
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='w-full mb-[10px] md:mb-[10px]'>
                <label
                  className='block text-neutural text-[10px] md:text-[16px] font-normal font-inter mb-[10px]'
                  htmlFor='grid-business-permit'
                >
                  Alamat
                </label>
                <textarea
                  id='alamat'
                  rows='4'
                  className='block p-2.5 w-full mb-[20px] font-rubik font-normal text-[12px] md:text-[16px] text-black-k bg-light rounded-[12px] focus:outline-none focus:ring-white focus:border-white'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>

                <label className='block text-neutural text-[12px] md:text-[16px] font-normal font-inter mb-[10px]' htmlFor='kota1'>
                  Kabupaten/Kota
                </label>
                <input
                  className='appearance-none block w-full bg-light text-black-k border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white md:text-[16px] text-xs'
                  id='kota1'
                  type='text'
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />

                <label className='block text-neutural text-[12px] md:text-[16px] font-normal font-inter mb-[10px]' htmlFor='kota2'>
                  Provinsi
                </label>
                <input
                  className='appearance-none block w-full bg-light text-black-k border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white md:text-[16px] text-xs'
                  id='kota2'
                  type='text'
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                />

                <label className='block text-neutural text-[12px] md:text-[16px] font-normal font-inter mb-[10px]' htmlFor='kota3'>
                  Kode Pos
                </label>
                <input
                  className='appearance-none block w-full bg-light text-black-k border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white md:text-[16px] text-xs'
                  id='kota3'
                  type='number'
                  value={postal_code}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
                {token && role === 'Event Hunter' && (
                  <div>
                    <label className='block text-[#FFA12E] md:text-[16px] text-[12px] font-normal font-inter mb-[10px]'>
                      Upgrade Akun
                    </label>
                    <div className='p-3 bg-white rounded-xl'>
                      <div className='flex justify-between items-center border-b border-outline'>
                        <div className=''>
                          <h1 className='md:text-[16px] text-[12px] text-cherry mb-1.5 '>Stakeholder</h1>
                          <h1 className='md:text-[14px] text-[10px] text-dark-6'>
                            Daftarkan perusahanmu, buka tender sebagai stakeholder
                          </h1>
                        </div>
                        <Link
                          to={'/comming-soon'}
                          className='bg-[#FFA12E] py-1 md:py-1.5 px-5 text-white rounded-lg md:text-[14px] text-[10px] w-max h-max'
                        >
                          Upgrade
                        </Link>
                      </div>
                      <div className='flex justify-between items-center border-b border-outline mt-3'>
                        <div className=''>
                          <h1 className='md:text-[16px] text-[12px] text-cherry mb-1.5 '>Partner</h1>
                          <h1 className='md:text-[14px] text-[10px] text-dark-6'>
                            Anda termasuk pelaku event? Buat dan pasarkan layananmu di Konect Hub
                          </h1>
                        </div>
                        <Link
                          to={'/comming-soon'}
                          className='bg-[#FFA12E] py-1 md:py-1.5 px-5 text-white rounded-lg md:text-[14px] text-[10px] w-max h-max'
                        >
                          Upgrade
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
                <div className='flex justify-end gap-5 mt-16'>
                  <button
                    onClick={() => navigate(-1)}
                    className='appearance-none text-center block w-[135px] h-[46px] border border-cherry bg-white hover:bg-cherry hover:text-white text-cherry font-medium font-rubix text-[15px] py-3 px-4 mb-[5px] rounded-[8px]'
                  >
                    Batal
                  </button>
                  <button
                    onClick={(e) => updateUser(e)}
                    className='appearance-none block w-[135px] h-[46px] bg-cherry hover:bg-[#2E3A66] text-[#F9FBFC] font-medium font-rubix text-[15px] py-3 px-4 mb-[5px] rounded-[8px]'
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {editPassword ? (
          <>
            <div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none'>
              <div className='relative w-full max-w-3xl'>
                <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none px-[30px] py-[20px]'>
                  <div className='flex items-start justify-between rounded-t pb-[28px]'>
                    <div>
                      <h1 className='text-lg font-semibold text-[#2E3A44]'>Ubah Kata Sandi</h1>
                    </div>
                    <button
                      className='float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none'
                      onClick={() => setEditPassword(false)}
                    >
                      <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M15.5899 2.39005C16.1367 1.84329 16.1367 0.956825 15.5899 0.410068C15.0432 -0.136689 14.1567 -0.136689 13.6099 0.410068L8 6.02001L2.39007 0.410068C1.84331 -0.136688 0.956841 -0.136689 0.410085 0.410068C-0.136672 0.956825 -0.136671 1.84329 0.410085 2.39005L6.02002 7.99999L0.410067 13.6099C-0.136689 14.1567 -0.136689 15.0432 0.410067 15.5899C0.956824 16.1367 1.84329 16.1367 2.39005 15.5899L8 9.97997L13.61 15.5899C14.1567 16.1367 15.0432 16.1367 15.5899 15.5899C16.1367 15.0432 16.1367 14.1567 15.5899 13.61L9.97998 7.99999L15.5899 2.39005Z'
                          fill='black'
                        />
                      </svg>
                    </button>
                  </div>

                  <div className='flex flex-col space-y-[30px]'>
                    <div>
                      <label
                        className='block text-neutural text-[10px] md:text-[16px] font-normal font-inter mb-[10px]'
                        htmlFor='password'
                      >
                        Kata Sandi Baru
                      </label>
                      <input
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className='appearance-none block w-full bg-[#F9FBFC] text-[#C0C6D4] border rounded-[12px] py-3 px-4 mb-[5px] leading-tight focus:outline-none focus:bg-white'
                        id='password'
                        type='password'
                        placeholder='Kata Sandi Baru'
                      />
                    </div>
                    <div>
                      <label
                        className='block text-neutural text-[10px] md:text-[16px] font-normal font-inter mb-[10px]'
                        htmlFor='password'
                      >
                        Konfirmasi Kata Sandi Baru
                      </label>
                      <input
                        value={confNewPassword}
                        onChange={(e) => setConfNewPassword(e.target.value)}
                        className='appearance-none block w-full bg-[#F9FBFC] text-[#C0C6D4] border rounded-[12px] py-3 px-4 mb-[5px] leading-tight focus:outline-none focus:bg-white'
                        id='password'
                        type='password'
                        placeholder='Konfirmasi Kata Sandi Baru'
                      />
                    </div>
                  </div>

                  <div className='flex gap-[30px] items-center justify-end rounded-b pt-[30px]'>
                    <button
                      className='text-white px-5 py-[10px] text-base rounded-lg bg-[#C0C6D4] hover:bg-gray-600 hover:text-white'
                      type='button'
                      onClick={() => setEditPassword(false)}
                    >
                      Kembali
                    </button>
                    <button
                      onClick={updatePassword}
                      className='text-white px-5 py-[10px] text-base rounded-lg bg-primary hover:bg-primary'
                      type='button'
                    >
                      Simpan Perubahan
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='fixed inset-0 z-40 bg-black opacity-25'></div>
          </>
        ) : null}
      </div>
      <FooterTwo />
    </div>
  );
}

export default ProfilePengguna;
