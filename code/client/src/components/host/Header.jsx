import React from 'react';
import { Layout, Menu, Col, Dropdown, Icon, Divider, Avatar, Row } from 'antd';
import NotificationButton from './NotificationButton';
// const { Header } = Layout;

export default class PageHeader extends React.Component {
  render() {
    const menu = (
      <Menu>
        <Menu.Item key='user-info'>Thông tin cá nhân</Menu.Item>
        <Menu.Item key='account-info'>Thông tin tài khoản</Menu.Item>
        <Menu.Item key='messages'>Tin nhắn</Menu.Item>
        <Divider />
        <Menu.Item key='logout'>Đăng xuất</Menu.Item>
      </Menu>
    );

    return (
      <Row>
        {/* <Col offset={3}>
          <img src={require('../../assets/images/diamond-logo.jpg')} alt='DiamondStay' width='40px' />
        </Col>
        <Col> */}
          <Menu
            mode='horizontal'
            style={{ float: 'right', marginRight: 100 }}
          >
            <Menu.Item key='github'><a href='https://github.com/di-mi-ta/DiamondStay'>Github</a></Menu.Item>
            <Menu.Item>
              <NotificationButton />
            </Menu.Item>
            <Menu.Item key='user'>
              <Dropdown overlay={menu} trigger={['click']}>
                <a>
                  Văn Tiến Cường <Icon type='down' />
                </a>
              </Dropdown>
            </Menu.Item>
          </Menu>
      </Row>
    );
  }
}