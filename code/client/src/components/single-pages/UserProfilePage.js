import React from 'react';
import MainHeader from '../HomePage/MainHeader';
import { Col, Row, Typography } from 'antd';
import UserProfile from '../UserProfile';

const { Title } = Typography;

class UserProfilePage extends React.Component{
  render(){
    return (
      <React.Fragment>
        <MainHeader />
        <Row>
          <Col offset={2}>
            <Title level={2}>Thông tin tài khoản</Title>
          </Col>
        </Row>
        <UserProfile />
      </React.Fragment>
    )
  }
}

export default UserProfilePage;
