import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem,
    Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import { Divider, Button, Dropdown, Icon, Menu} from 'antd';
import {Link} from 'react-router-dom';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isLoginModalOpen: false,
            isSigninModalOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleLoginModal = this.toggleLoginModal.bind(this);
        this.toggleSigninModal = this.toggleSigninModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    
    handleMenuClick = ({ item, key, keyPath }) => {
        if (key == 5){
            this.handleLogout();
        }
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

    toggleSigninModal(){
        this.setState({
            isSigninModalOpen: !this.state.isSigninModalOpen
        });
    }

    handleLogin(event) {
        this.toggleLoginModal();
        this.props.loginUser({username: this.username.value, password: this.password.value});
        event.preventDefault();
    }

    handleLogout() {
        this.props.logoutUser();
    }

    render() {
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1">
                    <span>
                        <Link to='/host'> 
                        <Icon type="book"/> Đặt chỗ của tôi
                        </Link>
                    </span>
                </Menu.Item>
                <Menu.Item key="2">
                    <span>
                        <Link to='/host'> 
                        <Icon type="message" /> Tin nhắn
                        </Link>
                    </span>
                </Menu.Item>
                <Menu.Item key="3">
                    <span>
                        <Link to='/host'> 
                        <Icon type="setting" /> Cài đặt tài khoản
                        </Link>
                    </span>
                </Menu.Item>
                <Menu.Item key="4">
                    <span>
                        <Link to='/host'> 
                        <Icon type="heart" /> Yêu thích
                        </Link>
                    </span>
                </Menu.Item>
                <Menu.Item key="5">
                    <span>
                        <Icon type="logout"/> Đăng xuất
                    </span>
                </Menu.Item>
            </Menu>
        );

        return(
            <React.Fragment>
                <Navbar light expand="md" 
                        style= {{
                            backgroundImage: "while",
                            top: 0,
                            width: '100%',
                        }}>
                    <div className="container">
                    <NavbarToggler onClick={this.toggleNav} />
                    <NavbarBrand className="mr-auto" href="/" style={{color: 'while'}}>
                            <img src="assets/images/icon.png" height="30" width="30"/>
                            <b>Diamond Stay</b>
                    </NavbarBrand>
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Button type="link">
                                        Trở thành chủ nhà
                                </Button>
                            </NavItem>
                            <NavItem>
                                {!this.props.auth.isAuthenticated ?
                                    <div>
                                        <Button onClick={this.toggleSigninModal} type="link" 
                                        >
                                            Đăng kí 
                                        </Button> 
                                        <Button onClick={this.toggleLoginModal} type="link" 
                                        >
                                            Đăng nhập 
                                        </Button>  
                                    </div>      
                                    :
                                    <div>
                                        <Dropdown overlay={menu}>
                                            <Button style={{background: '#f7ede1', width: '100px', borderRadius: "20px"}}>
                                                {this.props.auth.user.username} <Icon type="down" />
                                            </Button>
                                        </Dropdown>
                                    </div>
                                }
                            </NavItem> 
                        </Nav>
                    </Collapse>
                    </div>
                </Navbar>
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
                            <Button onClick={this.handleLogin} color="primary">Đăng nhập</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}
export default Header;
