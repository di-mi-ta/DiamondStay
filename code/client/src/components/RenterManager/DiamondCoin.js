import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../redux/ActionCreators';
import {Table, Divider, Button, DatePicker, Form, Card, Select} from 'antd';


class DiamondCoin extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="container" style={{marginTop: 20}}>
      <h3> <b> Ví Diamond của bạn </b></h3>
      <Divider/>
      <Card style={{
        width: '100%', padding: 10, 
        marginTop: 10, marginBottom: 10,
        boxShadow: '0 8px 12px rgba(0,0,0,.1)',}}>
        <h3>Tổng coin: <b>{this.props.auth.user.info.coin}</b></h3>
      </Card>
      </div>
        )
    }

}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(DiamondCoin);
