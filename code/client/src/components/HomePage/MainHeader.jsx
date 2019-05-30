import React from 'react';
import '../../css/MainHeader.css';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem,
  Modal, ModalHeader, ModalBody,
  Form, FormGroup, Input, Label } from 'reactstrap';
import {Button, Dropdown, Icon, Menu} from 'antd';
import {Link, Redirect} from 'react-router-dom';
import UserRegistration from './UserRegistration';
import {connect} from 'react-redux';
import * as actions from '../../redux/ActionCreators';

class MainHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
      isLoginModalOpen: false,
      isRegisterModalOpen: false,
      clickedLogout: false,
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleLoginModal = this.toggleLoginModal.bind(this);
    this.toggleRegisterModal = this.toggleRegisterModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  toggleNav() {
    this.setState({
        isNavOpen: !this.state.isNavOpen
    });
  }

  toggleLoginModal() {
      this.setState({
          isLoginModalOpen: !this.state.isLoginModalOpen
      });
  }

  toggleRegisterModal(){
      this.setState({
          isRegisterModalOpen: !this.state.isRegisterModalOpen
      });
  }

  handleLogin = () => {
      this.toggleLoginModal();
      this.props.loginUser({username: this.username.value, password: this.password.value});
  }

  handleLogout() {
      this.props.logoutUser();
  }

  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mainHeader">
          <Link to='/' className="navbar-brand">
            <img src="../assets/images/diamond.ico" alt=""/>
            <span>DiamondStay</span>
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainHeaderNavbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainHeaderNavbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">
                    <Button type="link">
                      Hotline: <b>0123456789</b>
                    </Button>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/host">
                    <Button type="link">
                      Trở thành chủ nhà
                    </Button>
                </a>
              </li>
              {!this.props.auth.isAuthenticated ?
                  <li className="nav-item">
                    <a className="nav-link">
                    <Button onClick={this.toggleRegisterModal} type="link">
                      Đăng kí
                    </Button>
                    </a>
                  </li>
                : <div/>
              }
              {!this.props.auth.isAuthenticated ?
                  <li className="nav-item">
                    <a className="nav-link">
                    <Button onClick={this.toggleLoginModal} type="link">
                      Đăng nhập
                    </Button>
                    </a>
                  </li>
                :
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src="https://www.luxstay.com/icons/vi.svg" width="24" height="24"/>
                    <span>{this.props.auth.user.username}</span>
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <div className="dropdown-item">
                      <Link to='/profile' className='nav-link'>
                        <Button type='link'>Cài đặt tài khoản</Button>
                      </Link>
                    </div>
                    <div className="dropdown-item">
                      <Link to='/messages' className='nav-link'>
                        <Button type='link'>Tin nhắn</Button>
                      </Link>
                    </div>
                    <div className="dropdown-item">
                        <a className="nav-link">
                        <Button onClick={this.handleLogout} type="link">
                          Đăng xuất
                        </Button>
                        </a>
                    </div>
                  </div>
                </li>
              }
              <li className="nav-item dropdown" style={{display: "none"}}>
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src="https://www.luxstay.com/icons/vi.svg" width="24" height="24"/>
                  <span>VND</span>
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <div className="dropdown-item">
                    <img src="https://www.luxstay.com/icons/vi.svg" width="24" height="24"/>
                    <span>Tiếng việt</span>
                  </div>
                  <div className="dropdown-item">
                    <b>VND</b>
                  </div>
                  <div className="dropdown-item">
                    <img src="https://www.luxstay.com/icons/en.svg" width="24" height="24"/>
                    <span>English</span>
                  </div>
                  <div className="dropdown-item">
                    <b>USD</b>
                  </div>
                </div>
              </li>
            </ul>
            <Modal isOpen={this.state.isLoginModalOpen} toggle={this.toggleLoginModal}>
                <ModalHeader toggle={this.toggleLoginModal}>Đăng nhập</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label htmlFor="username">Tên đăng nhập</Label>
                            <Input type="text" id="username" name="username"
                                innerRef={(input) => this.username = input} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Mật khẩu</Label>
                            <Input type="password" id="password" name="password"
                                innerRef={(input) => this.password = input}  />
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" name="remember"
                                innerRef={(input) => this.remember = input}  />
                                Nhớ mật khẩu
                            </Label>
                        </FormGroup>
                        <Button onClick={this.handleLogin} type="primary">Đăng nhập</Button>
                    </Form>
                </ModalBody>
            </Modal>
            <UserRegistration
              isOpen={this.state.isRegisterModalOpen}
              toggle={this.toggleRegisterModal}
            />
          </div>
        </nav>
    );
  }

  componentDidMount() {
    //fetch
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (creds) => dispatch(actions.loginUser(creds)),
  logoutUser: () => dispatch(actions.logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);
