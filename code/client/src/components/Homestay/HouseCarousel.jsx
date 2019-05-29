import React from 'react';
import '../../css/HouseCarousel.css';
import GlideSlide from '../HomePage/GlideSlide';
import {baseUrl} from '../../shared/baseUrl';

class HouseCarousel extends React.Component {
  constructor(props) {
    super(props);
    /*
    this.props.images = [
      "http://link1",
      "http://link2"
    ] 
    */
    this.ref = React.createRef();
  }

  componentDidMount() {
    const root = this.ref.current;
    console.log(root);
  }

  render() {
    return (
      <div className="houseCarousel" ref={this.ref}>
        <GlideSlide
          hasControl = {true}
          options = {{
            gap: 10,
            type: 'carousel',
            focusAt: 'center',
            perView: 1,
            peek: 100,
            autoplay: false
          }}
          itemList = {
            this.props.images.map(image =>
              <img 
                src={image}
                style={{
                  width: '100%',
                  height: '100%'
                }}
              />
            )
          }
        />
      </div>
    );
  }
}

export default HouseCarousel;