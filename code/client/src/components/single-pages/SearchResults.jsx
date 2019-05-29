import React, {Component} from 'react';
import MainHeader from '../HomePage/MainHeader';
import SearchBox from '../HomePage/SearchBox';
import {connect} from 'react-redux';
import '../../css/SearchResults.css';
import HouseCard from '../Homestay/HouseCard';
import {baseUrl} from '../../shared/baseUrl';
import {Link} from 'react-router-dom';

// import SearchResults
class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.place = {
      id: "4",
      houseName: "Rừng thông xanh - Green Pines Resort",
      location: "Sóc Sơn, Hà Nội",
      price: "$260/đêm",
      type: "Biệt thự",
      image: "https://cdn.luxstay.com/rooms/14048/medium/1533701238_ảnh đại diện.jpg",
      rating: 3,
      numRating: 2
    }
  }

  render(){
    console.log(this.props.homeposts.resHomepostsSearch);
    return(
      <div className="searchResult container-fluid">
        <MainHeader/>
        <SearchBox/>
        <div className="title">
          <span>Kết quả tìm kiếm</span>
          <div className="sort-box">
            <span>Sắp xếp theo</span>
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Giá giảm dần
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item">Giá tăng dần</a>
                <a className="dropdown-item">Giá giảm dần</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="result row">
          <Link to={`/room/5cea67afe89dd477c3af3f54`} className="result-item col-xs-6 col-md-4 col-lg-3">
            <HouseCard houseData={this.place}/>
          </Link>
          <Link to={`/room/5cea67afe89dd477c3af3f54`} className="result-item col-xs-6 col-md-4 col-lg-3">
            <HouseCard houseData={this.place}/>
          </Link>
          <Link to={`/room/5cea67afe89dd477c3af3f54`} className="result-item col-xs-6 col-md-4 col-lg-3">
            <HouseCard houseData={this.place}/>
          </Link>
          <Link to={`/room/5cea67afe89dd477c3af3f54`} className="result-item col-xs-6 col-md-4 col-lg-3">
            <HouseCard houseData={this.place}/>
          </Link>
          <Link to={`/room/5cea67afe89dd477c3af3f54`} className="result-item col-xs-6 col-md-4 col-lg-3">
            <HouseCard houseData={this.place}/>
          </Link>
          <Link to={`/room/5cea67afe89dd477c3af3f54`} className="result-item col-xs-6 col-md-4 col-lg-3">
            <HouseCard houseData={this.place}/>
          </Link>
        </div>

        <nav className="more-result">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item active">
              <Link className="page-link" to={"#"}>1</Link>
            </li>
            <li className="page-item">
              <Link className="page-link" to={"#"}>2</Link>
            </li>
            <li className="page-item">
              <Link className="page-link" to={"#"}>3</Link>
            </li>
            <li className="page-item">
              <Link className="page-link" to={"#"}>4</Link>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  homeposts: state.homeposts,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
