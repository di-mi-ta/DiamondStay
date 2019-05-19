import React from 'react';
import '../../css/ImageCard.css';

class ImageCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: props.data.image,
      description: props.data.description? props.data.description : ''
    };
    this.ref = React.createRef();
  }

  render() {
    return (
      <div className="imageCard" ref={this.ref}>
        <img style={{
          filter: this.state.description? 'brightness(80%)': 'brightness(100%)'
        }} src={this.state.image}/>
        <span style={{
          display: !this.state.description? 'none': ''
        }}>
          {this.state.description}
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