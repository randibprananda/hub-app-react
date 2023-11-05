import { Fragment, useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import {
  ArrowRightWhite,
  DummyAvatar,
  IconBagCherry,
  IconBagPrimary,
  IconBagPurple,
  IconBagYellow,
  IconEdit,
  IconInfo,
  IconNext,
  IconUploadImage,
} from '../../../../assets';

import { useFormik } from 'formik';
import moment from 'moment';
import tw from 'twin.macro';
import { Navbar } from '../../../../component';
import FooterTwo from '../../../../component/FooterTwo/index';

const ErrorText = tw.p`mb-4 -mt-2 text-red-500 text-sm`;

const DetailAdminSupplier = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [isShowPassword1, setIsShowPassword1] = useState(false);
  const [isShowPassword2, setIsShowPassword2] = useState(false);
  const [isShowPassword3, setIsShowPassword3] = useState(false);

  const formik = useFormik({
    initialValues: {
      fotoProfile: '',
      namaAdminSupplier: '',
      namaPengguna: '',
      email: '',
      noTelp: '',
      posisi: '',
      namaAdminPartner: '',
      perusahaan: '',
      tanggalBergabung: '',
      password: '',
      confirmPassword: '',
      isChangePassword: false,
    },
    onSubmit: () => {
      alert('Submitted');
    },
    validationSchema: yup.object().shape({
      fotoProfile: yup
        .string()
        .matches(/^data:image\/[^;]+;base64[^"]+$/, 'Format gambar tidak sesuai')
        .required('Gambar harus diuploud'),
      namaAdminSupplier: yup.string().required('Nama admin supplier harus diisi'),
      namaPengguna: yup.string().required('Nama pengguna harus diisi'),
      namaAdminPartner: yup.string().required('Nama admin partner harus diisi'),
      email: yup.string().email('Harus berisi email').required('Email harus diisi'),
      noTelp: yup.string().required('Nomor telepon harus diisi'),
      posisi: yup.string().required('Posisi di perusahaan harus diisi'),
      perusahaan: yup.string().required('Nama perusahaan harus diisi'),
      tanggalBergabung: yup.string().required('Tanggal bergabung harus diisi'),
      password: yup.string().when(['isChangePassword'], {
        is: (isChangePassword) => isChangePassword === true,
        then: yup.string().required('Password harus diisi'),
      }),
      confirmPassword: yup.string().when(['isChangePassword'], {
        is: (isChangePassword) => isChangePassword === true,
        then: yup
          .string()
          .oneOf([yup.ref('password'), null], 'Konfirmasi password harus sesuai dengan password')
          .required('Password harus diisi'),
      }),
    }),
  });

  useEffect(() => {
    formik.setFieldValue('namaAdminSupplier', state?.adminData?.fullname);
    formik.setFieldValue('email', state?.adminData?.email);
    formik.setFieldValue('perusahaan', state?.adminData?.company?.name);
    formik.setFieldValue('noTelp', state?.adminData?.phone);
    formik.setFieldValue('namaPengguna', state?.adminData?.username);
    formik.setFieldValue('tanggalBergabung', state?.adminData?.createdAt);
  }, []);

  const handleForm = (event) => {
    const { target } = event;
    const { name, value } = target;

    if (name === 'fotoProfile') {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result;
        formik.setFieldValue('fotoProfile', base64Data);
      };
      reader.readAsDataURL(file);
    } else {
      formik.setFieldValue(name, value);
    }
  };

  // BUG: Conditional validation pada password masih error jika menggunakan yup

  return (
    <Fragment>
      <div className='min-h-screen bg-outline'>
        <Navbar />
        <div className='md:px-[75px] px-[36px] pt-[120px] pb-[10px] md:pt-[140px] md:pb-[30px]'>
          <div className='flex flex-wrap items-center gap-3 mb-[30px]'>
            <button
              onClick={() => navigate(-1)}
              className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>
              Beranda
            </button>
            <img
              src={IconNext}
              alt=''
            />
            {/* Detail Admin RoleName */}
            <button className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>Detail Admin Supplier</button>
          </div>
          <div className='md:flex md:items-center mt-[30px]'>
            <div className='flex justify-center md:flex-none md:justify-start'>
              <img
                src={formik.values.fotoProfile !== '' ? formik.values.fotoProfile : DummyAvatar}
                className='h-[170px] w-[170px] bg-white sm:h-[170px] rounded-[8px]'
                alt='avatar'
              />
            </div>
            <div className='bg-[#2D014B] h-[130px] w-full md:rounded-tr-[20px] rounded-br-[20px] md:mt-0 mt-5'>
              <div className='md:flex md:items-center md:justify-between px-[32px] py-[28px]'>
                <div className='flex flex-col justify-center'>
                  <h1 className='text-white md:text-[32px] text-[22px] font-inter font-bold'>{state.fullname}</h1>
                  <p className='text-white md:text-[14px] font-inter'>{state.email}</p>
                </div>
                <div>
                  <p className='text-white font-[400] text-[16px]'>
                    Bergabung sejak {moment(state.createdAt).format('DD/MM/YYYY')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-outline-2 rounded-[20px] px-[40px] py-[35px] grid gap-y-3 grid-row-6 md:grid-cols-6 mt-[42px] items-center'>
            <div className='flex col-span-4 gap-x-4'>
              <div className='md:w-[192px] md:h-[109px] bg-white rounded-[12px] relative flex flex-col gap-[9px] p-5 md:p-2'>
                <p className='font-[700] text-[34px] text-black'>100</p>
                <span className='flex items-center gap-2'>
                  <img
                    src={IconBagCherry}
                    alt='logo'
                    className='w-[24px] h-[24px]'
                  />
                  <p className='text-[#A8A8A8] text-[15px] font-[500]'>Total Supplier</p>
                </span>
                <img
                  src={IconInfo}
                  alt='info'
                  className='h-[20px] absolute top-[9px] right-[9px] cursor-pointer'
                />
              </div>
              <div className='md:w-[192px] md:h-[109px] bg-white rounded-[12px] relative flex flex-col gap-[9px] p-5 md:p-2'>
                <p className='font-[700] text-[34px] text-black'>100</p>
                <span className='flex items-center gap-2'>
                  <img
                    src={IconBagPrimary}
                    alt='logo'
                    className='w-[24px] h-[24px]'
                  />
                  <p className='text-[#A8A8A8] text-[15px] font-[500]'>Total Supplier Aktif</p>
                </span>
                <img
                  src={IconInfo}
                  alt='info'
                  className='h-[20px] absolute top-[9px] right-[9px] cursor-pointer'
                />
              </div>
              <div className='md:w-[192px] md:h-[109px] bg-white rounded-[12px] relative flex flex-col gap-[9px] p-5 md:p-2'>
                <p className='font-[700] text-[34px] text-black'>100</p>
                <span className='flex items-center gap-2'>
                  <img
                    src={IconBagYellow}
                    alt='logo'
                    className='w-[24px] h-[24px]'
                  />
                  <p className='text-[#A8A8A8] text-[15px] font-[500]'>Total Klien</p>
                </span>
                <img
                  src={IconInfo}
                  alt='info'
                  className='h-[20px] absolute top-[9px] right-[9px] cursor-pointer'
                />
              </div>
              <div className='md:w-[192px] md:h-[109px] bg-white rounded-[12px] relative flex flex-col gap-[9px] p-5 md:p-2'>
                <p className='font-[700] text-[34px] text-black'>100</p>
                <span className='flex items-center gap-2'>
                  <img
                    src={IconBagPurple}
                    alt='logo'
                    className='w-[24px] h-[24px]'
                  />
                  <p className='text-[#A8A8A8] text-[15px] font-[500]'>Total Klien Aktif</p>
                </span>
                <img
                  src={IconInfo}
                  alt='info'
                  className='h-[20px] absolute top-[9px] right-[9px] cursor-pointer'
                />
              </div>
            </div>
            <div
              className='flex items-center justify-center w-full h-full col-span-2 border-l border-[#F9FBFC]'
              onClick={() => navigate('/detail-admin-supplier/supplier')}>
              <div className='flex items-center justify-center gap-5 rounded-[8px] text-white bg-primary w-[158px] h-[44px] cursor-pointer'>
                <p>Lihat detail</p>
                <img
                  src={ArrowRightWhite}
                  alt='Arrow Right'
                  width={16}
                />
              </div>
            </div>
          </div>
          <div className='mt-[30px]'>
            <form
              className='w-full '
              onSubmit={formik.handleSubmit}>
              <div className='flex flex-wrap -mx-[55px]'>
                <div className='w-full md:w-1/2 px-[55px] mb-[10px] md:mb-[10px]'>
                  <div>
                    <p className='tracking-wide font-inter text-black text-[18px] font-semibold mb-[22px]'>
                      Data Personal
                    </p>
                    <label
                      className='block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]'
                      htmlFor='fotoProfil'>
                      Foto Profile
                    </label>
                    <label
                      htmlFor='upload-file'
                      className='cursor-pointer'>
                      <div className='relative w-[150px] h-[150px] rounded-[10px] bg-white flex flex-col items-center justify-center bg-cover mb-[20px]'>
                        <img
                          src={IconUploadImage}
                          alt=''
                        />

                        <div className='absolute bottom-0 right-0 p-3 -mb-3 -mr-3 bg-white rounded-full shadow-md'>
                          <img
                            src={IconEdit}
                            alt=''
                          />
                        </div>
                      </div>
                      <input
                        type='file'
                        id='upload-file'
                        name='fotoProfile'
                        onChange={handleForm}
                        className='rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] hidden'
                      />
                    </label>
                  </div>
                  {formik.errors.fotoProfile && formik.touched.fotoProfile && (
                    <ErrorText className='mt-4'>{formik.errors.fotoProfile}</ErrorText>
                  )}
                  <label
                    className='block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]'
                    htmlFor='namaAdminSupplier'>
                    Nama Admin Supplier
                  </label>
                  <input
                    className='appearance-none block w-full bg-[#F9FBFC] text-black border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white'
                    id='namaAdminSupplier'
                    name='namaAdminSupplier'
                    type='text'
                    value={formik.values.namaAdminSupplier}
                    onChange={handleForm}
                    placeholder='Masukkan nama admin supplier'
                  />
                  {formik.errors.namaAdminSupplier && formik.touched.namaAdminSupplier && (
                    <ErrorText>{formik.errors.namaAdminSupplier}</ErrorText>
                  )}
                  <label
                    className='block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]'
                    htmlFor='namaPengguna'>
                    Nama Pengguna
                  </label>
                  <input
                    className='appearance-none block w-full bg-[#F9FBFC] text-black border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white'
                    id='namaPengguna'
                    type='text'
                    name='namaPengguna'
                    value={formik.values.namaPengguna}
                    placeholder='Masukkan nama pengguna'
                    onChange={handleForm}
                  />
                  {formik.errors.namaPengguna && formik.touched.namaPengguna && (
                    <ErrorText>{formik.errors.namaPengguna}</ErrorText>
                  )}
                  <label
                    className='block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]'
                    htmlFor='email'>
                    Email
                  </label>
                  <input
                    className='appearance-none block w-full bg-[#F9FBFC] text-black border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white'
                    id='email'
                    name='email'
                    type='email'
                    value={formik.values.email}
                    placeholder='Masukkan email'
                    onChange={handleForm}
                  />
                  {formik.errors.email && formik.touched.email && <ErrorText>{formik.errors.email}</ErrorText>}
                  <label
                    className='block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]'
                    htmlFor='gantiPassword'>
                    Ganti Password
                  </label>
                  <div className='space-x-[60px] mb-4'>
                    <span>
                      <input
                        id='Ya'
                        type='radio'
                        onChange={() => formik.setFieldValue('isChangePassword', true)}
                        checked={formik.values.isChangePassword === true}
                      />
                      <label htmlFor='Ya'>Ya</label>
                    </span>
                    <span>
                      <input
                        id='Tidak'
                        type='radio'
                        onChange={() => formik.setFieldValue('isChangePassword', false)}
                        checked={formik.values.isChangePassword === false}
                      />
                      <label htmlFor='Tidak'>Tidak</label>
                    </span>
                  </div>
                  {formik.values.isChangePassword === true && (
                    <div>
                      <label
                        className='block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]'
                        htmlFor='password'>
                        Password Lama
                      </label>
                      <div className='relative'>
                        <input
                          className='appearance-none block w-full bg-[#F9FBFC] text-black border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white'
                          id='password'
                          type={isShowPassword1 ? 'text' : 'password'}
                          // value={forgetPassword.recentPassword}
                          // onChange={(e) => setForgetPassword((prev) => ({ ...prev, recentPassword: e.target.value }))}
                        />
                        {isShowPassword1 ? (
                          <AiOutlineEyeInvisible
                            className='absolute top-[50%] right-[10px] transform translate-y-[-50%] cursor-pointer'
                            onClick={() => setIsShowPassword1(false)}
                          />
                        ) : (
                          <AiOutlineEye
                            className='absolute top-[50%] right-[10px] transform translate-y-[-50%] cursor-pointer'
                            onClick={() => setIsShowPassword1(true)}
                          />
                        )}
                      </div>
                      <label
                        className='block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]'
                        htmlFor='password'>
                        Password Baru
                      </label>
                      <div className='relative'>
                        <input
                          className='appearance-none block w-full bg-[#F9FBFC] text-black border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white'
                          id='password'
                          name='password'
                          type={isShowPassword2 ? 'text' : 'password'}
                          value={formik.values.password}
                          onChange={handleForm}
                        />
                        {isShowPassword2 ? (
                          <AiOutlineEyeInvisible
                            className='absolute top-[50%] right-[10px] transform translate-y-[-50%] cursor-pointer'
                            onClick={() => setIsShowPassword2(false)}
                          />
                        ) : (
                          <AiOutlineEye
                            className='absolute top-[50%] right-[10px] transform translate-y-[-50%] cursor-pointer'
                            onClick={() => setIsShowPassword2(true)}
                          />
                        )}
                      </div>
                      {formik.errors.password && formik.touched.password && (
                        <ErrorText>{formik.errors.password}</ErrorText>
                      )}
                      <label
                        className='block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]'
                        htmlFor='password'>
                        Ulangi Password Baru
                      </label>
                      <div className='relative'>
                        <input
                          className='appearance-none block w-full bg-[#F9FBFC] text-black border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white'
                          id='password'
                          name='confirmPassword'
                          type={isShowPassword3 ? 'text' : 'password'}
                          value={formik.values.confirmPassword}
                          onChange={handleForm}
                        />
                        {isShowPassword3 ? (
                          <AiOutlineEyeInvisible
                            className='absolute top-[50%] right-[10px] transform translate-y-[-50%] cursor-pointer'
                            onClick={() => setIsShowPassword3(false)}
                          />
                        ) : (
                          <AiOutlineEye
                            className='absolute top-[50%] right-[10px] transform translate-y-[-50%] cursor-pointer'
                            onClick={() => setIsShowPassword3(true)}
                          />
                        )}
                      </div>
                      {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                        <ErrorText>{formik.errors.confirmPassword}</ErrorText>
                      )}
                    </div>
                  )}
                </div>
                <div className='w-full md:w-1/2 px-[55px] mb-[10px] md:mb-[10px]'>
                  <label
                    className='block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]'
                    htmlFor='telp'>
                    No. Telp
                  </label>
                  <input
                    className='appearance-none block w-full bg-[#F9FBFC] text-black border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white'
                    id='noTelp'
                    name='noTelp'
                    type='string'
                    value={formik.values.noTelp}
                    placeholder='Masukkan nomor telepon'
                    onChange={handleForm}
                  />
                  {formik.errors.noTelp && formik.touched.noTelp && <ErrorText>{formik.errors.noTelp}</ErrorText>}
                  <label
                    className='block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]'
                    htmlFor='posisi'>
                    Posisi di Perusahaan
                  </label>
                  <input
                    className='appearance-none block w-full bg-[#F9FBFC] text-black border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white'
                    id='posisi'
                    name='posisi'
                    type='text'
                    placeholder='Masukkan posisi di perusahaan'
                    value={formik.values.posisi}
                    onChange={handleForm}
                  />
                  {formik.errors.posisi && formik.touched.posisi && <ErrorText>{formik.errors.posisi}</ErrorText>}
                  {/* Data Admin */}
                  <div>
                    <p className='tracking-wide font-inter text-black text-[18px] font-semibold mb-[25px]'>
                      Data Admin Partner
                    </p>
                    <label
                      className='block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]'
                      htmlFor='namaAdminPartner'>
                      Nama Admin Partner
                    </label>
                    <input
                      className='appearance-none block w-full bg-[#F9FBFC] text-black border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white'
                      id='namaAdminPartner'
                      name='namaAdminPartner'
                      type='text'
                      placeholder='Masukkan nama admin partner'
                      value={formik.values.namaAdminPartner}
                      onChange={handleForm}
                    />
                    {formik.errors.namaAdminPartner && formik.touched.namaAdminPartner && (
                      <ErrorText>{formik.errors.namaAdminPartner}</ErrorText>
                    )}
                    <label
                      className='block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]'
                      htmlFor='perusahaan'>
                      Perusahaan
                    </label>
                    <input
                      className='appearance-none block w-full bg-[#F9FBFC] text-black border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white'
                      id='perusahaan'
                      name='perusahaan'
                      type='text'
                      placeholder='Masukkan nama perusahaan'
                      value={formik.values.perusahaan}
                      onChange={handleForm}
                    />
                    {formik.errors.perusahaan && formik.touched.perusahaan && (
                      <ErrorText>{formik.errors.perusahaan}</ErrorText>
                    )}
                    <label
                      className='block text-[#64748B] text-[16px] font-normal font-inter mb-[10px]'
                      htmlFor='tanggalBergabung'>
                      Tanggal Bergabung
                    </label>
                    <input
                      className='appearance-none block w-full bg-[#F9FBFC] text-black border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white'
                      id='tanggalBergabung'
                      name='tanggalBergabung'
                      type='date'
                      value={moment(formik.values.tanggalBergabung).format('YYYY-MM-DD')}
                      onChange={handleForm}
                    />
                    {formik.errors.tanggalBergabung && formik.touched.tanggalBergabung && (
                      <ErrorText>{formik.errors.tanggalBergabung}</ErrorText>
                    )}
                    <div className='flex justify-end gap-5 mt-16'>
                      <button
                        onClick={() => navigate(-1)}
                        className='appearance-none text-center block w-[135px] h-[46px] bg-[#C0C6D4] text-white font-medium font-rubix text-[15px] py-3 px-4 mb-[5px] rounded-[8px]'>
                        Kembali
                      </button>
                      <button
                        type='submit'
                        className='appearance-none block w-[135px] h-[46px] bg-primary text-[#F9FBFC] font-medium font-rubix text-[15px] py-3 px-4 mb-[5px] rounded-[8px]'>
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <FooterTwo />
      </div>
    </Fragment>
  );
};

export default DetailAdminSupplier;
