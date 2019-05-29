import React from 'react';
import '../../css/StarRating.css';

class StarRating extends React.Component {
  constructor(props) {
    super(props);
    /*
    this.props.options = {
      numStar: 0 - 5,
      fixed: true/false
    }
    */
    this.options = Object.assign({
      numStar: 0,
      fixed: false
    }, this.props.options);

    this.state = {
      numStar: this.options.numStar,
      value: this.options.numStar
    }

    this.handleHover = this.handleHover.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getValue = this.getValue.bind(this);
  }

  handleHover(e) {
    if (!this.options.fixed) {
      this.setState({numStar: Number(e.target.getAttribute("data-key"))});
    }
  }

  handleLeave(e) {
    if (!this.options.fixed) {
      this.setState({numStar: this.state.value});
    }
  }

  handleClick(e) {
    if (!this.options.fixed) {
      this.setState({value: Number(e.target.getAttribute("data-key"))});
    }
  }

  getValue() {
    return this.state.value;
  }

  render() {
    return (
      <div className="starRating">
        {
          [1, 2, 3, 4, 5].map(val =>
            <i
            className={`fa fa-star ${val <= this.state.numStar ? "fill": ""}`} 
            aria-hidden="true" key={val} data-key={val}
            onMouseOver={this.handleHover}
            onMouseLeave={this.handleLeave}
            onClick={this.handleClick}
            >
            </i>
          )
        }
      </div>
    );
  }
}

export default StarRating;