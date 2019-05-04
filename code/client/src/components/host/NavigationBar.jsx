import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

class NavigationBar extends React.Component {
  render() {
    return (
      <Navbar expand='md'>
        <NavbarBrand href='/'>DiamondStay</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href='https://github.com/di-mi-ta/DiamondStay'>GitHub</NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>Văn Tiến Cường</DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Thông tin cá nhân</DropdownItem>
              <DropdownItem>Quản lý tài khoản</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Đăng xuất</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Navbar>
    );
  }
}

export default NavigationBar;