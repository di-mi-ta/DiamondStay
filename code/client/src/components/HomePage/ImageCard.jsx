import React from 'react';
import '../../css/ImageCard.css';
import {baseUrl} from '../../shared/baseUrl';
import {connect} from 'react-redux';
import {search} from '../../utils/api/homepostSearch';
import * as actions from '../../redux/ActionCreators';


class ImageCard extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.fetchSearch = this.fetchSearch.bind(this);
  }

  fetchSearch(){
    const searchQuery = {
      homestayType: this.props.data.description
    }
    search(searchQuery).then((homes) => {
      this.props.updateResultSearch(homes);
    }).catch(err => console.log(err));
  }

  render() {
    return (
      <div className="imageCard" ref={this.ref} onClick={this.fetchSearch}>
        <img style={{
          filter: this.props.data.description? 'brightness(80%)': 'brightness(100%)'
        }} src={this.props.data.image}/>
        <span style={{
          display: !this.props.data.description? 'none': ''
        }}>
          {this.props.data.description}
        </span>
      </div>
    );
  }

  componentDidMount() {
    let root = this.ref.current;
    root.querySelector('span').style.fontSize = `${root.offsetWidth/15}px !important`;
    window.addEventListener('resize', function(event) {
      root.querySelector('span').style.fontSize = `${root.offsetWidth/15}px !important`;
    });
  }
}

const mapStateToProps = state => ({
  homeposts: state.homeposts,
});

const mapDispatchToProps = (dispatch) => ({
  updateResultSearch: (homes) => dispatch(actions.updateResultSearch(homes)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageCard);