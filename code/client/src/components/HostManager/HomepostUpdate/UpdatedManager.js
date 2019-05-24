import React, {Component} from 'react';
import {Divider, Input, Form, Menu, Select, InputNumber} from 'antd';
import {Link, Switch, Route} from 'react-router-dom';

import Facilities from './Facilities';
import Overview from './Overview';
import Location from './Location';
import PricePolicy from './PricePolicy';
import Images from './Images';

class UpdatedManager extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
        };
    }

    componentWillMount(){
      this.props.fetchHomeposts();
    }

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
          if (err) {
            return;
          }
    
          console.log('Received values of form: ', values);
          form.resetFields();
          this.setState({ visible: false });
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render(){
        return(
            <div style={{paddingTop: 30, paddingLeft: 50, paddingRight: 50, 
                        paddingBottom: 50, background: '#f1f1f1'}}> 
                <h2> <b> Homestay </b></h2>
                <Divider/>
                <Menu
                    defaultSelectedKeys={['1']}
                    mode= "horizontal"
                    theme= 'light'
                    style={{ 
                        textAlign: 'center', 
                        background: "#F1F1F1"
                    }}
                >
                    <Menu.Item key="1" to='/'>
                        <Link to='/properties/overview '>
                        <span>
                            <b>Tổng quan</b>
                        </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to='/properties/price-policy'> 
                        <span>  
                            <b>Giá và các chính sách</b> 
                        </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to='/properties/images'> 
                        <span>  
                            <b>Hình ảnh</b> 
                        </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to='/properties/facilities'>
                        <span> <b>Tiện nghi</b> </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to='/properties/location' > 
                        <span><b>Vị trí</b></span>
                        </Link>
                    </Menu.Item>
                </Menu>
                <Switch>
                    <Route path="/properties/overview" 
                            render={() => <Overview
                                                //
                                            />
                                    }
                    />
                    <Route path="/properties/price-policy" 
                            render={() => <PricePolicy
                                                //
                                        />
                                    }
                    />
                    <Route path="/properties/images" 
                            render={(props) => <Images
                                                // 
                                        />
                                    }
                    />
                    <Route path="/properties/facilities" 
                            render={() => <Facilities
                                            //
                                        />
                                    }
                    />
                    <Route path="/properties/location" 
                            render={() => <Location
                                            //
                                        />
                                    }
                    />
                </Switch>
            </div>
        )
    }

}

export default UpdatedManager;