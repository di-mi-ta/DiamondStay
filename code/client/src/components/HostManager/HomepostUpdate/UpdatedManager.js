import React, {Component} from 'react';
import {Divider, Menu} from 'antd';
import {Link, Switch, Route, Redirect} from 'react-router-dom';

import Facilities from './Facilities';
import Overview from './Overview';
import Location from './Location';
import PricePolicy from './PricePolicy';
import Images from './Images';
import {connect} from 'react-redux';
import * as actions from '../../../redux/ActionCreators';

class UpdatedManager extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            key: [1],
        };
        this.onSelect = this.onSelect.bind(this);
    }

    onSelect = (e) => {
        this.setState({
            key: e.key,
        })
    }

    componentWillMount(){
      this.props.fetchHomeposts();
      this.props.fetchHomepostById(this.props.match.params.homepostId);
    }

    componentDidMount(){
        this.props.fetchHomepostById(this.props.match.params.homepostId);
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
                <h3><b>{this.props.homeposts.currentHomepost ? this.props.homeposts.currentHomepost.name
                        : ''}</b></h3>
                <Divider/>
                <Menu
                    defaultSelectedKeys={['1']}
                    selectedKeys={this.state.key}
                    onSelect={this.onSelect}
                    mode= "horizontal"
                    theme= 'light'
                    style={{
                        textAlign: 'center',
                        background: "#F1F1F1",
                        marginBottom: 10
                    }}
                >
                    <Menu.Item key="1" to='/'>
                        <Link to={`/properties/${this.props.match.params.homepostId}/overview`}>
                        <span>
                            <b>Tổng quan</b>
                        </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to={`/properties/${this.props.match.params.homepostId}/price-policy`}>
                        <span>
                            <b>Giá và các chính sách</b>
                        </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to={`/properties/${this.props.match.params.homepostId}/images`}>
                        <span>
                            <b>Hình ảnh</b>
                        </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to={`/properties/${this.props.match.params.homepostId}/facilities`}>
                        <span> <b>Tiện nghi</b> </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to={`/properties/${this.props.match.params.homepostId}/location`}>
                        <span><b>Vị trí</b></span>
                        </Link>
                    </Menu.Item>
                </Menu>
                <Switch>
                    <Route  path={`/properties/${this.props.match.params.homepostId}/overview`}
                            component={() => <Overview match={this.props.match}/>}/>
                    <Route  path={`/properties/${this.props.match.params.homepostId}/price-policy`}
                            component={PricePolicy} />
                    <Route  path={`/properties/${this.props.match.params.homepostId}/images`}
                            component={Images} />
                    <Route  path={`/properties/${this.props.match.params.homepostId}/facilities`}
                            component={Facilities} />
                    <Route  path={`/properties/${this.props.match.params.homepostId}/location`}
                            component={Location} />
                    <Redirect to={`/properties/${this.props.match.params.homepostId}/overview`}/>
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = state => ({
  homeposts: state.homeposts,
});

const mapDispatchToProps = (dispatch) => ({
  fetchHomeposts: (query='') => {dispatch(actions.fetchHomeposts(query))},
  fetchHomepostById: (homepostId) => {dispatch(actions.fetchHomepostById(homepostId))}
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdatedManager);
