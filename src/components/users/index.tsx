import {
  ActionType,
  ProTable,
  ProColumns,
  RequestData,
  TableDropdown,
  ProDescriptions,
} from '@ant-design/pro-components';
import { Avatar, BreadcrumbProps, Modal, Space } from 'antd';
import { useRef } from 'react';
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
            <label>VIP:</label>
            <div>{row?.vip}</div>
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
          <div className='flex gap-2'>
            <label>Số Vòng Quay:</label>
            <div>{row?.drawNum}</div>
          </div>
          <div className='flex gap-2'>
            <label>Số Ngày Checkin:</label>
            <div>{row?.checkInToday}</div>
          </div>

        </div>
      )
    },
    {
      title: 'Tài khoản',
      dataIndex: 'bankList',
      align: 'center',
      sorter: false,
      render: (bankList: any, row: any) => {
        if (bankList?.length > 0) {
          const mainBank = bankList[0]
          return (
            <div className='flex flex-col gap-1'>
              <div className='flex gap-2'>
                <label>Tên TK</label>
                <div style={{
                  color: row?.user?.realBalance >= 5 ? "red" : "#000",
                  fontWeight: 600
                }}>{mainBank?.holderName}</div>
              </div>
              <div className='flex gap-2'>
                <label>Số TK</label>
                <div style={{
                  color: row?.user?.realBalance >= 5 ? "red" : "#000",
                  fontWeight: 600
                }}>{mainBank?.numberBank}</div>
              </div>
              <div className='flex gap-2'>
                <label>Tên Ngân Hàng</label>
                <div style={{
                  color: row?.user?.realBalance >= 5 ? "red" : "#000",
                  fontWeight: 600
                }}>{mainBank?.nameBank}</div>
              </div>
              

            </div>
          )
        }

      }



    },
    {
      title: 'Action',
      align: 'center',
      key: 'option',
      fixed: 'right',
      render: (_, row: User) => [
        <TableDropdown
          key="actionGroup"
          onSelect={(key) => handleActionOnSelect(key, row)}
          menus={[
            {
              key: "profile",
              name: (
                <Space>
                  <UserOutlined />
                  Thay đổi
                </Space>
              ),
            },
            {
              key: "deposit",
              name: (
                <Space>
                  <WalletOutlined />
                  Ví
                </Space>
              ),
            },
            {
              key: "delete",
              name: (
                <Space>
                  <DeleteOutlined />
                  Delete
                </Space>
              ),
            },
          ]}
        >
          <Icon component={CiCircleMore} className="text-primary text-xl" />
        </TableDropdown>,
      ],
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
