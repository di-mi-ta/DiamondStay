import React from 'react';
import '../../css/HouseCard.css';

class HouseCard extends React.Component {
  constructor(props) {
    super(props);
    /*
    props.houseData = {
      image: "http://imagelink",
      type: "Nha rieng/biet thu",
      houseName: "da lat hoang hon",
      location: "da lat",
      price: "10$",
      rating: 3,
      numRating: 20
    }
    */
    this.ref = React.createRef();
  }

  render() {
    return (
      <div className="houseCard container-fluid" ref={this.ref}>
        <div className="houseImage">
          <img src={this.props.houseData.image} alt=""/>
        </div>
        <div className="houseInfo">
          {this.props.houseData.type? <h5 className="houseType">{this.props.houseData.type}</h5>: null}
          <h4 className="houseName">{this.props.houseData.houseName}</h4>
          <div className="location">
            <i className="fa fa-map-marker" aria-hidden="true"></i>
            {
              this.props.houseData.location?
              <span>{`${this.props.houseData.location.district} - ${this.props.houseData.location.province}`}</span>
              : <span>Chưa rõ</span>
            }
            
          </div>
          <div className="price">
            <i className="fa fa-usd" aria-hidden="true"></i>
            <span>{this.props.houseData.price}</span>
          </div>
          {
          this.props.houseData.rating > 0 && 
          <div className="star">
            <i className="fa fa-star fill" aria-hidden="true"></i>
            <span className="rating">{this.props.houseData.rating}</span>
            <span>Số lượt đánh giá: {this.props.houseData.numRating}</span>
          </div>
          }
        </div>
      </div>
    );
  }

  componentDidMount() {
    let root = this.ref.current;
    root.querySelector('.houseInfo > h4').style.fontSize = `${root.offsetWidth/15}px !important`;
    window.addEventListener('resize', function(event) {
      console.log("fontsize: " + root.querySelector('.houseInfo > h4').style.fontSize);
      root.querySelector('.houseInfo > h4').style.fontSize = `${root.offsetWidth/15}px !important`;
    });
  }
}

export default HouseCard;
