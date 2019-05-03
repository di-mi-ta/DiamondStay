import React, {Component} from 'react';
import {} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import {FadeTransform, Fade, Stagger} from 'react-animation-components';

const HomepostDetailed = (props) => {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.homepost != null)        
        return (
            <div className="container">
            {/* TO DO */}
            </div>
        );
    else
        return(
            <div></div>
        );
}

export default HomepostDetailed;