import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Api from '../../../../Api'
import { BgDashboard, IconEdit, IconNext, IconUploadFile, IconUploadImageGray, IconUploadImage, Logo, LogoDefault } from '../../../../assets'
import { Navbar } from '../../../../component'
import imageHandle from '../../../../utils/imageHandle'
import { UrlApi } from '../../../../constants'

const CompanyProfilePartner = () => {
    const navigate = useNavigate()
    const params = useLocation()
    const [message, setMessage] = useState('')
    const [refreshData, setRefreshData] = useState(false);
    const [company, setCompany] = useState('');
    const [legalDoc, setLegalDoc] = useState('');
    
    // Company
    const [detail, setDetail] = useState('')
    const [companyId, setCompanyId] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [type, setType] = useState('')
    const [typeBusinessData, setTypeBusinessData] = useState([])
    const [typeBusiness, setTypeBusiness] = useState([''])
    const [typeSiup, setTypeSiup] = useState('')
    const [city, setCity] = useState('')
    const [province, setProvince] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [address, setAddress] = useState('')
    const [companyLogo, setCompanyLogo] = useState('')
    const [picName, setPicName] = useState('')
    const [picPosition, setPicPosition] = useState('')
    const [picPhone, setPicPhone] = useState('')
    const [picEmail, setPicEmail] = useState('')
    const [websiteUrl, setWebsiteUrl] = useState('')
    const [websiteType, setWebsiteType] = useState('')
    const [marketplaceUrl, setMarketplaceUrl] = useState('')
    const [marketplaceType, setMarketplaceType] = useState('')
    
    // Document
    const [document, setDocument] = useState('')
    const [documentId, setDocumentId] = useState('')
    const [typeDoc, setTypeDoc] = useState('')
    const [documentIdentities, setDocumentIdentities] = useState('')
    const [image, setImage] = useState('')
    const [path, setPath] = useState('')
    const [documentNIB, setDocumentNIB] = useState('')
    const [documentSIUP, setDocumentSIUP] = useState('')
    const [documentIUMK, setDocumentIUMK] = useState('')
    const [documentIUI, setDocumentIUI] = useState('')
    const [documentOther, setDocumentOther] = useState('')
    const [documentSertifikat, setDocumentSertifikat] = useState('')

    const handleChange = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]))
        const files = e.target.files;
        setMessage('')
        const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
        const imagePromises = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const name = file.name
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
            setCompanyLogo(base64Images);
        });
    };

    const handleTypeBusiness = (event) => {
        const checkboxValue = event.target.value;
        if (event.target.checked) {
            setTypeBusiness([...typeBusiness, checkboxValue]);
        } else {
            setTypeBusiness(typeBusiness.filter((value) => value !== checkboxValue));
        }
    };

    const [filesTypeBusiness, setFilesTypeBusiness] = useState([]);

    const handleTypeBusinessFile = (event) => {
        const uploadedFiles = event.target.files;
        // Convert the FileList object to an array
        const uploadedFilesArray = Array.from(uploadedFiles);
        setFilesTypeBusiness(uploadedFilesArray);
    }

    const getDataCompany = async () => {
        try {
            const response = await Api.getCompany(localStorage.getItem('token-hub'), params.state.id)
            // response.data.legal_documents.forEach(document => {
            //     document.path !== null ? setDocument("Ya") : setDocument("Tidak")
            // })
            response.data.legal_documents.length > 0 ? setDocument("Ya") : setDocument("Tidak")
            setDetail(response.data)
            setName(response.data.name)
            setDescription(response.data.description)
            setType(response.data.type)
            setTypeBusinessData(response.data.type_business)
            if (response.data.type_business !== null) {
                setTypeBusiness(response.data.type_business)
            } else {
                setTypeBusiness([])
            }
            setTypeSiup(response.data.type_siup)
            setAddress(response.data.address)
            setCity(response.data.city)
            setProvince(response.data.province)
            setPostalCode(response.data.postal_code)
            setPhone(response.data.phone)
            setEmail(response.data.email)
            setCompanyLogo(response.data.company_logo)
            setDocumentNIB(Object.values(response.data.legal_documents).find((item) => item.type === 'NIB'))
            setDocumentSIUP(Object.values(response.data.legal_documents).find((item) => item.type === 'SIUP'))
            setDocumentIUMK(Object.values(response.data.legal_documents).find((item) => item.type === 'IUMK'))
            setDocumentIUI(Object.values(response.data.legal_documents).find((item) => item.type === 'IUI'))
            setDocumentOther(Object.values(response.data.legal_documents).find((item) => item.type === 'Other'))
            setDocumentSertifikat(Object.values(response.data.legal_documents).find((item) => item.type === 'Sertification'))
            setPicName(response.data.pic_name)
            setPicEmail(response.data.pic_email)
            setPicPhone(response.data.pic_phone)
            setPicPosition(response.data.pic_position)
            setWebsiteType(response.data.website_type)
            setWebsiteUrl(response.data.website_url)
            setMarketplaceType(response.data.marketplace_type)
            setMarketplaceUrl(response.data.marketplace_url)
        } catch (error) {
            console.log(error.message)
        }
    }
    
    const postData = async () => {
        try {
            if (companyLogo === null) {
                const data = {
                    name: name,
                    description: description,
                    email: email,
                    phone: phone,
                    type: type,
                    type_business: JSON.stringify(typeBusiness),
                    type_siup: typeSiup,
                    city: city,
                    province: province,
                    postal_code: postalCode,
                    address: address,
                    company_logo: companyLogo,
                    pic_name: picName,
                    pic_email: picEmail,
                    pic_phone: picPhone,
                    pic_position: picPosition,
                    NIB_document: documentNIB,
                    SIUP_document: documentSIUP,
                    IUMK_document: documentIUMK,
                    IUI_document: documentIUI,
                    Other_document: documentOther,
                    website_url: websiteUrl,
                    website_type: websiteType,
                    marketplace_url: marketplaceUrl,
                    marketplace_type: marketplaceType,
                    Sertification_document: documentSertifikat,
                }

                const response = await Api.updateCompany(localStorage.getItem('token-hub'), params.state.id, data)
                setRefreshData(true)
                toast.success('Profil perusahaan berhasil di perbaharui', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",

                });
                navigate(-1)
            }
            
            else if (companyLogo[0]?.includes('base64')) {
                const data = {
                    name: name,
                    description: description,
                    email: email,
                    phone: phone,
                    type: type,
                    type_business: JSON.stringify(typeBusiness),
                    type_siup: typeSiup,
                    city: city,
                    province: province,
                    postal_code: postalCode,
                    address: address,
                    company_logo: companyLogo[0],
                    pic_name: picName,
                    pic_email: picEmail,
                    pic_phone: picPhone,
                    pic_position: picPosition,
                    NIB_document: documentNIB,
                    SIUP_document: documentSIUP,
                    IUMK_document: documentIUMK,
                    IUI_document: documentIUI,
                    Other_document: documentOther,
                    website_url: websiteUrl,
                    website_type: websiteType,
                    marketplace_url: marketplaceUrl,
                    marketplace_type: marketplaceType,
                    Sertification_document: documentSertifikat,
                }
                
                await Api.updateCompany(localStorage.getItem('token-hub'), params.state.id, data)
                setRefreshData(true)
                toast.success('Profil perusahaan berhasil di perbaharui', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",

                });
                navigate(-1)

            } else {
                const data = {
                    name: name,
                    description: description,
                    email: email,
                    phone: phone,
                    type: type,
                    type_business: JSON.stringify(typeBusiness),
                    type_siup: typeSiup,
                    city: city,
                    province: province,
                    postal_code: postalCode,
                    address: address,
                    pic_name: picName,
                    pic_email: picEmail,
                    pic_phone: picPhone,
                    pic_position: picPosition,
                    NIB_document: documentNIB,
                    SIUP_document: documentSIUP,
                    IUMK_document: documentIUMK,
                    IUI_document: documentIUI,
                    Other_document: documentOther,
                    website_url: websiteUrl,
                    website_type: websiteType,
                    marketplace_url: marketplaceUrl,
                    marketplace_type: marketplaceType,
                    Sertification_document: documentSertifikat,
                }
                
                if(!name || name === null) {
                    toast.error('Nama Perusahaan tidak boleh kosong', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }else if(!address || address === null) {
                    toast.error('Alamat tidak boleh kosong', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }else if(!city || city === null) {
                    toast.error('Kota tidak boleh kosong', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }else if(!phone || phone === null) {
                    toast.error('Nomor Telephone tidak boleh kosong', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }else if(!email || email === null) {
                    toast.error('Email tidak boleh kosong', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }else {
                    await Api.updateCompany(localStorage.getItem('token-hub'), params.state.id, data)
                    setRefreshData(true)
                    toast.success('Profil perusahaan berhasil di perbaharui', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
    
                    });
                    navigate(-1)
                }

            }
            
        } catch (error) {
            console.log(error)
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
        }
    }

    useEffect(() => {
        getDataCompany()
    }, [])


    return (
        <div className='bg-[#E3E8F1] min-h-screen'>
            <Navbar />
            <div className='md:px-[75px] px-[36px] pt-[120px] pb-[10px] md:pt-[140px] md:pb-[30px]'>
                <div className='flex items-center gap-3'>
                    <Link to={'/dashboard-stakeholder'} className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>Beranda</Link>
                    <img src={IconNext} />
                    <Link to={'/dashboard-stakeholder'} className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>Beranda Profil</Link>
                    <img src={IconNext} />
                    <Link to={''} className='text-[#737373] text-sm font-[500] hover:text-[#00CDB4]'>Profil Perusahaan</Link>
                </div>
                {/* Section 1 */}
                <div className='mt-[30px] flex items-center'>
                    <img src={!image ? imageHandle(companyLogo) === `${UrlApi}null` ? LogoDefault : imageHandle(companyLogo) : image} className='w-[170px] h-[170px] bg-white rounded-[20px] object-cover' />
                    <div className='bg-[#2D014B] h-[130px] w-full rounded-r-[20px] px-[32px] py-[28px] flex flex-col justify-center gap-3'>
                        <h1 className='text-white text-base md:text-[28px] font-bold'>{!company.name ? 'Konect-Hub' : company.name}</h1>
                        <h1 className='text-xs text-white md:text-base'>{!company.email ? 'Konect-Hub' : company.email}</h1>
                    </div>
                </div>
                {/* Section 2 */}
                <div className='mt-[50px]'>
                    <h1 className='text-[#2D014B font-[500]'>Informasi Perusahaan</h1>
                </div>

                <div className='flex flex-col md:flex-row justify-between gap-[89px]'>
                    <div className='w-full'>
                        <div className='w-fit mb-[20px]'>
                            <h1 className='text-[#2E3A44] text-[11px] font-[500] mb-[10px]'>Logo Perusahaan</h1>
                            <label htmlFor='upload-image' className='cursor-pointer'>
                                <div className='w-[105px] h-[105px] rounded-[12px] bg-white flex flex-col items-center justify-center bg-cover relative' style={{ backgroundImage: `url(${!image ? imageHandle(companyLogo) : image})` }}>
                                    <img src={IconUploadImageGray} alt='' />
                                    <div className='absolute bg-[#F9F9F9] border border-[#EBEBEB] w-[38px] h-[38px] rounded-full -bottom-3 -right-4 flex items-center justify-center'>
                                        <img src={IconEdit} alt='' />
                                    </div>
                                </div>
                                <input type='file' id='upload-image' onChange={(e) => handleChange(e)} className='rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] hidden' required />
                            </label>
                        </div>
                        <div className='w-full mb-[20px]'>
                            <h1 className='text-[#2E3A44] text-[11px] font-[500] mb-[10px]'>Nama Perusahaan</h1>
                            <input type='text' value={name} onChange={(e) => setName(e.target.value)} className='rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] text-[#A8A8A8] text-sm font-[500] bg-[#F9FBFC]' placeholder='Nama Perusahaan' required />
                        </div>
                        <div className='w-full mb-[20px]'>
                            <h1 className='text-[#2E3A44] text-[11px] font-[500] mb-[10px]'>Deskripsi</h1>
                            <textarea type='text' value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className='rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] text-[#A8A8A8] text-sm font-[500] bg-[#F9FBFC]' placeholder='Tambah Deskripsi' required />
                        </div>
                        <div className='w-full mb-[20px]'>
                            <h1 className='text-[#2E3A44] text-[11px] font-[500] mb-[10px]'>Badan Usaha</h1>
                            <div className='flex items-center'>
                                <div className="flex items-center mr-[30px]">
                                    <input id="radio1" type="radio" name="radioBadanUsaha" value='Perorangan' onChange={(e) => setType(e.target.value)} checked={type === 'Perorangan' ? true : false} className="hidden" />
                                    <label htmlFor="radio1" className="flex items-center cursor-pointer w-full py-4 ml-2 text-sm font-medium text-[#C0C6D4]">
                                        <span className="w-[16px] h-[16px] bg-white inline-block mr-2 rounded-full border border-white flex-no-shrink"></span>
                                        Perorangan</label>
                                </div>
                                <div className="flex items-center mr-[30px]">
                                    <input id="radio2" type="radio" name="radioBadanUsaha" value='UD' onChange={(e) => setType(e.target.value)} checked={type === 'UD' ? true : false} className="hidden" />
                                    <label htmlFor="radio2" className="flex items-center cursor-pointer w-full py-4 ml-2 text-sm font-medium text-[#C0C6D4]">
                                        <span className="w-[16px] h-[16px] bg-white inline-block mr-2 rounded-full border border-white flex-no-shrink"></span>
                                        UD</label>
                                </div>
                                <div className="flex items-center mr-[30px]">
                                    <input id="radio3" type="radio" name="radioBadanUsaha" value='CV' onChange={(e) => setType(e.target.value)} checked={type === 'CV' ? true : false} className="hidden" />
                                    <label htmlFor="radio3" className="flex items-center cursor-pointer w-full py-4 ml-2 text-sm font-medium text-[#C0C6D4]">
                                        <span className="w-[16px] h-[16px] bg-white inline-block mr-2 rounded-full border border-white flex-no-shrink"></span>
                                        CV</label>
                                </div>
                                <div className="flex items-center mr-[30px]">
                                    <input id="radio4" type="radio" name="radioBadanUsaha" value='PT' onChange={(e) => setType(e.target.value)} checked={type === 'PT' ? true : false} className="hidden" />
                                    <label htmlFor="radio4" className="flex items-center cursor-pointer w-full py-4 ml-2 text-sm font-medium text-[#C0C6D4]">
                                        <span className="w-[16px] h-[16px] bg-white inline-block mr-2 rounded-full border border-white flex-no-shrink"></span>
                                        PT</label>
                                </div>
                                <div className="flex items-center mr-[30px]">
                                    <input id="radio5" type="radio" name="radioBadanUsaha" value='Koperasi' onChange={(e) => setType(e.target.value)} checked={type === 'Koperasi' ? true : false} className="hidden" />
                                    <label htmlFor="radio5" className="flex items-center cursor-pointer w-full py-4 ml-2 text-sm font-medium text-[#C0C6D4]">
                                        <span className="w-[16px] h-[16px] bg-white inline-block mr-2 rounded-full border border-white flex-no-shrink"></span>
                                        Koperasi</label>
                                </div>
                            </div>
                        </div>
                        <div className='w-full mb-[20px]'>
                            <h1 className='text-[#2E3A44] font-[500] mb-[10px] text-base'>Jenis Badan Usaha</h1>
                            <div className='flex items-center'>
                                <div className="flex items-center gap-2 mr-[30px] pb-1.5">
                                    <input id="checkbox1" type="checkbox" name="jenis" value="Produsen" className='' onChange={handleTypeBusiness} checked={typeBusiness.includes('Produsen')} />
                                    <label htmlFor="checkbox1" className="cursor-pointer w-full text-sm font-medium text-[#C0C6D4] dark:text-[#C0C6D4]">Produsen</label>
                                </div>
                                <div className="flex items-center gap-2 mr-[30px] pb-1.5">
                                    <input id="checkbox2" type="checkbox" name="jenis" value="Distributor" className='' onChange={handleTypeBusiness} checked={typeBusiness.includes('Distributor')} />
                                    <label htmlFor="checkbox2" className="cursor-pointer w-full text-sm font-medium text-[#C0C6D4] dark:text-[#C0C6D4]">Distributor</label>
                                </div>
                                <div className="flex items-center gap-2 mr-[30px] pb-1.5">
                                    <input id="checkbox3" type="checkbox" name="jenis" value="Perdagangan" className='' onChange={handleTypeBusiness} checked={typeBusiness.includes('Perdagangan')} />
                                    <label htmlFor="checkbox3" className="cursor-pointer w-full text-sm font-medium text-[#C0C6D4] dark:text-[#C0C6D4]">Perdagangan</label>
                                </div>
                                <div className="flex items-center gap-2 mr-[30px] pb-1.5">
                                    <input id="checkbox4" type="checkbox" name="jenis" value="Retailer" className='' onChange={handleTypeBusiness} checked={typeBusiness.includes('Retailer')} />
                                    <label htmlFor="checkbox4" className="cursor-pointer w-full text-sm font-medium text-[#C0C6D4] dark:text-[#C0C6D4]">Retailer</label>
                                </div>
                            </div>
                        </div>
                        <div className='w-full mb-[20px]'>
                            <h1 className='text-[#2E3A44] text-[11px] font-[500] mb-[10px]'>Jenis SIUP</h1>
                            <div className=''>
                                <div className="flex items-center mr-[30px]">
                                    <input onChange={(e) => setTypeSiup(e.target.value)} checked={typeSiup === 'Mikro (kekayaan bersih tidak lebih dari Rp50 juta)' ? true : false} id="radio11" type="radio" name="radioJenisSIUP" value='Mikro (kekayaan bersih tidak lebih dari Rp50 juta)' className="hidden" />
                                    <label htmlFor="radio11" className="flex items-center cursor-pointer w-full py-4 ml-2 text-sm font-medium text-[#C0C6D4]">
                                        <span className="w-[16px] h-[16px] bg-white inline-block mr-2 rounded-full border border-white flex-no-shrink"></span>
                                        Mikro (kekayaan bersih tidak lebih dari Rp50 juta)</label>
                                </div>
                                <div className="flex items-center mr-[30px]">
                                    <input onChange={(e) => setTypeSiup(e.target.value)} checked={typeSiup === 'Mikro (kekayaan bersih antara Rp50 juta – Rp500 juta)' ? true : false} id="radio12" type="radio" name="radioJenisSIUP" value='Mikro (kekayaan bersih antara Rp50 juta – Rp500 juta)' className="hidden" />
                                    <label htmlFor="radio12" className="flex items-center cursor-pointer w-full py-4 ml-2 text-sm font-medium text-[#C0C6D4]">
                                        <span className="w-[16px] h-[16px] bg-white inline-block mr-2 rounded-full border border-white flex-no-shrink"></span>
                                        Mikro (kekayaan bersih antara Rp50 juta – Rp500 juta)</label>
                                </div>
                                <div className="flex items-center mr-[30px]">
                                    <input onChange={(e) => setTypeSiup(e.target.value)} checked={typeSiup === 'Mikro (kekayaan bersih antara Rp500 juta – Rp10 miliar)' ? true : false} id="radio13" type="radio" name="radioJenisSIUP" value='Mikro (kekayaan bersih antara Rp500 juta – Rp10 miliar)' className="hidden" />
                                    <label htmlFor="radio13" className="flex items-center cursor-pointer w-full py-4 ml-2 text-sm font-medium text-[#C0C6D4]">
                                        <span className="w-[16px] h-[16px] bg-white inline-block mr-2 rounded-full border border-white flex-no-shrink"></span>
                                        Mikro (kekayaan bersih antara Rp500 juta – Rp10 miliar)</label>
                                </div>
                                <div className="flex items-center mr-[30px]">
                                    <input onChange={(e) => setTypeSiup(e.target.value)} checked={typeSiup === 'Besar (kekayaan bersih lebih dari Rp10 miliar)' ? true : false} id="radio14" type="radio" name="radioJenisSIUP" value='Besar (kekayaan bersih lebih dari Rp10 miliar)' className="hidden" />
                                    <label htmlFor="radio14" className="flex items-center cursor-pointer w-full py-4 ml-2 text-sm font-medium text-[#C0C6D4]">
                                        <span className="w-[16px] h-[16px] bg-white inline-block mr-2 rounded-full border border-white flex-no-shrink"></span>
                                        Besar (kekayaan bersih lebih dari Rp10 miliar)</label>
                                </div>
                            </div>
                        </div>
                        {/* <div className='w-full mb-[20px]'>
                            <h1 className='text-[#2E3A44] text-[11px] font-[500] mb-[10px]'>Jenis Badan Usaha</h1>
                            <div className='flex items-center'>
                                <div className="flex items-center mr-[30px]">
                                    <input id="checkbox1" type="checkbox" name="checkboxJenisBadanUsaha" value="PRODUSEN" className='hidden'  />
                                    <label htmlFor="checkbox1" className="flex items-center cursor-pointer w-full py-4 ml-2 text-sm font-medium text-[#C0C6D4]">
                                    <span className="w-[16px] h-[16px] bg-white inline-block mr-2 rounded border border-white flex-no-shrink"></span>
                                    Produsen</label>
                                </div>
                                <div className="flex items-center mr-[30px]">
                                    <input id="checkbox2" type="checkbox" name="checkboxJenisBadanUsaha" value="DISTRIBUTOR" className='hidden'  />
                                    <label htmlFor="checkbox2" className="flex items-center cursor-pointer w-full py-4 ml-2 text-sm font-medium text-[#C0C6D4]">
                                    <span className="w-[16px] h-[16px] bg-white inline-block mr-2 rounded border border-white flex-no-shrink"></span>
                                    Distributor</label>
                                </div>
                                <div className="flex items-center mr-[30px]">
                                    <input id="checkbox3" type="checkbox" name="checkboxJenisBadanUsaha" value="PERDAGANGAN" className='hidden'  />
                                    <label htmlFor="checkbox3" className="flex items-center cursor-pointer w-full py-4 ml-2 text-sm font-medium text-[#C0C6D4]">
                                    <span className="w-[16px] h-[16px] bg-white inline-block mr-2 rounded border border-white flex-no-shrink"></span>
                                    Perdagangan</label>
                                </div>
                                <div className="flex items-center mr-[30px]">
                                    <input id="checkbox4" type="checkbox" name="checkboxJenisBadanUsaha" value="RETAILER" className='hidden'  />
                                    <label htmlFor="checkbox4" className="flex items-center cursor-pointer w-full py-4 ml-2 text-sm font-medium text-[#C0C6D4]">
                                    <span className="w-[16px] h-[16px] bg-white inline-block mr-2 rounded border border-white flex-no-shrink"></span>
                                    Retailer</label>
                                </div>
                            </div>
                        </div> */}
                        <div className='w-full mb-[20px]'>
                            <h1 className='text-[#2E3A44] text-[11px] font-[500] mb-[10px]'>Alamat</h1>
                            <textarea type='text' value={address} onChange={(e) => setAddress(e.target.value)} rows={4} className='rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] text-[#A8A8A8] text-sm font-[500] bg-[#F9FBFC]' placeholder='Alamat' required />
                        </div>
                        <div className='w-full mb-[20px]'>
                            <h1 className='text-[#2E3A44] text-[11px] font-[500] mb-[10px]'>Kabupaten/Kota</h1>
                            <input type='text' value={city} onChange={(e) => setCity(e.target.value)} className='rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] text-[#A8A8A8] text-sm font-[500] bg-[#F9FBFC]' placeholder='Kota' required />
                        </div>
                        <div className='w-full mb-[20px]'>
                            <h1 className='text-[#2E3A44] text-[11px] font-[500] mb-[10px]'>Provinsi</h1>
                            <input type='text' value={province} onChange={(e) => setProvince(e.target.value)} className='rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] text-[#A8A8A8] text-sm font-[500] bg-[#F9FBFC]' placeholder='Provinsi' required />
                        </div>
                        <div className='w-full mb-[20px]'>
                            <h1 className='text-[#2E3A44] text-[11px] font-[500] mb-[10px]'>Kode Pos</h1>
                            <input type='number' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className='rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] text-[#A8A8A8] text-sm font-[500] bg-[#F9FBFC]' placeholder='Kode Pos' required />
                        </div>

                        {/* <div className='w-full mb-[20px]'>
                            <h1 className='text-[#2E3A44] text-[11px] font-[500] mb-[10px]'>Password</h1>
                            <input type='password'  className='rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] text-[#A8A8A8] text-sm font-[500] bg-[#F9FBFC]' placeholder='Password' required/>
                        </div> */}
                    </div>
                    <div className='w-full'>
                        <div className='w-full mb-[20px]'>
                            <div className='w-full mb-[20px]'>
                                <h1 className='text-[#2E3A44] text-[11px] font-[500] mb-[10px]'>No. Telp</h1>
                                <input type='number' value={phone} onChange={(e) => setPhone(e.target.value)} className='rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] text-[#A8A8A8] text-sm font-[500] bg-[#F9FBFC]' placeholder='No. Telp' required />
                            </div>
                            <div className='w-full mb-[20px]'>
                                <h1 className='text-[#2E3A44] text-[11px] font-[500] mb-[10px]'>Email Aktif</h1>
                                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] text-[#A8A8A8] text-sm font-[500] bg-[#F9FBFC]' placeholder='Email Aktif' required />
                            </div>
                                <>
                                    <h1 className='text-[#2E3A44] text-[11px] font-[500] mb-[10px]'>Apakah ada dokumen izin usaha (NIB/SIUP/IUMK/IUI)</h1>
                                    <div className='flex items-center'>
                                        <div className="flex items-center mr-[30px]">
                                            <input id="iradio1" type="radio" name="izinUsaha" value="Ya" onClick={(e) => setDocument(e.target.value)} className="hidden" checked={document === 'Ya' ? true : false} />
                                            <label htmlFor="iradio1" className="flex items-center cursor-pointer w-full py-4 ml-2 text-sm font-medium text-[#C0C6D4]">
                                                <span className="w-[16px] h-[16px] bg-white inline-block mr-2 rounded-full border border-white flex-no-shrink"></span>
                                                Ya</label>
                                        </div>
                                        <div className="flex items-center mr-[30px]">
                                            <input id="iradio2" type="radio" name="izinUsaha" value="Tidak" onClick={(e) => setDocument(e.target.value)} className="hidden" checked={document === 'Tidak' ? true : false} />
                                            <label htmlFor="iradio2" className="flex items-center cursor-pointer w-full py-4 ml-2 text-sm font-medium text-[#C0C6D4]">
                                                <span className="w-[16px] h-[16px] bg-white inline-block mr-2 rounded-full border border-white flex-no-shrink"></span>
                                                Tidak</label>
                                        </div>
                                    </div>
                                </>
                        </div>
                        {document === 'Ya' && (
                            <>
                                <div className='w-full mb-[20px]'>
                                    <h1 className='text-[#2E3A44] text-[11px] font-[500] mb-[10px]'>Dokumen Izin Usaha</h1>
                                </div>
                                <div className='flex flex-wrap items-center gap-5'>
                                    <div className='mb-[20px] flex items-center gap-[11px]'>
                                        <div>
                                            <div className='flex lg:flex-row flex-col space-x-10 mt-[10px] '>
                                                <div className="">
                                                    <div className="flex items-center justify-center w-full">
                                                        <label htmlFor='documentNIB' className="cursor-pointer">
                                                            <div className="w-[100px] h-[100px] rounded-[12px] bg-[#EDEDED] border border-dashed border-[#737373] flex flex-col items-center justify-center bg-cover relative">
                                                                <img src={IconUploadFile} />
                                                                <h1 className='text-[#737373] text-[11px] font-semibold mt-[10px]'>Upload File</h1>
                                                            </div>
                                                            <input type="file" id='documentNIB' onChange={(event) => setDocumentNIB(event.target.files[0])} className='rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] hidden' />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <ul className='space-y-2 list-disc list-inside'>
                                                <li className='text-xs text-[#737373] font-[500]'>Ukuran: Maks. 5 MB</li>
                                                <li className='text-xs text-[#737373] font-[500]'>Format: PDF</li>
                                            </ul>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                <div className='py-[6px] px-[20px] flex gap-2 items-center rounded-full bg-[#EDEDED]'>
                                                    <h1 className='text-[10px] text-[#00CDB4]'>{!documentNIB ? 'NIB Dokumen' : documentNIB.type}</h1>
                                                    {documentNIB &&
                                                        <button onClick={() => setDocumentNIB('')}>
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M16.0658 8.9948C16.3586 8.70191 16.3586 8.22703 16.0658 7.93414C15.7729 7.64125 15.298 7.64125 15.0051 7.93414L11.9999 10.9393L8.99469 7.93414C8.7018 7.64125 8.22693 7.64125 7.93403 7.93414C7.64114 8.22703 7.64114 8.70191 7.93403 8.9948L10.9392 12L7.93403 15.0052C7.64113 15.2981 7.64113 15.773 7.93403 16.0659C8.22692 16.3588 8.70179 16.3588 8.99469 16.0659L11.9999 13.0607L15.0051 16.0659C15.298 16.3588 15.7729 16.3588 16.0658 16.0659C16.3587 15.773 16.3587 15.2981 16.0658 15.0052L13.0606 12L16.0658 8.9948Z" fill="#00CDB4" />
                                                            </svg>
                                                        </button>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mb-[20px] flex items-center gap-[11px]'>
                                        <div>
                                            <div className='flex lg:flex-row flex-col space-x-10 mt-[10px] '>
                                                <div className="">
                                                    <div className="flex items-center justify-center w-full">
                                                        <label htmlFor='documentSIUP' className="cursor-pointer">
                                                            <div className="w-[100px] h-[100px] rounded-[12px] bg-[#EDEDED] border border-dashed border-[#737373] flex flex-col items-center justify-center bg-cover relative">
                                                                <img src={IconUploadFile} />
                                                                <h1 className='text-[#737373] text-[11px] font-semibold mt-[10px]'>Upload File</h1>
                                                            </div>
                                                            <input type="file" id='documentSIUP' onChange={(event) => setDocumentSIUP(event.target.files[0])} className='rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] hidden' />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <ul className='space-y-2 list-disc list-inside'>
                                                <li className='text-xs text-[#737373] font-[500]'>Ukuran: Maks. 5 MB</li>
                                                <li className='text-xs text-[#737373] font-[500]'>Format: PDF</li>
                                            </ul>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                <div className='py-[6px] px-[20px] flex gap-2 items-center rounded-full bg-[#EDEDED]'>
                                                    <h1 className='text-[10px] text-[#00CDB4]'>{!documentSIUP ? 'SIUP Dokumen' : documentSIUP.type}</h1>
                                                    {documentSIUP &&
                                                        <button onClick={() => setDocumentSIUP('')}>
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M16.0658 8.9948C16.3586 8.70191 16.3586 8.22703 16.0658 7.93414C15.7729 7.64125 15.298 7.64125 15.0051 7.93414L11.9999 10.9393L8.99469 7.93414C8.7018 7.64125 8.22693 7.64125 7.93403 7.93414C7.64114 8.22703 7.64114 8.70191 7.93403 8.9948L10.9392 12L7.93403 15.0052C7.64113 15.2981 7.64113 15.773 7.93403 16.0659C8.22692 16.3588 8.70179 16.3588 8.99469 16.0659L11.9999 13.0607L15.0051 16.0659C15.298 16.3588 15.7729 16.3588 16.0658 16.0659C16.3587 15.773 16.3587 15.2981 16.0658 15.0052L13.0606 12L16.0658 8.9948Z" fill="#00CDB4" />
                                                            </svg>
                                                        </button>}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className='mb-[20px] flex items-center gap-[11px]'>
                                        <div>
                                            <div className='flex lg:flex-row flex-col space-x-10 mt-[10px] '>
                                                <div className="">
                                                    <div className="flex items-center justify-center w-full">
                                                        <label htmlFor='documentIUMK' className="cursor-pointer">
                                                            <div className="w-[100px] h-[100px] rounded-[12px] bg-[#EDEDED] border border-dashed border-[#737373] flex flex-col items-center justify-center bg-cover relative">
                                                                <img src={IconUploadFile} />
                                                                <h1 className='text-[#737373] text-[11px] font-semibold mt-[10px]'>Upload File</h1>
                                                            </div>
                                                            <input type="file" id='documentIUMK' onChange={(event) => setDocumentIUMK(event.target.files[0])} className='rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] hidden' />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <ul className='space-y-2 list-disc list-inside'>
                                                <li className='text-xs text-[#737373] font-[500]'>Ukuran: Maks. 5 MB</li>
                                                <li className='text-xs text-[#737373] font-[500]'>Format: PDF</li>
                                            </ul>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                <div className='py-[6px] px-[20px] flex gap-2 items-center rounded-full bg-[#EDEDED]'>
                                                    <h1 className='text-[10px] text-[#00CDB4]'>{!documentIUMK ? 'IUMK Dokumen' : documentIUMK.type}</h1>
                                                    {documentIUMK &&
                                                        <button onClick={() => setDocumentIUI('')}>
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M16.0658 8.9948C16.3586 8.70191 16.3586 8.22703 16.0658 7.93414C15.7729 7.64125 15.298 7.64125 15.0051 7.93414L11.9999 10.9393L8.99469 7.93414C8.7018 7.64125 8.22693 7.64125 7.93403 7.93414C7.64114 8.22703 7.64114 8.70191 7.93403 8.9948L10.9392 12L7.93403 15.0052C7.64113 15.2981 7.64113 15.773 7.93403 16.0659C8.22692 16.3588 8.70179 16.3588 8.99469 16.0659L11.9999 13.0607L15.0051 16.0659C15.298 16.3588 15.7729 16.3588 16.0658 16.0659C16.3587 15.773 16.3587 15.2981 16.0658 15.0052L13.0606 12L16.0658 8.9948Z" fill="#00CDB4" />
                                                            </svg>
                                                        </button>}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className='mb-[20px] flex items-center gap-[11px]'>
                                        <div>
                                            <div className='flex lg:flex-row flex-col space-x-10 mt-[10px] '>
                                                <div className="">
                                                    <div className="flex items-center justify-center w-full">
                                                        <label htmlFor='documentIUI' className="cursor-pointer">
                                                            <div className="w-[100px] h-[100px] rounded-[12px] bg-[#EDEDED] border border-dashed border-[#737373] flex flex-col items-center justify-center bg-cover relative">
                                                                <img src={IconUploadFile} />
                                                                <h1 className='text-[#737373] text-[11px] font-semibold mt-[10px]'>Upload File</h1>
                                                            </div>
                                                            <input type="file" id='documentIUI' onChange={(event) => setDocumentIUI(event.target.files[0])} className='rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] hidden' />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <ul className='space-y-2 list-disc list-inside'>
                                                <li className='text-xs text-[#737373] font-[500]'>Ukuran: Maks. 5 MB</li>
                                                <li className='text-xs text-[#737373] font-[500]'>Format: PDF</li>
                                            </ul>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                <div className='py-[6px] px-[20px] flex gap-2 items-center rounded-full bg-[#EDEDED]'>
                                                    <h1 className='text-[10px] text-[#00CDB4]'>{!documentIUI ? 'IUI Dokumen' : documentIUI.type}</h1>
                                                    {documentIUI &&
                                                        <button onClick={() => setDocumentIUI('')}>
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M16.0658 8.9948C16.3586 8.70191 16.3586 8.22703 16.0658 7.93414C15.7729 7.64125 15.298 7.64125 15.0051 7.93414L11.9999 10.9393L8.99469 7.93414C8.7018 7.64125 8.22693 7.64125 7.93403 7.93414C7.64114 8.22703 7.64114 8.70191 7.93403 8.9948L10.9392 12L7.93403 15.0052C7.64113 15.2981 7.64113 15.773 7.93403 16.0659C8.22692 16.3588 8.70179 16.3588 8.99469 16.0659L11.9999 13.0607L15.0051 16.0659C15.298 16.3588 15.7729 16.3588 16.0658 16.0659C16.3587 15.773 16.3587 15.2981 16.0658 15.0052L13.0606 12L16.0658 8.9948Z" fill="#00CDB4" />
                                                            </svg>
                                                        </button>}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className='mb-[20px] flex items-center gap-[11px]'>
                                        <div>
                                            <div className='flex lg:flex-row flex-col space-x-10 mt-[10px] '>
                                                <div className="">
                                                    <div className="flex items-center justify-center w-full">
                                                        <label htmlFor='documentOther' className="cursor-pointer">
                                                            <div className="w-[100px] h-[100px] rounded-[12px] bg-[#EDEDED] border border-dashed border-[#737373] flex flex-col items-center justify-center bg-cover relative">
                                                                <img src={IconUploadFile} />
                                                                <h1 className='text-[#737373] text-[11px] font-semibold mt-[10px]'>Upload File</h1>
                                                            </div>
                                                            <input type="file" id='documentOther' onChange={(event) => setDocumentOther(event.target.files[0])} className='rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] hidden' />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <ul className='space-y-2 list-disc list-inside'>
                                                <li className='text-xs text-[#737373] font-[500]'>Ukuran: Maks. 5 MB</li>
                                                <li className='text-xs text-[#737373] font-[500]'>Format: PDF</li>
                                            </ul>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                <div className='py-[6px] px-[20px] flex gap-2 items-center rounded-full bg-[#EDEDED]'>
                                                    <h1 className='text-[10px] text-[#00CDB4]'>{!documentOther ? 'Other Dokumen' : documentOther.type}</h1>
                                                    {documentOther &&
                                                        <button onClick={() => setDocumentOther('')}>
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M16.0658 8.9948C16.3586 8.70191 16.3586 8.22703 16.0658 7.93414C15.7729 7.64125 15.298 7.64125 15.0051 7.93414L11.9999 10.9393L8.99469 7.93414C8.7018 7.64125 8.22693 7.64125 7.93403 7.93414C7.64114 8.22703 7.64114 8.70191 7.93403 8.9948L10.9392 12L7.93403 15.0052C7.64113 15.2981 7.64113 15.773 7.93403 16.0659C8.22692 16.3588 8.70179 16.3588 8.99469 16.0659L11.9999 13.0607L15.0051 16.0659C15.298 16.3588 15.7729 16.3588 16.0658 16.0659C16.3587 15.773 16.3587 15.2981 16.0658 15.0052L13.0606 12L16.0658 8.9948Z" fill="#00CDB4" />
                                                            </svg>
                                                        </button>}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </>
                            )}
                        <div className='mb-[20px] bg-[#CBD5E1] py-[20px] px-[10px] w-full flex flex-col md:flex-row flex-wrap items-center gap-[20px] rounded-[12px]'>
                            <div className='w-full md:w-[180px]'>
                                <h1 className='text-[#64748B] text-[11px] font-[500] mb-[10px]'>Nama Pendaftar / PIC</h1>
                                <input type='text' value={picName} onChange={(e) => setPicName(e.target.value)} className='rounded-[12px] outline-none border border-[#E3E8F1] w-full md:w-[180px] px-[20px] py-[15px] text-[#A8A8A8] text-sm font-[500] bg-[#F9FBFC]' required />
                            </div>
                            <div className='w-full md:w-[180px]'>
                                <h1 className='text-[#64748B] text-[11px] font-[500] mb-[10px]'>Posisi / Jabatan</h1>
                                <input type='text' value={picPosition} onChange={(e) => setPicPosition(e.target.value)} className='rounded-[12px] outline-none border border-[#E3E8F1] w-full md:w-[180px] px-[20px] py-[15px] text-[#A8A8A8] text-sm font-[500] bg-[#F9FBFC]' required />
                            </div>
                            <div className='w-full md:w-[180px]'>
                                <h1 className='text-[#64748B] text-[11px] font-[500] mb-[10px]'>Email</h1>
                                <input type='email' value={picEmail} onChange={(e) => setPicEmail(e.target.value)} className='rounded-[12px] outline-none border border-[#E3E8F1] w-full md:w-[180px] px-[20px] py-[15px] text-[#A8A8A8] text-sm font-[500] bg-[#F9FBFC]' required />
                            </div>
                            <div className='w-full md:w-[180px]'>
                                <h1 className='text-[#64748B] text-[11px] font-[500] mb-[10px]'>Telepon</h1>
                                <input type='number' value={picPhone} onChange={(e) => setPicPhone(e.target.value)} className='rounded-[12px] outline-none border border-[#E3E8F1] w-full md:w-[180px] px-[20px] py-[15px] text-[#A8A8A8] text-sm font-[500] bg-[#F9FBFC]' required />
                            </div>
                        </div>
                        <div className='mb-[20px] bg-[#CBD5E1] py-[20px] px-[10px] w-full flex flex-col flex-wrap md:grid grid-cols-12 items-center gap-[20px] rounded-[12px]'>
                            <div className='w-full col-span-6'>
                                <h1 className='text-[#64748B] text-[11px] font-[500] mb-[10px]'>Website / Sosial Media</h1>
                                <select value={websiteType} onChange={(e) => setWebsiteType(e.target.value)} className='rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] text-[#A8A8A8] text-sm font-[500] bg-[#F9FBFC]'>
                                    <option value={''} selected>Select Website / Sosial Media</option>
                                    <option value={'Website'}>Website</option>
                                    <option value={'Facebook'}>Facebook</option>
                                    <option value={'Instagram'}>Instagram</option>
                                    <option value={'Twitter'}>Twitter</option>
                                    <option value={'Tiktok'}>Tiktok</option>
                                    <option value={'Linkedin'}>Linkedin</option>
                                </select>
                            </div>
                            <div className='w-full col-span-6'>
                                <h1 className='text-[#64748B] text-[11px] font-[500] mb-[10px]'>Link URL</h1>
                                <input type='url' value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} className='rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] text-[#A8A8A8] text-sm font-[500] bg-[#F9FBFC]' required />
                            </div>
                            <div className='w-full col-span-6'>
                                <h1 className='text-[#64748B] text-[11px] font-[500] mb-[10px]'>Marketplace /Toko Online</h1>
                                <select value={marketplaceType} onChange={(e) => setMarketplaceType(e.target.value)} className='rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] text-[#A8A8A8] text-sm font-[500] bg-[#F9FBFC]'>
                                    <option value={''} selected>Select Marketplace</option>
                                    <option value={'Shopee'}>Shopee</option>
                                    <option value={'Tokopedia'}>Tokopedia</option>
                                    <option value={'Bukalapak'}>Bukalapak</option>
                                    <option value={'Lazada'}>Lazada</option>
                                    <option value={'Blibli'}>Blibli</option>
                                </select>
                            </div>
                            <div className='w-full col-span-6'>
                                <h1 className='text-[#64748B] text-[11px] font-[500] mb-[10px]'>Nama Marketplace</h1>
                                <input type='text' value={marketplaceUrl} onChange={(e) => setMarketplaceUrl(e.target.value)} className='rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] text-[#A8A8A8] text-sm font-[500] bg-[#F9FBFC]' required />
                            </div>
                        </div>
                        <h1 className='text-[#2E3A44] text-[11px] font-[500] mb-[10px]'>Sertifikasi</h1>
                        <div className='mb-[20px] flex items-center gap-[11px]'>
                            <div>
                                <div className='flex lg:flex-row flex-col space-x-10 mt-[10px] '>
                                    <div className="">
                                        <div className="flex items-center justify-center w-full">
                                            <label htmlFor='upload-sertifikat' className="cursor-pointer">
                                                <div className="w-[100px] h-[100px] rounded-[12px] bg-[#EDEDED] border border-dashed border-[#737373] flex flex-col items-center justify-center bg-cover relative">
                                                    <img src={IconUploadFile} />
                                                    <h1 className='text-[#737373] text-[11px] font-semibold mt-[10px]'>Sertifikat</h1>
                                                </div>
                                                <input id='upload-sertifikat' accept="application/pdf" onChange={(event) => setDocumentSertifikat(event.target.files[0])} type="file" className='rounded-[12px] outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px] hidden' />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <ul className='space-y-2 list-disc list-inside'>
                                    <li className='text-xs text-[#737373] font-[500]'>Ukuran: Maks. 5 MB</li>
                                    <li className='text-xs text-[#737373] font-[500]'>Format: PDF</li>
                                </ul>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <div className='py-[6px] px-[20px] flex gap-2 items-center rounded-full bg-[#EDEDED]'>
                                        <h1 className='text-[10px] text-[#00CDB4]'>{!documentSertifikat ? 'Sertifikat Dokumen' : documentSertifikat.type}</h1>
                                        {documentSertifikat &&
                                            <button>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M16.0658 8.9948C16.3586 8.70191 16.3586 8.22703 16.0658 7.93414C15.7729 7.64125 15.298 7.64125 15.0051 7.93414L11.9999 10.9393L8.99469 7.93414C8.7018 7.64125 8.22693 7.64125 7.93403 7.93414C7.64114 8.22703 7.64114 8.70191 7.93403 8.9948L10.9392 12L7.93403 15.0052C7.64113 15.2981 7.64113 15.773 7.93403 16.0659C8.22692 16.3588 8.70179 16.3588 8.99469 16.0659L11.9999 13.0607L15.0051 16.0659C15.298 16.3588 15.7729 16.3588 16.0658 16.0659C16.3587 15.773 16.3587 15.2981 16.0658 15.0052L13.0606 12L16.0658 8.9948Z" fill="#00CDB4" />
                                                </svg>
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='flex justify-end gap-5 mt-16 md:mt-48'>
                            <button onClick={() => navigate(-1)} className='appearance-none text-center block w-[135px] h-[46px] border border-cherry bg-white hover:bg-cherry hover:text-white text-cherry font-medium font-rubix text-[15px] py-3 px-4 mb-[5px] rounded-[8px]'>Batal</button>
                            <button onClick={postData} className="appearance-none block w-[135px] h-[46px] bg-cherry hover:bg-[#2E3A66] text-[#F9FBFC] font-medium font-rubix text-[15px] py-3 px-4 mb-[5px] rounded-[8px]">Simpan</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyProfilePartner