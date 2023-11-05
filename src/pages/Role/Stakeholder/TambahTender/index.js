import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';
import Api from '../../../../Api';
import { AddOns, IconNext, IconUploadImage, Publikasi } from '../../../../assets';
import { Navbar } from '../../../../component';

const TambahTender = () => {
    const navigate = useNavigate();
    const [stepp, setStepp] = useState(1);
    const [currentStep, setCurrentStep] = useState();
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [showModal4, setShowModal4] = useState(false);

    const [addOns, setAddOns] = useState('')
    const [inputFields, setInputFields] = useState([{ }])
    const [isChecked, setIsChecked] = useState(false);
    const [images, setImages] = useState([]);
    const [message, setMessage] = useState();
    const [selectedImages, setSelectedImages] = useState([]);

    const [projectName, setProjectName]= useState('')
    const [projectDescription, setProjectDescription]= useState('')
    const [categoryPartner, setCategoryPartner]= useState([])
    const [maxPartner, setMaxPartner]= useState('')
    const [estimationDate, setEstimationDate]= useState('')
    const [deadline, setDeadline]= useState('')
    const [estimationPrice, setEstimationPrice]= useState('')
    const [minBidding, setMinBidding]= useState('')
    const [estimationAudience, setEstimationAudience]= useState('')
    // const [categoryPartner, setCategoryPartner] = useState({});

    const handleCheckboxClick = () => {
        if (!isChecked) {
            setIsChecked(!isChecked);
            setShowModal(true)

        } else {
            setIsChecked(false);
            setShowModal(false)
        }
    };

    const handleCheckboxClose = () => {
        setIsChecked(false);
        setShowModal(false);
        setShowModal2(false);

    };


    const handleFile = (e) => {
        setMessage("");
        const files = e.target.files;
        const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
        const imagePromises = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileType = file['type'];
            if (validImageTypes.includes(fileType)) {
                const reader = new FileReader();
                imagePromises.push(new Promise((resolve, reject) => {
                    reader.onload = (event) => {
                        resolve(event.target.result);
                    };
                    reader.onerror = (error) => {
                        reject(error);
                    };
                    reader.readAsDataURL(file);
                }));
            } else {
                setMessage("only images accepted");
            }

        }
        Promise.all(imagePromises).then((base64Images) => {
            setImages([...images, ...base64Images]);
        });
    };

    const removeImage = (i) => {
        setImages(images.filter((_, index) => index !== i));
    };

    const submitAddOns = () => {
        setShowModal(false);
        setShowModal2(false);
    }

    const categoryOptions = [
        { value: 'SIUP_Mikro', label: 'SIUP Mikro (Kekayaan bersih tidak lebih dari Rp50 juta)' },
        { value: 'SIUP_Kecil', label: 'SIUP Kecil (Kekayaan bersih Rp50 juta – Rp500 juta)' },
        { value: 'SIUP_Menengah', label: 'SIUP Menengah (Kekayaan bersih Rp500 juta – Rp10 miliar)' },
        { value: 'SIUP_Besar', label: 'SIUP Besar (Kekayaan bersih lebih dari Rp10 miliar)' },
    ];

    const postData = async() => {
            
        const formData = new FormData();
        for (let i = 0; i < images.length; i++) {
            formData.append("tender_images", images[i]);
        }
        for (let i = 0; i < categoryPartner.length; i++) {
            formData.append("partner_category",  categoryPartner[i]);
        }
        formData.append("title", projectName);
        formData.append("description", projectDescription);
        formData.append("maksimal_partner", maxPartner);
        formData.append("implementation_estimate", estimationDate);
        formData.append("deadline", deadline);
        formData.append("budget_target", estimationPrice);
        formData.append("minimal_bidding", minBidding);
        formData.append("participant_estimate", estimationAudience);
        formData.append("add_on", addOns);
        

        try {
            const response = await Api.postTender(localStorage.getItem('token-hub'), formData)
            navigate(-1)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        let data = [];
        for (var i in e) {
            data.push(`${e[i].label}`);
        }
        setCategoryPartner(data)
    }

    const handleSimpan = () => {
        if (images.length === 0 || !categoryPartner || !projectName || !projectDescription || !maxPartner || !estimationDate || !deadline || !estimationAudience || !estimationPrice || !minBidding){
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
        } else {
          setShowModal3(true)
        }
    }

    return (
      <div className='bg-outline min-h-screen'>
        <Navbar />
        <div className='md:px-[75px] px-5 pt-[120px] pb-[10px] md:pt-[140px] md:pb-[30px]'>
          {/* Section 1 */}
          <div>
            <div className='flex items-center gap-3'>
              <Link to={'/'} className='text-black-k md:text-sm text-xs font-[500] hover:text-primary'>
                Beranda Profile
              </Link>
              <img src={IconNext} alt=''/>
              <button className='text-black-k md:text-sm text-xs font-[500] hover:text-primary'>Buat Open Tender</button>
            </div>
            <div className='flex gap-[30px] mt-[30px]'>
              <div className='w-full rounded-[12px] bg-white md:px-[40px] md:py-[30px] px-4 py-[18px]'>
                <div className='mb-[24px]'>
                  <h1 className='md:text-2xl text-base mb-7 md:mb-[30px] text-black font-semibold'>Open Tender</h1>
                </div>

                <div className='flex flex-col'>
                  <div className='flex flex-col gap-[20px] mb-[52px]'>
                    <div className='space-y-3'>
                      <div className='flex items-center gap-2'>
                        <div className='flex items-center justify-center w-4 h-4 px-2 py-2 rounded-full bg-cherry'>
                          <h1 className='md:text-base text-xs text-white'>1</h1>
                        </div>
                        <h1 className='text-title text-xs md:text-base font-semibold'>Informasi Layanan</h1>
                      </div>
                      <h1 className='md:text-sm text-[10px] text-black-6'>
                        Lengkapi data open tender sesuai dengan project/acara yang akan anda adakan{' '}
                      </h1>
                      <div>
                        <h1 className='text-xs md:text-sm font-medium text-dark-5'>
                          Nama Project <span className='text-red-700'>*</span>
                        </h1>
                        <input
                          type='text'
                          onChange={(e) => setProjectName(e.target.value)}
                          className='mt-[10px] rounded-[12px] outline-none border border-dark-6 w-full px-[18px] md:px-[20px] py-[10px] md:py-[15px] text-fill text-xs md:text-sm font-[500] bg-white'
                          placeholder='Masukan nama project tender...'
                          required
                        />
                      </div>
                      <div>
                        <h1 className='text-xs md:text-sm font-medium text-dark-5'>
                          Deskripsi Project <span className='text-red-700'>*</span>
                        </h1>
                        <input
                          type='text'
                          onChange={(e) => setProjectDescription(e.target.value)}
                          className='mt-[10px] rounded-[12px] outline-none border border-dark-6 w-full px-[18px] md:px-[20px] py-[10px] md:py-[15px] text-fill text-xs md:text-sm font-[500] bg-white'
                          placeholder='Tuliskan deskripsi project '
                          required
                        />
                      </div>
                      <div className='flex flex-col md:flex-row items-end justify-between gap-[20px] w-full'>
                        <div className='w-full'>
                          <h1 className='text-xs md:text-sm font-medium text-dark-5 mb-4'>
                            Kategori Partner<span className='text-red-700'>*</span>
                          </h1>
                          <Select
                            isMulti
                            options={categoryOptions}
                            placeholder='Pilih kategori partner ...'
                            onChange={handleChange}
                          />
                        </div>
                        <div className='w-full'>
                          <label htmlFor='MaxPartner' className='text-xs md:text-sm font-medium text-dark-5'>
                            Jumlah Maksimal Partner <span className='text-red-700'>*</span>
                          </label>
                          <input
                            id='MaxPartner'
                            type='number'
                            onChange={(e) => {
                              const value = e.target.value > 0 ? e.target.value : '';
                              setMaxPartner(value);
                            }}
                            value={maxPartner}
                            className='mt-[10px] rounded-[12px] outline-none border border-dark-6 w-full px-[18px] md:px-[20px] py-[10px] md:py-[15px] text-fill text-xs md:text-sm font-[500] bg-white'
                            placeholder='ex: 28'
                            required
                          />
                        </div>
                      </div>
                      <div className='space-y-[10px] mb-[10px]'>
                        <div className='flex flex-col md:flex-row items-end justify-between gap-[20px] w-full'>
                          <div className='w-full'>
                            <h1 className='text-xs md:text-sm font-medium text-dark-5 mb-[10px]'>
                              Estimasi Pelaksanaan<span className='text-[#C1121F] ml-[10px]'>*</span>
                            </h1>
                            <input
                              type='date'
                              onChange={(e) => setEstimationDate(e.target.value)}
                              className='rounded-[12px] outline-none border border-dark-6 w-full px-[18px] md:px-[20px] py-[10px] md:py-[15px] text-fill text-xs md:text-sm font-[500] bg-white'
                              placeholder='dd/mm/yyyy - dd/mm/yyyy'
                              required
                            />
                          </div>
                          <div className='w-full'>
                            <h1 className='text-xs md:text-sm font-medium text-dark-5 mb-[10px]'>
                              Batas Akhir Tender<span className='text-[#C1121F] ml-[10px]'>*</span>
                            </h1>
                            <input
                              type='date'
                              onChange={(e) => setDeadline(e.target.value)}
                              className='rounded-[12px] outline-none border border-dark-6 w-full px-[18px] md:px-[20px] py-[10px] md:py-[15px] text-fill text-xs md:text-sm font-[500] bg-white'
                              placeholder='dd/mm/yyyy - dd/mm/yyyy'
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className='space-y-[10px] mb-[10px]'>
                        <div className='flex flex-col md:flex-row items-end justify-between gap-[20px] w-full'>
                          <div className='w-full'>
                            <label htmlFor='EstimasiBiaya' className='text-xs md:text-sm font-medium text-dark-5 mb-[10px]'>
                              Estimasi Biaya<span className='text-[#C1121F] ml-[10px]'>*</span>
                            </label>
                            <input
                              id='EstimasiBiaya'
                              type='number'
                              onChange={(e) => {
                                const value = e.target.value > 0 ? e.target.value : ''
                                setEstimationPrice(value)
                              }}
                              value={estimationPrice}
                              className='mt-[10px] rounded-[12px] outline-none border border-dark-6 w-full px-[18px] md:px-[20px] py-[10px] md:py-[15px] text-fill text-xs md:text-sm font-[500] bg-white'
                              placeholder='ex : Rp 100.000.000'
                              required
                            />
                          </div>

                          <div className='w-full'>
                            <h1 className='text-xs md:text-sm font-medium text-dark-5 mb-[10px]'>
                              Minimal Bidding<span className='text-[#C1121F] ml-[10px]'>*</span>
                            </h1>
                            <input
                              type='number'
                              onChange={(e) => {
                                const value = e.target.value > 0 ? e.target.value : ''
                                setMinBidding(value)
                              }}
                              value={minBidding}
                              className='rounded-[12px] outline-none border border-dark-6 w-full px-[18px] md:px-[20px] py-[10px] md:py-[15px] text-fill text-xs md:text-sm font-[500] bg-white'
                              placeholder='ex :  Rp 100.000.000'
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className='space-y-[10px] mb-[10px]'>
                        <div className='flex flex-col md:flex-row items-end justify-between w-full'>
                          <div className='w-full'>
                            <h1 className='text-xs md:text-sm font-medium text-dark-5 mb-[10px]'>
                              Estimasi Peserta<span className='text-[#C1121F] ml-[10px]'>*</span>
                            </h1>
                            <input
                              type='text'
                              onChange={(e) => {
                                const value = e.target.value > 0 ? e.target.value : ''
                                setEstimationAudience(value)
                              }}
                              value={estimationAudience}
                              className='rounded-[12px] outline-none border border-dark-6 w-full px-[18px] md:px-[20px] py-[10px] md:py-[15px] text-fill text-xs md:text-sm font-[500] bg-white'
                              placeholder='ex :  100-200'
                              required
                            />
                          </div>
                          <div className='w-full'></div>
                        </div>
                      </div>

                      <div>
                        <h1 className='text-xs md:text-sm font-medium text-dark-5'>
                          Upload Foto Talent <span className='text-red-700'>*</span>
                        </h1>
                        <div className='flex flex-row space-x-10 mt-[10px] '>
                          <div className='flex flex-col space-y-1'>
                            <div className='flex space-x-2'>
                              <div className='flex items-center justify-start'>
                                <label htmlFor='upload-foto' className='cursor-pointer'>
                                  <div className='md:w-[150px] md:h-[150px] w-20 h-20 rounded-[10px] border-2 border-[#00CDB4] flex flex-col items-center justify-center bg-cover'>
                                    <img src={IconUploadImage} className='w-9 h-9 md:w-max md:h-auto' alt='' />
                                    <h1 className='text-primary md:mt-[10px] mt-1 md:text-sm text-[8px]'>Tambah</h1>
                                    <h1 className='text-primary md:text-sm text-[8px]'>Foto {images.length}/10</h1>
                                  </div>
                                  {images.length <= 9 ? (
                                    <input
                                      id='upload-foto'
                                      accept='image/*'
                                      type='file'
                                      multiple
                                      onChange={handleFile}
                                      className='rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] hidden'
                                    />
                                  ) : null}
                                </label>
                              </div>
                              <div className='flex flex-wrap gap-2 mt-2'>
                                {images.map((file, index) => {
                                  return (
                                    <div key={index} className='overflow-hidden'>
                                      <div className='relative'>
                                        <div className='absolute -right-0 -top-0'>
                                          <button
                                            onClick={() => {
                                              removeImage(index);
                                            }}
                                            className='flex items-center justify-center w-6 h-6 text-white bg-red-500 rounded-full cursor-pointer hover:bg-red-700'
                                          >
                                            x
                                          </button>
                                        </div>
                                        <img className='rounded-md h-28 w-28' src={file} alt={`Image ${index}`} />
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                            <div className='text-dark-6 text-[8px] md:text-[13px] font-medium'>Maks. 10 MB (JPG, JPEG, PNG )</div>
                          </div>
                        </div>
                      </div>
                      <div className='flex items-center gap-2'>
                        <div className='flex items-center justify-center w-4 h-4 px-2 py-2 rounded-full bg-cherry'>
                          <h1 className='text-base text-white'>2</h1>
                        </div>
                        <h1 className='text-title text-xs md:text-base font-semibold'>Add Ons (Optional)</h1>
                      </div>
                      <h1 className='md:text-sm text-[10px] text-black-6'>
                        Dapatkan dukungan account management service tambahan dari konect dengan mengaktifkan add ons.{' '}
                      </h1>
                      <div className='flex'>
                        <label className='relative inline-flex items-center mr-5 cursor-pointer'>
                          <input
                            type='checkbox'
                            className='sr-only peer'
                            checked={isChecked}
                            onClick={handleCheckboxClick}
                            readOnly
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00CDB4]"></div>
                        </label>
                      </div>
                      {isChecked && addOns && (
                        <div className='flex gap-3'>
                          <div className='relative'>
                            <input
                              type='search'
                              id='default-search'
                              className='block w-64 p-2 pr-5 text-base text-[#2E3A44CC] border border-[#00CDB4] rounded-xl bg-white'
                              disabled
                              value={addOns}
                              required
                            />
                            <button type='submit' className='text-white absolute left-56 bottom-2.5 '>
                              <svg
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  fill-rule='evenodd'
                                  clip-rule='evenodd'
                                  d='M21.4549 5.41632C21.5499 5.56052 21.5922 5.7331 21.5747 5.9049C21.5573 6.07671 21.481 6.23721 21.3589 6.35932L12.1659 15.5513C12.0718 15.6453 11.9545 15.7126 11.8259 15.7463L7.99689 16.7463C7.87032 16.7793 7.73732 16.7787 7.61109 16.7444C7.48485 16.7101 7.36978 16.6434 7.27729 16.5509C7.18479 16.4584 7.1181 16.3434 7.08382 16.2171C7.04955 16.0909 7.04888 15.9579 7.08189 15.8313L8.08189 12.0033C8.11109 11.8884 8.16616 11.7817 8.24289 11.6913L17.4699 2.47032C17.6105 2.32987 17.8011 2.25098 17.9999 2.25098C18.1986 2.25098 18.3893 2.32987 18.5299 2.47032L21.3589 5.29832C21.3948 5.33432 21.4269 5.37386 21.4549 5.41632ZM19.7679 5.82832L17.9999 4.06132L9.48189 12.5793L8.85689 14.9723L11.2499 14.3473L19.7679 5.82832Z'
                                  fill='#00CDB4'
                                />
                                <path
                                  d='M19.6406 17.1599C19.9139 14.8238 20.0012 12.4698 19.9016 10.1199C19.8994 10.0645 19.9087 10.0093 19.9288 9.95769C19.9489 9.90608 19.9795 9.85916 20.0186 9.81989L21.0026 8.83589C21.0295 8.80885 21.0636 8.79014 21.1008 8.78203C21.1381 8.77392 21.1769 8.77674 21.2126 8.79015C21.2483 8.80356 21.2794 8.827 21.3021 8.85764C21.3248 8.88828 21.3381 8.92483 21.3406 8.96289C21.5258 11.7541 21.4555 14.5564 21.1306 17.3349C20.8946 19.3569 19.2706 20.9419 17.2576 21.1669C13.7629 21.5539 10.2362 21.5539 6.74157 21.1669C4.72957 20.9419 3.10457 19.3569 2.86857 17.3349C2.45397 13.7903 2.45397 10.2095 2.86857 6.66489C3.10457 4.64289 4.72857 3.05789 6.74157 2.83289C9.39394 2.53877 12.0663 2.46752 14.7306 2.61989C14.7687 2.62262 14.8052 2.63623 14.8359 2.6591C14.8665 2.68196 14.8899 2.71313 14.9034 2.74891C14.9169 2.78468 14.9198 2.82357 14.9119 2.86096C14.9039 2.89835 14.8854 2.93268 14.8586 2.95989L13.8656 3.95189C13.8267 3.99064 13.7803 4.02101 13.7292 4.04113C13.6781 4.06125 13.6234 4.0707 13.5686 4.06889C11.3453 3.99331 9.11952 4.07853 6.90857 4.32389C6.26251 4.39539 5.65942 4.68261 5.19672 5.13914C4.73403 5.59567 4.43874 6.19485 4.35857 6.83989C3.95762 10.2682 3.95762 13.7316 4.35857 17.1599C4.43874 17.8049 4.73403 18.4041 5.19672 18.8606C5.65942 19.3172 6.26251 19.6044 6.90857 19.6759C10.2636 20.0509 13.7356 20.0509 17.0916 19.6759C17.7376 19.6044 18.3407 19.3172 18.8034 18.8606C19.2661 18.4041 19.5604 17.8049 19.6406 17.1599Z'
                                  fill='#00CDB4'
                                />
                              </svg>
                            </button>
                          </div>
                          <button>
                            <svg
                              width='24'
                              height='24'
                              viewBox='0 0 24 24'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M21.0697 5.23C19.4597 5.07 17.8497 4.95 16.2297 4.86V4.85L16.0097 3.55C15.8597 2.63 15.6397 1.25 13.2997 1.25H10.6797C8.34967 1.25 8.12967 2.57 7.96967 3.54L7.75967 4.82C6.82967 4.88 5.89967 4.94 4.96967 5.03L2.92967 5.23C2.50967 5.27 2.20967 5.64 2.24967 6.05C2.28967 6.46 2.64967 6.76 3.06967 6.72L5.10967 6.52C10.3497 6 15.6297 6.2 20.9297 6.73C20.9597 6.73 20.9797 6.73 21.0097 6.73C21.3897 6.73 21.7197 6.44 21.7597 6.05C21.7897 5.64 21.4897 5.27 21.0697 5.23Z'
                                fill='#780000'
                              />
                              <path
                                d='M19.2297 8.14C18.9897 7.89 18.6597 7.75 18.3197 7.75H5.67975C5.33975 7.75 4.99975 7.89 4.76975 8.14C4.53975 8.39 4.40975 8.73 4.42975 9.08L5.04975 19.34C5.15975 20.86 5.29975 22.76 8.78975 22.76H15.2097C18.6997 22.76 18.8398 20.87 18.9497 19.34L19.5697 9.09C19.5897 8.73 19.4597 8.39 19.2297 8.14ZM13.6597 17.75H10.3297C9.91975 17.75 9.57975 17.41 9.57975 17C9.57975 16.59 9.91975 16.25 10.3297 16.25H13.6597C14.0697 16.25 14.4097 16.59 14.4097 17C14.4097 17.41 14.0697 17.75 13.6597 17.75ZM14.4997 13.75H9.49975C9.08975 13.75 8.74975 13.41 8.74975 13C8.74975 12.59 9.08975 12.25 9.49975 12.25H14.4997C14.9097 12.25 15.2497 12.59 15.2497 13C15.2497 13.41 14.9097 13.75 14.4997 13.75Z'
                                fill='#780000'
                              />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='flex items-end justify-end space-x-4'>
                    <Link
                      to={'/dashboard-stakeholder'}
                      className='md:px-6 md:py-3 px-5 py-2 text-sm rounded-md border-cherry border-2 text-cherry font-[500] flex justify-center items-center'
                    >
                      Batal
                    </Link>
                    <button
                      onClick={handleSimpan}
                      className='md:px-6 md:py-3 px-5 py-2 text-sm rounded-md bg-cherry text-white flex items-center justify-center font-[500]'
                    >
                      Simpan
                    </button>
                  </div>
                </div>

                {showModal ? (
                  <>
                    <div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none'>
                      <div className='relative w-full max-w-xl'>
                        {/*content*/}
                        <div className='relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none'>
                          {/*header*/}
                          <div className='flex items-start justify-end px-5 pt-5 rounded-t'>
                            <button
                              className='float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none'
                              // onClick={() => setShowModal(false)}
                              onClick={handleCheckboxClose}
                            >
                              <svg
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  d='M13.4099 12.0002L17.7099 7.71019C17.8982 7.52188 18.004 7.26649 18.004 7.00019C18.004 6.73388 17.8982 6.47849 17.7099 6.29019C17.5216 6.10188 17.2662 5.99609 16.9999 5.99609C16.7336 5.99609 16.4782 6.10188 16.2899 6.29019L11.9999 10.5902L7.70994 6.29019C7.52164 6.10188 7.26624 5.99609 6.99994 5.99609C6.73364 5.99609 6.47824 6.10188 6.28994 6.29019C6.10164 6.47849 5.99585 6.73388 5.99585 7.00019C5.99585 7.26649 6.10164 7.52188 6.28994 7.71019L10.5899 12.0002L6.28994 16.2902C6.19621 16.3831 6.12182 16.4937 6.07105 16.6156C6.02028 16.7375 5.99414 16.8682 5.99414 17.0002C5.99414 17.1322 6.02028 17.2629 6.07105 17.3848C6.12182 17.5066 6.19621 17.6172 6.28994 17.7102C6.3829 17.8039 6.4935 17.8783 6.61536 17.9291C6.73722 17.9798 6.86793 18.006 6.99994 18.006C7.13195 18.006 7.26266 17.9798 7.38452 17.9291C7.50638 17.8783 7.61698 17.8039 7.70994 17.7102L11.9999 13.4102L16.2899 17.7102C16.3829 17.8039 16.4935 17.8783 16.6154 17.9291C16.7372 17.9798 16.8679 18.006 16.9999 18.006C17.132 18.006 17.2627 17.9798 17.3845 17.9291C17.5064 17.8783 17.617 17.8039 17.7099 17.7102C17.8037 17.6172 17.8781 17.5066 17.9288 17.3848C17.9796 17.2629 18.0057 17.1322 18.0057 17.0002C18.0057 16.8682 17.9796 16.7375 17.9288 16.6156C17.8781 16.4937 17.8037 16.3831 17.7099 16.2902L13.4099 12.0002Z'
                                  fill='black'
                                />
                              </svg>
                            </button>
                          </div>
                          {/*body*/}
                          <div className='px-6 pb-5'>
                            <div className='flex justify-center'>
                              <img src={AddOns} alt='Logo AddOns' />
                            </div>
                            <h1 className='md:text-lg text-sm font-medium text-center text-black'>
                              Anda akan dikenakan biaya tambahan untuk add ons
                            </h1>
                            <h1 className='md:text-sm text-xs text-dark-4 text-center'>
                              Biaya yang dikenakan akan disesuaikan dengan kebutuhan tambahan yang anda ajukan.
                            </h1>
                          </div>
                          {/*footer*/}
                          <div className='flex items-center justify-center gap-4 p-6 rounded-b'>
                            <button
                              className='text-cherry text-xs lg:text-base md:py-2 px-4 py-2 bg-[#EDEDED] rounded-lg hover:bg-cherry hover:text-white'
                              type='button'
                              // onClick={() => setShowModal(false)}
                              onClick={handleCheckboxClose}
                            >
                              Tidak, Batalkan
                            </button>
                            <button
                              className='text-xs lg:text-base md:py-2 px-4 py-2  text-white border-2 rounded-lg border-cherry bg-cherry hover:bg-violet-900'
                              type='button'
                              onClick={() => {
                                setShowModal2(true);
                                setShowModal(false);
                              }}
                            >
                              Ya, Lanjut tambah Add ons
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='fixed inset-0 z-40 bg-black opacity-25'></div>
                  </>
                ) : null}
                {showModal2 ? (
                  <>
                    <div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none'>
                      <div className='relative w-full max-w-xl'>
                        {/*content*/}
                        <div className='relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none'>
                          {/*header*/}
                          <div className='flex items-start justify-between px-5 pt-5 rounded-t'>
                            <h1 className='text-lg font-semibold text-black'>Tambah Add Ons</h1>
                            <button
                              className='float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none'
                              // onClick={() => setShowModal2(false)}
                              onClick={handleCheckboxClose}
                            >
                              <svg
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  d='M13.4099 12.0002L17.7099 7.71019C17.8982 7.52188 18.004 7.26649 18.004 7.00019C18.004 6.73388 17.8982 6.47849 17.7099 6.29019C17.5216 6.10188 17.2662 5.99609 16.9999 5.99609C16.7336 5.99609 16.4782 6.10188 16.2899 6.29019L11.9999 10.5902L7.70994 6.29019C7.52164 6.10188 7.26624 5.99609 6.99994 5.99609C6.73364 5.99609 6.47824 6.10188 6.28994 6.29019C6.10164 6.47849 5.99585 6.73388 5.99585 7.00019C5.99585 7.26649 6.10164 7.52188 6.28994 7.71019L10.5899 12.0002L6.28994 16.2902C6.19621 16.3831 6.12182 16.4937 6.07105 16.6156C6.02028 16.7375 5.99414 16.8682 5.99414 17.0002C5.99414 17.1322 6.02028 17.2629 6.07105 17.3848C6.12182 17.5066 6.19621 17.6172 6.28994 17.7102C6.3829 17.8039 6.4935 17.8783 6.61536 17.9291C6.73722 17.9798 6.86793 18.006 6.99994 18.006C7.13195 18.006 7.26266 17.9798 7.38452 17.9291C7.50638 17.8783 7.61698 17.8039 7.70994 17.7102L11.9999 13.4102L16.2899 17.7102C16.3829 17.8039 16.4935 17.8783 16.6154 17.9291C16.7372 17.9798 16.8679 18.006 16.9999 18.006C17.132 18.006 17.2627 17.9798 17.3845 17.9291C17.5064 17.8783 17.617 17.8039 17.7099 17.7102C17.8037 17.6172 17.8781 17.5066 17.9288 17.3848C17.9796 17.2629 18.0057 17.1322 18.0057 17.0002C18.0057 16.8682 17.9796 16.7375 17.9288 16.6156C17.8781 16.4937 17.8037 16.3831 17.7099 16.2902L13.4099 12.0002Z'
                                  fill='black'
                                />
                              </svg>
                            </button>
                          </div>
                          {/*body*/}
                          <div className='px-6 pb-5'>
                            <label
                              className='block text-[#5B6785] text-sm font-normal font-inter mt-5 mb-[10px]'
                              htmlFor='grid-business-permit'
                            >
                              Tuliskan service dukungan apa saja yang anda butuhkan.
                            </label>
                            <textarea
                              id='alamat'
                              onChange={(e) => setAddOns(e.target.value)}
                              rows='3'
                              className='block p-2.5 w-full mb-[20px] font-rubik border font-normal text-[16px] text-[#C0C6D4] bg-[#F9FBFC] border-[#CACACA] rounded-[12px] focus:outline-none focus:ring-white focus:border-white dark:bg-[#F9FBFC] dark:border-white dark:placeholder-gray-400 dark:text-[#C0C6D4] dark:focus:ring-white dark:focus:border-white'
                              placeholder='Ex : Saya membutuhkan 2 orang account executive dan 1 orang project officer'
                            ></textarea>
                          </div>
                          {/*footer*/}
                          <div className='flex items-center justify-center gap-4 p-6 rounded-b'>
                            <button
                              className='text-cherry px-5 py-2 bg-[#EDEDED] text-base rounded-lg hover:bg-cherry hover:text-white'
                              type='button'
                              // onClick={() => setShowModal2(false)}
                              onClick={handleCheckboxClose}
                            >
                              Tidak, Batalkan
                            </button>
                            <button
                              className='px-5 py-2 text-base text-white border-2 rounded-lg border-cherry bg-cherry hover:bg-violet-900'
                              type='button'
                              onClick={() => submitAddOns()}
                            >
                              Ya, Lanjut tambah Add ons
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='fixed inset-0 z-40 bg-black opacity-25'></div>
                  </>
                ) : null}
                {showModal3 ? (
                  <>
                    <div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none'>
                      <div className='relative w-full max-w-xl'>
                        {/*content*/}
                        <div className='relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none'>
                          {/*header*/}
                          <div className='flex items-start justify-end px-5 pt-5 rounded-t'>
                            <button
                              className='float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none'
                              onClick={() => setShowModal3(false)}
                            >
                              <svg
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  d='M13.4099 12.0002L17.7099 7.71019C17.8982 7.52188 18.004 7.26649 18.004 7.00019C18.004 6.73388 17.8982 6.47849 17.7099 6.29019C17.5216 6.10188 17.2662 5.99609 16.9999 5.99609C16.7336 5.99609 16.4782 6.10188 16.2899 6.29019L11.9999 10.5902L7.70994 6.29019C7.52164 6.10188 7.26624 5.99609 6.99994 5.99609C6.73364 5.99609 6.47824 6.10188 6.28994 6.29019C6.10164 6.47849 5.99585 6.73388 5.99585 7.00019C5.99585 7.26649 6.10164 7.52188 6.28994 7.71019L10.5899 12.0002L6.28994 16.2902C6.19621 16.3831 6.12182 16.4937 6.07105 16.6156C6.02028 16.7375 5.99414 16.8682 5.99414 17.0002C5.99414 17.1322 6.02028 17.2629 6.07105 17.3848C6.12182 17.5066 6.19621 17.6172 6.28994 17.7102C6.3829 17.8039 6.4935 17.8783 6.61536 17.9291C6.73722 17.9798 6.86793 18.006 6.99994 18.006C7.13195 18.006 7.26266 17.9798 7.38452 17.9291C7.50638 17.8783 7.61698 17.8039 7.70994 17.7102L11.9999 13.4102L16.2899 17.7102C16.3829 17.8039 16.4935 17.8783 16.6154 17.9291C16.7372 17.9798 16.8679 18.006 16.9999 18.006C17.132 18.006 17.2627 17.9798 17.3845 17.9291C17.5064 17.8783 17.617 17.8039 17.7099 17.7102C17.8037 17.6172 17.8781 17.5066 17.9288 17.3848C17.9796 17.2629 18.0057 17.1322 18.0057 17.0002C18.0057 16.8682 17.9796 16.7375 17.9288 16.6156C17.8781 16.4937 17.8037 16.3831 17.7099 16.2902L13.4099 12.0002Z'
                                  fill='black'
                                />
                              </svg>
                            </button>
                          </div>
                          {/*body*/}
                          <div className='px-6 pb-5'>
                            <div className='flex justify-center'>
                              <img src={Publikasi} alt='Logo AddOns' />
                            </div>
                            <h1 className='text-lg font-medium text-center text-black'>Publikasi Open Tender </h1>
                            <h1 className='text-sm text-[#5C5C5C] text-center mt-3'>
                              Apakah anda yakin untuk publikasi tender yang telah anda buat?
                            </h1>
                          </div>
                          {/*footer*/}
                          <div className='flex items-center justify-center gap-4 p-6 rounded-b'>
                            <button
                              className='text-cherry px-5 py-2 bg-[#EDEDED] text-base rounded-lg hover:bg-cherry hover:text-white'
                              type='button'
                              onClick={() => setShowModal3(false)}
                            >
                              Tidak, Batalkan
                            </button>
                            <button
                              className='px-5 py-2 text-base text-white border-2 rounded-lg border-cherry bg-cherry hover:bg-violet-900'
                              type='button'
                              onClick={() => {
                                postData();
                                setShowModal3(false);
                              }}
                            >
                              Ya, Publikasikan
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='fixed inset-0 z-40 bg-black opacity-25'></div>
                  </>
                ) : null}
                {showModal4 ? (
                  <>
                    <div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none'>
                      <div className='relative w-full max-w-xl'>
                        {/*content*/}
                        <div className='relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none'>
                          {/*header*/}
                          <div className='flex items-start justify-end px-5 pt-5 rounded-t'>
                            <button
                              className='float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none'
                              onClick={() => setShowModal4(false)}
                            >
                              <svg
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  d='M13.4099 12.0002L17.7099 7.71019C17.8982 7.52188 18.004 7.26649 18.004 7.00019C18.004 6.73388 17.8982 6.47849 17.7099 6.29019C17.5216 6.10188 17.2662 5.99609 16.9999 5.99609C16.7336 5.99609 16.4782 6.10188 16.2899 6.29019L11.9999 10.5902L7.70994 6.29019C7.52164 6.10188 7.26624 5.99609 6.99994 5.99609C6.73364 5.99609 6.47824 6.10188 6.28994 6.29019C6.10164 6.47849 5.99585 6.73388 5.99585 7.00019C5.99585 7.26649 6.10164 7.52188 6.28994 7.71019L10.5899 12.0002L6.28994 16.2902C6.19621 16.3831 6.12182 16.4937 6.07105 16.6156C6.02028 16.7375 5.99414 16.8682 5.99414 17.0002C5.99414 17.1322 6.02028 17.2629 6.07105 17.3848C6.12182 17.5066 6.19621 17.6172 6.28994 17.7102C6.3829 17.8039 6.4935 17.8783 6.61536 17.9291C6.73722 17.9798 6.86793 18.006 6.99994 18.006C7.13195 18.006 7.26266 17.9798 7.38452 17.9291C7.50638 17.8783 7.61698 17.8039 7.70994 17.7102L11.9999 13.4102L16.2899 17.7102C16.3829 17.8039 16.4935 17.8783 16.6154 17.9291C16.7372 17.9798 16.8679 18.006 16.9999 18.006C17.132 18.006 17.2627 17.9798 17.3845 17.9291C17.5064 17.8783 17.617 17.8039 17.7099 17.7102C17.8037 17.6172 17.8781 17.5066 17.9288 17.3848C17.9796 17.2629 18.0057 17.1322 18.0057 17.0002C18.0057 16.8682 17.9796 16.7375 17.9288 16.6156C17.8781 16.4937 17.8037 16.3831 17.7099 16.2902L13.4099 12.0002Z'
                                  fill='black'
                                />
                              </svg>
                            </button>
                          </div>
                          {/*body*/}
                          <div className='px-6 pb-5'>
                            <div className='flex justify-center'>
                              <img src={Publikasi} alt='Logo AddOns' />
                            </div>
                            <h1 className='text-lg font-medium text-center text-black'>Submit Open Tender </h1>
                            <h1 className='text-sm text-[#5C5C5C] text-center mt-3'>
                              Apakah anda yakin untuk publikasi tender yang telah anda buat?
                            </h1>
                            <h1 className='text-sm text-[#5C5C5C] text-center mt-3'>
                              Tender yang anda buat menggunakan <span className='font-bold'>Add Ons</span>, pihak konect
                              akan menghubungi anda. Open tender yang anda buat akan terpublikasi setelah pembayaran add
                              ons berhasil.{' '}
                            </h1>
                          </div>
                          {/*footer*/}
                          <div className='flex items-center justify-center gap-4 p-6 rounded-b'>
                            <button
                              className='text-cherry px-5 py-2 bg-[#EDEDED] text-base rounded-lg hover:bg-cherry hover:text-white'
                              type='button'
                              onClick={() => setShowModal4(false)}
                            >
                              Tidak, Batalkan
                            </button>
                            <button
                              className='px-5 py-2 text-base text-white border-2 rounded-lg border-cherry bg-cherry hover:bg-violet-900'
                              type='button'
                              // onClick={() => {setShowModal(false) }}
                            >
                              Ya, Publikasikan
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='fixed inset-0 z-40 bg-black opacity-25'></div>
                  </>
                ) : null}

                {/* <div className='flex items-end justify-end space-x-4'>
                                <button onClick={() => setStepp(stepp-1)} className='w-full md:w-[160px] h-[39px] rounded-md border-cherry border-2 text-cherry font-[500]'>Batalkan</button>
                                <button onClick={() => setStepp(stepp+1)} className='w-full md:w-[160px] h-[39px] rounded-md bg-cherry text-white flex items-center justify-center font-[500]'>Lanjutkan</button>

                            </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default TambahTender