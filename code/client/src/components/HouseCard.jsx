import React from 'react';
import '../css/HouseCard.css';

class HouseCard extends React.Component {
  constructor(props) {
    super(props);
    this.data = props.houseData;
  }

  render() {
    return (
      <div className="houseCard container-fluid">
        <div className="houseImage">
          <img src={this.data.image}></img>
        </div>
        <div className="houseInfo">
          {this.data.type? <h5 className="houseType">{this.data.type}</h5>: null}
          <h4>{this.data.houseName}</h4>
          <div className="location">
            <i className="fa fa-map-marker" aria-hidden="true"></i>
            <span>{this.data.location}</span>
          </div>
          <div className="price">
            <i className="fa fa-usd" aria-hidden="true"></i>
            <span>{this.data.price}</span>
          </div>
          {
          this.data.rating > 0 && 
          <div className="star">
            <i className="fa fa-star fill" aria-hidden="true"></i>
            <span className="rating">{this.data.rating}</span>
            <span>Số lượt đánh giá: {this.data.numRating}</span>
          </div>
          }
          
        </div>
      </div>
    );
  }

  componentDidMount() {
    
  }
}

export default HouseCard;
