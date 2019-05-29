import React from 'react';
import '../../css/ImageCard.css';
import {baseUrl} from '../../shared/baseUrl';

class ImageCard extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  render() {
    return (
      <div className="imageCard" ref={this.ref}>
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

export default ImageCard;