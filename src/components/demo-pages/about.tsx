import { BreadcrumbProps, Button, Form, Input, message, Spin, Switch } from 'antd';
import BasePageContainer from '../layout/PageContainer';
import { webRoutes } from '../../routes/web';
import { Link } from 'react-router-dom';
import { AiFillGithub, AiOutlineBug, AiOutlineHeart } from 'react-icons/ai';
import { FaRegLightbulb } from 'react-icons/fa';
import packageJson from '../../../package.json';
import { useEffect, useState } from 'react';
import http from '../../utils/http';
import { apiRoutes } from '../../routes/api';
import TextArea from 'antd/es/input/TextArea';

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.dashboard,
      title: <Link to={webRoutes.dashboard}>Dashboard</Link>,
    },
    {
      key: webRoutes.setting,
      title: <Link to={webRoutes.about}>Cài đặt</Link>,
    },
  ],
};

const Setting = () => {
  const [config, setConfig] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [callBack, setCallBack] = useState(false)
  const handleUpdateConfig = async (key: string, value: string) => {
    setLoading(true)
    try {
      await http.post(apiRoutes.updateConfig, {
        key,
        value
      })
      setCallBack(!callBack)
      message.success("Change success")
    } catch (error: any) {
      message.error(error?.response?.data?.message)
    }
    setLoading(false)
  }

  const getConfigs = async () => {
    try {
      const res = await http
        .get(apiRoutes.getConfigs)

      if (res && res.data) {
        setConfig(res?.data?.data)
      }
    } catch (error) {
      console.log(error);

    }
  }


  useEffect(() => {
    getConfigs()
  }, [callBack])

  const paymentGateway = config?.PAYMENT_GATEWAY ? JSON.parse(config?.PAYMENT_GATEWAY + "") : {};


  return (
    <BasePageContainer breadcrumb={breadcrumb}>

      <div className="m-5">
        <article>

          <div>

            <div className="my-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="group relative rounded-xl border border-slate-200 p-4">
                <div className='my-2'>
                  <h1 className='my-2 font-[500]'>Cài đặt thanh toán</h1>
                  <div className='flex gap-2 items-center mb-3'>
                    <div>Bật/Tắt Nạp :</div>
                    <div>
                      <Switch checked={config?.PAYMENT_MAINTENANCE_DEPOSIT === '0'} onChange={async (checked: boolean) => {
                        handleUpdateConfig("PAYMENT_MAINTENANCE_DEPOSIT", checked ? "0" : "1")
                      }} /></div>
                  </div>
                  <div className='flex gap-2 items-center mb-3'>
                    <div>Bật/Tắt Rút :</div>
                    <div><Switch checked={config?.PAYMENT_MAINTENANCE_WITHDRAW === '0'} onChange={async (checked: boolean) => {
                      handleUpdateConfig("PAYMENT_MAINTENANCE_WITHDRAW", checked ? "0" : "1")
                    }} /></div>
                  </div>
                  <div className='flex gap-2 items-center mb-3'>
                    <div>Bật/Tắt Nạp Banking :</div>
                    <div><Switch checked={config?.PAYMENT_MAINTENANCE_DEPOSIT_BANKING === '0'} onChange={async (checked: boolean) => {
                      handleUpdateConfig("PAYMENT_MAINTENANCE_DEPOSIT_BANKING", checked ? "0" : "1")
                    }} /></div>
                  </div>
                  <hr className='my-4' />

                  <h1 className='my-2 font-[500] mb-3'>Cài đặt CSKH</h1>

                  {
                    config?.LIVECHAT_ID &&
                    <Form
                      initialValues={{ value: config?.LIVECHAT_ID }}
                      className='mt-5' onFinish={async (form) => {
                        handleUpdateConfig("LIVECHAT_ID", form?.value)
                      }}>
                      <Form.Item name="value" >
                        <Input placeholder='Nhập link CSKH' />
                      </Form.Item>
                      <Form.Item>
                        <Button htmlType='submit'>Thay đổi</Button>
                      </Form.Item>
                    </Form>
                  }

                  <hr className='my-4' />

                  <h1 className='my-2 font-[500] mb-3'>Cài đặt giá USDT</h1>

                  {
                    config?.USDT_PRICE &&
                    <Form className='mt-5'
                      initialValues={{ value: config?.USDT_PRICE }}
                      onFinish={async (form) => {
                        handleUpdateConfig("USDT_PRICE", form?.value)
                      }}>
                      <Form.Item name="value" >
                        <Input placeholder='Nhập nội dung' type='number' />
                      </Form.Item>
                      <Form.Item>
                        <Button htmlType='submit'>Thay đổi</Button>
                      </Form.Item>
                    </Form>
                  }


                  <hr className='my-4' />

                  <h1 className='my-2 font-[500] mb-3'>Cài đặt thông báo trang chủ</h1>
                  {
                    config?.HOME_NOTIFICATION &&
                    <Form className='mt-5' onFinish={async (form) => {
                      handleUpdateConfig("HOME_NOTIFICATION", JSON.stringify(form))
                    }} initialValues={JSON.parse(config?.HOME_NOTIFICATION)}>
                      <Form.Item name="en" >
                        <Input placeholder='Nhập nội dung tiếng anh' />
                      </Form.Item>
                      <Form.Item name="vi" >
                        <Input placeholder='Nhập nội dung tiếng việt' />
                      </Form.Item>
                      <Form.Item name="zh" >
                        <Input placeholder='Nhập nội dung tiếng trung' />
                      </Form.Item>
                      <Form.Item>
                        <Button htmlType='submit'>Thay đổi</Button>
                      </Form.Item>
                    </Form>
                  }


                </div>
              </div>
              <div className="group relative rounded-xl border border-slate-200 p-4">
                <h1 className='my-2 font-[500]'>Cài đặt tài khoản thanh toán banking</h1>
                {
                  config?.PAYMENT_GATEWAY &&
                  <Form className='mt-5' onFinish={async (form) => {
                    handleUpdateConfig("PAYMENT_GATEWAY", JSON.stringify(form))
                  }} initialValues={paymentGateway}>

                    <Form.Item name="holderName" >
                      <Input placeholder='Tên chủ thẻ' />
                    </Form.Item>
                    <Form.Item name="nameBank" >
                      <Input placeholder='Tên ngân hàng' />
                    </Form.Item>
                    <Form.Item name="numberBank" >
                      <Input placeholder='Số tài khoản' />
                    </Form.Item>
                    <Form.Item name="code" >
                      <Input placeholder='Code ngân hàng' />
                    </Form.Item>
                    <Form.Item>
                      <Button htmlType='submit'>Thay đổi</Button>
                    </Form.Item>
                  </Form>
                }

                <hr className='my-4' />

                <h1 className='my-2 font-[500] mb-3'>Cài đặt phí rút</h1>
                <div className='text-gray-800' >{config?.FEE_WIDTHDRAW}%</div>
                <Form className='mt-5' onFinish={async (form) => {
                  handleUpdateConfig("FEE_WIDTHDRAW", form?.value)
                }}>
                  <Form.Item name="value" >
                    <Input placeholder='Nhập nội dung' type='number' />
                  </Form.Item>
                  <Form.Item>
                    <Button htmlType='submit'>Thay đổi</Button>
                  </Form.Item>
                </Form>

              </div>

            </div>
          </div>
        </article>
      </div>
    </BasePageContainer>
  );
};

export default Setting;
