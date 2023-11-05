import { UrlApi } from './constants';
import request from './utils/request';

class Api {
  static urlAPI() {
    // return UrlApi+'/k1/';
    return "http://localhost:5000/k1/"
    // return "https://api.hub.konect.id/k1/"
  }

  // Begin :: Auth
  static Login(username, password) {
    let path = 'login';
    return request(`${this.urlAPI()}${path}`, {
      method: 'POST',
      data: {
        username,
        password,
      },
    });
  }
  static LoginWithFirebase(email) {
    let path = 'login-firebase';
    return request(`${this.urlAPI()}${path}`, {
      method: 'POST',
      data: {
        email,
      },
    });
  }

  static Register(data) {
    let path = 'register';
    return request(`${this.urlAPI()}${path}`, {
      method: 'POST',
      data,
    });
  }

  static VerifiCodeRegister(data) {
    let path = 'authentication-code';
    return request(`${this.urlAPI()}${path}`, {
      method: 'POST',
      data,
    });
  }

  static ResetPassword(data, id) {
    let path = `forget-password/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'PATCH',
      data,
    });
  }

  static SendVerificationEmailLink(data) {
    let path = 'send-link-forget-password';
    return request(`${this.urlAPI()}${path}`, {
      method: 'POST',
      data,
    });
  }

  // Begin :: Fetch

  static fetch(token) {
    let path = `user/fetch`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Begin :: User

  static getUser(token) {
    let path = `user`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static getUserByID(token, id) {
    let path = `user/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static getUserRole(token) {
    let path = `user-role`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static updateUser(token, id, data) {
    let path = `user/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'PATCH',
      data,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  // Begin :: Role

  static GetMainRole() {
    let path = 'main-role';
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
    });
  }

  static GetSubRole() {
    let path = 'sub-role';
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
    });
  }

  // Begin :: Item

  static postEo(token, data) {
    let path = 'eo/create';
    return request(`${this.urlAPI()}${path}`, {
      method: 'POST',
      data,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  static updateEoPackage(token, data, id) {
    let path = `eo/edit/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'PUT',
      data,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  static getMyEOData(token) {
    let path = 'eo';
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static getEoWithLogin(token, page, limit) {
    let path = `eo/get-with-login?limit=${limit}&page=${page}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static getEOById(id, token) {
    let path = `eo?id=${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static getVenueById(id, token) {
    let path = `venue?id=${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static updateVenue(token, data, id) {
    let path = `venue/edit/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'PUT',
      data,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  static updateTalent(token, data, id) {
    let path = `talent/edit/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'PUT',
      data,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  static updateActivatedEOService(id, token) {
    let path = `eo/update-activated?id=${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static updateActivatedVenueService(id, token) {
    let path = `venue/update-activated?id=${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static updateActivatedTalentService(id, token) {
    let path = `talent/update-activated?id=${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Begin :: Service

  static postService(token, data) {
    let path = 'create-service';
    return request(`${this.urlAPI()}${path}`, {
      method: 'POST',
      data,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  // Begin :: Company

  static getCompany(token, id) {
    let path = `companies/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static updateCompany(token, id, data) {
    let path = `companies/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      data,
    });
  }

  static getLegalDocument(token, id) {
    let path = `legal-documents/company/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static updateLegalDocument(token, id, data) {
    let path = `legal-documents/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      data,
    });
  }

  //

  static getProductItem(params, token) {
    let path = `item/type=${params}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static getDataService(token) {
    let path = `service-admin`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // homepage
  static getEOData() {
    let path = 'eo';
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
    });
  }
  static getAllEO(page, limit) {
    let path = `eo/get-without-login?limit=${limit}&page=${page}`;
    return request(`${this.urlAPI()}${path}`);
  }
  static getAllSupplier(page, limit) {
    let path = `product/get-without-login?limit=${limit}&page=${page}`;
    return request(`${this.urlAPI()}${path}`);
  }
  static getAllTalent(page, limit) {
    let path = `talent/get-without-login?limit=${limit}&page=${page}`;
    return request(`${this.urlAPI()}${path}`);
  }
  static getAllVenue(page, limit) {
    let path = `venue/get-without-login?limit=${limit}&page=${page}`;
    return request(`${this.urlAPI()}${path}`);
  }

  // search
  static postSearch(category, keyword) {
    let path = '';
    if (category === '') {
      path = `services?search=${keyword}`;
    } else {
      path = `services?category=${category}&search=${keyword}`;
    }
    return request(`${this.urlAPI()}${path}`, {
      method: 'POST',
    });
  }

  static postAllServices() {
    let path = 'services';
    return request(`${this.urlAPI()}${path}`, {
      method: 'POST',
    });
  }

  static postFilter(path) {
    return request(`${this.urlAPI()}${path}`, {
      method: 'POST',
    });
  }

  static getDetailLayanan(id, type) {
    let path = `services/${type}/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
    });
  }
  static getServiceBooking(token) {
    let path = `event-hunter/service-booking`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static getServiceFinish(token) {
    let path = `event-hunter/service-finish`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static getServiceAll(token) {
    let path = `event-hunter/service-all`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static getServiceByID(id, token) {
    let path = `event-hunter/service/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  static getDetailServiceEventHunter(token, id) {
    let path = `event-hunter/history-transaction?transactionId=${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static getBidding(token) {
    let path = `stakeholder/bidding`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static getRiwayatLayananStakeholder(token, service, page, limit) {
    let path = `stakeholder/history-transaction?service=${service}&page=${page}&limit=${limit}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static getRiwayatLayananDetailStakeholder(token, service, id) {
    let path = `stakeholder/history-transaction?service=${service}&transactionId=${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static getTender(token, limit, page) {
    let path = `tender/list?limit=${limit}&page=${page}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static submitTender(token, data, id) {
    let path = `tender/submitPartner?tenderId=${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'POST',
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static getTimelineTender(token, id) {
    let path = `tender/timeLineVerifed?tenderId=${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static approveAddOn(token, id) {
    let path = `tender/approvedAddOn?tenderId=${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static getTenderListPartner(token, id) {
    let path = `tender/list-partner?tenderId=${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static getTenderCompany(token, id) {
    let path = `tender/detail-company?companyId=${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static getTenderDetailById(id) {
    let path = `tender/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
    });
  }

  static getTenderWithoutLogin(limit, page) {
    let path = `tender?limit=${limit}&page=${page}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
    });
  }

  static postTender(token, data) {
    let path = `tender/create`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'POST',
      data,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  static getTenderById(token, id) {
    let path = `tender/detail?id=${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static getVenueWithLogin(token, page, limit) {
    let path = `venue/get-with-login?limit=${limit}&page=${page}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static createVenue(token, data) {
    let path = 'venue/create';
    return request(`${this.urlAPI()}${path}`, {
      method: 'POST',
      data,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  static biddingApplication(token, data) {
    let path = 'bidapplication/create';
    return request(`${this.urlAPI()}${path}`, {
      method: 'POST',
      data,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  //dashboard sh

  static createBiding(token, data) {
    let path = 'stakeholder/create-bidding';
    return request(`${this.urlAPI()}${path}`, {
      method: 'POST',
      data,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  static getBiddingDetail(id, token) {
    let path = `stakeholder/bidding/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // History booking service
  static postBookingService(token, data) {
    let path = 'transaction/create';
    return request(`${this.urlAPI()}${path}`, {
      method: 'POST',
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  static getHistoryService(token, type, page, limit) {
    let path = `transaction?type=${type}&page=${page}&limit=${limit}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  static getHistoryServiceById(token, id) {
    let path = `transaction/by?id=${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static resendCodeVerification(id) {
    let path = `resend-verifi-code/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'PATCH',
    });
  }

  // Statistic

  static getStakeholdersStatistic(token) {
    let path = `stakeholder/statistics`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static getStatistic(token) {
    let path = `partner/statistic`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static getStatisticEO(token) {
    let path = `eo/statistic`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static getStatisticVenue(token) {
    let path = `venue/statistic`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static getStatisticTalent(token) {
    let path = `talent/statistic`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static getStatisticSupplier(token) {
    let path = `product/statistic`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static getTalentWithLogin(token, page, limit) {
    let path = `talent/get-with-login?limit=${limit}&page=${page}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static getTalentById(id, token) {
    let path = `talent?id=${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static createTalent(token, data) {
    let path = `talent/create`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'POST',
      data,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  // SUPPLIER
  static getSupplier(token, page, limit) {
    let path = `product/get-with-login?limit=${limit}&page=${page}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  static getSupplierById(id, token) {
    let path = `product?id=${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  static postSupplier(token, data) {
    let path = 'product/create';
    return request(`${this.urlAPI()}${path}`, {
      method: 'POST',
      data,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  static updateSupplier(token, data, id) {
    let path = `product/edit/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'PUT',
      data,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  static updateActivatedSupplierService(id, token) {
    let path = `product/update-activated?id=${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Admin

  static TenderListAdmin(token, limit, page, search, isActive, addOns, stakeholderId) {
    let path = `admin-konect/tender?limit=${limit}&page=${page}&search=${search}&isActive=${isActive}&withAddOns=${addOns}&stakeholderId=${stakeholderId}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static UpdateActivationStatus(token, id, data) {
    let path = `admin-konect/activation-stakeholder/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'PUT',
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static StakeholderDetailAdmin(token, id) {
    let path = `admin-konect/stakeholder/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static StakeholderListAdmin(token) {
    let path = `admin-konect/stakeholder/list`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static StakeholderListFilterAdmin(token, limit, page, search, isActive, sort) {
    let path = `admin-konect/stakeholder?limit=${limit}&page=${page}&search=${search}&isActive=${isActive}&sort=${sort}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static PartnerListFilterAdmin(token, limit, page, search, isActive, sort) {
    let path = `admin-konect/partner-filter?limit=${limit}&page=${page}&search=${search}&isActive=${isActive}&sort=${sort}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static GetTransactionListByPartnerId(token, partnerId, limit, page, startDate, endDate, column, sortType) {
    let path = `partner/transaction-list/${partnerId}?limit=${limit}&page=${page}&start_date_filter=${startDate}&end_date_filter=${endDate}&sorted_column=${column}&sort_type=${sortType}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static PartnerDetailAdmin(token, id) {
    let path = `admin-konect/detail-partner/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static UpdateActivationPartnerStatus(token, id, data) {
    let path = `admin/activation-partner/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'PUT',
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static TransactionListAdmin(token, limit, page, search, status, minDate, maxDate, serviceType, company) {
    let path = `admin-konect/transaction?limit=${limit}&page=${page}&search=${search}&status=${status}&minDate=${minDate}&maxDate=${maxDate}&serviceType=${serviceType}&companyId=${company}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static TransactionDetail(token, id) {
    let path = `admin-konect/transaction/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static TransactionGetCompany(token, id) {
    let path = `admin-konect/transactions/companies`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static UpdateTransactionAdmin(token, id, data) {
    let path = `admin-konect/transaction/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'PUT',
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static DashboardAdminTopChart(token) {
    let path = `admin-konect/top4-dashboard`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static DashboardAdminCard(token) {
    let path = `admin-konect/card-dashboard`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static DashboardAdminStatistic(token) {
    let path = `admin-konect/statistic-dashboard`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Partner
  static PartnerGetTransaction(token) {
    let path = `partner/transaction-report`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static PartnerGetRiwayat(token, limit, page, isActive) {
    let path = `partner/bidding-histories?limit=${limit}&page=${page}&isActive=${isActive}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static PartnerGetRiwayatDetail(token, id) {
    let path = `partner/bidding-histories/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static PartnerGetServiceData(token, id, filter, category) {
    let path = `partner/get-all-product/${id}?filter=${filter}&category=${category}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static UpdatePartnerTransaction(token, transactionId, data) {
    let path = `transaction/${transactionId}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'PUT',
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static DeletePartnerTransaction(token, transactionId) {
    let path = `transaction/${transactionId}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static GetLayananPartner(token, partnerId, page, limit, category, search) {
    let path = `admin-konect/layanan-partner/${partnerId}?page=${page}&limit${limit}&category=${category}&search=${search}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Partner - Dekorasi Toko

  static GetBannersShopDecoration(token) {
    let path = `partner/shop-decorations/banners`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static GetPartnerShopDecorationInfo(token, partnerId) {
    let path = `partner/cardInfo/${partnerId}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static GetBannerImagesShopDecoration(token) {
    let path = `partner/shop-decorations/image-banners`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static GetShopDecoration(token) {
    let path = `partner/shop-decorations/`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static PutShopDecoration(token, data) {
    let path = `partner/shop-decorations/edit-about-us`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'PUT',
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static PostShopDecoration(token, data) {
    let path = `partner/shop-decorations/add-banner`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'POST',
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static DeleteBannerShopDecoration(token, bannerId) {
    let path = `partner/shop-decorations/delete-banner/${bannerId}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Blog
  static PostArticle(token, data) {
    let path = `admin-konect/create-article`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'POST',
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static PutArticle(token, data, id) {
    let path = `admin-konect/update-article/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'PUT',
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static GetArticles(token, category, search, isActive, sort, page, limit) {
    let path = `admin-konect/get-article?category=${category}&search=${search}&isActive=${isActive}&sort=${sort}&page=${page}&limit=${limit}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static GetArticleBySlug(slug) {
    let path = `admin-konect/get-article-bySlug/${slug}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
    });
  }

  static GetArticleById(id) {
    let path = `admin-konect/get-article/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'GET',
    });
  }

  static DeleteArticle(token, id) {
    let path = `admin-konect/delete-article/${id}`;
    return request(`${this.urlAPI()}${path}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default Api;
