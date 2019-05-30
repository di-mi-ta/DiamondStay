import React from 'react';
import '../../css/HouseSideBar.css';
import HouseCard from './HouseCard';
import {connect} from 'react-redux';
import * as actions from '../../redux/ActionCreators';
import { baseUrl } from '../../shared/baseUrl';
import {Link} from 'react-router-dom';

class HouseSideBar extends React.Component {
  constructor(props) {
    super(props);
    this.promotion = [
      {
        id: "1",
        houseName: "Babylon House - Bungalow Loc Tien",
        location: "Bắc sơn, Hà Nội",
        price: "$152/đêm",
        type: "Khác",
        image: "https://cdn.luxstay.com/rooms/20271/medium/room_20271_7_1553178108.jpg",
        rating: 0,
        numRating: 0
      },
      {
        id: "2",
        houseName: "Nhà Bên Rừng - U Lesa: Qủa Thông Lớn",
        location: "Sóc Sơn, Hà Nội",
        price: "$102/đêm",
        type: "Nhà riêng",
        image: "https://cdn.luxstay.com/rooms/13619/medium/room_13619_3_1548836805.jpg",
        rating: 5,
        numRating: 2
      },
      {
        id: "3",
        houseName: "Runaway - The Chipmunk",
        location: "Sóc Sơn, Hà Nội",
        price: "$52/đêm",
        type: "",
        image: "https://cdn.luxstay.com/rooms/14456/medium/1537270177_DSC06175.jpg",
        rating: 5,
        numRating: 5
      },
      {
        id: "4",
        houseName: "Rừng thông xanh - Green Pines Resort",
        location: "Sóc Sơn, Hà Nội",
        price: "$260/đêm",
        type: "Biệt thự",
        image: "https://cdn.luxstay.com/rooms/14048/medium/1533701238_ảnh đại diện.jpg",
        rating: 0,
        numRating: 0
      },
    ];
  }

  render() {
    return (
        <div className="houseSideBar container-fluid">
          <div className="hostInfo">
            <h3>Chủ nhà {this.props.currentHomepost.name}</h3>
            <div className="content row">
              <div className="col-8">
                {this.props.currentHomepost.description}
              </div>
              <div className="hostAvatar col-4">
                <img src="https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.0-9/25659495_1985790391700726_2055711243115136599_n.jpg?_nc_cat=100&_nc_oc=AQm11pM1x-LWd4bzDu0lbnhDaR2gEO2jN56w7oYbUAn9UAgkkQEEXr6q_ega7yqAZpY&_nc_ht=scontent.fsgn4-1.fna&oh=e085f90bcf942f27a604d6e2b8e7f0be&oe=5D731042"></img>
              </div>
            </div>
          </div>
          <div className="housePromotion">
            <h3>Chỗ ở tương tự</h3>
            {
              this.props.homeposts.homeposts
              .slice(0, 5)  // maximum 5 posts
              .map(house => ({
                id: house._id,
                image: house.image.length > 0?
                  baseUrl + house.image[0] 
                  : 'https://cdn.luxstay.com/rooms/14456/medium/1537270177_DSC06175.jpg',
                type: house.typeHome,
                houseName: house.name,
                location: house.location,
                price: `${house.weekdayPrice} ${house.currencyUnit}`,
                rating: house.rating.length > 0?
                  Math.floor(
                    house.rating
                    .map(rating => rating.rating)
                    .reduce((a, b) => a + b, 0) / house.rating.length
                  )
                  : 0,
                numRating: house.rating.length
              }))
              .map(house =>
                <Link to={`/room/${house.id}`} key={house.id} onClick={() => this.props.fetchHomepostById(house.id)}>
                  <HouseCard houseData={house}/>
                </Link>
                // <HouseCard houseData={house} key={house.id}/>
              )
            }
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  homeposts: state.homeposts
});

const mapDispatchToProps = (dispatch) => ({
  fetchHomeposts: (query='') => {dispatch(actions.fetchHomeposts(query))},
  fetchHomepostById: (homeId) => {dispatch(actions.fetchHomepostById(homeId))}
});

export default connect(mapStateToProps, mapDispatchToProps)(HouseSideBar);