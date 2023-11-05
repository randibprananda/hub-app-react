import {
  DummyAvatar,
  IconArrowCircleDown,
  IconArrowCircleUp,
  IconDeleteTwo,
  IconEditThree,
  IconUploud,
  Logo,
} from '../../assets';
import { useEffect, useRef, useState } from 'react';

import Api from '../../Api';
import moment from 'moment/moment';
import { toast } from 'react-toastify';

const ListRiwayatTransaksi = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState(props.statusInvoice);
  const [cancelationReason, setCancelationReason] = useState(props.cancelationReason);
  const [paymentDate, setPaymentDate] = useState(props.paymentDate);
  const [paymentFile, setPaymentFile] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const fileInputRef = useRef(null);
  const [refresh, setRefresh] = useState(false)

  const handleFileUploud = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      setPaymentFile(base64);
    };
  };

  const getClientDetail = async () => {
    try {
      const response = await Api.getUserByID(localStorage.getItem('token-hub'), props.clientId);
      const address = response.data.users_detail.address || '-';
      const city = response.data.users_detail.city || '-';
      const province = response.data.users_detail.province || '-';
      const clientAddress = `${address}, ${city}, ${province}`;
      setClientAddress(clientAddress);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async () => {
    try {
      const data = {
        status: status,
        payment_file: paymentFile,
        cancelation_reason: cancelationReason,
        dateInvoice: moment(paymentDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      };
      await Api.UpdatePartnerTransaction(localStorage.getItem('token-hub'), props.transactionId, data);
      setOpenModal(false)
      toast.success('Pesanan Berhasil Diperbarui', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setRefresh(true)
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await Api.DeletePartnerTransaction(localStorage.getItem('token-hub'), props.transactionId);
      toast.success('Pesanan Dihapus', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClientDetail();
    setRefresh(false)
  }, [refresh]);

  return (
    <>
      <div
        className={`bg-white ${
          !isOpen ? 'rounded-[8px]' : 'rounded-t-[8px]'
        } py-2 px-3 items-center grid grid-cols-8 font-medium text-black`}
      >
        <div className='flex items-center col-span-2 space-x-4'>
          <input
            type='checkbox'
            name=''
            id=''
            className='inline-block w-4 h-4 outline-[#CBD5E1] bg-white'
          />
          <img
            src={props.image}
            alt='avatar'
            className='w-[50px] h-[50px] rounded-[6px]'
          />
          <div className='space-y-1'>
            <p>{props.name}</p>
            <p className='text-[12px] text-[#B5B5C3]'>{props.role}</p>
          </div>
        </div>
        <p>{props.noInvoice}</p>
        <p>{props.invoiceDate}</p>
        <p>{props.phone}</p>
        <p>{props.email}</p>
        <span
          className={`w-[97px] h-[25px] rounded-[6px] ${
            props.statusInvoice === 'PAID'
              ? 'bg-[#E8FFF3] text-[#30DF3F]'
              : props.statusInvoice === 'UNPAID'
              ? 'text-[#F64E60] bg-[#FFE2E5]'
              : props.statusInvoice === 'FAILED'
              ? 'text-[#8950FC] bg-[#EEE5FF]'
              : props.statusInvoice === 'COMPLETE'
              ? 'text-[#0085FF] bg-[#DEFDFF]'
              : 'text-black bg-slate-400'
          } flex justify-center items-center text-[11px] ml-10`}
        >
          <p>{props.statusInvoice}</p>
        </span>
        <div className='flex gap-[10px]'>
          {/* <span
            className='h-[32px] w-[32px] bg-[#F3F6F9] flex justify-center items-center cursor-pointer'
            onClick={handleDelete}
          >
            <img
              src={IconDeleteTwo}
              alt=''
            />
          </span> */}
          <span className='h-[32px] w-[32px] bg-[#F3F6F9] flex justify-center items-center cursor-pointer'>
            <img
              src={IconEditThree}
              alt=''
              onClick={() => setOpenModal(true)}
            />
          </span>
          <button onClick={() => setIsOpen(!isOpen)}>
            <img
              src={props.isOpen ? IconArrowCircleUp : IconArrowCircleDown}
              alt=''
            />
          </button>
        </div>
      </div>
      {isOpen && (
        <div className='bg-white rounded-b-[8px] font-medium px-[31px] pb-[24px] pt-[17px] gap-[50px] grid grid-cols-4'>
          <div className='font-normal text-[#737373]'>
            <p>Layanan yang dipesan</p>
            <p>Jumlah layanan yang dipesan</p>
            <p>Waktu pembayaran</p>
            <p>Total pembayaran</p>
          </div>
          <div>
            <p>: {props.serviceName}</p>
            <p>: {props.quantity} Pax</p>
            <p>: {props.paymentDate}</p>
            <p>: {props.totalPayment}</p>
          </div>
          <div className='font-normal text-[#737373]'>
            <p>Bukti Pembayaran</p>
            <p>Alasan Pembatalan</p>
          </div>
          <div>
            <a
              className={`text-[#780000] font-semibold ${!props.paymentFile ? '' : 'underline'}`}
              href={props.paymentFile}
            >
              {!props.paymentFile ? '-' : 'Download'}
            </a>
            <p>: {props.cancelationReason === null ? '-' : props.cancelationReason}</p>
          </div>
        </div>
      )}
      {openModal && (
        <div className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center transition-all duration-500 bg-black bg-opacity-50'>
          <div className='bg-white w-[500px] h-[862px] rounded-3xl overflow-scroll scrollbar-hide'>
            <section className='flex items-center justify-between px-[30px] py-[20px] border-b-2'>
              <div className='space-y-[6px]'>
                <h1 className='font-bold text-[20px]'>Ubah Pesanan</h1>
                <h3 className='text-primary text-[12px]'>
                  <strong>{props.noInvoice}</strong> ({props.invoiceDate})
                </h3>
              </div>
              <img
                src={Logo}
                alt=''
                className='w-[93.66px]'
              />
            </section>
            <section className='py-[20px] px-[30px] space-y-[20px] border-b-2 text-[#A8A8A8] text-[14px]'>
              <div className='flex justify-between'>
                <div className='flex gap-[10px]'>
                  <img
                    src={DummyAvatar}
                    alt=''
                    className='rounded-full w-[50px] h-[50px]'
                  />
                  <span className='gap-1'>
                    <h3 className='font-semibold text-black'>Pelanggan</h3>
                    <h4>{props.name}</h4>
                  </span>
                </div>
                <h3 className='text-black'>{props.invoiceDate}</h3>
              </div>
              <div>
                <h3 className='font-semibold text-black'>Alamat</h3>
                <h4>{clientAddress}</h4>
              </div>
              <div className='flex gap-[31px]'>
                <div>
                  <h3 className='font-semibold text-black'>Email</h3>
                  <h4>{props.email}</h4>
                </div>
                <div>
                  <h3 className='font-semibold text-black'>Telepon</h3>
                  <h4>{props.phone}</h4>
                </div>
              </div>
              <div className='p-3 rounded-lg bg-[#F9FBFC]'>
                <h3 className='bg-slate-100 gap-[5px] bg-gradient-to-br from-[#233164] to-[#06b3a7] text-transparent bg-clip-text font-semibold'>
                  {props.serviceName} [{props.packet}]
                </h3>
                <h4 className='bg-gradient-to-br from-[#233164] to-[#06b3a7] text-transparent bg-clip-text'>
                  {props.companyName}
                </h4>
              </div>
            </section>
            <section className='py-[20px] px-[30px] space-y-[20px] gap-[20px]'>
              <div>
                <label
                  htmlFor='status'
                  className='font-medium'
                >
                  Status
                </label>
                <select
                  name='status'
                  id='status'
                  onChange={(e) => setStatus(e.target.value)}
                  value={status}
                  className='w-full appearance-none p-[10px] bg-[#F9FBFC] border border-[#A8A8A8] rounded-lg'
                >
                  <option
                    value=''
                    disabled
                  >
                    Status
                  </option>
                  <option value='PAID'>PAID</option>
                  <option value='UNPAID'>UNPAID</option>
                  <option value='FAILED'>FAILED</option>
                  <option value='COMPLETE'>COMPLETE</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor='WaktuPembayaran'
                  className='font-medium'
                >
                  Waktu Pembayaran
                </label>
                <input
                  type='date'
                  id='WaktuPembayaran'
                  value={moment(paymentDate, 'DD/MM/YYYY').format('YYYY-MM-DD')}
                  onChange={(e) => setPaymentDate(moment(e.target.value).format('DD/MM/YYYY'))}
                  className='w-full p-[10px] bg-[#F9FBFC] border border-[#A8A8A8] rounded-lg'
                />
              </div>
              {/* <div>
                <label
                  htmlFor='BuktiPembayaran'
                  className='font-medium border border-red-60'
                >
                  Bukti Pembayaran
                </label>
                <div
                  className='flex gap-[10px] w-full p-[10px] bg-[#F9FBFC] border border-[#A8A8A8] rounded-lg cursor-pointer'
                >
                  <input
                    type='file'
                    id='BuktiPembayaran'
                    onChange={(e) => handleFileUploud(e)}
                  />
                  <img
                    src={IconUploud}
                    alt='Icon Uploud'
                  />
                  <p>Uploud bukti pembayaran</p>
                </div>
              </div> */}
              <div>
                <label htmlFor='BuktiPembayaran'>
                  <h1 className='font-medium'>Bukti Pembayaran</h1>
                  <div className='flex gap-[10px] w-full p-[10px] bg-[#F9FBFC] border border-[#A8A8A8] rounded-lg cursor-pointer items-center'>
                    <img src={IconUploud} alt='Icon Uploud'/>
                    <input type='file' id='BuktiPembayaran' className='hidden' onChange={(e) => handleFileUploud(e)}/>
                    <h1>{!paymentFile ? 'Upload bukti pembayaran' : 'File terupload'}</h1>
                  </div>
                </label>
              </div>
              <div>
                <label
                  htmlFor='AlasanPembatalan'
                  className='font-medium'
                >
                  Alasan Pembatalan
                </label>
                <textarea
                  name='AlasanPembatalan'
                  id='AlasanPembatalan'
                  onChange={(e) => setCancelationReason(e.target.value)}
                  value={cancelationReason}
                  className='w-full p-[10px] bg-[#F9FBFC] border border-[#A8A8A8] rounded-lg resize-none'
                  placeholder='Tulis alasan pembatalan disini'
                ></textarea>
              </div>
            </section>
            <section className='flex py-[20px] px-[30px] w-full'>
              <div className='ml-auto flex gap-[20px]'>
                <button
                  className='px-[20px] py-[8px] bg-[#F9FBFC] border border-[#E3E8F1] font-medium rounded-lg'
                  onClick={() => setOpenModal(false)}
                >
                  Batal
                </button>
                <button
                  className='px-[20px] py-[8px] bg-primary rounded-lg text-white font-medium'
                  onClick={handleSubmit}
                >
                  Simpan
                </button>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default ListRiwayatTransaksi;
