import React, {Component} from 'react';
import {Button, Input, Form, Select, InputNumber, Divider, message} from 'antd';
import {connect} from 'react-redux';
import * as actions from '../../../../redux/ActionCreators';

const Option = Select.Option;

const BasicForm = Form.create({ name:'desc'})(
    class extends React.Component {
      render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Form  layout="vertical">
              <Form.Item label="Loại chỗ ở">
                {getFieldDecorator('typeHome', {
                  initialValue: this.props.homeposts.currentHomepost ? this.props.homeposts.currentHomepost.typeHome : '',
                  rules: [{ required: true, message: 'Trường này không được bỏ trống !!!' }],
                })(
                    <Select>
                        <Option value="chungcu">Chung cư</Option>
                        <Option value="bietthu">Biệt thự</Option>
                        <Option value="canhostudio">Căn hộ Studio</Option>
                        <Option value="nharieng">Nhà riêng</Option>
                        <Option value="canhodichvu">Căn hộ dịch vụ</Option>
                        <Option value="khac">Khác</Option>
                    </Select>
                )}
              </Form.Item>
              <Form.Item label="Loại phòng">
                {getFieldDecorator('typeRoom', {
                  initialValue: this.props.homeposts.currentHomepost ? this.props.homeposts.currentHomepost.typeRoom : '',
                  rules: [{ required: true, message: 'Trường này không được bỏ trống !!!' }],
                })(
                    <Select>
                        <Option value="nguyencan">Nguyên căn</Option>
                        <Option value="phongrieng">Phòng riêng</Option>
                    </Select>
                )}
              </Form.Item>
              <Form.Item label="Số khách tối đa">
                {getFieldDecorator('maxPeoples', {
                  initialValue: this.props.homeposts.currentHomepost ? this.props.homeposts.currentHomepost.maxPeoples : '',
                  rules: [{ required: true, message: 'Trường này không được bỏ trống !!!' }],
                })(
                    <InputNumber min='0' style={{width: '100%'}}/>
                )}
              </Form.Item>
              <Form.Item label="Diện tích chỗ ở (m2)">
                {getFieldDecorator('acreage', {
                  initialValue: this.props.homeposts.currentHomepost ? this.props.homeposts.currentHomepost.acreage : '',
                  rules: [{ required: true, message: 'Trường này không được bỏ trống !!!' }],
                })(<Input />)}
              </Form.Item>
            </Form>
        );
      }
    },
);

const RoomBedForm = Form.create({name: 'desc'})(
    class extends React.Component {
      render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Form  layout="vertical">
               <Form.Item label="Phòng ngủ">
                    {getFieldDecorator('numBed', {
                      initialValue: this.props.homeposts.currentHomepost ? this.props.homeposts.currentHomepost.numBed : '',
                      rules: [{ required: true, message: 'Vui lòng nhập trường này !!!' }],
                    })(<InputNumber min='0' style={{width: '100%'}}/>)}
                </Form.Item>
                <Form.Item label="Giường">
                    {getFieldDecorator('numBedroom', {
                      initialValue: this.props.homeposts.currentHomepost ? this.props.homeposts.currentHomepost.numBedroom : '',
                      rules: [{ required: true, message: 'Vui lòng nhập trường này !!!' }],
                    })(<InputNumber min='0' style={{width: '100%'}}/>)}
                </Form.Item>
                <Form.Item label="Phòng tắm">
                    {getFieldDecorator('numBathroom', {
                      initialValue: this.props.homeposts.currentHomepost ? this.props.homeposts.currentHomepost.numBathroom : '',
                      rules: [{ required: true, message: 'Vui lòng nhập trường này !!!' }],
                    })(<InputNumber min='0' style={{width: '100%'}}/>)}
                </Form.Item>
            </Form>
        );
      }
    },
);


class RoomBed extends Component {
  constructor(props){
      super(props);
      this.onUpdateBtnClick = this.onUpdateBtnClick.bind(this);
  }

  onUpdateBtnClick = () => {
      const basicForm = this.basicFormRef.props.form;
      const roombedForm = this.roombedFormRef.props.form;
      basicForm.validateFields((err, basicValues) => {
        if (err) {
          return;
        }
        roombedForm.validateFields((err, roomBedValues) => {
          if (err) {
              return;
          }
          const updatedHomepost = {
            ...this.props.homeposts.currentHomepost,
            numBed: roomBedValues.numBed,
            numBathroom: roomBedValues.numBathroom,
            numBedroom: roomBedValues.numBedroom,
            typeHome: basicValues.typeHome,
            maxPeoples: basicValues.maxPeoples,
            typeRoom: basicValues.typeRoom === 'nguyencan' ? 'Nguyên căn' : 'Phòng riêng',
            acreage: basicValues.acreage
          }
          this.props.fetchUpdateHomepost(updatedHomepost);
          message.success('Cập nhật thành công');
          this.props.updateCurrentHomepost(updatedHomepost);
          roombedForm.resetFields();
        });
        basicForm.resetFields();
      });

  }

  saveBasicFormRef = formRef => {
      this.basicFormRef = formRef;
  };
  saveRoomBedFormRef = formRef => {
      this.roombedFormRef = formRef;
  };

  render(){
      return(
          <div className="container">
              <h3><b>Thông tin cơ bản</b></h3>
              <Button onClick={this.onUpdateBtnClick} type='primary' style={{marginBottom: 10}}> 
                  Cập nhật
              </Button>
              <Divider/>
              <BasicForm
                  wrappedComponentRef={this.saveBasicFormRef}
                  homeposts={this.props.homeposts}
              />
              <h3>Phòng và giường</h3>
              <Divider/>
              <RoomBedForm
                  wrappedComponentRef={this.saveRoomBedFormRef}
                  homeposts={this.props.homeposts}
              /> 
          </div>
      );
  }
}

const mapStateToProps = state => ({
  homeposts: state.homeposts,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUpdateHomepost: (homepost) => {dispatch(actions.fetchUpdateHomepost(homepost))},
  updateCurrentHomepost: (homepost) => {dispatch(actions.updateCurrentHomepost(homepost))},
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomBed);
