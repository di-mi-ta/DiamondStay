import React from 'react';
import '../../css/HouseCard.css';

class HouseCard extends React.Component {
  constructor(props) {
    super(props);
    this.data = props.houseData;
    
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
    console.log(this.data);
    return (
      <div className="houseCard container-fluid" ref={this.ref}>
        <div className="houseImage">
          <img src={this.data.image}></img>
        </div>
        <div className="houseInfo">
          {this.data.type? <h5 className="houseType">{this.data.type}</h5>: null}
          <h4 className="houseName">{this.data.houseName}</h4>
          <div className="location">
            <i className="fa fa-map-marker" aria-hidden="true"></i>
            <span>{`${this.data.location.district} - ${this.data.location.province}`}</span>
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
    let root = this.ref.current;
    root.querySelector('.houseInfo > h4').style.fontSize = `${root.offsetWidth/15}px !important`;
    window.addEventListener('resize', function(event) {
      console.log("fontsize: " + root.querySelector('.houseInfo > h4').style.fontSize);
      root.querySelector('.houseInfo > h4').style.fontSize = `${root.offsetWidth/15}px !important`;
    });
  }
}

export default HouseCard;
