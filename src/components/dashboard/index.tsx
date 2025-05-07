import { useEffect, useState } from 'react';
import BasePageContainer from '../layout/PageContainer';
import {
  Avatar,
  BreadcrumbProps,
  Card,
  Col,
  List,
  Progress,
  Rate,
  Row,
  Table,
  Tag,
} from 'antd';
import { webRoutes } from '../../routes/web';
import { Link } from 'react-router-dom';
import StatCard from './StatCard';
import { AiOutlineStar, AiOutlineTeam } from 'react-icons/ai';
import Icon from '@ant-design/icons';
import { BiCommentDetail, BiMoney, BiPhotoAlbum } from 'react-icons/bi';
import { MdOutlineArticle, MdOutlinePhoto } from 'react-icons/md';
import { StatisticCard } from '@ant-design/pro-components';
import LazyImage from '../lazy-image';
import { User } from '../../interfaces/models/user';
import http from '../../utils/http';
import { apiRoutes } from '../../routes/api';
import { handleErrorResponse } from '../../utils';
import { Review } from '../../interfaces/models/review';

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.dashboard,
      title: <Link to={webRoutes.dashboard}>Dashboard</Link>,
    },
  ],
};

const Dashboard = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dashboard, setDashboard] = useState<any>()
  const [users, setUsers] = useState<User[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  const getDataDashboard = async () => {
    setLoading(true)
    try {
      const res = await http.get(apiRoutes.dataDashboard)
      if (res && res.data) {
        setDashboard(res?.data?.data)
      }
    } catch (err) {
      console.log(err);

    }
    setLoading(false)
  }

  useEffect(() => {
    getDataDashboard()
  }, [])

  return (
    <BasePageContainer breadcrumb={breadcrumb} transparent={true}>
      <Row gutter={24}>
        <Col xl={6} lg={6} md={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
          <StatCard
            loading={loading}
            icon={<Icon component={AiOutlineTeam} />}
            title="Tổng User"
            number={dashboard?.totalUser}
          />
        </Col>
        <Col xl={6} lg={6} md={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
          <StatCard
            loading={loading}
            icon={<Icon component={MdOutlineArticle} />}
            title="Tổng đầu tư"
            number={dashboard?.totalInvest}
          />
        </Col>
        <Col xl={6} lg={6} md={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
          <StatCard
            loading={loading}
            icon={<Icon component={BiMoney} />}
            title="Số lần nạp"
            number={dashboard?.totalDeposit}
          />
        </Col>
        <Col xl={6} lg={6} md={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
          <StatCard
            loading={loading}
            icon={<Icon component={BiMoney} />}
            title="Số lần rút"
            number={dashboard?.totalWithdraw}
          />
        </Col>
        {/* <Col xl={6} lg={6} md={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
          <StatCard
            loading={loading}
            icon={<Icon component={BiCommentDetail} />}
            title="Comments"
            number={500}
          />
        </Col>
        <Col xl={6} lg={6} md={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
          <StatCard
            loading={loading}
            icon={<Icon component={AiOutlineStar} />}
            title="Reviews"
            number={100}
          />
        </Col> */}
        {/* <Col
          xl={12}
          lg={12}
          md={24}
          sm={24}
          xs={24}
          style={{ marginBottom: 24 }}
        >
          <Card bordered={false} className="w-full h-full cursor-default">
            <StatisticCard.Group direction="row">
              <StatisticCard
                statistic={{
                  title: 'XYZ',
                  value: loading ? 0 : 123,
                }}
              />
              <StatisticCard
                statistic={{
                  title: 'Progress',
                  value: 'ABC',
                }}
                chart={
                  <Progress
                    className="text-primary"
                    percent={loading ? 0 : 75}
                    type="circle"
                    size={'small'}
                    strokeColor={CONFIG.theme.accentColor}
                  />
                }
                chartPlacement="left"
              />
            </StatisticCard.Group>
          </Card>
        </Col> */}
        <Col
          xl={12}
          lg={12}
          md={12}
          sm={24}
          xs={24}
          style={{ marginBottom: 24 }}
        >
          <Card bordered={false} className="w-full h-full cursor-default" title="Hoạt động mới nhất">
            <List
              loading={loading}
              itemLayout="horizontal"
              dataSource={dashboard?.latestUserTransactions}
              renderItem={(i: any) => (
                <List.Item>
                  <List.Item.Meta
                    
                    title={`${i?.transaction_type} ${i?.value?.toLocaleString()}`}
                    description={new Date(i?.createdAt)?.toLocaleString()}
                  />
                </List.Item>
              )}
            />
            <Link to={webRoutes.historyUser} className='text-blue-500'>Xem thêm ...</Link>
          </Card>
        </Col>
        <Col
          xl={12}
          lg={12}
          md={12}
          sm={24}
          xs={24}
          style={{ marginBottom: 24 }}
        >
          <Card bordered={false} className="w-full h-full cursor-default" title="Đầu tư mới nhất">
            <List
              loading={loading}
              itemLayout="horizontal"
              dataSource={dashboard?.latestTicketTransactions}
              renderItem={(i: any) => (
                <List.Item>
                  <List.Item.Meta

                    title={`${i?.transaction_type} ${i?.value?.toLocaleString()}`}
                    description={new Date(i?.createdAt)?.toLocaleString()}
                  />
                </List.Item>
              )}
            />
            <Link to={webRoutes.tickets} className='text-blue-500'>Xem thêm ...</Link>
          </Card>
        </Col>
      </Row>
    </BasePageContainer>
  );
};

export default Dashboard;
