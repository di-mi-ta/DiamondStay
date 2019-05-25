import React from 'react';
import '../../css/MainPage.css';
import ImageCard from './ImageCard';
import HouseCard from '../Homestay/HouseCard';
import GlideSlide from './GlideSlide';
import SearchBox from './SearchBox';
import {Link, Route, Switch} from 'react-router-dom';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.bestPlaces = this.props.homeposts.homeposts;
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

  componentDidMount(){
    this.props.fetchHomeposts();
    this.props.fetchSystemPromos();
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
          <p>Thêm trải nghiệm, thêm nhiều niềm vui tại những chỗ ở được yêu thích nhất tại Diamond Stay</p>
          {/*for test list homepost*/}
          <b>{JSON.stringify(this.props.homeposts.homeposts)}</b>
        </div>
        <GlideSlide ref={this.placeRef} 
                    data={{ hasControl: true,
                            itemList: this.bestPlaces.map(place => 
                            <Link to={`/room/${place.id}`}>
                              <HouseCard houseData={place}/>
                            </Link>
                    ),
                            options: {
                              type: 'slider',
                              startAt: 0,
                              perView: 4,
                              gap: 20,
                              bound: true,
                              autoplay: false
                            }
                          }} 
        />
        <div className="title">
          <h2>Ưu đãi hiện hành</h2>
          <p>Cập nhật ưu đãi từ Diamond Stay để trải nghiệm chỗ ở xa hoa với giá tốt nhất</p>
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
