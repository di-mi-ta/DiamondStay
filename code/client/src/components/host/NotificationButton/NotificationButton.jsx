import React from 'react';
import { Dropdown, Menu, Icon, Badge } from 'antd';

const notifications = (
  <Menu>
    <Menu.Item>Bạn nhận 1 tin nhắn từ Cường</Menu.Item>
    <Menu.Item>Bạn nhận 2 tin nhắn từ Minh</Menu.Item>
    <Menu.Item>Một khách hàng vừa thuê phòng</Menu.Item>
  </Menu>
);

export default class NotificationButton extends React.Component {
  render() {
    return (
      <a>
        <Dropdown overlay={notifications} trigger={['click']}>
          <Badge count={5}>
            <Icon type="bell" />
          </Badge>
        </Dropdown>
      </a>
    );
  }
}
