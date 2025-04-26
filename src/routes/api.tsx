import { API_URL } from '../utils';

export const apiRoutes = {
  login: `${API_URL}/auth/admin`,
  getAdmin: `${API_URL}/admin`,
  getConfigs: `${API_URL}/admin/configs`,
  transaction: `${API_URL}/admin/transactions`,
  tickets: `${API_URL}/admin/tickets`,
  handleTransaction: `${API_URL}/admin/transaction`,
  updateConfig: `${API_URL}/admin/config`,
  logout: `${API_URL}/logout`,
  users: `${API_URL}/admin/users`,
  reviews: `${API_URL}/unknown`,
};
