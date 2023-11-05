import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { IconCheckWhite, IconDelete, IconDropdown, IconNext, IconPdf, IconUploadImage } from '../../../../assets';

import Api from '../../../../Api';
import { Navbar } from '../../../../component';
import { UrlApi } from '../../../../constants';

const EditLayananSupplier = () => {
  const navigate = useNavigate();
  const id = useLocation().state.id;

  const [data, setData] = useState();
  const [dataLayanan, setDataLayanan] = useState([]);

  const [stepper, setStepper] = useState(1);
  const [supplierName, setSupplierName] = useState('');
  const [supplierDescription, setSupplierDescription] = useState('');
  const [supplierSpesification, setSupplierSpesification] = useState('');
  const [venuePlaceAddress, setVenuePlaceAddress] = useState('');
  const [imageUpload, setImageUpload] = useState([]);
  const [imageName, setImageName] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [alert, setAlert] = useState('');

  const [inputFields, setInputFields] = useState([
    {
      package_id: 'newPackage',
      namaPaket: '',
      descPaket: '',
      hargaPaket: [],
      diskon: 'Persentase',
      nilaiDiskonPercentage: '',
      nilaiDiskonNominal: '',
      hargaTertampil: '',
      duration: '',
      portofolio: '',
      startAvailableWork: '',
      endAvailableWork: '',
      price_type: 'FIXED',
    },
  ]);
  // console.log("ini inputfield", inputFields)

  const handleFilePdf = (index, e) => {
    const newFile = e.target.files[0];
    let data = [...inputFields];
    data[index]['package_portofolio'] = newFile;
    setInputFields(data);
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const addFields = () => {
    let newfield = {
      package_id: 'newPackage',
      namaPaket: '',
      descPaket: '',
      hargaPaket: [],
      diskon: 'Persentase',
      nilaiDiskonPercentage: '',
      nilaiDiskonNominal: '',
      hargaTertampil: '',
      duration: '',
      portofolio: '',
      startAvailableWork: '',
      endAvailableWork: '',
      price_type: 'FIXED',
    };
    setInputFields([...inputFields, newfield]);
  };

  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };

  // const handleFormChange = (index, event) => {
  //     let data = [...inputFields];
  //     data[index][event.target.name] = event.target.value;
  //     if (event.target.name === 'hargaPaket') {
  //         data[index]['hargaTertampil'] = event.target.value
  //     } else if (event.target.name === 'nilaiDiskonPercentage') {
  //         data[index]['nilaiDiskonNominal'] = ''
  //         data[index]['hargaTertampil'] = data[index]['hargaPaket'] - ((event.target.value / 100) * data[index]['hargaPaket'])
  //     } else if (event.target.name === 'nilaiDiskonNominal') {
  //         data[index]['nilaiDiskonPercentage'] = ''
  //         data[index]['hargaTertampil'] = data[index]['hargaPaket'] - event.target.value
  //     }
  //     setInputFields(data);
  // }
  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    let { name, value } = event.target;

    // update the value in the hargaPaket array at the given index
    if (name.startsWith('hargaPaket')) {
      let idx = parseInt(name.split('[')[1]);
      data[index].hargaPaket[idx] = parseInt(value);
    } else {
      data[index][name] = value;
    }

    // update hargaTertampil based on the updated hargaPaket value
    let hargaPaket = data[index].hargaPaket.reduce((acc, cur) => acc + cur, 0);
    if (data[index].nilaiDiskonPercentage) {
      data[index].hargaTertampil = hargaPaket - (data[index].nilaiDiskonPercentage / 100) * hargaPaket;
    } else if (data[index].nilaiDiskonNominal) {
      data[index].hargaTertampil = hargaPaket - data[index].nilaiDiskonNominal;
    } else {
      data[index].hargaTertampil = hargaPaket;
    }

    setInputFields(data);
  };

  const handleFile = (e) => {
    const files = e.target.files;
    setMessage('');
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    const imagePromises = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const name = file.name;
      const fileType = file['type'];
      if (validImageTypes.includes(fileType)) {
        const reader = new FileReader();
        imagePromises.push(
          new Promise((resolve, reject) => {
            reader.onload = (event) => {
              resolve(event.target.result);
            };
            reader.onerror = (error) => {
              reject(error);
            };
            reader.readAsDataURL(file);
          }),
        );
      } else {
        setMessage('only images accepted');
      }
    }
    Promise.all(imagePromises).then((base64Images) => {
      setImageUpload([...imageUpload, ...base64Images]);
    });
  };
  function convertImageToBase64(imgUrl) {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.height = image.naturalHeight;
      canvas.width = image.naturalWidth;
      ctx.drawImage(image, 0, 0);
      const dataUrl = canvas.toDataURL();
      setImageUpload((prev) => [...prev, dataUrl]);
    };
    image.src = UrlApi + imgUrl;
  }

  const handleNameImage = (e) => {
    const name = e.target.files[0].name;
    setImageName((prev) => [...prev, 'newImage']);
  };

  const removeImage = (i) => {
    setImageUpload(imageUpload.filter((_, index) => index !== i));
    setImageName(imageName.filter((_, index) => index !== i));
  };

  const postData = async () => {
    const formData = new FormData();

    for (let i = 0; i < imageUpload.length; i++) {
      formData.append('images', imageUpload[i]);
    }
    // for (let i = 0; i < imageUpload.length; i++) {
    //     formData.append("images", imageUpload[i]);
    // }
    // for (let i = 0; i < imageName.length; i++) {
    //     formData.append("product_image_name", imageName[i]);
    // }

    formData.append('product_name', supplierName);
    formData.append('product_description', supplierDescription);
    formData.append('product_spesification', supplierSpesification);

    for (let i = 0; i < inputFields.length; i++) {
      formData.append('package_id', inputFields[i].package_id);
      formData.append('package_name', inputFields[i].namaPaket);
      formData.append('package_description', inputFields[i].descPaket);
      formData.append(
        'package_price',
        inputFields[i].price_type === 'RANGE'
          ? inputFields[i].hargaPaket[0] + ' ' + '-' + ' ' + inputFields[i].hargaPaket[1]
          : inputFields[i].hargaPaket[0],
      );
      formData.append('package_price_type', 'FIXED');
      formData.append('package_price', inputFields[i].hargaPaket);
      formData.append(
        'package_disc_percentage',
        !inputFields[i].nilaiDiskonPercentage ? 0 : inputFields[i].nilaiDiskonPercentage,
      );
      formData.append('package_disc_price', !inputFields[i].nilaiDiskonNominal ? 0 : inputFields[i].nilaiDiskonNominal);
      formData.append('package_total_price', inputFields[i].hargaTertampil);
      formData.append('package_portofolio', inputFields[i].package_portofolio);
      formData.append('package_duration', inputFields[i].duration);
      formData.append('package_start_date', inputFields[i].startAvailableWork);
      formData.append('package_end_date', inputFields[i].endAvailableWork);
    }
    // console.log(formData.get("product_name"))
    // console.log(formData.get("product_description"))
    // console.log(formData.get("product_spesification"))
    // console.log(imageUpload)
    // console.log(imageName)
    console.log(inputFields);

    try {
      const response = await Api.updateSupplier(localStorage.getItem('token-hub'), formData, id);
      console.log(response);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const prevPage = () => {
    if (stepper === 1) {
      navigate(-1);
    } else {
      setStepper(stepper - 1);
    }
  };
  const nextPage = () => {
    if (stepper === 2) {
      postData();
    } else {
      setStepper(stepper + 1);
    }
  };
  const getData = async () => {
    try {
      const response = await Api.getSupplierById(id, localStorage.getItem('token-hub'));
      console.log(response.data.data);
      // setDataLayanan(response.data.data.package_pricings)
      // const getImage = response.data.data.product_images.map((data) => {
      //     convertImageToBase64(data.image);
      //     setImageName((prev) => [...prev, data.image])
      // }
      // )
      const img = [];
      response.data.data.product_images.map((data, index) => {
        // convertImageToBase64(data.image);
        // setImageName((prev) => [...prev, data.image])
        img.push(data.imageBase64);
        // console.log(index, data.image)
      });
      setImageUpload(img);
      const arr = response.data.data.package_pricings.map((val) => ({
        package_id: val?.id,
        namaPaket: val?.name,
        descPaket: val?.description,
        startAvailableWork: val?.start_date,
        endAvailableWork: val?.end_date,
        packageDuration: val?.duration,
        hargaPaket: val?.price,
        diskon: val?.disc_price === 0 ? 'Persentase' : 'Nominal',
        nilaiDiskonPercentage: val?.disc_percentage,
        nilaiDiskonNominal: val?.disc_price,
        hargaTertampil: val?.total_price,
        duration: val?.duration,
        portofolio: val?.portofolio,
      }));
      setInputFields(arr);
      setData(response?.data?.data);
      setSupplierName(response?.data?.data?.namaLayanan);
      setSupplierDescription(response?.data?.data?.deskripsiLayanan);
      setSupplierSpesification(response?.data?.data?.spesifikasiLayanan);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // console.log("data", data)
  // console.log("image", imageName)
  // console.log("image", imageUpload)

  return (
    <div className='bg-[#E3E8F1] min-h-screen'>
      <Navbar />
      <div className='lg:px-[75px] px-[10px] pt-[120px] pb-[10px] md:pt-[140px] md:pb-[30px]'>
        {/* Section 1 */}
        <div>
          <div className='flex items-center gap-3'>
            <Link
              to={'/dashboard-venue'}
              className='text-black-k text-xs md:text-sm font-[500] hover:text-primary'>
              Beranda
            </Link>
            <img src={IconNext} alt='' />
            <Link
              to={'/add-venue'}
              className='text-black-k text-xs md:text-sm font-[500] hover:text-primary'>
              Edit Layanan
            </Link>
          </div>
          <div className='flex flex-col lg:flex-row gap-[30px] mt-[30px]'>
            <div className='md:px-4 md:py-12 rounded-[12px] bg-white px-7 py-5 h-max'>
              <div className='flex items-center gap-[20px] relative'>
                <div
                  className={`h-[50px] w-[50px] flex justify-center items-center rounded-full flex-shrink-0 ${stepper === 2 ? 'bg-primary' : 'bg-[#00CDB433]'
                    }`}>
                  <h1 className='text-primary font-semibold text-[18px]'>
                    {stepper === 2 ? (
                      <span>
                        <img src={IconCheckWhite} alt='' />
                      </span>
                    ) : (
                      '1'
                    )}
                  </h1>
                </div>
                <div>
                  <h1 className='text-[#2E3A44] font-[500]'>Informasi Layanan</h1>
                  <p className='text-[#2E3A44] text-[10px]'>Masukan informasi seputar layanan</p>
                </div>
                <div className='w-0.5 h-[38px] bg-[#C0C6D4] absolute -bottom-[37px] left-6' />
              </div>
              <div className='flex items-center gap-[20px] mt-[37px]'>
                <div className='flex items-center justify-center h-[50px] w-[50px] rounded-full bg-[#00CDB433]'>
                  <h1 className='text-primary font-semibold text-[18px]'>2</h1>
                </div>
                <div>
                  <h1 className={`${stepper === 2 ? 'text-[#2E3A44]' : 'text-[#A8A8A8]'} font-[500]`}>
                    Pengaturan Paket
                  </h1>
                  <p className={`${stepper === 2 ? 'text-[#2E3A44]' : 'text-[#A8A8A8]'}  text-[10px]`}>
                    Informasi paket layanan
                  </p>
                </div>
              </div>
            </div>
            <div className='w-full rounded-[12px] bg-white px-4 md:px-[40px] md:py-[30px] py-5'>
              {stepper === 1 && (
                <div>
                  <h1 className='md:text-[28px] text-[14px] md:mb-[30px] mb-[9px] font-bold text-cherry'>Informasi Layanan</h1>
                  <h1 className='md:text-xl text-xs md:mb-[30px] mb-5 font-semibold text-black-k'>Pengaturan Paket</h1>
                  {alert != '' && (
                    <div
                      id='alert-2'
                      class='flex p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'
                      role='alert'>
                      <svg
                        aria-hidden='true'
                        class='flex-shrink-0 w-5 h-5'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          fill-rule='evenodd'
                          d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                          clip-rule='evenodd'></path>
                      </svg>
                      <span class='sr-only'>Info</span>
                      <div class='ml-3 text-sm font-medium'>{alert}</div>
                      <button
                        onClick={() => setAlert('')}
                        type='button'
                        class='ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700'
                        data-dismiss-target='#alert-2'
                        aria-label='Close'>
                        <span class='sr-only'>Close</span>
                        <svg
                          class='w-5 h-5'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                          xmlns='http://www.w3.org/2000/svg'>
                          <path
                            fill-rule='evenodd'
                            d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                            clip-rule='evenodd'></path>
                        </svg>
                      </button>
                    </div>
                  )}
                  <div className='space-y-[20px] mt-[20px]'>
                    <div>
                      <h1 className='md:text-sm text-xs text-dark-5 font-medium mb-2'>
                        Nama Layanan<span className='text-[#C1121F] ml-[10px]'>*</span>
                      </h1>
                      <input
                        type='text'
                        value={supplierName}
                        onChange={(value) => setSupplierName(value.target.value)}
                        className='rounded-[12px] outline-none border border-outline-2 w-full md:px-4 md:py-4  bg-white px-[10px] py-[10px] text-fill md:text-sm text-xs font-[500]'
                        placeholder='Nama Layanan'
                        required
                      />
                    </div>
                    <div>
                      <h1 className='md:text-sm text-xs text-dark-5 font-medium mb-2'>
                        Deskripsi Layanan<span className='text-[#C1121F] ml-[10px]'>*</span>
                      </h1>
                      <textarea
                        rows={3}
                        value={supplierDescription}
                        onChange={(value) => setSupplierDescription(value.target.value)}
                        className='rounded-[12px] outline-none border border-outline-2 w-full md:px-4 md:py-4  bg-white px-[10px] py-[10px] text-fill md:text-sm text-xs font-[500]'
                        required
                        placeholder='Jelaskan apa yang akan client dapat pada Layanan ini'
                      />
                    </div>
                    {/* <div>
                                            <h1 className='md:text-sm text-xs text-dark-5 font-medium mb-2'>Tempat<span className='text-[#C1121F] ml-[10px]'>*</span></h1>
                                            <input type='text' value={venuePlaceAddress} onChange={ (value) => setVenuePlaceAddress(value.target.value) } className='rounded-[12px] outline-none border border-outline-2 w-full md:px-4 md:py-4  bg-white px-[10px] py-[10px] text-fill md:text-sm text-xs font-[500]' placeholder='Tempat' required/>
                                        </div> */}
                    <div>
                      <h1 className='md:text-sm text-xs text-dark-5 font-medium mb-2'>
                        Spesifikasi Layanan<span className='text-[#C1121F] ml-[10px]'>*</span>
                      </h1>
                      <textarea
                        rows={3}
                        value={supplierSpesification}
                        onChange={(value) => setSupplierSpesification(value.target.value)}
                        className='rounded-[12px] outline-none border border-outline-2 w-full md:px-4 md:py-4  bg-white px-[10px] py-[10px] text-fill md:text-sm text-xs font-[500]'
                        required
                        placeholder='Tuliskan lebih detail spesifikasi dari layanan anda '
                      />
                    </div>
                    <h1 className='md:text-sm text-xs text-dark-5 font-medium mb-2'>
                      Upload Foto Produk/Layanan<span className='text-red-700'>*</span>
                    </h1>
                    <div className='mt-[10px] '>
                      <div className='flex flex-row  md:space-x-10 space-x-4 mt-[10px] '>
                        <div className=''>
                          <div className='flex items-center justify-center w-full'>
                            <label
                              htmlFor='upload-foto'
                              className='cursor-pointer'>
                              <div className='md:w-[150px] md:h-[150px] w-20 h-20 rounded-[10px] border-2 border-primary flex flex-col items-center justify-center bg-cover'>
                                <img src={IconUploadImage} alt='' className='w-9 h-9 md:w-max md:h-auto' />
                                <h1 className='text-primary md:mt-[10px] mt-1 md:text-sm text-[8px]'>Tambah</h1>
                                <h1 className='text-primary md:text-sm text-[8px]'>Foto {imageUpload?.length}/10</h1>
                              </div>
                              {imageUpload.length <= 9 ? (
                                <input
                                  id='upload-foto'
                                  accept='image/*'
                                  type='file'
                                  multiple
                                  onChange={(e) => {
                                    handleFile(e);
                                    handleNameImage(e);
                                  }}
                                  className='rounded-[12px] outline-none border border-outline-2 w-full md:px-4 md:py-4 bg-white px-[10px] py-[10px] hidden'
                                />
                              ) : null}
                            </label>
                          </div>
                          {/* <h1 className='text-xs font-medium text-[#A8A8A8] mt-[10px]'>Maks. 10 MB (JPG, JPEG, PNG )</h1> */}
                        </div>
                        <ul className='list-disc text-dark-6 text-[10px] md:text-[13px] font-medium py-5 md:py-0'>
                          <li>Ukuran: Maks. 10 MB</li>
                          <li>Format: JPG, JPEG, PNG </li>
                        </ul>
                      </div>
                    </div>
                    <div className='flex flex-wrap gap-2 mt-2'>
                      {Object.values(imageUpload).map((file, index) => {
                        return (
                          <div
                            key={index}
                            className='overflow-hidden'>
                            <div className='relative'>
                              <div className='absolute -right-0 -top-0'>
                                <button
                                  onClick={() => {
                                    removeImage(index);
                                  }}
                                  className='flex items-center justify-center w-6 h-6 text-white bg-red-500 rounded-full cursor-pointer hover:bg-red-700'>
                                  x
                                </button>
                              </div>
                              <img
                                className='w-20 h-20 rounded-md'
                                src={file}
                                alt={`Image ${index}`}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className='flex items-end justify-end space-x-4'>
                      <button
                        onClick={() => navigate(-1)}
                        className='md:py-3 md:px-8 py-2 px-5 text-sm rounded-md border-cherry border-2 text-cherry font-[500]'>
                        Batalkan
                      </button>
                      <button
                        onClick={() => {
                          if (!supplierName || !supplierDescription || !supplierSpesification || !imageUpload) {
                            setAlert('Data Tidak boleh kosong');
                          } else {
                            setStepper(stepper + 1);
                          }
                        }}
                        // disabled={!supplierName || !supplierDescription || !supplierSpesification || !images}
                        className='h-auto md:py-3 md:px-6 py-2 px-5 text-sm rounded-md bg-cherry text-white flex items-center justify-center font-[500]'>
                        Lanjutkan
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {stepper === 2 && (
                <div>
                  {/* <h1 className='text-[#2D014B] text-[28px] font-bold mb-[30px]'>Buat Venue</h1> */}
                  {inputFields.map((input, index) => {
                    return (
                      <div key={index}>
                        <h1 className='md:text-[28px] text-[14px] md:mb-[30px] mb-[9px] font-bold text-cherry'>
                          Pengaturan Paket {index === 0 ? '' : index + 1}
                        </h1>
                        <div className='space-y-[20px] py-[20px] bg-[#F9FBFC] mb-[16px] px-[15px] rounded-[12px] mt-[20px]'>
                          <div>
                            <h1 className='md:text-sm text-xs text-black-k font-medium mb-2'>
                              Varian Paket<span className='text-[#C1121F] ml-[10px]'>*</span>
                            </h1>
                            <input
                              type='text'
                              value={input.namaPaket}
                              name='namaPaket'
                              onChange={(event) => handleFormChange(index, event)}
                              className='rounded-[12px] outline-none border border-outline-2 w-full md:px-4 md:py-4  bg-white px-[10px] py-[10px] text-fill md:text-sm text-xs font-[500]'
                              placeholder='Ex : Starter '
                              required
                            />
                          </div>
                          <div>
                            <h1 className='md:text-sm text-xs text-black-k font-medium mb-2'>
                              Ketersediaan tanggal booking<span className='text-[#C1121F] ml-[10px]'>*</span>
                            </h1>
                            <div className='flex flex-row items-center md:items-end justify-between gap-3 md:gap-[20px] w-full'>
                              <div className='w-full'>
                                <input
                                  type='date'
                                  value={input.startAvailableWork}
                                  name='startAvailableWork'
                                  onChange={(event) => handleFormChange(index, event)}
                                  className='rounded-[12px] outline-none border border-outline-2 w-full md:px-4 md:py-4  bg-white px-[10px] py-[10px] text-fill md:text-sm text-xs font-[500]'
                                  placeholder='dd/mm/yyyy - dd/mm/yyyy'
                                  required
                                />
                              </div>
                              <div className='w-full'>
                                <input
                                  type='date'
                                  value={input.endAvailableWork}
                                  name='endAvailableWork'
                                  onChange={(event) => handleFormChange(index, event)}
                                  className='rounded-[12px] outline-none border border-outline-2 w-full md:px-4 md:py-4  bg-white px-[10px] py-[10px] text-fill md:text-sm text-xs font-[500]'
                                  placeholder='dd/mm/yyyy - dd/mm/yyyy'
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <div>
                            <h1 className='md:text-sm text-xs text-black-k font-medium mb-2'>
                              Portofolio<span className='text-red-700'>*</span>
                            </h1>
                            <div className='flex md:space-x-10 space-x-4 mt-[10px] '>
                              <div className=''>
                                <div className='flex items-center justify-center w-full'>
                                  <label
                                    htmlFor={`pdf-upload-${index}`}
                                    className='cursor-pointer'>
                                    <div className='md:w-[150px] md:h-[150px] w-[100px] h-[100px] rounded-[10px] border-2 border-gray-700 border-dashed flex flex-col items-center justify-center bg-cover'>
                                      <img src={IconPdf} alt='' />
                                      <h1 className='text-gray-700 mt-[10px] text-[14px]'>Upload File</h1>
                                    </div>

                                    <input
                                      id={`pdf-upload-${index}`}
                                      accept='.pdf'
                                      type='file'
                                      name='portofolio'
                                      onChange={(e) => handleFilePdf(index, e)}
                                      className='rounded-[12px] outline-none border border-outline-2 w-full md:px-4 md:py-4 bg-white px-[10px] py-[10px] hidden'
                                    />
                                  </label>
                                </div>
                              </div>

                              <ul className='list-disc text-dark-6 text-[10px] md:text-[13px] font-medium py-5 md:py-0'>
                                <li>Ukuran: Maks. 5 MB</li>
                                <li>Format: PDF </li>
                                <div className='flex flex-wrap gap-2 mt-2'></div>
                              </ul>
                            </div>
                          </div>
                          <div className='space-y-[10px] lg:col-span-4 col-span-6'>
                            <h1 className='md:text-sm text-xs text-black-k font-medium mb-2'>
                              Opsi Harga <span className='text-red-700'>*</span>
                            </h1>
                            <select
                              value={input.price_type}
                              name='price_type'
                              onChange={(event) => handleFormChange(index, event)}
                              className='rounded-[12px] outline-none border border-outline-2 w-full md:px-4 md:py-4  bg-white px-[10px] py-[10px] text-fill md:text-sm text-xs font-[500] appearance-none'>
                              <option value=''>Pilih Opsi Harga</option>
                              <option
                                value={'FIXED'}
                                selected>
                                Harga Pasti (Harga layanan sudah pasti untuk kuantitas yang sudah di tentukan ){' '}
                              </option>
                              <option value={'RANGE'}>
                                Range Harga (Harga layanan berupa harga antara harga minimum dan harga maksimum)
                              </option>
                            </select>
                          </div>
                          <div className='flex flex-col md:flex-row items-center justify-between gap-[20px]'>
                            <div className='w-full'>
                              <h1 className='md:text-sm text-xs text-black-k font-medium mb-2'>
                                Harga<span className='text-[#C1121F] ml-[10px]'>*</span>
                              </h1>
                              <input
                                type='number'
                                value={input.hargaPaket[0]}
                                // name='hargaPaket'
                                name={`hargaPaket[0]`}
                                onChange={(event) => handleFormChange(index, event)}
                                className='rounded-[12px] outline-none border border-outline-2 w-full md:px-4 md:py-4  bg-white px-[10px] py-[10px] text-fill md:text-sm text-xs font-[500]'
                                placeholder='Rp.'
                                required
                              />
                            </div>
                            {input.price_type === 'RANGE' && (
                              <div className='w-full'>
                                <div className='flex md:flex-row flex-col justify-center items-center gap-4 md:mt-5'>
                                  <svg
                                    width='19'
                                    height='2'
                                    viewBox='0 0 19 2'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path
                                      d='M0 1H18.5'
                                      stroke='#2E3A44'
                                      stroke-opacity='0.5'
                                      stroke-width='2'
                                    />
                                  </svg>
                                  <input
                                    type='number'
                                    value={input.hargaPaket[1]}
                                    // name='hargaPaket'
                                    name={`hargaPaket[1]`}
                                    onChange={(e) => handleFormChange(index, e)}
                                    className='rounded-[12px] outline-none border border-outline-2 w-full md:px-4 md:py-4  bg-white px-[10px] py-[10px] text-fill md:text-sm text-xs font-[500]'
                                    placeholder='Rp.'
                                    required
                                  />
                                </div>
                              </div>
                            )}
                            <div className='md:w-1/3 w-full'>
                              <h1 className='text-[14px] font-medium'>
                                Kuantitas <span className='text-red-700'>*</span>
                              </h1>
                              <input
                                type='text'
                                value={input.duration}
                                name='duration'
                                onChange={(event) => handleFormChange(index, event)}
                                className='rounded-[12px] outline-none border border-outline-2 w-full md:px-4 md:py-4  bg-white px-[10px] py-[10px] text-fill md:text-sm text-xs font-[500]'
                                placeholder='Ex. Per Sesi'
                                required
                              />
                            </div>
                          </div>
                          {inputFields[index].price_type !== 'RANGE' && (
                            <div className='flex flex-col md:flex-row items-center justify-between gap-[20px]'>
                              <div className='w-full'>
                                <h1 className='md:text-sm text-xs text-black-k font-medium mb-2'>
                                  Diskon<span className='text-[#C1121F] ml-[10px]'>*</span>
                                </h1>
                                <div className='relative'>
                                  <select
                                    value={input.diskon}
                                    name='diskon'
                                    onChange={(event) => handleFormChange(index, event)}
                                    className='rounded-[12px] outline-none border border-outline-2 w-full md:px-4 md:py-4  bg-white px-[10px] py-[10px] text-fill md:text-sm text-xs font-[500] appearance-none'>
                                    <option
                                      value=''
                                      disabled>
                                      Pilih Jenis Diskon
                                    </option>
                                    <option value={'Persentase'}>Persentase (%)</option>
                                    <option value={'Nominal'}>Nominal (Rp)</option>
                                  </select>
                                  <img
                                    src={IconDropdown}
                                    className='absolute top-6 right-4'
                                  />
                                </div>
                              </div>
                              {input.diskon === 'Persentase' ? (
                                <div className='w-full'>
                                  <h1 className='md:text-sm text-xs text-black-k font-medium mb-2'>
                                    Nilai Diskon<span className='text-[#C1121F] ml-[10px]'>*</span>
                                  </h1>
                                  <input
                                    type='number'
                                    value={input.nilaiDiskonPercentage}
                                    name='nilaiDiskonPercentage'
                                    onChange={(event) => handleFormChange(index, event)}
                                    className='rounded-[12px] outline-none border border-outline-2 w-full md:px-4 md:py-4  bg-white px-[10px] py-[10px] text-fill md:text-sm text-xs font-[500]'
                                    required
                                  />
                                </div>
                              ) : (
                                <div className='w-full'>
                                  <h1 className='md:text-sm text-xs text-black-k font-medium mb-2'>
                                    Nilai Diskon<span className='text-[#C1121F] ml-[10px]'>*</span>
                                  </h1>
                                  <input
                                    type='number'
                                    value={input.nilaiDiskonNominal}
                                    name='nilaiDiskonNominal'
                                    onChange={(event) => handleFormChange(index, event)}
                                    className='rounded-[12px] outline-none border border-outline-2 w-full md:px-4 md:py-4  bg-white px-[10px] py-[10px] text-fill md:text-sm text-xs font-[500]'
                                    required
                                  />
                                </div>
                              )}
                              <div className='w-full'>
                                <h1 className='md:text-sm text-xs text-black-k font-medium mb-2'>
                                  Harga Tertampil<span className='text-[#C1121F] ml-[10px]'>*</span>
                                </h1>
                                <input
                                  type='text'
                                  value={input.hargaTertampil}
                                  name='hargaTertampil'
                                  onChange={(event) => handleFormChange(index, event)}
                                  className='rounded-[12px] outline-none border border-outline-2 w-full md:px-4 md:py-4  bg-white px-[10px] py-[10px] text-fill md:text-sm text-xs font-[500]'
                                  placeholder={
                                    input.diskon == 'Persentase'
                                      ? input.hargaPaket - (input.nilaiDiskonPercentage / 100) * input.hargaPaket
                                      : input.diskon === 'Nominal'
                                        ? input.hargaPaket - input.nilaiDiskonNominal
                                        : input.hargaPaket
                                  }
                                  disabled
                                />
                              </div>
                            </div>
                          )}
                          <div>
                            <h1 className='md:text-sm text-xs text-black-k font-medium mb-2'>
                              Deskripsi<span className='text-[#C1121F] ml-[10px]'>*</span>
                            </h1>
                            <textarea
                              rows={4}
                              value={input.descPaket}
                              name='descPaket'
                              onChange={(event) => handleFormChange(index, event)}
                              className='rounded-[12px] outline-none border border-outline-2 w-full md:px-4 md:py-4  bg-white px-[10px] py-[10px] text-fill md:text-sm text-xs font-[500]'
                              required
                            />
                          </div>
                          <button
                            onClick={() => removeFields(index)}
                            className={`py-[20px] flex items-center justify-center w-full gap-[10px] `}>
                            <img src={IconDelete} alt='' />
                            <h1 className='text-[#C1121F] text-sm font-[500]'>Hapus Paket</h1>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  <div className='mt-[20px]'>
                    <h1 className='text-dark-4 md:text-sm mb-[10px]'>
                      Perlu paket tambahan untuk menjangkau lebih banyak client?
                    </h1>
                    <button
                      className='border border-primary flex items-center justify-center p-2.5 rounded-[10px] text-primary text-sm font-[500]'
                      onClick={() => addFields()}>
                      + Buat Paket Lainnya
                    </button>
                  </div>
                  <div className='flex flex-row items-center gap-5 mt-[45px] justify-end'>
                    <button
                      onClick={prevPage}
                      className='md:py-3 md:px-8 py-2 px-5 text-sm rounded-md border-cherry border-2 text-cherry font-[500]'>
                      {stepper === 2 ? 'Kembali' : 'Batal'}
                    </button>
                    <button
                      onClick={nextPage}
                      className='h-auto md:py-3 md:px-6 py-2 px-5 text-sm rounded-md bg-cherry text-white flex items-center justify-center font-[500]'
                    // disabled={!supplierName || !supplierDescription || !venuePlaceAddress || !imageUpload}
                    >
                      {stepper === 2 ? 'Simpan' : 'Lanjutkan'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditLayananSupplier;
