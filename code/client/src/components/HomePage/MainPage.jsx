import React from 'react';
import '../../css/MainPage.css';
import ImageCard from './ImageCard';
import HouseCard from '../DetailedHomepost/HouseCard';
import GlideSlide from './GlideSlide';
import SearchBox from './SearchBox';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.spaceList = [
      {
        id: "1",
        image: 'https://cdn.luxstay.com/home/suggestion/location_10_1556013549.png',
        description: 'Căn hộ dịch vụ'
      },
      {
        id: "2",
        image: 'https://cdn.luxstay.com/home/suggestion/location_3_1556012844.png',
        description: 'Biệt thự'
      },
      {
        id: "3",
        image: 'https://cdn.luxstay.com/home/suggestion/location_6_1556013288.png',
        description: 'Nhà riêng'
      },
      {
        id: "4",
        image: 'https://cdn.luxstay.com/home/suggestion/location_2_1556166927.png',
        description: 'Studio'
      }
    ];
    this.bestPlaces = [
      {
        id: "1",
        houseName: "Em ơi nhà chúng mình Homestay",
        location: "Đà Lạt, Lâm Đồng",
        price: "1,500,000đ/đêm",
        type: "Nhà riêng",
        image: "https://cdn.luxstay.com/rooms/14926/medium/1538099026_20180921_064858.jpg",
        rating: 0,
        numRating: 0
      },
      {
        id: "2",
        houseName: "Phòng đơn hướng vườn Hồng trứng - Vườn đom đóm",
        location: "Đà Lạt, Lâm Đồng",
        price: "370,000đ/đêm",
        type: "Nhà riêng",
        image: "https://cdn.luxstay.com/rooms/18902/medium/room_18902_8_1552234066.jpg",
        rating: 5,
        numRating: 5
      },
      {
        id: "3",
        houseName: "THE HOBBIT BUNGALOW - STANDARD",
        location: "Đà Lạt, Lâm Đồng",
        price: "450,000đ/đêm",
        type: "Khác",
        image: "https://cdn.luxstay.com/rooms/20059/medium/room_20059_5_1548478695.jpg",
        rating: 0,
        numRating: 0
      },
      {
        id: "4",
        houseName: "THE HOBBIT BUNGALOW - DELUXE",
        location: "Đà Lạt, Lâm Đồng",
        price: "600,000đ/đêm",
        type: "Khác",
        image: "https://cdn.luxstay.com/rooms/20130/medium/room_20130_10_1551931848.jpg",
        rating: 5,
        numRating: 1
      },
      {
        id: "5",
        houseName: "Lux Homestay phòng 3",
        location: "Đà Lạt, Lâm Đồng",
        price: "420,000đ/đêm",
        type: "Căn hộ dịch vụ",
        image: "https://cdn.luxstay.com/rooms/20192/medium/room_20192_6_1548854358.jpg",
        rating: 5,
        numRating: 1
      },
      {
        id: "6",
        houseName: "Ba An Apartment Đà Lạt",
        location: "Đà Lạt, Lâm Đồng",
        price: "1,900,000đ/đêm",
        type: "Căn hộ",
        image: "https://cdn.luxstay.com/rooms/13640/medium/room_13640_122_1551771179.jpg",
        rating: 0,
        numRating: 0
      }
    ]
    this.currentPolicies = [
      {
        id: "1",
        image: "https://cdn.luxstay.com/home/event/event_9_1557459203.png"
      },
      {
        id: "2",
        image: "https://cdn.luxstay.com/home/event/event_2_1558007249.png"
      },
      {
        id: "3",
        image: "https://cdn.luxstay.com/home/event/event_1_1558007209.png"
      },
      {
        id: "4",
        image: "https://cdn.luxstay.com/home/event/event_1_1558005546.png"
      }
    ];
    this.policyRef = React.createRef();
    this.spaceRef = React.createRef();
    this.placeRef = React.createRef();
    this.updatePolicyGlideSize = this.updatePolicyGlideSize.bind(this);
  }

  render() {
    return (
      <div className="mainPage container-fluid">
        <div className="title">
          <h2>DiamondStay có thể giúp gì cho bạn</h2>
        </div>
        <SearchBox/>
        
        <div className="title">
          <h2>Không gian ưa thích</h2>
        </div>
        <GlideSlide ref={this.spaceRef} data={{
          hasControl: false,
          itemList: this.spaceList.map(space => <ImageCard data={space}/>)
        }} />
        
        <div className="title">
          <h2>Chỗ ở tốt nhất</h2>
          <p>Thêm trải nghiệm, thêm nhiều niềm vui tại những chỗ ở được yêu thích nhất tại DiamonStay</p>
        </div>
        <GlideSlide ref={this.placeRef} data={{
          hasControl: true,
          itemList: this.bestPlaces.map(place => 
            <HouseCard houseData={place}/>
          ),
          options: {
            type: 'slider',
            startAt: 0,
            perView: 4,
            gap: 20,
            bound: true,
            autoplay: false
          }
        }} />

        <div className="title">
          <h2>Ưu đãi hiện hành</h2>
          <p>Cập nhật ưu đãi từ DiamondStay để trải nghiệm chỗ ở xa hoa với giá tốt nhất</p>
        </div>
        <GlideSlide ref={this.policyRef} className="currentPolicy" data={{
          hasControl: true,
          itemList: this.currentPolicies.map(policy => <ImageCard data={policy}/> ),
          options: {
            type: 'carousel',
            startAt: 0,
            perView: 3,
            gap: 20,
            focusAt: 'center',
            autoplay: 5000
          }
        }} />
      </div>
    );
  }

  updatePolicyGlideSize() {
    const policyGlide = this.policyRef.current;
    const placeGlide = this.placeRef.current;
    const spaceGlide = this.spaceRef.current;
    if (window.innerWidth < 600) {
      policyGlide.updateGlide({startAt: 0, perView: 1});
      spaceGlide.updateGlide({startAt: 0, perView: 1});
      placeGlide.updateGlide({startAt: 0, perView: 1});
    }
    else if (window.innerWidth < 675) {
      policyGlide.updateGlide({startAt: 0, perView: 2});
      spaceGlide.updateGlide({startAt: 0, perView: 2});
      placeGlide.updateGlide({startAt: 0, perView: 2});
    }
    else if (window.innerWidth < 800) {
      policyGlide.updateGlide({startAt: 0, perView: 2});
      spaceGlide.updateGlide({startAt: 0, perView: 3});
      placeGlide.updateGlide({startAt: 0, perView: 3});
    }
    else {
      policyGlide.updateGlide({startAt: 0, perView: 3});
      spaceGlide.updateGlide({startAt: 0, perView: 4});
      placeGlide.updateGlide({startAt: 0, perView: 4});
    }
  }

  componentDidMount() {
    this.updatePolicyGlideSize();
    window.addEventListener('resize', e => this.updatePolicyGlideSize());
  }
}

export default MainPage;
