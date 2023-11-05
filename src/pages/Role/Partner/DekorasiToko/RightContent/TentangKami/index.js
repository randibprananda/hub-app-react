const TentangKami = ({ dataShopDecoration }) => {
  return (
    <div className='w-full'>
      <div className='bg-white rounded-xl md:py-[38px] md:px-[47px] px-7 py-6'>
        <div className='mb-6'>
          <h1 className='text-[#555555] text-xl font-semibold mb-6'>Layanan</h1>
          <h1 className='text-base font-semibold text-primary'>{dataShopDecoration?.service_name ?? '-'}</h1>
        </div>
        <div className='mb-6'>
          <h1 className='text-[#555555] text-xl font-semibold mb-6'>Lokasi</h1>
          <h1 className='text-base font-semibold text-primary'>{dataShopDecoration?.location ?? '-'}</h1>
        </div>
        <div className='mb-6'>
          <h1 className='text-[#555555] text-xl font-semibold mb-6'>Alamat</h1>
          <h1 className='text-base font-semibold text-primary'>{dataShopDecoration?.address ?? '-'}</h1>
        </div>
        <div className='mb-6'>
          <h1 className='text-[#555555] text-xl font-semibold mb-6'>Deskripsi </h1>
          <h1 className='text-base font-semibold text-primary'>{dataShopDecoration?.description ?? '-'}</h1>
        </div>
      </div>
    </div>
  );
};

export default TentangKami;
