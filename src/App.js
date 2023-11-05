import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import About from './pages/About';
import {
  DaftarArtikel,
  DaftarPartner,
  DaftarStakeholder,
  DaftarTender,
  DaftarTransaction,
  DashboardAdmin,
  DetailArtikel,
  DetailListLayananPartner,
  DetailPartner,
  DetailTender,
  EditPartner,
  EditStakeholder,
  ListBidding,
  ListLayananPartner,
  TambahArtikel,
} from './pages/Admin';
import EditArtikel from './pages/Admin/Blog/EditArtikel';
import {
  ForgetPassword,
  ForgetPasswordAuth,
  Login,
  Register,
  RegisterAuth,
  RegisterRole,
  RegisterSuccess,
} from './pages/Auth';
import { ArtikelTerbaru, DetailArtikelHome, KategoriArtikel, MainBlog } from './pages/Blog';
import DetailLayanan from './pages/DetailLayanan';
import { InternetServerError, PageExpired, PageNotFound } from './pages/Error';
import FAQ from './pages/FAQ';
import FormPemesanan from './pages/FormPemesanan';
import Success from './pages/FormPemesanan/success';
import { ComingSoon, UpComming } from './pages/HandlingComingSoon';
import Home from './pages/Home';
import { EditProfile, ProfilePengguna } from './pages/Profile';
import {
  CompanyProfilePartner,
  CompanyProfileStakeholder,
  DashboardEventHunter,
  DashboardEventOrganizer,
  DashboardPartner,
  DashboardProfileEventHunter,
  DashboardProfileSH,
  DashboardSupplier,
  DashboardTalent,
  DashboardVenue,
  DekorasiToko,
  DetailAdminSupplier,
  DetailEventOrganizer,
  DetailLayananEventHunter,
  DetailLayananSupplier,
  DetailLayananTalent,
  DetailPartnerOpenTender,
  DetailVenue,
  EditLayananEventOrganizer,
  EditLayananSupplier,
  EditLayananTalent,
  EditLayananVenue,
  HistoryOfJoinTender,
  LayananEventOrganizer,
  LayananStakeholder,
  LayananSupplier,
  LayananTalent,
  LayananVenue,
  PermintaanPenawaran,
  ProfileEventHunter,
  ProfileEventOrganizer,
  RiwayatBidding,
  RiwayatTransaksi,
  ServiceHistory,
  Supplier,
  TambahTender,
  Toko,
  UserProfile,
} from './pages/Role';
import Search from './pages/Search';

const devMode = process.env.NODE_ENV === 'development';

function App() {
  return (
    <div className={devMode ? 'debug-screens' : ''}>
      <ToastContainer />
      <Routes>
        {/* Error Page */}
        <Route
          name='Global 404'
          path='*'
          element={<PageNotFound />}
        />
        <Route
          name='PageNotFound'
          path='/404'
          element={<PageNotFound />}></Route>
        <Route
          name='PageExpired'
          path='/419'
          element={<PageExpired />}></Route>
        <Route
          name='InternetServerError'
          path='/500'
          element={<InternetServerError />}></Route>

        {/* Profile Page */}
        <Route
          name='CompanyProfilePartner'
          path='/company-porifle-partner'
          element={<CompanyProfilePartner />}></Route>
        <Route
          name='MainProfile'
          path='/profile'
          element={<ProfilePengguna />}></Route>
        <Route
          name='EditProfile'
          path='/edit-profile'
          element={<EditProfile />}></Route>

        {/* Detail */}
        <Route
          name='DetailVenue'
          path='/detail-venue'
          element={<DetailVenue />}></Route>

        {/* Layanan */}
        <Route
          name='LayananVenue'
          path='/add-venue'
          element={<LayananVenue />}></Route>
        <Route
          name='LayananStakeholder'
          path='/add-layanan'
          element={<LayananStakeholder />}></Route>
        <Route
          name='LayananSupplier'
          path='/add-supplier'
          element={<LayananSupplier />}></Route>
        <Route
          name='LayananTalent'
          path='/add-layanan-talent'
          element={<LayananTalent />}></Route>
        <Route
          name='EditLayananTalent'
          path='/edit-layanan-talent'
          element={<EditLayananTalent />}></Route>
        <Route
          name='EditLayananVenue'
          path='/edit-layanan-venue'
          element={<EditLayananVenue />}></Route>
        <Route
          name='EditLayananSupplier'
          path='/edit-layanan-supplier'
          element={<EditLayananSupplier />}></Route>
        <Route
          name='DetailAdminSupplier'
          path='/detail-admin-supplier'
          element={<DetailAdminSupplier />}
        />
        <Route
          name='Supplier'
          path='/detail-admin-supplier/supplier'
          element={<Supplier />}
        />

        {/* Admin */}

        <Route
          name='DashboardAdmin'
          path='/admin'
          element={<DashboardAdmin />}></Route>
        <Route
          name='DashboardStakeholder'
          path='/admin/stakeholder'
          element={<DaftarStakeholder />}></Route>
        <Route
          name='MenuPartner'
          path='/admin/partner'
          element={<DaftarPartner />}></Route>
        <Route
          name='EditPartner'
          path='/admin/edit-partner'
          element={<EditPartner />}></Route>
        <Route
          name='DetailPartner'
          path='/admin/detail-partner'
          element={<DetailPartner />}></Route>
        <Route
          name='ListLayananPartner'
          path='/admin/detail-partner/list-layanan-partner'
          element={<ListLayananPartner />}></Route>
        <Route
          name='DetailListLayananPartner'
          path='/admin/detail-partner/detai-list-layanan-partner'
          element={<DetailListLayananPartner />}></Route>
        <Route
          name='ListBidding'
          path='/admin/detail-partner/list-bidding'
          element={<ListBidding />}></Route>
        <Route
          name='Transaction'
          path='/admin/transaction'
          element={<DaftarTransaction />}></Route>
        <Route
          name='DaftarTender'
          path='/admin/open-tender'
          element={<DaftarTender />}></Route>
        <Route
          name='DetailTender'
          path='/admin/detail-open-tender'
          element={<DetailTender />}></Route>
        <Route
          name='EditStakeholder'
          path='/admin/stakeholder/edit-stakeholder'
          element={<EditStakeholder />}></Route>
        <Route
          name='DaftarArtikel'
          path='/admin/blog'
          element={<DaftarArtikel />}></Route>
        <Route
          name='TambahArtikel'
          path='/admin/blog/tambah-artikel'
          element={<TambahArtikel />}></Route>
        <Route
          name='DetailArtikel'
          path='/admin/blog/detail-artikel'
          element={<DetailArtikel />}></Route>
        <Route
          name='EditArtikel'
          path='/admin/blog/edit-artikel'
          element={<EditArtikel />}></Route>

        {/* Dashboard */}
        <Route
          name='DashboardPartner'
          path='/dashboard-partner'
          element={<DashboardPartner />}></Route>
        <Route
          name='DashboardVenue'
          path='/dashboard-venue'
          element={<DashboardVenue />}></Route>
        <Route
          name='Supplier'
          path='/dashboard-Supplier'
          element={<DashboardSupplier />}></Route>
        <Route
          name='DashboardTalent'
          path='/dashboard-talent'
          element={<DashboardTalent />}></Route>
        <Route
          name='DashboardEventHunter'
          path='/dashboard-event-hunter'
          element={<DashboardEventHunter />}></Route>

        {/* Auth */}
        <Route
          name='Login'
          path='/login'
          element={<Login />}></Route>
        <Route
          name='RegisterRole'
          path='/register-role'
          element={<RegisterRole />}></Route>
        <Route
          name='Register'
          path='/register'
          element={<Register />}></Route>
        <Route
          name='RegisterAuth'
          path='/register-auth'
          element={<RegisterAuth />}></Route>
        <Route
          name='RegisterSuccess'
          path='/register-success'
          element={<RegisterSuccess />}></Route>
        <Route
          name='ForgetPassword'
          path='/forget-password/:id'
          element={<ForgetPassword />}></Route>
        <Route
          name='ForgetPasswordAuth'
          path='/forget-password-auth'
          element={<ForgetPasswordAuth />}></Route>

        {/* Stakeholder */}
        <Route
          name='DashboardProfileSH'
          path='/dashboard-stakeholder'
          element={<DashboardProfileSH />}></Route>
        <Route
          name='ServiceHistory'
          path='/riwayat-layanan-sh'
          element={<ServiceHistory />}></Route>
        <Route
          name='HistoryOfJoinTender'
          path='/riwayat-tender-sh'
          element={<HistoryOfJoinTender />}></Route>
        <Route
          name='CompanyProfileStakeHolder'
          path='/company-profile-sh'
          element={<CompanyProfileStakeholder />}></Route>
        <Route
          name='UserProfile'
          path='/user-profile-sh'
          element={<UserProfile />}></Route>
        <Route
          name='DetailPartnerOpenTender'
          path='/detail-partner-open-Tender'
          element={<DetailPartnerOpenTender />}></Route>
        <Route
          name='TambahTender'
          path='/tambah-tender'
          element={<TambahTender />}></Route>

        <Route
          name='Home'
          path='/'
          element={<Home />}></Route>
        <Route
          name='Search'
          path='/search'
          element={<Search />}></Route>
        <Route
          name='DetailLayanan'
          path='/detail-layanan/:kategori/:id'
          element={<DetailLayanan />}></Route>
        <Route
          name='FormPemesanan'
          path='/form-pemesanan/:kategori/:id'
          element={<FormPemesanan />}></Route>
        <Route
          name='FormPemesananSukses'
          path='/form-pemesanan-success'
          element={<Success />}></Route>
        <Route
          name='About'
          path='/about'
          element={<About />}></Route>
        <Route
          name='FAQ'
          path='/faq'
          element={<FAQ />}></Route>

        {/* Even Hunter */}
        <Route
          name='DashboardProfileEventHunter '
          path='/dashboard-eh'
          element={<DashboardProfileEventHunter />}></Route>
        <Route
          name='DetailLayananEventHunter'
          path='/detail-layanan-eh/:id'
          element={<DetailLayananEventHunter />}></Route>
        <Route
          name='ProfileEventHunter'
          path='/profile-eh'
          element={<ProfileEventHunter />}></Route>

        {/* Event Organizer */}
        <Route
          name='DashbordEvenOrganization'
          path='/dashboard-event-organizer'
          element={<DashboardEventOrganizer />}></Route>
        <Route
          name='LayananEventOrganizer'
          path='/add-layanan-eo'
          element={<LayananEventOrganizer />}></Route>
        <Route
          name='DetailEventOrganizer'
          path='/detail-even-organization'
          element={<DetailEventOrganizer />}></Route>
        <Route
          name='EventOrganizerProfile'
          path='/profile-eo'
          element={<ProfileEventOrganizer />}></Route>
        <Route
          name='EditLayananEventOrganizer'
          path='/edit-layanan-eo'
          element={<EditLayananEventOrganizer />}></Route>

        {/* talent */}
        <Route
          name='DetailLayananTalent'
          path='/detail-layanan-talent'
          element={<DetailLayananTalent />}></Route>

        {/* Supplier */}
        <Route
          name='DetailLayananSupplier'
          path='/detail-layanan-supplier'
          element={<DetailLayananSupplier />}></Route>

        {/* Blog */}
        <Route
          name='Main Blog'
          path='/blog'
          element={<MainBlog />}
        />
        <Route
          name='Kategori Artikel'
          path='/blog/kategori'
          element={<KategoriArtikel />}
        />
        <Route
          name='Artikel Terbaru'
          path='/blog/terbaru'
          element={<ArtikelTerbaru />}
        />
        <Route
          name='Detail Artikel'
          path='/blog/detail/:path'
          element={<DetailArtikelHome />}
        />

        {/* Upcoming */}

        <Route
          name='UpcomingFeatures'
          path='/upcoming-features'
          element={<UpComming />}></Route>
        <Route
          name='ComingSoon'
          path='/comming-soon'
          element={<ComingSoon />}></Route>
        {/* Partner */}
        <Route
          name='PermintaanPenawaran'
          path='/permintaan-penawaran'
          element={<PermintaanPenawaran />}></Route>
        <Route
          name='Toko'
          path='/toko'
          element={<Toko />}></Route>
        <Route
          name='DekorasiToko'
          path='/dekorasi-toko'
          element={<DekorasiToko />}></Route>
        <Route
          name='RiwayatBidding'
          path='/riwayat-bidding'
          element={<RiwayatBidding />}></Route>
        <Route
          name='RiwayatTransaksi'
          path='/riwayat-transaksi'
          element={<RiwayatTransaksi />}></Route>
      </Routes>
    </div>
  );
}

export default App;
