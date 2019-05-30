import React from 'react';
import '../../css/promotions/PromotionCard.css';
import {Button} from 'antd';

class SysPromoCard extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  render() {
    return (
      <div className="discount start-xs" ref={this.ref}>
        <div className="discount__title is-flex jbetween">
          <p className="mb--0 bold" style={{color: "while"}}>{this.props.promotion.name}</p>
        </div>
        <div className="discount__content">
          <div className="discount__description">
            <img src="https://www.luxstay.com/icons/discount-icon.png" width="48" height="48"/>
            <div className="discount__detail pr--6">
              {"Giảm giá "} 
              <b>
                  <font color="#FF0037">{this.props.promotion.value + "%"}</font>
              </b>
              {" - Mã: "} 
              <b style={{color: "#FF0037"}}>
                  <font color="#FF0037">{this.props.promotion.code}</font>
              </b>
              <br/>
              {"Thời gian check-in: "}
              <b> Không giới hạn </b>
            </div>
            <div className="discount__action mt--12" onClick={() => {}}>
              <span className="btn btn--xs rounded btn--secondary">
                Sao chép mã
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
  }
}

export default SysPromoCard;
