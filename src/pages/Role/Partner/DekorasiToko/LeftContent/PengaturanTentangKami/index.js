import { useFormik } from 'formik';
import { useState } from 'react';
import tw from 'twin.macro';
import * as yup from 'yup';
import { shallow } from 'zustand/shallow';

import { ErrorIcon, IconArrowLeft } from '../../../../../../assets';
import { usePutShopDecoration } from '../../../../../../features/partner/dekorasi-toko/usePutShopDecoration';
import { useShopDecorationStore } from '../../../../../../stores/useShopDecorationStore';
import { ToastSuccess } from '../../../../../../utils/toast';

const ErrorText = tw.p` text-red-500 text-sm font-[400]`;

const PengaturanTentangKami = ({ refetchDataShopDecoration }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [setRightMenuActive, setLeftMenuActive] = useShopDecorationStore(
    (state) => [state.setRightMenuActive, state.setLeftMenuActive],
    shallow,
  );

  const formTentangKami = useFormik({
    initialValues: {
      service_name: '',
      location: '',
      address: '',
      description: '',
    },
    onSubmit: () => {
      putShopDecoration(formTentangKami.values);
    },
    validationSchema: yup.object().shape({
      service_name: yup.string().required('Kolom ini wajib diisi'),
      location: yup.string().required('Kolom ini wajib diisi'),
      address: yup.string().required('Kolom ini wajib diisi'),
      description: yup.string().required('Kolom ini wajib diisi'),
    }),
  });

  const handleChangeTentangKami = (event) => {
    const { target } = event;
    const { name, value } = target;

    formTentangKami.setFieldValue(name, value);
  };

  const { mutate: putShopDecoration } = usePutShopDecoration({
    onSuccess: () => {
      ToastSuccess('Data berhasil diupdate');
      refetchDataShopDecoration();
    },
  });

  return (
    <div className='bg-white h-full w-full rounded-[12px]'>
      {/* Pengaturan Tentang Kami */}
      <form onSubmit={formTentangKami.handleSubmit}>
        <div className='md:px-7 md:py-7 px-[18px] py-[14px] border-b-2'>
          <div className='flex items-center gap-[16px]'>
            <button
              key={1}
              onClick={() => {
                setLeftMenuActive(1);
                setRightMenuActive('Beranda');
              }}>
              <img
                src={IconArrowLeft}
                alt=''
              />
            </button>
            <h1 className='font-semibold font-inter text-[12px] md:text-[20px] text-black-k'>
              Pengaturan Tentang Kami{' '}
            </h1>
          </div>
        </div>
        <div className='p-[28px] space-y-5 overflow-auto scrollbar-hide h-[380px] shadow-md'>
          <div class='mb-6'>
            <label
              for='service_name'
              class='md:text-base text-xs text-[#2E3A44]/80 font-semibold mb-2'>
              Nama Layanan{' '}
            </label>
            <input
              type='text'
              id=''
              name='service_name'
              value={formTentangKami.values.service_name}
              className='rounded-[12px] outline-none border border-outline-2 w-full md:px-4 md:py-4 bg-white px-[10px] py-[10px] text-fill md:text-sm text-xs font-[500] placeholder-[#2E3A44]'
              placeholder='Masukan nama layanan..'
              onChange={handleChangeTentangKami}
            />
            {formTentangKami.errors.service_name && formTentangKami.touched.service_name && (
              <div className='flex items-center mt-2 gap-x-1'>
                <img
                  src={ErrorIcon}
                  alt='Error'
                />
                <ErrorText>{formTentangKami.errors.service_name}</ErrorText>
              </div>
            )}
          </div>
          <div className='relative w-full'>
            <h1 className='md:text-base text-xs text-[#2E3A44] font-[500] mb-2'>Pilih lokasi kota</h1>
            <div className='relative'>
              <div
                className='flex justify-between w-full p-10 px-4 py-2 text-xs leading-tight text-gray-700 bg-white border rounded-[12px] border-outline-2 focus:outline-none focus:border-blue-500 md:text-sm md:p-4 cursor-pointer'
                onClick={() => setIsOpen(!isOpen)}>
                <span>
                  {formTentangKami.values.location === '' ? 'Pilih lokasi kota' : formTentangKami.values.location}
                </span>
                <svg
                  className='w-4 h-4 mt-1 ml-2'
                  viewBox='0 0 20 20'
                  fill='currentColor'>
                  <path
                    fillRule='evenodd'
                    d='M5.293 7.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <ul
                className={`absolute left-0 w-full bg-white rounded-md md:text-sm text-xs shadow-md overflow-hidden transition-all duration-300 ease-in-out text-black ${
                  isOpen ? '' : 'hidden'
                }`}>
                <li
                  className='p-4 text-xs cursor-pointer hover:bg-gray-100 md:text-sm'
                  onClick={() => {
                    formTentangKami.setFieldValue('location', 'Jakarta');
                    setIsOpen((prev) => !prev);
                  }}>
                  Jakarta
                </li>
              </ul>
              {formTentangKami.errors.location && formTentangKami.touched.location && (
                <div className='flex items-center mt-2 gap-x-1'>
                  <img
                    src={ErrorIcon}
                    alt='Error'
                  />
                  <ErrorText>{formTentangKami.errors.location}</ErrorText>
                </div>
              )}
            </div>
          </div>
          <div class='mb-6'>
            <label
              for='address'
              class='md:text-base text-xs text-[#2E3A44]/80 font-semibold mb-2'>
              Alamat
            </label>
            <textarea
              rows={1}
              className='rounded-[12px] outline-none border border-outline-2 w-full md:px-4 md:py-4 bg-white px-[10px] py-[10px] text-fill md:text-sm text-xs font-[500] placeholder-[#2E3A44]'
              name='address'
              value={formTentangKami.values.address}
              onChange={handleChangeTentangKami}
              placeholder='Masukan alamat ..'
            />
            {formTentangKami.errors.address && formTentangKami.touched.address && (
              <div className='flex items-center mt-2 gap-x-1'>
                <img
                  src={ErrorIcon}
                  alt='Error'
                />
                <ErrorText>{formTentangKami.errors.address}</ErrorText>
              </div>
            )}
          </div>
          <div class='mb-6'>
            <label
              for='description'
              class='md:text-base text-xs text-[#2E3A44]/80 font-semibold mb-2'>
              Deskripsi
            </label>
            <textarea
              rows={1}
              className='rounded-[12px] outline-none border border-outline-2 w-full md:px-4 md:py-4 bg-white px-[10px] py-[10px] text-fill md:text-sm text-xs font-[500] placeholder-[#2E3A44]'
              name='description'
              value={formTentangKami.values.description}
              onChange={handleChangeTentangKami}
              placeholder='Masukan deskripsi ..'
            />
            {formTentangKami.errors.description && formTentangKami.touched.description && (
              <div className='flex items-center mt-2 gap-x-1'>
                <img
                  src={ErrorIcon}
                  alt='Error'
                />
                <ErrorText>{formTentangKami.errors.description}</ErrorText>
              </div>
            )}
          </div>
        </div>
        <div className='p-[28px] w-full'>
          <button
            className='bg-cherry hover:bg-[#2E3A66] text-white font-medium text-[13px] w-full py-4 rounded-lg'
            type='submit'>
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default PengaturanTentangKami;
