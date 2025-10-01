import { API_URL } from '../utils';

export const apiRoutes = {
  login: `${API_URL}/auth/admin`,
  dataUsers: `${API_URL}/admin/data-users`,
  dataDashboard: `${API_URL}/admin/dashboard`,
  updateUser: `${API_URL}/admin/userData`,
  dataUserDetail: (userId: string) => `${API_URL}/admin/user/${userId}`,
  dataTickets: `${API_URL}/admin/data-tickets`,
  getAdmin: `${API_URL}/admin`,
  getConfigs: `${API_URL}/admin/configs`,
  transaction: `${API_URL}/admin/transactions`,
  tickets: `${API_URL}/admin/tickets`,
  handleTransaction: `${API_URL}/admin/transaction`,
  updateConfig: `${API_URL}/admin/config`,
  logout: `${API_URL}/logout`,
  users: `${API_URL}/admin/users`,
  reviews: `${API_URL}/unknown`,
  codes: `${API_URL}/admin/codes`,
  createCode: `${API_URL}/admin/code`,
  packs: `${API_URL}/admin/invest-packs`,
  updatePack: (id: string) => `${API_URL}/admin/invest-pack/${id}`,
  createPack: `${API_URL}/admin/invest-pack`,
};
