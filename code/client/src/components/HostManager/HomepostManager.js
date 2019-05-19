import React, {Component} from 'react';

import {Table, Divider, Button, Icon, 
         Modal, Input, DatePicker,
         message, InputNumber, Tag,
         Popconfirm, Form, Card} from 'antd';

const RangePicker = DatePicker.RangePicker;

class HomepostManager extends Component {
    constructor(props){
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            isModalEditOpen: false,
            currentPromo: '',
        };
    }

    componentWillMount(){
        //this.props.fetchSystemPromos()
    }

    render(){
        return(
            <div style={{paddingTop: 30, paddingLeft: 50, paddingRight: 50, 
                        paddingBottom: 50, background: '#f1f1f1'}}> 
                
                <Button type="primary" icon="plus" ghost
                    onClick = {this.onAddPromoBtnClick}
                    style={{marginBottom: '20px'}}
                >
                    Thêm chỗ ở mới
                </Button>
                <h2> <b> Chỗ ở của tôi </b></h2>
                
            </div>
        )
    }

}

export default HomepostManager;
