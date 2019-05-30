import React from 'react';
import '../../css/MainPage.css';
import ImageCard from './ImageCard';
import HouseCard from '../Homestay/HouseCard';
import GlideSlide from './GlideSlide';
import SearchBox from './SearchBox';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../redux/ActionCreators';
import {baseUrl} from '../../shared/baseUrl';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.spaceList = [
      {
        id: "1",
        image: 'https://cdn.luxstay.com/home/suggestion/location_10_1556013549.png',
        description: 'Chung cư'
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
        description: 'Căn hộ Studio'
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
    this.state = {
      policyGlideOptions: {
        type: 'carousel',
        perView: 3,
        focusAt: 'center',
        autoplay: 5000
      },
      spaceGlideOptions: {},
      placeGlideOptions: {perView: 4, autoplay: false}
    };
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
        <GlideSlide
          hasControl = {false}
          options = {this.state.spaceGlideOptions}
          itemList = {
            this.spaceList.map(space => <Link to={`/search?homestayType=${space.description}`}>
                                          <ImageCard data={space}/>
                                        </Link>)
          }
        />

        <div className="title">
          <h2>Chỗ ở tốt nhất</h2>
          <p>Thêm trải nghiệm, thêm nhiều niềm vui tại những chỗ ở được yêu thích nhất tại Diamond Stay</p>
        </div>
        <GlideSlide
          hasControl = {true}
          options = {this.state.placeGlideOptions}
          itemList = {
            this.props.homeposts?
            this.props.homeposts.homeposts.filter(home=>home.state === 'Success').map(homepost => ({
              id: homepost._id,
              image: (homepost.image && homepost.image.length > 0)? 
                `${baseUrl}${homepost.image[0]}`
                : 'https://cdn.luxstay.com/home/suggestion/location_10_1556013549.png',
              type: homepost.typeHome,
              houseName: homepost.name,
              location: homepost.location,
              price: homepost.weekdayPrice,
              rating: homepost.rating.length > 0?
                Math.floor(
                  homepost.rating
                  .map(rating => rating.rating)
                  .reduce((a, b) => a + b, 0) / homepost.rating.length
                )
                : 0,
              numRating: homepost.rating.length
            })).map(place =>
              <Link to={`/room/${place.id}`} onClick={() => this.props.fetchHomepostById(place.id)}>
                <HouseCard houseData={place}/>
              </Link>
            )
            : []
          }
        />
        <div className="title">
          <h2>Ưu đãi hiện hành</h2>
          <p>Cập nhật ưu đãi từ Diamond Stay để trải nghiệm chỗ ở xa hoa với giá tốt nhất</p>
        </div>
        <GlideSlide className="currentPolicy"
          hasControl = {true}
          options = {this.state.policyGlideOptions}
          itemList = {
            (
              (this.props.promotions.systemPromos.length > 0)?
              this.props.promotions.systemPromos.map(promo => 
                ({
                  image: baseUrl + promo.logoPath
                })
              ): this.currentPolicies
            ).map(policy => <ImageCard data={policy}/>
          )}
        />
      </div>
    );
  }

  updatePolicyGlideSize() {
    if (window.innerWidth < 600) {
      this.setState({
        policyGlideOptions: {...this.state.policyGlideOptions, startAt: 0, perView: 1},
        spaceGlideOptions: {...this.state.spaceGlideOptions, startAt: 0, perView: 1},
        placeGlideOptions: {...this.state.placeGlideOptions, startAt: 0, perView: 1}
      });
    }
    else if (window.innerWidth < 675) {
      this.setState({
        policyGlideOptions: {...this.state.policyGlideOptions, startAt: 0, perView: 2},
        spaceGlideOptions: {...this.state.spaceGlideOptions, startAt: 0, perView: 2},
        placeGlideOptions: {...this.state.placeGlideOptions, startAt: 0, perView: 2}
      });
    }
    else if (window.innerWidth < 800) {
      this.setState({
        policyGlideOptions: {...this.state.policyGlideOptions, startAt: 0, perView: 2},
        spaceGlideOptions: {...this.state.spaceGlideOptions, startAt: 0, perView: 3},
        placeGlideOptions: {...this.state.placeGlideOptions, startAt: 0, perView: 3}
      });
    }
    else {
      this.setState({
        policyGlideOptions: {...this.state.policyGlideOptions, startAt: 0, perView: 3},
        spaceGlideOptions: {...this.state.spaceGlideOptions, startAt: 0, perView: 4},
        placeGlideOptions: {...this.state.placeGlideOptions, startAt: 0, perView: 3}
      });
    }
  }

  componentDidMount() {
    this.updatePolicyGlideSize();
    window.addEventListener('resize', e => this.updatePolicyGlideSize());
  }
}

const mapStateToProps = state => ({
  homeposts: state.homeposts,
  promotions: state.promotions,
});

const mapDispatchToProps = (dispatch) => ({
  fetchHomeposts: (query='') => {dispatch(actions.fetchHomeposts(query))},
  fetchSystemPromos: () => {dispatch(actions.fetchSystemPromos())},
  fetchHomepostById: homeId => {dispatch(actions.fetchHomepostById(homeId))},
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
