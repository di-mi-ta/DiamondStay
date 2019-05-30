import React from 'react';
import moment from 'moment';
import { Form, Input, DatePicker, Row, Typography, Button, Upload, message as notification } from 'antd';
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

  componentDidMount() {
    // this.setState({
    //   user: this.props.user || {},
    // });
  }

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

    apiUtils.changeUserInfo(originalUser._id, modifiedInfo).then(user  => {
      notification.success('Thông tin đã được cập nhật')
      // TODO: update redux state.user.auth.info = user
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
        {/* <Item label='Ngày sinh' {...formItemLayout}>
          <DatePicker
            format={dateFormat}
            //value={moment(this.state.user.birthday, dateFormat).isValid() ? moment(this.state.user.birthday, dateFormat) : null}
            onChange={this.onBirthdayChange}
            placeholder={this.state.user.birthday  || 'Bổ sung' }
            showToday={true}
          />
        </Item> */}
        {/* <Item label='Địa chỉ' {...formItemLayout}>
          <Paragraph editable={{ onChange: (s) => this.changeInfo({ address: s }) }}>{this.state.user.address}</Paragraph>
        </Item> */}
        {/* <Item label='Hình đại diện' {...formItemLayout}>
          <Upload>

          </Upload>
        </Item> */}
        <Item {...tailFormItemLayout}>
          <Button type='primary' disabled={!this.userInfoChanged()} onClick={this.handleUpdateInfo}>Cập nhật</Button>
        </Item>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user ? state.auth.user.info : {} // prevent null.firstName... when user logout
});

export default connect(mapStateToProps)(UserInfo);
