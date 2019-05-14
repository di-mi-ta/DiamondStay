import React from 'react';
import moment from 'moment';
import { Form, Input, DatePicker, Row, Typography, Button, Upload } from 'antd';
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

let originalUser = {
  name: 'Văn Tiến Cường',
  email: 'cuongvt@gmail.com',
  phone: '0353601357',
  birthday: '08-09-1997',
  cmnd: '273668092',
  address: '405/4 Nguyễn Hữu Cảnh, phường 10, Vũng Tàu',
};

export default class UserInfo extends React.Component {
  state = {
    user: {...originalUser},
    dirty: false
  };

  onBirthdayChange = (date, dateString) => {
    if (date.isValid()) {
      this.setState({ birthday: dateString });
    } else {
      // this.setState({ birthday: '' });
    }
  };

  onTextInputChange = (e) => {
    console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  changeInfo = (obj) => {
    this.setState({
      user: {
        ...this.state.user,
        ...obj,
      },
      dirty: true
    });
  }

  isInfoChanged = () => {
    if (!this.state.dirty)
      return false;
    return JSON.stringify(this.state.user) != JSON.stringify(originalUser)
  }

  render() {
    return (
      <Form>
        <Item label='Tên' {...formItemLayout}>
          <Paragraph editable={{ onChange: (s) => this.changeInfo({ name: s }) }}>{this.state.user.name}</Paragraph>
        </Item>
        <Item label='Email' {...formItemLayout}>
          <Paragraph editable={{ onChange: (s) => this.changeInfo({ email: s }) }}>{this.state.user.email}</Paragraph>
        </Item>
        <Item label='Di động' {...formItemLayout}>
          <Paragraph editable={{ onChange: (s) => this.changeInfo({ phone: s }) }}>{this.state.user.phone}</Paragraph>
        </Item>
        <Item label='Ngày sinh' {...formItemLayout}>
          <DatePicker
            format={dateFormat}
            // value={moment(this.state.user.birthday, dateFormat).isValid() ? moment(this.state.user.birthday, dateFormat) : null}
            // onChange={this.onBirthdayChange}
            placeholder={this.state.user.birthday}
            showToday={true}
          />
        </Item>
        <Item label='Địa chỉ' {...formItemLayout}>
          <Paragraph editable={{ onChange: (s) => this.changeInfo({ address: s }) }}>{this.state.user.address}</Paragraph>
        </Item>
        <Item label='CMND' {...formItemLayout}>
          <Paragraph editable={{ onChange: (s) => this.changeInfo({ cmnd: s }) }}>{this.state.user.cmnd}</Paragraph>
        </Item>
        <Item label='Hình đại diện' {...formItemLayout}>
          <Upload>

          </Upload>
        </Item>
        <Item {...tailFormItemLayout}>
          <Button type='primary' disabled={!this.isInfoChanged()}>Cập nhật</Button>
        </Item>
      </Form>
    );
  }
}