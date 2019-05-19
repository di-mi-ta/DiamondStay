import React from 'react';
import '../../css/HouseSideBar.css';
import HouseCard from './HouseCard';

class HouseSideBar extends React.Component {
  constructor() {
    super();
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
            <h3>Chủ nhà Babylone House</h3>
            <div className="content row">
              <div className="col-8">
                Babylon House sở hữu những căn hộ sang trọng, giá tốt, là điểm dừng chân tuyệt vời cho cho chuyến đi cho bạn và người thân.
              </div>
              <div className="hostAvatar col-4">
                <img src="https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.0-9/25659495_1985790391700726_2055711243115136599_n.jpg?_nc_cat=100&_nc_oc=AQm11pM1x-LWd4bzDu0lbnhDaR2gEO2jN56w7oYbUAn9UAgkkQEEXr6q_ega7yqAZpY&_nc_ht=scontent.fsgn4-1.fna&oh=e085f90bcf942f27a604d6e2b8e7f0be&oe=5D731042"></img>
              </div>
            </div>
          </div>
          <div className="housePromotion">
            <h3>Chỗ ở tương tự</h3>
            {this.promotion.map(house =>
              <HouseCard houseData={house} key={house.id}/>
            )}
          </div>
        </div>
    );
  }

  componentDidMount() {
    
  }
}

export default HouseSideBar;