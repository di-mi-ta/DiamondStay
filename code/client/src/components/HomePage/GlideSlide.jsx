import React from 'react';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';
import '../../css/GlideSlide.css';
import Glide from '@glidejs/glide';

class GlideSlide extends React.Component {
  constructor(props) {
    super(props);
    this.defaultOptions = {
      type: 'slider',
      startAt: 0,
      perView: 4,
      gap: 20,
      bound: true,
      autoplay: false
    };
    this.ref = React.createRef();
    this.id = 'glideslide_' + Math.random().toString(36).substr(2, 9);
  }

  render() {
    return (
      <div className={`glide glideSlide`} ref={this.ref} data-id={this.id}>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {this.props.itemList.map((item, index) =>
              <li className="glide__slide" key={index}>
                {item}
              </li>
            )}
          </ul>
        </div>
        {
          (this.props.hasControl && this.props.hasControl == true) &&
          <div className="glide__arrows" data-glide-el="controls">
            <button className="glide__arrow glide__arrow--left" data-glide-dir="<">
              <i className="fa fa-chevron-left" aria-hidden="true"></i>
            </button>
            <button className="glide__arrow glide__arrow--right" data-glide-dir=">">
              <i className="fa fa-chevron-right" aria-hidden="true"></i>
            </button>
          </div>
        }
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps != this.props) {
      this.glide.destroy();
      let options = {...this.defaultOptions, ...this.props.options};
      if (options.perView > this.props.itemList.length) {
        options.perView = this.props.itemList.length;
      }
      this.glide = new Glide(`.glideSlide[data-id=${this.id}]`, options).mount();
      console.log("update", this.glide);
      // this.updateGlide(this.props.options);
    }
  }

  componentDidMount() {
    const options = {...this.defaultOptions, ...this.props.options};
    this.glide = new Glide(`.glideSlide[data-id=${this.id}]`, options).mount();
  }
}

export default GlideSlide;