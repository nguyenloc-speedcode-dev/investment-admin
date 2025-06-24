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
import { Avatar, BreadcrumbProps, Card, Modal, Space, Tag, Tooltip } from 'antd';
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
import { socket } from '../../lib/socket';


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

const HistoriesTrading = () => {
  const actionRef = useRef<ActionType>();
  const [modal, modalContextHolder] = Modal.useModal();
  const [data, setData] = useState<any>()
  const [betCurrent, setBetCurrent] = useState<any>()

  useEffect(() => {
    const handlePrice = (vl: any) => {
      setBetCurrent((prev: any) => ({ ...prev, ...vl }));
      if (!vl?.isBet && vl?.second < 1) {
        actionRef?.current?.reload()
      }
    };

    const handleTrading = (vl: any) => {

      setBetCurrent((prev: any) => ({ ...prev, ...vl }));
    };

    if (socket.connected) {
      socket.on("WE_PRICE", handlePrice);
      socket.on("TRADING_CURRENT", handleTrading);
    } else {
      socket.once("connect", () => {
        socket.on("WE_PRICE", handlePrice);
        socket.on("TRADING_CURRENT", handleTrading);
      });
    }

    return () => {
      socket.off("WE_PRICE", handlePrice);
      socket.off("TRADING_CURRENT", handleTrading);
    };
  }, []);


  const columns: ProColumns[] = [
    {
      title: 'Tài khoản',
      dataIndex: 'userId',
      align: 'center',
      render: (_, row: any) => {
        const { user, createdAt } = row || {};
        return (
          <div className="p-3 text-sm leading-6 space-y-1 rounded-md bg-white border border-gray-100 shadow-sm">
            {user?.isAccountForAdmin &&
              <Tag color='red-inverse'>
                <div className=' font-[900]'>
                  Tài khoản Admin
                </div>
              </Tag>
            }

            <div className="flex justify-between">
              <span className="text-gray-500 min-w-[80px]">User ID:</span>
              <span className="text-gray-800 font-medium">{user?.userId || '-'}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500 min-w-[80px]">SĐT:</span>
              <span className="text-gray-800 font-medium">{user?.phone || '-'}</span>
            </div>

            <div className="flex justify-between">
              <Tooltip title="IP đăng ký">
                <span className="text-gray-500 cursor-help min-w-[80px]">IP:</span>
              </Tooltip>
              <span className="text-gray-800 font-medium">{user?.registerIp || '-'}</span>
            </div>

            <div className="flex justify-between">
              <Tooltip title="Số dư hiện tại">
                <span className="text-gray-500 cursor-help min-w-[80px]">Số dư:</span>
              </Tooltip>
              <span
                className={`font-semibold ${user?.realBalance >= 5 ? 'text-red-600' : 'text-gray-700'}`}
              >
                {(user?.realBalance ?? 0).toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500 min-w-[80px]">Ngày:</span>
              <span className="text-gray-800 font-medium">
                {createdAt ? new Date(createdAt).toLocaleString() : '-'}
              </span>
            </div>
          </div>

        );
      }
    },
    {
      title: 'Giao dịch',
      dataIndex: 'transaction_type',
      align: 'center',
      render: (_, row: any) => {
        const isWin = Number(row?.value) > 0;
        const isLose = Number(row?.value) === 0;

        return (
          <div className="flex flex-col gap-2 text-[13px] leading-5 bg-white p-2 rounded-md shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Số lượng:</span>
              <div className="flex items-center gap-2 font-semibold text-gray-800">
                {row?.bet_value}
                {row?.bet_condition === 'up' ? (
                  <Tag color="green-inverse" className="text-[12px] px-2">Mua</Tag>
                ) : (
                  <Tag color="red-inverse" className="text-[12px] px-2">Bán</Tag>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500">Hoàn trả:</span>
              <div className="flex items-center gap-2 font-semibold">
                {
                  row?.transaction_status !== 'pending' ?
                    <span className={isWin ? 'text-green-600' : isLose ? 'text-red-500' : 'text-gray-600'}>
                      {row?.value}
                    </span> : "-"
                }
                {
                  row?.transaction_status !== 'pending' &&
                  <Tag color={isWin ? 'green' : 'red'} className="text-[12px] px-2 font-medium">
                    {isWin ? 'Win' : 'Lose'}
                  </Tag>
                }

              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500">Giá mở:</span>
              <span className="font-semibold text-gray-800">
                {row?.open_price ? Number(row?.open_price?.toFixed(2)).toLocaleString() : "-"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500">Giá đóng:</span>
              <span className="font-semibold text-gray-800">
                {row?.close_price ? Number(row?.close_price?.toFixed(2)).toLocaleString() : "-"}
              </span>
            </div>
          </div>

        );
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'transaction_status',
      align: 'center',
      filters: [
        { text: 'Hoàn thành', value: 'finish' },
        { text: 'Đang chờ', value: 'pending' },
        { text: 'Đã huỷ', value: 'cancel' },
      ],
      render: (_, row: any) => {
        const status = row?.transaction_status;
        const colorMap: Record<string, string> = {
          finish: 'green',
          pending: 'orange',
          cancel: 'red',
        };
        const textMap: Record<string, string> = {
          finish: 'Hoàn thành',
          pending: 'Đang chờ',
          cancel: 'Đã huỷ',
        };

        return status ? (
          <Tag
            color={colorMap[status]}
            className="text-xs font-medium px-2 py-0.5 rounded-full"
          >
            {textMap[status]}
          </Tag>
        ) : null;
      }
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      align: 'center',
      render: (_, row: any) => {
        const noteText = row?.note || '-';
        const noteMap: Record<string, string> = {
          Lucky_Clover: '🍀 Chúc may mắn',
          Robot_Part: '🤖 +2 lượt',
          x1_duck: '🦆 +1 mảnh vịt',
          x2_duck: '🦆 +2 mảnh vịt',
          x5_duck: '🦆 +5 mảnh vịt',
        };
        return (
          <div className="font-medium text-gray-700">
            {noteMap[noteText] || noteText}
          </div>
        );
      }
    },
    {
      title: 'Action',
      align: 'center',
      fixed: 'right',
      render: (_, row: any) => (
        <div className="flex justify-center">
          <Link
            to={`/user-detail/${row?.user?._id}`}
            className="inline-flex items-center justify-center p-2 rounded hover:bg-gray-100 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </Link>
        </div>
      )
    }
  ];


  const getData = async () => {
    try {
      const res = await http.get(apiRoutes.dataUsers)
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
  const [winRate, setWinRate] = useState<number | string>("");

  const handleSetWinRate = () => {
    const parsed = Number(winRate);
    if (!isNaN(parsed) && parsed >= 0 && parsed <= 100) {
      socket.emit("handleRateWin", winRate)
    } else {
      alert("Vui lòng nhập số từ 0 đến 100");
    }
  };

  const handleDirection = (dir: "up" | "down") => {
    console.log("🧭 Chọn hướng:", dir);
    // Gửi hướng giao dịch tới socket/server nếu cần
    socket.emit('handleOverideResult', dir)
  };

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <div className="flex flex-col gap-5 w-full max-w-md bg-white p-5 rounded-2xl shadow border border-gray-200 text-sm font-medium">
        {/* TIMER + TRẠNG THÁI */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-600 font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{`00:${betCurrent?.second?.toString().padStart(2, '0')}`}</span>
          </div>

          <div
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 border 
        ${betCurrent?.isBet
                ? 'bg-green-50 text-green-700 border-green-300'
                : 'bg-gray-50 text-gray-500 border-gray-300'}`}
          >
            {betCurrent?.isBet ? '🟢 Giao dịch mở' : '⏳ Chờ kết quả'}
          </div>
        </div>

        {/* NÚT MUA / BÁN */}
        <div className="flex items-center justify-between">
          <button
            className={`border-none flex-1 py-2 rounded-xl font-semibold shadow transition-all duration-200 ${betCurrent?.overrideResult
              ? 'bg-gray-300 text-white cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            onClick={() => !betCurrent?.overrideResult && handleDirection("up")}
            disabled={!!betCurrent?.overrideResult}
          >
            Mua ↑
          </button>

          <div className="w-3" />

          <button
            className={`border-none flex-1 py-2 rounded-xl font-semibold shadow transition-all duration-200 ${betCurrent?.overrideResult
              ? 'bg-gray-300 text-white cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            onClick={() => !betCurrent?.overrideResult && handleDirection("down")}
            disabled={!!betCurrent?.overrideResult}
          >
            Bán ↓
          </button>
        </div>

        {/* FORM TỶ LỆ THẮNG */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSetWinRate();
          }}
          className="flex items-center gap-3"
        >
          <label htmlFor="winRate" className="text-gray-700 w-28 whitespace-nowrap">
            🎯 Tỷ lệ  ({betCurrent?.winRate || 50}%) :
          </label>
          <input
            id="winRate"
            type="number"
            value={winRate}
            onChange={(e) => setWinRate(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
            placeholder="VD: 60"
            min={0}
            max={100}
          />
          <button
            type="submit"
            className="border-none px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all"
          >
            Lưu
          </button>
        </form>

        {/* Thông báo nếu override */}
        {betCurrent?.overrideResult && (
          <div className="text-red-600 text-xs mt-2 font-semibold italic text-center">
            ⚠️ Không thể chỉnh nến vì đã có kết quả cưỡng chế
          </div>
        )}
      </div>



      <div className="grid grid-cols-3 gap-3 mt-4 w-full max-w-md">
        {/* Lệnh Mua */}
        <div className="flex flex-col items-center justify-center bg-green-50 border border-green-200 rounded-lg p-3 shadow-sm">
          <span className="text-xs text-green-600">Lệnh Mua</span>
          <span className="text-lg font-bold text-green-700">{betCurrent?.countUp ?? 0}</span>
        </div>

        {/* Lệnh Bán */}
        <div className="flex flex-col items-center justify-center bg-red-50 border border-red-200 rounded-lg p-3 shadow-sm">
          <span className="text-xs text-red-600">Lệnh Bán</span>
          <span className="text-lg font-bold text-red-700">{betCurrent?.coutDown ?? 0}</span>
        </div>

        {/* Bẻ nến */}
        <div className="flex flex-col items-center justify-center bg-yellow-50 border border-yellow-200 rounded-lg p-3 shadow-sm">
          <span className="text-xs text-yellow-600">Bẻ nến</span>
          <span className="text-lg font-semibold text-yellow-700">
            {betCurrent?.overrideResult === 'up' ? "Mua" : betCurrent?.overrideResult === 'down'
              ? "Bán" :
              '-'}
          </span>
        </div>
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
            .get(apiRoutes.getHistoriesTrading, {
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

export default HistoriesTrading;
