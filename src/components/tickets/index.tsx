/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  ActionType,
  ProTable,
  ProColumns,
  RequestData,
  TableDropdown,
  ProDescriptions,
} from '@ant-design/pro-components';
import { Avatar, BreadcrumbProps, Card, Image, Modal, Space, Tag, Tooltip, Typography } from 'antd';
import { useEffect, useRef, useState } from 'react';
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
      key: webRoutes.tickets,
      title: <Link to={webRoutes.tickets}>Tickets</Link>,
    },
  ],
};

const Tickets = () => {
  const actionRef = useRef<ActionType>();
  const [modal, modalContextHolder] = Modal.useModal();
  const [data, setData] = useState<any>()
  const getData = async () => {
    try {
      const res = await http.get(apiRoutes.dataTickets)
      if (res && res.data) {
        setData(res.data?.data)
      }
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    getData()
  }, [])


  const { Text, Title } = Typography;

  const moneyFormat = (val?: number, decimals = 5) => {
    if (typeof val !== 'number') return '-';
    return val.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  };

  const columns: ProColumns[] = [

    {
      title: 'Thông tin',
      dataIndex: 'transactionInfo',
      align: 'left',
      sorter: false,
      render: (_, row: any) => (
        <Space direction="vertical" size={6} style={{ width: '100%' }}>
          {row?.user?.isAccountForAdmin &&
            <Tag color='red-inverse'>
              <div className=' font-[900] text-center'>
                Tài khoản Admin
              </div>
            </Tag>
          }
          <Space>
            <Text strong>ID GD:</Text>
            <Text code>{row?._id || '-'}</Text>
          </Space>
          <Space>
            <Text strong>User ID:</Text>
            <Text ellipsis style={{ maxWidth: 150 }}>{row?.user?.userId || '-'}</Text>
          </Space>
          <Space>
            <Text strong>SĐT:</Text>
            <Text>{row?.user?.phone || '-'}</Text>
          </Space>
          <Space>
            <Text strong>IP:</Text>
            <Tooltip title={row?.user?.registerIp || '-'}>
              <Text ellipsis style={{ maxWidth: 140 }}>{row?.user?.registerIp || '-'}</Text>
            </Tooltip>
          </Space>
          <Space>
            <Text strong>Số dư:</Text>
            <Text strong style={{ color: row?.user?.realBalance >= 5 ? 'red' : 'inherit' }}>
              {Number(row?.user?.realBalance?.toFixed(3))}
            </Text>
          </Space>
          <Space>
            <Text strong>Ngày GD:</Text>
            <Text>{row?.createdAt ? new Date(row.createdAt).toLocaleString() : '-'}</Text>
          </Space>
        </Space>
      ),
    },
    {
      title: 'Thanh toán',
      dataIndex: 'paymentInfo',
      align: 'left',
      sorter: false,
      render: (_, row: any) => (
        <Space direction="vertical" size={6} style={{ width: '100%' }}>
          <Space>
            <Text strong>Số lượng ($):</Text>
            <Text strong>{Number(row?.value?.toFixed(3))}$</Text>
          </Space>
          <Space>
            <Text strong>Số tiền (vnđ):</Text>
            <Text>{Number(row?.fiat_amount?.toFixed(3)) || 0} vnđ</Text>
          </Space>
          <Space>
            <Text strong>Biến động:</Text>
            <Text strong>{moneyFormat(row?.currentBalanceUser, 4)}$</Text>
          </Space>
        </Space>
      ),
    },
    {
      title: 'Chi tiết',
      dataIndex: 'ticketInfo',
      align: 'left',
      sorter: false,
      render: (_, row: any) => (
        <Space direction="vertical" size={6} style={{ width: '100%' }}>
          <Space>
            <Text strong>Tên gói:</Text>
            <Text>{row?.ticket?.name || '-'}</Text>
          </Space>
          <Space>
            <Text strong> VIP Gói:</Text>
            <Text>{row?.ticket?.vip ?? '-'}</Text>
          </Space>
          <Space>
            <Text strong>Giá gói:</Text>
            <Text>{row?.ticket?.price ?? '-'}</Text>
          </Space>
          <Space>
            <Text strong>Ngày bắt đầu:</Text>
            <Text>{row?.startTime ? new Date(row.startTime).toLocaleString() : '-'}</Text>
          </Space>
          <Space>
            <Text strong>Ngày trả thưởng:</Text>
            <Text>{row?.rewardTime ? new Date(row.rewardTime).toLocaleString() : '-'}</Text>
          </Space>
          <Space>
            <Text strong>Số ngày Earn:</Text>
            <Text>{row?.ticket?.earningDay ?? 0} ngày</Text>
          </Space>
          <Space>
            <Text strong>Trả thưởng mỗi ngày:</Text>
            <Text>{row?.ticket?.incomePerDay ?? 0}$</Text>
          </Space>
        </Space>
      ),
    },
    {
      title: 'Loại',
      dataIndex: 'transaction_type',
      align: 'center',
      filters: [
        { text: 'Trả lãi', value: 'reward_ticket' },
        { text: 'Mua gói', value: 'buy_ticket' },
        { text: 'Hết hạn', value: 'refund_ticket' },
      ],
      sorter: false,
      render: (_, row: any) => {
        const tagMap = {
          reward_ticket: { color: 'orange', label: 'Trả lãi' },
          buy_ticket: { color: 'green', label: 'Mua gói' },
          refund_ticket: { color: 'red', label: 'Hết hạn' },
        } as any;
        const tag = tagMap[row?.transaction_type];
        if (!tag) return null;
        return <Tag color={tag.color} style={{ fontWeight: 'bold' }}>{tag.label}</Tag>;
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'transaction_status',
      align: 'center',
      filters: [
        { text: 'Hoàn thành', value: 'finish' },
        { text: 'Đang hoạt động', value: 'processing' },
        { text: 'Huỷ', value: 'cancel' },
      ],
      sorter: false,
      render: (_, row: any) => {
        const statusMap = {
          finish: { color: 'green', label: 'Hoàn thành' },
          processing: { color: 'orange', label: 'Đang hoạt động' },
          cancel: { color: 'red', label: 'Huỷ' },
        } as Record<string, any>;
        const status = statusMap[row?.transaction_status];
        if (!status) return null;
        return <Tag color={status.color} style={{ fontWeight: 'bold' }}>{status.label}</Tag>;
      },
    },
    {
      title: 'Action',
      align: 'center',
      fixed: 'right',
      render: (_, row: any) => (
        <div className="flex justify-center">
          <Link to={`/user-detail/${row?.user?._id}`} className="text-green-600 hover:text-green-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
              aria-label="View details"
              role="img"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </Link>
        </div>
      ),
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
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
        <Card>
          <div className='my-4'>
            <div className='flex gap-2 items-center'>
              Tổng gói đang đầu tư:
              <div className='font-[900]'>
                {data?.countTicketProgress?.toLocaleString()}
              </div>
            </div>
            <div className='flex gap-2 items-center'>
              Tổng gói hết hạn:
              <div className='font-[900]'>
                {data?.countTicketFinish?.toLocaleString()}
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className='my-4'>
            <div className='flex gap-2 items-center'>
              Tổng gói hết hạn hôm nay:
              <div className='font-[900]'>
                {data?.countTicketFinishToday?.toLocaleString()}
              </div>
            </div>
            <div className='flex gap-2 items-center'>
              Tổng lãi trả hôm nay:
              <div className='font-[900]'>
                {data?.totalEarnToday?.toLocaleString()}$
              </div>
            </div>
          </div>
        </Card>


      </div>
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
        request={(params, sorter, filter) => {
          return http
            .get(apiRoutes.tickets, {
              params: {
                page: params.current,
                per_page: params.pageSize,
                search: params.keyword,
                transaction_type: filter?.transaction_type,
                transaction_status: filter?.transaction_status
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

export default Tickets;
