import React, {Component} from 'react';
import {Button, Input, Form, Select, InputNumber, Divider, message} from 'antd';
import {baseUrl} from '../../../shared/baseUrl';
import {connect} from 'react-redux';
import * as actions from '../../../redux/ActionCreators';

const Option = Select.Option;

const findIdLoc = (lst, info) => {
  let res = lst.filter((loc) => loc.province === info.province && loc.district === info.district 
            && loc.ward === info.ward);
  return [res[0]._id, res[0]]
}

const getLstProv = (lst) => {
  let lstDis = lst.map(loc => loc.province);
  return Array.from(new Set(lstDis));
}

const getLstDistrictOfProv = (lst, prov) => {
  let lstDis = lst.filter(loc => loc.province === prov);
  lstDis = lstDis.map(loc => loc.district);
  return Array.from(new Set(lstDis));
}

const getLstWardOfProvDist = (lst, prov, dist) => {
  let lstDis = lst.filter(loc => loc.province === prov && loc.district === dist);
  lstDis = lstDis.map(loc => loc.ward);
  return Array.from(new Set(lstDis));
}

const LocationForm = Form.create({ name:'desc'})(
    class extends React.Component {
      render() {
        const { form } = this.props;
        const { getFieldDecorator, getFieldValue } = form;
        return (
            <Form  layout="vertical">
              <Form.Item label="Chọn tỉnh, thành phố">
                {getFieldDecorator('province', {
                  initialValue: this.props.homeposts.currentHomepost.location !== null ? 
                                    this.props.homeposts.currentHomepost.location.province: '',
                  rules: [{required: true, message: "Trường này không được để trống!!!"}],
                })(
                    <Select>
                        {getLstProv(this.props.locations)
                            .map(prov => (<Option value={prov}>{prov}</Option>))}
                    </Select>
                )}
              </Form.Item>
              <Form.Item label="Chọn quận, huyện">
                {getFieldDecorator('district', {
                  initialValue: this.props.homeposts.currentHomepost.location !== null ? 
                                  this.props.homeposts.currentHomepost.location.district: '',
                  rules: [{required: true, message: "Trường này không được để trống!!!"}],
                })(
                    <Select>
                        {getLstDistrictOfProv(this.props.locations, getFieldValue('province'))
                            .map(loc => (<Option value={loc}>{loc}</Option>))}
                    </Select>
                )}
              </Form.Item>
              <Form.Item label="Chọn xã, phường">
                {getFieldDecorator('ward', {
                  initialValue: this.props.homeposts.currentHomepost.location !== null ? 
                        this.props.homeposts.currentHomepost.location.ward: '',
                  rules: [{ required: true, message: "Trường này không được để trống!!!"}],
                })(
                  <Select>
                    {getLstWardOfProvDist(this.props.locations, getFieldValue('province'), getFieldValue('district'))
                                        .map(loc => (<Option value={loc}>{loc}</Option>))}
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="Số nhà, đường">
                {getFieldDecorator('homeNumber', {
                  initialValue: this.props.homeposts.currentHomepost.homeNumber,
                  rules: [{ required: false}],
                })(<Input />)}
              </Form.Item>
            </Form>
        );
      }
    },
);

class Location extends Component {
  constructor(props){
    super(props);
    this.state = {
      locations: []
    }
    this.onUpdateBtnClick = this.onUpdateBtnClick.bind(this);
    // fetch locations
    fetch(baseUrl + 'location')
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(locations => {
      this.setState({
        locations: locations
      })
    })
  }

  onUpdateBtnClick = () => {
      const locationForm = this.locationFormRef.props.form;
      locationForm.validateFields((err, locationValues) => {
        if (err) {
            return;
        }
        // get _id of location 
        const loc = findIdLoc(this.state.locations, {
          province: locationValues.province,
          district: locationValues.district,
          ward: locationValues.ward
        })
        const updatedHomepost = {
          ...this.props.homeposts.currentHomepost,
          location: loc[0],
          homeNumber: locationValues.homeNumber
        }
        this.props.fetchUpdateHomepost(updatedHomepost);
        message.success('Cập nhật thành công');
        const _homepost = {
          ...this.props.homeposts.currentHomepost,
          location: loc[1],
          homeNumber: locationValues.homeNumber
        }
        this.props.updateCurrentHomepost(_homepost);
        locationForm.resetFields();
      });  
  }

  saveLocationFormRef = formRef => {
      this.locationFormRef = formRef;
  };

  render(){
      return(
          <div className="container">
              <h4><b>Vị trí</b></h4>
              <Divider/>
              <Button onClick={this.onUpdateBtnClick} type='primary'> 
                  Cập nhật
              </Button>
              <LocationForm
                  wrappedComponentRef={this.saveLocationFormRef}
                  homeposts={this.props.homeposts}
                  locations={this.state.locations}
              /> 
          </div>
      );
  }
}

const mapStateToProps = state => ({
  homeposts: state.homeposts,
});

const mapDispatchToProps = (dispatch) => ({
  updateCurrentHomepost: (homepost) => {dispatch(actions.updateCurrentHomepost(homepost))},
  fetchUpdateHomepost: (homepost) => {dispatch(actions.fetchUpdateHomepost(homepost))}
});

export default connect(mapStateToProps, mapDispatchToProps)(Location);
