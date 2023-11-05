import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Api from '../../../../Api'
import { IconCheckWhite, IconDelete, IconNext, IconPdf, IconUploadImage } from '../../../../assets'
import { FooterTwo, Navbar } from '../../../../component'

const LayananTalent = () => {

    const navigate = useNavigate();
    const [stepp, setStepp] = useState(1);
    const [isLoading, setIsLoading] = useState(false)
    const [currentStep, setCurrentStep] = useState();
    const [image, setImage] = useState();
    const [talentName, setTalentName] = useState('');
    const [talentDescription, setTalentDescription] = useState();
    const [talentSpesifikasiLayanan, setTalentSpesifikasiLayanan] = useState();
    const [selectedOption, setSelectedOption] = useState('');

    const [selectDisc, setSelectDisc] = useState('Persentase');
    const handleshowhide = (e) => {
        const getNominal = e.target.value;

        setSelectDisc(getNominal);

    }
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const _renderCurrency = (value) => {
        let number = Number(value)
        return number?.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
            minimumFractionDigits: 0
        })
    }

    const [package_disc_price, setPackage_disc_price] = useState();
    const [package_name, setPackage_name] = useState();
    const [package_disc_percentage, setPackage_disc_percentage] = useState();
    const [package_description, setPackage_description] = useState();
    const [package_total_price, setPackage_total_price] = useState();
    const [package_price, setPackage_price] = useState();
    const [images, setImages] = useState([]);
    const [message, setMessage] = useState();
    const [video, setVideo] = useState(null);
    const [opsiRangeValue, setOpsiRangeValue] = useState('');
    const [alert, setAlert] = useState('');

    const [pdf, setPdf] = useState(null);
    const [pdfName, setPdfName] = useState('');
    const [pdfFiles, setPdfFiles] = useState([]);


    const [inputFields, setInputFields] = useState([{

        package_name: '',
        package_description: '',
        package_price: [],
        package_disc_type: 'Persentase',
        package_disc_percentage: 0,
        package_disc_price: 0,
        package_total_price: 0,
        package_start_date: '',
        package_end_date: '',
        package_portofolio: '',
        package_qty: '',
        package_price_type: 'FIXED',
    }])

    const handleFilePdf = (index, e) => {
        const newFile = e.target.files[0];
        let data = [...inputFields];
        data[index]['package_portofolio'] = newFile;
        setInputFields(data);
        setPdfName(e.target.files[0].name)
    };

    const handleDeletePdf = () => {
        setPdf(null);
        setInputFields(prevState => {
            const newData = [...prevState];
            const pdfIndex = newData.findIndex(field => field.portofolio && field.portofolio.name === pdfFiles[0].name);
            if (pdfIndex !== -1) {
                newData[pdfIndex].portofolio = '';
            }
            return newData;
        });
        setPdfFiles([]);
    };

    const addFields = () => {
        let newfield = {

            package_name: '',
            package_description: '',
            package_price: [],
            package_disc_type: 'Persentase',
            package_disc_percentage: '',
            package_disc_price: '',
            package_total_price: '',
            package_start_date: '',
            package_end_date: '',
            package_portofolio: '',
            package_qty: '',
            package_price_type: 'FIXED',
        }
        setInputFields([...inputFields, newfield])
    }

    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1);
        setInputFields(data);

        let pdfs = [...pdfFiles];
        pdfs.splice(index, 1);
        setPdfFiles(pdfs);
    };
    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        if (event.target.name === 'package_price') {
            data[index]['package_total_price'] = event.target.value
        } else if (event.target.name === 'package_disc_percentage') {
            data[index]['package_disc_price'] = ''
            data[index]['package_total_price'] = data[index]['package_price'] - ((event.target.value / 100) * data[index]['package_price'])
        } else if (event.target.name === 'package_disc_price') {
            data[index]['package_disc_percentage'] = ''
            data[index]['package_total_price'] = data[index]['package_price'] - event.target.value
        }
        setInputFields(data);
    }

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

    const filePickerRef = useRef(null);
    const onFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setVideo(selectedFile);
        }
    }

    const clearFiles = () => {
        setVideo(null);
    }

    const AddLayananTalent = async () => {
        setIsLoading(true);

        const error = [];
        for (let i = 0; i < inputFields.length; i++) {
            if (inputFields[i].package_name === '') {
                error.push('Nama Paket belum terisi')
            }
            if (inputFields[i].package_start_date === '') {
                error.push('Ketersediaan tanggal booking belum terisi')
            }
            if (inputFields[i].package_end_date === '') {
                error.push('Ketersediaan tanggal booking belum terisi')
            }
            if (inputFields[i].package_price.length === 0) {
                error.push('Harga belum terisi')
            }
            if (inputFields[i].package_qty === '') {
                error.push('Kuantitas belum terisi')
            }
            if (inputFields[i].package_description === '') {
                error.push('Deskripsi paket belum terisi')
            }

        }
        if (error.length > 0) {
            setAlert(error[0])
            setIsLoading(false);
        } else {

            const formData = new FormData();

            for (let i = 0; i < images.length; i++) {
                formData.append("images", images[i]);
            }

            formData.append("talent_name", talentName);
            formData.append("deskripsiLayanan", talentDescription);
            formData.append("spesifikasiLayanan", talentSpesifikasiLayanan);

            for (let i = 0; i < inputFields.length; i++) {
                formData.append("package_name", inputFields[i].package_name);
                formData.append("package_description", inputFields[i].package_description);
                formData.append("package_price", inputFields[i].package_price_type === 'RANGE' ? inputFields[i].package_price + ' ' + '-' + ' ' + opsiRangeValue : inputFields[i].package_price);
                formData.append("package_disc_percentage", !inputFields[i].package_disc_percentage ? 0 : inputFields[i].package_disc_percentage);
                formData.append("package_disc_price", !inputFields[i].package_disc_price ? 0 : inputFields[i].package_disc_price);
                formData.append("package_total_price", inputFields[i].package_total_price);
                formData.append("package_start_date", inputFields[i].package_start_date);
                formData.append("package_end_date", inputFields[i].package_end_date);
                formData.append("package_qty", inputFields[i].package_qty);
                formData.append("package_portofolio", inputFields[i].package_portofolio);
                formData.append("package_price_type", inputFields[i].package_price_type);
            }

            try {
                await Api.createTalent(localStorage.getItem("token-hub"), formData).then(async (response) => {
                    console.log(response.data)
                    navigate(-1)
                })
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className='bg-[#E3E8F1] min-h-screen font-inter'>
            <Navbar />
            <div className='md:px-[75px] px-[10px] pt-[120px] pb-[10px] md:pt-[140px] md:pb-[30px]'>
                {/* Section 1 */}
                <div>
                    <div className='flex items-center gap-3'>
                        <button onClick={() => navigate(-1)} className='text-black-k text-xs md:text-sm font-[500] hover:text-primary'>Beranda</button>
                        <img src={IconNext} alt='' />
                        <button className='text-black-k text-xs md:text-sm font-[500] hover:text-primary'>Profil</button>
                    </div>
                    {/* {alert != '' &&
                        <div id="alert-2" class="flex p-4 mb-4 text-red-800 rounded-lg bg-red-50" role="alert">
                            <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                            <span class="sr-only">Info</span>
                            <div class="ml-3 text-sm font-medium">
                                {alert}
                            </div>
                            <button onClick={() => setAlert('')} type="button" class="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8" data-dismiss-target="#alert-2" aria-label="Close">
                                <span class="sr-only">Close</span>
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                    } */}
                    <div className='flex lg:flex-row flex-col gap-[30px] mt-[30px]'>
                        <div className='md:px-4 md:py-12 rounded-[12px] bg-white px-7 py-5 h-max'>
                            <div className='flex items-center gap-[20px] relative'>
                                <div className={`h-[50px] w-[50px] flex justify-center items-center rounded-full flex-shrink-0 ${stepp === 2 ? 'bg-[#00CDB4]' : 'bg-[#00CDB433]'}  `}>
                                    <h1 className='text-primary font-semibold text-[18px]'>{stepp === 2 ? <span><img src={IconCheckWhite} alt='' /></span> : '1'}</h1>
                                </div>
                                <div>
                                    <h1 className={`text-[#212121]  ${stepp == 2 ? 'font-bold' : 'font-[500]'}`}>Informasi Layanan </h1>
                                    <p className='text-gray-400 text-[12px]'>Masukan informasi seputar layanan</p>
                                </div>
                                <div className='w-0.5 h-[38px] bg-[#C0C6D4] absolute -bottom-[37px] left-6' />
                            </div>
                            <div className='flex items-center gap-[20px] mt-[37px]'>
                                <div className={`h-[50px] w-[50px] flex justify-center items-center rounded-full flex-shrink-0 ${stepp > 2 ? 'bg-[#00CDB4]' : 'bg-[#00CDB433]'}  `}>
                                    <h1 className='text-primary font-semibold text-[18px]'>2</h1>
                                </div>
                                <div>
                                    <h1 className='text-[#212121] font-[500] text-sm md:text-base'>Pengaturan Paket</h1>
                                    <p className='text-gray-400 text-[12px]'>Informasi paket layanan</p>
                                </div>
                            </div>
                        </div>
                        <div className='w-full rounded-[12px] bg-white px-4 md:px-[40px] md:py-[30px] py-5'>
                            {stepp === 1 &&
                                <div>
                                    <div className='mb-[24px]'>
                                        <h1 className='md:text-[28px] text-[14px] md:mb-[30px] mb-[9px] font-bold text-cherry'>Informasi Layanan</h1>
                                    </div>
                                    <div className='flex flex-col'>
                                        <h1 className='md:text-xl text-xs md:mb-[30px] mb-5 font-semibold text-black-k'>Pengaturan Paket </h1>
                                        <div className='flex flex-col gap-[20px] mb-[52px]'>
                                            <div>
                                                <h1 className='md:text-sm text-xs text-dark-5 font-medium'>Nama Layanan <span className='text-red-700'>*</span></h1>
                                                <input type="text" id="first_name" className="mt-[10px] rounded-[12px] outline-none border border-outline-2 w-full md:px-4 md:py-4 bg-white px-[10px] py-[10px] text-fill md:text-sm text-xs font-[500]" placeholder="Ex : Starter" onChange={(e) => setTalentName(e.target.value)} required />
                                            </div>
                                            <div>
                                                <h1 className='md:text-sm text-xs text-dark-5 font-medium'>Deskripsi Layanan <span className='text-red-700'>*</span></h1>
                                                <textarea onChange={(e) => setTalentDescription(e.target.value)} id="message" rows="2" className="rounded-[12px] outline-none border border-outline-2 w-full md:px-4 md:py-4  bg-white px-[10px] py-[10px] text-fill md:text-sm text-xs font-[500]" placeholder="Jelaskan apa yang akan client dapat pada Layanan ini"></textarea>
                                                <div className='flex justify-between'>
                                                    <h1 className='md:text-xs text-[8px] text-black-6 font-bold'>Minimal 12 karakter</h1>
                                                    <h1 className='md:text-xs text-[8px] text-black-6 font-bold'>0/1200</h1>

                                                </div>
                                            </div>
                                            <div>
                                                <h1 className='md:text-sm text-xs text-dark-5 font-medium'>Spesifikasi Layanan <span className='text-red-700'>*</span></h1>
                                                <textarea onChange={(e) => setTalentSpesifikasiLayanan(e.target.value)} rows="2" className="rounded-[12px] outline-none border border-outline-2 w-full md:px-4 md:py-4  bg-white px-[10px] py-[10px] text-fill md:text-sm text-xs font-[500]" placeholder="Tuliskan lebih detail spesifikasi dari layanan anda "></textarea>
                                                <div className='flex justify-between'>
                                                    <h1 className='md:text-xs text-[8px] text-black-6 font-bold'>Minimal 12 karakter</h1>
                                                    <h1 className='md:text-xs text-[8px] text-black-6 font-bold'>0/1200</h1>
                                                </div>
                                            </div>
                                            <div>
                                                <h1 className='md:text-sm text-xs text-dark-5 font-medium'>Upload Foto Layanan<span className='text-red-700'>*</span></h1>
                                                <div className='flex flex-row  md:space-x-10 space-x-4 mt-[10px] '>
                                                    <div className="">
                                                        <div className="flex items-center justify-center w-full">
                                                            <label htmlFor='upload-foto' className="cursor-pointer">
                                                                <div className="md:w-[150px] md:h-[150px] w-20 h-20 rounded-[10px] border-2 border-primary flex flex-col items-center justify-center bg-cover">
                                                                    <img src={IconUploadImage} alt='' className='w-9 h-9 md:w-max md:h-auto' />
                                                                    <h1 className="text-primary md:mt-[10px] mt-1 md:text-sm text-[8px]">Tambah</h1>
                                                                    <h1 className="text-primary md:text-sm text-[8px]">Foto {images.length}/10</h1>
                                                                </div>
                                                                {images.length <= 9 ?
                                                                    <input id='upload-foto' accept="image/*" type="file" multiple onChange={handleFile} className='rounded-[12px] outline-none border border-outline-2 w-full md:px-4 md:py-4 bg-white px-[10px] py-[10px] hidden' />
                                                                    :
                                                                    null
                                                                }
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <ul class="list-disc text-dark-6 text-[10px] md:text-[13px] font-medium py-5 md:py-0">
                                                        <li>Ukuran: Maks. 10 MB</li>
                                                        <li>Format: JPG, JPEG, PNG </li>
                                                    </ul>
                                                </div>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {images.map((file, index) => {
                                                        return (
                                                            <div key={index} className="overflow-hidden">
                                                                <div className='relative'>
                                                                    <div className='absolute -right-0 -top-0'>
                                                                        <button onClick={() => { removeImage(index) }} className="cursor-pointer bg-red-500 text-white hover:bg-red-700  w-6 h-6 flex items-center justify-center rounded-full">x</button>
                                                                    </div>
                                                                    <img className="h-20 w-20 rounded-md" src={file} alt={`Image ${index}`} />
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex justify-end items-end space-x-4'>
                                            <button onClick={() => navigate(-1)} className='md:py-3 md:px-8 py-2 px-5 text-sm rounded-md border-cherry border-2 text-cherry font-[500]'>Batalkan</button>
                                            <button
                                                onClick={() => {
                                                    !talentName || !talentDescription || !talentSpesifikasiLayanan || !images.length ?
                                                        toast.error(`Harap isi seluruh data Informasi Layanan`, {
                                                            position: "top-center",
                                                            autoClose: 5000,
                                                            hideProgressBar: false,
                                                            closeOnClick: true,
                                                            pauseOnHover: true,
                                                            draggable: true,
                                                            progress: undefined,
                                                            theme: "light",
                                                            style: {
                                                                fontSize: 12
                                                            }
                                                        }) :
                                                        setStepp(stepp + 1)
                                                }}
                                                // disabled={!venueName || !venueDescription || !images}
                                                className='h-auto md:py-3 md:px-6 py-2 px-5 text-sm rounded-md bg-cherry text-white flex items-center justify-center font-[500]'
                                            >
                                                Lanjutkan
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            }
                            {stepp === 2 &&
                                <div className='flex flex-col'>
                                    <div className='flex flex-col gap-[20px] mb-[52px]'>
                                        {inputFields.map((input, index) => {
                                            return (
                                                <div key={index}>
                                                    <h1 className='md:text-[28px] text-[14px] md:mb-[30px] mb-[9px] font-bold text-cherry'>Pengaturan Paket {index + 1}</h1>
                                                    {alert != '' &&
                                                        <div id="alert-2" class="flex p-4 mb-4 text-red-800 rounded-lg bg-red-50" role="alert">
                                                            <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                                                            <span class="sr-only">Info</span>
                                                            <div class="ml-3 text-sm font-medium">
                                                                {alert}
                                                            </div>
                                                            <button onClick={() => setAlert('')} type="button" class="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8" data-dismiss-target="#alert-2" aria-label="Close">
                                                                <span class="sr-only">Close</span>
                                                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                            </button>
                                                        </div>
                                                    }
                                                    <div className='rounded-lg bg-light w-full p-5'>
                                                        <div className='space-y-[10px] mb-[10px]'>
                                                            <h1 className='md:text-sm text-xs text-black-k font-medium'>Varian Paket <span className='text-red-700'>*</span></h1>
                                                            <input type='text' name='package_name' value={input.package_name} onChange={(e) => handleFormChange(index, e)} className='rounded-[12px] outline-none border border-outline-2 w-full md:px-4 md:py-4  bg-white px-[10px] py-[10px] text-fill md:text-sm text-xs font-[500]' placeholder='Ex : Starter ' required />
                                                        </div>
                                                        <div className='space-y-[10px] mb-[10px]'>
                                                            <h1 className='md:text-sm text-xs text-black-k font-medium'>Ketersediaan tanggal booking<span className='text-[#C1121F] ml-[10px]'>*</span></h1>
                                                            <div className='flex flex-col md:flex-row items-end justify-between gap-[20px] w-full'>
                                                                <div className='w-full'>
                                                                    <input type='date' value={input.package_start_date} name='package_start_date' onChange={event => handleFormChange(index, event)} className='rounded-[12px] outline-none border border-outline-2 w-full md:px-4 md:py-4  bg-white px-[10px] py-[10px] text-fill md:text-sm text-xs font-[500]' placeholder='dd/mm/yyyy - dd/mm/yyyy' required />
                                                                </div>
                                                                <div className='w-full'>
                                                                    <input type='date' value={input.package_end_date} name='package_end_date' onChange={event => handleFormChange(index, event)} className='rounded-[12px] outline-none border border-outline-2 w-full md:px-4 md:py-4  bg-white px-[10px] py-[10px] text-fill md:text-sm text-xs font-[500]' placeholder='dd/mm/yyyy - dd/mm/yyyy' required />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='space-y-[10px] mb-[10px]'>
                                                            <h1 className='md:text-sm text-xs text-black-k font-medium'>Portofolio</h1>
                                                            <div className='flex md:space-x-10 space-x-4 mt-[10px] '>
                                                                <div className="">
                                                                    <div className="flex items-center justify-center w-full">
                                                                        <label htmlFor={`pdf-upload-${index}`} className="cursor-pointer">
                                                                            <div className="md:w-[150px] md:h-[150px] w-[100px] h-[100px] rounded-[10px] border-2 border-gray-700 border-dashed flex flex-col items-center justify-center bg-cover">
                                                                                <img src={IconPdf} alt='' />
                                                                                <h1 className="text-dark-5 mt-[10px] text-[11px] md:text-[14px]">{!input.package_portofolio.name ? 'Upload File' : 'Change File'}</h1>
                                                                            </div>
                                                                            <input
                                                                                id={`pdf-upload-${index}`}
                                                                                accept=".pdf"
                                                                                type="file"
                                                                                name="package_portofolio"
                                                                                onChange={(e) => handleFilePdf(index, e)}
                                                                                className='rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] hidden'
                                                                            />
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <ul class="list-disc text-dark-6 text-[10px] md:text-[13px] font-medium py-5 md:py-0">
                                                                    <li>Ukuran: Maks. 5 MB</li>
                                                                    <li>Format: PDF </li>
                                                                    <li>File Name: {!input.package_portofolio.name ? '-' : input.package_portofolio.name} </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        {/* <div className='space-y-[10px] md:col-span-4 col-span-6 mb-[10px]'>
                                                            <h1 className='md:text-sm text-xs text-dark-5 font-medium'>Opsi Harga <span className='text-red-700'>*</span></h1>
                                                            <select value={input.package_price_type} name='package_price_type' onChange={(e) => handleFormChange(index, e)} className='rounded-[12px] outline-none border border-[#E3E8F1] w-full appearance-none px-[20px] py-[15px] relative text-[#A8A8A8] text-sm font-[500]'>
                                                                <option value="" >Pilih Opsi Harga</option>
                                                                <option value="FIXED">Harga Pasti (Harga layanan sudah pasti untuk kuantitas yang sudah di tentukan ) </option>
                                                                <option value="RANGE">Range Harga (Harga layanan berupa harga antara harga minimum dan harga maksimum)</option>
                                                            </select>
                                                        </div> */}
                                                        <div className='md:grid md:grid-cols-12 mb-[10px] gap-[20px]'>
                                                            <div className='w-full md:col-span-4'>
                                                                <h1 className='md:text-sm text-xs text-black-k font-medium md:mt-0 mt-3'>Harga <span className='text-red-700'>*</span></h1>
                                                                <input type='number' value={input.package_price} name='package_price' onChange={(e) => handleFormChange(index, e)} className='rounded-[12px] outline-none border border-outline-2 w-full md:px-4 md:py-4  bg-white px-[10px] py-[10px] text-fill md:text-sm text-xs font-[500] md:mt-0 mt-3' placeholder='Rp.' required />
                                                            </div>
                                                            {input.package_price_type === 'RANGE' && (
                                                                <div className='w-full md:col-span-4'>
                                                                    <div className='flex items-center gap-2 mt-5'>
                                                                        <svg width="19" height="2" viewBox="0 0 19 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M0 1H18.5" stroke="#2E3A44" stroke-opacity="0.5" stroke-width="2" />
                                                                        </svg>
                                                                        <input type='number' onChange={(e) => setOpsiRangeValue(e.target.value)} className='rounded-[12px] outline-none border border-outline-2 w-full md:px-4 md:py-4  bg-white px-[10px] py-[10px] text-fill md:text-sm text-xs font-[500]' placeholder='Rp.' required />
                                                                    </div>
                                                                </div>
                                                            )}
                                                            <div className='w-full md:col-span-4'>
                                                                <h1 className='md:text-sm text-xs text-black-k font-medium md:mt-0 mt-3'>Kuantitas <span className='text-red-700'>*</span></h1>
                                                                <input type='text' value={input.package_qty} name='package_qty' onChange={event => handleFormChange(index, event)} className='rounded-[12px] outline-none border border-outline-2 w-full md:px-4 md:py-4  bg-white px-[10px] py-[10px] text-fill md:text-sm text-xs font-[500] md:mt-0 mt-3' placeholder='Ex. Per Sesi' required />
                                                            </div>
                                                        </div>
                                                        {inputFields[index].package_price_type !== 'RANGE' && (
                                                            <div className='grid md:grid-cols-12 grid-cols-6 gap-[20px] mb-[10px]'>
                                                                <div className='space-y-[10px] md:col-span-4 col-span-6'>
                                                                    <h1 className='md:text-sm text-xs text-black-k font-medium'>Diskon <span className='text-red-700'>*</span></h1>
                                                                    <select name='package_disc_type' onChange={(e) => { handleFormChange(index, e) }} className='rounded-[12px] outline-none border border-outline-2 w-full appearance-none md:px-4 md:py-4 bg-white px-[10px] py-[10px] relative text-fill md:text-sm text-xs font-[500]'>
                                                                        <option value="" disabled>Pilih Jenis Diskon</option>
                                                                        {/* <option value={'Persentase'}>Persentase</option>
                                                                    <option value={'Nominal'}>Nominal</option> */}
                                                                        <option value='Persentase'>Persentase</option>
                                                                        <option value='Nominal'>Nominal</option>
                                                                    </select>


                                                                </div>
                                                                {
                                                                    input.package_disc_type === 'Persentase' && (
                                                                        <div className='space-y-[10px] md:col-span-4 col-span-6'>
                                                                            <h1 className='md:text-sm text-xs text-black-k font-medium'>Nilai Diskon <span className='text-red-700'>*</span></h1>
                                                                            <input type='number' value={input.package_disc_percentage} name='package_disc_percentage' onChange={(e) => handleFormChange(index, e)} className='rounded-[12px] outline-none border border-outline-2 w-full md:px-4 md:py-4  bg-white px-[10px] py-[10px] text-fill md:text-sm text-xs font-[500]' />
                                                                        </div>
                                                                    )

                                                                }
                                                                {
                                                                    input.package_disc_type === 'Nominal' && (
                                                                        <div className='space-y-[10px] md:col-span-4 col-span-6'>
                                                                            <h1 className='md:text-sm text-xs text-black-k font-medium'>Nilai Diskon <span className='text-red-700'>*</span></h1>
                                                                            <input type='number' value={input.package_disc_price} name='package_disc_price' onChange={event => handleFormChange(index, event)} className='rounded-[12px] outline-none border border-outline-2 w-full md:px-4 md:py-4  bg-white px-[10px] py-[10px] text-fill md:text-sm text-xs font-[500]' required />
                                                                        </div>
                                                                    )

                                                                }
                                                                <div className='space-y-[10px] md:col-span-4 col-span-6'>
                                                                    <h1 className='md:text-sm text-xs text-black-k font-medium'>Harga Tertampil <span className='text-red-700'>*</span></h1>
                                                                    <input type='text' value={input.package_total_price} name='package_total_price' onChange={event => handleFormChange(index, event)} className='rounded-[12px] outline-none border border-outline-2 w-full md:px-4 md:py-4  bg-white px-[10px] py-[10px] text-fill md:text-sm text-xs font-[500]' />
                                                                </div>

                                                            </div>
                                                        )}
                                                        <div className='space-y-[10px] mb-[10px]'>
                                                            <h1 className='md:text-sm text-xs text-black-k font-medium'>Deskripsi <span className='text-red-700'>*</span></h1>
                                                            <textarea rows={3} value={input.package_description} name='package_description' onChange={(e) => handleFormChange(index, e)} className='rounded-[12px] outline-none border border-outline-2 w-full md:px-4 md:py-4  bg-white px-[10px] py-[10px] text-fill md:text-sm text-xs font-[500]' placeholder='Tulis deskripsi paket disini' required />
                                                        </div>
                                                        <button onClick={removeFields}
                                                            className={`py-[20px] flex items-center justify-center w-full gap-[10px] ${index === 0 ? 'hidden' : 'block'}`}>
                                                            <img src={IconDelete} alt='' />
                                                            <h1 className='text-[#C1121F] text-sm font-[500]'>Hapus Paket</h1>
                                                        </button>

                                                    </div>

                                                </div>
                                            )
                                        })}
                                        <div className='mt-[20px]'>
                                            <h1 className='text-dark-4 md:text-sm mb-[10px]'>Perlu paket tambahan untuk menjangkau lebih banyak client?</h1>
                                            <button className='border border-primary flex items-center justify-center p-2.5 rounded-[10px] text-primary text-sm font-[500]' onClick={() => addFields()}>+ Buat Paket Lainnya</button>
                                        </div>
                                    </div>
                                    <div className='flex justify-end items-end space-x-4'>
                                        <button onClick={() => setStepp(stepp - 1)} className='md:py-3 md:px-8 py-2 px-5 text-sm rounded-md border-cherry border-2 text-cherry font-[500]'>Kembali</button>
                                        <button onClick={AddLayananTalent} className='h-auto md:py-3 md:px-6 py-2 px-5 text-sm rounded-md bg-cherry text-white flex items-center justify-center font-[500]'>
                                            {/* Simpan */}
                                            {isLoading ?
                                                <svg className='animate-spin text-center' width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                                    <path opacity='0.1' fillRule='evenodd' clipRule='evenodd' d='M15 5.625C12.5136 5.625 10.129 6.61272 8.37087 8.37087C6.61272 10.129 5.625 12.5136 5.625 15C5.625 17.4864 6.61272 19.871 8.37087 21.6291C10.129 23.3873 12.5136 24.375 15 24.375C17.4864 24.375 19.871 23.3873 21.6291 21.6291C23.3873 19.871 24.375 17.4864 24.375 15C24.375 12.5136 23.3873 10.129 21.6291 8.37087C19.871 6.61272 17.4864 5.625 15 5.625ZM1.875 15C1.875 7.75125 7.75125 1.875 15 1.875C22.2487 1.875 28.125 7.75125 28.125 15C28.125 22.2487 22.2487 28.125 15 28.125C7.75125 28.125 1.875 22.2487 1.875 15Z' fill='black' />
                                                    <path fillRule='evenodd' clipRule='evenodd' d='M15.0001 5.62502C12.583 5.61958 10.2583 6.55314 8.51632 8.22877C8.15542 8.56246 7.67791 8.74109 7.1866 8.7262C6.69529 8.71131 6.22948 8.50408 5.88945 8.14914C5.54942 7.7942 5.36236 7.31992 5.36856 6.82843C5.37475 6.33693 5.5737 5.86752 5.92257 5.52127C8.36247 3.17684 11.6164 1.86981 15.0001 1.87502C15.4974 1.87502 15.9743 2.07256 16.3259 2.42419C16.6775 2.77582 16.8751 3.25273 16.8751 3.75002C16.8751 4.2473 16.6775 4.72421 16.3259 5.07584C15.9743 5.42747 15.4974 5.62502 15.0001 5.62502Z' fill='white' />
                                                </svg>
                                                :
                                                'Simpan'
                                            }
                                        </button>

                                    </div>

                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
            <FooterTwo />
        </div>
    )
}

export default LayananTalent