import React from 'react';
import '../css/MainHeader.css';

class MainHeader extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light mainHeader">
        <a className="navbar-brand" href="#">
          <img src="assets/images/logo.png" alt=""/>
          <span>DiamondStay</span>
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainHeaderNavbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainHeaderNavbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">Hotline: <b>18001008</b></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Trở thành chủ nhà</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Đăng ký</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Đăng nhập</a>
            </li>
            <li className="nav-item dropdown">
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
        </div>
      </nav>
    );
  }

  componentDidMount() {
    
  }
}

export default MainHeader;