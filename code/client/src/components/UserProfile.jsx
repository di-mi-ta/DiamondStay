import React from 'react';
import moment from 'moment';
import { Form, Card, Typography, Button, Divider, message as notification } from 'antd';
import { connect } from 'react-redux';
import update from 'immutability-helper';
import * as apiUtils from '../utils/api/user';
import { Redirect } from 'react-router-dom';

const { Paragraph } = Typography;
const dateFormat = 'DD-MM-YYYY';
const { Item } = Form;
const formItemLayout = {
  labelAlign: 'left',
  labelCol: { span: 3, offset: 2 },
  wrapperCol: { span: 10, offset: 2 },
}
const tailFormItemLayout = {
  wrapperCol: {
    offset: formItemLayout.labelCol.span + formItemLayout.labelCol.offset + formItemLayout.wrapperCol.offset,
    span: 24,
  }
};

class UserInfo extends React.Component {
  state = {
    user: this.props.user || {},
    dirty: true,
  };

  userInfoChanged = () => {
    // return JSON.stringify(this.state.user) !== JSON.stringify(this.props.user);
    const originalUser = this.props.user;
    const modifiedUser = this.state.user;
    for (let prop in originalUser) {
        if (originalUser[prop] !== modifiedUser[prop])
          return true;
    }
    return false;
  };

  changeInfo = (obj) => {
    this.setState({
      user: {
        ...this.state.user,
        ...obj,
      },
    });
  }

  handleUpdateInfo = () => {
    // Get modified fields
    const originalUser = this.props.user;
    const modifiedUser = this.state.user;
    const modifiedInfo  = {};
    for (let prop in originalUser) {
        if (originalUser[prop] !== modifiedUser[prop])
          modifiedInfo[prop] = modifiedUser[prop];
    }
    apiUtils.changeUserInfo(originalUser._id, modifiedInfo, this.props.auth)
    .then(user => {
      // Updated Successfully
      notification.success('Thông tin đã được cập nhật')
    }).catch(err => {
      console.log('ERROR', err);
      notification.error('Xảy ra lỗi. Thông tin chưa được cập nhật!')
    });
  };

  render() {

    // User click logout in this page -> redirect to home
    if (!this.props.isAuthenticated) {
      return <Redirect to='/' />;
    }
    return (
      <div className="container" style={{marginTop: 20}}>
      <h3> <b> Thông tin tài khoản </b></h3>
      <Divider/>
      <Card style={{
        width: '100%', padding: 10, 
        marginTop: 10, marginBottom: 10,
        boxShadow: '0 8px 12px rgba(0,0,0,.1)',}}>
        <Form>
          <Item label='Tên' {...formItemLayout}>
            <Paragraph editable={{ onChange: (s) => this.changeInfo({ firstName: s }) }}>{this.state.user.firstName}</Paragraph>
          </Item>
          <Item label='Họ' {...formItemLayout}>
            <Paragraph editable={{ onChange: (s) => this.changeInfo({ lastName: s }) }}>{this.state.user.lastName}</Paragraph>
          </Item>
          <Item label='Email' {...formItemLayout}>
            <Paragraph editable={{ onChange: (s) => this.changeInfo({ email: s }) }}>{this.state.user.email}</Paragraph>
          </Item>
          <Item label='Di động' {...formItemLayout}>
            <Paragraph placeholder='aaaaa' editable={{ onChange: (s) => this.changeInfo({ phone: s }) }}>{this.state.user.phone}</Paragraph>
          </Item>
          <Item {...tailFormItemLayout}>
            <Button type='primary' disabled={!this.userInfoChanged()} onClick={this.handleUpdateInfo}>Cập nhật</Button>
          </Item>
        </Form>
      </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  user: state.auth.user ? state.auth.user.info : {} // prevent null.firstName... when user logout
});

export default connect(mapStateToProps)(UserInfo);
