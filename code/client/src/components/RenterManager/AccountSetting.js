import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../redux/ActionCreators';
import {Table, Divider, Button, DatePicker, Form, Card, Select} from 'antd';


class AccountSetting extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        //fetch
    }

    render(){
        return(
            <h1>Cài đặt tài khoản</h1>
        )
    }

}

const mapStateToProps = state => ({
  
});

const mapDispatchToProps = (dispatch) => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountSetting);
