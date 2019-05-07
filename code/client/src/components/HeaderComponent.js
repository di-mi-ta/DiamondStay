import React, { Component } from 'react';
import "../css/main_styles.css";

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleLogin(event) {
        this.toggleModal();
        this.props.loginUser({username: this.username.value, password: this.password.value});
        event.preventDefault();

    }

    handleLogout() {
        this.props.logoutUser();
    }

    render() {
        return(
            <header class="header">
                <div class="header_content d-flex flex-row align-items-center justify-content-start">
                    <div class="logo"><a href="#">
                        <img src="images/diamondstay_icon.png" alt="DiamondStay icon" style={{width:"70px",height:"70px"}}/>
                    </a></div>
                    <div class="ml-auto d-flex flex-row align-items-center justify-content-start">
                        <nav class="main_nav">
                            <ul class="d-flex flex-row align-items-start justify-content-start">
                                <li class="active"><a href="index.html">Home</a></li>
                                <li><a href="about.html">About us</a></li>
                                <li><a href="#">Rooms</a></li>
                                <li><a href="blog.html">Blog</a></li>
                                <li><a href="contact.html">Contact</a></li>
                            </ul>
                        </nav>
                        <div class="book_button"><a href="booking.html">Book Online</a></div>
                        <div class="header_phone d-flex flex-row align-items-center justify-content-center">
                            <img src="images/phone.png" alt=""/>
                            <span>090-xxx-xxxx</span>
                        </div>
                        <div class="hamburger"><i class="fa fa-bars" aria-hidden="true"></i></div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;