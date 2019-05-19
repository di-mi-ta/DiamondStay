import React from 'react';
import '../../css/Convenience.css';

class Convenience extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="convenience">
        <h2>Tiện nghi chỗ ở</h2>
        <p>Giói thiệu về các tiện nghi gia đình và dịch vụ nơi lưu trú</p>
        <div className="section">
          <h3>Tiện ích gia đình</h3>
          <div className="list">
            <div className="item">
              <img src="https://img.icons8.com/ios/50/000000/empty-bed-filled.png"/>
              <span>Đệm bổ sung</span>
            </div>
            <div className="item">
              <img src="https://img.icons8.com/ios/50/000000/no-smoking-filled.png"/>
              <span>Không hút thuốc</span>
            </div>
          </div>
        </div>
        <div className="section">
          <h3>Tiện ích bếp</h3>
          <div className="row">
            <div className="col-4">Bếp điện</div>
            <div className="col-4">Lò vi sóng</div>
            <div className="col-4">Tủ lạnh</div>
          </div>
        </div>
        <div className="section">
          <h3>Tiện ích giải trí</h3>
          <div className="row">
            <div className="col-4">BBQ</div>
            <div className="col-4">Cảnh quan đẹp</div>
            <div className="col-4">Gần sân golf</div>
            <div className="col-4">Câu cá</div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    
  }
}

export default Convenience;