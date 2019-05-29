import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../redux/ActionCreators';
import {Table, Divider, Button, DatePicker, Form, Card, Select} from 'antd';


class DiamondCoin extends Component {
    constructor(props){
        super(props);
        // for test ratings
        // this.onBtnClick = this.onBtnClick.bind(this)
    }

    onBtnClick = () => {
        const rate = {
            comment: "Very Good 2222",
            rating: 3,
            homepostId: "5cea67afe89dd477c3af3f54"
        }
        //this.props.postRating(rate.homepostId, rate.rating, rate.comment);
        // alert(JSON.stringify(this.props.ratings.ratings))
    }

    componentDidMount(){
        // this.props.fetchRatings();
    }

    render(){
        return(
            <div>
                <h1>Diamond Coin</h1>
                <Button onClick={this.onBtnClick}>Check</Button>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    ratings: state.ratings
});

const mapDispatchToProps = (dispatch) => ({
    postRating: (homepostId, rating, comment) => {dispatch(actions.postRating(homepostId, rating, comment))},
    fetchRatings: () => {dispatch(actions.fetchRatings())},
});

export default connect(mapStateToProps, mapDispatchToProps)(DiamondCoin);
