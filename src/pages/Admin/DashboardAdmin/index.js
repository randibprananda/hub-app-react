import React, { useState } from 'react';
import { CardAdmin, FooterTwo, NavbarAdmin, Sidebar } from '../../../component'
import { Brian, IconDashboardGradient, IconEventHunterPrimary, IconKing, IconPartnerPrimary, IconServiceEO, IconServiceEOWhite, IconServiceSupplier, IconServiceSupplierWhite, IconServiceTalent, IconServiceTalentWhite, IconServiceVenue, IconServiceVenueWhite, IconStakeholderPrimary, IconTenderPrimary, LogoDefault } from '../../../assets'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect } from 'react';
import Api from '../../../Api';
import imageHandle from '../../../utils/imageHandle';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const DashboardAdmin = () => {

  const [open, setOpen] = useState(true);
  const [activeChart, setActiveChart] = useState(1);
  const [topService, setTopService] = useState('')
  const [cardStat, setCardStat] = useState('')
  const [statistic, setStatistic] = useState([])
  const getTopService = async() => {
    try {
      const resServ = await Api.DashboardAdminTopChart(localStorage.getItem('token-hub'))
      const resCard = await Api.DashboardAdminCard(localStorage.getItem('token-hub'))
      const resStat = await Api.DashboardAdminStatistic(localStorage.getItem('token-hub'))
      setTopService(resServ.data.result.sort((a, b) => a.total_transactions - b.total_transactions))
      setCardStat(resCard.data)
      setStatistic(resStat.data.results)
      // console.log("ini",resStat.data.results)
    } catch (error) {
      console.log(error)
    }
  }

  // chart eo
  const omsetEo = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
     
    ],
    datasets: [
      {
        fill: true,
        label: "",     
        data: [
          statistic.January?.countEventOrganizer, 
          statistic.February?.countEventOrganizer, 
          statistic.March?.countEventOrganizer, 
          statistic.April?.countEventOrganizer, 
          statistic.May?.countEventOrganizer, 
          statistic.June?.countEventOrganizer, 
          statistic.July?.countEventOrganizer, 
          statistic.August?.countEventOrganizer, 
          statistic.September?.countEventOrganizer, 
          statistic.October?.countEventOrganizer, 
          statistic.November?.countEventOrganizer, 
          statistic.December?.countEventOrganizer
        ],
        borderColor: "#00CDB4",
        backgroundColor: "#00CDB4"
      },
    ],
  };

  // chart Venue
  const omsetVenue = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
     
    ],
    datasets: [
      {
        fill: true,
        label: "",     
        data: [
          statistic.January?.countVenue, 
          statistic.February?.countVenue, 
          statistic.March?.countVenue, 
          statistic.April?.countVenue, 
          statistic.May?.countVenue, 
          statistic.June?.countVenue, 
          statistic.July?.countVenue, 
          statistic.August?.countVenue, 
          statistic.September?.countVenue, 
          statistic.October?.countVenue, 
          statistic.November?.countVenue, 
          statistic.December?.countVenue
        ],
        borderColor: "#00CDB4",
        backgroundColor: "#00CDB4"
      },
    ],
  };

  // chart supplier
  const omsetSupplier = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
     
    ],
    datasets: [
      {
        fill: true,
        label: "",     
        data: [
          statistic.January?.countSupplier, 
          statistic.February?.countSupplier, 
          statistic.March?.countSupplier, 
          statistic.April?.countSupplier, 
          statistic.May?.countSupplier, 
          statistic.June?.countSupplier, 
          statistic.July?.countSupplier, 
          statistic.August?.countSupplier, 
          statistic.September?.countSupplier, 
          statistic.October?.countSupplier, 
          statistic.November?.countSupplier, 
          statistic.December?.countSupplier
        ],
        borderColor: "#00CDB4",
        backgroundColor: "#00CDB4"
      },
    ],
  };

  // chart talent
  const omsetTalent= {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
     
    ],
    datasets: [
      {
        fill: true,
        label: "",     
        data: [
          statistic.January?.countTalent, 
          statistic.February?.countTalent, 
          statistic.March?.countTalent, 
          statistic.April?.countTalent, 
          statistic.May?.countTalent, 
          statistic.June?.countTalent, 
          statistic.July?.countTalent, 
          statistic.August?.countTalent, 
          statistic.September?.countTalent, 
          statistic.October?.countTalent, 
          statistic.November?.countTalent, 
          statistic.December?.countTalent
        ],
        borderColor: "#00CDB4",
        backgroundColor: "#00CDB4"
      },
    ],
  };

  useEffect(() => {
    getTopService()
  }, [])


  return (
    <div>
      <div className='h-full bg-outline'>
        <Sidebar activeMenu={0} open={open} setOpen={setOpen} />
        <div
          className={`${open ? 'lg:ml-80 md:ml-28 ml-0' : 'lg:ml-24 md:ml-28 ml-0'} 
                  h-full p-7`}
        >
          <NavbarAdmin title={'Dashboard'} image={IconDashboardGradient} open={open} setOpen={setOpen} />
          <div className='pt-[120px] space-y-6'>
            <div className='grid grid-cols-6 gap-5 lg:grid-cols-12 md:grid-cols-8'>
              <CardAdmin
                count={cardStat.countStakeholder}
                total={'Total Stakeholder'}
                symbol={IconStakeholderPrimary}
              />
              <CardAdmin count={cardStat.countPartner} total={'Total Partner'} symbol={IconPartnerPrimary} />
              <CardAdmin
                count={cardStat.countEventHunter}
                total={'Total Event Hunter'}
                symbol={IconEventHunterPrimary}
              />
              <CardAdmin count={cardStat.countOpenTender} total={'Open Tender'} symbol={IconTenderPrimary} />
            </div>
            {/* Chart Table */}
            <div className='w-full lg:h-[520px] md:h-full h-full bg-white rounded-xl lg:space-y-5'>
              <div className='lg:h-10 md:h-80 h-full w-full px-[46px] py-[48px] flex md:flex-row flex-col justify-between items-center border-b-2'>
                <div>
                  <div className={activeChart === 1 ? 'block' : 'hidden'}>
                    <h1 className='text-black font-semibold text-[20px]'>EVENT ORGANIZER</h1>
                  </div>
                  <div className={activeChart === 2 ? 'block' : 'hidden'}>
                    <h1 className='text-black font-semibold text-[20px]'>VENUE</h1>
                  </div>
                  <div className={activeChart === 3 ? 'block' : 'hidden'}>
                    <h1 className='text-black font-semibold text-[20px]'>SUPPLIER</h1>
                  </div>
                  <div className={activeChart === 4 ? 'block' : 'hidden'}>
                    <h1 className='text-black font-semibold text-[20px]'>TALENT</h1>
                  </div>
                </div>
                <div>
                  <div className='flex lg:flex-row flex-col items-center gap-3 md:gap-[28px] flex-wrap '>
                    <button
                      key={1}
                      className={`${
                        activeChart === 1 ? 'bg-[#00CDB4] text-white' : 'bg-[#E0E0E0] text-[#A8A8A8]'
                      } py-[10px] px-[20px] rounded-[12px] flex items-center gap-[13px] text-xs md:text-base truncate lg:w-auto w-full`}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveChart(1);
                      }}
                    >
                      <img src={activeChart === 1 ? IconServiceEOWhite : IconServiceEO} />
                      Event Organizer
                    </button>

                    <button
                      key={2}
                      className={`${
                        activeChart === 2 ? 'bg-[#00CDB4] text-white' : 'bg-[#E0E0E0] text-[#A8A8A8]'
                      } py-[10px] px-[20px] rounded-[12px] flex items-center gap-[13px] text-xs md:text-base truncate lg:w-auto w-full`}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveChart(2);
                      }}
                    >
                      <img src={activeChart === 2 ? IconServiceVenueWhite : IconServiceVenue} />
                      Venue
                    </button>
                    <button
                      key={3}
                      className={`${
                        activeChart === 3 ? 'bg-[#00CDB4] text-white' : 'bg-[#E0E0E0] text-[#A8A8A8]'
                      } py-[10px] px-[20px] rounded-[12px] flex items-center gap-[13px] text-xs md:text-base truncate lg:w-auto w-full`}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveChart(3);
                      }}
                    >
                      <img src={activeChart === 3 ? IconServiceSupplierWhite : IconServiceSupplier} />
                      Supplier
                    </button>
                    <button
                      key={4}
                      className={`${
                        activeChart === 4 ? 'bg-[#00CDB4] text-white' : 'bg-[#E0E0E0] text-[#A8A8A8]'
                      } py-[10px] px-[20px] rounded-[12px] flex items-center gap-[13px] text-xs md:text-base truncate lg:w-auto w-full`}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveChart(4);
                      }}
                    >
                      <img src={activeChart === 4 ? IconServiceTalentWhite : IconServiceTalent} />
                      Talent
                    </button>
                  </div>
                </div>
              </div>

              <div className={activeChart === 1 ? 'block' : 'hidden'}>
                <div className='h-[350px] py-[27px] px-[46px]'>
                  <Bar
                    options={{
                      plugins: {
                        title: {
                          display: false
                        }
                      },
                      responsive: true,
                      maintainAspectRatio: false,
                      responsive: true,
                      scales: {
                        x: {
                          stacked: true
                        },
                        y: {
                          stacked: true,
                          beginAtZero: true,
                          ticks: {
                            precision: 0,
                          },
                        }
                      }
                    }}
                    data={omsetEo}
                  />
                </div>
              </div>
              <div className={activeChart === 2 ? 'block' : 'hidden'}>
                <div className='h-[350px] py-[27px] px-[46px]'>
                  <Bar
                    options={{
                      plugins: {
                        title: {
                          display: false
                        }
                      },
                      responsive: true,
                      maintainAspectRatio: false,
                      responsive: true,
                      scales: {
                        x: {
                          stacked: true
                        },
                        y: {
                          stacked: true,
                          beginAtZero: true,
                          ticks: {
                            precision: 0,
                          },
                        }
                      }
                    }}
                    data={omsetVenue}
                  />
                </div>
              </div>
              <div className={activeChart === 3 ? 'block' : 'hidden'}>
                <div className='h-[350px] py-[27px] px-[46px]'>
                  <Bar
                    options={{
                      plugins: {
                        title: {
                          display: false
                        }
                      },
                      responsive: true,
                      maintainAspectRatio: false,
                      responsive: true,
                      scales: {
                        x: {
                          stacked: true
                        },
                        y: {
                          stacked: true,
                          beginAtZero: true,
                          ticks: {
                            precision: 0,
                          },
                        }
                      }
                    }}
                    data={omsetSupplier}
                  />
                </div>
              </div>
              <div className={activeChart === 4 ? 'block' : 'hidden'}>
                <div className='h-[350px] py-[27px] px-[46px]'>
                  <Bar
                    options={{
                      plugins: {
                        title: {
                          display: false
                        }
                      },
                      responsive: true,
                      maintainAspectRatio: false,
                      responsive: true,
                      scales: {
                        x: {
                          stacked: true
                        },
                        y: {
                          stacked: true,
                          beginAtZero: true,
                          ticks: {
                            precision: 0,
                          },
                        }
                      }
                    }}
                    data={omsetTalent}
                  />
                </div>
              </div>
            </div>
            {/* Chart Service */}
            <div className='w-full h-full space-y-5 bg-white rounded-xl'>
              <div className='h-10 w-full px-[46px] py-[48px] flex justify-between items-center border-b-2'>
                <h1 className='text-black font-semibold text-[20px]'>TOP 4 SERVICES</h1>
              </div>
              <div className='lg:px-[46px] md:px-[26px] px-[16px] py-[28px] flex justify-center items-center'>
                <div className='flex items-end lg:h-[547px] md:h-[447px] h-[347px] lg:space-x-6 space-x-2'>
                  {Object.values(topService).map((data, index) => {
                    return (
                      <div className='relative'>
                        <div
                          className={`${
                            index === 0
                              ? 'lg:h-[240px] md:h-[140px] h-[40px]'
                              : index === 1
                              ? 'lg:h-[300px] md:h-[200px] h-[100px]'
                              : index === 2
                              ? 'lg:h-[340px] md:h-[240px] h-[140px]'
                              : 'lg:h-[400px] md:h-[300px] h-[200px]'
                          } ${
                            index % 2 ? 'bg-cherry' : 'bg-primary'
                          } lg:w-[180px] md:w-20 w-16 rounded-[16px] flex justify-center`}
                        >
                          <div className='text-center pt-14'>
                            <h1 className='text-white font-medium lg:text-[16px] md:text-[14px] text-[12px]'>
                              {data.service_type}
                            </h1>
                            <h1
                              className={`${
                                index % 2 ? 'text-primary' : 'text-cherry'
                              } font-bold lg:text-[19px] md:text-[17px] text-[15px]`}
                            >
                              {data.total_transactions}
                            </h1>
                            <h1 className='text-white lg:text-[14px] md:text-[12px] text-[10px]'>
                              {!data?.company_name ? '-' : data.company_name}
                            </h1>
                          </div>
                        </div>
                        <div className='absolute lg:-top-16 md:-top-12 -top-8 lg:left-10 md:left-2 left-2 lg:right-10 md:right-2 right-2'>
                          <div className='relative'>
                            {index === 3 && (
                              <div className='absolute lg:-top-12 md:-top-11 -top-10 lg:-left-5 md:-left-6 -left-7'>
                                <img src={IconKing} />
                              </div>
                            )}
                            <div className='lg:w-[98px] md:w-[68px] w-[48px] lg:h-[98px] md:h-[68px] h-[48px] rounded-full bg-gradient-to-r from-[#2D014B] to-[#00CDB4] flex justify-center items-center'>
                              <img
                                src={!data.company_logo ? LogoDefault : imageHandle(data.company_logo)}
                                className='lg:w-[94px] md:w-[64px] w-[44px] lg:h-[94px] md:h-[64px] h-[44px] rounded-full'
                              />
                            </div>
                            <div className='absolute -bottom-2 lg:left-8 md:left-5 left-3 lg:right-8 md:right-5 right-3'>
                              <div className='relative'>
                                <div className='h-[24px] w-[24px] rounded-lg bg-[#FFAA00] rotate-45'></div>
                                <div className='absolute top-0 bottom-0 text-white left-2 right-2'>
                                  {topService.length - (index - 1) - 1}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterTwo />
    </div>
  );
};

export default DashboardAdmin;
