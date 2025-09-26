import {
  ActionType,
  ProTable,
  ProColumns,
  RequestData,
  TableDropdown,
  ProDescriptions,
} from '@ant-design/pro-components';
import { Avatar, BreadcrumbProps, Modal, Space, Tag } from 'antd';
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
  HighlightOutlined,
} from '@ant-design/icons';
import { MdAdd, MdMoney, MdOutlineCancel, MdOutlineDone, MdPayment, MdVerifiedUser, MdWallet } from 'react-icons/md';
import { AiOutlineDownCircle } from 'react-icons/ai';


const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.dashboard,
      title: <Link to={webRoutes.dashboard}>Dashboard</Link>,
    },
    {
      key: webRoutes.deposit,
      title: <Link to={webRoutes.historyUser}>History</Link>,
    },
  ],
};

const HistoryUser = () => {
  const actionRef = useRef<ActionType>();
  const [modal, modalContextHolder] = Modal.useModal();
  const [transaction_type,setTransaction_type]=useState([])
  const columns: ProColumns[] = [
    {
      title: 'User ID',
      dataIndex: 'userId',
      align: 'center',
      sorter: false,
      render: (userId, row: any) => (
        <div className='flex flex-col gap-1'>
          <div className='flex gap-2'>
            <label>ID GD:</label>
            <div className='font-[700]'>{row?._id}</div>
          </div>
          <div className='flex gap-2'>
            <label>User ID:</label>
            <div>{row?.user?.userId}</div>
          </div>
          <div className='flex gap-2'>
            <label>SĐT:</label>
            <div>{row?.user?.phone}</div>
          </div>
          <div className='flex gap-2'>
            <label>Ngày giao dịch:</label>
            <div>{new Date(row?.createdAt)?.toLocaleString()}</div>
          </div>
        </div>
      )
    },
    {
      title: 'Thông tin',
      dataIndex: 'phone',
      align: 'center',
      sorter: false,
      render: (userId, row: any) => {
        if (row?.transaction_type === 'withdraw') {
          const bankInfo = row && JSON.parse(row?.paymentMethod || "{}")
          return (
            <div className='flex flex-col gap-1'>
              <div className='flex gap-2'>
                <label>Tên Ngân Hàng:</label>
                <div className='font-[700]'>{bankInfo?.nameBank}</div>
              </div>
              <div className='flex gap-2'>
                <label>Tên Chủ Thẻ:</label>
                <div className='font-[700]'>{bankInfo?.holderName}</div>
              </div>
              <div className='flex gap-2'>
                <label>STK:</label>
                <div className='font-[700]'>{bankInfo?.numberBank}</div>
              </div>
              <div className='flex gap-2'>
                <label>Số lượng ($):</label>
                <div>{row?.value}$ </div>
              </div>
              <div className='flex gap-2'>
                <label>Số tiền (vnđ):</label>
                <div>{row?.fiat_amount?.toLocaleString()} vnđ </div>
              </div>
            </div>
          )
        }
        if (row?.transaction_type === 'deposit') {
          return (
            <div className='flex flex-col gap-1'>
              <div className='flex gap-2'>
                <label>Cổng thanh toán:</label>
                <div>{row?.paymentMethod}</div>
              </div>
              <div className='flex gap-2'>
                <label>Số lượng ($):</label>
                <div>{row?.value}$ </div>
              </div>
              <div className='flex gap-2'>
                <label>Số tiền (vnđ):</label>
                <div>{row?.fiat_amount?.toLocaleString()} vnđ </div>
              </div>
            </div>
          )
        } else {
          return (
            <div className='flex flex-col gap-1'>

              <div className='flex gap-2'>
                <label>Số lượng ($):</label>
                <div>{row?.value}$ </div>
              </div>
              <div className='flex gap-2'>
                <label>Số tiền (vnđ):</label>
                <div>{row?.fiat_amount?.toLocaleString()} vnđ </div>
              </div>
            </div>
          )
        }

      }

    },
    {
      title: 'Loại GD',
      dataIndex: 'transaction_type',
      filters: [
        { text: 'Thưởng giới thiệu', value: 'reward_refferal' },
        { text: 'Rút tiền', value: 'withdraw' },
        { text: 'Nạp tiền', value: 'deposit' },
        { text: 'Điểm danh', value: 'checkin' },
      ],
      align: 'center',
      sorter: false,
      render: (userId, row: any) => (
        <div>
          {
            row?.transaction_type === 'reward_refferal' && <Tag color='cyan'>Thưởng giới thiệu</Tag>
          }
          {
            row?.transaction_type === 'withdraw' && <Tag color='blue'>Rút tiền</Tag>
          }
          {
            row?.transaction_type === 'deposit' && <Tag color='geekblue'>Nạp tiền</Tag>
          }
          {
            row?.transaction_type === 'checkin' && <Tag color='gold'>Điểm danh</Tag>
          }
        </div>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: '_id',
      align: 'center',
      sorter: false,
      render: (userId, row: any) => (
        <div className='flex flex-col gap-1'>
          {
            row?.transaction_status === 'pending' && <Tag className='text-center' color='orange-inverse'>Đang chờ</Tag>
          }
          {
            row?.transaction_status === 'cancel' && <Tag className='text-center' color='red-inverse'>Đã huỷ</Tag>
          }
          {
            row?.transaction_status === 'finish' && <Tag className='text-center' color='green-inverse'>Đã giải quyết</Tag>
          }
        </div>
      )
    },

    {
      title: 'Note',
      dataIndex: '_id',
      align: 'center',
      sorter: false,
      render: (userId, row: any) => (
        <div>
          {row?.note}
        </div>
      )
    },


  ];

  const handleActionOnSelect = (key: string, transaction: any) => {
    showConfirmation(key, transaction);
  };

  const showConfirmation = (key: string, transaction: any) => {
    modal.confirm({
      title: 'Bạn có chắc thay đổi',
      icon: <ExclamationCircleOutlined />,

      okButtonProps: {
        className: 'bg-primary',
      },
      onOk: () => {
        return http
          .post(`${apiRoutes.handleTransaction}`, {
            transaction_id: transaction._id,
            typeResolve: key
          })
          .then(() => {
            showNotification(
              'Success',
              NotificationType.SUCCESS,
              'Đã thay đổi thành công'
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
            .get(apiRoutes.transaction, {
              params: {
                page: params.current,
                per_page: params.pageSize,
                search: params.keyword,
              },
            })
            .then((response) => {
              const trasactions: [User] = response.data.data?.trasactions;

              return {
                data: trasactions,
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

export default HistoryUser;
