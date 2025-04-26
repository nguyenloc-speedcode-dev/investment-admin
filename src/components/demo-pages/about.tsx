import { BreadcrumbProps, message, Spin, Switch } from 'antd';
import BasePageContainer from '../layout/PageContainer';
import { webRoutes } from '../../routes/web';
import { Link } from 'react-router-dom';
import { AiFillGithub, AiOutlineBug, AiOutlineHeart } from 'react-icons/ai';
import { FaRegLightbulb } from 'react-icons/fa';
import packageJson from '../../../package.json';
import { useEffect, useState } from 'react';
import http from '../../utils/http';
import { apiRoutes } from '../../routes/api';

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.dashboard,
      title: <Link to={webRoutes.dashboard}>Dashboard</Link>,
    },
    {
      key: webRoutes.about,
      title: <Link to={webRoutes.about}>About</Link>,
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
  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      
      <div className="m-5">
        <article>

          <div>
            <p className="lead">
              An out-of-box UI solution for enterprise applications as a React
              boilerplate.{' '}
            </p>
            <div className="my-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="group relative rounded-xl border border-slate-200 p-4">
                <div className='my-2'>
                  <h1>Cài đặt Maintenance</h1>
                  <div className='flex gap-2 items-center mb-3'>
                    <div>Nạp :</div>
                    <div>
                      <Switch checked={config?.PAYMENT_MAINTENANCE_DEPOSIT === '0'} onChange={async (checked: boolean) => {
                        handleUpdateConfig("PAYMENT_MAINTENANCE_DEPOSIT", checked ? "0" : "1")
                      }} /></div>
                  </div>
                  <div className='flex gap-2 items-center mb-3'>
                    <div>Rút :</div>
                    <div><Switch checked={config?.PAYMENT_MAINTENANCE_WITHDRAW === '0'} onChange={async (checked: boolean) => {
                      handleUpdateConfig("PAYMENT_MAINTENANCE_WITHDRAW", checked ? "0" : "1")
                    }} /></div>
                  </div>
                </div>
              </div>
              <div className="group relative rounded-xl border border-slate-200 p-4">
                212

              </div>

            </div>
          </div>
        </article>
      </div>
    </BasePageContainer>
  );
};

export default Setting;
