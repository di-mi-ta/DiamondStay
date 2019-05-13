import React from 'react';
import { Form, Button, Col, Row } from 'antd';
import Password from 'antd/lib/input/Password';
const Item = Form.Item;
const itemLayout = {
  labelAlign: 'left',
  labelCol: { span: 5, offset: 2 },
  wrapperCol: { span: 10, offset: 2 },
}

const buttonLayout = {
  wrapperCol: {
    offset: itemLayout.labelCol.span + itemLayout.labelCol.offset + itemLayout.wrapperCol.offset,
    span: itemLayout.wrapperCol.span,
  },
  style: {
    textAlign: 'right'
  }
};


class PasswordChanging extends React.Component {
  state = {
    oldPass: '',
    newPass: '',
    newPassConfirm: '',
  }

  onTextChange = (e) => {
    e.persist();  // wait for event object to be ready
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // this should be a props
  onChangePassword = () => {
    console.table(this.state)
    if (this.state.oldPass == '') {
      console.log('Chưa nhập mật khẩu');
    } else if (this.state.newPass == '') {
      console.log('Chưa nhập mật khẩu mới');
    } else if (this.state.newPassConfirm == '') {
      console.log('Chưa nhập xác nhận MK')
    }
    else if (this.state.newPass !== this.state.newPassConfirm) {
      console.log('Mật khẩu không khớp');
    } else {
      console.log('OK');
    }
  }

  render() {
    return (
      <Col span={20}>
        <Form {...itemLayout}>
          <Item label='Mật khẩu cũ'>
            <Password name='oldPass' value={this.state.oldPass} onChange={this.onTextChange} />
          </Item>
          <Item label='Mật khẩu mới'>
            <Password name='newPass' value={this.state.newPass} onChange={this.onTextChange} />
          </Item>
          <Item label='Nhập lại mật khẩu mới'>
            <Password name='newPassConfirm' value={this.state.newPassConfirm} onChange={this.onTextChange} />
          </Item>
          <Item {...buttonLayout}>
            <Button onClick={this.onChangePassword}>Đổi mật khẩu</Button>
          </Item>
        </Form>
      </Col>
    );
  }
}

export default PasswordChanging;