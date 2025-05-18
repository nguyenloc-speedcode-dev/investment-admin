import {
  ActionType,
  ProTable,
  ProColumns,
  RequestData,
  TableDropdown,
  ProDescriptions,
} from '@ant-design/pro-components';
import { Avatar, BreadcrumbProps, Card, Modal, Space, Tag } from 'antd';
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

  const columns: ProColumns[] = [
    {
      title: 'User ID',
      dataIndex: 'userId',
      align: 'center',
      sorter: false,
      render: (userId, row: any) => (
        <div className='flex flex-col gap-1'>
          <img src={row?.ticket?.urlImage} width={70} className='m-auto' />
          {
            row?.transaction_type === "reward_ticket" &&

            <div className='font-[700] text-green-700'>
                + {Number(row?.value?.toFixed(5))} $
            </div>
          }
          <div>
          </div>
        </div>
      )
    },
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
            <label>IP:</label>
            <div className='font-[500]'>{row?.user?.registerIp}</div>
          </div>
          <div className='flex gap-2'>
            <label>Số dư:</label>
            <div style={{
              color: row?.user?.realBalance >= 5 ? "red" : "#000",
              fontWeight: 700
            }} >{ Number(row?.user?.realBalance?.toFixed(5))}</div>
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
        return (
          <div className='flex flex-col gap-1'>

            <div className='flex gap-2'>
              <label>Số lượng ($):</label>
              <div className='font-[900]'>{Number(row?.value?.toFixed(5))}$ </div>
            </div>
            <div className='flex gap-2'>
              <label>Số tiền (vnđ):</label>
              <div>{row?.fiat_amount?.toLocaleString()} vnđ </div>
            </div>
            <div className='flex gap-2'>
              <label>Biến động:</label>
              <div className='font-[900]'>{Number(row?.currentBalanceUser?.toFixed(4))}$</div>
            </div>
          </div>
        )

      }

    },
    {
      title: 'Note',
      dataIndex: '_id',
      align: 'center',
      sorter: false,
      render: (userId, row: any) => (
        <div>

          <div className='flex gap-2'>
            <label>Ticket ID:</label>
            <div>{row?.ticket?._id} </div>
          </div>
          <div className='flex gap-2'>
            <label>ticket VIP:</label>
            <div>{row?.ticket?.vip} </div>
          </div>
          {
            row?.transaction_type === 'buy_ticket' &&
            <>
              <div className='flex gap-2'>
                <label>Ngày bắt đầu:</label>
                <div>{new Date(row?.startTime)?.toLocaleString()}</div>
              </div>
              <div className='flex gap-2'>
                <label>Ngày trả thưởng:</label>
                <div>{new Date(row?.rewardTime)?.toLocaleString()}</div>
              </div>
            </>
          }

          <div className='flex gap-2'>
            <label>Số ngày Earn:</label>
            <div>{row?.ticket?.earningDay} ngày</div>
          </div>
          <div className='flex gap-2'>
            <label>Trả thưởng mỗi ngày:</label>
            <div>{row?.ticket?.incomePerDay}$</div>
          </div>
        </div>
      )
    },
    {
      title: 'Loại GD',
      dataIndex: 'transaction_type',
      align: 'center',
      filters: [
        { text: 'Thu hoạch', value: 'reward_ticket' },
        { text: 'Thuê đất', value: 'buy_ticket' },
        { text: 'Huỷ hợp đồng', value: 'refund_ticket' },
      ],
      sorter: false,
      render: (userId, row: any) => (
        <div>
          {
            row?.transaction_type === 'reward_ticket' && <Tag color='orange-inverse'>Thu hoạch</Tag>
          }
          {
            row?.transaction_type === 'buy_ticket' && <Tag color='green-inverse'>Thuê đất</Tag>
          }
          {
            row?.transaction_type === 'refund_ticket' && <Tag color='red-inverse'>Huỷ hợp đồng</Tag>
          }
        </div>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'transaction_status',
      filters: [
        { text: 'Hoàn thành', value: 'finish' },
        { text: 'Đang farm', value: 'processing' },
      ],
      align: 'center',
      sorter: false,
      render: (userId, row: any) => (
        <div className='flex flex-col gap-1'>
          {
            row?.transaction_status === 'processing' && <Tag className='text-center' color='orange-inverse'>Đang farm</Tag>
          }
          {
            row?.transaction_status === 'cancel' && <Tag className='text-center' color='red-inverse'>Huỷ</Tag>
          }

          {
            row?.transaction_status === 'finish' && <Tag className='text-center' color='green-inverse'>Hoàn thành</Tag>
          }
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
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
        <Card>
          <div className='my-4'>
            <div className='flex gap-2 items-center'>
              Tổng gói đầu tư:
              <div className='font-[900]'>
                {data?.countTicketProgress?.toLocaleString()}
              </div>
            </div>
            <div className='flex gap-2 items-center'>
              Tổng gói đã trả:
              <div className='font-[900]'>
                {data?.countTicketFinish?.toLocaleString()}
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className='my-4'>
            <div className='flex gap-2 items-center'>
              Tổng gói kết thúc hôm nay:
              <div className='font-[900]'>
                {data?.countTicketFinishToday?.toLocaleString()}
              </div>
            </div>
            <div className='flex gap-2 items-center'>
              Tổng gói trả hôm nay:
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
