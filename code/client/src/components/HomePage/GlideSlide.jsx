import React from 'react';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';
import '../../css/GlideSlide.css';
import Glide from '@glidejs/glide';

class GlideSlide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasControl: props.data.hasControl? props.data.hasControl : false
    }
    this.options = Object.assign({
      type: 'slider',
      startAt: 0,
      perView: 4,
      gap: 20,
      bound: true,
      autoplay: false
    }, props.data.options);
    this.ref = React.createRef();
    this.id = 'glideslide_' + Math.random().toString(36).substr(2, 9);
    this.updateGlide = this.updateGlide.bind(this);
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
          this.state.hasControl &&
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

  updateGlide(newOptions) {
    let options = newOptions;
    if (newOptions.perView > this.props.itemList.length) {
      options = {...options, perView: this.props.itemList.length};
    }
    this.glide.update(options);
  }

  componentDidUpdate() {
    // console.log("update", this.glide);
    // this.glide.destroy();
    // this.glide = new Glide(`.glideSlide[data-id=${this.id}]`, this.options);
    // this.glide.mount();
  }

  componentDidMount() {
    console.log("mount");
    this.glide = new Glide(`.glideSlide[data-id=${this.id}]`, this.options).mount();
  }
}

export default GlideSlide;