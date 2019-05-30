import React from 'react';
import MainHeader from '../HomePage/MainHeader';
import { Col, Row, Typography } from 'antd';
import UserProfile from '../UserProfile';

const { Title } = Typography;

class UserProfilePage extends React.Component{
  render(){
    return (
      <React.Fragment>
        <UserProfile />
      </React.Fragment>
    )
  }
}

export default UserProfilePage;
