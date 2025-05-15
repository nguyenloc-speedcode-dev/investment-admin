import {
  ActionType,
  ProTable,
  ProColumns,
  RequestData,
  TableDropdown,
  ProDescriptions,
} from '@ant-design/pro-components';
import { Avatar, BreadcrumbProps, Button, Dropdown, Menu, Modal, Select, Space } from 'antd';
import { useRef, useState } from 'react';
import { FiUsers } from 'react-icons/fi';
import { CiCircleMore } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { User } from '../../interfaces/models/user';
import { apiRoutes } from '../../routes/api';
import { webRoutes } from '../../routes/web';
import {
  handleErrorResponse,
  NotificationType,
  showNotification,
} from '../../utils';
import http from '../../utils/http';
import BasePageContainer from '../layout/PageContainer';
import LazyImage from '../lazy-image';
import Icon, {
  ExclamationCircleOutlined,
  DeleteOutlined,
  UserOutlined,
  WalletOutlined,
  EllipsisOutlined,
  MoneyCollectFilled,
} from '@ant-design/icons';
import { MdAdd, MdMoney, MdVerifiedUser, MdWallet } from 'react-icons/md';


const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.dashboard,
      title: <Link to={webRoutes.dashboard}>Dashboard</Link>,
    },
    {
      key: webRoutes.users,
      title: <Link to={webRoutes.users}>Users</Link>,
    },
  ],
};

const Users = () => {
  const actionRef = useRef<ActionType>();
  const [modal, modalContextHolder] = Modal.useModal();
  const [vipSelection, setVipSelection] = useState<number | null>(null);

  const [realBalance, setRealbalance] = useState<number | null>(null);


  const columns: ProColumns[] = [
    {
      title: 'User ID',
      dataIndex: 'userId',
      align: 'center',
      sorter: false,
      render: (userId, row: any) => (
        <div className='flex flex-col gap-1'>
          <div className='flex gap-2'>
            <label>User ID:</label>
            <div>{row?.userId}</div>
          </div>
          <div className='flex gap-2'>
            <label>User Name:</label>
            <div>{row?.userName}</div>
          </div>
          <div className='flex gap-2'>
            <label>Ref Code:</label>
            <div>{row?.refCode}</div>
          </div>
          <div className='flex gap-2'>
            <label>Invite Code:</label>
            <div>{row?.inviteCode || "-"}</div>
          </div>
          <div className='flex gap-2'>
            <label>Số người mời:</label>
            <div>{row?.inviteUser?.length || "-"}</div>
          </div>
        </div>
      )
    },
    {
      title: 'Tài khoản',
      dataIndex: 'phone',
      align: 'center',
      sorter: false,
      render: (userId, row: any) => (
        <div className='flex flex-col gap-1'>
          <div className='flex gap-2'>
            <label>SĐT:</label>
            <div>{row?.phone}</div>
          </div>
          <div className='flex gap-2'>
            <label>Đại lý:</label>
            <div>{row?.vip}</div>
          </div>
          <div className='flex gap-2'>
            <label>VIP:</label>
            <div>{row?.farmVip}</div>
          </div>
          <div className='flex gap-2'>
            <label>Mật khẩu:</label>
            <div>{row?.password}</div>
          </div>
          <div className='flex gap-2'>
            <label>Ngày tạo:</label>
            <div>{new Date(row?.createdAt)?.toLocaleString()}</div>
          </div>
          <div className='flex gap-2'>
            <label>IP:</label>
            <div className='font-[500]'>{row?.registerIp}</div>
          </div>
          <div className='flex gap-2'>
            <label>DeviceId:</label>
            <div className='font-[500]'>{row?.uuid}</div>
          </div>
        </div>
      )
    },
    {
      title: 'Ví',
      dataIndex: 'phone',
      align: 'center',
      sorter: false,
      render: (userId, row: any) => (
        <div className='flex flex-col gap-1'>
          <div className='flex gap-2'>
            <label>Số dư:</label>
            <div style={{
              color: row?.realBalance >= 5 ? "red" : "#000",
              fontWeight: 600
            }}>{row?.realBalance?.toLocaleString()}</div>
          </div>
          <div className='flex gap-2'>
            <label>Mật khẩu ví:</label>
            <div>{row?.payment_password}</div>
          </div>

        </div>
      )
    },
    {
      title: 'Hoạt động',
      dataIndex: 'phone',
      align: 'center',
      sorter: false,
      render: (userId, row: any) => (
        <div className='flex flex-col gap-1'>
          <div className='flex gap-2' >
            <label>Số Vòng Quay:</label>
            <div>{row?.drawNum}</div>
          </div>
          <div className='flex gap-2'>
            <label>Số Ngày Checkin:</label>
            <div>{row?.checkInToday}</div>
          </div>
          <div className='flex gap-2'>
            <label>Số Ticker:</label>
            <div>{row?.duckSticker}</div>
          </div>
          <div className='flex gap-2'>
            <label>Số Lần tìm kho báu:</label>
            <div>{row?.mineNum}</div>
          </div>
        </div>

      )
    },
    {
      title: 'Action',
      align: 'center',
      key: 'option',
      fixed: 'right',
      render: (_, row: any) => {
        return (
          <div className='flex justify-center'>
            {
              row?.roles?.[0]?.code === 'USER' ?
                <Link to={`/user-detail/${row?._id}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </Link>
                :
                <h3 className='text-red-600 font-[900]'>ADMIN</h3>
            }


          </div>


        )
      }
    },
  ];

  const handleActionOnSelect = (key: string, user: User) => {
    if (key === 'delete') {
      showDeleteConfirmation(user);
    }
  };



  const showDeleteConfirmation = (user: User) => {
    modal.confirm({
      title: 'Are you sure to delete this user?',
      icon: <ExclamationCircleOutlined />,
      content: (
        <ProDescriptions column={1} title=" ">
          <ProDescriptions.Item valueType="avatar" label="Avatar">
            {user.avatar}
          </ProDescriptions.Item>
          <ProDescriptions.Item valueType="text" label="Name">
            {user.first_name} {user.last_name}
          </ProDescriptions.Item>
          <ProDescriptions.Item valueType="text" label="Email">
            {user.email}
          </ProDescriptions.Item>
        </ProDescriptions>
      ),
      okButtonProps: {
        className: 'bg-primary',
      },
      onOk: () => {
        return http
          .delete(`${apiRoutes.users}/${user.id}`)
          .then(() => {
            showNotification(
              'Success',
              NotificationType.SUCCESS,
              'User is deleted.'
            );

            actionRef.current?.reloadAndRest?.();
          })
          .catch((error) => {
            handleErrorResponse(error);
          });
      },
    });
  };
  const handleSearchVip = (value: string) => {
    console.log(`selected ${value}`);
  };


  const handleMenuClick = (e: any) => {
    // Cập nhật giá trị vipSelection khi người dùng chọn 1 menu item
    setVipSelection(e.key);
    actionRef?.current?.reload()
  };

  const handleMenuClickSelectRelbalnce = (e: any) => {
    // Cập nhật giá trị vipSelection khi người dùng chọn 1 menu item
    setRealbalance(e.key);
    actionRef?.current?.reload()
  };
  return (
    <BasePageContainer breadcrumb={breadcrumb}>

      <ProTable
        columns={columns}
        cardBordered={false}
        cardProps={{
          subTitle: 'Users',
          tooltip: {
            className: 'opacity-60',
            title: 'Mocked data',
          },
          title: <FiUsers className="opacity-60" />,

        }}
        bordered={true}
        showSorterTooltip={false}
        scroll={{ x: true }}
        tableLayout={'fixed'}
        rowSelection={false}
        pagination={{
          showQuickJumper: true,
          pageSize: 10,
        }}
        actionRef={actionRef}
        request={(params) => {
          return http
            .get(apiRoutes.users, {
              params: {
                page: params.current,
                per_page: params.pageSize,
                search: params.keyword,
                vip: vipSelection,
                realBalance
              },
            })
            .then((response) => {
              const users: [User] = response.data.data?.users;

              return {
                data: users,
                success: true,
                total: response.data?.data?.total,
              } as RequestData<User>;
            })
            .catch((error) => {
              handleErrorResponse(error);

              return {
                data: [],
                success: false,
              } as RequestData<User>;
            });
        }}
        dateFormatter="string"
        search={false}
        toolBarRender={() => [
          <Dropdown
            key="menu"
            overlay={
              <Menu onClick={handleMenuClick}>
                <Menu.Item key="1">Vip1</Menu.Item>
                <Menu.Item key="2">Vip2</Menu.Item>
                <Menu.Item key="3">Vip3</Menu.Item>
                <Menu.Item key="4">Vip4</Menu.Item>
                <Menu.Item key="6">Vip6</Menu.Item>
                <Menu.Item key="7">Vip7</Menu.Item>
                <Menu.Item key="8">Vip8</Menu.Item>
              </Menu>
            }
          >
            <Button>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
          <Dropdown
            key="menu"
            overlay={
              <Menu onClick={handleMenuClickSelectRelbalnce}>
                <Menu.Item key="5">{"Số dư >= 5"}</Menu.Item>
                <Menu.Item key="10">{"Số dư >= 10"}</Menu.Item>
                <Menu.Item key="15">{"Số dư >= 15"}</Menu.Item>
              </Menu>
            }
          >
            <Button>
              <MoneyCollectFilled />
            </Button>
          </Dropdown>,
        ]

        }
        rowKey="_id"
        options={{
          search: {
            placeholder: 'Tìm kiếm theo ,UserID,Phone',
            width: 200,
            allowClear: true,
          },

        }}
      />
      {modalContextHolder}
    </BasePageContainer>
  );
};

export default Users;
