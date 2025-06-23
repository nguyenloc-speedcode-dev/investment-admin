//config.ts

enum LayoutType {
  MIX = 'mix',
  TOP = 'top',
  SIDE = 'side',
}

const CONFIG = {
  appName: 'BitPool Invest',
  helpLink: 'https://github.com/arifszn/reforge',
  enablePWA: true,
  theme: {
    accentColor: '#1bb757',
    sidebarLayout: LayoutType.SIDE,
    showBreadcrumb: true,
  },
  metaTags: {
    title: 'BitPool',
    description: 'Quản lý thông tin dự án game',
    imageURL: 'https://bitpoolinvest.com/static/media/logo.2fbb89a416183a821216.png',
  },
};

export default CONFIG;
