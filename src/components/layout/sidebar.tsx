import { webRoutes } from '../../routes/web';
import { BiHomeAlt2 } from 'react-icons/bi';
import Icon, { UserOutlined, InfoCircleOutlined, HistoryOutlined } from '@ant-design/icons';
import { CiMoneyCheck1 } from 'react-icons/ci';

export const sidebar = [
  {
    path: webRoutes.dashboard,
    key: webRoutes.dashboard,
    name: 'Dashboard',
    icon: <Icon component={BiHomeAlt2} />,
  },
  {
    path: webRoutes.users,
    key: webRoutes.users,
    name: 'Users',
    icon: <UserOutlined />,
  },
  {
    path: webRoutes.deposit,
    key: webRoutes.deposit,
    name: 'Nạp tiền',
    icon: <CiMoneyCheck1 />,
  },
  {
    path: webRoutes.withdraw,
    key: webRoutes.withdraw,
    name: 'Rút tiền',
    icon: <CiMoneyCheck1 />,
  },
  {
    path: webRoutes.historyUser,
    key: webRoutes.historyUser,
    name: 'Lịch sử giao dịch',
    icon: <HistoryOutlined />,
  },
  {
    path: webRoutes.tickets,
    key: webRoutes.tickets,
    name: 'Lịch sử mua Ticket',
    icon: <HistoryOutlined />,
  },
  // {
  //   path: webRoutes.about,
  //   key: webRoutes.about,
  //   name: 'About',
  //   icon: <InfoCircleOutlined />,
  // },
];
