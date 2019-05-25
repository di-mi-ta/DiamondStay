import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem,
    Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import {Button, Dropdown, Icon, Menu} from 'antd';
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
<<<<<<< HEAD
        this.setState({
            isLoginModalOpen: !this.state.isLoginModalOpen
        });
    }

    toggleSigninModal(){
        this.setState({
=======
        this.setState({
            isLoginModalOpen: !this.state.isLoginModalOpen
        });
    }

    toggleSigninModal(){
        this.setState({
>>>>>>> tan-branch
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
<<<<<<< HEAD
            <header class="header">
                <div class="header_content d-flex flex-row align-items-center justify-content-start">
                    {/*logo*/}
                    <div><a href="#">
                        <img src="images/diamondstay_icon.png" alt="DiamondStay icon" style={{width:"70px",height:"70px"}}/>
                    </a></div>

                    {/*Menu, including horizontal menu and 2 buttons*/}
                    <div class="ml-auto d-flex flex-row align-items-center justify-content-start">
                        <nav class="main_nav">
                            <ul class="d-flex flex-row align-items-start justify-content-start">
                                <li class="active"><a href="index.html">Trang chủ</a></li>
                                <li><a style={{color:"#FFFFFF"}}>Về chúng tôi</a></li>
                                <li><a href="blog.html" style={{color:"#FFFFFF"}}>Blog</a></li>
                                <li><a href="contact.html" style={{color:"#FFFFFF"}}>Liên hệ</a></li>
                            </ul>
                        </nav>
                        <div class="book_button"><a href="booking.html">Đặt phòng Online</a></div>
                        <div class="header_phone d-flex flex-row align-items-center justify-content-center">
                            <img src="images/phone.png" alt=""/>
                            <span>090-xxx-xxxx</span>
                        </div>
                        {/*User name*/}
                        <div class="header_phone d-flex flex-row align-items-center justify-content-center">
                            <img src="images/.png" alt=""/>
                            <span>Chào, bạn gì đó</span>
                        </div>
                        <div class="hamburger"><i class="fa fa-bars" aria-hidden="true"></i></div>
                    </div>
                </div>
            </header>
=======
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
                            <img src="http://www.iconeasy.com/icon/png/Business/Pretty%20Office%204/Home.png" height="30" width="30"/>
                            <b>Diamond Stay</b>
                    </NavbarBrand>
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Link to='/host'>
                                    <Button type="link">
                                            Trở thành chủ nhà
                                    </Button>
                                </Link>
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
                            <Button onClick={this.handleLogin} type="primary">Đăng nhập</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
>>>>>>> tan-branch
        );
    }
}
export default Header;
