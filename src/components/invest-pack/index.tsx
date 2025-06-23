import {
  ActionType,
  ProTable,
  ProColumns,
  RequestData,
} from '@ant-design/pro-components';
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Switch,
  Tag,
  Upload,
} from 'antd';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiRoutes } from '../../routes/api';
import { webRoutes } from '../../routes/web';
import {
  BACKEND_URL,
  handleErrorResponse,
  NotificationType,
  showNotification,
} from '../../utils';
import http from '../../utils/http';
import BasePageContainer from '../layout/PageContainer';
import {
  ExclamationCircleOutlined,
  EditOutlined,
  LoadingOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { UploadProps } from 'antd/lib/upload/interface';
import { Option } from 'antd/es/mentions';

const breadcrumb = {
  items: [
    {
      key: webRoutes.dashboard,
      title: <Link to={webRoutes.dashboard}>Dashboard</Link>,
    },
    {
      key: webRoutes.deposit,
      title: <Link to={webRoutes.deposit}>Gói</Link>,
    },
  ],
};

const Package = () => {
  const actionRef = useRef<ActionType>();
  const [modal, modalContextHolder] = Modal.useModal();
  const [editItem, setEditItem] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const [loadingMap, setLoadingMap] = useState<{ [key: string]: boolean }>({
    urlImage: false,
    desImage: false,
  });

  const [form] = Form.useForm();

  // Khi mở modal chỉnh sửa, set giá trị form
  useEffect(() => {
    if (editItem) {
      form.setFieldsValue(editItem);
    } else {
      form.resetFields();
    }
  }, [editItem, form]);

  const handleUpload = async (file: File, field: 'urlImage' | 'desImage') => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await http.post(BACKEND_URL + '/api/v1/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const imageUrl = res.data.secure_url || res.data.url; // tùy api trả về
      form.setFieldsValue({ [field]: imageUrl });
      message.success('Upload thành công');
    } catch (err) {
      console.error(err);
      message.error('Upload thất bại');
    }
  };

  const uploadProps = (field: 'urlImage' | 'desImage'): UploadProps => ({
    showUploadList: false,
    beforeUpload: (file) => {
      setLoadingMap((prev) => ({ ...prev, [field]: true }));

      handleUpload(file, field).finally(() => {
        setLoadingMap((prev) => ({ ...prev, [field]: false }));
      });

      return false; // ngăn antd tự upload
    },
  });

  const handleUpdatePack = async (data: any) => {
    try {
      const id = data._id;
      // Loại bỏ _id ra khỏi payload gửi lên API
      const payload = { ...data };
      delete payload._id;

      const res = await http.post(apiRoutes.updatePack(id), payload);
      if (res && res.data) {
        message.success('Cập nhật thành công');
        actionRef.current?.reload();
        setOpenModal(false);
        setEditItem(null);
        form.resetFields();
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Có lỗi xảy ra');
    }
  };

  const handleCreatePack = async (data: any) => {
    try {
      const res = await http.post(apiRoutes.createPack, data);
      if (res && res.data) {
        message.success('Tạo gói thành công');
        actionRef.current?.reload();
        setOpenModal(false);
        form.resetFields();
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Có lỗi xảy ra');
      console.error(error);
    }
  };

  // Xử lý submit form (tạo mới hoặc cập nhật)
  const onFinish = (data: any) => {
    if (editItem) {
      handleUpdatePack({ ...editItem, ...data });
    } else {
      handleCreatePack(data);
    }
  };
  const InfoItem = ({
    label,
    value,
    valueClassName = '',
  }: {
    label: string;
    value: React.ReactNode;
    valueClassName?: string;
  }) => (
    <div className="flex justify-between border-b last:border-0 py-1 text-sm">
      <span className="text-gray-500 font-medium w-36">{label}</span>
      <span className={`text-right flex-1 ${valueClassName}`}>{value ?? '-'}</span>
    </div>
  );

  const columns: ProColumns<any>[] = [
    {
      title: 'Gói đầu tư',
      dataIndex: '_id',
      align: 'left',
      width: 280,
      render: (_, row) => (
        <div className="space-y-1 text-sm text-gray-800">
          <InfoItem label="Mã gói" value={row?._id} />
          <InfoItem label="VIP" value={`VIP${row?.vip}`} />
          <InfoItem label="Thời gian" value={`${row?.earningDay} ngày`} />
          <InfoItem
            label="Lợi nhuận/ngày"
            value={`${row?.incomePerDay}$`}
            valueClassName="text-green-600 font-semibold"
          />
        </div>
      ),
    },
    {
      title: 'Giá & Số lượng',
      dataIndex: 'price',
      align: 'left',
      width: 280,
      render: (_, row) => (
        <div className="space-y-1 text-sm text-gray-800">
          <InfoItem label="Giá gói" value={`${row?.price}$`} />
          <InfoItem label="Giá sale" value={`${row?.sale_price}$`} />
          <InfoItem label="Đã mua" value={row?.inventory} />
          <InfoItem
            label="Hết hạn"
            value={
              row?.soldOutAt
                ? new Date(row?.soldOutAt).toLocaleString('vi-VN')
                : '-'
            }
          />
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      align: 'center',
      width: 200,
      render: (_, row) => (
        <div className="flex flex-col items-center gap-2">
          <Tag color={row?.status ? 'green' : 'orange'}>
            {row?.status ? 'Đang bán' : 'Đã đóng'}
          </Tag>
          <Switch
            checked={row?.status}
            onChange={(checked) =>
              handleUpdatePack({ _id: row?._id, status: checked })
            }
          />
        </div>
      ),
    },
    {
      title: 'Action',
      align: 'center',
      width: 100,
      fixed: 'right',
      render: (_, row) => (
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => {
            setEditItem(row);
            setOpenModal(true);
          }}
        />
      ),
    },
  ];



  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <Button
        type="primary"
        className="my-5 bg-green-600"
        onClick={() => {
          setEditItem(null);
          setOpenModal(true);
        }}
      >
        Thêm gói
      </Button>

      <Modal
        title={editItem ? 'Chỉnh sửa gói' : 'Thêm gói'}
        centered
        open={openModal}
        onCancel={() => {
          setOpenModal(false);
          setEditItem(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="name"
            label="Tên gói"
            rules={[{ required: true, message: 'Vui nhập tên gói' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="vip"
            label="Vip"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value='1'>
                1
              </Option>
              <Option value='2'>
                2
              </Option>
              <Option value='3'>
                3
              </Option>
              <Option value='4'>
                4
              </Option>
              <Option value='5'>
                5
              </Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="incomePerDay"
            label="Thu nhập/ngày"
            rules={[{ required: true, message: 'Vui lòng nhập thu nhập/ngày' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="earningDay"
            label="Số ngày thu nhập"
            rules={[{ required: true, message: 'Vui lòng nhập số ngày thu nhập' }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="urlImage"
            label="Ảnh chính"
            rules={[{ required: true, message: 'Vui lòng upload ảnh chính' }]}
          >
            {form.getFieldValue('urlImage') && (
              <img
                src={form.getFieldValue('urlImage')}
                alt="urlImage"
                style={{ width: '100px', maxHeight: '200px', objectFit: 'contain', marginBottom: "10px" }}
              />
            )}
            <Upload {...uploadProps('urlImage')}>
              <Button icon={loadingMap.urlImage ? <LoadingOutlined /> : <UploadOutlined />}>
                Upload ảnh chính
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="desImage"
            label="Ảnh mô tả"
            rules={[{ required: true, message: 'Vui lòng upload ảnh mô tả' }]}
          >
            {form.getFieldValue('desImage') && (
              <img
                src={form.getFieldValue('desImage')}
                alt="desImage"
                style={{ width: '100px', maxHeight: '200px', objectFit: 'contain', marginBottom: "10px" }}
              />
            )}
            <Upload {...uploadProps('desImage')}>
              <Button icon={loadingMap.desImage ? <LoadingOutlined /> : <UploadOutlined />}>
                Upload ảnh mô tả
              </Button>
            </Upload>
          </Form.Item>

          {/* <Form.Item name="vip" label="VIP" valuePropName="checked" initialValue={false}>
            <Switch />
          </Form.Item> */}

          <Form.Item name="sale_price" label="Giá sale" rules={[{ type: 'number', min: 0 }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="inventory" label="Số lượng gói">
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit" className="my-5 bg-green-600"
              loading={loadingMap.urlImage || loadingMap.desImage}
              block
            >
              {editItem ? 'Cập nhật' : 'Tạo mới'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <ProTable
        columns={columns}
        actionRef={actionRef}
        rowKey={(record) => record._id}
        request={async (params, sort, filter) => {
          try {
            const response = await http.get(apiRoutes.packs, {
              params,
            });
            return {
              data: response.data.data?.tickets,
              success: true,
              total: response.data.total,
            } as RequestData<any>;
          } catch (error) {
            return {
              data: [],
              success: false,
              total: 0,
            };
          }
        }}
        pagination={{
          showSizeChanger: true,
          defaultPageSize: 10,
          pageSizeOptions: ['10', '20', '50', '100'],
        }}
        search={false}
        scroll={{ x: 1200 }}
      />

      {modalContextHolder}
    </BasePageContainer>
  );
};

export default Package;
