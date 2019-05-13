import React, { Fragment } from 'react';
import HostRoomStatusList from './HostRoomStatusList';
import { PageHeader, Tabs, Icon } from 'antd';
import UserInfo from './UserInfo';
// import MessageComponent from './MessageComponent'
import PasswordChanging from './PasswordChanging';
const Pane = Tabs.TabPane;
export default class PageContent extends React.Component {
  render() {
    return (
      <Fragment>
        {/* <PageHeader title={'Danh sách phòng'} />
        <HostRoomStatusList /> */}
        <Tabs defaultActiveKey='4'>
          <Pane tab={<span><Icon type="info-circle" theme="twoTone" />Thông tin phòng</span>} key='1'>
            {/* <PageHeader title={'Thông tin phòng'} /> */}
            <HostRoomStatusList />
          </Pane>
          <Pane tab='Thông tin người dùng' key='2'>
            <UserInfo/>
          </Pane>
          <Pane tab={<span><Icon type="message" />Tin nhắn</span>} key='3'>
            {/* <MessageComponent /> */}
            <h3>Not implement yet</h3>
          </Pane>
          <Pane tab='Đổi mật khẩu' key='4'>
            <PasswordChanging />
          </Pane>
        </Tabs>
      </Fragment>
    );
  }
}