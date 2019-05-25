import React from 'react';
import { Modal, ModalHeader, ModalBody,
  Form, FormGroup, Input, Label, FormFeedback,
  Row, Col,
} from 'reactstrap';
import {Button, Dropdown, Icon, Menu} from 'antd';
import * as utils from '../../utils/api/user';
import { message as notification } from 'antd';

function isEmpty(input) {
  return (input.trim() == '');
}

function isPasswordValid(password) {
  return password.length >= 1;
}

export default class UserRegistration extends React.Component {
  state = {
    info: {
      username: '',
      password: '',
      passwordAgain: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    invalids: {
      username: null,
      password: null,
      passwordAgain: null,
      firstName: null,
      lastName: null,
      email: null,
    },
    firstTime: true, // if user just open the form, dont show errors
  };

  hideFirstTime = (component) => {
    return this.state.firstTime ? null : component;
  }

  onInfoChanged = (e) => {
    this.setState({
      info: {
        ...this.state.info,
        [e.target.name]: e.target.value
      }
    })
  };

  getUpdatedInValids = () => {
    const info = this.state.info;
    const invalids = {
      username: isEmpty(info.username),
      password: !isPasswordValid(info.password),
      passwordAgain: !(isPasswordValid(info.password) && info.passwordAgain === info.password),
      firstName: isEmpty(info.firstName),
      lastName: isEmpty(info.lastName),
      email: false,
    };
    return invalids;
  };

  isFormValid = (invalids) => {
    return !invalids.username && !invalids.password && !invalids.passwordAgain &&
      !invalids.firstName && !invalids.lastName;
  };

  handleUserRegister = () => {
    const invalids = this.getUpdatedInValids();
    this.setState({
      invalids,
      firstTime: false,
    }); // async call

    if (!this.isFormValid(invalids)) {
      return;
    }

    const u = this.state.info;
    const user = {
        username: u.username,
        password: u.password,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        phone: u.phone,
    };
    utils.registerUser(user).then(() => {
        notification.success('Đăng ký thành công!');
        this.props.toggle();
    }).catch(err => {
        if (err.name === 'UserExistsError') {
          notification.error('Tên đăng nhập đã có người sử dụng');
          this.props.toggle();
        } else {
            console.log(err);
        }
    });
  };

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader>Đăng kí tài khoản</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="username">Tên đăng nhập</Label>
              <Input
                name="username"
                onChange={this.onInfoChanged}
                value={this.state.info.username}
                invalid={this.state.invalids.username}
              />
              <FormFeedback valid={false}>Tên đăng nhập không được bỏ trống</FormFeedback>
            </FormGroup>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="password">Mật khẩu</Label>
                  <Input
                    type="password"
                    name="password"
                    onChange={this.onInfoChanged}
                    value={this.state.info.password}
                    invalid={this.state.invalids.password}
                  />
                  <FormFeedback valid={false}>Mật khẩu cần ít nhất 1 ký tự</FormFeedback>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="password">Nhập lại mật khẩu</Label>
                  <Input
                    type="password"
                    name="passwordAgain"
                    onChange={this.onInfoChanged}
                    invalue={this.state.info.passwordAgain}
                    invalid={this.state.invalids.passwordAgain}
                  />
                  <FormFeedback valid={false}>Không khớp mật khẩu ban đầu</FormFeedback>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="lastName">Họ</Label>
                  <Input
                    name="lastName"
                    onChange={this.onInfoChanged}
                    value={this.state.info.lastName}
                    invalid={this.state.invalids.lastName}
                  />
                  <FormFeedback valid={false}>Không được bỏ trống</FormFeedback>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="firstName">Tên</Label>
                  <Input
                    name="firstName"
                    onChange={this.onInfoChanged}
                    value={this.state.info.firstName}
                    invalid={this.state.invalids.firstName}
                  />
                  <FormFeedback valid={false}>Không được bỏ trống</FormFeedback>
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                name="email"
                onChange={this.onInfoChanged}
                value={this.state.info.email}
                invalid={this.state.invalids.email}
              />
            </FormGroup>
            <FormGroup>
              <Label for="phone">Di động</Label>
              <Input name="phone" onChange={this.onInfoChanged} value={this.state.info.phone}/>
            </FormGroup>
            <Button onClick={this.handleUserRegister} type="primary">Đăng ký</Button>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}
