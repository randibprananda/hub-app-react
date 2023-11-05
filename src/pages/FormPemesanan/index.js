import React, { useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { IconNext, Wedding, IconDropdown, AltImage } from '../../assets'
import { FooterTwo, Navbar } from '../../component'
import Api from '../../Api'
import { useEffect } from 'react'
import DatePicker from 'react-multi-date-picker'
import DatePanel from 'react-multi-date-picker/plugins/date_panel'
import moment from 'moment/moment'
import imageHandle from '../../utils/imageHandle'
import { toast } from 'react-toastify'
import handleLink from '../../utils/handleLink'



const FormPemesanan = () => {
  const { kategori, id } = useParams()
  const navigate = useNavigate()
  const location = useLocation();
  const [data, setData] = useState()
  const [dataLayanan, setDataLayanan] = useState([])

  const [msg, setMsg] = useState([])


  const [user, setUser] = useState("")
  const [role, setRole] = useState('')
  const [date, setDate] = useState([])
  const [eventBrief, setEventBrief] = useState("")
  const [billingTo, setBillingTo] = useState("")
  const [qty, setQty] = useState(1)
  var adminFee = 10000
  var taxFee = 0
  var subtotal = (data?.packagePricing?.total_price * qty) + adminFee
  var totalTaxFee = subtotal * taxFee / 100
  var total = subtotal + taxFee

  const getUser = async () => {
    try {
      const response = await Api.getUserRole(localStorage.getItem('token-hub'))
      setUser(response.data)
      setRole(response.data.role.name)
    } catch (error) {
      console.log(error)
      setUser(null)
      // localStorage.removeItem('token')
    }
  }
  const dataByDate = () => {
    const data = []
    date.map((val) => (
      data.push(moment(val.toDate?.().toString()).format('YYYY-MM-DD'))
    ))
    return data
  }
  // console.log("start", dataByDate()[0])
  // console.log("end", dataByDate()[1])

  const getDetail = async () => {
    await Api.getDetailLayanan(id, kategori).then(
      async (response) => {
        setDataLayanan(response.data)
      }
    )
  }
  useEffect(() => {
    getUser()
    setData(location.state)
    getDetail()
  }, [])

  const postData = async () => {
    try {
      let err = []
      if (dataByDate() == "") {
        err.push("Tanggal tidak boleh kosong")
      }
      if (eventBrief == "") {
        err.push("Event Brief Tidak Boleh Kosong")
      }
      if (billingTo == "") {
        err.push("Nama Pembayar Tagihan Tidak Boleh Kosong")
      }
      else {
        const form = {
          "status": "UNPAID",
          "service_status": "COMPLETE",
          "eventBrief": eventBrief,
          "startDate": dataByDate()[0],
          "endDate": dataByDate().length > 1 ? dataByDate()[1] : dataByDate()[0],
          "billingTo": billingTo,
          "servicePrice": data?.packagePricing?.total_price,
          "adminFee": adminFee,
          "taxFee": taxFee,
          "paymentMethod": "tranfer",
          "qty": qty,
          "packagePricingId": data?.packagePricing?.id
        }
        console.log(form)
        const response = await Api.postBookingService(localStorage.getItem('token-hub'), form)
        if (role === 'Event Hunter') {
          navigate('/dashboard-eh ')
          console.log('eh')
        } else if (role === 'Stakeholder') {
          navigate('/riwayat-layanan-sh')
        }
        window.open(response.data.linkpayment, "_blank")


      }
      console.log(err)
      setMsg(err)
    }
    catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='bg-[#E3E8F1] min-h-screen font-inter'>
      <Navbar />
      <div className='md:px-[75px] px-[36px] pt-[120px] pb-[10px] md:pt-[140px] md:pb-[69px]'>
        {/* Section 1 */}
        <div>
          <div className='flex items-center gap-3'>
            <Link to={'/'} className='text-black-k text-xs md:text-sm font-[500] hover:text-primary'>Detail Pesanan</Link>
            <img src={IconNext} alt='' />
            <Link to="" className='text-black-k text-xs md:text-sm font-[500] hover:text-primary'>Form Pesanan</Link>


          </div>
          <div className='mt-[30px] w-full bg-[#ECEEF6] shadow-sm rounded-[12px] '>
            <div className='grid grid-cols-1 gap-5 md:grid-cols-12'>
              <div className='md:col-span-5 p-[22px]'>
                <div>
                  <img src={kategori == "EO" ? imageHandle(dataLayanan?.eoService?.eo_images[0]?.image) : kategori == "VENUE" ? imageHandle(dataLayanan?.venueService?.venue_images[0]?.image) : kategori == "PRODUCT" ? imageHandle(dataLayanan?.productSupply?.product_images[0]?.image) : kategori == "TALENT" ? imageHandle(dataLayanan?.talentService?.talent_images[0]?.image) : AltImage} className="w-full lg:h-[395px] h-auto rounded-lg object-cover" />
                </div>
                <div className='mt-[24px]'>
                  <h1 className='text-xl text-[#2E3A44] font-semibold mb-4'>Pemesanan Event Organizer</h1>
                  <h1 className='text-sm text-[#475569]'>Produk Layanan </h1>
                  <p className='text-sm font-medium mt-1 text-[#081C4F]'>{kategori == "EO" ? dataLayanan?.eoService?.name : kategori == "VENUE" ? dataLayanan?.venueService?.name : kategori == "PRODUCT" ? dataLayanan?.productSupply?.tool_type : kategori == "TALENT" ? dataLayanan?.talentService?.name : null}</p>
                  <h1 className='text-sm text-[#475569] mt-4'>Paket Layanan </h1>
                  <p className='text-sm font-medium mt-1 text-[#081C4F]'>{data?.packagePricing?.name}</p>
                  <h1 className='text-sm text-[#475569] mt-4'>Deskripsi</h1>
                  <p className='text-sm  mt-1 text-[#454545]'>{data?.packagePricing?.description}</p>
                  {/* <div className='relative mt-[15px]'>
                    <select name='' className='rounded-[12px] outline-none border bg-[#FAFAFA] text-[#5C5C5C] border-[#E3E8F1] w-full appearance-none px-[20px] py-[15px] relative text-sm font-[500]'>
                      <option value="" disabled>Ketersediaan Tanggal Booking</option>
                      <option value={''}></option>

                    </select>
                    <img src={IconDropdown} className='absolute top-6 right-4' alt='' />
                  </div> */}
                  {
                    data?.packagePricing.portofolio ?
                      <div className='relative mt-[15px]'>
                        <a href={handleLink(data?.packagePricing?.portofolio)} target="_blank" download className='flex justify-between items-center mt-6 rounded-[12px] text-start outline-none border bg-[#FAFAFA] text-[#5C5C5C] border-[#E3E8F1] '>
                          <p name='diskon' className='w-full appearance-none px-[20px] py-[15px] relative text-sm font-[500]'>
                            Unduh Portfolio
                          </p>
                          <div className=''>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M14.25 2.5C14.25 2.36193 14.1381 2.25 14 2.25H7C5.48122 2.25 4.25 3.48122 4.25 5V19C4.25 20.5188 5.48122 21.75 7 21.75H17C18.5188 21.75 19.75 20.5188 19.75 19V9.14706C19.75 9.00899 19.6381 8.89706 19.5 8.89706H15C14.5858 8.89706 14.25 8.56127 14.25 8.14706V2.5ZM14.0315 13.1643C14.355 12.9056 14.8269 12.958 15.0857 13.2815C15.3444 13.6049 15.292 14.0769 14.9685 14.3357L12.4746 16.3308C12.3459 16.4361 12.1816 16.4994 12.0025 16.5L12.0001 16.5L11.9937 16.5C11.8177 16.4985 11.6561 16.4364 11.5288 16.3335L9.03151 14.3357C8.70806 14.0769 8.65562 13.6049 8.91438 13.2815C9.17313 12.958 9.6451 12.9056 9.96855 13.1643L11.2501 14.1896V10.75C11.2501 10.3358 11.5858 10 12.0001 10C12.4143 10 12.7501 10.3358 12.7501 10.75V14.1895L14.0315 13.1643Z" fill="black" />
                              <path d="M15.75 2.82414C15.75 2.63964 15.9426 2.5225 16.0862 2.63839C16.2071 2.736 16.3158 2.85036 16.4085 2.97955L19.4217 7.17745C19.4903 7.27302 19.416 7.39706 19.2983 7.39706H16C15.8619 7.39706 15.75 7.28513 15.75 7.14706V2.82414Z" fill="black" />
                            </svg>
                          </div>
                        </a>
                      </div> : null
                  }
                  <div className='mt-[25px]'>
                    <h1 className='text-[14px] text-[#475569]'>Tagihan dari</h1>
                    <h1 className='text-base text-[#081C4F] font-semibold mt-1'>{kategori == "EO" ? dataLayanan?.eoService?.user?.company?.name : kategori == "VENUE" ? dataLayanan?.venueService?.user?.company?.name : kategori == "PRODUCT" ? dataLayanan?.productSupply?.user?.company?.name : kategori == "TALENT" ? dataLayanan?.talentService?.user?.company?.name : null}</h1>
                    <h1 className='text-base text-[#475569] mt-1'>{kategori == "EO" ? dataLayanan?.eoService?.user?.company?.city : kategori == "VENUE" ? dataLayanan?.venueService?.user?.company?.city : kategori == "PRODUCT" ? dataLayanan?.productSupply?.user?.company?.city : kategori == "TALENT" ? dataLayanan?.talentService?.user?.company?.city : null}</h1>
                  </div>
                </div>

              </div>
              <div className='md:col-span-7'>
                <div className="flex flex-wrap bg-white h-full p-[30px]">
                  <div className="w-full">
                    <h3 className='text-2xl text-[#2E3A44] font-semibold mb-8'>Data Pesanan </h3>
                    {msg.length > 0 ?
                      <div className="p-3 bg-red-100 rounded-lg">
                        <ul className="ml-3 text-xs text-red-500 list-disc">
                          {msg && msg.map((val, index) => (
                            <li key={index}>{val}</li>
                          ))}
                        </ul>
                      </div> : null}
                    <h3 className='text-sm text-[#2E3A44] mb-[10px]'>Tanggal diadakan Event </h3>
                    {/* <input type='date' className='rounded-[12px] bg-white text-fill outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px]  text-sm font-[500] mb-[30px]' required /> */}
                    <div className='bg-white'>
                      <DatePicker
                        range
                        style={{ "background-color": "white", width: "100%", padding: "15px 20px", "color": "#5A5A5A" }}
                        containerStyle={{
                          width: "100%"
                        }}
                        onChange={setDate}
                        plugins={[
                          <DatePanel />
                        ]}
                      />
                    </div>
                    <h3 className='text-sm text-[#2E3A44] mb-[10px] mt-5'>Jumlah Pesanan</h3>
                    <div className='flex gap-3 mb-[30px]'>
                      <button
                        onClick={() => {
                          qty == 1 ? setQty(1) : setQty(qty - 1);
                        }}
                        className='border border-[#CBD5E1] p-3 rounded-[8px]'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 12H18" stroke="#2E3A44" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      </button>
                      <input type='number' onChange={(e) => { setQty(e.target.value) }} value={qty} min={1} className='appearance-none text-sm bg-white border border=[#CBD5E1] rounded-lg text-fill  w-20 md:max-w-xs px-3' />
                      <button onClick={() => { setQty(qty + 1) }} className='border border-[#CBD5E1] p-3 rounded-[8px]'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.75 7C12.75 6.58579 12.4142 6.25 12 6.25C11.5858 6.25 11.25 6.58579 11.25 7V11.25H7C6.58579 11.25 6.25 11.5858 6.25 12C6.25 12.4142 6.58579 12.75 7 12.75H11.25V17C11.25 17.4142 11.5858 17.75 12 17.75C12.4142 17.75 12.75 17.4142 12.75 17V12.75H17C17.4142 12.75 17.75 12.4142 17.75 12C17.75 11.5858 17.4142 11.25 17 11.25H12.75V7Z" fill="#2E3A44" />
                        </svg>
                      </button>
                    </div>
                    <h3 className='text-sm text-[#2E3A44] mb-[10px]'>Event Brief</h3>
                    <textarea onChange={(e) => setEventBrief(e.target.value)} rows={4} className='rounded-[12px] bg-white text-fill outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px]  text-sm font-[500] mb-16' placeholder='Ceritakan sekilas tentang acara yang akan anda adakan' required />
                    <h3 className='text-2xl text-[#2E3A44] font-semibold mb-8'>Pembayaran</h3>
                    <h3 className='text-sm text-[#2E3A44] mb-[10px]'>Tagihan dikirim ke</h3>
                    <input onChange={(e) => setBillingTo(e.target.value)} type='text' className='rounded-[12px] bg-white text-fill outline-none border border-[#E3E8F1] w-full px-[20px] py-[15px]  text-sm font-[500] mb-[30px]' placeholder='Nama pembayar tagihan' required />
                    <div className=''>
                      <div className='bg-[#D9D9D9] overflow-x-auto rounded-xl px-5 py-7'>
                        <table className='w-full'>
                          <thead>
                            <tr className='text-[#0F172A] font-semibold text-start text-[14px] truncate'>
                              <th className='px-4 py-2 text-sm text-start'>Items</th>
                              <th className='px-4 py-2 text-sm text-start'>Quantity</th>
                              <th className='px-4 py-2 text-sm text-start'>Harga</th>
                            </tr>
                          </thead>
                          <tbody className=''>
                            <tr className='text-[#334155] w-full text-[14px] gap-10 truncate'>
                              <td className='px-4 py-2 text-sm text-start'>{data?.packagePricing?.name}</td>
                              {/* <td className='px-4 py-2 text-sm text-start'>{data?.serviceName}</td> */}
                              <td className='px-4 py-2 text-sm text-start'>{qty}</td>
                              <td className='px-4 py-2 text-sm text-start'>Rp {data?.packagePricing?.total_price}</td>
                            </tr>
                            <tr className='text-[#334155] w-full text-[14px] truncate'>
                              {/* <td className='px-4 py-2 text-sm text-start'>{data?.packagePricing?.name}</td> */}
                              <td className='px-4 py-2 text-sm text-start'></td>
                              <td className='px-4 py-2 text-center'></td>
                              <td className='px-4 py-2 text-sm text-start'></td>
                            </tr>
                          </tbody>
                        </table>
                        <hr class="my-10 w-full h-[2px]  border-0 bg-[#0F172A]" />
                        <table className='flex justify-end lg:w-full lg:px-20'>
                          <tbody className=''>
                            <tr className='text-[#334155] w-full text-[14px] gap-10 truncate'>
                              <td className='px-4 py-2 text-sm text-start'>Subtotal</td>

                              <td className='px-4 py-2 text-sm text-start'>Rp {subtotal}</td>
                            </tr>
                            <tr className='text-[#334155] w-full text-[14px] gap-10 truncate'>
                              <td className='px-4 py-2 text-sm text-start'>Biaya Admin</td>

                              <td className='px-4 py-2 text-sm text-start'>Rp {adminFee}</td>
                            </tr>
                            <tr className='text-[#334155] w-full text-[14px] gap-10 truncate'>
                              <td className='text-start px-4 py-2 text-sm font-bold text-[#081C4F]'>Total</td>

                              <td className='text-start px-4 py-2 text-sm font-bold text-[#081C4F]'>Rp {total}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className='flex justify-end mt-[50px]'>
                      <button onClick={() =>
                        (user == null) ?
                          navigate("/login") :
                          (user?.role?.name == "Stakeholder" || user?.role?.name == "Event Hunter") ?
                            postData() :
                            toast.error('Harap Login sebagai Event Hunter / Stakeholder untuk booking layanan', {
                              position: "top-center",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "light",
                            })
                      }
                        className='bg-[#2D014B] hover:bg-orange-700 px-4 py-2 rounded-lg h-[44px] text-[14px] font-light text-white'>Lanjut Pembayaran </button>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
      <FooterTwo />
    </div>
  )
}

export default FormPemesanan
